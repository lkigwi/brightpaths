-- Drop the permissive open INSERT policy
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;

-- Deny all direct inserts (edge function uses service role, bypasses RLS)
CREATE POLICY "No direct feedback inserts"
ON public.feedback FOR INSERT
TO anon, authenticated
WITH CHECK (false);