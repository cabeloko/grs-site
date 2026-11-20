import { serializeJsonLd } from "@/lib/seo";

/** Insere um bloco de dados estruturados JSON-LD. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
