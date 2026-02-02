-- Create assessment_results table to store all completed assessments
CREATE TABLE public.assessment_results (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name TEXT NOT NULL,
    top_pathway TEXT NOT NULL,
    top_pathway_percentage INTEGER NOT NULL,
    stem_percentage INTEGER NOT NULL,
    social_sciences_percentage INTEGER NOT NULL,
    arts_sports_percentage INTEGER NOT NULL,
    confidence TEXT NOT NULL,
    recommended_subjects JSONB NOT NULL DEFAULT '[]'::jsonb,
    recommended_careers JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert results (no auth required for assessment)
CREATE POLICY "Anyone can insert assessment results"
ON public.assessment_results
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view all results (public leaderboard/results page)
CREATE POLICY "Anyone can view assessment results"
ON public.assessment_results
FOR SELECT
USING (true);