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
      data-hidden={hidden || undefined}
      className={cn(
        "wa-float group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 size-14 rounded-full sm:right-6 sm:bottom-6",
        "transition-[opacity,transform] duration-300 ease-out-quart",
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      {/* Aura: dois anéis que se expandem e desaparecem, defasados para um
          pulso contínuo. Só transform/opacity; pausa quando oculto. */}
      <span aria-hidden className="wa-aura absolute inset-0 rounded-full bg-[#25D366]" />
      <span
        aria-hidden
        className="wa-aura absolute inset-0 rounded-full bg-[#25D366]"
        style={{ animationDelay: "1.3s" }}
      />

      {/* Botão: verde oficial do WhatsApp com o glifo branco */}
      <span className="relative flex size-full items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgb(37_211_102/0.6),inset_0_1px_0_rgb(255_255_255/0.25)] transition-transform duration-300 ease-out-quart group-hover:scale-[1.07] group-active:scale-95">
        <WhatsAppIcon className="size-7" />
      </span>
    </a>
  );
}
