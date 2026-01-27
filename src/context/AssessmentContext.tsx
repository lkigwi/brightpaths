import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AcademicScores, QuizAnswers, FullResults, predictPathway } from '@/lib/algorithm';
import { Pathway } from '@/lib/data';

interface AssessmentContextType {
  // State
  currentStep: number;
  studentName: string;
  academicScores: AcademicScores;
  quizAnswers: QuizAnswers;
  results: FullResults | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  setStudentName: (name: string) => void;
  updateAcademicScore: (subject: string, grade: 'grade7' | 'grade8' | 'grade9', score: number) => void;
  setQuizAnswer: (questionId: number, pathway: Pathway) => void;
  calculateResults: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [academicScores, setAcademicScores] = useState<AcademicScores>({});
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<FullResults | null>(null);

  const updateAcademicScore = (
    subject: string, 
    grade: 'grade7' | 'grade8' | 'grade9', 
    score: number
  ) => {
    setAcademicScores(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [grade]: score,
      },
    }));
  };

  const setQuizAnswer = (questionId: number, pathway: Pathway) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: pathway,
    }));
  };

  const calculateResults = () => {
    const fullResults = predictPathway(academicScores, quizAnswers);
    setResults(fullResults);
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setStudentName('');
    setAcademicScores({});
    setQuizAnswers({});
    setResults(null);
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentStep,
        studentName,
        academicScores,
        quizAnswers,
        results,
        setCurrentStep,
        setStudentName,
        updateAcademicScore,
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
