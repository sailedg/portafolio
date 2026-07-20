import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothHashLinks } from "@/components/SmoothHashLinks/SmoothHashLinks";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config";
import { getContent } from "@/i18n/dictionaries";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

async function resolveLocale() {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const { metadata } = getContent(locale);
  const fullTitle = `${SITE_NAME} | ${metadata.title}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: fullTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: metadata.description,
    keywords: [
      "desarrollador frontend",
      "frontend developer",
      "React",
      "Next.js",
      "Tailwind CSS",
      "diseño UI/UX",
      "portafolio desarrollador",
      "Elias Rodas",
      "Lima Perú",
    ],
    authors: [{ name: "Elias Rodas", url: SITE_URL }],
    creator: "Elias Rodas",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_PE",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: fullTitle,
      description: metadata.description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metadata.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#F7F7F5" },
  ],
  colorScheme: "dark light",
  // Deja que la página llegue hasta el borde real de la pantalla, así el fondo
  // de la tab bar móvil cubre la safe area de abajo (si no, el inset queda en 0).
  viewportFit: "cover",
};

function buildJsonLd(jobTitle: string) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Elias Rodas",
    jobTitle,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressCountry: "PE",
    },
    email: "mailto:eliasdrodasm@gmail.com",
    knowsAbout: ["React", "Next.js", "Tailwind CSS", "TypeScript", "UI/UX Design"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return [personJsonLd, websiteJsonLd];
}

// Solo para la primera visita (todavía sin cookie "theme"): resuelve la
// preferencia del sistema y guarda cookie + localStorage. A partir de ahí el
// tema se renderiza desde el server leyendo la cookie, sin parpadeo.
const themeInitScript = `
(function () {
  try {
    if (!document.cookie.includes("theme=")) {
      var theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      document.documentElement.dataset.theme = theme;
      document.cookie = "theme=" + theme + "; path=/; max-age=31536000; SameSite=Lax";
      localStorage.setItem("theme", theme);
    }
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const theme = themeCookie === "light" || themeCookie === "dark" ? themeCookie : undefined;

  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(localeCookie) ? localeCookie : defaultLocale;
  const content = getContent(locale);

  return (
    <html
      lang={locale}
      data-theme={theme}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Sin JS no corre el IntersectionObserver que revela las secciones, así
            que .reveal se quedaría en opacity:0 y la página se vería vacía. */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {!theme && <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(content.metadata.title)),
          }}
        />
        <LanguageProvider initialLocale={locale}>
          <SmoothHashLinks />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
