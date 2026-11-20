import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

// Fontes auto-hospedadas pelo next/font (sem requisições ao Google no navegador)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

// Metadados básicos. SEO completo é configurado na etapa 7.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} | Criação de sites profissionais`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: "#070A12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">
        <SkipLink />
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
        <CookieConsent />
      </body>
    </html>
  );
}
