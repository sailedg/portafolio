"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { LOCALE_COOKIE, type Locale } from "./config";
import { getContent } from "./dictionaries";
import type { SiteContent } from "./content/types";

type LanguageContextValue = {
  locale: Locale;
  content: SiteContent;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    // Guardo el idioma en cookie (igual que el tema) para que el próximo load
    // ya renderice el idioma correcto desde el server, sin parpadeo.
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, content: getContent(locale), setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return context;
}

// Atajo para los componentes que solo necesitan leer el texto del idioma activo.
export function useContent() {
  return useLanguage().content;
}
