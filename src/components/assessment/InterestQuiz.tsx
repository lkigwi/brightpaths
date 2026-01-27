import { useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { quizQuestions, Pathway } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Brain, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InterestQuiz() {
  const { quizAnswers, setQuizAnswer, setCurrentStep, calculateResults } = useAssessment();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (pathway: Pathway) => {
    setQuizAnswer(question.id, pathway);
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setCurrentStep(1);
    }
  };

  const answeredCount = Object.keys(quizAnswers).length;
  const isQuizComplete = answeredCount === totalQuestions;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-social-light rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-social" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          Interest Assessment
        </h2>
        <p className="text-muted-foreground">
          Answer honestly - there are no right or wrong answers!
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{answeredCount}/{totalQuestions} answered</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-secondary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-2xl shadow-card p-8 mb-8">
        <h3 className="font-display text-xl md:text-2xl font-semibold mb-6 text-center">
          {question.question}
        </h3>

        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = quizAnswers[question.id] === option.pathway;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(option.pathway)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                  isSelected 
                    ? "border-secondary bg-secondary/10" 
                    : "border-border hover:border-secondary/50 hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                    isSelected 
                      ? "border-secondary bg-secondary" 
                      : "border-muted-foreground"
                  )}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-secondary-foreground" />}
                  </div>
                  <span className="font-medium">{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Navigation */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {quizQuestions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => setCurrentQuestion(index)}
            className={cn(
              "w-8 h-8 rounded-full text-sm font-medium transition-all duration-200",
              index === currentQuestion 
                ? "bg-secondary text-secondary-foreground" 
                : quizAnswers[q.id] 
                  ? "bg-secondary/20 text-secondary" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="ghost" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentQuestion === 0 ? 'Back to Grades' : 'Previous'}
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!quizAnswers[question.id]}
          variant={isQuizComplete && currentQuestion === totalQuestions - 1 ? 'hero' : 'default'}
        >
          {currentQuestion === totalQuestions - 1 ? 'See My Results' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
