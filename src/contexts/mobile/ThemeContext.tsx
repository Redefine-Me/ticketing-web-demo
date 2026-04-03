'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextType {
  preference: ThemePreference;
  isDark: boolean;
  setThemePreference: (pref: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = 'rm_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    if (saved) setPreference(saved);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isDark = preference === 'dark' || (preference === 'system' && systemDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    // Also toggle on .mobile-root so CSS variable selectors (.mobile-root.dark) work
    const mobileRoot = document.querySelector('.mobile-root');
    if (mobileRoot) mobileRoot.classList.toggle('dark', isDark);
  }, [isDark]);

  const setThemePreference = useCallback((pref: ThemePreference) => {
    setPreference(pref);
    localStorage.setItem(STORAGE_KEY, pref);
  }, []);

  return (
    <ThemeContext.Provider value={{ preference, isDark, setThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
