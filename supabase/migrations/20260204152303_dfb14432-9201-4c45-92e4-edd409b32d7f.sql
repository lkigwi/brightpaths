-- FIX: Enable FORCE RLS on assessment_results to prevent any RLS bypass
-- This ensures even table owners cannot bypass row-level security
ALTER TABLE public.assessment_results FORCE ROW LEVEL SECURITY;

-- Update DELETE policy to only apply to authenticated role (matching SELECT policy)
DROP POLICY IF EXISTS "Admins can delete assessment results" ON public.assessment_results;
CREATE POLICY "Admins can delete assessment results" 
ON public.assessment_results 
FOR DELETE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also update INSERT policy to use authenticated role for consistency
DROP POLICY IF EXISTS "Authenticated users can submit assessment results" ON public.assessment_results;
CREATE POLICY "Authenticated users can submit assessment results" 
ON public.assessment_results 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);