import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Bright Paths Logo" className="h-10 w-auto" width={40} height={40} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link to="/pathways" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pathways
            </Link>
            <Link to="/careers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Careers
            </Link>
            <Link to="/results" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Results
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button onClick={() => navigate('/assessment')}>
              Start Assessment
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              <Link 
                to="/" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-muted/50 active:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-muted/50 active:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/pathways" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-muted/50 active:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Pathways
              </Link>
              <Link 
                to="/careers" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-muted/50 active:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Careers
              </Link>
              <Link 
                to="/results" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-muted/50 active:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Results
              </Link>
              <Button onClick={() => { navigate('/assessment'); setIsMenuOpen(false); }} className="w-full mt-2">
                Start Assessment
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
