import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Largura máxima e gutters laterais padrão do site. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
