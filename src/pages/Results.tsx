import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Users, TrendingUp, Calendar, Atom, Scale, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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
}

const pathwayColors = {
  'STEM': { bg: 'bg-stem-light', text: 'text-stem', icon: Atom },
  'Social Sciences': { bg: 'bg-social-light', text: 'text-social', icon: Scale },
  'Arts & Sports': { bg: 'bg-arts-light', text: 'text-arts', icon: Palette },
};

export default function Results() {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, stem: 0, social: 0, arts: 0 });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setResults(data);
        
        // Calculate stats
        const total = data.length;
        const stem = data.filter(r => r.top_pathway === 'STEM').length;
        const social = data.filter(r => r.top_pathway === 'Social Sciences').length;
        const arts = data.filter(r => r.top_pathway === 'Arts & Sports').length;
        setStats({ total, stem, social, arts });
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Assessment Results
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            View all student pathway recommendations from the CBE assessment
          </p>
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
              <p className="text-sm">Be the first to complete the assessment!</p>
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
