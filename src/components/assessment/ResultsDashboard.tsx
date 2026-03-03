import { useAssessment } from '@/context/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Briefcase, 
  ArrowRight,
  RotateCcw,
  Download,
  Share2,
  Atom,
  Scale,
  Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Feedback } from '@/components/Feedback';

const pathwayIcons = {
  'STEM': Atom,
  'Social Sciences': Scale,
  'Arts & Sports': Palette,
};

const pathwayColors = {
  'STEM': { bg: 'bg-stem-light', text: 'text-stem', border: 'border-stem', bar: 'bg-stem' },
  'Social Sciences': { bg: 'bg-social-light', text: 'text-social', border: 'border-social', bar: 'bg-social' },
  'Arts & Sports': { bg: 'bg-arts-light', text: 'text-arts', border: 'border-arts', bar: 'bg-arts' },
};

export function ResultsDashboard() {
  const { results, studentName, resetAssessment } = useAssessment();
  const navigate = useNavigate();

  if (!results) {
    return (
      <div className="text-center py-20">
        <p>No results available. Please complete the assessment first.</p>
        <Button onClick={() => navigate('/assessment')} className="mt-4">
          Start Assessment
        </Button>
      </div>
    );
  }

  const topPathway = results.pathways[0];
  const TopIcon = pathwayIcons[topPathway.pathway];
  const topColors = pathwayColors[topPathway.pathway];

  return (
    <div className="animate-fade-in">
      {/* Celebration Header */}
      <div className="text-center mb-12">
        <div className={cn(
          "w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg",
          topColors.bg
        )}>
          <Trophy className={cn("w-10 h-10", topColors.text)} />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          {studentName ? `${studentName}'s` : 'Your'} Results
        </h2>
        <p className="text-muted-foreground text-lg">
          Based on your interests and Kenya's 2026 job market
        </p>
      </div>

      {/* Main Result Card */}
      <div className={cn(
        "rounded-3xl p-8 border-2 mb-8",
        topColors.bg,
        topColors.border
      )}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className={cn(
            "w-24 h-24 rounded-2xl flex items-center justify-center bg-card shadow-md flex-shrink-0"
          )}>
            <TopIcon className={cn("w-12 h-12", topColors.text)} />
          </div>
          <div className="text-center md:text-left flex-grow">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Your Recommended Pathway
            </p>
            <h3 className={cn("font-display text-3xl md:text-4xl font-bold mb-2", topColors.text)}>
              {topPathway.pathway}
            </h3>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                topColors.bg,
                topColors.text
              )}>
                {topPathway.percentage}% Match
              </span>
              <span className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                results.confidence === 'High' ? 'bg-secondary/20 text-secondary' :
                results.confidence === 'Medium' ? 'bg-accent/20 text-accent' :
                'bg-muted text-muted-foreground'
              )}>
                {results.confidence} Confidence
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pathway Comparison */}
      <div className="bg-card rounded-2xl shadow-card p-6 mb-8">
        <h4 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Pathway Match Comparison
        </h4>
        <div className="space-y-6">
          {results.pathways.map((pathway, index) => {
            const colors = pathwayColors[pathway.pathway];
            const Icon = pathwayIcons[pathway.pathway];
            
            return (
              <div key={pathway.pathway}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-5 h-5", colors.text)} />
                    <span className="font-medium">{pathway.pathway}</span>
                    {index === 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-medium">
                        Best Match
                      </span>
                    )}
                  </div>
                  <span className={cn("font-bold", colors.text)}>{pathway.percentage}%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", colors.bar)}
                    style={{ 
                      width: `${pathway.percentage}%`,
                      animation: 'progress-fill 1s ease-out forwards'
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Interest: {pathway.interestScore}%</span>
                  <span>Market: {pathway.marketScore}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-card rounded-2xl shadow-card p-6">
          <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-stem" />
            Recommended Subjects
          </h4>
          <div className="space-y-3">
            {results.recommendedSubjects.slice(0, 6).map((subject) => (
              <div 
                key={subject.code}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-xl"
              >
                <div>
                  <p className="font-medium">{subject.name}</p>
                  <p className="text-sm text-muted-foreground">{subject.cluster}</p>
                </div>
                <span className="text-xs font-mono bg-stem/10 text-stem px-2 py-1 rounded">
                  {subject.code}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Career Opportunities */}
        <div className="bg-card rounded-2xl shadow-card p-6">
          <h4 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-social" />
            Career Opportunities
          </h4>
          <div className="space-y-3">
            {results.recommendedCareers.slice(0, 5).map((career) => (
              <div 
                key={career.title}
                className="p-4 bg-muted/50 rounded-xl"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">{career.title}</p>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    career.growthRate === 'High' ? 'bg-secondary/20 text-secondary' :
                    career.growthRate === 'Medium' ? 'bg-accent/20 text-accent' :
                    'bg-muted text-muted-foreground'
                  )}>
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {career.growthRate}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary">{career.salaryRange}</p>
                  {'education' in career && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Education:</span> {(career as any).education}
                    </p>
                  )}
                  {'industry' in career && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Industry:</span> {(career as any).industry}
                    </p>
                  )}
                  {'outlook2026' in career && (
                    <p className="text-xs text-muted-foreground italic mt-1">
                      📈 {(career as any).outlook2026}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Button 
          variant="outline" 
          onClick={resetAssessment}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake Assessment
        </Button>
        <Button 
          variant="default"
          onClick={() => navigate('/careers')}
        >
          Explore More Careers
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Feedback Section */}
      <Feedback />
    </div>
  );
}
