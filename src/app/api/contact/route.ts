import { cookies } from "next/headers";
import { Resend } from "resend";
import { buildContactFormSchema, escapeHtml } from "@/lib/validations";
import { isRateLimited } from "@/lib/rate-limit";
import { contactInfo } from "@/data/site";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config";
import { getContent } from "@/i18n/dictionaries";

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(localeCookie) ? localeCookie : defaultLocale;
  const t = getContent(locale).contact;

  const clientId = getClientIdentifier(request);

  if (isRateLimited(clientId)) {
    return Response.json({ error: t.rateLimitError }, { status: 429 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json({ error: t.genericError }, { status: 400 });
  }

  const parsed = buildContactFormSchema(t).safeParse(rawBody);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    // Devuelvo también el campo para que el formulario pueda marcarlo con
    // aria-invalid y enlazarle el mensaje, en vez de solo mostrar un error suelto.
    return Response.json(
      {
        error: firstIssue?.message ?? t.genericError,
        field: typeof firstIssue?.path[0] === "string" ? firstIssue.path[0] : undefined,
      },
      { status: 400 },
    );
  }

  const { name, email, company, message, website } = parsed.data;

  // Cayó en el honeypot: finjo éxito para que el bot no se dé cuenta.
  if (website) {
    return Response.json({ success: true });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return Response.json({ error: t.genericError }, { status: 500 });
  }

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: "RodasDev <onboarding@resend.dev>",
      to: contactInfo.email,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} desde el portafolio`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Empresa:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: t.genericError }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form send failure:", error);
    return Response.json({ error: t.genericError }, { status: 500 });
  }
}
