import type { SiteContent } from "./types";

export const es: SiteContent = {
  nav: [
    { href: "#inicio", label: "Inicio" },
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#servicios", label: "Servicios" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#contacto", label: "Contacto" },
  ],

  hero: {
    aria: "Presentación",
    greeting: "Hola, soy",
    roleTexts: ["Desarrollador Frontend", "Freelancer", "Autodidacta"],
    bio: "Autodidacta apasionado por el diseño, la tecnología y la creación de productos digitales que realmente conecten con las personas y resuelvan problemas.",
    stackLabel: "// Stack principal",
    availability: "Open to work",
    ctaProjects: "Ver proyectos",
    ctaAbout: "Sobre mí",
    stats: [
      { label: "Años de experiencia", value: "3" },
      { label: "Satisfacción de clientes", value: "100%" },
      { label: "Clientes", value: "+7" },
      { label: "Proyectos entregados", value: "18" },
    ],
  },

  services: {
    aria: "Servicios",
    heading: "Servicios",
    subtitle:
      "Estas son algunas de las áreas donde disfruto crear, resolver y mejorar experiencias digitales.",
    items: [
      {
        id: "frontend-development",
        title: "Desarrollo Frontend",
        description: "Interfaces rápidas, fluidas y desarrolladas con tecnologías modernas.",
      },
      {
        id: "ui-ux-design",
        title: "Diseño UI/UX",
        description:
          "Diseño de interfaces claras e intuitivas centradas en la experiencia del usuario.",
      },
      {
        id: "web-optimization",
        title: "Optimización Web",
        description:
          "Optimización técnica enfocada en velocidad, SEO y experiencia de navegación.",
      },
    ],
  },

  about: {
    aria: "Sobre mí y habilidades",
    headingPre: "Sobre",
    headingAccent: "Mí",
    bio: "Comencé mi camino en tecnología estudiando computación y posteriormente continué formándome de manera autodidacta en desarrollo frontend, diseño UI y experiencias web modernas. He trabajado en proyectos personales, soporte de sistemas y desarrollo web, combinando programación y diseño para crear interfaces funcionales, visualmente cuidadas y enfocadas en la experiencia del usuario.",
    languages: [{ name: "Inglés", level: "A2 · Básico-Intermedio" }],
    ctaContact: "Contáctame",
    ctaCv: "Descargar CV",
    skillsHeading: "Habilidades tecnológicas",
    skillsSubtitle:
      "// Tecnologías y herramientas con las que diseño, desarrollo y despliego productos digitales.",
    categoryTitles: {
      languages: "Lenguajes",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Herramientas & Workflow",
      design: "Diseño & Otros",
    },
    certificates: {
      trigger: "Ver certificados",
      dialogAria: "Certificados",
      heading: "Certificados",
      subtitle: "Cursos y formación que respaldan mi experiencia en desarrollo frontend.",
      close: "Cerrar",
      download: "Descargar PDF",
      verifyAria: (title) => `Ver certificado de ${title} en línea`,
      items: [
        {
          id: "react",
          title: "Curso de React.js",
          issuer: "Platzi",
          date: "2026",
          fileHref: "/certificates/diploma-react.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/7395-course/diploma/detalle/",
        },
        {
          id: "javascript",
          title: "Curso de Fundamentos de JavaScript",
          issuer: "Platzi",
          date: "2025",
          fileHref: "/certificates/diploma-javascript.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/10266-course/diploma/detalle/",
        },
        {
          id: "frontend-developer",
          title: "Curso de Frontend Developer",
          issuer: "Platzi",
          date: "2024",
          fileHref: "/certificates/diploma-frontend-developer.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/2467-course/diploma/detalle/",
        },
        {
          id: "ai-data-ml",
          title: "Curso de Fundamentos de AI para Data y Machine Learning",
          issuer: "Platzi",
          date: "2023",
          fileHref: "/certificates/diploma-ia-data-ml-2023.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/6935-course/diploma/detalle/",
        },
        {
          id: "ecmascript",
          title: "Curso de ECMAScript 6+",
          issuer: "Platzi",
          date: "2020",
          fileHref: "/certificates/diploma-ecmascript.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/1815-course/diploma/detalle/",
        },
      ],
    },
  },

  projects: {
    aria: "Proyectos",
    heading: "Proyectos",
    subtitle:
      "Una selección de proyectos donde he aplicado mis habilidades para crear soluciones reales y funcionales.",
    featuredBadge: "Destacado",
    ribbon: "Destacado",
    cardLink: "Ver Proyecto",
    more: "Ver más proyectos",
    less: "Ver menos proyectos",
    featured: {
      id: "portfolio",
      name: "Portafolio Personal",
      description:
        "El sitio que estás viendo. Diseñado y desarrollado desde cero para presentar mi trabajo como desarrollador frontend, con un enfoque en **rendimiento**, **experiencia de usuario** y **atención al detalle**.",
      imageAlt:
        "Mi portafolio en tablet, portátil y móvil: portada oscura con mi nombre, mi foto y acentos verdes, y debajo la sección Sobre mí con las habilidades técnicas.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend"],
      href: undefined,
      featured: true,
    },
    grid: [
      {
        id: "iptv-app",
        name: "Aplicación IPTV",
        description:
          "**Rediseño UI/UX** de una plataforma IPTV con el objetivo de modernizar su apariencia y ofrecer una experiencia de navegación más intuitiva.",
        imageAlt:
          "Comparación antes y después del rediseño de la app IPTV: a la izquierda las pantallas originales en gris oscuro, a la derecha las rediseñadas en azul con selector de perfiles y filas de contenido.",
        tags: ["React Native", "Expo", "TypeScript", "Reanimated", "SVG", "UI/UX"],
      },
      {
        id: "fabian-berger",
        name: "Fabian Berger",
        description:
          "Sitio web corporativo, realizando la **maquetación completa** y **optimizando el rendimiento** para garantizar una experiencia rápida y responsive.",
        imageAlt:
          "Sitio de Fabián Berger en tablet, portátil y móvil: portada en verde y blanco sobre hipnosis y neurociencia, con la foto del especialista y un botón para reservar una hora.",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive", "Performance", "Bootstrap"],
        href: "https://www.fabianberger.cl/",
      },
      {
        id: "sic-ingenieria",
        name: "SIC Ingeniería & Consultoría",
        description:
          "Sitio web corporativo, creado para fortalecer la presencia digital de la empresa mediante una **interfaz moderna**, **optimización SEO** y **mejoras de rendimiento** para ofrecer una navegación rápida y fluida.",
        imageAlt:
          "Sitio de SIC Ingeniería en portátil, tablet y móvil: portada oscura con una ingeniera en planta industrial, titular sobre soluciones de ingeniería y botones amarillos de diagnóstico gratuito.",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Resend", "SEO"],
        href: "https://sicdc.com.co",
      },
      {
        id: "paulina-riquelme",
        name: "Paulina Riquelme",
        description:
          "Sitio web corporativo con **maquetación completa** y **optimización del rendimiento** para garantizar una experiencia rápida y responsive.",
        imageAlt:
          "Sitio de la psicóloga Paulina Abarca Riquelme en tablet, portátil y móvil: portada azul con cielo, su foto y el lema Consigue la mejor versión de ti mismo.",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive", "Performance", "Bootstrap"],
        href: "https://www.paulinariquelme.cl",
      },
      {
        id: "todo-list",
        name: "To-Do List",
        description:
          "Aplicación de gestión de tareas desarrollada para organizar actividades de forma sencilla, con una **interfaz intuitiva**, **almacenamiento local** y **diseño responsive**.",
        imageAlt:
          "Aplicación de tareas: panel con el listado del día, buscador, filtros de todas, pendientes y completadas, y arriba el contador de tareas completadas.",
        tags: ["React", "JavaScript", "CSS3", "HTML5", "Local Storage"],
        href: "https://sailedg.github.io/to-do-list",
      },
    ],
  },

  testimonials: {
    aria: "Opiniones de clientes",
    heading: "Opiniones sobre mí",
    subtitlePre: "// Esto es lo que dicen algunos de mis clientes sobre ",
    subtitleAccent: "trabajar conmigo.",
    prev: "Testimonio anterior",
    next: "Siguiente testimonio",
    reviewLink: "Ver reseña original",
    items: [
      {
        id: "testimonial-1",
        name: "Fabgonber",
        role: "Cliente",
        quote:
          "Excelente diseñador, muy bueno en css+html5+js, experto en optimización de google speed insight. El diseño lo decidí yo, el lo construyó en CSS+HTML5+JS, una vez el resultado empezó a optimizar para Google Speed Insight logrando 100 puntos.",
        rating: 5,
      },
      {
        id: "testimonial-2",
        name: "Haaland",
        role: "Cliente",
        quote:
          "Maquetador recomendado al 100000%",
        rating: 5,
      },
    ],
  },

  contact: {
    aria: "Contacto",
    badge: "Contacto",
    heading: "Conversemos",
    description:
      "Estoy disponible para consultas, proyectos freelance y oportunidades laborales. No dudes en escribirme, respondo el mismo día.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@correo.com",
    nameLabel: "Tu nombre",
    namePlaceholder: "Ingresa tu nombre",
    companyLabel: "Empresa (opcional)",
    companyPlaceholder: "Nombre de empresa",
    messageLabel: "Cuéntame más detalles",
    messagePlaceholder: "Describe brevemente lo que necesitas...",
    honeypotLabel: "Sitio web",
    submit: "Enviar correo",
    submitting: "Enviando...",
    whatsapp: "Enviar WhatsApp",
    success: "¡Mensaje enviado! Te responderé a la brevedad.",
    genericError: "No se pudo enviar el mensaje. Intenta de nuevo.",
    rateLimitError: "Demasiadas solicitudes. Intenta de nuevo en unos minutos.",
    nameMinError: "Ingresa tu nombre.",
    emailInvalidError: "Ingresa un correo válido.",
    messageMinError: "Cuéntame un poco más.",
    copyAria: (label) => `Copiar ${label}`,
    whatsappLabel: "número de WhatsApp",
    emailShort: "correo",
    locationLabel: "ubicación",
    socialLabel: "Redes",
    githubAria: "GitHub de Elias Rodas",
    linkedinAria: "LinkedIn de Elias Rodas",
    waName: "Nombre",
    waEmail: "Correo",
    waCompany: "Empresa",
    waMessage: "Mensaje",
  },

  footer: {
    rights: "Todos los derechos reservados.",
    builtWith: "Desarrollado con",
  },

  navbar: {
    nav: "Navegación principal",
    mobileNav: "Navegación móvil",
    languageAria: "Cambiar idioma",
    themeAria: "Cambiar tema",
  },

  errorPages: {
    notFoundCode: "404",
    notFoundTitle: "Esta página no existe",
    notFoundDescription:
      "El enlace que seguiste está roto o la página se movió. Desde el inicio puedes ver mi trabajo y escribirme.",
    errorTitle: "Algo salió mal",
    errorDescription:
      "Ocurrió un error inesperado de mi lado. Puedes reintentar o volver al inicio.",
    retry: "Reintentar",
    backHome: "Volver al inicio",
    notFoundMetaTitle: "Página no encontrada",
  },

  metadata: {
    title: "Desarrollador Frontend",
    description:
      "Elias Rodas, desarrollador frontend especializado en React, Next.js y Tailwind CSS. Portafolio de proyectos, servicios de desarrollo web y diseño UI/UX en Lima, Perú.",
  },
};
