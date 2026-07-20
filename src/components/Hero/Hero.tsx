"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { HeroAvatar } from "@/components/HeroAvatar/HeroAvatar";
import { GreetingIcon } from "./GreetingIcon";
import { TechIcon } from "@/lib/icon-map";
import { revealStagger, useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { heroStack } from "@/data/stack";
import { profile } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./Hero.module.css";

const stackIconByName: Record<string, { icon: string; iconSet: "si" | "lucide" }> = {
  "Next.js": { icon: "SiNextdotjs", iconSet: "si" },
  TypeScript: { icon: "SiTypescript", iconSet: "si" },
  "Tailwind CSS": { icon: "SiTailwindcss", iconSet: "si" },
};

const STAT_ANIMATION_MS = 1200;
const TYPEWRITER_TYPE_MS = 65;
const TYPEWRITER_DELETE_MS = 35;
const TYPEWRITER_HOLD_MS = 2800;
// El primer texto es el rol principal, así que se sostiene bastante más que el
// resto del ciclo para que dé tiempo de leerlo antes del primer borrado.
const TYPEWRITER_FIRST_HOLD_MS = 6000;
const TYPEWRITER_GAP_MS = 400;

// Va escribiendo y borrando cada texto en bucle. Arranca con el primer texto ya
// escrito: así se pinta con el HTML del servidor (es el elemento que marca el
// LCP) y no queda un hueco vacío hasta que hidrata el JS.
function TypewriterRole({ texts, isActive }: { texts: string[]; isActive: boolean }) {
  const [displayText, setDisplayText] = useState(texts[0] ?? "");

  useEffect(() => {
    if (!isActive) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Sincroniza desde el media query, no desde props/estado.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayText(texts[0] ?? "");
      return;
    }

    // Empieza donde lo dejó el render inicial: primer texto completo.
    let textIndex = 0;
    let charIndex = texts[0]?.length ?? 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentText = texts[textIndex];
      charIndex += 1;
      setDisplayText(currentText.slice(0, charIndex));
      timeoutId = setTimeout(
        charIndex >= currentText.length ? erase : type,
        charIndex >= currentText.length ? TYPEWRITER_HOLD_MS : TYPEWRITER_TYPE_MS,
      );
    };

    const erase = () => {
      const currentText = texts[textIndex];
      charIndex -= 1;
      setDisplayText(currentText.slice(0, charIndex));
      if (charIndex <= 0) {
        textIndex = (textIndex + 1) % texts.length;
        timeoutId = setTimeout(type, TYPEWRITER_GAP_MS);
      } else {
        timeoutId = setTimeout(erase, TYPEWRITER_DELETE_MS);
      }
    };

    // El ciclo arranca esperando sobre el texto ya escrito, no tecleándolo.
    timeoutId = setTimeout(erase, TYPEWRITER_FIRST_HOLD_MS);

    return () => clearTimeout(timeoutId);
  }, [isActive, texts]);

  return (
    <>
      <span className={styles["hero__role-visual"]} aria-hidden="true">
        {displayText}
        <span className={styles["hero__role-cursor"]} />
      </span>
      <span className={styles["hero__role-sr"]}>{texts[0]}</span>
    </>
  );
}

function statDelayStyle(index: number, stepMs = 100): CSSProperties {
  return { "--stat-delay": `${index * stepMs}ms` } as CSSProperties;
}

// Anima el número de una stat desde 0 hasta su valor (ej: "+7", "100%").
function AnimatedStat({
  value,
  isActive,
  delayMs = 0,
}: {
  value: string;
  isActive: boolean;
  delayMs?: number;
}) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Sincroniza desde el media query, no desde props/estado.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayValue(target);
      return;
    }

    let rafId: number;
    const startTimeoutId = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / STAT_ANIMATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplayValue(Math.round(eased * target));
        if (progress < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(startTimeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isActive, target, delayMs]);

  return (
    <>
      {prefix}
      {displayValue}
      {suffix}
    </>
  );
}

export function Hero() {
  const { locale, content } = useLanguage();
  const { ref: avatarRef, isVisible: isAvatarVisible } = useRevealOnScroll<HTMLDivElement>({
    threshold: 0,
  });
  // Acá no uso threshold: 0 como el avatar. Si no, el conteo termina antes de
  // que las stats estén realmente a la vista.
  const { ref: statsRef, isVisible: isStatsVisible } = useRevealOnScroll<HTMLDListElement>();
  const { ref: statsMobileRef, isVisible: isStatsMobileVisible } =
    useRevealOnScroll<HTMLDListElement>();

  return (
    <section id="inicio" className={styles.hero} aria-label={content.hero.aria}>
      <div className={styles.hero__grid}>
        {/* Sin .reveal: este bloque ya está a la vista al cargar, así que el
            fade solo retrasaba el pintado del texto que marca el LCP. */}
        <div className={styles.hero__content}>
          <span className={styles.hero__badge}>
            <GreetingIcon width={14} height={14} className={styles["hero__badge-icon"]} aria-hidden="true" />
            {content.hero.greeting}
          </span>

          {/* El rol va dentro del h1 para que buscadores y lectores de pantalla
              lean "Elias Rodas — Desarrollador Frontend", pero se oculta a la
              vista: el rol ya se muestra abajo con el efecto de tipeo. */}
          <h1 className={styles.hero__title}>
            {profile.name}
            <span className={styles["hero__title-role"]}> — {content.metadata.title}</span>
          </h1>
          <p className={styles.hero__role}>
            <TypewriterRole key={locale} texts={content.hero.roleTexts} isActive />
          </p>
          <p className={styles.hero__bio}>{content.hero.bio}</p>

          <div className={styles.hero__stack}>
            <span className={styles["hero__stack-label"]}>{content.hero.stackLabel}</span>
            <div className={styles["hero__stack-chips"]}>
              {heroStack.map((item) => {
                const iconData = stackIconByName[item.name];
                return (
                  <span key={item.name} className={styles["hero__stack-chip"]}>
                    {iconData && (
                      <TechIcon
                        icon={iconData.icon}
                        iconSet={iconData.iconSet}
                        className="h-3.5 w-3.5"
                      />
                    )}
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className={styles.hero__snippet}>
            <span className={styles["hero__snippet-line-number"]}>1</span>
            <span className={styles["hero__snippet-marker"]} />
            <p>
              <span className={styles["hero__snippet-keyword"]}>const</span>{" "}
              <span className={styles["hero__snippet-variable"]}>availability</span> ={" "}
              <span className={styles["hero__snippet-string"]}>
                &apos;{content.hero.availability}&apos;
              </span>
              ;
            </p>
          </div>

          <div className={styles.hero__ctas}>
            <a href="#proyectos" className={styles["hero__cta--primary"]}>
              {content.hero.ctaProjects}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className={styles["hero__cta--primary-icon"]}
              />
            </a>
            <a href="#sobre-mi" className={styles["hero__cta--secondary"]}>
              {content.hero.ctaAbout}
            </a>
          </div>
        </div>

        <div
          ref={avatarRef}
          data-visible={isAvatarVisible}
          className={`${styles["hero__avatar-col"]} reveal`}
          style={revealStagger(1, 150)}
        >
          <HeroAvatar />
          <dl ref={statsRef} className={styles["hero__stats"]} data-visible={isStatsVisible}>
            {content.hero.stats.map((stat, index) => (
              <div key={`${locale}-${stat.label}`} style={statDelayStyle(index)}>
                <dt className={styles["hero__stat-label"]}>{stat.label}</dt>
                <dd className={styles["hero__stat-value"]}>
                  <AnimatedStat
                    key={locale}
                    value={stat.value}
                    isActive={isStatsVisible}
                    delayMs={index * 100}
                  />
                  <span className={styles["hero__stat-bar"]} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <dl ref={statsMobileRef} className={styles["hero__stats-mobile"]}>
        {content.hero.stats.map((stat, index) => (
          <div key={`${locale}-${stat.label}`}>
            <dt className={styles["hero__stat-label"]}>{stat.label}</dt>
            <dd className={styles["hero__stat-value"]}>
              <AnimatedStat
                key={locale}
                value={stat.value}
                isActive={isStatsMobileVisible}
                delayMs={index * 100}
              />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
