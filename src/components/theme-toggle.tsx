import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { local } from '@/lib/legal-content';
import type { Locale } from '@/lib/i18n';

type Theme = 'light' | 'dark';
const storageKey = 'aldar-theme';

export function ThemeToggle({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    function applyTheme(value: Theme) {
      document.documentElement.classList.toggle('dark', value === 'dark');
      setTheme(value);
    }
    try {
      applyTheme(localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light');
    } catch {
      applyTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }
    function syncTheme(event: StorageEvent) {
      if (event.key === storageKey || event.key === null) {
        applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
      }
    }
    window.addEventListener('storage', syncTheme);
    return () => window.removeEventListener('storage', syncTheme);
  }, []);

  function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    const next = theme === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // Switching remains available if browser storage is disabled.
    }

    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTransition =
      typeof document.startViewTransition === 'function' && !reduceMotion;

    if (!supportsViewTransition) {
      root.classList.toggle('dark', next === 'dark');
      setTheme(next);
      return;
    }

    // Reveal the new theme as a circle expanding from the toggle button.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.classList.add('theme-switching');

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        root.classList.toggle('dark', next === 'dark');
        setTheme(next);
      });
    });
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }

  const label = theme === 'light'
    ? local(locale, 'Switch to dark mode', 'التبديل إلى الوضع الداكن')
    : local(locale, 'Switch to light mode', 'التبديل إلى الوضع الفاتح');

  return (
    <Button type="button" variant="ghost" size="icon" className="theme-toggle"
      data-theme={theme} aria-label={label} title={label} onClick={toggleTheme}>
      {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} className="text-gold" aria-hidden="true" />}
    </Button>
  );
}