import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Users, Star, TrendingUp } from 'lucide-react';

interface Stats {
  totalAssessments: number;
  uniqueUsers: number;
  avgRating: number;
  totalFeedback: number;
  pathwayData: { name: string; count: number; color: string }[];
}

export function StatisticsChart() {
  const [stats, setStats] = useState<Stats>({
    totalAssessments: 0,
    uniqueUsers: 0,
    avgRating: 0,
    totalFeedback: 0,
    pathwayData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch assessment stats
        const { data: assessments } = await supabase
          .from('assessment_results')
          .select('top_pathway, user_id');

        // Fetch feedback stats
        const { data: feedback } = await supabase
          .from('feedback')
          .select('rating');

        const stemCount = assessments?.filter(a => a.top_pathway === 'STEM').length || 0;
        const socialCount = assessments?.filter(a => a.top_pathway === 'Social Sciences').length || 0;
        const artsCount = assessments?.filter(a => a.top_pathway === 'Arts & Sports').length || 0;
        const uniqueUsers = new Set(assessments?.map(a => a.user_id)).size;

        const avgRating = feedback?.length 
          ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length 
          : 0;

        setStats({
          totalAssessments: assessments?.length || 0,
          uniqueUsers,
          avgRating: Math.round(avgRating * 10) / 10,
          totalFeedback: feedback?.length || 0,
          pathwayData: [
            { name: 'STEM', count: stemCount, color: 'hsl(var(--stem))' },
            { name: 'Social Sciences', count: socialCount, color: 'hsl(var(--social))' },
            { name: 'Arts & Sports', count: artsCount, color: 'hsl(var(--arts))' },
          ],
        });
      } catch (error) {
        // Silent error handling in production
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const securityFeatures = [
    'Row Level Security (RLS) on all tables',
    'User data ownership model',
    'Admin-only access controls',
    'Input validation triggers',
    'CSS injection protection',
    'Production-safe error handling',
    'Email verification required',
  ];

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading statistics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalAssessments}</p>
                <p className="text-sm text-muted-foreground">Total Assessments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.uniqueUsers}</p>
                <p className="text-sm text-muted-foreground">Unique Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Star className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.avgRating || 'N/A'}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Shield className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalFeedback}</p>
                <p className="text-sm text-muted-foreground">Feedback Count</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Pathway Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.pathwayData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis allowDecimals={false} className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {stats.pathwayData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Security Precautions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security Precautions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {securityFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
