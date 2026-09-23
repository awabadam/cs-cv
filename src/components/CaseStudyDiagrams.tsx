/**
 * Editorial schematics for the case studies — drawn like newspaper figures:
 * hairline strokes, small caps, and no colour the ink doesn't already own.
 * Server-safe: plain SVG, no state, sized by viewBox and scaled by CSS.
 */

const SC = "var(--f-sc)";
const INK = "var(--ink)";
const FAINT = "var(--ink-lighter)";
const PAPER = "var(--paper-page)";

function Box({
  cx,
  cy,
  w = 168,
  h = 46,
  title,
  sub,
  dashed = false,
}: {
  cx: number;
  cy: number;
  w?: number;
  h?: number;
  title: string;
  sub?: string;
  dashed?: boolean;
}) {
  return (
    <g>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        fill={PAPER}
        stroke={INK}
        strokeWidth="0.9"
        strokeDasharray={dashed ? "3 3" : undefined}
      />
      <text
        x={cx}
        y={sub ? cy - 4 : cy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily={SC}
        fontSize="13"
        letterSpacing="1"
        fill={INK}
      >
        {title}
      </text>
      {sub && (
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily={SC}
          fontSize="9.5"
          letterSpacing="1.4"
          fill={FAINT}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 8 8"
        refX="6.5"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0.5,0.5 L7,4 L0.5,7.5" fill="none" stroke={INK} strokeWidth="1" />
      </marker>
    </defs>
  );
}

/* ── I · Saphire Dent: one clinic, five products ── */
function SaphireDentMap() {
  const nodes: [number, number, string, string][] = [
    [360, 52, "saphiredent.com", "flagship · 8 languages"],
    [612, 150, "patient app", "Expo · React Native"],
    [585, 348, "patient portal", "BFF over Odoo · TOTP"],
    [135, 348, "Saphire Intelligence", "sales-call coaching"],
    [108, 150, "open-day system", "print collateral"],
  ];
  return (
    <svg viewBox="0 0 720 430" role="img" aria-label="Diagram: five products arranged around one clinic">
      <title>The Saphire Dent ecosystem</title>
      {nodes.map(([x, y]) => (
        <line key={`${x}-${y}`} x1="360" y1="215" x2={x} y2={y} stroke={INK} strokeWidth="0.75" />
      ))}
      <line x1="360" y1="215" x2="628" y2="252" stroke={INK} strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="360" cy="215" r="74" fill={PAPER} stroke={INK} strokeWidth="1.1" />
      <circle cx="360" cy="215" r="68" fill="none" stroke={INK} strokeWidth="0.4" />
      <text x="360" y="210" textAnchor="middle" fontFamily={SC} fontSize="15" letterSpacing="1.4" fill={INK}>
        Saphire Dent
      </text>
      <text x="360" y="228" textAnchor="middle" fontFamily={SC} fontSize="9.5" letterSpacing="1.6" fill={FAINT}>
        one clinic · Istanbul
      </text>
      {nodes.map(([x, y, title, sub]) => (
        <Box key={title} cx={x} cy={y} title={title} sub={sub} />
      ))}
      <Box cx={628} cy={252} w={130} h={38} title="Odoo CRM" dashed />
    </svg>
  );
}

/* ── II · Saphire Intelligence: the pipeline ── */
function IntelligencePipeline() {
  const m = "cs-arrow-si";
  const arrow = (x1: number, y1: number, x2: number, y2: number, dashed = false) => (
    <line
      key={`${x1}${y1}${x2}${y2}`}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={INK}
      strokeWidth="0.85"
      strokeDasharray={dashed ? "3 3" : undefined}
      markerEnd={dashed ? undefined : `url(#${m})`}
    />
  );
  return (
    <svg viewBox="0 0 760 336" role="img" aria-label="Diagram: calls and WhatsApp threads flow through a queued pipeline into margin coaching">
      <title>The Saphire Intelligence pipeline</title>
      <ArrowDefs id={m} />
      {arrow(156, 62, 200, 94)}
      {arrow(156, 134, 200, 110)}
      {arrow(324, 102, 372, 102)}
      {arrow(490, 102, 538, 102)}
      {arrow(578, 128, 356, 186)}
      {arrow(590, 128, 490, 186)}
      {arrow(602, 128, 622, 186)}
      {arrow(262, 128, 130, 186, true)}
      {arrow(342, 234, 384, 268)}
      {arrow(487, 234, 425, 268)}
      {arrow(625, 234, 466, 270)}
      <Box cx={86} cy={62} w={140} h={44} title="calls" sub="clinic dialer" />
      <Box cx={86} cy={134} w={140} h={44} title="WhatsApp" sub="exported threads" />
      <Box cx={262} cy={102} w={124} h={52} title="ingest" sub="HMAC-signed" />
      <Box cx={431} cy={102} w={118} h={52} title="job queue" sub="retryable stages" />
      <Box cx={590} cy={102} w={104} h={52} title="worker" />
      <Box cx={116} cy={212} w={200} h={44} title="object storage" sub="audio · presigned URLs" dashed />
      <Box cx={342} cy={212} w={124} h={44} title="transcribe" />
      <Box cx={487} cy={212} w={118} h={44} title="translate" />
      <Box cx={625} cy={212} w={110} h={44} title="analyse" />
      <Box cx={425} cy={294} w={300} h={48} title="coaching in the margin" sub="anchored to transcript turns" />
    </svg>
  );
}

/* ── III · Vuedent: security as concentric walls ── */
function VuedentLayers() {
  const m = "cs-arrow-vd";
  const label = (x: number, y: number, title: string, sub: string) => (
    <>
      <text x={x} y={y} fontFamily={SC} fontSize="13" letterSpacing="1.2" fill={INK}>
        {title}
      </text>
      <text x={x} y={y + 14} fontFamily={SC} fontSize="9.5" letterSpacing="1.4" fill={FAINT}>
        {sub}
      </text>
    </>
  );
  return (
    <svg viewBox="0 0 720 330" role="img" aria-label="Diagram: a request passes through the tenant wall and encryption before every read lands in the audit trail">
      <title>Vuedent's security layers</title>
      <ArrowDefs id={m} />
      <rect x="36" y="26" width="648" height="280" fill="none" stroke={INK} strokeWidth="0.9" />
      <rect x="116" y="88" width="488" height="192" fill="none" stroke={INK} strokeWidth="0.9" />
      <rect x="196" y="150" width="328" height="104" fill="none" stroke={INK} strokeWidth="0.9" />
      {label(52, 52, "the request", "authenticated session")}
      {label(132, 114, "the tenant wall", "isolation at the data layer")}
      {label(212, 176, "patient records", "AES-256-GCM at rest")}
      <line x1="8" y1="216" x2="242" y2="216" stroke={INK} strokeWidth="0.85" markerEnd={`url(#${m})`} />
      <rect x="246" y="196" width="228" height="40" fill={INK} />
      <text
        x="360"
        y="217"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily={SC}
        fontSize="11.5"
        letterSpacing="1.6"
        fill={PAPER}
      >
        every PHI read → audit trail
      </text>
    </svg>
  );
}

/* ── VI · awab.design: the constellation ── */
function AwabConstellation() {
  const sats: [number, number, string, string][] = [
    [150, 84, "emlak.awab.design", "real-estate listings"],
    [570, 84, "gym.awab.design", "training PWA"],
    [150, 316, "quran.awab.design", "offline Quran reader"],
    [570, 316, "cv.awab.design", "this document"],
  ];
  return (
    <svg viewBox="0 0 720 400" role="img" aria-label="Diagram: four production subdomains orbiting awab.design">
      <title>The awab.design constellation</title>
      <ellipse cx="360" cy="200" rx="272" ry="152" fill="none" stroke={INK} strokeWidth="0.5" strokeDasharray="2 4" />
      {sats.map(([x, y]) => (
        <line key={`${x}-${y}`} x1="360" y1="200" x2={x} y2={y} stroke={INK} strokeWidth="0.75" />
      ))}
      <circle cx="360" cy="200" r="72" fill={PAPER} stroke={INK} strokeWidth="1.1" />
      <circle cx="360" cy="200" r="66" fill="none" stroke={INK} strokeWidth="0.4" />
      <text x="360" y="196" textAnchor="middle" fontFamily={SC} fontSize="15" letterSpacing="1.2" fill={INK}>
        awab.design
      </text>
      <text x="360" y="214" textAnchor="middle" fontFamily={SC} fontSize="9.5" letterSpacing="1.6" fill={FAINT}>
        studio platform · 4 locales
      </text>
      {sats.map(([x, y, title, sub]) => (
        <Box key={title} cx={x} cy={y} w={176} title={title} sub={sub} />
      ))}
    </svg>
  );
}

export default function CaseStudyDiagram({ slug }: { slug: string }) {
  switch (slug) {
    case "saphire-dent":
      return <SaphireDentMap />;
    case "saphire-intelligence":
      return <IntelligencePipeline />;
    case "vuedent":
      return <VuedentLayers />;
    case "awab-design":
      return <AwabConstellation />;
    default:
      return null;
  }
}
