-- Create validation function for profile data
CREATE OR REPLACE FUNCTION public.validate_profile_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate display_name length (max 100 characters)
  IF NEW.display_name IS NOT NULL AND length(NEW.display_name) > 100 THEN
    RAISE EXCEPTION 'Display name too long (max 100 characters)';
  END IF;
  
  -- Validate display_name contains only safe characters (letters, spaces, hyphens, apostrophes)
  IF NEW.display_name IS NOT NULL AND NEW.display_name !~ '^[\p{L}\s''\-]*$' THEN
    RAISE EXCEPTION 'Display name can only contain letters, spaces, hyphens, and apostrophes';
  END IF;
  
  -- Validate avatar_url is a proper HTTP(S) URL or null
  IF NEW.avatar_url IS NOT NULL AND 
     NEW.avatar_url !~ '^https?://[^\s<>"'']+$' THEN
    RAISE EXCEPTION 'Avatar URL must be a valid HTTP(S) URL';
  END IF;
  
  -- Sanitize display_name - remove control characters
  IF NEW.display_name IS NOT NULL THEN
    NEW.display_name := regexp_replace(NEW.display_name, '[\x00-\x1F\x7F]', '', 'g');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for profiles table
CREATE TRIGGER validate_profile_trigger
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.validate_profile_data();