import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare, Send, Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAssessment } from '@/context/AssessmentContext';

// Input validation constants
const MAX_COMMENT_LENGTH = 1000;

// Sanitize comment input
const sanitizeComment = (input: string): string => {
  const trimmed = input.trim().slice(0, MAX_COMMENT_LENGTH);
  return trimmed.replace(/[\x00-\x1F\x7F]/g, '');
};

export function Feedback() {
  const { assessmentId } = useAssessment();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_COMMENT_LENGTH) {
      setComment(value);
    }
  };

  const handleSubmit = async () => {
    if (rating === null) {
      toast.error('Please select a rating before submitting');
      return;
    }

    setIsSubmitting(true);
    const sanitizedComment = sanitizeComment(comment);

    try {
      const { error } = await supabase.from('feedback').insert({
        assessment_id: assessmentId || null,
        rating,
        comment: sanitizedComment || null,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success('Thank you for your feedback!');
    } catch {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRating(null);
    setComment('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">
              Thank You!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Your feedback helps us improve Bright Paths for all students.
            </p>
            <Button variant="outline" onClick={handleReset}>
              Submit Another Response
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Rate Your <span className="text-gradient-primary">Experience</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Help us improve by sharing your feedback about Bright Paths.
            </p>
          </div>

          {/* Rating Section */}
          <div className="bg-card rounded-2xl shadow-card p-5 sm:p-8 mb-6">
            <Label className="text-base font-semibold mb-4 block">
              How would you rate this website? (1-10)
            </Label>
            
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHoveredRating(num)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-200",
                    "border-2 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 touch-manipulation",
                    rating === num
                      ? "bg-primary text-primary-foreground border-primary"
                      : hoveredRating !== null && num <= hoveredRating
                      ? "bg-primary/20 border-primary/50 text-primary"
                      : "bg-muted border-muted-foreground/20 text-muted-foreground hover:border-primary/50"
                  )}
                  aria-label={`Rate ${num} out of 10`}
                >
                  {num}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground mt-3">
              <span>Poor</span>
              <span>Average</span>
              <span>Excellent</span>
            </div>

            {rating !== null && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  You rated: {rating}/10
                </span>
              </div>
            )}
          </div>

          {/* Comment Section */}
          <div className="bg-card rounded-2xl shadow-card p-5 sm:p-8">
            <Label htmlFor="feedback-comment" className="text-base font-semibold mb-3 block">
              Share your thoughts (optional)
            </Label>
            <Textarea
              id="feedback-comment"
              placeholder="What did you like? What could be improved? Any suggestions..."
              value={comment}
              onChange={handleCommentChange}
              className="min-h-32 text-base resize-none"
              maxLength={MAX_COMMENT_LENGTH}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-muted-foreground">
                Your feedback is anonymous and helps us improve.
              </p>
              <span className="text-sm text-muted-foreground">
                {comment.length}/{MAX_COMMENT_LENGTH}
              </span>
            </div>

            {/* Submit Button */}
            <div className="mt-6 text-center">
              <Button 
                onClick={handleSubmit}
                size="lg"
                disabled={rating === null || isSubmitting}
                className="px-8"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
