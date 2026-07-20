"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import avatarImage from "@/assets/brand/avatar.webp";
import fondoImage from "@/assets/brand/hex-bg.webp";
import sombraImage from "@/assets/brand/hex-shadow.webp";
import styles from "./HeroAvatar.module.css";

const VECTOR_DOT_DURATION_SECONDS = 14;
const VECTOR_DOT_COUNT = 3;
const vectorDotStaggers = Array.from({ length: VECTOR_DOT_COUNT }, (_, index) => index);

const particles = [
  { top: "6%", left: "18%", size: 6, duration: "6.5s", delay: "0s", depth: 0.6 },
  { top: "14%", left: "82%", size: 5, duration: "7.2s", delay: "0.4s", depth: 0.9 },
  { top: "38%", left: "4%", size: 4, duration: "7.8s", delay: "0.2s", depth: 0.5 },
  { top: "48%", left: "94%", size: 6, duration: "6.8s", delay: "0.7s", depth: 1 },
  { top: "72%", left: "10%", size: 5, duration: "7s", delay: "0.3s", depth: 0.7 },
  { top: "80%", left: "88%", size: 4, duration: "8.2s", delay: "0.5s", depth: 0.8 },
  { top: "92%", left: "40%", size: 5, duration: "7.4s", delay: "0.1s", depth: 0.6 },
  { top: "22%", left: "92%", size: 3, duration: "7.6s", delay: "0.8s", depth: 1.1 },
  { top: "30%", left: "12%", size: 3, duration: "6.6s", delay: "0.6s", depth: 0.4 },
  { top: "58%", left: "2%", size: 2, duration: "8s", delay: "0.15s", depth: 0.5 },
  { top: "64%", left: "96%", size: 3, duration: "7.3s", delay: "0.35s", depth: 1.2 },
];

export function HeroAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let latestEvent: PointerEvent | null = null;
    let rafId: number | null = null;

    const applyPointerOffset = () => {
      rafId = null;
      if (!latestEvent) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = (latestEvent.clientX - centerX) / (rect.width / 2);
      const normalizedY = (latestEvent.clientY - centerY) / (rect.height / 2);

      // Escribo las custom properties directo al DOM (sin estado ni re-render de
      // React) para que el movimiento del mouse no le pelee tiempo de main
      // thread a la animación SMIL de las partículas del SVG.
      container.style.setProperty("--pointer-x", `${Math.max(-1, Math.min(1, normalizedX))}`);
      container.style.setProperty("--pointer-y", `${Math.max(-1, Math.min(1, normalizedY))}`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      latestEvent = event;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyPointerOffset);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles["hero-avatar"]} ref={containerRef}>
      <svg
        className={styles["hero-avatar__vector"]}
        viewBox="0 0 499 537"
        fill="none"
        aria-hidden="true"
      >
        <path
          id="hero-vector-path"
          d="M263.184 536.25C209.684 504.25 -45.8512 400.75 7.54281 300.998C20.9302 275.987 38.41 262.535 56.0255 246.903C56.0255 246.903 181.782 139.282 280.684 119.75C350.827 105.897 402.602 162.411 463.684 125.25C476.62 117.38 494.164 110.269 497.184 93.75C505.684 47.25 426.684 80.75 363.184 0.25"
          style={{ stroke: "var(--color-accent-text)" }}
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        {vectorDotStaggers.map((index) => {
          const beginOffset = `${(index * VECTOR_DOT_DURATION_SECONDS) / VECTOR_DOT_COUNT}s`;
          return (
            <circle
              key={index}
              r="4"
              style={{ fill: "var(--color-accent-text)" }}
              opacity="0"
              className={styles["hero-avatar__vector-dot"]}
            >
              <animateMotion
                dur={`${VECTOR_DOT_DURATION_SECONDS}s`}
                begin={beginOffset}
                repeatCount="indefinite"
                rotate="0"
              >
                <mpath href="#hero-vector-path" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.03;0.97;1"
                dur={`${VECTOR_DOT_DURATION_SECONDS}s`}
                begin={beginOffset}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </svg>

      <Image
        src={sombraImage}
        alt=""
        aria-hidden="true"
        className={styles["hero-avatar__sombra"]}
        priority
      />

      <Image
        src={fondoImage}
        alt=""
        aria-hidden="true"
        className={styles["hero-avatar__fondo"]}
        priority
      />

      <div className={styles["hero-avatar__photo-wrap"]}>
        <Image
          src={avatarImage}
          alt="Elias Rodas, desarrollador frontend"
          fill
          className="object-fill"
          priority
          sizes="(max-width: 459px) 75vw, (max-width: 768px) 60vw, 336px"
        />
      </div>

      <div className={styles["hero-avatar__particles"]} aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            key={index}
            className={styles["hero-avatar__particle-wrap"]}
            style={{
              top: particle.top,
              left: particle.left,
              // @ts-expect-error CSS custom properties are not in CSSProperties
              "--depth": particle.depth,
            }}
          >
            <span
              className={styles["hero-avatar__particle"]}
              style={{
                width: particle.size,
                height: particle.size,
                animationDuration: particle.duration,
                animationDelay: particle.delay,
                // @ts-expect-error las custom properties de CSS no están en CSSProperties
                "--float-x": `${(index % 2 === 0 ? 1 : -1) * 8}px`,
                "--float-y": `${-8 - (index % 3) * 2}px`,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
