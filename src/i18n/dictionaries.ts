import type { Locale } from "./config";
import type { SiteContent } from "./content/types";
import { es } from "./content/es";
import { en } from "./content/en";

const dictionaries: Record<Locale, SiteContent> = { es, en };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}
