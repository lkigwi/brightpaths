-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Create invite_codes table for admin registration
CREATE TABLE public.invite_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    role app_role NOT NULL DEFAULT 'admin',
    uses_remaining INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invite_codes ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- User roles policies (read-only for users, managed by triggers)
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Invite codes policies (only admins can manage, anyone can check validity)
CREATE POLICY "Anyone can check invite code validity"
ON public.invite_codes FOR SELECT
USING (uses_remaining > 0 AND (expires_at IS NULL OR expires_at > now()));

-- Update assessment_results policies - remove public access
DROP POLICY IF EXISTS "Anyone can insert assessment results" ON public.assessment_results;
DROP POLICY IF EXISTS "Anyone can view assessment results" ON public.assessment_results;

-- Anyone can still submit assessment results (for students taking the quiz)
CREATE POLICY "Anyone can submit assessment results"
ON public.assessment_results FOR INSERT
WITH CHECK (true);

-- Only admins can view all assessment results
CREATE POLICY "Admins can view all assessment results"
ON public.assessment_results FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Function to handle new user signup (creates profile)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to validate and use invite code (returns role if valid)
CREATE OR REPLACE FUNCTION public.use_invite_code(invite_code TEXT)
RETURNS app_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  code_role app_role;
BEGIN
  UPDATE public.invite_codes
  SET uses_remaining = uses_remaining - 1
  WHERE code = invite_code
    AND uses_remaining > 0
    AND (expires_at IS NULL OR expires_at > now())
  RETURNING role INTO code_role;
  
  RETURN code_role;
END;
$$;

-- Function to assign role to user
CREATE OR REPLACE FUNCTION public.assign_user_role(target_user_id UUID, target_role app_role)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, target_role)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Insert a default invite code for initial admin setup
INSERT INTO public.invite_codes (code, role, uses_remaining)
VALUES ('BRIGHTPATHS2024', 'admin', 10);