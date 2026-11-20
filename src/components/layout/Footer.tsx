import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";
import { Container } from "@/components/ui/Container";
import { navItems, siteConfig, type SocialNetwork } from "@/config/site";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";

const SOCIAL_LABELS: Record<SocialNetwork, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  github: "GitHub",
};

/**
 * Ano atual para o copyright. Fica no HTML estático e é regenerado
 * diariamente (cacheLife "days"), então a virada do ano não exige deploy.
 */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const linkClass =
  "inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-fg";

export function Footer() {
  const { contact } = siteConfig;
  const socials = (Object.entries(siteConfig.social) as Array<[SocialNetwork, string]>).filter(
    ([, url]) => url.trim().length > 0,
  );

  return (
    <footer className="relative mt-12 border-t border-line">
      {/* Linha luminosa: o fio condutor termina no rodapé */}
      <div
        aria-hidden
        className="absolute -top-px left-1/2 h-px w-2/3 max-w-xl -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-soft/60 to-transparent"
      />

      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" aria-label="GRS – Soluções Tecnológicas, página inicial" className="inline-flex min-h-11 items-center rounded-lg">
            <Logo />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-muted">{siteConfig.institutional}</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <MapPin aria-hidden className="size-4 text-accent-soft" />
            {siteConfig.serviceArea}
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Navegação</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">Contato</h2>
          <ul className="mt-3">
            <li>
              <a
                href={defaultWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} gap-2.5`}
              >
                <WhatsAppIcon className="size-4 text-accent-soft" />
                {contact.whatsappDisplay}
                <span className="sr-only"> (WhatsApp, abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={`${linkClass} gap-2.5 break-all`}>
                <Mail aria-hidden className="size-4 shrink-0 text-accent-soft" />
                {contact.email}
              </a>
            </li>
          </ul>

          {socials.length > 0 && (
            <>
              <h2 className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-subtle">
                Redes sociais
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-5">
                {socials.map(([network, url]) => (
                  <li key={network}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-1`}>
                      {SOCIAL_LABELS[network]}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Container>

      <div className="border-t border-line">
        {/* pb extra no mobile: o botão flutuante não cobre os links finais */}
        <Container className="flex flex-col gap-2 pt-6 pb-24 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:pb-6 sm:pr-24 lg:pr-8">
          <p>
            © <CurrentYear /> {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-6">
            <Link href="/politica-de-privacidade" className="inline-flex min-h-11 items-center hover:text-fg">
              Política de Privacidade
            </Link>
            <CookiePreferencesButton className="inline-flex min-h-11 cursor-pointer items-center hover:text-fg" />
          </div>
        </Container>
      </div>
    </footer>
  );
}
