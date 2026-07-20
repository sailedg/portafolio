import type { ReactNode } from "react";
import styles from "./ErrorScreen.module.css";

// Pantalla que comparten la 404 y el error boundary. No lleva "use client":
// la usa tanto not-found.tsx (servidor) como error.tsx (cliente), y como no
// tiene estado propio funciona en ambos.
export function ErrorScreen({
  code,
  title,
  description,
  actions,
}: {
  /** Número grande decorativo, ej. "404". Opcional. */
  code?: string;
  title: string;
  description: string;
  actions: ReactNode;
}) {
  return (
    <main className={styles.screen}>
      {code && (
        <p className={styles.code} aria-hidden="true">
          {code}
        </p>
      )}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>{actions}</div>
    </main>
  );
}

export { styles as errorScreenStyles };
