import { Button } from '@/components/ui/button';
import { useAssessment } from '@/context/AssessmentContext';
import { ArrowRight, BookOpen, Brain, TrendingUp, Clock } from 'lucide-react';

export function AssessmentIntro() {
  const { setCurrentStep } = useAssessment();

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Ready to Discover Your Path?
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          This assessment will analyze your interests and career potential 
          to recommend the best CBC Senior School pathway for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card rounded-2xl p-6 shadow-card text-center">
          <div className="w-14 h-14 bg-stem-light rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-stem" />
          </div>
          <h3 className="font-display font-semibold mb-2">Step 1: Your Name</h3>
          <p className="text-muted-foreground text-sm">
            Tell us your name for a personalized experience.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-card text-center">
          <div className="w-14 h-14 bg-social-light rounded-xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-7 h-7 text-social" />
          </div>
          <h3 className="font-display font-semibold mb-2">Step 2: Interest Quiz</h3>
          <p className="text-muted-foreground text-sm">
            Answer 10 questions about your interests and preferences.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-card text-center">
          <div className="w-14 h-14 bg-arts-light rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-7 h-7 text-arts" />
          </div>
          <h3 className="font-display font-semibold mb-2">Step 3: Get Results</h3>
          <p className="text-muted-foreground text-sm">
            See your personalized pathway recommendation and career options.
          </p>
        </div>
      </div>

      <div className="bg-muted/50 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-primary" />
          <span className="font-medium">Estimated Time: 10-15 minutes</span>
        </div>
        <ul className="text-sm text-muted-foreground space-y-2 ml-8">
          <li>• Answer all quiz questions honestly for best results</li>
          <li>• Your data stays private and is not stored</li>
        </ul>
      </div>

      <div className="text-center">
        <Button 
          variant="hero" 
          size="xl" 
          onClick={() => setCurrentStep(1)}
          className="group"
        >
          Begin Assessment
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
