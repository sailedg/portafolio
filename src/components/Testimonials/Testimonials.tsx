"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronUp, ChevronDown, ExternalLink, Star } from "lucide-react";
import { useContent } from "@/i18n/LanguageProvider";
import type { Testimonial } from "@/i18n/content/types";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import styles from "./Testimonials.module.css";

const GRID_COLS = 9;
const GRID_ROWS = 2;
const COL_STAGGER_MS = 60;
const ROW_STAGGER_MS = 30;
const ROTATION_DURATION_MS = 1200;
const TOTAL_TRANSITION_MS =
  (GRID_COLS - 1) * COL_STAGGER_MS + (GRID_ROWS - 1) * ROW_STAGGER_MS + ROTATION_DURATION_MS;
const AUTO_ADVANCE_MS = 7000;

const cells = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, index) => ({
  col: index % GRID_COLS,
  row: Math.floor(index / GRID_COLS),
}));

function TestimonialFace({
  testimonial,
  stageWidth,
  stageHeight,
  col,
  row,
  isStatic = false,
}: {
  testimonial: Testimonial;
  stageWidth: number;
  stageHeight: number;
  col: number;
  row: number;
  isStatic?: boolean;
}) {
  return (
    <div className={styles["testimonials__flip-window"]}>
      <div
        className={styles["testimonials__flip-inner"]}
        style={
          isStatic
            ? {
                width: "100%",
                height: "100%",
                position: "relative",
                left: 0,
                top: 0,
              }
            : {
                width: stageWidth,
                height: stageHeight,
                left: -col * (stageWidth / GRID_COLS),
                top: -row * (stageHeight / GRID_ROWS),
              }
        }
      >
        <span className={styles["testimonials__logo-bubble"]}>
          {testimonial.name.charAt(0)}
        </span>

        <div className={styles.testimonials__meta}>
          <p className={styles.testimonials__name}>{testimonial.name}</p>
          <p className={styles.testimonials__role}>{testimonial.role}</p>
          <div className={styles.testimonials__rating}>
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star key={index} size={14} aria-hidden="true" />
            ))}
          </div>
        </div>

        <p className={styles.testimonials__quote}>&ldquo;{testimonial.quote}&rdquo;</p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const content = useContent();
  const testimonials = content.testimonials.items;
  const { ref: headerRef, isVisible: isHeaderVisible } = useRevealOnScroll<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const secondTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  // Candado síncrono contra doble click: el estado isFlipping es async y un
  // segundo click antes del re-render lo lee viejo (false), y arrancarían dos
  // animaciones a la vez pisándose los timers.
  const isFlippingRef = useRef(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setStageSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (secondTimeoutRef.current) clearTimeout(secondTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const activeTestimonial = testimonials[activeIndex];
  const backTestimonial = testimonials[pendingIndex ?? activeIndex];

  const goTo = (targetIndex: number) => {
    if (isFlippingRef.current) return;
    isFlippingRef.current = true;

    setPendingIndex(targetIndex);
    setIsFlipping(true);
    setIsFading(false);

    timeoutRef.current = setTimeout(() => {
      // 1. Cambio el activeIndex para que la card estática tome el nuevo testimonio
      setActiveIndex(targetIndex);
      // 2. Arranca el fade (los cubos salen, la card estática entra)
      setIsFading(true);

      // 3. Espero a que termine el fade de 300ms antes de resetear la rotación
      secondTimeoutRef.current = setTimeout(() => {
        setSkipTransition(true);
        setIsFlipping(false);
        setIsFading(false);
        setPendingIndex(null);
        // Mantengo el candado hasta restaurar las transiciones abajo; si no, un
        // tap en esta ventana de ~2 frames arranca la próxima rotación con las
        // transiciones aún apagadas y el cubo salta de golpe sin animar.

        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = requestAnimationFrame(() => {
            setSkipTransition(false);
            isFlippingRef.current = false;
          });
        });
      }, 300); // igual que la transición de opacidad del CSS
    }, TOTAL_TRANSITION_MS);
  };

  const goToPrevious = () => goTo(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1);
  const goToNext = () => goTo(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1);

  useEffect(() => {
    // Reiniciar en cada cambio de activeIndex (manual o automático) da una
    // ventana de lectura completa después de cada transición.
    const intervalId = setInterval(goToNext, AUTO_ADVANCE_MS);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const cellWidth = stageSize.width / GRID_COLS;
  const cellHeight = stageSize.height / GRID_ROWS;

  return (
    <section
      id="testimonios"
      className={styles.testimonials}
      aria-label={content.testimonials.aria}
    >
      <div className={styles.testimonials__row}>
        <div
          ref={headerRef}
          data-visible={isHeaderVisible}
          className={`${styles.testimonials__header} reveal`}
        >
          <h2 className={styles.testimonials__heading}>{content.testimonials.heading}</h2>
          <p className={styles.testimonials__subtitle}>
            {content.testimonials.subtitlePre}
            <span className={styles["testimonials__subtitle-accent"]}>
              {content.testimonials.subtitleAccent}
            </span>
          </p>
        </div>

        <div className={styles.testimonials__content}>
          <div
            ref={stageRef}
            className={`${styles["testimonials__flip-stage"]} ${
              isFlipping && !isFading
                ? styles["testimonials__flip-stage--flipping"]
                : ""
            }`}
            aria-hidden="true"
          >
            {/* Card estática: se ve cuando no está girando o mientras entra */}
            {stageSize.width > 0 && (
              <div
                className={`${styles["testimonials__static-card"]} ${
                  isFlipping && !isFading
                    ? styles["testimonials__static-card--hidden"]
                    : ""
                }`}
              >
                <TestimonialFace
                  testimonial={activeTestimonial}
                  stageWidth={stageSize.width}
                  stageHeight={stageSize.height}
                  col={0}
                  row={0}
                  isStatic={true}
                />
              </div>
            )}

            {stageSize.width > 0 &&
              cells.map(({ col, row }) => {
                const delay = col * COL_STAGGER_MS + row * ROW_STAGGER_MS;
                const cubeStyle = {
                  transitionDelay: isFlipping ? `${delay}ms` : "0ms",
                  "--cube-width": `${cellWidth}px`,
                  "--cube-height": `${cellHeight}px`,
                  "--cube-depth": `${cellHeight}px`,
                } as CSSProperties;

                return (
                  <div key={`${col}-${row}`} className={styles["testimonials__cube-cell"]}>
                    <div
                      className={[
                        styles["testimonials__cube"],
                        isFlipping && styles["testimonials__cube--active"],
                        skipTransition && styles["testimonials__cube--no-transition"],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={cubeStyle}
                    >
                      <div
                        className={`${styles["testimonials__cube-face"]} ${styles["testimonials__cube-face--front"]}`}
                      >
                        <TestimonialFace
                          testimonial={activeTestimonial}
                          stageWidth={stageSize.width}
                          stageHeight={stageSize.height}
                          col={col}
                          row={row}
                        />
                      </div>
                      <div
                        className={`${styles["testimonials__cube-face"]} ${styles["testimonials__cube-face--top"]}`}
                      >
                        <TestimonialFace
                          testimonial={backTestimonial}
                          stageWidth={stageSize.width}
                          stageHeight={stageSize.height}
                          col={col}
                          row={row}
                        />
                      </div>
                      <div
                        className={`${styles["testimonials__cube-face"]} ${styles["testimonials__cube-face--bottom"]}`}
                      />
                      <div
                        className={`${styles["testimonials__cube-face"]} ${styles["testimonials__cube-face--left"]}`}
                      />
                      <div
                        className={`${styles["testimonials__cube-face"]} ${styles["testimonials__cube-face--right"]}`}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          {activeTestimonial.sourceUrl && (
            <a
              href={activeTestimonial.sourceUrl}
              className={styles["testimonials__quote-link"]}
              aria-label={content.testimonials.reviewLink}
            >
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}

          <p className={styles["testimonials__sr-only"]} aria-live="polite">
            {activeTestimonial.name}, {activeTestimonial.role}. &ldquo;{activeTestimonial.quote}
            &rdquo;
          </p>
        </div>

        <div className={styles.testimonials__nav}>
          <button
            type="button"
            onClick={goToPrevious}
            disabled={isFlipping}
            className={styles["testimonials__nav-button"]}
            aria-label={content.testimonials.prev}
          >
            <ChevronUp size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            disabled={isFlipping}
            className={styles["testimonials__nav-button"]}
            aria-label={content.testimonials.next}
          >
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
