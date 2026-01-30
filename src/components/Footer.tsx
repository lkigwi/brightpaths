import { GraduationCap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
            <span className="font-display font-bold text-xl">
              Bright<span className="text-primary">Paths</span>
              </span>
            </Link>
            <p className="text-background/70 max-w-md">
              An algorithmic decision-support system helping Kenyan Grade 9 learners 
              choose their ideal CBC Senior School pathway based on data, not pressure.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/70 hover:text-background transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-background/70 hover:text-background transition-colors">
                  Start Assessment
                </Link>
              </li>
              <li>
                <Link to="/pathways" className="text-background/70 hover:text-background transition-colors">
                  Explore Pathways
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-background/70 hover:text-background transition-colors">
                  Career Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-background/70 hover:text-background transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.education.go.ke" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Ministry of Education
                </a>
              </li>
              <li>
                <a 
                  href="https://www.kicd.ac.ke" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  KICD CBC Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © 2024 Bright Paths. Built for KSEF 2024.
          </p>
          <p className="text-background/60 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-arts" /> for Kenyan Students
          </p>
        </div>
      </div>
    </footer>
  );
}
