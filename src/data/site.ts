import type { Locale } from "@/i18n/config";

// Datos que no dependen del idioma. El texto traducible vive en @/i18n/content.
// role se usa en la OG image (la leen crawlers sin cookie, así que va fijo).
export const profile = {
  name: "Elias Rodas",
  brand: "RodasDev",
  role: "Desarrollador Frontend",
};

// Reemplazar con las URLs reales.
export const contactInfo = {
  whatsapp: "+928507192",
  whatsappHref: "https://wa.me/928507192",
  email: "eliasdrodasm@gmail.com",
  location: "Lima, Perú",
  github: "https://github.com/sailedg",
  linkedin: "https://www.linkedin.com/in/sailedg/",
};

// CV por idioma: el botón de descarga sirve el PDF del locale activo.
export const cvHrefByLocale: Record<Locale, string> = {
  es: "/cv/elias-rodas-frontend-cv-es.pdf",
  en: "/cv/elias-rodas-frontend-cv-en.pdf",
};
