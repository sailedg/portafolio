import type { JSX, SVGProps } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
  SiGit,
  SiGithub,
  SiNpm,
  SiVercel,
  SiWordpress,
  SiPostman,
  SiFigma,
} from "react-icons/si";
import {
  Database,
  Network,
  Server,
  Globe,
  Code2,
  Sparkles,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";
import {
  IllustratorIcon,
  MySqlIcon,
  PhotoshopIcon,
  RestApiIcon,
  SqlIcon,
  SqlServerIcon,
  VsCodeIcon,
} from "@/lib/custom-icons";
import claudeIconImage from "@/assets/logos/claude.png";
import type { IconSet } from "@/data/skills";

const siIconMap: Record<string, IconType> = {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
  SiGit,
  SiGithub,
  SiNpm,
  SiVercel,
  SiWordpress,
  SiPostman,
  SiFigma,
};

// Colores oficiales de marca (simple-icons). Algunas marcas usan negro
// (Next.js, Express, GitHub, Vercel); esas las mapeo al color de texto del tema
// en vez de negro fijo, que desaparecería contra uno de los dos fondos.
const brandColors: Record<string, string> = {
  SiJavascript: "#F7DF1E",
  SiTypescript: "#3178C6",
  SiReact: "#61DAFB",
  SiNextdotjs: "var(--color-text-primary)",
  SiHtml5: "#E34F26",
  SiCss: "#1572B6",
  SiTailwindcss: "#06B6D4",
  SiBootstrap: "#7952B3",
  SiNodedotjs: "#339933",
  SiExpress: "var(--color-text-primary)",
  SiSupabase: "#3FCF8E",
  SiGit: "#F05032",
  SiGithub: "var(--color-text-primary)",
  SiNpm: "#CB3837",
  SiVercel: "var(--color-text-primary)",
  SiWordpress: "#21759B",
  SiPostman: "#FF6C37",
  SiFigma: "#F24E1E",
};

const lucideIconMap: Record<string, LucideIcon> = {
  Database,
  Network,
  Server,
  Globe,
  Code2,
  Sparkles,
  Image: ImageIcon,
};

type CustomIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const customIconMap: Record<string, CustomIconComponent> = {
  IllustratorIcon,
  VsCodeIcon,
  PhotoshopIcon,
  SqlServerIcon,
  SqlIcon,
  RestApiIcon,
  MySqlIcon,
};

// Iconos que solo existen como imagen (no como vector limpio).
const customImageMap: Record<string, typeof claudeIconImage> = {
  ClaudeIcon: claudeIconImage,
};

type TechIconProps = {
  icon: string;
  iconSet: IconSet;
  className?: string;
  /** Usa el color oficial de la marca en vez de heredar el color de texto. Se ignora en los "custom" (ya traen su color en el SVG). */
  colored?: boolean;
};

export function TechIcon({ icon, iconSet, className, colored }: TechIconProps) {
  if (iconSet === "custom" && customImageMap[icon]) {
    return <Image src={customImageMap[icon]} alt="" className={className} />;
  }

  const iconMap =
    iconSet === "si" ? siIconMap : iconSet === "custom" ? customIconMap : lucideIconMap;
  const IconComponent = iconMap[icon];

  if (!IconComponent) return null;

  const color = colored && iconSet === "si" ? brandColors[icon] : undefined;

  return <IconComponent className={className} style={color ? { color } : undefined} aria-hidden="true" />;
}
