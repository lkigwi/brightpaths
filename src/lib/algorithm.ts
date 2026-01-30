// Bright Paths - Pathway Prediction Algorithm

import { 
  Pathway, 
  academicSubjects, 
  jobMarketWeights, 
  quizQuestions,
  subjects,
  careers 
} from './data';

export interface AcademicScores {
  [subject: string]: {
    grade7: number;
    grade8: number;
    grade9: number;
  };
}

export interface QuizAnswers {
  [questionId: number]: Pathway;
}

export interface PathwayResult {
  pathway: Pathway;
  percentage: number;
  academicScore: number;
  interestScore: number;
  marketScore: number;
}

export interface FullResults {
  pathways: PathwayResult[];
  recommendedPathway: Pathway;
  recommendedSubjects: typeof subjects;
  recommendedCareers: typeof careers;
  confidence: 'High' | 'Medium' | 'Low';
}

// Calculate pathway scores from academic data (50% weight)
export function calculateAcademicScores(scores: AcademicScores): Record<Pathway, number> {
  const pathwayScores: Record<Pathway, number> = {
    'STEM': 0,
    'Social Sciences': 0,
    'Arts & Sports': 0,
  };

  const pathwayCounts: Record<Pathway, number> = {
    'STEM': 0,
    'Social Sciences': 0,
    'Arts & Sports': 0,
  };

  for (const subject of academicSubjects) {
    const subjectScores = scores[subject.name];
    if (subjectScores) {
      // Average across all three grades with more weight on recent grades
      const weightedAvg = 
        (subjectScores.grade7 * 0.2) + 
        (subjectScores.grade8 * 0.3) + 
        (subjectScores.grade9 * 0.5);
      
      // Apply subject weight
      pathwayScores[subject.pathway] += weightedAvg * subject.weight;
      pathwayCounts[subject.pathway] += subject.weight;
    }
  }

  // Normalize scores to 0-100
  for (const pathway of Object.keys(pathwayScores) as Pathway[]) {
    if (pathwayCounts[pathway] > 0) {
      pathwayScores[pathway] = pathwayScores[pathway] / pathwayCounts[pathway];
    }
  }

  return pathwayScores;
}

// Calculate pathway scores from quiz answers (30% weight)
export function calculateInterestScores(answers: QuizAnswers): Record<Pathway, number> {
  const pathwayCounts: Record<Pathway, number> = {
    'STEM': 0,
    'Social Sciences': 0,
    'Arts & Sports': 0,
  };

  for (const questionId of Object.keys(answers)) {
    const pathway = answers[parseInt(questionId)];
    if (pathway) {
      pathwayCounts[pathway]++;
    }
  }

  const totalAnswers = Object.keys(answers).length || 1;

  return {
    'STEM': (pathwayCounts['STEM'] / totalAnswers) * 100,
    'Social Sciences': (pathwayCounts['Social Sciences'] / totalAnswers) * 100,
    'Arts & Sports': (pathwayCounts['Arts & Sports'] / totalAnswers) * 100,
  };
}

// Apply job market trends (20% weight)
export function calculateMarketScores(): Record<Pathway, number> {
  const baseScore = 100;
  return {
    'STEM': baseScore * jobMarketWeights['STEM'],
    'Social Sciences': baseScore * jobMarketWeights['Social Sciences'],
    'Arts & Sports': baseScore * jobMarketWeights['Arts & Sports'],
  };
}

// Main algorithm: Quiz-only prediction (interest 70%, market 30%)
export function predictPathwayFromQuizOnly(
  quizAnswers: QuizAnswers
): FullResults {
  // Calculate individual scores
  const interest = calculateInterestScores(quizAnswers);
  const market = calculateMarketScores();

  // Weighted combination (70% interest, 30% market)
  const finalScores: Record<Pathway, number> = {
    'STEM': 0,
    'Social Sciences': 0,
    'Arts & Sports': 0,
  };

  for (const pathway of Object.keys(finalScores) as Pathway[]) {
    finalScores[pathway] = 
      (interest[pathway] * 0.7) + 
      (market[pathway] * 0.3);
  }

  // Normalize to percentages that sum to 100
  const total = Object.values(finalScores).reduce((a, b) => a + b, 0) || 1;
  
  const pathways: PathwayResult[] = (Object.keys(finalScores) as Pathway[])
    .map(pathway => ({
      pathway,
      percentage: Math.round((finalScores[pathway] / total) * 100),
      academicScore: 0,
      interestScore: Math.round(interest[pathway]),
      marketScore: Math.round(market[pathway]),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // Ensure percentages sum to 100
  const sumPercentages = pathways.reduce((sum, p) => sum + p.percentage, 0);
  if (sumPercentages !== 100) {
    pathways[0].percentage += (100 - sumPercentages);
  }

  const recommendedPathway = pathways[0].pathway;

  // Calculate confidence based on margin
  const margin = pathways[0].percentage - pathways[1].percentage;
  let confidence: 'High' | 'Medium' | 'Low';
  if (margin >= 20) {
    confidence = 'High';
  } else if (margin >= 10) {
    confidence = 'Medium';
  } else {
    confidence = 'Low';
  }

  // Get recommended subjects
  const recommendedSubjects = subjects.filter(s => s.pathway === recommendedPathway);

  // Get recommended careers
  const recommendedCareers = careers.filter(c => c.pathway === recommendedPathway);

  return {
    pathways,
    recommendedPathway,
    recommendedSubjects,
    recommendedCareers,
    confidence,
  };
}

// Generate subject combinations based on pathway
export function generateSubjectCombination(pathway: Pathway): typeof subjects {
  const pathwaySubjects = subjects.filter(s => s.pathway === pathway);
  // Return first 5 subjects as recommended combination
  return pathwaySubjects.slice(0, 5);
}
