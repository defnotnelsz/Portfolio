import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';


export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun size={16} />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={16} />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};
