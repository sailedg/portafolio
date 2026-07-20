"use client";

import { scrollToTop, useActiveNavLink } from "./useActiveNavLink";
import { tabIconByHref, HomeTabIcon } from "./TabIcons";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./Navbar.module.css";

// Barra de tabs inferior estilo app, solo en móvil. Va sticky (no fixed) para
// quedarse abajo mientras se hace scroll pero frenar sobre el footer en vez de
// taparlo.
export function MobileTabBar() {
  const { content } = useLanguage();
  const activeHref = useActiveNavLink(content.nav.map((link) => link.href));

  return (
    <nav className={styles["navbar__mobile-tabbar"]} aria-label={content.navbar.mobileNav}>
      {content.nav.map((link) => {
        const Icon = tabIconByHref[link.href] ?? HomeTabIcon;
        const isActive = activeHref === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={link.href === "#inicio" ? scrollToTop : undefined}
            className={
              isActive
                ? `${styles["navbar__tab"]} ${styles["navbar__tab--active"]}`
                : styles["navbar__tab"]
            }
            aria-current={isActive ? "page" : undefined}
          >
            <Icon width={20} height={20} aria-hidden="true" />
            <span className={styles["navbar__tab-label"]}>{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
