import { useAssessment } from '@/context/AssessmentContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, User } from 'lucide-react';
import { useState } from 'react';

// Input validation constants
const MAX_NAME_LENGTH = 100;
const MIN_NAME_LENGTH = 2;
// Allow letters, spaces, hyphens, apostrophes, and common diacritics
const NAME_PATTERN = /^[\p{L}\s'-]+$/u;

// Sanitize and validate name input
const sanitizeName = (input: string): string => {
  // Trim whitespace and limit length
  const trimmed = input.trim().slice(0, MAX_NAME_LENGTH);
  // Remove any control characters or null bytes
  return trimmed.replace(/[\x00-\x1F\x7F]/g, '');
};

const validateName = (name: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeName(name);
  
  if (sanitized.length === 0) {
    return { isValid: false };
  }
  
  if (sanitized.length < MIN_NAME_LENGTH) {
    return { isValid: false, error: `Name must be at least ${MIN_NAME_LENGTH} characters` };
  }
  
  if (sanitized.length > MAX_NAME_LENGTH) {
    return { isValid: false, error: `Name must be less than ${MAX_NAME_LENGTH} characters` };
  }
  
  if (!NAME_PATTERN.test(sanitized)) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }
  
  return { isValid: true };
};

export function NameForm() {
  const { studentName, setStudentName, setCurrentStep } = useAssessment();
  const [validationError, setValidationError] = useState<string | undefined>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Limit input length at the input level
    if (rawValue.length > MAX_NAME_LENGTH) {
      return;
    }
    
    // Update state with the raw value (allows typing)
    setStudentName(rawValue);
    
    // Validate and show errors
    if (rawValue.trim().length > 0) {
      const validation = validateName(rawValue);
      setValidationError(validation.error);
    } else {
      setValidationError(undefined);
    }
  };

  const isComplete = () => {
    const validation = validateName(studentName);
    return validation.isValid;
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
          onChange={handleNameChange}
          className="text-lg h-12"
          autoFocus
          maxLength={MAX_NAME_LENGTH}
          aria-describedby="name-hint name-error"
        />
        {validationError ? (
          <p id="name-error" className="text-sm text-destructive mt-2" role="alert">
            {validationError}
          </p>
        ) : (
          <p id="name-hint" className="text-sm text-muted-foreground mt-2">
            This will appear on your results dashboard. ({MAX_NAME_LENGTH - studentName.length} characters remaining)
          </p>
        )}
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
