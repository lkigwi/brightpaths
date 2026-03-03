import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, Calendar, Atom, Scale, Palette, LogOut, Lock, Trash2, Star, MessageSquare, BarChart3, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StatisticsChart } from '@/components/admin/StatisticsChart';

interface AssessmentResult {
  id: string;
  student_name: string;
  top_pathway: string;
  top_pathway_percentage: number;
  stem_percentage: number;
  social_sciences_percentage: number;
  arts_sports_percentage: number;
  confidence: string;
  created_at: string;
  recommended_subjects?: unknown;
  recommended_careers?: unknown;
  feedback?: FeedbackData | null;
}

interface FeedbackData {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

interface AdminUser {
  user_id: string;
  display_name: string | null;
  created_at: string;
}

const pathwayColors = {
  'STEM': { bg: 'bg-stem-light', text: 'text-stem', icon: Atom },
  'Social Sciences': { bg: 'bg-social-light', text: 'text-social', icon: Scale },
  'Arts & Sports': { bg: 'bg-arts-light', text: 'text-arts', icon: Palette },
};

export default function Results() {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, stem: 0, social: 0, arts: 0 });
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [selectedResult, setSelectedResult] = useState<AssessmentResult | null>(null);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (!authLoading && user) {
      checkAdminAccess(user.id);
    }
  }, [authLoading, user, navigate]);

  const checkAdminAccess = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (error || !data) {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    setAccessDenied(false);
    fetchResults();
  };

  const fetchResults = async () => {
    try {
      // Fetch assessment results
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('assessment_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (assessmentsError) throw assessmentsError;

      // Fetch all feedback
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('feedback')
        .select('*');

      if (feedbackError) throw feedbackError;

      // Fetch admin users
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .eq('role', 'admin');

      if (rolesData && rolesData.length > 0) {
        const userIds = rolesData.map(r => r.user_id);
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, display_name, created_at')
          .in('user_id', userIds);

        if (profilesData) {
          setAdminUsers(profilesData);
        }
      }

      // Map feedback to assessments
      const feedbackMap = new Map<string, FeedbackData>();
      if (feedbackData) {
        feedbackData.forEach((fb: FeedbackData & { assessment_id: string }) => {
          if (fb.assessment_id) {
            feedbackMap.set(fb.assessment_id, fb);
          }
        });
      }

      if (assessmentsData) {
        const resultsWithFeedback = assessmentsData.map(r => ({
          ...r,
          feedback: feedbackMap.get(r.id) || null,
        }));
        setResults(resultsWithFeedback);
        
        const total = assessmentsData.length;
        const stem = assessmentsData.filter(r => r.top_pathway === 'STEM').length;
        const social = assessmentsData.filter(r => r.top_pathway === 'Social Sciences').length;
        const arts = assessmentsData.filter(r => r.top_pathway === 'Arts & Sports').length;
        setStats({ total, stem, social, arts });
      }
    } catch {
      // Error handled silently - UI will show empty state
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResult = async (id: string, studentName: string) => {
    try {
      const { error } = await supabase
        .from('assessment_results')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setResults(prev => prev.filter(r => r.id !== id));
      setStats(prev => {
        const deleted = results.find(r => r.id === id);
        if (!deleted) return prev;
        return {
          total: prev.total - 1,
          stem: deleted.top_pathway === 'STEM' ? prev.stem - 1 : prev.stem,
          social: deleted.top_pathway === 'Social Sciences' ? prev.social - 1 : prev.social,
          arts: deleted.top_pathway === 'Arts & Sports' ? prev.arts - 1 : prev.arts,
        };
      });

      toast({
        title: 'Result deleted',
        description: `Assessment for ${studentName} has been removed.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete the result. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAll = async () => {
    try {
      const { error } = await supabase
        .from('assessment_results')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

      if (error) throw error;

      setResults([]);
      setStats({ total: 0, stem: 0, social: 0, arts: 0 });

      toast({
        title: 'All results deleted',
        description: 'All assessment results have been removed.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete results. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleViewFeedback = (feedback: FeedbackData) => {
    setSelectedFeedback(feedback);
    setFeedbackDialogOpen(true);
  };

  const handleViewResult = (result: AssessmentResult) => {
    setSelectedResult(result);
    setResultDialogOpen(true);
  };
  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen pt-20">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <Skeleton className="h-16 w-16 rounded-2xl mx-auto mb-4" />
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show access denied if role check fails
  if (accessDenied) {
    return (
      <div className="min-h-screen pt-20">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You need admin privileges to view assessment results.
            </p>
            <Button onClick={() => navigate('/login')}>
              Sign in as Admin
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Assessment Results
            </h1>
            <p className="text-muted-foreground">
              View all student pathway recommendations from the CBE assessment
            </p>
          </div>
          <div className="flex gap-2">
            {results.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete all results?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all {stats.total} assessment results. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs for Results and Statistics */}
        <Tabs defaultValue="results" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-auto">
            <TabsTrigger value="results" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Results</span>
              <span className="sm:hidden">Results</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Statistics</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="admins" className="gap-1 sm:gap-2 text-xs sm:text-sm py-2">
              <Shield className="w-4 h-4" />
              Admins
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              <div className="bg-card rounded-xl sm:rounded-2xl shadow-card p-3 sm:p-6 text-center">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-primary" />
                <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
              </div>
              <div className="bg-stem-light rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                <Atom className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-stem" />
                <p className="text-xl sm:text-2xl font-bold text-stem">{stats.stem}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">STEM</p>
              </div>
              <div className="bg-social-light rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                <Scale className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-social" />
                <p className="text-xl sm:text-2xl font-bold text-social">{stats.social}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Social</p>
              </div>
              <div className="bg-arts-light rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                <Palette className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-arts" />
                <p className="text-xl sm:text-2xl font-bold text-arts">{stats.arts}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Arts</p>
              </div>
            </div>

        {/* Results Table */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden overflow-x-auto">
          <div className="p-6 border-b">
            <h2 className="font-display text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              All Student Results
            </h2>
          </div>
          
          {loading ? (
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No assessment results yet.</p>
              <p className="text-sm">Waiting for students to complete the assessment.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Top Pathway</TableHead>
                  <TableHead className="hidden md:table-cell">Match %</TableHead>
                  <TableHead className="hidden lg:table-cell">Confidence</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Feedback</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => {
                  const pathwayInfo = pathwayColors[result.top_pathway as keyof typeof pathwayColors];
                  const Icon = pathwayInfo?.icon || Atom;
                  
                  return (
                    <TableRow key={result.id}>
                      <TableCell>
                        <button
                          className="font-medium text-left hover:text-primary hover:underline transition-colors cursor-pointer"
                          onClick={() => handleViewResult(result)}
                        >
                          {result.student_name}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            pathwayInfo?.bg
                          )}>
                            <Icon className={cn("w-4 h-4", pathwayInfo?.text)} />
                          </div>
                          <span className="hidden sm:inline">{result.top_pathway}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary" className={cn(pathwayInfo?.bg, pathwayInfo?.text)}>
                          {result.top_pathway_percentage}%
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant={
                          result.confidence === 'High' ? 'default' :
                          result.confidence === 'Medium' ? 'secondary' : 'outline'
                        }>
                          {result.confidence}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(result.created_at), 'MMM d, yyyy')}
                          </div>
                          <span className="text-xs opacity-75">
                            {format(new Date(result.created_at), 'h:mm a')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {result.feedback ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-primary hover:text-primary"
                            onClick={() => handleViewFeedback(result.feedback!)}
                          >
                            <Star className="w-3 h-3 fill-current" />
                            {result.feedback.rating}/10
                          </Button>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete result?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the assessment result for {result.student_name}. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteResult(result.id, result.student_name)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
          </TabsContent>

          <TabsContent value="statistics">
            <StatisticsChart />
          </TabsContent>

          <TabsContent value="admins">
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Registered Admin Users
                </h2>
              </div>
              {adminUsers.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No admin users found.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((admin) => (
                      <TableRow key={admin.user_id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Shield className="w-4 h-4 text-primary" />
                            </div>
                            {admin.display_name || 'Unknown'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-primary/10 text-primary">Admin</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(admin.created_at), 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Result Detail Dialog */}
      <Dialog open={resultDialogOpen} onOpenChange={setResultDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {selectedResult?.student_name}'s Results
            </DialogTitle>
          </DialogHeader>
          {selectedResult && (() => {
            const info = pathwayColors[selectedResult.top_pathway as keyof typeof pathwayColors];
            const TopIcon = info?.icon || Atom;
            return (
              <div className="space-y-5">
                {/* Top Pathway */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", info?.bg)}>
                    <TopIcon className={cn("w-5 h-5", info?.text)} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Top Pathway</p>
                    <p className="font-semibold">{selectedResult.top_pathway}</p>
                  </div>
                  <Badge className={cn("ml-auto", info?.bg, info?.text)}>
                    {selectedResult.top_pathway_percentage}% match
                  </Badge>
                </div>

                {/* All Pathway Scores */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Pathway Breakdown</p>
                  {[
                    { name: 'STEM', pct: selectedResult.stem_percentage, key: 'STEM' as const },
                    { name: 'Social Sciences', pct: selectedResult.social_sciences_percentage, key: 'Social Sciences' as const },
                    { name: 'Arts & Sports', pct: selectedResult.arts_sports_percentage, key: 'Arts & Sports' as const },
                  ].map(p => {
                    const pInfo = pathwayColors[p.key];
                    const PIcon = pInfo?.icon || Atom;
                    return (
                      <div key={p.key} className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", pInfo?.bg)}>
                          <PIcon className={cn("w-4 h-4", pInfo?.text)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{p.name}</span>
                            <span className="font-medium">{p.pct}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={cn("h-full rounded-full transition-all", p.key === 'STEM' ? 'bg-stem' : p.key === 'Social Sciences' ? 'bg-social' : 'bg-arts')}
                              style={{ width: `${p.pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recommended Subjects */}
                {selectedResult.recommended_subjects && Array.isArray(selectedResult.recommended_subjects) && (selectedResult.recommended_subjects as unknown[]).length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Recommended Subjects</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedResult.recommended_subjects as unknown[]).map((subject, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {typeof subject === 'string' ? subject : (subject as { name?: string })?.name || JSON.stringify(subject)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Careers */}
                {selectedResult.recommended_careers && Array.isArray(selectedResult.recommended_careers) && (selectedResult.recommended_careers as unknown[]).length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Recommended Careers</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedResult.recommended_careers as unknown[]).map((career, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {typeof career === 'string' ? career : (career as { title?: string })?.title || JSON.stringify(career)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confidence & Date */}
                <div className="flex gap-4 text-sm">
                  <div className="flex-1 p-3 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground mb-1">Confidence</p>
                    <Badge variant={
                      selectedResult.confidence === 'High' ? 'default' :
                      selectedResult.confidence === 'Medium' ? 'secondary' : 'outline'
                    }>
                      {selectedResult.confidence}
                    </Badge>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground mb-1">Date</p>
                    <p className="font-medium">{format(new Date(selectedResult.created_at), 'MMM d, yyyy')}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(selectedResult.created_at), 'h:mm a')}</p>
                  </div>
                </div>

                {/* Feedback if available */}
                {selectedResult.feedback && (
                  <div className="p-3 rounded-lg bg-primary/5 border">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-primary fill-current" />
                      <span className="font-medium">{selectedResult.feedback.rating}/10</span>
                    </div>
                    {selectedResult.feedback.comment && (
                      <p className="text-sm text-muted-foreground">{selectedResult.feedback.comment}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Student Feedback
            </DialogTitle>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 rounded-xl">
                  <Star className="w-5 h-5 text-primary fill-current" />
                  <span className="text-2xl font-bold text-primary">{selectedFeedback.rating}</span>
                  <span className="text-muted-foreground">/10</span>
                </div>
              </div>
              {selectedFeedback.comment ? (
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Comment</p>
                  <p className="text-foreground">{selectedFeedback.comment}</p>
                </div>
              ) : (
                <p className="text-center text-muted-foreground text-sm">
                  No comment provided
                </p>
              )}
              <p className="text-xs text-muted-foreground text-center">
                Submitted on {format(new Date(selectedFeedback.created_at), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
