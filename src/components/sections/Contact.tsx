import { Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactContent } from "@/config/content";
import { QUOTE_ANCHOR, siteConfig } from "@/config/site";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";
import { QuoteForm } from "./QuoteForm";

/** Seção de contato: formulário de orçamento + canais alternativos. */
export function Contact() {
  const { contact } = siteConfig;

  const channels = [
    {
      label: "WhatsApp",
      value: contact.whatsappDisplay,
      href: defaultWhatsAppUrl(),
      external: true,
      icon: <WhatsAppIcon />,
    },
    {
      label: "E-mail",
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
      icon: <Mail aria-hidden className="size-5" strokeWidth={1.8} />,
    },
  ];

  return (
    <Section id="contato" labelledBy="contato-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="contato-title"
            index="05"
            eyebrow={contactContent.eyebrow}
            title={contactContent.title}
            subtitle={contactContent.subtitle}
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          <Reveal>
            <Card id={QUOTE_ANCHOR} className="p-6 sm:p-10">
              <QuoteForm />
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <aside aria-labelledby="contato-alternativas" className="lg:sticky lg:top-28">
              <h3 id="contato-alternativas" className="text-lg font-semibold text-fg">
                {contactContent.alternativesTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex min-h-16 items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition-[border-color,background-color] duration-300 hover:border-accent-soft/40 hover:bg-surface-2"
                    >
                      <span className="text-accent-soft transition-colors duration-300 group-hover:text-cyan">
                        {channel.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-subtle">
                          {channel.label}
                          {channel.external && <span className="sr-only"> (abre em nova aba)</span>}
                        </span>
                        <span className="block truncate font-medium text-fg">{channel.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted">
                <MapPin aria-hidden className="size-4 text-accent-soft" />
                {siteConfig.serviceArea}, de forma remota.
              </p>
            </aside>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
