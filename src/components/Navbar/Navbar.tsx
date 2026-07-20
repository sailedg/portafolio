"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Languages, Moon, Sun } from "lucide-react";
import { scrollToTop, useActiveNavLink } from "./useActiveNavLink";
import { useLanguage } from "@/i18n/LanguageProvider";
import { locales, type Locale } from "@/i18n/config";
import styles from "./Navbar.module.css";

// Cada idioma se muestra en su propio nombre, sin importar el idioma activo.
const languageNames: Record<Locale, string> = { es: "Español", en: "English" };

export function Navbar() {
  const { locale, setLocale, content } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  // Solo mueve el aria-checked. La posición del thumb y la rotación del icono
  // las maneja el CSS con [data-theme], no este estado (así no hay problemas de
  // hidratación con el tema que renderiza el server).
  const [isDarkModeOn, setIsDarkModeOn] = useState(
    () => typeof document === "undefined" || document.documentElement.dataset.theme !== "light",
  );
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const activeHref = useActiveNavLink(content.nav.map((link) => link.href));

  const handleThemeToggle = () => {
    setIsDarkModeOn((isOn) => {
      const turningOn = !isOn;
      const nextTheme = turningOn ? "dark" : "light";
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
      // El server no lee localStorage, así que guardo el tema en cookie para
      // que el próximo load ya renderice el tema correcto sin parpadeo.
      document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;
      return turningOn;
    });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isLanguageMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLanguageMenuOpen]);

  const navbarClassName = isScrolled
    ? `${styles.navbar} ${styles["navbar--scrolled"]}`
    : styles.navbar;

  return (
    <header className={navbarClassName}>
      <nav className={styles.navbar__inner} aria-label={content.navbar.nav}>
        <a href="#inicio" onClick={scrollToTop} className={styles.navbar__logo}>
          Rodas<span className={styles["navbar__logo-accent"]}>Dev</span>
        </a>

        <ul className={styles.navbar__links}>
          {content.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={link.href === "#inicio" ? scrollToTop : undefined}
                className={
                  activeHref === link.href
                    ? `${styles.navbar__link} ${styles["navbar__link--active"]}`
                    : styles.navbar__link
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.navbar__actions}>
          <div className={styles["navbar__language"]} ref={languageMenuRef}>
            <button
              type="button"
              className={styles["navbar__icon-button"]}
              aria-label={content.navbar.languageAria}
              aria-haspopup="listbox"
              aria-expanded={isLanguageMenuOpen}
              onClick={() => setIsLanguageMenuOpen((open) => !open)}
            >
              <Languages size={16} aria-hidden="true" />
              {locale.toUpperCase()}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={
                  isLanguageMenuOpen
                    ? `${styles["navbar__chevron"]} ${styles["navbar__chevron--open"]}`
                    : styles["navbar__chevron"]
                }
              />
            </button>

            {isLanguageMenuOpen && (
              <ul className={styles["navbar__language-menu"]} role="listbox">
                {locales.map((code) => (
                  <li key={code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={locale === code}
                      className={styles["navbar__language-option"]}
                      onClick={() => {
                        setLocale(code);
                        setIsLanguageMenuOpen(false);
                      }}
                    >
                      {languageNames[code]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isDarkModeOn}
            aria-label={content.navbar.themeAria}
            className={styles["navbar__theme-switch"]}
            onClick={handleThemeToggle}
            suppressHydrationWarning
          >
            <span className={styles["navbar__theme-thumb"]}>
              <span className={styles["navbar__theme-icon"]}>
                {/* Los dos iconos siempre se renderizan; cuál se ve lo decide
                    el CSS con [data-theme]. */}
                <Moon
                  size={13}
                  aria-hidden="true"
                  className={styles["navbar__theme-icon--moon"]}
                />
                <Sun
                  size={13}
                  aria-hidden="true"
                  className={styles["navbar__theme-icon--sun"]}
                />
              </span>
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
