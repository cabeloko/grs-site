import { cn } from "@/lib/cn";

/**
 * Fio condutor entre seções: trilha vertical fina com um nó luminoso.
 * Reaproveita o motivo gráfico do Hero de forma discreta.
 */
export function CircuitConnector({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none flex flex-col items-center", className)}
    >
      <span className="h-16 w-px bg-gradient-to-b from-transparent to-line-strong" />
      <span className="relative flex size-2.5 items-center justify-center">
        <span className="node-halo absolute inset-[-4px] rounded-full bg-cyan" />
        <span className="size-2.5 rounded-full border border-cyan bg-bg" />
      </span>
      <span className="h-16 w-px bg-gradient-to-b from-line-strong to-transparent" />
    </div>
  );
}
