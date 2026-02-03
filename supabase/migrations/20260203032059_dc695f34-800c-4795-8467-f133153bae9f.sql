-- Allow admins to delete assessment results
CREATE POLICY "Admins can delete assessment results"
ON public.assessment_results
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));