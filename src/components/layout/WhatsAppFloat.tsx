"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { QUOTE_ANCHOR } from "@/config/site";
import { cn } from "@/lib/cn";
import { BANNER_VISIBILITY_EVENT } from "@/lib/consent";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Botão flutuante de WhatsApp. Fica oculto enquanto o formulário de
 * orçamento estiver visível (para não competir com ele nem cobrir campos) e
 * enquanto o banner de cookies estiver aberto (para não sobrepor os botões).
 */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const [formVisible, setFormVisible] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  // Reobserva o formulário a cada troca de página (o layout persiste)
  useEffect(() => {
    const form = document.getElementById(QUOTE_ANCHOR);
    if (!form) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onBanner = (event: Event) => setBannerOpen((event as CustomEvent<boolean>).detail);
    window.addEventListener(BANNER_VISIBILITY_EVENT, onBanner);
    return () => window.removeEventListener(BANNER_VISIBILITY_EVENT, onBanner);
  }, []);

  const hidden = formVisible || bannerOpen;

  return (
    <a
      href={defaultWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a GRS pelo WhatsApp (abre em nova aba)"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-13 items-center justify-center rounded-full sm:right-6 sm:bottom-6",
        "bg-[#25D366] text-[#052e16] shadow-[0_10px_30px_-8px_rgb(37_211_102/0.55)]",
        "transition-[opacity,transform] duration-300 ease-out-quart hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgb(37_211_102/0.7)]",
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
