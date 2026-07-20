"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";
import { ErrorScreen, errorScreenStyles } from "@/components/ErrorScreen/ErrorScreen";
import { useContent } from "@/i18n/LanguageProvider";

// Error boundary de la página. El layout raíz sobrevive, así que aquí sí hay
// idioma disponible desde el provider.
export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const { errorPages } = useContent();

  useEffect(() => {
    // Queda en la consola del navegador y en los logs del servidor; el digest
    // es lo que permite cruzarlo con el error real en producción.
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen
      title={errorPages.errorTitle}
      description={errorPages.errorDescription}
      actions={
        <>
          <button
            type="button"
            onClick={() => unstable_retry()}
            className={errorScreenStyles.primary}
          >
            <RotateCw size={16} aria-hidden="true" />
            {errorPages.retry}
          </button>
          <Link href="/" className={errorScreenStyles.secondary}>
            <ArrowLeft size={16} aria-hidden="true" />
            {errorPages.backHome}
          </Link>
        </>
      }
    />
  );
}
