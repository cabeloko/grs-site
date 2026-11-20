import {
  ChartColumn,
  Globe,
  Info,
  MapPin,
  MessageCircle,
  Monitor,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solutionsContent, type ServiceIcon } from "@/config/content";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  monitor: Monitor,
  target: Target,
  message: MessageCircle,
  "map-pin": MapPin,
  search: Search,
  chart: ChartColumn,
  globe: Globe,
};

export function Solutions() {
  const { services } = solutionsContent;
  const featured = services.filter((s) => s.featured);
  const complements = services.filter((s) => !s.featured);

  return (
    <Section id="solucoes" labelledBy="solucoes-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="solucoes-title"
            index="01"
            eyebrow={solutionsContent.eyebrow}
            title={solutionsContent.title}
            subtitle={solutionsContent.subtitle}
          />
        </Reveal>

        {/* Serviços principais: cards grandes */}
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {featured.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal as="li" key={service.title} delay={i * 0.08}>
                <Card
                  interactive
                  className="group h-full overflow-hidden p-7 sm:p-9"
                >
                  {/* Grade técnica no canto, revelada no hover */}
                  <div
                    aria-hidden
                    className="bg-blueprint absolute inset-y-0 right-0 w-2/3 opacity-40 transition-opacity duration-500 [mask-image:linear-gradient(to_left,#000,transparent)] group-hover:opacity-100"
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <span className="flex size-12 items-center justify-center rounded-xl border border-accent-soft/30 bg-accent/10 text-accent-soft">
                        <Icon aria-hidden className="size-6" strokeWidth={1.6} />
                      </span>
                      <span className="font-mono text-xs text-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-10 text-2xl font-semibold text-fg sm:text-[1.75rem]">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </ul>

        {/* Complementos: lista compacta com divisórias */}
        <Reveal className="mt-16">
          <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-subtle">
            {solutionsContent.complementsLabel}
            <span aria-hidden className="h-px flex-1 bg-line" />
          </h3>
          <ul className="mt-6 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {complements.map((service) => {
              const Icon = ICONS[service.icon];
              return (
                <li
                  key={service.title}
                  className="group relative border-r border-b border-line p-6 transition-colors duration-300 hover:bg-surface"
                >
                  <Icon
                    aria-hidden
                    className="size-5 text-accent-soft transition-colors duration-300 group-hover:text-cyan"
                    strokeWidth={1.6}
                  />
                  <p className="mt-4 font-display text-lg font-medium text-fg">
                    {service.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </li>
              );
            })}
            {/* Célula final com a nota de escopo, completando a grade */}
            <li className="flex items-start gap-3 border-r border-b border-line p-6 text-sm leading-relaxed text-muted">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-subtle" />
              <span>{solutionsContent.scopeNote}</span>
            </li>
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
