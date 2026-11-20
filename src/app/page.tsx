import { Hero } from "@/components/sections/Hero";

/** Landing page da GRS. As demais seções são adicionadas nas próximas etapas. */
export default function Home() {
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <Hero />
    </main>
  );
}
