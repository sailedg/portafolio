"use client";

import { useEffect, useState, type MouseEvent } from "react";

// Scroll-spy: detecta qué sección está cerca del top del viewport para
// resaltar su link en el nav.
export function useActiveNavLink(hrefs: string[]) {
  const [activeHref, setActiveHref] = useState(hrefs[0]);

  useEffect(() => {
    const sections = hrefs
      .map((href) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveHref(`#${topMost.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeHref;
}

// El hero está pegado arriba, así que saltar a su ancla lo deja tapado por el
// header sticky. Mando el scroll a 0 para verlo completo, tipo "volver arriba".
export function scrollToTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
