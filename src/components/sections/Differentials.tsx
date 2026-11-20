import {
  Code,
  Compass,
  Gauge,
  Globe,
  Handshake,
  Palette,
  Plug,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import {
  PerformanceVisual,
  RemoteVisual,
  ResponsiveVisual,
} from "@/components/graphics/DifferentialVisuals";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  differentialsContent,
  type Differential,
  type DifferentialIcon,
} from "@/config/content";
import { cn } from "@/lib/cn";

const ICONS: Record<DifferentialIcon, LucideIcon> = {
  smartphone: Smartphone,
  gauge: Gauge,
  palette: Palette,
  code: Code,
  compass: Compass,
  search: Search,
  plug: Plug,
  handshake: Handshake,
  globe: Globe,
};

// Posição de cada tamanho no bento grid (4 colunas no desktop, 2 no tablet)
const SPAN: Record<Differential["size"], string> = {
  lg: "sm:col-span-2 lg:row-span-2",
  md: "sm:col-span-2",
  sm: "",
  wide: "sm:col-span-2 lg:col-span-4",
};

function Visual({ type }: { type: NonNullable<Differential["visual"]> }) {
  switch (type) {
    case "responsive":
      return <ResponsiveVisual className="h-auto w-full max-w-[460px]" />;
    case "performance":
      return <PerformanceVisual className="h-auto w-full max-w-[260px]" />;
    case "remote":
      return <RemoteVisual className="h-auto w-full max-w-[420px]" />;
  }
}

function DifferentialCard({ item }: { item: Differential }) {
  const Icon = ICONS[item.icon];
  const isLarge = item.size === "lg";
  const isWide = item.size === "wide";

  return (
    <Card
      interactive
      className={cn(
        "group flex h-full flex-col overflow-hidden p-6 sm:p-7",
        isWide && "md:flex-row md:items-center md:justify-between md:gap-10",
      )}
    >
      <div className={cn(isWide && "md:max-w-md")}>
        <Icon
          aria-hidden
          className="size-5 text-accent-soft transition-colors duration-300 group-hover:text-cyan"
          strokeWidth={1.6}
        />
        <h3
          className={cn(
            "mt-5 font-semibold text-fg",
            isLarge || isWide ? "text-2xl" : "text-lg",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-2 leading-relaxed text-muted",
            isLarge || isWide ? "text-base" : "text-sm",
          )}
        >
          {item.description}
        </p>
      </div>

      {item.visual && (
        <div
          className={cn(
            "flex items-end justify-center",
            isLarge && "mt-10 flex-1",
            item.size === "md" && "mt-8",
            isWide && "mt-8 md:mt-0 md:flex-1 md:justify-end",
          )}
        >
          <Visual type={item.visual} />
        </div>
      )}
    </Card>
  );
}

export function Differentials() {
  return (
    <Section id="diferenciais" labelledBy="diferenciais-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="diferenciais-title"
            index="02"
            eyebrow={differentialsContent.eyebrow}
            title={differentialsContent.title}
            subtitle={differentialsContent.subtitle}
          />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentialsContent.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 4) * 0.06}
              className={SPAN[item.size]}
            >
              <DifferentialCard item={item} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
