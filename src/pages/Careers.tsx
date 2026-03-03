import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { careers, Pathway } from '@/lib/data';
import { ArrowRight, TrendingUp, Briefcase, DollarSign, Zap, GraduationCap, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const pathwayFilters: { label: string; value: Pathway | 'all' }[] = [
  { label: 'All Careers', value: 'all' },
  { label: 'STEM', value: 'STEM' },
  { label: 'Social Sciences', value: 'Social Sciences' },
  { label: 'Arts & Sports', value: 'Arts & Sports' },
];

const pathwayColors = {
  'STEM': { bg: 'bg-stem-light', text: 'text-stem', badge: 'bg-stem/10 text-stem' },
  'Social Sciences': { bg: 'bg-social-light', text: 'text-social', badge: 'bg-social/10 text-social' },
  'Arts & Sports': { bg: 'bg-arts-light', text: 'text-arts', badge: 'bg-arts/10 text-arts' },
};

export default function Careers() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Pathway | 'all'>('all');

  const filteredCareers = activeFilter === 'all' 
    ? careers 
    : careers.filter(c => c.pathway === activeFilter);

  return (
    <div className="min-h-screen pt-20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Kenya 2026 <span className="text-gradient-primary">Career Guide</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore high-growth careers aligned with Kenya's Vision 2030 and the evolving job market. 
            Each career shows salary potential, required skills, and growth outlook.
          </p>
        </div>

        {/* Market Insight Banner */}
        <div className="bg-gradient-hero text-white rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">2026 Job Market Trends</h3>
                <p className="text-white/80">Technology, renewable energy, and digital content creation lead growth</p>
              </div>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">15%</p>
                <p className="text-sm text-white/80">Tech Growth</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-2xl font-bold">25%</p>
                <p className="text-sm text-white/80">Digital Jobs</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-2xl font-bold">20%</p>
                <p className="text-sm text-white/80">Green Energy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {pathwayFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCareers.map((career, index) => {
            const colors = pathwayColors[career.pathway];
            
            return (
              <div
                key={career.title}
                className="bg-card rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={cn("p-6", colors.bg)}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", colors.badge)}>
                      {career.pathway}
                    </span>
                    <span className={cn(
                      "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                      career.growthRate === 'High' ? 'bg-secondary/10 text-secondary' :
                      career.growthRate === 'Medium' ? 'bg-accent/10 text-accent' :
                      'bg-muted text-muted-foreground'
                    )}>
                      <TrendingUp className="w-3 h-3" />
                      {career.growthRate} Growth
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold">{career.title}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">{career.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium text-secondary">{career.salaryRange}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{career.education}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{career.industry}</span>
                  </div>

                  <p className="text-xs text-muted-foreground italic mb-4">
                    📈 {career.outlook2026}
                  </p>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Key Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {career.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="font-display text-2xl font-bold mb-4">
            Find Your Career Match
          </h3>
          <p className="text-muted-foreground mb-6">
            Take our assessment to discover which careers align with your strengths.
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/assessment')}
            className="group"
          >
            Start Assessment
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
