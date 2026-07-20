"use client";

import { useContent } from "@/i18n/LanguageProvider";
import styles from "./Footer.module.css";

export function Footer() {
  const { footer } = useContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <p>&copy; {currentYear} RodasDev. {footer.rights}</p>
        <p>
          {footer.builtWith}{" "}
          <a
            href="https://nextjs.org"
            className={styles.footer__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
        </p>
      </div>
    </footer>
  );
}
