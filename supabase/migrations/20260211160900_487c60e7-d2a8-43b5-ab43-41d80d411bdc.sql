
-- Fix 1: Update feedback validation to accept ratings 1-10 (matching frontend)
CREATE OR REPLACE FUNCTION public.validate_feedback_data()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.comment IS NOT NULL AND length(NEW.comment) > 1000 THEN
    RAISE EXCEPTION 'Feedback comment must be 1000 characters or less';
  END IF;

  IF NEW.comment IS NOT NULL THEN
    NEW.comment := regexp_replace(NEW.comment, '[[:cntrl:]]', '', 'g');
  END IF;

  IF NEW.rating < 1 OR NEW.rating > 10 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 10';
  END IF;

  RETURN NEW;
END;
$function$;

-- Fix 2: Block anonymous users from reading invite codes
CREATE POLICY "Anon users cannot access invite codes"
ON public.invite_codes
FOR SELECT
TO anon
USING (false);
