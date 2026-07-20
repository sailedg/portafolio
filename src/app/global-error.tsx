"use client";

import { defaultLocale } from "@/i18n/config";
import { getContent } from "@/i18n/dictionaries";

// Último recurso: solo aparece si falla el propio layout raíz. Reemplaza al
// layout entero, así que tiene que traer sus <html> y <body>, y no puede contar
// con el provider de idioma, las fuentes ni la cookie de tema. Por eso el texto
// va en el idioma por defecto y los estilos son inline: si el CSS tampoco cargó,
// esta pantalla se sigue viendo.
const { errorPages } = getContent(defaultLocale);

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang={defaultLocale}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "24px",
          textAlign: "center",
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>{errorPages.errorTitle}</h1>
        <p style={{ margin: 0, maxWidth: "28rem", fontSize: "14px", color: "#9ca3af" }}>
          {errorPages.errorDescription}
        </p>
        {error.digest && (
          <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
            Error ID: {error.digest}
          </p>
        )}
        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            marginTop: "12px",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            background: "#c8f224",
            color: "#0a0a0a",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {errorPages.retry}
        </button>
      </body>
    </html>
  );
}
