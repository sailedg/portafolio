# Portafolio — RodasDev

Mi portafolio personal como desarrollador frontend: presentación, servicios, proyectos, testimonios y un formulario de contacto que envía correos de verdad.

Hecho con Next.js 16 (App Router), TypeScript, Tailwind CSS 4 y Resend. Sin base de datos: todo el contenido vive en archivos del repo.

## Diseño

Diseñé la interfaz completa en Figma antes de escribir el primer componente: **[ver el archivo de diseño](https://www.figma.com/design/I9R7Y4nWSesMGn1jHFohP0/portafolio?node-id=0-1)**.

Ahí están las pantallas, la paleta, la tipografía y los estados de cada componente. Si vas a modificar el sitio, es el mejor punto de partida para entender por qué las cosas están donde están.

## Arrancar en local

```bash
npm install
cp .env.example .env.local   # y pega tu API key de Resend
npm run dev
```

Queda en http://localhost:3000.

Sin `RESEND_API_KEY` el sitio funciona igual; solo el formulario responde con un error controlado en vez de enviar el correo. La key se saca gratis en [resend.com](https://resend.com).

Scripts: `npm run dev`, `npm run build`, `npm start`, `npm run lint`.

## Cómo está organizado

```
src/
  app/          rutas, metadata, sitemap, robots, manifest, OG image
    api/contact endpoint del formulario
  components/   una carpeta por sección: Componente.tsx + Componente.module.css
  i18n/         textos en español e inglés (content/es.ts, content/en.ts)
  data/         datos sin idioma: skills, stack, imágenes, contacto
  assets/       imágenes que se importan (optimizadas por next/image)
  hooks/ lib/   utilidades: reveal on scroll, validación, rate limit, iconos
public/         archivos con URL fija: CV, certificados, videos
```

Dos reglas que sigo en todo el proyecto:

- **El texto nunca va dentro del componente.** Todo lo traducible está en `src/i18n/content/`. Si agrego una frase, va en `es.ts` y en `en.ts`, y el tipo de `types.ts` obliga a que no se me olvide ninguna.
- **Estilos en CSS Modules con nombres BEM**, escritos con `@apply` de Tailwind. Así el JSX queda legible y cada sección tiene su hoja aparte.

El idioma y el tema se guardan en cookie, así que el servidor ya devuelve el HTML correcto en la primera carga y no hay parpadeo.

## Si quieres usarlo

Puedes tomarlo como base para tu propio portafolio, es justo para lo que lo comparto. Lo que hay que cambiar:

1. `src/lib/constants.ts` — tu dominio y el nombre del sitio.
2. `src/data/site.ts` — contacto, redes y la ruta de tu CV.
3. `src/i18n/content/es.ts` y `en.ts` — todos los textos, proyectos, servicios, testimonios y certificados.
4. `src/data/skills.ts` y `stack.ts` — tus tecnologías.
5. `src/assets/` y `public/` — tus imágenes, tu CV, tus certificados. **Borra los míos.**
6. `src/app/favicon.ico` y el resto de iconos.

Lo único que te pido: cambia el contenido personal (nombre, foto, CV, certificados, testimonios). El código es tuyo para lo que quieras; mis datos no.

## Deploy

Pensado para [Vercel](https://vercel.com/new): importas el repo y listo. Antes de desplegar hay que configurar `RESEND_API_KEY` en las variables de entorno del proyecto y verificar un dominio en Resend para poder enviar desde un remitente propio.

## Licencia

Código bajo licencia MIT — ver [LICENSE](LICENSE). El contenido personal (fotos, CV, certificados, textos y testimonios) no entra en esa licencia.
