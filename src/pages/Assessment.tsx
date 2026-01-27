import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AssessmentProvider, useAssessment } from '@/context/AssessmentContext';
import { AssessmentIntro } from '@/components/assessment/AssessmentIntro';
import { AcademicForm } from '@/components/assessment/AcademicForm';
import { InterestQuiz } from '@/components/assessment/InterestQuiz';
import { ResultsDashboard } from '@/components/assessment/ResultsDashboard';
import { cn } from '@/lib/utils';

const steps = [
  { id: 0, name: 'Introduction' },
  { id: 1, name: 'Academic Data' },
  { id: 2, name: 'Interest Quiz' },
  { id: 3, name: 'Results' },
];

function AssessmentContent() {
  const { currentStep } = useAssessment();

  return (
    <div className="min-h-screen pt-20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Step Indicator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                    currentStep >= step.id 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {step.id + 1}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 hidden sm:block",
                    currentStep >= step.id 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground"
                  )}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-16 sm:w-24 h-1 mx-2",
                    currentStep > step.id 
                      ? "bg-primary" 
                      : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 0 && <AssessmentIntro />}
          {currentStep === 1 && <AcademicForm />}
          {currentStep === 2 && <InterestQuiz />}
          {currentStep === 3 && <ResultsDashboard />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Assessment() {
  return (
    <AssessmentProvider>
      <AssessmentContent />
    </AssessmentProvider>
  );
}
