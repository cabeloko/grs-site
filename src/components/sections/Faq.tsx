"use client";

import { Plus } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqContent } from "@/config/content";
import { cn } from "@/lib/cn";

/**
 * FAQ em accordion acessível (padrão WAI-ARIA):
 * - cada pergunta é um <button> com aria-expanded e aria-controls
 * - setas ↑/↓ navegam entre perguntas; Home/End vão à primeira/última
 * - várias respostas podem ficar abertas ao mesmo tempo
 */
export function Faq() {
  const uid = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = faqContent.items.length - 1;
    const target = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];

    if (target === undefined) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <Section id="faq" labelledBy="faq-title">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal>
          <SectionHeading
            id="faq-title"
            index="06"
            eyebrow={faqContent.eyebrow}
            title={faqContent.title}
            className="lg:sticky lg:top-28"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-t border-line">
            {faqContent.items.map((item, index) => {
              const isOpen = open.has(index);
              const buttonId = `${uid}-q${index}`;
              const panelId = `${uid}-a${index}`;

              return (
                <div key={item.question} className="border-b border-line">
                  <h3>
                    <button
                      ref={(el) => {
                        buttons.current[index] = el;
                      }}
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(index)}
                      onKeyDown={(e) => onKeyDown(e, index)}
                      className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-fg transition-colors hover:text-accent-soft sm:text-xl"
                    >
                      <span>{item.question}</span>
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-[transform,border-color,color] duration-300 group-hover:border-accent-soft/50 group-hover:text-accent-soft",
                          isOpen && "rotate-45 border-accent-soft/50 text-accent-soft",
                        )}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="faq-panel pr-14 pb-6"
                  >
                    <p className="leading-relaxed text-muted">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
