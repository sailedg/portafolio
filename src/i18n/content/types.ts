import type { IconSet } from "@/data/skills";

export type NavItem = { href: string; label: string };

export type Stat = { label: string; value: string };

export type Service = { id: string; title: string; description: string };

export type Project = {
  id: string;
  name: string;
  description: string;
  /** Describe la captura del proyecto para lectores de pantalla y buscadores. */
  imageAlt: string;
  tags: string[];
  href?: string;
  featured?: boolean;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  fileHref: string;
  verifyUrl?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  sourceUrl?: string;
};

export type LanguageSkill = { name: string; level: string };

// Marca tecnológica usada solo para tipar; el iconSet vive en @/data/skills.
export type { IconSet };

// Todo el texto visible del sitio, con la misma forma en cada idioma. Los datos
// que no dependen del idioma (iconos, hrefs, números) viven en @/data.
export type SiteContent = {
  nav: NavItem[];

  hero: {
    aria: string;
    greeting: string;
    roleTexts: string[];
    bio: string;
    stackLabel: string;
    availability: string;
    ctaProjects: string;
    ctaAbout: string;
    stats: Stat[];
  };

  services: {
    aria: string;
    heading: string;
    subtitle: string;
    items: Service[];
  };

  about: {
    aria: string;
    headingPre: string;
    headingAccent: string;
    bio: string;
    languages: LanguageSkill[];
    ctaContact: string;
    ctaCv: string;
    skillsHeading: string;
    skillsSubtitle: string;
    // Títulos de categoría por id (el resto de la estructura vive en @/data/skills).
    categoryTitles: Record<string, string>;
    certificates: {
      trigger: string;
      dialogAria: string;
      heading: string;
      subtitle: string;
      close: string;
      download: string;
      verifyAria: (title: string) => string;
      items: Certificate[];
    };
  };

  projects: {
    aria: string;
    heading: string;
    subtitle: string;
    featuredBadge: string;
    ribbon: string;
    cardLink: string;
    imageAria: (name: string) => string;
    imageClose: string;
    more: string;
    less: string;
    featured: Project;
    grid: Project[];
  };

  testimonials: {
    aria: string;
    heading: string;
    subtitlePre: string;
    subtitleAccent: string;
    prev: string;
    next: string;
    reviewLink: string;
    items: Testimonial[];
  };

  contact: {
    aria: string;
    badge: string;
    heading: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    honeypotLabel: string;
    submit: string;
    submitting: string;
    whatsapp: string;
    success: string;
    genericError: string;
    rateLimitError: string;
    nameMinError: string;
    emailInvalidError: string;
    messageMinError: string;
    copyAria: (label: string) => string;
    whatsappLabel: string;
    emailShort: string;
    locationLabel: string;
    socialLabel: string;
    githubAria: string;
    linkedinAria: string;
    // Etiquetas del mensaje que se arma para WhatsApp.
    waName: string;
    waEmail: string;
    waCompany: string;
    waMessage: string;
  };

  footer: {
    rights: string;
    builtWith: string;
  };

  navbar: {
    nav: string;
    mobileNav: string;
    languageAria: string;
    themeAria: string;
  };

  metadata: {
    title: string;
    description: string;
  };

  // Pantallas de error: 404 y fallo de renderizado.
  errorPages: {
    notFoundCode: string;
    notFoundTitle: string;
    notFoundDescription: string;
    errorTitle: string;
    errorDescription: string;
    retry: string;
    backHome: string;
    notFoundMetaTitle: string;
  };
};
