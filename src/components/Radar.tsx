/** Decorative radar: concentric rings, a slow sweep, a few contacts. Hidden from assistive tech. */
export function Radar({ className = "" }: { className?: string }) {
  const rings = [60, 120, 180, 240];
  const contacts = [
    { x: 300 + 92, y: 300 - 48, tone: "var(--ok)" },
    { x: 300 - 140, y: 300 + 64, tone: "var(--ok)" },
    { x: 300 + 30, y: 300 + 158, tone: "var(--warn)" },
    { x: 300 + 176, y: 300 + 96, tone: "var(--ember)" },
  ];
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="radar-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.10" />
          <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="radar-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--ember)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--ember)" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="260" fill="url(#radar-fade)" />
      {rings.map((r) => (
        <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      ))}
      <line x1="40" y1="300" x2="560" y2="300" stroke="var(--line)" strokeWidth="1" />
      <line x1="300" y1="40" x2="300" y2="560" stroke="var(--line)" strokeWidth="1" />
      <g className="animate-sweep" style={{ transformOrigin: "300px 300px", animation: "sweep 9s linear infinite" }}>
        <path d="M300 300 L540 300 A240 240 0 0 0 507.8 180 Z" fill="url(#radar-beam)" />
      </g>
      {contacts.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="9" fill={c.tone} opacity="0.15" />
          <circle cx={c.x} cy={c.y} r="3.5" fill={c.tone} />
        </g>
      ))}
    </svg>
  );
}
