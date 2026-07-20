import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { ErrorScreen, errorScreenStyles } from "@/components/ErrorScreen/ErrorScreen";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config";
import { getContent } from "@/i18n/dictionaries";

async function resolveLocale() {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const { errorPages } = getContent(await resolveLocale());

  return {
    title: errorPages.notFoundMetaTitle,
    // Una URL inexistente no aporta nada a los buscadores.
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const { errorPages } = getContent(await resolveLocale());

  return (
    <ErrorScreen
      code={errorPages.notFoundCode}
      title={errorPages.notFoundTitle}
      description={errorPages.notFoundDescription}
      actions={
        <Link href="/" className={errorScreenStyles.primary}>
          <ArrowLeft size={16} aria-hidden="true" />
          {errorPages.backHome}
        </Link>
      }
    />
  );
}
