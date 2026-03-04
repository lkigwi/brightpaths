-- Explicitly deny all updates on feedback (immutable data)
CREATE POLICY "Feedback is immutable"
ON public.feedback
FOR UPDATE
TO authenticated, anon
USING (false);

-- Create rate limiting table for anonymous submissions
CREATE TABLE public.submission_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_ip TEXT NOT NULL,
  table_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on rate limits table
ALTER TABLE public.submission_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_rate_limits FORCE ROW LEVEL SECURITY;

-- No direct access to rate limits table (only edge function with service role)
CREATE POLICY "No public access to rate limits"
ON public.submission_rate_limits
FOR ALL
TO anon, authenticated
USING (false);

-- Index for efficient lookups
CREATE INDEX idx_rate_limits_ip_table_time 
ON public.submission_rate_limits (client_ip, table_name, created_at DESC);

-- Cleanup function for old rate limit entries (keep last 24h)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  DELETE FROM public.submission_rate_limits
  WHERE created_at < now() - interval '24 hours';
$$;