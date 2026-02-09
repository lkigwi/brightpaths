
-- 1. Add feedback comment validation trigger (defense-in-depth for 1000 char limit)
CREATE OR REPLACE FUNCTION public.validate_feedback_data()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  -- Enforce max comment length
  IF NEW.comment IS NOT NULL AND length(NEW.comment) > 1000 THEN
    RAISE EXCEPTION 'Feedback comment must be 1000 characters or less';
  END IF;

  -- Sanitize control characters
  IF NEW.comment IS NOT NULL THEN
    NEW.comment := regexp_replace(NEW.comment, '[\x00-\x1F\x7F]', '', 'g');
  END IF;

  -- Validate rating range
  IF NEW.rating < 1 OR NEW.rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_feedback_before_insert
BEFORE INSERT ON public.feedback
FOR EACH ROW
EXECUTE FUNCTION public.validate_feedback_data();

-- 2. Add explicit UPDATE policies on assessment_results for defense-in-depth
CREATE POLICY "Assessment results are immutable for users"
ON public.assessment_results
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "Admins can update assessment results"
ON public.assessment_results
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
