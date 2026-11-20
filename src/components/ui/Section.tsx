import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentProps<"section"> & {
  id: string;
  /** id do título que nomeia a seção (aria-labelledby). */
  labelledBy: string;
};

/** Seção semântica com espaçamento vertical padrão. */
export function Section({ id, labelledBy, className, ...props }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-24 sm:py-28 lg:py-32", className)}
      {...props}
    />
  );
}
