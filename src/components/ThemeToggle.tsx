import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const ThemeToggle = () => {
  const { theme, toggleTheme, initializeTheme } = useTheme();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-full transition-all duration-500 group overflow-hidden",
        "hover:scale-110 active:scale-95",
        theme === 'galactic' 
          ? "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
          : "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-yellow-900 shadow-lg shadow-yellow-400/25"
      )}
      aria-label={`Switch to ${theme === 'bright' ? 'galactic' : 'bright'} theme`}
    >
      {/* Animated background glow */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        theme === 'galactic'
          ? "bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 animate-pulse"
          : "bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 animate-pulse"
      )} />
      
      {/* Icon */}
      <Sparkles 
        className={cn(
          "relative size-5 transition-all duration-500 group-hover:rotate-180",
          theme === 'galactic' ? "drop-shadow-sm" : "drop-shadow-sm"
        )} 
      />
      
      {/* Floating sparkles animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100",
              "animate-ping",
              theme === 'galactic' ? "bg-purple-300" : "bg-yellow-300"
            )}
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default ThemeToggle;