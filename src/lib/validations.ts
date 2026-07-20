import { z } from "zod";

type ContactMessages = {
  nameMinError: string;
  emailInvalidError: string;
  messageMinError: string;
};

// Los mensajes de error se pasan según el idioma para que el usuario los vea en
// su lengua (el diccionario vive en @/i18n/content).
export function buildContactFormSchema(messages: ContactMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameMinError).max(100),
    email: z.string().trim().email(messages.emailInvalidError).max(254),
    company: z.string().trim().max(100).optional().or(z.literal("")),
    message: z.string().trim().min(10, messages.messageMinError).max(2000),
    // Honeypot: un usuario real nunca lo llena. Lo dejo pasar la validación a
    // propósito; el route handler decide qué hacer, en vez de soltar un 400 que
    // le avisaría al bot.
    website: z.string().optional().or(z.literal("")),
  });
}

export type ContactFormInput = z.infer<ReturnType<typeof buildContactFormSchema>>;

// Escapa caracteres HTML antes de meter el input del usuario en el correo,
// para evitar inyección de HTML/script.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
