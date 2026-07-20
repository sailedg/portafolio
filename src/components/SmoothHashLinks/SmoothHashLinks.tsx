"use client";

import { useEffect } from "react";

// Un solo listener delegado para los anchors internos (#id): scroll suave al
// destino y evita que el # quede pegado en la URL. Si un link ya manejó su
// propio click (ej: el logo del navbar) lo deja pasar.
export function SmoothHashLinks() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;

      const anchor = (event.target as HTMLElement).closest("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
