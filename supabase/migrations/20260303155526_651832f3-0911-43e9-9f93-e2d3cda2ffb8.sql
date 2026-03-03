-- Harden feedback insert policy to avoid overly permissive WITH CHECK (true)
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;

CREATE POLICY "Anyone can submit feedback"
ON public.feedback
AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (
  rating BETWEEN 1 AND 10
  AND (
    comment IS NULL
    OR char_length(comment) <= 1000
  )
  AND (
    assessment_id IS NULL
    OR EXISTS (
      SELECT 1
      FROM public.assessment_results ar
      WHERE ar.id = assessment_id
    )
  )
);