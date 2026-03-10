import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Lightbulb, Target, Star, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

export function Advertisement() {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-primary">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-8 left-[10%] w-32 h-32 rounded-full border-2 border-primary-foreground animate-pulse-slow" />
        <div className="absolute bottom-12 right-[15%] w-48 h-48 rounded-full border border-primary-foreground animate-pulse-slow" />
        <div className="absolute top-1/2 left-[60%] w-20 h-20 rounded-full bg-primary-foreground/20 blur-2xl" />
      </div>

      {/* Diagonal accent stripe */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[80%] h-[200%] bg-secondary/20 rotate-12 origin-center" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-sm font-medium border border-primary-foreground/20">
            <Star className="w-4 h-4 fill-accent text-accent" />
            Built for KSEF 2026
            <Star className="w-4 h-4 fill-accent text-accent" />
          </span>
        </div>

        {/* Logo + Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <img src={logo} alt="Bright Paths Logo" className="h-16 md:h-20 w-auto drop-shadow-lg" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 animate-fade-in" style={{ animationDelay: '0.15s' }}>
            Your Future Starts With the{' '}
            <span className="text-accent">Right Choice</span>
          </h2>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Don't leave your Senior School pathway to guesswork. BrightPaths uses smart
            algorithms and Kenya's 2026 job market data to guide you to success.
          </p>
        </div>

        {/* Value props grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-12">
          {[
            {
              icon: Compass,
              title: 'Personalized Guidance',
              desc: 'Tailored pathway recommendations based on your unique interests',
            },
            {
              icon: Target,
              title: 'Data-Driven',
              desc: 'Powered by real Kenyan job market trends and career demand data',
            },
            {
              icon: Lightbulb,
              title: '65+ Careers Mapped',
              desc: 'Explore STEM, Social Sciences & Arts career options that fit you',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-5 md:p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 animate-fade-in"
              style={{ animationDelay: `${0.25 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-bold text-primary-foreground text-sm md:text-base mb-1">
                {item.title}
              </h3>
              <p className="text-primary-foreground/70 text-xs md:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.55s' }}>
          <Button
            size="xl"
            onClick={() => navigate('/assessment')}
            className="group bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 font-bold text-base"
          >
            <Rocket className="w-5 h-5 mr-1" />
            Take the Free Assessment Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-primary-foreground/60 text-xs mt-3">
            100% free · No sign-up required · Takes 5 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
