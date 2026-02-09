
-- 1. Add explicit deny policy for anonymous access on assessment_results
CREATE POLICY "Anon users cannot access assessment results"
ON public.assessment_results
FOR SELECT
TO anon
USING (false);

-- 2. Add admin SELECT policy on profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
