import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizAnswers, FullResults, predictPathwayFromQuizOnly } from '@/lib/algorithm';
import { Pathway, QuizQuestion, getRandomQuizQuestions } from '@/lib/data';

interface AssessmentContextType {
  // State
  currentStep: number;
  studentName: string;
  quizAnswers: QuizAnswers;
  results: FullResults | null;
  currentQuestions: QuizQuestion[];
  
  // Actions
  setCurrentStep: (step: number) => void;
  setStudentName: (name: string) => void;
  setQuizAnswer: (questionId: number, pathway: Pathway) => void;
  calculateResults: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<FullResults | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>(() => getRandomQuizQuestions(10));

  const setQuizAnswer = (questionId: number, pathway: Pathway) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: pathway,
    }));
  };

  const calculateResults = () => {
    const fullResults = predictPathwayFromQuizOnly(quizAnswers);
    setResults(fullResults);
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setStudentName('');
    setQuizAnswers({});
    setResults(null);
    setCurrentQuestions(getRandomQuizQuestions(10)); // Get new random questions
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentStep,
        studentName,
        quizAnswers,
        results,
        currentQuestions,
        setCurrentStep,
        setStudentName,
        setQuizAnswer,
        calculateResults,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
