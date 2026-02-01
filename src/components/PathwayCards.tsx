import { Button } from '@/components/ui/button';
import { ArrowRight, Atom, Palette, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const pathways = [
  {
    name: 'STEM',
    fullName: 'Science, Technology, Engineering & Mathematics',
    icon: Atom,
    description: 'For students passionate about innovation, problem-solving, and technical challenges.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology'],
    careers: ['Software Developer', 'Data Analyst', 'Engineer', 'Medical Doctor'],
    color: 'stem',
    bgClass: 'bg-stem-light',
    textClass: 'text-stem',
    borderClass: 'border-stem',
  },
  {
    name: 'Social Sciences',
    fullName: 'Business, Humanities & Languages',
    icon: Scale,
    description: 'For students who understand people, systems, and want to shape society.',
    subjects: ['History', 'Geography', 'Economics', 'Business Studies', 'Languages'],
    careers: ['Digital Marketer', 'Financial Analyst', 'Lawyer', 'HR Manager'],
    color: 'social',
    bgClass: 'bg-social-light',
    textClass: 'text-social',
    borderClass: 'border-social',
  },
  {
    name: 'Arts & Sports',
    fullName: 'Creative Arts, Performance & Athletics',
    icon: Palette,
    description: 'For students with creative talents, athletic abilities, and artistic vision.',
    subjects: ['Music', 'Visual Arts', 'Drama', 'Physical Education', 'Film Studies'],
    careers: ['Content Creator', 'Fashion Designer', 'Professional Athlete', 'Film Producer'],
    color: 'arts',
    bgClass: 'bg-arts-light',
    textClass: 'text-arts',
    borderClass: 'border-arts',
  },
];

export function PathwayCards() {
  const navigate = useNavigate();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Three Pathways, Endless Possibilities
          </h2>
          <p className="text-muted-foreground text-lg">
            The CBE Senior School offers three distinct pathways, each leading to unique career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pathways.map((pathway, index) => (
            <div
              key={pathway.name}
              className={`relative rounded-3xl p-8 border-2 ${pathway.borderClass} ${pathway.bgClass} overflow-hidden group hover:scale-105 transition-transform duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-card flex items-center justify-center mb-6 shadow-md`}>
                <pathway.icon className={`w-8 h-8 ${pathway.textClass}`} />
              </div>

              {/* Content */}
              <h3 className={`font-display text-2xl font-bold mb-2 ${pathway.textClass}`}>
                {pathway.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{pathway.fullName}</p>
              <p className="text-foreground/80 mb-6">{pathway.description}</p>

              {/* Subjects */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2">Key Subjects:</h4>
                <div className="flex flex-wrap gap-2">
                  {pathway.subjects.slice(0, 4).map(subject => (
                    <span 
                      key={subject}
                      className="text-xs px-3 py-1 bg-card rounded-full text-foreground/70"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Careers */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold mb-2">Career Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {pathway.careers.slice(0, 3).map(career => (
                    <span 
                      key={career}
                      className={`text-xs px-3 py-1 ${pathway.bgClass} border ${pathway.borderClass} rounded-full ${pathway.textClass}`}
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button 
                variant={pathway.color as 'stem' | 'social' | 'arts'}
                className="w-full group"
                onClick={() => navigate('/assessment')}
              >
                Explore {pathway.name}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
