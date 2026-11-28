import { ArrowUpRight, ImageOff, Info } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent } from "@/config/content";
import {
  CAPTURE_VIEWPORTS,
  isInternalUrl,
  portfolioImagePath,
  portfolioProjects,
  type CaptureManifest,
  type PortfolioProject,
} from "@/config/portfolio";
import captures from "@/config/portfolio-captures.json";
import { getSiteUrl } from "@/lib/site-url";

const manifest = captures as CaptureManifest;

/** Proporção da "tela" do navegador no card (igual à viewport capturada). */
const DESKTOP_RATIO = CAPTURE_VIEWPORTS.desktop.height / CAPTURE_VIEWPORTS.desktop.width;
const MOBILE_RATIO = CAPTURE_VIEWPORTS.mobile.height / CAPTURE_VIEWPORTS.mobile.width;

/**
 * Quanto a imagem precisa subir (em % da própria altura) para mostrar o fim
 * da captura dentro da janela. Usado na rolagem suave do hover.
 */
function scrollPercent(width: number, height: number, ratio: number) {
  const visible = width * ratio;
  return Math.max(0, (1 - visible / height) * 100);
}

/**
 * Texto da barra de endereço da moldura: domínio externo, ou o domínio deste
 * site + caminho quando o item é uma página interna (ex.: um modelo).
 */
function displayUrl(url: string) {
  if (isInternalUrl(url)) return `${new URL(getSiteUrl()).host}${url}`;
  return new URL(url).hostname;
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const capture = manifest[project.slug];

  const style = capture
    ? ({
        "--scroll-desktop": `-${scrollPercent(capture.desktop.width, capture.desktop.height, DESKTOP_RATIO).toFixed(2)}%`,
        "--scroll-mobile": `-${scrollPercent(capture.mobile.width, capture.mobile.height, MOBILE_RATIO).toFixed(2)}%`,
      } as CSSProperties)
    : undefined;

  return (
    <article
      aria-labelledby={`projeto-${project.slug}`}
      className="group flex h-full flex-col"
      style={style}
    >
      {/* Moldura de navegador */}
      <div className="relative mb-16 sm:mb-[4.5rem]">
        <div className="overflow-hidden rounded-card border border-line bg-surface transition-[transform,border-color,box-shadow] duration-500 ease-out-quart group-hover:-translate-y-1 group-hover:border-accent-soft/40 group-hover:shadow-[0_24px_60px_-28px_rgb(46_98_245/0.55)]">
          <div className="flex h-10 items-center gap-3 border-b border-line px-4">
            <span aria-hidden className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded-full bg-white/[0.04] px-3 py-1 text-center font-mono text-[0.6875rem] text-subtle">
              {displayUrl(project.url)}
            </span>
          </div>

          <div
            className="relative overflow-hidden bg-surface-2"
            style={{ aspectRatio: `${CAPTURE_VIEWPORTS.desktop.width} / ${CAPTURE_VIEWPORTS.desktop.height}` }}
          >
            {capture ? (
              <Image
                src={portfolioImagePath(project.slug, "desktop")}
                alt={`${project.name}: página inicial na versão para computador`}
                width={capture.desktop.width}
                height={capture.desktop.height}
                sizes="(min-width: 1280px) 370px, (min-width: 768px) 46vw, 92vw"
                className="h-auto w-full transition-transform duration-[4500ms] ease-in-out motion-safe:group-hover:[transform:translateY(var(--scroll-desktop))]"
              />
            ) : (
              <PendingCapture />
            )}
          </div>
        </div>

        {/* Versão mobile sobreposta */}
        {capture && (
          <div
            aria-hidden
            className="absolute right-4 -bottom-10 w-[23%] max-w-[150px] min-w-[84px] rounded-[1.25rem] border border-line-strong bg-bg p-1 shadow-[0_20px_40px_-12px_rgb(0_0_0/0.8)] transition-transform duration-500 ease-out-quart group-hover:-translate-y-2 sm:right-6 sm:-bottom-12"
          >
            <div
              className="relative overflow-hidden rounded-[1rem] bg-surface-2"
              style={{ aspectRatio: `${CAPTURE_VIEWPORTS.mobile.width} / ${CAPTURE_VIEWPORTS.mobile.height}` }}
            >
              <Image
                src={portfolioImagePath(project.slug, "mobile")}
                alt=""
                width={capture.mobile.width}
                height={capture.mobile.height}
                sizes="150px"
                className="h-auto w-full transition-transform duration-[4500ms] ease-in-out motion-safe:group-hover:[transform:translateY(var(--scroll-mobile))]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Informações */}
      <div className="flex flex-1 flex-col">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-accent-soft">
          <span className="text-subtle">{String(index + 1).padStart(2, "0")}</span>
          {project.category}
        </p>
        <h3
          id={`projeto-${project.slug}`}
          className="mt-3 text-xl font-semibold text-fg sm:text-2xl xl:text-xl"
        >
          {project.name}
        </h3>
        <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
          {project.description}
        </p>
      </div>
      <div className="mt-6">
        <ButtonLink
          href={project.url}
          external
          variant="secondary"
          aria-label={`${portfolioContent.visitLabel}: ${project.name} (abre em nova aba)`}
        >
          {portfolioContent.visitLabel}
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          />
        </ButtonLink>
      </div>
    </article>
  );
}

/** Exibido quando o projeto ainda não tem captura (rode `npm run capture`). */
function PendingCapture() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-subtle">
      <ImageOff aria-hidden className="size-6" />
      <span className="font-mono text-xs">Captura pendente</span>
    </div>
  );
}

export function Portfolio() {
  return (
    <Section id="modelos" labelledBy="modelos-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="modelos-title"
            index="03"
            eyebrow={portfolioContent.eyebrow}
            title={portfolioContent.title}
            subtitle={portfolioContent.subtitle}
          />
        </Reveal>

        {/* minmax(0,1fr): a coluna não cresce com o endereço longo da moldura */}
        <ul className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={(i % 3) * 0.08}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-14 flex max-w-3xl items-start gap-3 text-sm leading-relaxed text-subtle">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          {portfolioContent.disclaimer}
        </p>
      </Container>
    </Section>
  );
}
