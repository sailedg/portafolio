import type { SiteContent } from "./types";

export const en: SiteContent = {
  nav: [
    { href: "#inicio", label: "Home" },
    { href: "#sobre-mi", label: "About" },
    { href: "#servicios", label: "Services" },
    { href: "#proyectos", label: "Projects" },
    { href: "#contacto", label: "Contact" },
  ],

  hero: {
    aria: "Introduction",
    greeting: "Hi, I'm",
    roleTexts: ["Frontend Developer", "Freelancer", "Self-taught"],
    bio: "A self-taught developer passionate about design, technology and building digital products that truly connect with people and solve real problems.",
    stackLabel: "// Main stack",
    availability: "Open to work",
    ctaProjects: "View projects",
    ctaAbout: "About me",
    stats: [
      { label: "Years of experience", value: "3" },
      { label: "Client satisfaction", value: "100%" },
      { label: "Clients", value: "+7" },
      { label: "Projects delivered", value: "18" },
    ],
  },

  services: {
    aria: "Services",
    heading: "Services",
    subtitle:
      "These are some of the areas where I enjoy creating, solving and improving digital experiences.",
    items: [
      {
        id: "frontend-development",
        title: "Frontend Development",
        description: "Fast, smooth interfaces built with modern technologies.",
      },
      {
        id: "ui-ux-design",
        title: "UI/UX Design",
        description: "Clear, intuitive interface design focused on the user experience.",
      },
      {
        id: "web-optimization",
        title: "Web Optimization",
        description: "Technical optimization focused on speed, SEO and browsing experience.",
      },
    ],
  },

  about: {
    aria: "About me and skills",
    headingPre: "About",
    headingAccent: "Me",
    bio: "I started out in tech studying computer science and then kept learning on my own in frontend development, UI design and modern web experiences. I've worked on personal projects, systems support and web development, combining programming and design to build functional, visually polished interfaces focused on the user experience.",
    languages: [{ name: "English", level: "A2 · Basic-Intermediate" }],
    ctaContact: "Contact me",
    ctaCv: "Download CV",
    skillsHeading: "Technical skills",
    skillsSubtitle:
      "// Technologies and tools I use to design, build and ship digital products.",
    categoryTitles: {
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools & Workflow",
      design: "Design & Others",
    },
    certificates: {
      trigger: "View certificates",
      dialogAria: "Certificates",
      heading: "Certificates",
      subtitle: "Courses and training that back my frontend development experience.",
      close: "Close",
      download: "Download PDF",
      verifyAria: (title) => `View ${title} certificate online`,
      items: [
        {
          id: "react",
          title: "React.js Course",
          issuer: "Platzi",
          date: "2026",
          fileHref: "/certificates/diploma-react.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/7395-course/diploma/detalle/",
        },
        {
          id: "javascript",
          title: "JavaScript Fundamentals Course",
          issuer: "Platzi",
          date: "2025",
          fileHref: "/certificates/diploma-javascript.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/10266-course/diploma/detalle/",
        },
        {
          id: "frontend-developer",
          title: "Frontend Developer Course",
          issuer: "Platzi",
          date: "2024",
          fileHref: "/certificates/diploma-frontend-developer.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/2467-course/diploma/detalle/",
        },
        {
          id: "ai-data-ml",
          title: "AI Fundamentals for Data and Machine Learning Course",
          issuer: "Platzi",
          date: "2023",
          fileHref: "/certificates/diploma-ia-data-ml-2023.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/6935-course/diploma/detalle/",
        },
        {
          id: "ecmascript",
          title: "ECMAScript 6+ Course",
          issuer: "Platzi",
          date: "2020",
          fileHref: "/certificates/diploma-ecmascript.pdf",
          verifyUrl: "https://platzi.com/p/eliasrodas/curso/1815-course/diploma/detalle/",
        },
      ],
    },
  },

  projects: {
    aria: "Projects",
    heading: "Projects",
    subtitle:
      "A selection of projects where I've applied my skills to build real, functional solutions.",
    featuredBadge: "Featured",
    ribbon: "Featured",
    cardLink: "View project",
    more: "View more projects",
    less: "View fewer projects",
    featured: {
      id: "portfolio",
      name: "Personal Portfolio",
      description:
        "The site you're looking at. Designed and built from scratch to showcase my work as a frontend developer, with a focus on **performance**, **user experience** and **attention to detail**.",
      imageAlt:
        "My portfolio on tablet, laptop and phone: dark landing page with my name, my photo and green accents, and below it the About section with the tech skills.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend"],
      href: undefined,
      featured: true,
    },
    grid: [
      {
        id: "iptv-app",
        name: "IPTV App",
        description:
          "**UI/UX redesign** of an IPTV platform to modernize its look and deliver a more intuitive browsing experience.",
        imageAlt:
          "Before and after comparison of the IPTV app redesign: the original dark grey screens on the left, the redesigned blue ones on the right with a profile picker and content rows.",
        tags: ["React Native", "Expo", "TypeScript", "Reanimated", "SVG", "UI/UX"],
      },
      {
        id: "fabian-berger",
        name: "Fabian Berger",
        description:
          "Corporate website, handling the **full markup** and **optimizing performance** to ensure a fast, responsive experience.",
        imageAlt:
          "Fabián Berger's site on tablet, laptop and phone: green and white landing page about hypnosis and neuroscience, with a photo of the specialist and a booking button.",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive", "Performance", "Bootstrap"],
        href: "https://www.fabianberger.cl/",
      },
      {
        id: "sic-ingenieria",
        name: "SIC Ingeniería & Consultoría",
        description:
          "Corporate website, built to strengthen the company's digital presence through a **modern interface**, **SEO optimization** and **performance improvements** to deliver fast, smooth navigation.",
        imageAlt:
          "SIC Ingeniería's site on laptop, tablet and phone: dark landing page with an engineer on a factory floor, a headline about engineering solutions and yellow call-to-action buttons.",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Resend", "SEO"],
        href: "https://sicdc.com.co",
      },
      {
        id: "paulina-riquelme",
        name: "Paulina Riquelme",
        description:
          "Corporate website with **full markup** and **performance optimization** to ensure a fast, responsive experience.",
        imageAlt:
          "Psychologist Paulina Abarca Riquelme's site on tablet, laptop and phone: blue landing page with a sky background, her photo and the tagline about becoming your best self.",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive", "Performance", "Bootstrap"],
        href: "https://www.paulinariquelme.cl",
      },
      {
        id: "todo-list",
        name: "To-Do List",
        description:
          "Task management app built to organize activities simply, with an **intuitive interface**, **local storage** and **responsive design**.",
        imageAlt:
          "Task app: panel with the day's task list, a search box, filters for all, pending and completed tasks, and a completed counter at the top.",
        tags: ["React", "JavaScript", "CSS3", "HTML5", "Local Storage"],
        href: "https://sailedg.github.io/to-do-list",
      },
    ],
  },

  testimonials: {
    aria: "Client reviews",
    heading: "What people say",
    subtitlePre: "// This is what some of my clients say about ",
    subtitleAccent: "working with me.",
    prev: "Previous testimonial",
    next: "Next testimonial",
    reviewLink: "View original review",
    items: [
      {
        id: "testimonial-1",
        name: "Fabgonber",
        role: "Client",
        quote:
          "Great designer, really good with css+html5+js and an expert at Google Speed Insights optimization. I decided the design and he built it in CSS+HTML5+JS; once done he optimized it for Google Speed Insights and hit a score of 100.",
        rating: 5,
      },
      {
        id: "testimonial-2",
        name: "Haaland",
        role: "Client",
        quote: "Highly recommended markup developer, 100000%!",
        rating: 5,
      },
    ],
  },

  contact: {
    aria: "Contact",
    badge: "Contact",
    heading: "Let's talk",
    description:
      "I'm available for consulting, freelance projects and job opportunities. Feel free to reach out — I reply the same day.",
    emailLabel: "Email address",
    emailPlaceholder: "you@email.com",
    nameLabel: "Your name",
    namePlaceholder: "Enter your name",
    companyLabel: "Company (optional)",
    companyPlaceholder: "Company name",
    messageLabel: "Tell me more details",
    messagePlaceholder: "Briefly describe what you need...",
    honeypotLabel: "Website",
    submit: "Send email",
    submitting: "Sending...",
    whatsapp: "Send WhatsApp",
    success: "Message sent! I'll get back to you shortly.",
    genericError: "The message couldn't be sent. Please try again.",
    rateLimitError: "Too many requests. Please try again in a few minutes.",
    nameMinError: "Please enter your name.",
    emailInvalidError: "Please enter a valid email.",
    messageMinError: "Tell me a little more.",
    copyAria: (label) => `Copy ${label}`,
    whatsappLabel: "WhatsApp number",
    emailShort: "email",
    locationLabel: "location",
    socialLabel: "Social",
    githubAria: "Elias Rodas on GitHub",
    linkedinAria: "Elias Rodas on LinkedIn",
    waName: "Name",
    waEmail: "Email",
    waCompany: "Company",
    waMessage: "Message",
  },

  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with",
  },

  navbar: {
    nav: "Main navigation",
    mobileNav: "Mobile navigation",
    languageAria: "Change language",
    themeAria: "Change theme",
  },

  errorPages: {
    notFoundCode: "404",
    notFoundTitle: "This page does not exist",
    notFoundDescription:
      "The link you followed is broken or the page moved. From the home page you can see my work and get in touch.",
    errorTitle: "Something went wrong",
    errorDescription: "An unexpected error happened on my side. You can retry or go back home.",
    retry: "Retry",
    backHome: "Back to home",
    notFoundMetaTitle: "Page not found",
  },

  metadata: {
    title: "Frontend Developer",
    description:
      "Elias Rodas, frontend developer specialized in React, Next.js and Tailwind CSS. Portfolio of projects, web development services and UI/UX design in Lima, Peru.",
  },
};
