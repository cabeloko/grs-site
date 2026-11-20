import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

/**
 * Página provisória (etapa 1): vitrine do design system.
 * Será substituída pela landing page completa a partir da etapa 2.
 */
export default function Home() {
  return (
    <main id="conteudo">
      <Section id="design-system" labelledBy="design-system-title">
        <Container className="space-y-16">
          <Logo />

          <div>
            <h1 className="text-display font-semibold">{siteConfig.tagline}</h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              {siteConfig.description}
            </p>
          </div>

          <SectionHeading
            id="design-system-title"
            index="00"
            eyebrow="Design system"
            title="Componentes base"
            subtitle="Botões, cards e títulos de seção usados em todo o site."
          />

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#design-system" size="lg">
              Primário <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="#design-system" variant="secondary" size="lg">
              Secundário
            </ButtonLink>
            <Button variant="ghost">Ghost</Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {["Card estático", "Card interativo", "Grade blueprint"].map(
              (label, i) => (
                <Card
                  key={label}
                  interactive={i === 1}
                  className={i === 2 ? "bg-blueprint p-6" : "p-6"}
                >
                  <p className="font-mono text-xs text-subtle">0{i + 1}</p>
                  <p className="mt-3 font-display text-lg font-medium">{label}</p>
                  <p className="mt-2 text-sm text-muted">
                    Texto de apoio com contraste AA.
                  </p>
                </Card>
              ),
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
