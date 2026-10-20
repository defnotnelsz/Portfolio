type Theme = 'dark';

if (typeof window !== 'undefined') {
  const root = window.document.documentElement;
  root.classList.add('dark');
  localStorage.setItem('theme', 'dark');
}

export function useTheme() {
  return {
    theme: 'dark' as Theme,
    toggleTheme: () => {},
  };
}
