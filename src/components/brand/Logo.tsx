import { cn } from "@/lib/cn";
import {
  LOGO_NODES,
  LOGO_STROKE_WIDTH,
  LOGO_TRACE_PATH,
  LOGO_VIEWBOX,
} from "./logo-mark";

type LogoMarkProps = {
  className?: string;
  /** Texto alternativo. Omitir quando houver texto visível ao lado. */
  title?: string;
};

/** Símbolo da GRS (trilha de circuito em forma de "G"). */
export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="7.5"
        className="fill-surface stroke-line-strong"
      />
      <path
        d={LOGO_TRACE_PATH}
        fill="none"
        className="stroke-accent-soft"
        strokeWidth={LOGO_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {LOGO_NODES.map((node) => (
        <circle key={`${node.cx}-${node.cy}`} {...node} className="fill-cyan" />
      ))}
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Exibe o descritivo "Soluções Tecnológicas" abaixo do nome. */
  withDescriptor?: boolean;
};

/**
 * Logotipo completo (símbolo + nome). Para substituir a marca, troque este
 * componente e o arquivo `logo-mark.ts`.
 */
export function Logo({ className, withDescriptor = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-8" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-fg">
          GRS
        </span>
        {withDescriptor && (
          <span className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-subtle">
            Soluções Tecnológicas
          </span>
        )}
      </span>
    </span>
  );
}
