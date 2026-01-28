import { BookOpen, Brain, Briefcase, LineChart, Target, Users } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Academic Analysis',
    description: 'We analyze your Junior School grades (7-9) to understand your academic strengths across different subject clusters.',
    color: 'text-stem bg-stem-light',
  },
  {
    icon: Brain,
    title: 'Interest Profiling',
    description: 'A psychometric quiz helps us understand your natural interests, preferences, and problem-solving style.',
    color: 'text-social bg-social-light',
  },
  {
    icon: LineChart,
    title: 'Market Intelligence',
    description: 'We incorporate 2026 Kenya job market trends to show you which careers are growing fastest.',
    color: 'text-arts bg-arts-light',
  },
  {
    icon: Target,
    title: 'Pathway Matching',
    description: 'Our algorithm matches you to STEM, Social Sciences, or Arts & Sports with confidence scores.',
    color: 'text-primary bg-primary/10',
  },
  {
    icon: Briefcase,
    title: 'Subject Recommendations',
    description: 'Get specific CBC subject codes and combinations tailored to your recommended pathway.',
    color: 'text-secondary bg-secondary/10',
  },
  {
    icon: Users,
    title: 'Career Visualization',
    description: 'See real career possibilities with salary ranges, required skills, and growth potential.',
    color: 'text-accent bg-accent/10',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How Bright Careers Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Our three-layer algorithm combines your academics, interests, and market data 
            to give you personalized pathway recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
