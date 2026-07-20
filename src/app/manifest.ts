import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RodasDev — Elias Rodas, Desarrollador Frontend",
    short_name: "RodasDev",
    description:
      "Portafolio de Elias Rodas, desarrollador frontend especializado en React, Next.js y Tailwind CSS.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // "maskable" avisa a Android que puede recortar el icono con la forma del
      // launcher, por eso este archivo lleva el fondo a sangre y el dibujo
      // dentro del 80% central.
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
