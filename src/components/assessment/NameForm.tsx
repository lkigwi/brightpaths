import { useAssessment } from '@/context/AssessmentContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, User } from 'lucide-react';

export function NameForm() {
  const { studentName, setStudentName, setCurrentStep } = useAssessment();

  const isComplete = () => {
    return studentName.trim().length >= 2;
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          What's Your Name?
        </h2>
        <p className="text-muted-foreground">
          Let's personalize your pathway recommendation experience.
        </p>
      </div>

      <div className="max-w-md mx-auto bg-card rounded-2xl shadow-card p-8">
        <Label htmlFor="studentName" className="text-base font-semibold mb-3 block">
          Your Full Name
        </Label>
        <Input
          id="studentName"
          placeholder="Enter your full name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="text-lg h-12"
          autoFocus
        />
        <p className="text-sm text-muted-foreground mt-2">
          This will appear on your results dashboard.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 max-w-md mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentStep(0)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(2)}
          disabled={!isComplete()}
        >
          Start Quiz
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
