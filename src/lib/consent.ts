/**
 * Consentimento de cookies (Google Analytics).
 * A escolha fica salva no localStorage do visitante.
 */

export type ConsentValue = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "grs-cookie-consent";

/** Disparado para reabrir o banner (botão "Preferências de cookies"). */
export const OPEN_PREFERENCES_EVENT = "grs:open-cookie-preferences";

/** Disparado quando o banner abre ou fecha (detail: boolean). */
export const BANNER_VISIBILITY_EVENT = "grs:cookie-banner";

/** ID do GA4. Sem ele, nada relacionado a cookies é exibido ou carregado. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

export function readConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Armazenamento indisponível (modo privado etc.): vale só nesta visita
  }
}

/** Remove os cookies do Google Analytics (_ga, _ga_*) ao revogar. */
export function clearAnalyticsCookies() {
  const host = window.location.hostname;
  // Tenta o domínio atual e o domínio "raiz" (ex.: .seudominio.com.br)
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-3).join(".")}`, `.${host.split(".").slice(-2).join(".")}`];

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !/^_ga(_|$)|^_gid$|^_gat/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
