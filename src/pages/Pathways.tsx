import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { subjects } from '@/lib/data';
import { ArrowRight, Atom, Scale, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const pathwayDetails = [
  {
    name: 'STEM',
    fullName: 'Science, Technology, Engineering & Mathematics',
    icon: Atom,
    description: 'The STEM pathway prepares students for careers in scientific research, technology, engineering, and mathematical applications. This pathway is ideal for students who enjoy problem-solving, logical thinking, and hands-on experimentation.',
    keyStrengths: [
      'Strong analytical and logical thinking',
      'Interest in how things work',
      'Enjoys mathematics and calculations',
      'Curious about scientific phenomena',
    ],
    careerFields: ['Engineering', 'Medicine', 'Technology', 'Research', 'Data Science'],
    color: 'stem',
  },
  {
    name: 'Social Sciences',
    fullName: 'Business, Humanities & Languages',
    icon: Scale,
    description: 'The Social Sciences pathway focuses on understanding human behavior, societies, and systems. This pathway suits students interested in business, law, governance, languages, and helping people navigate social structures.',
    keyStrengths: [
      'Strong communication skills',
      'Interest in human behavior and society',
      'Enjoys reading and writing',
      'Good at understanding different perspectives',
    ],
    careerFields: ['Business', 'Law', 'Education', 'Government', 'Media & Communications'],
    color: 'social',
  },
  {
    name: 'Arts & Sports',
    fullName: 'Creative Arts, Performance & Athletics',
    icon: Palette,
    description: 'The Arts & Sports pathway nurtures creative expression, physical excellence, and artistic talents. This pathway is perfect for students with natural creativity, athletic abilities, or performance skills.',
    keyStrengths: [
      'Creative imagination and expression',
      'Physical coordination and discipline',
      'Performance and presentation skills',
      'Unique artistic vision',
    ],
    careerFields: ['Entertainment', 'Sports', 'Design', 'Media Production', 'Hospitality'],
    color: 'arts',
  },
];

const colorClasses = {
  stem: { bg: 'bg-stem-light', text: 'text-stem', border: 'border-stem' },
  social: { bg: 'bg-social-light', text: 'text-social', border: 'border-social' },
  arts: { bg: 'bg-arts-light', text: 'text-arts', border: 'border-arts' },
};

export default function Pathways() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Explore CBC <span className="text-gradient-primary">Pathways</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Understand each pathway's subjects, requirements, and career possibilities 
            to make an informed choice for your Senior School education.
          </p>
        </div>

        {/* Pathway Details */}
        <div className="space-y-16">
          {pathwayDetails.map((pathway, index) => {
            const colors = colorClasses[pathway.color as keyof typeof colorClasses];
            const pathwaySubjects = subjects.filter(s => s.pathway === pathway.name);
            
            return (
              <section 
                key={pathway.name}
                className={cn(
                  "rounded-3xl overflow-hidden",
                  colors.bg
                )}
              >
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                    <div className="w-20 h-20 bg-card rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                      <pathway.icon className={cn("w-10 h-10", colors.text)} />
                    </div>
                    <div>
                      <h2 className={cn("font-display text-3xl font-bold mb-2", colors.text)}>
                        {pathway.name}
                      </h2>
                      <p className="text-muted-foreground">{pathway.fullName}</p>
                    </div>
                  </div>

                  <p className="text-foreground/80 text-lg mb-8 max-w-3xl">
                    {pathway.description}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Key Strengths */}
                    <div className="bg-card rounded-2xl p-6 shadow-card">
                      <h3 className="font-display font-semibold mb-4">Ideal For Students Who...</h3>
                      <ul className="space-y-2">
                        {pathway.keyStrengths.map((strength, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className={cn("w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0", colors.text, colors.bg.replace('light', ''))} />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Subjects */}
                    <div className="bg-card rounded-2xl p-6 shadow-card">
                      <h3 className="font-display font-semibold mb-4">Subject Options</h3>
                      <div className="flex flex-wrap gap-2">
                        {pathwaySubjects.map((subject) => (
                          <span 
                            key={subject.code}
                            className={cn(
                              "text-xs px-3 py-1.5 rounded-full",
                              colors.bg,
                              colors.text,
                              colors.border,
                              "border"
                            )}
                          >
                            {subject.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Career Fields */}
                    <div className="bg-card rounded-2xl p-6 shadow-card">
                      <h3 className="font-display font-semibold mb-4">Career Fields</h3>
                      <div className="flex flex-wrap gap-2">
                        {pathway.careerFields.map((field, i) => (
                          <span 
                            key={i}
                            className="text-xs px-3 py-1.5 rounded-full bg-muted text-foreground"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="font-display text-2xl font-bold mb-4">
            Not sure which pathway fits you best?
          </h3>
          <p className="text-muted-foreground mb-6">
            Take our assessment to get a personalized recommendation.
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/assessment')}
            className="group"
          >
            Start Assessment
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
