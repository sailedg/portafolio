"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { Check, Copy, Mail, MapPin, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { contactInfo } from "@/data/site";
import { useContent } from "@/i18n/LanguageProvider";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import vectorAirplane from "@/assets/vectors/airplane.svg";
import vectorLines from "@/assets/vectors/lines.svg";
import styles from "./Contact.module.css";

type SubmitState = "idle" | "loading" | "success" | "error";

const ERROR_MESSAGE_ID = "contact-form-error";

function CopyButton({ value, ariaLabel }: { value: string; ariaLabel: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={styles["contact__copy-button"]}
      aria-label={ariaLabel}
    >
      {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
    </button>
  );
}

export function Contact() {
  const { contact: t } = useContent();
  const { ref: panelRef, isVisible: isPanelVisible } = useRevealOnScroll<HTMLDivElement>();
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // Campo que rechazó el servidor, para marcarlo con aria-invalid y enlazarle
  // el mensaje de error.
  const [invalidField, setInvalidField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Props de accesibilidad del campo que falló: lo marca inválido y apunta al
  // párrafo del error, así el lector de pantalla lee el motivo al enfocarlo.
  const fieldErrorProps = (fieldName: string) =>
    invalidField === fieldName
      ? { "aria-invalid": true, "aria-describedby": ERROR_MESSAGE_ID }
      : {};

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setInvalidField(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error ?? t.genericError);
        setInvalidField(typeof data.field === "string" ? data.field : null);
        setStatus("error");
        // Lleva el foco al campo que falló para poder corregirlo de inmediato.
        if (typeof data.field === "string") {
          formRef.current?.querySelector<HTMLElement>(`[name="${data.field}"]`)?.focus();
        }
        return;
      }

      setStatus("success");
      // Uso formRef y no event.currentTarget: React lo pone en null después del
      // await, y leerlo ahí tiraba error justo cuando el envío ya había salido,
      // mandando el estado a error aunque el correo sí se mandó.
      formRef.current?.reset();
    } catch {
      setErrorMessage(t.genericError);
      setStatus("error");
    }
  };

  const handleSendWhatsapp = () => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company");
    const message = formData.get("message");

    const lines = [
      `${t.waName}: ${name}`,
      `${t.waEmail}: ${email}`,
      company ? `${t.waCompany}: ${company}` : null,
      "",
      `${t.waMessage}: ${message}`,
    ].filter((line) => line !== null);

    const whatsappNumber = contactInfo.whatsapp.replace(/\D/g, "");
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contacto" className={styles.contact} aria-label={t.aria}>
      <div
        ref={panelRef}
        data-visible={isPanelVisible}
        className={`${styles.contact__panel} reveal`}
      >
        <Image
          src={vectorAirplane}
          alt=""
          aria-hidden="true"
          className={styles["contact__watermark-airplane"]}
        />
        <Image
          src={vectorLines}
          alt=""
          aria-hidden="true"
          className={styles["contact__watermark-lines"]}
        />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className={styles.contact__form}
        >
          <div className={styles.contact__field}>
            <label htmlFor="email" className={styles.contact__label}>
              {t.emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              placeholder={t.emailPlaceholder}
              className={styles.contact__input}
              {...fieldErrorProps("email")}
            />
          </div>

          <div className={styles.contact__row}>
            <div className={styles.contact__field}>
              <label htmlFor="name" className={styles.contact__label}>
                {t.nameLabel}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                placeholder={t.namePlaceholder}
                className={styles.contact__input}
                {...fieldErrorProps("name")}
              />
            </div>
            <div className={styles.contact__field}>
              <label htmlFor="company" className={styles.contact__label}>
                {t.companyLabel}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                maxLength={100}
                placeholder={t.companyPlaceholder}
                className={styles.contact__input}
                {...fieldErrorProps("company")}
              />
            </div>
          </div>

          <div className={styles.contact__field}>
            <label htmlFor="message" className={styles.contact__label}>
              {t.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              required
              maxLength={2000}
              rows={4}
              placeholder={t.messagePlaceholder}
              className={styles.contact__textarea}
              {...fieldErrorProps("message")}
            />
          </div>

          <label className={styles.contact__honeypot} aria-hidden="true">
            {t.honeypotLabel}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>

          <div className={styles["contact__submit-row"]}>
            <button
              type="submit"
              disabled={status === "loading"}
              className={styles.contact__submit}
            >
              <Mail size={16} aria-hidden="true" />
              {status === "loading" ? t.submitting : t.submit}
            </button>
            <button
              type="button"
              onClick={handleSendWhatsapp}
              className={styles["contact__submit--whatsapp"]}
            >
              <FaWhatsapp size={16} aria-hidden="true" />
              {t.whatsapp}
            </button>
          </div>

          {status === "success" && (
            <p className={`${styles.contact__status} ${styles["contact__status--success"]}`} role="status">
              {t.success}
            </p>
          )}
          {status === "error" && (
            <p
              id={ERROR_MESSAGE_ID}
              className={`${styles.contact__status} ${styles["contact__status--error"]}`}
              role="alert"
            >
              {errorMessage}
            </p>
          )}
        </form>

        <div className={styles["contact__info-column"]}>
          <span className={styles.contact__badge}>
            <MessageSquare size={12} aria-hidden="true" />
            {t.badge}
          </span>
          <h2 className={styles.contact__heading}>{t.heading}</h2>
          <p className={styles.contact__description}>{t.description}</p>

          <ul className={styles["contact__info-list"]}>
            <li className={styles["contact__info-item"]}>
              <span className={styles["contact__info-main"]}>
                <FaWhatsapp size={16} aria-hidden="true" />
                <a href={contactInfo.whatsappHref} target="_blank" rel="noopener noreferrer">
                  {contactInfo.whatsapp}
                </a>
              </span>
              <CopyButton value={contactInfo.whatsapp} ariaLabel={t.copyAria(t.whatsappLabel)} />
            </li>
            <li className={styles["contact__info-item"]}>
              <span className={styles["contact__info-main"]}>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </span>
              <CopyButton value={contactInfo.email} ariaLabel={t.copyAria(t.emailShort)} />
            </li>
            <li className={styles["contact__info-item"]}>
              <span className={styles["contact__info-main"]}>
                <MapPin size={16} aria-hidden="true" />
                <span>{contactInfo.location}</span>
              </span>
              <CopyButton value={contactInfo.location} ariaLabel={t.copyAria(t.locationLabel)} />
            </li>
          </ul>

          <div className={styles.contact__social}>
            <p className={styles["contact__social-label"]}>{t.socialLabel}</p>
            <div className={styles["contact__social-links"]}>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["contact__social-link"]}
                aria-label={t.githubAria}
              >
                <FaGithub size={14} aria-hidden="true" />
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["contact__social-link"]}
                aria-label={t.linkedinAria}
              >
                <FaLinkedinIn size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
