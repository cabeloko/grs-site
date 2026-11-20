import { CircuitConnector } from "@/components/graphics/CircuitConnector";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Solutions } from "@/components/sections/Solutions";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

/** Landing page da GRS. */
export default function Home() {
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <JsonLd data={faqJsonLd()} />
      <Hero />
      {/* Fio condutor: a trilha do Hero desce até a primeira seção */}
      <CircuitConnector className="relative -my-16 lg:-my-20" />
      <Solutions />
      <Differentials />
      <Portfolio />
      <CircuitConnector className="relative -my-16" />
      <Process />
      <Contact />
      <Faq />
    </main>
  );
}
