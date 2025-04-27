import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { 
      title: 'Menu',
      dropdownItems: [
        { title: 'Home', path: '/' },
        { title: 'Library', path: '/library' }
      ]
    },
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
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8',
      isScrolled 
        ? 'py-3 bg-background/80 backdrop-blur-md border-b border-border/40 subtle-shadow' 
        : 'py-5 bg-transparent'
    )}>
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
          {navLinks.map(link => {
            if (link.dropdownItems) {
              return (
                <DropdownMenu key={link.title}>
                  <DropdownMenuTrigger className={cn(
                    'nav-link flex items-center gap-1',
                    location.pathname === '/' && 'nav-link-active'
                  )}>
                    {link.title} <ChevronDown className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.dropdownItems.map(item => (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link 
                          to={item.path}
                          className="w-full px-2 py-1.5"
                        >
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
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
            );
          })}
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
            {navLinks.map(link => {
              if (link.dropdownItems) {
                return (
                  <div key={link.title} className="py-2">
                    <div className="text-foreground/80 font-medium mb-1">{link.title}</div>
                    {link.dropdownItems.map(item => (
                      <Link 
                        key={item.path}
                        to={item.path}
                        className={cn(
                          'block py-2 pl-4',
                          location.pathname === item.path ? 'text-primary font-medium' : 'text-foreground/80'
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                );
              }
              return (
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
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
