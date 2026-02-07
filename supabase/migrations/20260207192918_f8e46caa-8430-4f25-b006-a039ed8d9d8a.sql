-- Fix 1: Add DELETE policy for profiles table (GDPR compliance)
-- Allow users to delete their own profiles
CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Allow admins to delete any profile
CREATE POLICY "Admins can delete any profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Add explicit restrictive SELECT policy for feedback table
-- This ensures anonymous users cannot read feedback even if RLS behavior changes
-- The existing admin-only SELECT policy already restricts reads to admins only,
-- but we add an explicit deny for anon role for defense in depth
CREATE POLICY "Anon users cannot read feedback"
ON public.feedback
FOR SELECT
TO anon
USING (false);