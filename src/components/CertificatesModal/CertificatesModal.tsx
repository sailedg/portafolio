"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Award, Download, ExternalLink, X } from "lucide-react";
import { useContent } from "@/i18n/LanguageProvider";
import styles from "./CertificatesModal.module.css";

// Miniatura del certificado. El skeleton se queda encima hasta que la imagen
// termina de cargar (los .webp de los diplomas pesan y tardan en la primera
// apertura del modal) y luego hace un fundido cruzado con ella, para que la
// imagen no entre de golpe. El data-loaded lo lee el CSS.
function CertificateThumbnail({ src }: { src: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.thumbnail} data-loaded={isLoaded}>
      {/* Copia difuminada al fondo: rellena las bandas laterales con el color del propio certificado. */}
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        className={styles["thumbnail-backdrop"]}
        sizes="(max-width: 640px) 90vw, 320px"
      />
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        className={styles["thumbnail-preview"]}
        sizes="(max-width: 640px) 90vw, 320px"
        onLoad={() => setIsLoaded(true)}
        // Si la imagen falla, quito igual el skeleton para no dejarlo animando
        // para siempre.
        onError={() => setIsLoaded(true)}
      />
      {/* Sigue montado tras cargar: se desvanece encima de la imagen que aparece. */}
      <div className={styles["thumbnail-skeleton"]} aria-hidden="true" />
    </div>
  );
}

// Selector de lo que puede recibir foco dentro del modal, para el ciclo del Tab.
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function CertificatesModal() {
  const { certificates: certs } = useContent().about;
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  // Botón que abrió el modal, para devolverle el foco al cerrar.
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    // Al abrir, el foco entra al panel; si no, seguiría detrás del modal y el
    // Tab pasearía por la página tapada.
    panel?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      // Ciclo del Tab dentro del modal: del último vuelve al primero y al revés.
      if (event.key !== "Tab" || !panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Devuelve el foco al botón que abrió el modal.
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
      >
        <Award size={16} aria-hidden="true" />
        {certs.trigger}
      </button>

      {isOpen &&
        createPortal(
          <div
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label={certs.dialogAria}
            onClick={() => setIsOpen(false)}
          >
            <div
              ref={panelRef}
              tabIndex={-1}
              className={styles.panel}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles["close-button"]}
                onClick={() => setIsOpen(false)}
                aria-label={certs.close}
              >
                <X size={18} aria-hidden="true" />
              </button>

              <h2 className={styles.heading}>{certs.heading}</h2>
              <p className={styles.subtitle}>{certs.subtitle}</p>

              <div className={styles.grid}>
                {certs.items.map((certificate) => (
                  <article key={certificate.id} className={styles.card}>
                    <CertificateThumbnail
                      src={certificate.fileHref.replace(/\.pdf$/, ".webp")}
                    />
                    <div className={styles["card-body"]}>
                      <h3 className={styles["card-title"]}>{certificate.title}</h3>
                      <div className={styles["card-meta"]}>
                        <span className={styles["card-issuer"]}>{certificate.issuer}</span>
                        <span className={styles["card-date"]}>{certificate.date}</span>
                      </div>
                      <div className={styles["card-actions"]}>
                        <a
                          href={certificate.fileHref}
                          download
                          className={styles["card-download"]}
                        >
                          <Download size={14} aria-hidden="true" />
                          {certs.download}
                        </a>
                        {certificate.verifyUrl && (
                          <a
                            href={certificate.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles["card-verify"]}
                            aria-label={certs.verifyAria(certificate.title)}
                          >
                            <ExternalLink size={14} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
