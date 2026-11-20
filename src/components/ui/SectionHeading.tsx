import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** id do h2, referenciado pelo aria-labelledby da seção. */
  id: string;
  eyebrow?: string;
  /** Numeração técnica exibida antes do eyebrow (ex.: "02"). */
  index?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Título padrão das seções: rótulo mono + h2 + subtítulo. */
export function SectionHeading({
  id,
  eyebrow,
  index,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-soft",
            align === "center" && "justify-center",
          )}
        >
          {index && <span className="text-subtle">{index}</span>}
          {index && <span aria-hidden className="h-px w-6 bg-line-strong" />}
          <span>{eyebrow}</span>
        </p>
      )}
      <h2 id={id} className="text-h2 font-semibold text-fg">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
