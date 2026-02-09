
CREATE OR REPLACE FUNCTION public.validate_profile_data()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.display_name IS NOT NULL AND length(NEW.display_name) > 100 THEN
    RAISE EXCEPTION 'Display name too long (max 100 characters)';
  END IF;
  
  IF NEW.display_name IS NOT NULL AND NEW.display_name !~ '^[\p{L}\s'' -]+$' THEN
    RAISE EXCEPTION 'Display name can only contain letters, spaces, hyphens, and apostrophes';
  END IF;
  
  IF NEW.avatar_url IS NOT NULL AND 
     NEW.avatar_url !~ '^https?://[^\s<>"'']+$' THEN
    RAISE EXCEPTION 'Avatar URL must be a valid HTTP(S) URL';
  END IF;
  
  IF NEW.display_name IS NOT NULL THEN
    NEW.display_name := regexp_replace(NEW.display_name, '[\x00-\x1F\x7F]', '', 'g');
  END IF;
  
  RETURN NEW;
END;
$function$;
