/**
 * Composição do Hero: wireframe de uma interface web alimentada por trilhas
 * de circuito (motivo gráfico da marca). SVG puro, animado só com CSS
 * (stroke-dashoffset e opacidade). Fica estático com prefers-reduced-motion.
 */

// Trilhas que chegam à janela vindas das bordas. pathLength normalizado em
// 100 permite usar a mesma animação de pulso em todas.
const TRACES = [
  { d: "M0 176H44a8 8 0 0 1 8 8V292a8 8 0 0 0 8 8H90", delay: "0s" },
  { d: "M318 0V60", delay: "1.4s" },
  { d: "M600 132H572a8 8 0 0 0-8 8V212a8 8 0 0 1-8 8H530", delay: "2.6s" },
  { d: "M196 480V452a8 8 0 0 1 8-8H252a8 8 0 0 0 8-8V400", delay: "0.8s" },
  { d: "M600 352H556a8 8 0 0 0-8 8V372a8 8 0 0 1-8 8H530", delay: "3.4s" },
];

// Nós nos pontos onde as trilhas tocam a janela
const NODES = [
  { cx: 90, cy: 300 },
  { cx: 318, cy: 60 },
  { cx: 530, cy: 220 },
  { cx: 260, cy: 400 },
  { cx: 530, cy: 380 },
];

export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 480"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="hv-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#111726" />
          <stop offset="1" stopColor="#0b101b" />
        </linearGradient>
        <pattern
          id="hv-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgb(148 163 184 / 0.12)" />
        </pattern>
      </defs>

      {/* Trilhas base (estáticas) */}
      <g fill="none" stroke="rgb(148 163 184 / 0.22)" strokeWidth="1">
        {TRACES.map((t) => (
          <path key={t.d} d={t.d} />
        ))}
      </g>

      {/* Pulsos de dados percorrendo as trilhas */}
      <g fill="none" strokeWidth="1.5" strokeLinecap="round">
        {TRACES.map((t) => (
          <path
            key={`pulse-${t.d}`}
            d={t.d}
            pathLength={100}
            className="trace-pulse stroke-cyan"
            style={{ animationDelay: t.delay }}
          />
        ))}
      </g>

      {/* Janela do navegador */}
      <rect
        x="90.5"
        y="60.5"
        width="439"
        height="339"
        rx="14"
        fill="url(#hv-window)"
        stroke="rgb(148 163 184 / 0.22)"
      />
      <line x1="91" y1="96.5" x2="529" y2="96.5" stroke="rgb(148 163 184 / 0.12)" />
      <circle cx="112" cy="78.5" r="4" fill="rgb(148 163 184 / 0.25)" />
      <circle cx="126" cy="78.5" r="4" fill="rgb(148 163 184 / 0.25)" />
      <circle cx="140" cy="78.5" r="4" fill="rgb(148 163 184 / 0.25)" />
      <rect x="196" y="70" width="228" height="17" rx="8.5" fill="rgb(148 163 184 / 0.07)" />
      <rect x="208" y="76.5" width="72" height="4" rx="2" fill="rgb(148 163 184 / 0.3)" />

      {/* Conteúdo: título, texto e botões */}
      <rect x="122" y="124" width="56" height="5" rx="2.5" className="fill-accent-soft" opacity="0.8" />
      <rect x="122" y="142" width="236" height="13" rx="4" fill="rgb(233 237 245 / 0.85)" />
      <rect x="122" y="162" width="176" height="13" rx="4" fill="rgb(233 237 245 / 0.85)" />
      <rect x="122" y="190" width="214" height="5" rx="2.5" fill="rgb(148 163 184 / 0.35)" />
      <rect x="122" y="202" width="182" height="5" rx="2.5" fill="rgb(148 163 184 / 0.35)" />
      <rect x="122" y="226" width="84" height="24" rx="12" className="fill-accent" />
      <rect x="134" y="236" width="60" height="4" rx="2" fill="rgb(255 255 255 / 0.85)" />
      <rect x="214.5" y="226.5" width="70" height="23" rx="11.5" fill="none" stroke="rgb(148 163 184 / 0.35)" />

      {/* Bloco de imagem com hachura */}
      <rect x="388.5" y="120.5" width="109" height="130" rx="10" fill="url(#hv-hatch)" stroke="rgb(148 163 184 / 0.18)" />
      <circle cx="443" cy="185.5" r="12" fill="none" stroke="rgb(148 163 184 / 0.3)" />

      {/* Cards */}
      {[122, 252, 382].map((x, i) => (
        <g key={x}>
          <rect
            x={x + 0.5}
            y="276.5"
            width="115"
            height="95"
            rx="10"
            fill="rgb(148 163 184 / 0.03)"
            stroke="rgb(148 163 184 / 0.14)"
          />
          <rect x={x + 14} y="292" width="18" height="18" rx="5" fill="none" stroke={i === 0 ? "#6b95ff" : "rgb(148 163 184 / 0.35)"} />
          <rect x={x + 14} y="324" width="70" height="5" rx="2.5" fill="rgb(233 237 245 / 0.5)" />
          <rect x={x + 14} y="338" width="86" height="4" rx="2" fill="rgb(148 163 184 / 0.25)" />
          <rect x={x + 14} y="349" width="60" height="4" rx="2" fill="rgb(148 163 184 / 0.25)" />
        </g>
      ))}

      {/* Nós de conexão */}
      {NODES.map((n, i) => (
        <g key={`${n.cx}-${n.cy}`}>
          <circle cx={n.cx} cy={n.cy} r="6" className="node-halo fill-cyan" style={{ animationDelay: `${i * 0.7}s` }} />
          <circle cx={n.cx} cy={n.cy} r="3" fill="#070a12" className="stroke-cyan" strokeWidth="1.5" />
        </g>
      ))}

      {/* Rótulos técnicos */}
      <text x="8" y="166" className="fill-subtle font-mono" fontSize="10" letterSpacing="1">
        &lt;header /&gt;
      </text>
      <text x="536" y="122" className="fill-subtle font-mono" fontSize="10" letterSpacing="1">
        mobile
      </text>
    </svg>
  );
}
