export type IconSet = "si" | "lucide" | "custom";

export type Skill = {
  name: string;
  icon: string;
  iconSet: IconSet;
};

export type SkillCategory = {
  // id estable (no traducible): el título visible sale del diccionario por este id.
  id: string;
  skills: Skill[];
  /** Columnas de la grilla de badges de esta categoría, según el diseño de Figma. */
  columns: 1 | 2 | 3;
  /**
   * Invierte el comportamiento responsive: en desktop se apila en `columns`
   * (comparte fila y queda angosta), pero pasa a una sola línea horizontal
   * cuando su fila se apila y toma el ancho completo.
   */
  expandWhenStacked?: boolean;
};

// icon: en iconSet "si" es el nombre exportado de react-icons/si; en "lucide"
// el de lucide-react; en "custom" el de los mapas de @/lib/icon-map (logos que
// react-icons/si no trae, sacados de Figma).
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    columns: 1,
    skills: [
      { name: "JavaScript", icon: "SiJavascript", iconSet: "si" },
      { name: "TypeScript", icon: "SiTypescript", iconSet: "si" },
      { name: "SQL", icon: "SqlIcon", iconSet: "custom" },
    ],
  },
  {
    id: "frontend",
    columns: 2,
    skills: [
      { name: "React", icon: "SiReact", iconSet: "si" },
      { name: "HTML5", icon: "SiHtml5", iconSet: "si" },
      { name: "Next.js", icon: "SiNextdotjs", iconSet: "si" },
      { name: "CSS3", icon: "SiCss", iconSet: "si" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", iconSet: "si" },
      { name: "Bootstrap", icon: "SiBootstrap", iconSet: "si" },
    ],
  },
  {
    id: "backend",
    columns: 3,
    skills: [
      { name: "Node.js", icon: "SiNodedotjs", iconSet: "si" },
      { name: "Express.js", icon: "SiExpress", iconSet: "si" },
      { name: "Rest API", icon: "RestApiIcon", iconSet: "custom" },
      { name: "Supabase", icon: "SiSupabase", iconSet: "si" },
      { name: "MySQL", icon: "MySqlIcon", iconSet: "custom" },
      { name: "SQL Server", icon: "SqlServerIcon", iconSet: "custom" },
    ],
  },
  {
    id: "tools",
    columns: 3,
    skills: [
      { name: "Git", icon: "SiGit", iconSet: "si" },
      { name: "Vercel", icon: "SiVercel", iconSet: "si" },
      { name: "VS Code", icon: "VsCodeIcon", iconSet: "custom" },
      { name: "GitHub", icon: "SiGithub", iconSet: "si" },
      { name: "WordPress", icon: "SiWordpress", iconSet: "si" },
      { name: "Hosting & dominios", icon: "Globe", iconSet: "lucide" },
      { name: "npm", icon: "SiNpm", iconSet: "si" },
      { name: "Postman", icon: "SiPostman", iconSet: "si" },
      { name: "Claude", icon: "ClaudeIcon", iconSet: "custom" },
    ],
  },
  {
    id: "design",
    columns: 1,
    expandWhenStacked: true,
    skills: [
      { name: "Figma", icon: "SiFigma", iconSet: "si" },
      { name: "Photoshop", icon: "PhotoshopIcon", iconSet: "custom" },
      { name: "Illustrator", icon: "IllustratorIcon", iconSet: "custom" },
    ],
  },
];

export const marqueeIcons: { name: string; icon: string; iconSet: IconSet }[] = [
  { name: "JavaScript", icon: "SiJavascript", iconSet: "si" },
  { name: "TypeScript", icon: "SiTypescript", iconSet: "si" },
  { name: "HTML5", icon: "SiHtml5", iconSet: "si" },
  { name: "CSS3", icon: "SiCss", iconSet: "si" },
  { name: "React", icon: "SiReact", iconSet: "si" },
  { name: "Next.js", icon: "SiNextdotjs", iconSet: "si" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", iconSet: "si" },
  { name: "GitHub", icon: "SiGithub", iconSet: "si" },
  { name: "Node.js", icon: "SiNodedotjs", iconSet: "si" },
  { name: "WordPress", icon: "SiWordpress", iconSet: "si" },
];
