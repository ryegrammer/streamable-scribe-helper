
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Suggestions', path: '/suggestions' },
    { title: 'Sitemap', path: '/sitemap' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8',
        isScrolled 
          ? 'py-3 bg-background/80 backdrop-blur-md border-b border-border/40 subtle-shadow' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">Pi</span>
          </div>
          <span>PiStream</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                'nav-link',
                location.pathname === link.path && 'nav-link-active'
              )}
            >
              {link.title}
            </Link>
          ))}
          
          {/* Dropdown Nav */}
          <div className="relative">
            <button
              className={cn(
                'nav-link flex items-center gap-1',
                isDropdownOpen && 'nav-link-active'
              )}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
            >
              More <ChevronDown className="size-4" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 py-2 rounded-lg glass-panel animate-scale-in origin-top-right z-50">
                <Link to="/" className="block px-4 py-2 hover:bg-foreground/5 transition-colors">
                  Documentation
                </Link>
                <Link to="/" className="block px-4 py-2 hover:bg-foreground/5 transition-colors">
                  Settings
                </Link>
                <Link to="/" className="block px-4 py-2 hover:bg-foreground/5 transition-colors">
                  Support
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel animate-slide-in py-4">
          <nav className="flex flex-col space-y-1 px-6">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={cn(
                  'py-2',
                  location.pathname === link.path ? 'text-primary font-medium' : 'text-foreground/80'
                )}
              >
                {link.title}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-border/50">
              <Link to="/" className="block py-2 text-foreground/80">
                Documentation
              </Link>
              <Link to="/" className="block py-2 text-foreground/80">
                Settings
              </Link>
              <Link to="/" className="block py-2 text-foreground/80">
                Support
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
