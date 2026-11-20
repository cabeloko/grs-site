import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Ícone usado nos links de WhatsApp. Usa o balão de conversa do Lucide para
 * manter a consistência visual com os demais ícones do site.
 */
export function WhatsAppIcon({ className }: { className?: string }) {
  return <MessageCircle aria-hidden className={cn("size-5", className)} strokeWidth={1.8} />;
}
