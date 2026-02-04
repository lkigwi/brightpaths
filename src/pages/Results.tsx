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
import { Users, TrendingUp, Calendar, Atom, Scale, Palette, LogOut, Lock, Trash2, Star, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  feedback?: FeedbackData | null;
}

interface FeedbackData {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

const pathwayColors = {
  'STEM': { bg: 'bg-stem-light', text: 'text-stem', icon: Atom },
  'Social Sciences': { bg: 'bg-social-light', text: 'text-social', icon: Scale },
  'Arts & Sports': { bg: 'bg-arts-light', text: 'text-arts', icon: Palette },
};

export default function Results() {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, stem: 0, social: 0, arts: 0 });
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (!authLoading && user && !isAdmin) {
      navigate('/login');
    } else if (!authLoading && isAdmin) {
      fetchResults();
    }
  }, [authLoading, user, isAdmin, navigate]);

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

  // Show access denied if not admin
  if (!isAdmin) {
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl shadow-card p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Assessments</p>
          </div>
          <div className="bg-stem-light rounded-2xl p-6 text-center">
            <Atom className="w-8 h-8 mx-auto mb-2 text-stem" />
            <p className="text-2xl font-bold text-stem">{stats.stem}</p>
            <p className="text-sm text-muted-foreground">STEM</p>
          </div>
          <div className="bg-social-light rounded-2xl p-6 text-center">
            <Scale className="w-8 h-8 mx-auto mb-2 text-social" />
            <p className="text-2xl font-bold text-social">{stats.social}</p>
            <p className="text-sm text-muted-foreground">Social Sciences</p>
          </div>
          <div className="bg-arts-light rounded-2xl p-6 text-center">
            <Palette className="w-8 h-8 mx-auto mb-2 text-arts" />
            <p className="text-2xl font-bold text-arts">{stats.arts}</p>
            <p className="text-sm text-muted-foreground">Arts & Sports</p>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
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
                      <TableCell className="font-medium">
                        {result.student_name}
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
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(result.created_at), 'MMM d, yyyy')}
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
      </main>

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
