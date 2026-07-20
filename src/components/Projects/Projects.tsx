"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, FolderGit2, Star } from "lucide-react";
import { useContent } from "@/i18n/LanguageProvider";
import type { StaticImageData } from "next/image";
import type { Project } from "@/i18n/content/types";
import { featuredImage, gridImages } from "@/data/projects";
import { ImageLightbox } from "@/components/ImageLightbox/ImageLightbox";
import { revealStagger, useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import styles from "./Projects.module.css";

const INITIAL_VISIBLE_COUNT = 4;

// Resalta en negrita los fragmentos marcados con **...** dentro del texto.
function renderRichText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

function ProjectGridCard({
  project,
  index,
  image,
}: {
  project: Project;
  index: number;
  image: StaticImageData;
}) {
  const content = useContent();
  const { ref: revealRef, isVisible: isRevealVisible } = useRevealOnScroll<HTMLElement>();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const previewButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <article
      ref={revealRef}
      data-visible={isRevealVisible}
      className={`${styles.projects__card} reveal`}
      style={revealStagger(index)}
    >
      <button
        type="button"
        ref={previewButtonRef}
        onClick={() => setIsLightboxOpen(true)}
        aria-label={content.projects.imageAria(project.name)}
        className={styles["projects__card-preview-wrap"]}
      >
        <div className={styles["projects__card-preview"]}>
          <Image
            src={image}
            alt={project.imageAlt}
            fill
            className={styles["projects__card-preview-image"]}
            sizes="(max-width: 768px) 45vw, 25vw"
          />
        </div>
        {/* Copia ampliada al hacer hover: es la misma imagen, así que va oculta
            para lectores de pantalla y no se anuncia dos veces. */}
        <div className={styles["projects__card-zoom"]} aria-hidden="true">
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            fill
            className={styles["projects__card-preview-image"]}
            sizes="(max-width: 768px) 70vw, 40vw"
          />
        </div>
      </button>

      <ImageLightbox
        src={image}
        alt={project.imageAlt}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        closeLabel={content.projects.imageClose}
        triggerRef={previewButtonRef}
      />
      <h3 className={styles["projects__card-title"]}>{project.name}</h3>
      <p className={styles["projects__card-description"]}>
        {renderRichText(project.description)}
      </p>
      <ul className={styles["projects__card-tags"]}>
        {project.tags.map((tag) => (
          <li key={tag} className={styles["projects__card-tag"]}>
            {tag}
          </li>
        ))}
      </ul>
      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles["projects__card-link"]}
        >
          {content.projects.cardLink}
          <ArrowUpRight
            size={12}
            aria-hidden="true"
            className={styles["projects__card-link-icon"]}
          />
        </a>
      )}
    </article>
  );
}

function ProjectLastSlot({
  project,
  index,
  hasMoreProjects,
  isExpanded,
  onToggleExpanded,
}: {
  project: Project;
  index: number;
  hasMoreProjects: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}) {
  const content = useContent();
  const { ref: revealRef, isVisible: isRevealVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={revealRef}
      data-visible={isRevealVisible}
      className={`${styles["projects__last-slot"]} reveal`}
      style={revealStagger(index)}
    >
      <article className={styles["projects__card-text-only"]}>
        <h3 className={styles["projects__card-title"]}>{project.name}</h3>
        <p className={styles["projects__card-description"]}>
          {renderRichText(project.description)}
        </p>
        <ul className={styles["projects__card-tags"]}>
          {project.tags.map((tag) => (
            <li key={tag} className={styles["projects__card-tag"]}>
              {tag}
            </li>
          ))}
        </ul>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles["projects__card-link"]}
          >
            {content.projects.cardLink}
            <ArrowUpRight
              size={12}
              aria-hidden="true"
              className={styles["projects__card-link-icon"]}
            />
          </a>
        )}
      </article>

      {hasMoreProjects && (
        <button
          type="button"
          className={styles["projects__more-card"]}
          onClick={onToggleExpanded}
          aria-expanded={isExpanded}
        >
          <svg
            className={styles["projects__more-arc"]}
            viewBox="0 0 220 110"
            fill="none"
            aria-hidden="true"
          >
            <path
              id="projects-more-arc-path"
              d="M10 100 Q110 -20 210 100"
              stroke="var(--color-border)"
              strokeWidth="1"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
            {[0, 1, 2].map((dotIndex) => {
              const beginOffset = `${dotIndex * 1.3}s`;
              return (
                <circle key={dotIndex} fill="var(--color-accent)">
                  <animateMotion dur="3.9s" begin={beginOffset} repeatCount="indefinite">
                    <mpath href="#projects-more-arc-path" />
                  </animateMotion>
                  <animate
                    attributeName="r"
                    values="1;4;1"
                    keyTimes="0;0.5;1"
                    dur="3.9s"
                    begin={beginOffset}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.35;1;0.35"
                    keyTimes="0;0.5;1"
                    dur="3.9s"
                    begin={beginOffset}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}
          </svg>
          <FolderGit2 size={24} className={styles["projects__more-icon"]} aria-hidden="true" />
          <span className={styles["projects__more-label"]}>
            {isExpanded ? content.projects.less : content.projects.more}
          </span>
        </button>
      )}
    </div>
  );
}

export function Projects() {
  const content = useContent();
  const { featured: featuredProject, grid: gridProjects } = content.projects;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFeaturedLightboxOpen, setIsFeaturedLightboxOpen] = useState(false);
  const featuredButtonRef = useRef<HTMLButtonElement>(null);
  const { ref: headerRef, isVisible: isHeaderVisible } = useRevealOnScroll<HTMLDivElement>();
  const { ref: featuredRef, isVisible: isFeaturedVisible } = useRevealOnScroll<HTMLElement>();

  const visibleProjects = isExpanded
    ? gridProjects
    : gridProjects.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMoreProjects = gridProjects.length > INITIAL_VISIBLE_COUNT;

  return (
    <section id="proyectos" className={styles.projects} aria-label={content.projects.aria}>
      <div
        ref={headerRef}
        data-visible={isHeaderVisible}
        className={`${styles.projects__header} reveal`}
      >
        <h2 className={styles.projects__heading}>{content.projects.heading}</h2>
        <p className={styles.projects__subtitle}>{content.projects.subtitle}</p>
      </div>

      <article
        ref={featuredRef}
        data-visible={isFeaturedVisible}
        className={`${styles.projects__featured} reveal`}
      >
        <button
          type="button"
          ref={featuredButtonRef}
          onClick={() => setIsFeaturedLightboxOpen(true)}
          aria-label={content.projects.imageAria(featuredProject.name)}
          className={styles["projects__featured-preview"]}
        >
          <div className={styles["projects__featured-preview-dots"]}>
            <span className={styles["projects__featured-preview-dot"]} />
            <span className={styles["projects__featured-preview-dot"]} />
            <span className={styles["projects__featured-preview-dot"]} />
          </div>
          <Image
            src={featuredImage}
            alt={featuredProject.imageAlt}
            fill
            className={styles["projects__featured-preview-image"]}
            sizes="(max-width: 768px) 90vw, 45vw"
          />
        </button>

        <ImageLightbox
          src={featuredImage}
          alt={featuredProject.imageAlt}
          isOpen={isFeaturedLightboxOpen}
          onClose={() => setIsFeaturedLightboxOpen(false)}
          closeLabel={content.projects.imageClose}
          triggerRef={featuredButtonRef}
        />

        <div className={styles["projects__featured-content"]}>
          <span className={styles.projects__badge}>
            <Star size={12} aria-hidden="true" />
            {content.projects.featuredBadge}
          </span>
          <h3 className={styles["projects__featured-title"]}>{featuredProject.name}</h3>
          <p className={styles["projects__featured-description"]}>
            {renderRichText(featuredProject.description)}
          </p>
          <ul className={styles.projects__tags}>
            {featuredProject.tags.map((tag) => (
              <li key={tag} className={styles.projects__tag}>
                {tag}
              </li>
            ))}
          </ul>
          {featuredProject.href && (
            <a
              href={featuredProject.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projects__link}
            >
              {content.projects.cardLink}
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className={styles["projects__link-icon"]}
              />
            </a>
          )}
        </div>

        <svg
          className={styles["projects__featured-mark"]}
          viewBox="0 0 250 407"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 0H234C242.837 0 250 7.16344 250 16V391C250 399.837 242.837 407 234 407H0C0 407 158.5 304.233 158.5 203.5C158.5 102.767 0 0 0 0Z"
            fill="url(#projects-featured-mark-gradient)"
            fillOpacity="0.74"
          />
          <defs>
            <linearGradient
              id="projects-featured-mark-gradient"
              x1="241.5"
              y1="0"
              x2="0"
              y2="407"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DBFF51" />
              <stop offset="0.658654" stopColor="#9DC406" />
              <stop offset="1" stopColor="#6F880B" />
            </linearGradient>
          </defs>
        </svg>

        <span className={styles["projects__featured-ribbon"]}>{content.projects.ribbon}</span>
      </article>

      <div className={styles.projects__grid}>
        {visibleProjects.map((project, index) => {
          const isLastVisible = index === visibleProjects.length - 1;

          if (!isLastVisible) {
            return (
              <ProjectGridCard
                key={project.id}
                project={project}
                index={index}
                image={gridImages[index]}
              />
            );
          }

          return (
            <ProjectLastSlot
              key={project.id}
              project={project}
              index={index}
              hasMoreProjects={hasMoreProjects}
              isExpanded={isExpanded}
              onToggleExpanded={() => setIsExpanded((expanded) => !expanded)}
            />
          );
        })}
      </div>
    </section>
  );
}
