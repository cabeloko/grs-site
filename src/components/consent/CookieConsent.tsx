"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  BANNER_VISIBILITY_EVENT,
  GA_ID,
  OPEN_PREFERENCES_EVENT,
  clearAnalyticsCookies,
  readConsent,
  saveConsent,
  type ConsentValue,
} from "@/lib/consent";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    dataLayer?: unknown[];
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

/**
 * Banner de cookies + carregamento condicional do Google Analytics.
 * - Sem NEXT_PUBLIC_GA_ID: não renderiza nada.
 * - O GA só é carregado depois que o visitante aceita.
 * - "Recusar" e "Aceitar" têm o mesmo peso visual.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const titleRef = useRef<HTMLParagraphElement>(null);

  const showBanner = useCallback((open: boolean) => {
    setBannerOpen(open);
    window.dispatchEvent(new CustomEvent(BANNER_VISIBILITY_EVENT, { detail: open }));
  }, []);

  useEffect(() => {
    if (!GA_ID) return;
    const stored = readConsent();
    // Sincroniza com o localStorage (só existe no navegador)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(stored);
    if (!stored) showBanner(true);

    const reopen = () => {
      showBanner(true);
      requestAnimationFrame(() => titleRef.current?.focus());
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, [showBanner]);

  const choose = (value: ConsentValue) => {
    saveConsent(value);
    setConsent(value);
    showBanner(false);

    if (value === "denied") {
      // Revogação: desativa o GA já carregado e remove seus cookies
      window[`ga-disable-${GA_ID}`] = true;
      clearAnalyticsCookies();
    } else {
      window[`ga-disable-${GA_ID}`] = false;
    }
  };

  if (!GA_ID) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_ID)}, { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {bannerOpen && (
        <section
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-text"
          className={cn(
            "cookie-banner fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-line-strong bg-surface-2/95 p-5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.9)] backdrop-blur-md",
            "sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md",
          )}
        >
          <p
            id="cookie-banner-title"
            ref={titleRef}
            tabIndex={-1}
            className="font-display text-base font-semibold text-fg outline-none"
          >
            Cookies e privacidade
          </p>
          <p id="cookie-banner-text" className="mt-2 text-sm leading-relaxed text-muted">
            Usamos o Google Analytics para entender como o site é utilizado, apenas se você
            permitir. Saiba mais na{" "}
            <Link
              href="/politica-de-privacidade"
              className="text-accent-soft underline decoration-accent-soft/40 underline-offset-2 hover:decoration-accent-soft"
            >
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={() => choose("denied")}>
              Recusar
            </Button>
            <Button variant="secondary" onClick={() => choose("granted")}>
              Aceitar
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
