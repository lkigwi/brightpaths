
-- Drop the restrictive insert policy that requires auth.uid() = user_id
DROP POLICY IF EXISTS "Users can submit own assessment results" ON public.assessment_results;

-- Allow anyone (including anonymous/unauthenticated) to insert assessment results
CREATE POLICY "Anyone can submit assessment results"
  ON public.assessment_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
