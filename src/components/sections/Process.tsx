import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processContent } from "@/config/content";
import { QUOTE_ANCHOR } from "@/config/site";

/**
 * Linha do tempo do processo, conectada pela trilha de circuito da marca:
 * vertical no mobile, horizontal a partir do desktop.
 */
export function Process() {
  const { steps } = processContent;

  return (
    <Section id="como-funciona" labelledBy="como-funciona-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="como-funciona-title"
            index="04"
            eyebrow={processContent.eyebrow}
            title={processContent.title}
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Trilha: vertical (mobile) e horizontal (desktop) */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[11px] w-px bg-gradient-to-b from-line-strong via-line-strong to-transparent lg:hidden"
          />
          <span
            aria-hidden
            className="absolute top-[11px] right-0 left-0 hidden h-px bg-gradient-to-r from-line-strong via-line-strong to-transparent lg:block"
          />

          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.number}
              delay={i * 0.1}
              className="relative pl-12 lg:pl-0"
            >
              {/* Nó da trilha */}
              <span
                aria-hidden
                className="absolute top-0 left-0 flex size-6 items-center justify-center"
              >
                <span
                  className="node-halo absolute inset-0 rounded-full bg-cyan"
                  style={{ animationDelay: `${i * 0.8}s` }}
                />
                <span className="size-3 rounded-full border-[1.5px] border-cyan bg-bg" />
              </span>

              <p className="font-mono text-sm text-accent-soft lg:mt-10">
                {step.number}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-fg">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>

        {/* CTA ao fim da linha do tempo */}
        <Reveal className="mt-20">
          <div className="relative overflow-hidden rounded-card border border-line bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
            <div aria-hidden className="bg-blueprint mask-fade absolute inset-0" />
            <div
              aria-hidden
              className="absolute -bottom-32 left-1/2 h-64 w-[640px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(46_98_245/0.22),transparent)]"
            />
            <div className="relative">
              <h3 className="text-h2 font-semibold text-fg">
                {processContent.ctaTitle}
              </h3>
              <ButtonLink href={`#${QUOTE_ANCHOR}`} size="lg" className="mt-8">
                {processContent.ctaButton}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
