"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image, { type StaticImageData } from "next/image";
import { X } from "lucide-react";
import styles from "./ImageLightbox.module.css";

export function ImageLightbox({
  src,
  alt,
  isOpen,
  onClose,
  closeLabel,
  triggerRef,
}: {
  src: StaticImageData;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  /** Elemento al que devolver el foco al cerrar. */
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    panel?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button type="button" className={styles["close-button"]} onClick={onClose} aria-label={closeLabel}>
        <X size={20} aria-hidden="true" />
      </button>

      <div
        ref={panelRef}
        tabIndex={-1}
        className={styles.panel}
        onClick={(event) => event.stopPropagation()}
      >
        <Image src={src} alt={alt} className={styles.image} sizes="(max-width: 1024px) 100vw, 1024px" />
      </div>
    </div>,
    document.body,
  );
}
