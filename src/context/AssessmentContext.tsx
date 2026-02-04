import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizAnswers, FullResults, predictPathwayFromQuizOnly } from '@/lib/algorithm';
import { Pathway, QuizQuestion, getRandomQuizQuestions } from '@/lib/data';
import { supabase } from '@/integrations/supabase/client';

interface AssessmentContextType {
  // State
  currentStep: number;
  studentName: string;
  quizAnswers: QuizAnswers;
  results: FullResults | null;
  currentQuestions: QuizQuestion[];
  assessmentId: string | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  setStudentName: (name: string) => void;
  setQuizAnswer: (questionId: number, pathway: Pathway | null) => void;
  calculateResults: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<FullResults | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>(() => getRandomQuizQuestions(15));
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  const setQuizAnswer = (questionId: number, pathway: Pathway | null) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: pathway,
    }));
  };

  const saveResultsToDatabase = async (fullResults: FullResults, name: string) => {
    try {
      // Get the current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('User must be authenticated to save assessment results');
        return;
      }

      const pathwayPercentages = {
        stem: fullResults.pathways.find(p => p.pathway === 'STEM')?.percentage || 0,
        social: fullResults.pathways.find(p => p.pathway === 'Social Sciences')?.percentage || 0,
        arts: fullResults.pathways.find(p => p.pathway === 'Arts & Sports')?.percentage || 0,
      };

      const { data, error } = await supabase.from('assessment_results').insert([{
        user_id: user.id,
        student_name: name || 'Anonymous',
        top_pathway: fullResults.pathways[0].pathway,
        top_pathway_percentage: fullResults.pathways[0].percentage,
        stem_percentage: pathwayPercentages.stem,
        social_sciences_percentage: pathwayPercentages.social,
        arts_sports_percentage: pathwayPercentages.arts,
        confidence: fullResults.confidence,
        recommended_subjects: JSON.parse(JSON.stringify(fullResults.recommendedSubjects)),
        recommended_careers: JSON.parse(JSON.stringify(fullResults.recommendedCareers)),
      }]).select('id').single();
      
      if (!error && data) {
        setAssessmentId(data.id);
      }
    } catch {
      // Error handled silently - user sees toast if needed
    }
  };

  const calculateResults = () => {
    const fullResults = predictPathwayFromQuizOnly(quizAnswers);
    setResults(fullResults);
    saveResultsToDatabase(fullResults, studentName);
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setStudentName('');
    setQuizAnswers({});
    setResults(null);
    setCurrentQuestions(getRandomQuizQuestions(15));
    setAssessmentId(null);
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentStep,
        studentName,
        quizAnswers,
        results,
        currentQuestions,
        assessmentId,
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
