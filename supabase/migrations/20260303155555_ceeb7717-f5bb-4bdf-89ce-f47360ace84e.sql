-- Harden public assessment submission policy to avoid WITH CHECK (true)
DROP POLICY IF EXISTS "Anyone can submit assessment results" ON public.assessment_results;

CREATE POLICY "Anyone can submit assessment results"
ON public.assessment_results
AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(student_name) BETWEEN 1 AND 100
  AND top_pathway IN ('STEM', 'Social Sciences', 'Arts & Sports')
  AND confidence IN ('High', 'Medium', 'Low')
  AND top_pathway_percentage BETWEEN 0 AND 100
  AND stem_percentage BETWEEN 0 AND 100
  AND social_sciences_percentage BETWEEN 0 AND 100
  AND arts_sports_percentage BETWEEN 0 AND 100
  AND (stem_percentage + social_sciences_percentage + arts_sports_percentage) = 100
  AND jsonb_typeof(recommended_subjects) = 'array'
  AND jsonb_typeof(recommended_careers) = 'array'
);