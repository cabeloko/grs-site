import { siteConfig } from "@/config/site";

/**
 * Monta o link do WhatsApp (wa.me) com a mensagem codificada.
 * O número deve estar no formato internacional, somente dígitos.
 */
export function buildWhatsAppUrl(
  message: string,
  number: string = siteConfig.contact.whatsappNumber,
): string {
  const digits = number.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Link direto com a mensagem padrão do site. */
export function defaultWhatsAppUrl(): string {
  return buildWhatsAppUrl(siteConfig.contact.whatsappDefaultMessage);
}
