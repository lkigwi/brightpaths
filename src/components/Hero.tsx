import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, GraduationCap, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      {/* Animated circles */}
      <div className="absolute top-10 -left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-10 -right-10 w-56 h-56 md:w-96 md:h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Discover Your Perfect
            <span className="text-blue-500 block mt-1 md:mt-2">Senior School Pathway</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 px-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A smart decision-support system that analyzes your interests and Kenya's 2026 
            job market to recommend your ideal CBE pathway.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 md:mb-16 px-4 sm:px-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
          <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col items-center p-3 md:p-6 bg-card rounded-xl md:rounded-2xl shadow-card">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-stem-light rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-stem" />
              </div>
              <span className="text-xl md:text-3xl font-bold font-display text-foreground">500+</span>
              <span className="text-xs md:text-sm text-muted-foreground text-center">Subject Combinations</span>
            </div>
            
            <div className="flex flex-col items-center p-3 md:p-6 bg-card rounded-xl md:rounded-2xl shadow-card">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-social-light rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-social" />
              </div>
              <span className="text-xl md:text-3xl font-bold font-display text-foreground">3</span>
              <span className="text-xs md:text-sm text-muted-foreground text-center">Career Pathways</span>
            </div>
            
            <div className="flex flex-col items-center p-3 md:p-6 bg-card rounded-xl md:rounded-2xl shadow-card">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-arts-light rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-arts" />
              </div>
              <span className="text-xl md:text-3xl font-bold font-display text-foreground">2026</span>
              <span className="text-xs md:text-sm text-muted-foreground text-center">Job Market Data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
