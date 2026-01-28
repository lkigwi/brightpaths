import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Brain, TrendingUp, Calculator, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-gradient-primary">Bright Careers</span> Works
          </h1>
          <p className="text-muted-foreground text-lg">
            Our three-layer algorithmic system combines academic performance, personal interests, 
            and real-world market data to give you the most accurate pathway recommendation.
          </p>
        </div>

        {/* Algorithm Explanation */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {/* Layer A */}
            <div className="flex gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-stem-light rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-stem" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-xl font-bold">Layer A: Academic Data</h3>
                  <span className="text-xs font-bold px-3 py-1 bg-stem/10 text-stem rounded-full">
                    50% Weight
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  We analyze your grades from Junior School (Grades 7, 8, and 9) across different 
                  subject clusters. Recent grades carry more weight since they better reflect your 
                  current abilities. Subjects are grouped by pathway relevance.
                </p>
                <div className="bg-card rounded-xl p-4 shadow-sm">
                  <p className="text-sm font-medium mb-2">Example Clustering:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <span className="text-stem font-medium">STEM:</span> Integrated Science, Mathematics, Pre-Technical Studies</li>
                    <li>• <span className="text-social font-medium">Social Sciences:</span> Social Studies, Business Studies, Languages</li>
                    <li>• <span className="text-arts font-medium">Arts & Sports:</span> Creative Arts, Physical Education</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Layer B */}
            <div className="flex gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-social-light rounded-2xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-social" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-xl font-bold">Layer B: Interest Profiling</h3>
                  <span className="text-xs font-bold px-3 py-1 bg-social/10 text-social rounded-full">
                    30% Weight
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  A 10-question psychometric quiz assesses your natural interests, problem-solving 
                  preferences, and career aspirations. This ensures your recommendation aligns 
                  with what you genuinely enjoy, not just what you're good at.
                </p>
                <div className="bg-card rounded-xl p-4 shadow-sm">
                  <p className="text-sm font-medium mb-2">Sample Questions:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "Do you prefer fixing a broken radio or writing a story?"</li>
                    <li>• "On a free Saturday, would you build something, read, or create art?"</li>
                    <li>• "What kind of YouTube videos do you watch most?"</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Layer C */}
            <div className="flex gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-arts-light rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-arts" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-xl font-bold">Layer C: Market Intelligence</h3>
                  <span className="text-xs font-bold px-3 py-1 bg-arts/10 text-arts rounded-full">
                    20% Weight
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  We incorporate 2026 Kenya job market trends to show you which careers are growing 
                  fastest. This ensures your pathway choice leads to real employment opportunities 
                  when you graduate.
                </p>
                <div className="bg-card rounded-xl p-4 shadow-sm">
                  <p className="text-sm font-medium mb-2">High-Growth Fields (2026):</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Renewable Energy Engineering (+25% growth)</li>
                    <li>• Software Development & Data Science (+20% growth)</li>
                    <li>• Digital Marketing & Content Creation (+18% growth)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-muted/50 rounded-3xl p-8 md:p-12 mb-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Calculator className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold">The Algorithm Formula</h3>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm mb-6">
            <p className="text-center font-mono text-lg">
              <span className="text-stem font-bold">Pathway Score</span> = 
              (<span className="text-stem">Academic × 0.5</span>) + 
              (<span className="text-social">Interest × 0.3</span>) + 
              (<span className="text-arts">Market × 0.2</span>)
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Each pathway receives a score based on this weighted formula. The pathway with the 
            highest score becomes your recommendation. We also calculate a confidence level based 
            on how much higher your top pathway scores compared to others.
          </p>
        </div>

        {/* Why This Matters */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-4">Why This Matters</h2>
            <p className="text-muted-foreground">
              Making the right pathway choice affects your entire educational and career journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-card text-center">
              <div className="w-14 h-14 bg-destructive/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-destructive" />
              </div>
              <h4 className="font-display font-semibold mb-2">The Problem</h4>
              <p className="text-sm text-muted-foreground">
                Many students choose pathways based on peer pressure or parental expectations, 
                leading to academic stress and career dissatisfaction.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-card text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-display font-semibold mb-2">Our Solution</h4>
              <p className="text-sm text-muted-foreground">
                Data-driven recommendations based on your actual performance, genuine interests, 
                and real market opportunities in Kenya.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-card text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-secondary" />
              </div>
              <h4 className="font-display font-semibold mb-2">The Impact</h4>
              <p className="text-sm text-muted-foreground">
                Students who align their education with their strengths are 3x more likely 
                to succeed academically and professionally.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="font-display text-2xl font-bold mb-4">
            Ready to Find Your Path?
          </h3>
          <p className="text-muted-foreground mb-6">
            The assessment takes about 10-15 minutes and provides instant results.
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/assessment')}
            className="group"
          >
            Start Your Assessment
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
