
CREATE OR REPLACE FUNCTION public.validate_student_name()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check length
  IF length(NEW.student_name) < 1 OR length(NEW.student_name) > 100 THEN
    RAISE EXCEPTION 'Student name must be between 1 and 100 characters';
  END IF;
  
  -- Check valid characters (letters, spaces, hyphens, apostrophes) using POSIX classes
  IF NEW.student_name !~ '^[[:alpha:][:space:]'' -]+$' THEN
    RAISE EXCEPTION 'Student name can only contain letters, spaces, hyphens, and apostrophes';
  END IF;
  
  -- Remove any control characters
  NEW.student_name := regexp_replace(NEW.student_name, '[[:cntrl:]]', '', 'g');
  
  RETURN NEW;
END;
$function$;

-- Attach trigger if not already present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'validate_student_name_trigger'
  ) THEN
    CREATE TRIGGER validate_student_name_trigger
      BEFORE INSERT OR UPDATE ON public.assessment_results
      FOR EACH ROW EXECUTE FUNCTION public.validate_student_name();
  END IF;
END $$;
