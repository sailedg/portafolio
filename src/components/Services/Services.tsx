"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { CodeXml, Paintbrush, Zap, type LucideIcon } from "lucide-react";
import { useContent } from "@/i18n/LanguageProvider";
import type { Service } from "@/i18n/content/types";
import { revealStagger, useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import frontendPreview from "@/assets/services/frontend.webp";
import uiUxPreview from "@/assets/services/ui-ux.webp";
import performancePreview from "@/assets/services/performance.webp";
import styles from "./Services.module.css";

const previewImageByServiceId: Record<string, StaticImageData> = {
  "frontend-development": frontendPreview,
  "ui-ux-design": uiUxPreview,
  "web-optimization": performancePreview,
};

const previewVideoByServiceId: Record<string, string> = {
  "frontend-development": "/videos/service-frontend.mp4",
  "ui-ux-design": "/videos/service-uiux.mp4",
  "web-optimization": "/videos/service-performance.mp4",
};

const iconByServiceId: Record<string, LucideIcon> = {
  "frontend-development": CodeXml,
  "ui-ux-design": Paintbrush,
  "web-optimization": Zap,
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ServiceIcon = iconByServiceId[service.id];
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const { isVisible: isRevealVisible } = useRevealOnScroll<HTMLElement>({ externalRef: cardRef });
  const [isVideoActive, setIsVideoActive] = useState(false);

  const playFromStart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsVideoActive(true);
    video.play().catch(() => {});
  }, []);

  const stopAndShowImage = useCallback(() => {
    videoRef.current?.pause();
    setIsVideoActive(false);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // El video se reproduce una vez cada vez que la card entra en viewport
    // (sirve también en touch) y se repite al pasar el mouse si ya estaba
    // parado. Solo se corta al salir de la vista, no al quitar el mouse.
    const handleMouseEnter = () => {
      const video = videoRef.current;
      if (!video || !video.paused) return;
      playFromStart();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playFromStart();
        } else {
          stopAndShowImage();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(card);
    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      observer.disconnect();
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [playFromStart, stopAndShowImage]);

  return (
    <article
      ref={cardRef}
      data-visible={isRevealVisible}
      className={`${styles.services__card} reveal`}
      style={revealStagger(index)}
    >
      <div className={styles["services__card-preview"]}>
        <span className={styles["services__card-icon-badge"]}>
          <ServiceIcon size={20} className={styles["services__card-icon"]} aria-hidden="true" />
        </span>
        <Image
          src={previewImageByServiceId[service.id]}
          alt=""
          aria-hidden="true"
          fill
          className={
            isVideoActive
              ? `${styles["services__card-preview-image"]} ${styles["services__card-preview-image--hidden"]}`
              : styles["services__card-preview-image"]
          }
          sizes="(max-width: 768px) 90vw, 30vw"
        />
        <video
          ref={videoRef}
          src={previewVideoByServiceId[service.id]}
          muted
          playsInline
          // No se pide nada hasta que la tarjeta entra en viewport y arranca la
          // reproducción; mientras tanto se ve la imagen estática de detrás.
          preload="none"
          aria-hidden="true"
          onEnded={stopAndShowImage}
          className={
            isVideoActive
              ? `${styles["services__card-preview-video"]} ${styles["services__card-preview-video--active"]}`
              : styles["services__card-preview-video"]
          }
        />
      </div>
      <div className={styles["services__card-content"]}>
        <h3 className={styles["services__card-title"]}>{service.title}</h3>
        <p className={styles["services__card-description"]}>{service.description}</p>
      </div>
    </article>
  );
}

export function Services() {
  const content = useContent();
  const { ref: headerRef, isVisible: isHeaderVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="servicios" className={styles.services} aria-label={content.services.aria}>
      <div
        ref={headerRef}
        data-visible={isHeaderVisible}
        className={`${styles.services__header} reveal`}
      >
        <h2 className={styles.services__heading}>{content.services.heading}</h2>
        <p className={styles.services__subtitle}>{content.services.subtitle}</p>
      </div>

      <div className={styles.services__grid}>
        {content.services.items.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
