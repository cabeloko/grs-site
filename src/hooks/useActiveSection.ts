"use client";

import { useEffect, useState } from "react";

/**
 * Observa as seções informadas e retorna o id da que ocupa a faixa central
 * da tela. Usado para destacar o item ativo do menu durante a rolagem.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        // A primeira seção (na ordem do documento) dentro da faixa vence
        const current = elements.find((el) => visible.get(el.id));
        if (current) setActive(current.id);
      },
      // Faixa estreita no meio da viewport
      { rootMargin: "-40% 0px -55% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
