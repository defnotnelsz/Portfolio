import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

const listeners = new Set<(theme: Theme) => void>();
let currentTheme: Theme = getInitialTheme();

// Ensure initial root class is applied on script execution
if (typeof window !== 'undefined') {
  const root = window.document.documentElement;
  if (currentTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
    return currentTheme;
  });

  useEffect(() => {
    const handleChange = (newTheme: Theme) => {
      setThemeState(newTheme);
    };

    listeners.add(handleChange);

    const observer = new MutationObserver(() => {
      const activeDark = document.documentElement.classList.contains('dark');
      const activeTheme: Theme = activeDark ? 'dark' : 'light';
      if (activeTheme !== currentTheme) {
        currentTheme = activeTheme;
        listeners.forEach((listener) => listener(activeTheme));
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      listeners.delete(handleChange);
      observer.disconnect();
    };
  }, [theme]);

  const setTheme = (newTheme: Theme | ((prev: Theme) => Theme)) => {
    const nextTheme = typeof newTheme === 'function' ? newTheme(currentTheme) : newTheme;
    currentTheme = nextTheme;
    const root = window.document.documentElement;
    if (nextTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', nextTheme);
    listeners.forEach((listener) => listener(nextTheme));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
