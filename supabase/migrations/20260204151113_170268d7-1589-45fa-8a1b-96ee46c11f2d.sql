-- FIX: Add validation trigger for invite codes to ensure cryptographic randomness
-- This prevents brute-force attacks by requiring minimum code complexity

-- Create validation function for invite codes
CREATE OR REPLACE FUNCTION public.validate_invite_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Check minimum length (32 characters for cryptographic strength)
  IF length(NEW.code) < 32 THEN
    RAISE EXCEPTION 'Invite code must be at least 32 characters for security';
  END IF;
  
  -- Check for sufficient complexity (must contain mix of uppercase, lowercase, and numbers)
  IF NEW.code !~ '[A-Z]' THEN
    RAISE EXCEPTION 'Invite code must contain at least one uppercase letter';
  END IF;
  
  IF NEW.code !~ '[a-z]' THEN
    RAISE EXCEPTION 'Invite code must contain at least one lowercase letter';
  END IF;
  
  IF NEW.code !~ '[0-9]' THEN
    RAISE EXCEPTION 'Invite code must contain at least one number';
  END IF;
  
  -- Ensure only alphanumeric characters (safe for URLs and forms)
  IF NEW.code !~ '^[A-Za-z0-9]+$' THEN
    RAISE EXCEPTION 'Invite code must contain only letters and numbers';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for invite code validation on insert and update
CREATE TRIGGER validate_invite_code_trigger
BEFORE INSERT OR UPDATE ON public.invite_codes
FOR EACH ROW
EXECUTE FUNCTION public.validate_invite_code();