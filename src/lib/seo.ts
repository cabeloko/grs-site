/**
 * SEO: palavras-chave e dados estruturados (JSON-LD).
 * Apenas dados reais fornecidos — sem endereço, avaliações ou números.
 */
import { faqContent } from "@/config/content";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "./site-url";

/** Palavras-chave com foco nacional e remoto (sem SEO local de cidade). */
export const seoKeywords = [
  "criação de sites profissionais",
  "desenvolvimento de sites para empresas",
  "criação de landing pages",
  "landing page profissional",
  "sites para profissionais liberais",
  "sites para prestadores de serviços",
  "site institucional",
  "criação de sites em todo o Brasil",
  "desenvolvimento web remoto",
  "presença digital para empresas",
  "SEO técnico",
  "integração com WhatsApp",
];

/** Serializa JSON-LD com escape de "<" para evitar injeção de HTML. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  const url = getSiteUrl();
  const sameAs = Object.values(siteConfig.social).filter((link) => link.trim());

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url,
    logo: `${url}/icons/icon-512.png`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.whatsappE164,
    areaServed: "BR",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: siteConfig.contact.whatsappE164,
      email: siteConfig.contact.email,
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: siteConfig.name,
    url,
    inLanguage: "pt-BR",
    publisher: { "@id": `${url}/#organization` },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
