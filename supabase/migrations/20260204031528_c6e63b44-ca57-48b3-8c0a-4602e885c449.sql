-- FIX 1: Remove dangerous assign_user_role function that allows privilege escalation
DROP FUNCTION IF EXISTS public.assign_user_role(uuid, app_role);

-- FIX 2: Update use_invite_code to handle role assignment internally
CREATE OR REPLACE FUNCTION public.use_invite_code(invite_code TEXT)
RETURNS app_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  code_role app_role;
  calling_user_id UUID;
BEGIN
  calling_user_id := auth.uid();
  
  -- Require authentication
  IF calling_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  -- Consume the invite code
  UPDATE public.invite_codes
  SET uses_remaining = uses_remaining - 1
  WHERE code = invite_code
    AND uses_remaining > 0
    AND (expires_at IS NULL OR expires_at > now())
  RETURNING role INTO code_role;
  
  -- If no valid code found, return NULL
  IF code_role IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Assign role directly in this secure function
  INSERT INTO public.user_roles (user_id, role)
  VALUES (calling_user_id, code_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN code_role;
END;
$$;

-- FIX 3: Replace permissive invite_codes SELECT policy with admin-only access
DROP POLICY IF EXISTS "Anyone can check invite code validity" ON public.invite_codes;

-- Only admins can view invite codes (codes are validated server-side via use_invite_code function)
CREATE POLICY "Admins can view invite codes"
ON public.invite_codes
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- FIX 4: Require authentication for assessment results INSERT
DROP POLICY IF EXISTS "Anyone can submit assessment results" ON public.assessment_results;

CREATE POLICY "Authenticated users can submit assessment results"
ON public.assessment_results
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);