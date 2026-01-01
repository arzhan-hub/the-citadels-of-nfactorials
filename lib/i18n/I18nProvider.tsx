'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { interpolate, translations, type Language } from './translations';

type I18nContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Language | null;
    if (stored === 'ru' || stored === 'kk' || stored === 'en') {
      setLang(stored);
    }
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = translations[lang];
    return {
      lang,
      setLang: (nextLang) => {
        setLang(nextLang);
        localStorage.setItem('lang', nextLang);
      },
      t: (key, vars) => interpolate(dictionary[key] ?? key, vars),
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
