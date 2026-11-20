"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { QUOTE_ANCHOR, navItems } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

const sectionIds = navItems.map((item) => item.id);

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Header fixo. Ganha fundo translúcido com desfoque ao rolar, destaca a
 * seção ativa e oferece menu mobile acessível.
 */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScrolled();
  const activeSection = useActiveSection(isHome ? sectionIds : []);
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Efeitos do menu aberto: trava o scroll, torna o resto da página inerte,
  // fecha com Esc e mantém o foco dentro do header.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const outside = Array.from(
      document.querySelectorAll<HTMLElement>("body > *:not(header)"),
    ).filter((el) => !el.contains(headerRef.current));
    outside.forEach((el) => el.setAttribute("inert", ""));

    // Foco no primeiro link do menu, no próximo quadro (após o painel
    // deixar de ser inerte/invisível)
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(panelId)
        ?.querySelector<HTMLElement>(FOCUSABLE)
        ?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;

      const focusables = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Fecha o menu se a tela passar para o layout desktop
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      cancelAnimationFrame(frame);
      root.style.overflow = previousOverflow;
      outside.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, close, panelId]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const quoteHref = hrefFor(QUOTE_ANCHOR);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled || open
          ? "border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-header items-center justify-between gap-6">
        <a
          href={isHome ? "#inicio" : "/"}
          className="-m-1 rounded-lg p-1"
          aria-label="GRS – Soluções Tecnológicas, ir para o início"
          onClick={() => open && close(false)}
        >
          <Logo />
        </a>

        {/* Navegação desktop */}
        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center rounded-full px-3.5 text-sm transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    {/* Indicador da seção ativa: nó luminoso sob o item */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)] transition-[opacity,transform] duration-300",
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={quoteHref} className="max-sm:hidden">
            Solicitar orçamento
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg transition-colors hover:border-cyan/50 xl:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => (open ? close(false) : setOpen(true))}
          >
            {open ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </Container>

      {/* Painel do menu mobile */}
      <div
        id={panelId}
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-header bottom-0 h-[calc(100dvh-var(--spacing-header))] overflow-y-auto border-t border-line bg-bg duration-300 ease-out-quart xl:hidden",
          open
            ? "visible translate-y-0 opacity-100 transition-[opacity,transform]"
            : "invisible -translate-y-2 opacity-0 transition-[opacity,transform,visibility]",
        )}
      >
        <nav aria-label="Menu mobile">
          <Container className="flex flex-col py-6">
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <li key={item.id} className="border-b border-line">
                  <a
                    href={hrefFor(item.id)}
                    onClick={() => close(false)}
                    aria-current={
                      isHome && activeSection === item.id ? "true" : undefined
                    }
                    className="flex min-h-14 items-center gap-4 font-display text-xl text-fg aria-[current=true]:text-accent-soft"
                  >
                    <span className="font-mono text-xs text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink
              href={quoteHref}
              size="lg"
              className="mt-8 w-full"
              onClick={() => close(false)}
            >
              Solicitar orçamento
            </ButtonLink>
          </Container>
        </nav>
      </div>
    </header>
  );
}
