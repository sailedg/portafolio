export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

// Cookie donde se guarda el idioma elegido (mismo patrón que el tema). El server
// la lee para renderizar el <html lang> y el contenido correcto sin parpadeo.
export const LOCALE_COOKIE = "lang";

export function isLocale(value: string | undefined): value is Locale {
  return value === "es" || value === "en";
}
