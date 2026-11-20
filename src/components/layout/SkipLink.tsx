"use client";

import type { MouseEvent } from "react";

/**
 * Link "Pular para o conteúdo", visível apenas ao receber foco.
 *
 * Com Cache Components, o Next.js mantém páginas visitadas ocultas no DOM
 * (React Activity, display: none). Por isso pode haver mais de um
 * #conteudo; o clique foca sempre o <main> visível. Sem JavaScript, a
 * âncora comum funciona normalmente.
 */
export function SkipLink() {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const main = Array.from(document.querySelectorAll<HTMLElement>("main")).find(
      (el) => el.getClientRects().length > 0,
    );
    if (!main) return;
    event.preventDefault();
    main.focus({ preventScroll: true });
    main.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <a
      href="#conteudo"
      onClick={onClick}
      className="fixed top-3 left-3 z-[100] -translate-y-[150%] rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-transform focus-visible:translate-y-0"
    >
      Pular para o conteúdo
    </a>
  );
}
