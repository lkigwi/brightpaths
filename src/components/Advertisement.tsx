import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Lightbulb, Rocket, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Advertisement() {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-stem/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-social/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Promo Banner */}
        <div className="bg-card rounded-3xl shadow-card overflow-hidden border border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6 w-fit">
                <Star className="w-4 h-4" />
                Made by Students, for Students
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight">
                Your Future Starts with{' '}
                <span className="text-gradient-primary">Bright Paths</span>
              </h2>

              <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg">
                Don't leave your senior school pathway to guesswork. Our smart decision-support 
                system analyzes your interests and Kenya's 2026 job market to guide you toward 
                the career you'll love.
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {[
                  'Personalized pathway recommendations in minutes',
                  'Backed by real 2026 Kenya job market data',
                  'Covers STEM, Social Sciences & Arts pathways',
                  'Completely free — no sign-up required',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-stem flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-foreground/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => navigate('/assessment')}
                  className="group"
                >
                  Take the Free Assessment
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/about')}
                >
                  See How It Works
                </Button>
              </div>
            </div>

            {/* Right: Visual showcase */}
            <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-stem/10 p-8 md:p-12 lg:p-16 flex items-center justify-center">
              <div className="w-full max-w-sm space-y-5">
                {/* Feature cards */}
                {[
                  {
                    icon: Compass,
                    title: '15-Question Smart Quiz',
                    desc: 'Discover your natural strengths and interests through carefully crafted questions.',
                    color: 'bg-social-light text-social',
                  },
                  {
                    icon: Lightbulb,
                    title: 'Two-Layer Algorithm',
                    desc: '70% interest profiling + 30% market intelligence for accurate results.',
                    color: 'bg-arts-light text-arts',
                  },
                  {
                    icon: Rocket,
                    title: 'Instant Career Matches',
                    desc: 'Get matched to 65+ careers across 3 CBE pathways with confidence scores.',
                    color: 'bg-stem-light text-stem',
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-border/30 flex gap-4 items-start transition-transform hover:scale-[1.02]"
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.color}`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-foreground mb-1">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}

                {/* Social proof */}
                <div className="text-center pt-2">
                  <p className="text-xs text-muted-foreground">
                    Built for <span className="font-semibold text-foreground">KSEF 2026</span> · Trusted by Kenyan students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
