"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

type UseRevealOnScrollOptions<T> = {
  /** Cuánto del elemento debe verse antes de revelarlo. */
  threshold?: number;
  /** Ajusta el viewport que usa el observer. */
  rootMargin?: string;
  /** Ref ya existente a reutilizar (ej: el video que también la necesita). */
  externalRef?: RefObject<T | null>;
};

// Revela un elemento al entrar en viewport (se combina con las clases .reveal
// de globals.css). Revela una sola vez y deja de observar. Con reduced-motion
// aparece de una, sin observer.
export function useRevealOnScroll<T extends HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  externalRef,
}: UseRevealOnScrollOptions<T> = {}) {
  const internalRef = useRef<T>(null);
  const ref = externalRef ?? internalRef;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Sincroniza desde el media query en el mount, no desde props/estado.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return { ref, isVisible };
}

// Estilo tipado para escalonar items .reveal en una lista, ej: style={revealStagger(index)}.
export function revealStagger(index: number, stepMs = 80, maxMs = 400): CSSProperties {
  return { "--reveal-delay": `${Math.min(index * stepMs, maxMs)}ms` } as CSSProperties;
}
