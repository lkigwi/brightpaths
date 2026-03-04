
-- Drop the permissive anonymous INSERT policy
DROP POLICY IF EXISTS "Anyone can submit assessment results" ON public.assessment_results;

-- Create a new INSERT policy that requires authentication
CREATE POLICY "Authenticated users can submit assessment results"
ON public.assessment_results
FOR INSERT
TO authenticated
WITH CHECK (
  (auth.uid() = user_id) AND
  ((char_length(student_name) >= 1) AND (char_length(student_name) <= 100)) AND
  (top_pathway = ANY (ARRAY['STEM'::text, 'Social Sciences'::text, 'Arts & Sports'::text])) AND
  (confidence = ANY (ARRAY['High'::text, 'Medium'::text, 'Low'::text])) AND
  ((top_pathway_percentage >= 0) AND (top_pathway_percentage <= 100)) AND
  ((stem_percentage >= 0) AND (stem_percentage <= 100)) AND
  ((social_sciences_percentage >= 0) AND (social_sciences_percentage <= 100)) AND
  ((arts_sports_percentage >= 0) AND (arts_sports_percentage <= 100)) AND
  (((stem_percentage + social_sciences_percentage) + arts_sports_percentage) = 100) AND
  (jsonb_typeof(recommended_subjects) = 'array'::text) AND
  (jsonb_typeof(recommended_careers) = 'array'::text)
);
