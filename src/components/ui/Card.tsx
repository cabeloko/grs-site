import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentProps<"div"> & {
  /** Ativa elevação e brilho de borda no hover. */
  interactive?: boolean;
};

/**
 * Superfície base: borda fina de baixa opacidade, fundo levemente elevado.
 * Sem glassmorphism — o desfoque fica reservado ao header.
 */
export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-card border border-line bg-surface",
        interactive &&
          "transition-[transform,border-color,background-color] duration-300 ease-out-quart " +
            "hover:-translate-y-1 hover:border-accent-soft/35 hover:bg-surface-2",
        className,
      )}
      {...props}
    />
  );
}
