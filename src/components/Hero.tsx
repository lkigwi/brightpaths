import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, GraduationCap, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">CBC 2026 Ready</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Discover Your Perfect
            <span className="text-gradient-primary block mt-2">Senior School Pathway</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A smart decision-support system that analyzes your academic performance, 
            interests, and Kenya's 2026 job market to recommend your ideal CBC pathway.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate('/assessment')}
              className="group"
            >
              Start Your Assessment
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => navigate('/about')}
            >
              Learn How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col items-center p-6 bg-card rounded-2xl shadow-card">
              <div className="w-12 h-12 bg-stem-light rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-stem" />
              </div>
              <span className="text-3xl font-bold font-display text-foreground">500+</span>
              <span className="text-sm text-muted-foreground">Subject Combinations</span>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-2xl shadow-card">
              <div className="w-12 h-12 bg-social-light rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-social" />
              </div>
              <span className="text-3xl font-bold font-display text-foreground">3</span>
              <span className="text-sm text-muted-foreground">Career Pathways</span>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-2xl shadow-card">
              <div className="w-12 h-12 bg-arts-light rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-arts" />
              </div>
              <span className="text-3xl font-bold font-display text-foreground">2026</span>
              <span className="text-sm text-muted-foreground">Job Market Data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
