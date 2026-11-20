/**
 * Pequenas ilustrações dos diferenciais, no mesmo vocabulário visual do Hero
 * (wireframes + trilhas). Puramente decorativas; nenhuma traz números ou
 * métricas.
 */

const LINE = "rgb(148 163 184 / 0.22)";
const SOFT = "rgb(148 163 184 / 0.12)";
const FILL = "rgb(148 163 184 / 0.06)";

/** O mesmo layout se reorganizando em desktop, tablet e celular. */
export function ResponsiveVisual({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 240" className={className} aria-hidden focusable="false">
      {/* Trilha conectando os dispositivos */}
      <path d="M150 214H262M330 214H372" stroke={LINE} fill="none" />
      <path
        d="M150 214H372"
        pathLength={100}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="trace-pulse stroke-cyan"
      />

      {/* Desktop */}
      <rect x="8.5" y="20.5" width="240" height="160" rx="10" fill="#0b101b" stroke={LINE} />
      <line x1="9" y1="40.5" x2="248" y2="40.5" stroke={SOFT} />
      <rect x="26" y="56" width="120" height="8" rx="3" fill="rgb(233 237 245 / 0.7)" />
      <rect x="26" y="70" width="84" height="4" rx="2" fill={LINE} />
      {[26, 98, 170].map((x) => (
        <rect key={x} x={x + 0.5} y="94.5" width="62" height="66" rx="6" fill={FILL} stroke={SOFT} />
      ))}
      <path d="M128 181V214H150" stroke={LINE} fill="none" />
      <circle cx="150" cy="214" r="3" fill="#070a12" className="stroke-cyan" strokeWidth="1.5" />

      {/* Tablet */}
      <rect x="226.5" y="64.5" width="120" height="160" rx="10" fill="#0b101b" stroke={LINE} />
      <rect x="240" y="82" width="70" height="7" rx="3" fill="rgb(233 237 245 / 0.7)" />
      <rect x="240" y="95" width="50" height="4" rx="2" fill={LINE} />
      {[240, 288].map((x) => (
        <rect key={x} x={x + 0.5} y="112.5" width="43" height="48" rx="5" fill={FILL} stroke={SOFT} />
      ))}
      <rect x="240.5" y="168.5" width="91" height="40" rx="5" fill={FILL} stroke={SOFT} />

      {/* Celular */}
      <rect x="330.5" y="100.5" width="76" height="134" rx="12" className="fill-surface-2" stroke="rgb(107 149 255 / 0.55)" />
      <rect x="358" y="107" width="20" height="3" rx="1.5" fill={LINE} />
      <rect x="342" y="120" width="44" height="6" rx="3" fill="rgb(233 237 245 / 0.8)" />
      <rect x="342" y="131" width="32" height="3" rx="1.5" fill={LINE} />
      {[142, 168, 194].map((y) => (
        <rect key={y} x="342.5" y={y + 0.5} width="52" height="20" rx="4" fill={FILL} stroke={SOFT} />
      ))}
      <rect x="342" y="220" width="52" height="8" rx="4" className="fill-accent" />
    </svg>
  );
}

/** Carregamento enxuto: recursos em cascata terminando cedo. */
export function PerformanceVisual({ className }: { className?: string }) {
  const bars = [
    { x: 0, w: 92 },
    { x: 26, w: 70 },
    { x: 48, w: 54 },
    { x: 60, w: 38 },
    { x: 70, w: 30 },
  ];
  return (
    <svg viewBox="0 0 260 120" className={className} aria-hidden focusable="false">
      {[0, 65, 130, 195, 259].map((x) => (
        <line key={x} x1={x + 0.5} y1="0" x2={x + 0.5} y2="120" stroke={SOFT} strokeDasharray="2 4" />
      ))}
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={10 + i * 20}
          width={b.w}
          height="8"
          rx="4"
          fill={i === 0 ? "#2e62f5" : "rgb(107 149 255 / 0.35)"}
        />
      ))}
      <path d="M100 14H150a6 6 0 0 1 6 6V94a6 6 0 0 0 6 6H200" stroke={LINE} fill="none" />
      <circle cx="200" cy="100" r="7" className="node-halo fill-cyan" />
      <circle cx="200" cy="100" r="3.5" fill="#070a12" className="stroke-cyan" strokeWidth="1.5" />
    </svg>
  );
}

/** Rede de nós conectados: atendimento remoto, sem fronteiras. */
export function RemoteVisual({ className }: { className?: string }) {
  const nodes = [
    { x: 20, y: 60 },
    { x: 110, y: 28 },
    { x: 200, y: 76 },
    { x: 290, y: 36 },
    { x: 380, y: 68 },
  ];
  const d = nodes
    .map((n, i) => {
      if (i === 0) return `M${n.x} ${n.y}`;
      const prev = nodes[i - 1];
      const mid = (prev.x + n.x) / 2;
      return `H${mid}V${n.y}H${n.x}`;
    })
    .join("");

  return (
    <svg viewBox="0 0 400 100" className={className} aria-hidden focusable="false">
      <path d={d} stroke={LINE} fill="none" />
      <path d={d} pathLength={100} fill="none" strokeWidth="1.5" strokeLinecap="round" className="trace-pulse stroke-cyan" />
      {nodes.map((n, i) => (
        <g key={n.x}>
          <circle cx={n.x} cy={n.y} r="8" className="node-halo fill-cyan" style={{ animationDelay: `${i * 0.6}s` }} />
          <circle cx={n.x} cy={n.y} r="4" fill="#070a12" className="stroke-cyan" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}
