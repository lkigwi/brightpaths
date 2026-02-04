-- FIX 1: Add validation trigger for student_name (using triggers as recommended vs CHECK constraints)
CREATE OR REPLACE FUNCTION public.validate_student_name()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Check length
  IF length(NEW.student_name) < 1 OR length(NEW.student_name) > 100 THEN
    RAISE EXCEPTION 'Student name must be between 1 and 100 characters';
  END IF;
  
  -- Check valid characters (letters, spaces, hyphens, apostrophes)
  IF NEW.student_name !~ '^[\p{L}\s''-]+$' THEN
    RAISE EXCEPTION 'Student name can only contain letters, spaces, hyphens, and apostrophes';
  END IF;
  
  -- Remove any control characters
  NEW.student_name := regexp_replace(NEW.student_name, '[\x00-\x1F\x7F]', '', 'g');
  
  RETURN NEW;
END;
$$;

-- Create trigger on assessment_results for INSERT
CREATE TRIGGER validate_student_name_trigger
BEFORE INSERT ON public.assessment_results
FOR EACH ROW
EXECUTE FUNCTION public.validate_student_name();

-- FIX 2: Add explicit RLS policies for invite_codes table (INSERT, UPDATE, DELETE)
-- Admin-only INSERT policy
CREATE POLICY "Admins can create invite codes"
ON public.invite_codes
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin-only UPDATE policy
CREATE POLICY "Admins can update invite codes"
ON public.invite_codes
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin-only DELETE policy
CREATE POLICY "Admins can delete invite codes"
ON public.invite_codes
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));