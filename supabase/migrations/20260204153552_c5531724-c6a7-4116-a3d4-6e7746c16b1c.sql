-- FIX: Add user_id column to assessment_results to enable user ownership
-- This allows each student to view only their own results

-- Add user_id column (nullable initially for existing data)
ALTER TABLE public.assessment_results 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX idx_assessment_results_user_id ON public.assessment_results(user_id);

-- Add RLS policy allowing users to view their own results
CREATE POLICY "Users can view own assessment results" 
ON public.assessment_results 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Update INSERT policy to enforce user_id matches authenticated user
DROP POLICY IF EXISTS "Authenticated users can submit assessment results" ON public.assessment_results;
CREATE POLICY "Users can submit own assessment results" 
ON public.assessment_results 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);