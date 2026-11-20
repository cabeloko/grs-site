"use client";

import { GA_ID, OPEN_PREFERENCES_EVENT } from "@/lib/consent";

/** Reabre o banner de cookies. Só aparece se o Analytics estiver configurado. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  if (!GA_ID) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className={className}
    >
      Preferências de cookies
    </button>
  );
}
