/**
 * URL pública do site, usada em metadataBase, canonical, sitemap, robots e
 * Open Graph.
 *
 * Ordem de prioridade:
 * 1. NEXT_PUBLIC_SITE_URL (domínio próprio). TODO: definir quando houver domínio.
 * 2. VERCEL_PROJECT_PRODUCTION_URL (URL de produção da Vercel, automática).
 * 3. http://localhost:3000 (desenvolvimento local).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}
