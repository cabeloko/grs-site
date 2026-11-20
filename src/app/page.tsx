import { CircuitConnector } from "@/components/graphics/CircuitConnector";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Solutions } from "@/components/sections/Solutions";

/** Landing page da GRS. O FAQ entra na próxima etapa. */
export default function Home() {
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <Hero />
      {/* Fio condutor: a trilha do Hero desce até a primeira seção */}
      <CircuitConnector className="relative -my-16 lg:-my-20" />
      <Solutions />
      <Differentials />
      <Portfolio />
      <CircuitConnector className="relative -my-16" />
      <Process />
      <Contact />
    </main>
  );
}
