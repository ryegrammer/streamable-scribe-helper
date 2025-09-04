import { useLocalStorage } from 'react-use';

export type Theme = 'bright' | 'dark' | 'galactic';

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('pistream-theme', 'bright');

  const toggleTheme = () => {
    const currentTheme = theme || 'bright';
    const nextTheme: Theme = currentTheme === 'bright' ? 'galactic' : 'bright';
    setTheme(nextTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('dark', 'galactic');
    if (nextTheme !== 'bright') {
      root.classList.add(nextTheme);
    }
  };

  // Initialize theme on mount
  const initializeTheme = () => {
    const currentTheme = theme || 'bright';
    const root = document.documentElement;
    root.classList.remove('dark', 'galactic');
    if (currentTheme !== 'bright') {
      root.classList.add(currentTheme);
    }
  };

  return {
    theme: theme || 'bright',
    toggleTheme,
    initializeTheme,
  };
};