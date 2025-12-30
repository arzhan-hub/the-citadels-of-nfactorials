'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme: Theme = stored ?? (prefersDark ? 'dark' : 'light');
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </Button>
  );
}
