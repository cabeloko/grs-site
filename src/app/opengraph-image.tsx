import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  LOGO_COLORS,
  LOGO_NODES,
  LOGO_STROKE_WIDTH,
  LOGO_TRACE_PATH,
  LOGO_VIEWBOX,
} from "@/components/brand/logo-mark";
import { siteConfig } from "@/config/site";

// Imagem Open Graph gerada no build, na identidade visual da GRS
export const alt = `${siteConfig.name} — criação de sites profissionais para todo o Brasil`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fontes lidas no nível do módulo (padrão da documentação): assim a imagem
// é gerada no build e servida como arquivo estático
const fontsDir = join(process.cwd(), "assets/fonts");
const [display, mono] = await Promise.all([
  readFile(join(fontsDir, "SpaceGrotesk-600.ttf")),
  readFile(join(fontsDir, "JetBrainsMono-500.ttf")),
]);

export default async function OpengraphImage() {
  // Grade técnica (blueprint) desenhada como linhas
  const grid: React.ReactNode[] = [];
  for (let x = 0; x <= 1200; x += 60) {
    grid.push(<div key={`v${x}`} style={{ position: "absolute", left: x, top: 0, width: 1, height: 630, background: "rgba(148,163,184,0.07)" }} />);
  }
  for (let y = 0; y <= 630; y += 60) {
    grid.push(<div key={`h${y}`} style={{ position: "absolute", top: y, left: 0, height: 1, width: 1200, background: "rgba(148,163,184,0.07)" }} />);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#070A12",
          fontFamily: "Space Grotesk",
          color: "#E9EDF5",
        }}
      >
        {grid}
        {/* Trilha de circuito com nós */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", inset: 0 }}>
          <path d="M1090 630V492a12 12 0 0 0-12-12H964a12 12 0 0 1-12-12V360a12 12 0 0 1 12-12H1200" fill="none" stroke="rgba(148,163,184,0.28)" strokeWidth="2" />
          <path d="M1020 0V140a12 12 0 0 0 12 12H1200" fill="none" stroke="rgba(148,163,184,0.28)" strokeWidth="2" />
          <circle cx="952" cy="420" r="7" fill="#070A12" stroke="#38D9F0" strokeWidth="2.5" />
          <circle cx="1020" cy="96" r="7" fill="#070A12" stroke="#38D9F0" strokeWidth="2.5" />
          <circle cx="1090" cy="568" r="7" fill="#070A12" stroke="#38D9F0" strokeWidth="2.5" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", width: "100%" }}>
          {/* Marca */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="64" height="64" viewBox={LOGO_VIEWBOX}>
              <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="#0B101B" stroke={LOGO_COLORS.border} />
              <path d={LOGO_TRACE_PATH} fill="none" stroke={LOGO_COLORS.trace} strokeWidth={LOGO_STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" />
              {LOGO_NODES.map((n) => (
                <circle key={`${n.cx}`} cx={n.cx} cy={n.cy} r={n.r} fill={LOGO_COLORS.node} />
              ))}
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>GRS</div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 15, letterSpacing: 3, color: "#7C879B" }}>
                SOLUÇÕES TECNOLÓGICAS
              </div>
            </div>
          </div>

          {/* Mensagem */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 820 }}>
              Sua presença digital começa com uma solução inteligente.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 34, fontFamily: "JetBrains Mono", fontSize: 19, color: "#A1ABBD" }}>
              <div style={{ width: 10, height: 10, borderRadius: 9999, background: "#38D9F0" }} />
              Sites profissionais · Landing pages · Atendimento para todo o Brasil
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: display, style: "normal", weight: 600 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
