import { ArrowRight, MapPin } from "lucide-react";
import { HeroVisual } from "@/components/graphics/HeroVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { heroContent } from "@/config/content";
import { QUOTE_ANCHOR } from "@/config/site";

/**
 * Hero. Componente de servidor: a animação de entrada é feita em CSS para
 * não depender da hidratação nem atrasar o LCP.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-header"
    >
      {/* Fundo: grade técnica dissolvida nas bordas + um único brilho no topo */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-blueprint mask-fade absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(46_98_245/0.18),transparent)]" />
      </div>

      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:min-h-[min(860px,calc(100svh-var(--spacing-header)))] lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:py-24">
        <div className="max-w-2xl">
          <p
            className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted"
            style={{ animationDelay: "0ms" }}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-cyan" />
            {heroContent.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="hero-in-rise text-display font-semibold text-fg"
          >
            {heroContent.title}
          </h1>

          <p
            className="hero-in mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {heroContent.subtitle}
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "200ms" }}
          >
            <ButtonLink href={`#${QUOTE_ANCHOR}`} size="lg">
              {heroContent.primaryCta}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href="#modelos" variant="secondary" size="lg">
              {heroContent.secondaryCta}
            </ButtonLink>
          </div>

          <p
            className="hero-in mt-8 flex items-center gap-2 text-sm text-subtle"
            style={{ animationDelay: "280ms" }}
          >
            <MapPin aria-hidden className="size-4 text-accent-soft" />
            {heroContent.support}
          </p>
        </div>

        <div
          className="hero-in relative mx-auto w-full max-w-[560px] lg:max-w-none"
          style={{ animationDelay: "160ms" }}
        >
          <HeroVisual className="h-auto w-full" />
        </div>
      </Container>
    </section>
  );
}
