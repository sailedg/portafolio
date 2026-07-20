"use client";

import { Braces, Download, Layout, Mail, Palette, Server, Wrench } from "lucide-react";
import { TechIcon } from "@/lib/icon-map";
import { CertificatesModal } from "@/components/CertificatesModal/CertificatesModal";
import { revealStagger, useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { skillCategories, type SkillCategory } from "@/data/skills";
import { cvHrefByLocale } from "@/data/site";
import { useContent, useLanguage } from "@/i18n/LanguageProvider";
import styles from "./AboutSkills.module.css";

const categoryIcons: Record<string, typeof Braces> = {
  languages: Braces,
  frontend: Layout,
  backend: Server,
  tools: Wrench,
  design: Palette,
};

function SkillCategoryBlock({ category }: { category: SkillCategory }) {
  const content = useContent();
  const CategoryIcon = categoryIcons[category.id] ?? Braces;
  const columnsClassName = category.expandWhenStacked
    ? styles["skills__list--expand-when-stacked"]
    : styles[`skills__list--cols-${category.columns}`];

  return (
    <div>
      <h3 className={styles["skills__category-title"]}>
        <CategoryIcon size={14} aria-hidden="true" />
        {content.about.categoryTitles[category.id]}
      </h3>
      <ul className={`${styles.skills__list} ${columnsClassName}`}>
        {category.skills.map((skill) => (
          <li key={skill.name} className={styles.skills__badge}>
            <TechIcon icon={skill.icon} iconSet={skill.iconSet} className="h-3.5 w-3.5" colored />
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutSkills() {
  const { locale, content } = useLanguage();
  const { ref: aboutRef, isVisible: isAboutVisible } = useRevealOnScroll<HTMLDivElement>();
  const { ref: skillsRef, isVisible: isSkillsVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="sobre-mi" className={styles.about} aria-label={content.about.aria}>
      <div className={styles.about__grid}>
        <div
          ref={aboutRef}
          data-visible={isAboutVisible}
          className={`${styles.about__content} reveal`}
        >
          <h2 className={styles.about__heading}>
            {content.about.headingPre}{" "}
            <span className={styles["about__heading-accent"]}>{content.about.headingAccent}</span>
          </h2>
          <p className={styles.about__bio}>{content.about.bio}</p>

          <ul className={styles.about__languages}>
            {content.about.languages.map((language) => (
              <li key={language.name}>
                {language.name}
                <span className={styles["about__language-level"]}>{language.level}</span>
              </li>
            ))}
            <li>
              <CertificatesModal />
            </li>
          </ul>

          <div className={styles.about__ctas}>
            <a href="#contacto" className={styles["about__cta--primary"]}>
              <Mail size={16} aria-hidden="true" />
              {content.about.ctaContact}
            </a>
            <a href={cvHrefByLocale[locale]} download className={styles["about__cta--secondary"]}>
              <Download
                size={16}
                aria-hidden="true"
                className={styles["about__cta--secondary-icon"]}
              />
              {content.about.ctaCv}
            </a>
          </div>
        </div>

        <div
          ref={skillsRef}
          data-visible={isSkillsVisible}
          className={`${styles.skills__content} reveal`}
          style={revealStagger(1, 150)}
        >
          <h2 className={styles.skills__heading}>
            <span className={styles["skills__heading-bracket"]}>{"<"}</span>
            {content.about.skillsHeading}
            <span className={styles["skills__heading-bracket"]}>{"/>"}</span>
          </h2>
          <p className={styles.skills__subtitle}>{content.about.skillsSubtitle}</p>

          <div className={styles["skills__row--top"]}>
            {skillCategories.slice(0, 2).map((category) => (
              <SkillCategoryBlock key={category.id} category={category} />
            ))}
          </div>
          <div className={styles["skills__row--middle"]}>
            <SkillCategoryBlock category={skillCategories[2]} />
          </div>
          <div className={styles["skills__row--bottom"]}>
            {skillCategories.slice(3).map((category) => (
              <SkillCategoryBlock key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
