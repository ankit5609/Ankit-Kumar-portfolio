/** Animated brand-logo diagram system. Inline diagrams stay on the home screen;
 * clicking any one opens a full-screen animated lightbox replay. */
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, RotateCw, X, ZoomIn } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { iconFor } from "@/lib/tech-icons";

type NodeVariant = "primary" | "secondary" | "accent" | "lime" | "surface" | "foreground";

export interface ErColumn {
  name: string;
  type: string;
  key?: "PK" | "FK";
  note?: string;
}
export interface DiagramNode {
  id: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  variant?: NodeVariant;
  /** Brand label: React, Spring Boot 3, PostgreSQL, Kafka, Stripe, etc. */
  icon?: string;
  /** When present, node is rendered as a UML entity table. */
  columns?: ErColumn[];
}
export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  bend?: number;
}
export interface DiagramGroup {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** Hex color for outline/label. */
  color?: string;
}
export interface DiagramSpec {
  title: string;
  caption?: string;
  width?: number;
  height?: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  legend?: { label: string; color: string }[];
  groups?: DiagramGroup[];
  /** Calm mode: mutes edge colors, drops the traveling dot + glow orbs. Use for dense diagrams (UML/ER). */
  calm?: boolean;
}

const variantStroke: Record<NodeVariant, string> = {
  primary: "#7c8cff",
  secondary: "#18d7a5",
  accent: "#ffb86b",
  lime: "#a3e635",
  surface: "#354064",
  foreground: "#e8ecff",
};

function nodeCenter(n: DiagramNode) {
  const w = n.w ?? 160;
  const h = n.h ?? 60;
  return { cx: n.x + w / 2, cy: n.y + h / 2, w, h };
}
function edgePath(from: DiagramNode, to: DiagramNode, bend = 0) {
  const a = nodeCenter(from);
  const b = nodeCenter(to);
  const mx = (a.cx + b.cx) / 2;
  const my = (a.cy + b.cy) / 2;
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const len = Math.max(Math.hypot(dx, dy), 1);
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * bend * 80;
  const cy = my + ny * bend * 80;
  return `M ${a.cx} ${a.cy} Q ${cx} ${cy} ${b.cx} ${b.cy}`;
}

function DiagramSvg({ spec, playKey = 0, className = "h-auto w-full" }: { spec: DiagramSpec; playKey?: number; className?: string }) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const markerId = `arr-${rawId}-${playKey}`;
  const gradId = `edge-${rawId}-${playKey}`;
  const w = spec.width ?? 900;
  const h = spec.height ?? 500;
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));

  return (
    <svg
      key={playKey}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      role="img"
      aria-label={spec.title}
    >
      <defs>
        <marker id={markerId} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0,0 L12,6 L0,12 z" fill={spec.calm ? "#5a6688" : "#18d7a5"} />
        </marker>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c8cff" />
          <stop offset="52%" stopColor="#18d7a5" />
          <stop offset="100%" stopColor="#ffb86b" />
        </linearGradient>
      </defs>

      <rect x={0} y={0} width={w} height={h} rx="24" fill={spec.calm ? "#0b1020" : "#060913"} />
      {!spec.calm && (
        <>
          <circle cx={w * 0.18} cy={h * 0.08} r={w * 0.28} fill="#8fb5ff" opacity="0.08" />
          <circle cx={w * 0.88} cy={h * 0.92} r={w * 0.34} fill="#2ef2bd" opacity="0.07" />
        </>
      )}

      {/* Groups (planes / namespaces) */}
      {spec.groups?.map((g, i) => {
        const color = g.color ?? "#7c8cff";
        return (
          <motion.g
            key={g.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 + i * 0.06, duration: 0.6 }}
          >
            <rect
              x={g.x}
              y={g.y}
              width={g.w}
              height={g.h}
              rx={20}
              fill={color}
              opacity={spec.calm ? 0.03 : 0.05}
            />
            <rect
              x={g.x}
              y={g.y}
              width={g.w}
              height={g.h}
              rx={20}
              fill="none"
              stroke={color}
              strokeOpacity={spec.calm ? 0.3 : 0.45}
              strokeWidth={1}
              strokeDasharray={spec.calm ? "3 5" : "6 6"}
            />
            <rect
              x={g.x + 16}
              y={g.y - 11}
              width={g.label.length * 7 + 22}
              height={20}
              rx={10}
              fill={spec.calm ? "#0b1020" : "#060913"}
              stroke={color}
              strokeOpacity={spec.calm ? 0.5 : 0.6}
              strokeWidth={1}
            />
            <text
              x={g.x + 27}
              y={g.y + 3}
              fontSize={10.5}
              fontFamily="Space Mono, monospace"
              fontWeight="700"
              letterSpacing="0.08em"
              fill={color}
              opacity={spec.calm ? 0.85 : 1}
            >
              {g.label.toUpperCase()}
            </text>
          </motion.g>
        );
      })}


      {/* Edges */}
      {spec.edges.map((e, i) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        const d = edgePath(a, b, e.bend ?? 0);
        const edgeStroke = spec.calm ? "#4a5680" : `url(#${gradId})`;
        return (
          <g key={i}>
            <motion.path
              d={d}
              fill="none"
              stroke={edgeStroke}
              strokeWidth={spec.calm ? 1.4 : 2.8}
              strokeLinecap="round"
              markerEnd={`url(#${markerId})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: spec.calm ? 0.75 : 1 }}
              transition={{ delay: 0.15 * spec.nodes.length + i * 0.04, duration: 0.7, ease: "easeOut" }}
            />
            {!spec.calm && (
              <motion.circle
                r="4"
                fill="#18d7a5"
                initial={{ cx: nodeCenter(a).cx, cy: nodeCenter(a).cy, opacity: 0 }}
                animate={{ cx: [nodeCenter(a).cx, nodeCenter(b).cx], cy: [nodeCenter(a).cy, nodeCenter(b).cy], opacity: [0, 1, 0] }}
                transition={{ delay: i * 0.2, duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            {e.label && (
              <motion.text
                x={(nodeCenter(a).cx + nodeCenter(b).cx) / 2}
                y={(nodeCenter(a).cy + nodeCenter(b).cy) / 2 - 8}
                textAnchor="middle"
                fontSize={spec.calm ? 10 : 11}
                fontFamily="Space Mono, monospace"
                fontWeight={spec.calm ? 500 : 700}
                fill={spec.calm ? "#b8c0d8" : "#e8ecff"}
                style={{ paintOrder: "stroke" }}
                stroke={spec.calm ? "#0b1020" : "#070a14"}
                strokeWidth={4}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 * spec.nodes.length + i * 0.04 + 0.3 }}
              >
                {e.label}
              </motion.text>
            )}
          </g>
        );
      })}



      {/* Nodes */}
      {spec.nodes.map((n, i) => {
        const nw = n.w ?? 160;
        const nh = n.h ?? 60;
        const v = n.variant ?? "surface";
        const { Icon, color } = iconFor(n.icon ?? n.label);
        const stroke = color || variantStroke[v];
        // UML entity table rendering
        if (n.columns && n.columns.length) {
          const calm = spec.calm;
          const headerH = 44;
          const rowH = 32;
          const totalH = headerH + n.columns.length * rowH;
          const headerFill = calm ? "#1a2138" : stroke;
          const headerOpacity = calm ? 1 : 0.22;
          const bodyFill = calm ? "#111729" : "rgba(9,13,28,0.96)";
          const borderColor = calm ? "#2a3454" : stroke;
          const titleColor = calm ? "#dfe4f2" : "#e8ecff";
          const pkColor = calm ? "#d4a15a" : "#ffb86b";
          const fkColor = calm ? "#6b7ab5" : "#7c8cff";
          const mutedKey = calm ? "#3a4262" : "#4a5578";
          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.3), duration: 0.35 }}
            >
              {/* body */}
              <rect x={n.x} y={n.y} width={nw} height={totalH} rx={8} fill={bodyFill} stroke={borderColor} strokeWidth={1} />
              {/* header bar */}
              <path
                d={`M ${n.x} ${n.y + headerH} L ${n.x} ${n.y + 8} Q ${n.x} ${n.y} ${n.x + 8} ${n.y} L ${n.x + nw - 8} ${n.y} Q ${n.x + nw} ${n.y} ${n.x + nw} ${n.y + 8} L ${n.x + nw} ${n.y + headerH} Z`}
                fill={headerFill}
                opacity={headerOpacity}
              />
              <line x1={n.x} y1={n.y + headerH} x2={n.x + nw} y2={n.y + headerH} stroke={borderColor} strokeWidth={1} />
              <text
                x={n.x + 18}
                y={n.y + headerH / 2 + 5}
                fontSize={16}
                fontWeight="700"
                fontFamily="Space Mono, monospace"
                fill={titleColor}
                letterSpacing="0.06em"
              >
                {n.label}
              </text>
              {/* columns */}
              {n.columns.map((c, ci) => {
                const rowY = n.y + headerH + ci * rowH;
                const keyColor = c.key === "PK" ? pkColor : c.key === "FK" ? fkColor : mutedKey;
                return (
                  <g key={ci}>
                    {ci > 0 && (
                      <line x1={n.x + 14} y1={rowY} x2={n.x + nw - 14} y2={rowY} stroke={borderColor} strokeOpacity={0.35} strokeWidth={0.6} />
                    )}
                    {/* key label */}
                    <text
                      x={n.x + 18}
                      y={rowY + rowH / 2 + 5}
                      fontSize={12}
                      fontWeight="700"
                      fontFamily="Space Mono, monospace"
                      fill={keyColor}
                      letterSpacing="0.05em"
                    >
                      {c.key ?? ""}
                    </text>
                    {/* name */}
                    <text
                      x={n.x + 58}
                      y={rowY + rowH / 2 + 5}
                      fontSize={14}
                      fontFamily="Space Mono, monospace"
                      fontWeight={c.key === "PK" ? 700 : 500}
                      fill={c.key === "PK" ? (calm ? "#e8d5b0" : "#ffe8c9") : titleColor}
                    >
                      {c.name}
                    </text>
                    {/* type */}
                    <text
                      x={n.x + nw - 16}
                      y={rowY + rowH / 2 + 5}
                      textAnchor="end"
                      fontSize={12}
                      fontFamily="Space Mono, monospace"
                      fill={calm ? "#7a83a0" : "#8b96bd"}
                    >
                      {c.type}
                    </text>
                  </g>
                );
              })}
            </motion.g>
          );
        }





        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.5, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 16 }}
            style={{ transformOrigin: `${n.x + nw / 2}px ${n.y + nh / 2}px` }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={nw}
              height={nh}
              rx={16}
              fill={stroke}
              opacity={0.18}
            />
            <rect x={n.x} y={n.y} width={nw} height={nh} rx={16} fill="rgba(9,13,28,0.92)" stroke={stroke} strokeWidth={1.5} />
            <rect x={n.x + 1} y={n.y + 1} width={nw - 2} height={nh / 2} rx={15} fill="rgba(255,255,255,0.05)" />
            <foreignObject x={n.x + 14} y={n.y + nh / 2 - 13} width="26" height="26">
              <div className="flex h-full w-full items-center justify-center" style={{ color: stroke }}>
                <Icon size={22} />
              </div>
            </foreignObject>
            <text
              x={n.x + 48}
              y={n.sub ? n.y + nh / 2 - 3 : n.y + nh / 2 + 5}
              textAnchor="start"
              fontSize={13}
              fontWeight="700"
              fontFamily="Space Mono, monospace"
              fill="#e8ecff"
            >
              {n.label}
            </text>
            {n.sub && (
              <text
                x={n.x + 48}
                y={n.y + nh / 2 + 13}
                textAnchor="start"
                fontSize={10}
                fontFamily="Space Mono, monospace"
                fill="#9ca8cf"
                opacity={0.8}
              >
                {n.sub}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

export function Diagram({ spec }: { spec: DiagramSpec }) {
  const [open, setOpen] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.figure
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 80 }}
        whileHover={{ y: -6, scale: 1.01 }}
        className="group relative flex flex-col overflow-hidden rounded-[24px] border border-border/70 bg-surface/82 shadow-[var(--shadow-card)]"
      >
        <figcaption className="flex items-center justify-between border-b border-border/60 bg-background/50 px-4 py-2.5">
          <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
            <span className="truncate">
            {spec.title}
            </span>
          </span>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold text-primary-glow transition hover:bg-primary hover:text-primary-foreground"
          >
            <Maximize2 className="h-3 w-3" /> Expand
          </button>
        </figcaption>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block cursor-zoom-in p-3 text-left sm:p-4"
          aria-label={`Open ${spec.title} fullscreen`}
        >
          <DiagramSvg spec={spec} playKey={playKey} />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4 opacity-0 transition group-hover:opacity-100">
            <div className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-primary-foreground">
              <ZoomIn className="h-3 w-3" /> Click to zoom
            </div>
          </div>
        </button>
        {spec.caption && (
          <div className="border-t border-border/60 bg-background/40 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
            {"//"} {spec.caption}
          </div>
        )}
        <button
          onClick={() => setPlayKey((k) => k + 1)}
          aria-label="Replay animation"
          className="absolute right-3 top-14 grid h-8 w-8 place-items-center rounded-full border border-border/60 bg-surface/90 opacity-0 transition hover:text-accent group-hover:opacity-100"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>
      </motion.figure>

      {mounted
        ? createPortal(
            <AnimatePresence>{open && <Lightbox spec={spec} onClose={() => setOpen(false)} />}</AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}

function Lightbox({ spec, onClose }: { spec: DiagramSpec; onClose: () => void }) {
  const [replayKey, setReplayKey] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-background/95 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.75, y: 60, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        className="relative max-h-[94vh] w-full max-w-[1500px] overflow-hidden rounded-[32px] border border-primary/40 bg-surface shadow-[0_0_0_1px_rgba(124,140,255,0.25),0_40px_120px_rgba(0,0,0,0.75)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/60 bg-background/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-primary px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-primary-foreground">
              /diagram
            </span>
            <span className="font-display text-base font-bold">{spec.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setReplayKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs font-bold text-accent transition hover:bg-accent hover:text-accent-foreground"
            >
              <RotateCw className="h-3.5 w-3.5" /> Replay
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 transition hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="max-h-[calc(95vh-140px)] overflow-auto p-6 sm:p-10">
          <motion.div
            key={replayKey}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <DiagramSvg spec={spec} playKey={replayKey} className="h-[68vh] min-h-[520px] w-full" />
          </motion.div>
        </div>
        {spec.caption && (
          <div className="border-t border-border/60 bg-primary/10 px-6 py-3 font-mono text-xs text-primary-glow">
            {"▸"} {spec.caption}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* Distributed CodeForge — architecture from the canonical Mermaid spec */
export const distributedArch: DiagramSpec = {
  title: "Distributed CodeForge · Microservices architecture",
  caption:
    "codeforge-core (Spring plane) is network-isolated from codeforge-previews (sandbox plane). Kafka drives async sagas; Redis fronts subdomain routing.",
  width: 1240, height: 820,
  groups: [
    { id: "g-core",     x: 40,  y: 260, w: 720, h: 340, label: "codeforge-core · Spring plane",   color: "#7c8cff" },
    { id: "g-previews", x: 790, y: 260, w: 410, h: 340, label: "codeforge-previews · sandboxes", color: "#18d7a5" },
    { id: "g-data",     x: 40,  y: 660, w: 1160, h: 130, label: "Stateful layer",                 color: "#ffb86b" },
  ],
  nodes: [
    // Entry column (centered)
    { id: "browser", x: 530, y: 30,  w: 180, h: 70, label: "Browser IDE",   sub: "React SPA · HTTPS/WSS",   variant: "surface",   icon: "React" },
    { id: "ingress", x: 530, y: 140, w: 180, h: 70, label: "NGINX Ingress", sub: "/api · /* · *.previews.*", variant: "secondary", icon: "NGINX" },

    // codeforge-core plane — 2 rows × 3 cols inside the group
    { id: "eureka",  x: 70,  y: 300, w: 190, h: 68, label: "Eureka",       sub: "discovery :8761",            variant: "lime",    icon: "Spring Cloud" },
    { id: "gateway", x: 290, y: 300, w: 200, h: 68, label: "API Gateway",  sub: "Spring Cloud · JWT filter",  variant: "primary", icon: "Spring Cloud" },
    { id: "config",  x: 520, y: 300, w: 210, h: 68, label: "Config Server",sub: "profiles :8888",             variant: "lime",    icon: "Spring Cloud" },
    { id: "account",   x: 70,  y: 480, w: 190, h: 78, label: "Account",     sub: ":9010 · Auth + Stripe",  variant: "primary", icon: "Spring Security" },
    { id: "workspace", x: 290, y: 480, w: 200, h: 78, label: "Workspace",   sub: ":9020 · Fabric8 K8s",    variant: "primary", icon: "Spring Boot 3" },
    { id: "intel",     x: 520, y: 480, w: 210, h: 78, label: "Intelligence",sub: ":9030 · Spring AI · SSE",variant: "primary", icon: "Spring AI" },

    // codeforge-previews plane
    { id: "proxy",   x: 815, y: 300, w: 360, h: 68, label: "Subdomain Proxy", sub: "codeforge-me-proxy :80",   variant: "secondary", icon: "NGINX" },
    { id: "runners", x: 815, y: 400, w: 360, h: 78, label: "Runner Pod Pool", sub: "npm run dev :5173 + syncer", variant: "secondary", icon: "Kubernetes" },
    { id: "openrouter", x: 815, y: 510, w: 360, h: 68, label: "OpenRouter", sub: "LLM gateway",             variant: "lime",      icon: "OpenAI" },

    // Stateful layer — 4-across grid inside the data band
    { id: "pg",    x: 70,  y: 690, w: 250, h: 78, label: "Postgres + pgvector", sub: "account · workspace · intel", variant: "accent", icon: "PostgreSQL + pgvector" },
    { id: "redis", x: 350, y: 690, w: 250, h: 78, label: "Redis",  sub: "subdomain routes · billing TTL",        variant: "accent", icon: "Redis" },
    { id: "kafka", x: 630, y: 690, w: 260, h: 78, label: "Kafka",  sub: "file-storage · notification events",    variant: "accent", icon: "Kafka" },
    { id: "minio", x: 920, y: 690, w: 260, h: 78, label: "MinIO",  sub: "file tree · attachments",               variant: "accent", icon: "MinIO" },
  ],
  edges: [
    // North → gateway
    { from: "browser", to: "ingress", label: "HTTPS / WSS" },
    { from: "ingress", to: "gateway", label: "/api" },
    { from: "ingress", to: "proxy",   label: "*.previews.*", bend: 0.35 },

    // Registry/config wiring (short, inside group)
    { from: "gateway", to: "eureka" },
    { from: "gateway", to: "config" },

    // Gateway fan-out to domain services (straight down)
    { from: "gateway", to: "account",   bend: -0.15 },
    { from: "gateway", to: "workspace" },
    { from: "gateway", to: "intel",     bend: 0.15 },

    // Persistence (services → data band)
    { from: "account",   to: "pg" },
    { from: "workspace", to: "redis" },
    { from: "workspace", to: "kafka", bend: 0.15 },
    { from: "intel",     to: "kafka", label: "FileStoreRequestEvent", bend: -0.15 },

    // Cross-plane control (single clean edge)
    { from: "workspace", to: "runners", label: "Fabric8", bend: -0.25 },

    // Previews plane internals
    { from: "proxy",   to: "runners",     label: "reverse-proxy WS" },
    { from: "proxy",   to: "redis",       label: "route lookup",  bend: 0.55 },
    { from: "runners", to: "minio",       label: "sync",          bend: -0.15 },
    { from: "intel",   to: "openrouter",  label: "chat / tool-calls", bend: 0.35 },
  ],
};

export const distributedPreview: DiagramSpec = {
  title: "Preview subdomain flow · pre-warm + WS reverse proxy",
  caption:
    "Wildcard *.previews.* hits the subdomain proxy, which resolves user→pod via Redis and reverse-proxies WS into the pre-warmed pool.",
  width: 1160, height: 380,
  groups: [
    { id: "edge",  x: 30,  y: 40,  w: 380, h: 300, label: "Edge",              color: "#18d7a5" },
    { id: "ctrl",  x: 440, y: 40,  w: 300, h: 300, label: "Routing control",   color: "#7c8cff" },
    { id: "pool",  x: 770, y: 40,  w: 360, h: 300, label: "Pre-warmed runners",color: "#a3e635" },
  ],
  nodes: [
    { id: "browser", x: 60,  y: 160, w: 180, h: 70, label: "Browser tab",   sub: "*.previews. host",  variant: "surface",   icon: "React" },
    { id: "ingress", x: 260, y: 160, w: 140, h: 70, label: "NGINX Ingress", sub: "wildcard match",    variant: "secondary", icon: "NGINX" },

    { id: "proxy",   x: 470, y: 160, w: 240, h: 70, label: "Subdomain Proxy", sub: "codeforge-me-proxy", variant: "primary", icon: "NGINX" },
    { id: "redis",   x: 470, y: 250, w: 240, h: 70, label: "Redis lookup",    sub: "host → pod IP",       variant: "accent",  icon: "Redis" },

    { id: "pool",    x: 800, y: 90,  w: 300, h: 70, label: "Runner Pod Pool", sub: "pre-warmed · LRU",  variant: "secondary", icon: "Kubernetes" },
    { id: "runner",  x: 800, y: 180, w: 300, h: 70, label: "Runner Pod",      sub: "npm run dev :5173", variant: "lime",      icon: "Docker" },
    { id: "minio",   x: 800, y: 270, w: 300, h: 60, label: "MinIO sync",      sub: "syncer sidecar",    variant: "accent",    icon: "MinIO" },
  ],
  edges: [
    { from: "browser", to: "ingress", label: "HTTPS / WSS" },
    { from: "ingress", to: "proxy" },
    { from: "proxy",   to: "redis",   label: "resolve" },
    { from: "redis",   to: "runner",  label: "IP hit" },
    { from: "proxy",   to: "pool",    label: "warm miss", bend: -0.25 },
    { from: "pool",    to: "runner",  label: "assign" },
    { from: "runner",  to: "minio",   label: "files" },
  ],
};

export const distributedRag: DiagramSpec = {
  title: "Agentic self-healing loop · Spring AI tool calling",
  caption:
    "Intelligence Service calls file/build tools, catches compile errors, retrieves similar past fixes from pgvector, and re-applies a patch.",
  width: 1160, height: 420,
  groups: [
    { id: "agent",   x: 30,  y: 40,  w: 380, h: 340, label: "Agent",     color: "#7c8cff" },
    { id: "tools",   x: 440, y: 40,  w: 320, h: 150, label: "Tools",     color: "#18d7a5" },
    { id: "memory",  x: 440, y: 220, w: 320, h: 160, label: "Memory",    color: "#ffb86b" },
    { id: "brain",   x: 790, y: 40,  w: 340, h: 340, label: "LLM + Patch", color: "#a3e635" },
  ],
  nodes: [
    { id: "user",   x: 60,  y: 180, w: 180, h: 70, label: "User prompt",   sub: "chat + SSE",         variant: "surface", icon: "React" },
    { id: "intel",  x: 250, y: 180, w: 150, h: 70, label: "Intelligence",  sub: "Spring AI agent",    variant: "primary", icon: "Spring AI" },

    { id: "tools",  x: 470, y: 80,  w: 130, h: 70, label: "Tools",         sub: "readFile · runBuild",variant: "secondary", icon: "Spring Boot 3" },
    { id: "runner", x: 620, y: 80,  w: 130, h: 70, label: "Runner build",  sub: "compile / exec",     variant: "lime",      icon: "Kubernetes" },

    { id: "vec",    x: 470, y: 260, w: 280, h: 70, label: "pgvector recall", sub: "prior error→fix diffs", variant: "accent", icon: "PostgreSQL + pgvector" },

    { id: "llm",    x: 820, y: 100, w: 280, h: 70, label: "OpenRouter LLM", sub: "few-shot context",   variant: "lime",      icon: "OpenAI" },
    { id: "patch",  x: 820, y: 270, w: 280, h: 70, label: "Patch",          sub: "diff → Workspace",   variant: "secondary", icon: "GitHub" },
  ],
  edges: [
    { from: "user",   to: "intel" },
    { from: "intel",  to: "tools",  label: "tool call", bend: -0.2 },
    { from: "tools",  to: "runner", label: "invoke" },
    { from: "runner", to: "intel",  label: "stderr",    bend: 0.55 },
    { from: "intel",  to: "vec",    label: "query",     bend: 0.2 },
    { from: "vec",    to: "llm",    label: "top-k",     bend: -0.25 },
    { from: "intel",  to: "llm",    bend: -0.4 },
    { from: "llm",    to: "patch",  label: "diff" },
    { from: "patch",  to: "intel",  label: "apply",     bend: 0.55 },
  ],
};

export const distributedK8s: DiagramSpec = {
  title: "GKE cluster · two network-isolated namespaces",
  caption:
    "codeforge-core holds the Spring plane; codeforge-previews holds untrusted sandbox pods. Egress policies restrict sandboxes to private IP scopes.",
  width: 1200, height: 560,
  groups: [
    { id: "ns-core",     x: 30,  y: 40,  w: 690, h: 490, label: "namespace · codeforge-core",     color: "#7c8cff" },
    { id: "ns-previews", x: 750, y: 40,  w: 420, h: 490, label: "namespace · codeforge-previews", color: "#18d7a5" },
  ],
  nodes: [
    // Core namespace
    { id: "gw2",    x: 60,  y: 90,  w: 190, h: 60, label: "API Gateway",  variant: "primary", icon: "Spring Cloud" },
    { id: "eur2",   x: 270, y: 90,  w: 190, h: 60, label: "Eureka",       variant: "lime",    icon: "Spring Cloud" },
    { id: "cfg2",   x: 480, y: 90,  w: 210, h: 60, label: "Config",       variant: "lime",    icon: "Spring Cloud" },
    { id: "acc2",   x: 60,  y: 190, w: 190, h: 60, label: "Account",      variant: "primary", icon: "Spring Security" },
    { id: "ws2",    x: 270, y: 190, w: 190, h: 60, label: "Workspace",    variant: "primary", icon: "Spring Boot 3" },
    { id: "int2",   x: 480, y: 190, w: 210, h: 60, label: "Intelligence", variant: "primary", icon: "Spring AI" },
    { id: "pg2",    x: 60,  y: 320, w: 190, h: 60, label: "Postgres",     variant: "accent",  icon: "PostgreSQL" },
    { id: "redis2", x: 270, y: 320, w: 190, h: 60, label: "Redis",        variant: "accent",  icon: "Redis" },
    { id: "kfk2",   x: 480, y: 320, w: 210, h: 60, label: "Kafka",        variant: "accent",  icon: "Kafka" },
    { id: "minio2", x: 270, y: 430, w: 190, h: 60, label: "MinIO",        variant: "accent",  icon: "MinIO" },

    // Previews namespace
    { id: "proxy2", x: 780, y: 90,  w: 170, h: 60, label: "Subdomain Proxy", variant: "secondary", icon: "NGINX" },
    { id: "pool2",  x: 970, y: 90,  w: 180, h: 60, label: "Pool controller", variant: "secondary", icon: "Kubernetes" },
    { id: "run-a",  x: 780, y: 210, w: 170, h: 60, label: "Runner A",        variant: "secondary", icon: "Kubernetes" },
    { id: "run-b",  x: 970, y: 210, w: 180, h: 60, label: "Runner B",        variant: "secondary", icon: "Kubernetes" },
    { id: "run-c",  x: 780, y: 320, w: 170, h: 60, label: "Runner C",        variant: "secondary", icon: "Kubernetes" },
    { id: "run-d",  x: 970, y: 320, w: 180, h: 60, label: "Runner D",        variant: "secondary", icon: "Kubernetes" },
  ],
  edges: [
    { from: "ws2",    to: "run-a", label: "Fabric8", bend: -0.15 },
    { from: "ws2",    to: "run-c", bend: 0.2 },
    { from: "proxy2", to: "redis2", label: "route", bend: 0.4 },
    { from: "proxy2", to: "run-a" },
    { from: "pool2",  to: "run-b" },
    { from: "pool2",  to: "run-d" },
  ],
  legend: [
    { label: "codeforge-core", color: "#7c8cff" },
    { label: "codeforge-previews", color: "#18d7a5" },
    { label: "stateful", color: "#ffb86b" },
  ],
};

/* Distributed CodeForge — data model split by database for readability */
export const distributedErAccount: DiagramSpec = {
  title: "account_db · UML",
  caption: "Users, plans, subscriptions and Stripe event de-dup log.",
  width: 1000, height: 540,
  calm: true,
  groups: [
    { id: "g", x: 15, y: 25, w: 980, h: 495, label: "account_db", color: "#7c8cff" },
  ],
  nodes: [
    {
      id: "users", x: 30, y: 60, w: 460, h: 300, label: "USERS",
      columns: [
        { name: "id",                              type: "bigint",    key: "PK" },
        { name: "username",                        type: "string" },
        { name: "password_hash",                   type: "string" },
        { name: "stripe_customer_id",              type: "string" },
        { name: "role",                            type: "string" },
        { name: "reset_password_token",            type: "string" },
        { name: "reset_password_token_expires_at", type: "timestamp" },
        { name: "created_at",                      type: "timestamp" },
      ],
    },
    {
      id: "stripe_events", x: 30, y: 390, w: 460, h: 108, label: "STRIPE_EVENTS",
      columns: [
        { name: "event_id",     type: "string", key: "PK" },
        { name: "processed_at", type: "timestamp" },
      ],
    },
    {
      id: "plans", x: 510, y: 60, w: 460, h: 172, label: "PLANS",
      columns: [
        { name: "id",                type: "bigint",  key: "PK" },
        { name: "name",              type: "string" },
        { name: "price",             type: "double" },
        { name: "token_limit_daily", type: "integer" },
      ],
    },
    {
      id: "subs", x: 510, y: 262, w: 460, h: 236, label: "SUBSCRIPTIONS",
      columns: [
        { name: "id",                     type: "bigint",    key: "PK" },
        { name: "user_id",                type: "bigint",    key: "FK" },
        { name: "plan_id",                type: "bigint",    key: "FK" },
        { name: "status",                 type: "string" },
        { name: "stripe_subscription_id", type: "string" },
        { name: "current_period_end",     type: "timestamp" },
      ],
    },
  ],
  edges: [
    { from: "users", to: "subs",  label: "1..N  has" },
    { from: "plans", to: "subs",  label: "1..N  defines" },
  ],
};

export const distributedErWorkspace: DiagramSpec = {
  title: "workspace_db · UML",
  caption: "Projects fan out into files, members and preview pods. Saga log de-dupes Kafka events.",
  width: 1140, height: 820,
  calm: true,
  groups: [
    { id: "g", x: 15, y: 25, w: 1110, h: 770, label: "workspace_db", color: "#5a9d8f" },
  ],
  nodes: [
    {
      id: "projects", x: 400, y: 60, w: 340, h: 268, label: "PROJECTS",
      columns: [
        { name: "id",            type: "bigint",    key: "PK" },
        { name: "name",          type: "string" },
        { name: "description",   type: "string" },
        { name: "git_url",       type: "string" },
        { name: "owner_id",      type: "bigint" },
        { name: "minio_bucket",  type: "string" },
        { name: "created_at",    type: "timestamp" },
      ],
    },
    {
      id: "files", x: 40, y: 380, w: 340, h: 236, label: "PROJECT_FILES",
      columns: [
        { name: "id",            type: "bigint",    key: "PK" },
        { name: "project_id",    type: "bigint",    key: "FK" },
        { name: "path",          type: "string" },
        { name: "size",          type: "integer" },
        { name: "content_type",  type: "string" },
        { name: "last_modified", type: "timestamp" },
      ],
    },
    {
      id: "members", x: 400, y: 380, w: 340, h: 204, label: "PROJECT_MEMBERS",
      columns: [
        { name: "id",         type: "bigint",    key: "PK" },
        { name: "project_id", type: "bigint",    key: "FK" },
        { name: "user_id",    type: "bigint",    key: "FK" },
        { name: "role",       type: "string" },
        { name: "joined_at",  type: "timestamp" },
      ],
    },
    {
      id: "previews", x: 760, y: 380, w: 340, h: 236, label: "PREVIEWS",
      columns: [
        { name: "id",           type: "bigint",    key: "PK" },
        { name: "project_id",   type: "bigint",    key: "FK" },
        { name: "pod_name",     type: "string" },
        { name: "endpoint_url", type: "string" },
        { name: "status",       type: "string" },
        { name: "updated_at",   type: "timestamp" },
      ],
    },
    {
      id: "processed", x: 400, y: 640, w: 340, h: 140, label: "PROCESSED_EVENTS",
      columns: [
        { name: "saga_id",      type: "string",    key: "PK" },
        { name: "status",       type: "string" },
        { name: "processed_at", type: "timestamp" },
      ],
    },
  ],
  edges: [
    { from: "projects", to: "files",    label: "1..N  contains",         bend: -0.25 },
    { from: "projects", to: "members",  label: "1..N  members" },
    { from: "projects", to: "previews", label: "1..N  deploys",          bend: 0.25 },
  ],
};

export const distributedErIntel: DiagramSpec = {
  title: "intelligence_db · UML  (+ pgvector)",
  caption: "Chat session/message/event chain, per-user token usage and the pgvector store.",
  width: 1000, height: 780,
  calm: true,
  groups: [
    { id: "g", x: 15, y: 25, w: 980, h: 735, label: "intelligence_db · pgvector", color: "#a1a860" },
  ],
  nodes: [
    {
      id: "sessions", x: 30, y: 60, w: 440, h: 204, label: "CHAT_SESSIONS",
      columns: [
        { name: "id",         type: "bigint",    key: "PK" },
        { name: "project_id", type: "bigint",    key: "FK" },
        { name: "user_id",    type: "bigint",    key: "FK" },
        { name: "title",      type: "string" },
        { name: "created_at", type: "timestamp" },
      ],
    },
    {
      id: "messages", x: 30, y: 290, w: 440, h: 204, label: "CHAT_MESSAGES",
      columns: [
        { name: "id",         type: "bigint",    key: "PK" },
        { name: "session_id", type: "bigint",    key: "FK" },
        { name: "role",       type: "string" },
        { name: "content",    type: "text" },
        { name: "created_at", type: "timestamp" },
      ],
    },
    {
      id: "events", x: 30, y: 520, w: 440, h: 204, label: "CHAT_EVENTS",
      columns: [
        { name: "id",           type: "bigint", key: "PK" },
        { name: "message_id",   type: "bigint", key: "FK" },
        { name: "type",         type: "string" },
        { name: "status",       type: "string" },
        { name: "details_json", type: "string" },
      ],
    },
    {
      id: "usage", x: 520, y: 60, w: 440, h: 172, label: "USAGE_LOGS",
      columns: [
        { name: "id",          type: "bigint",  key: "PK" },
        { name: "user_id",     type: "bigint",  key: "FK" },
        { name: "tokens_used", type: "integer" },
        { name: "log_date",    type: "date" },
      ],
    },
    {
      id: "vectors", x: 520, y: 260, w: 440, h: 172, label: "VECTOR_STORE",
      columns: [
        { name: "id",        type: "uuid",         key: "PK" },
        { name: "content",   type: "text" },
        { name: "metadata",  type: "jsonb" },
        { name: "embedding", type: "vector(1536)" },
      ],
    },
  ],
  edges: [
    { from: "sessions", to: "messages", label: "1..N  contains" },
    { from: "messages", to: "events",   label: "1..N  triggers" },
  ],
};








/* StayNest */
export const staynestArch: DiagramSpec = {
  title: "StayNest · System architecture",
  caption: "Layered Spring Boot service with JPA, Stripe & Cloudinary integrations, plus a Spring AI review chatbot.",
  width: 1000, height: 500,
  nodes: [
    { id: "client", x: 20, y: 220, label: "Client App", sub: "React", variant: "surface", icon: "React" },
    { id: "rest", x: 220, y: 80, label: "REST Controllers", variant: "secondary", icon: "Spring Boot 3" },
    { id: "jwt", x: 220, y: 220, label: "JWT Filter", variant: "secondary", icon: "JWT" },
    { id: "rl", x: 220, y: 360, label: "Rate Limiter", variant: "lime", icon: "Redis" },
    { id: "hotel", x: 440, y: 40, label: "Hotel", variant: "primary", icon: "Spring Boot 3" },
    { id: "booking", x: 440, y: 130, label: "Booking", variant: "primary", icon: "Spring Boot 3" },
    { id: "pricing", x: 440, y: 220, label: "Pricing", variant: "primary", icon: "Java 21" },
    { id: "review", x: 440, y: 310, label: "Review + AI", variant: "primary", icon: "Spring AI" },
    { id: "payment", x: 440, y: 400, label: "Payment", variant: "primary", icon: "Stripe" },
    { id: "jpa", x: 660, y: 130, label: "JPA Repos", variant: "secondary", icon: "Hibernate" },
    { id: "stripe", x: 660, y: 260, label: "Stripe", variant: "accent", icon: "Stripe" },
    { id: "cloud", x: 660, y: 380, label: "Cloudinary", variant: "accent", icon: "Cloudinary" },
    { id: "db", x: 870, y: 220, label: "PostgreSQL", sub: "+pgvector", variant: "accent", icon: "PostgreSQL + pgvector" },
  ],
  edges: [
    { from: "client", to: "rest" },
    { from: "client", to: "jwt" },
    { from: "client", to: "rl" },
    { from: "rest", to: "hotel" },
    { from: "rest", to: "booking" },
    { from: "rest", to: "pricing" },
    { from: "rest", to: "review" },
    { from: "rest", to: "payment" },
    { from: "hotel", to: "jpa" },
    { from: "booking", to: "jpa" },
    { from: "review", to: "jpa" },
    { from: "payment", to: "stripe" },
    { from: "review", to: "cloud" },
    { from: "jpa", to: "db" },
    { from: "stripe", to: "db", bend: 0.2 },
  ],
};

export const staynestBooking: DiagramSpec = {
  title: "StayNest · Booking flow",
  caption: "Pessimistic locks prevent double-booking; Stripe webhook handler is idempotent on stripe_id.",
  width: 1000, height: 300,
  nodes: [
    { id: "search", x: 20, y: 120, label: "Search hotels", variant: "surface", icon: "PostgreSQL" },
    { id: "select", x: 190, y: 120, label: "Select room", variant: "secondary", icon: "React" },
    { id: "avail", x: 360, y: 120, label: "Check avail", variant: "primary", icon: "Spring Boot 3" },
    { id: "lock", x: 530, y: 120, label: "Lock inventory", sub: "pessimistic", variant: "secondary", icon: "PostgreSQL" },
    { id: "stripe", x: 720, y: 40, label: "Stripe Checkout", variant: "accent", icon: "Stripe" },
    { id: "hook", x: 720, y: 200, label: "Stripe Webhook", sub: "idempotent", variant: "accent", icon: "Stripe" },
    { id: "ok", x: 900, y: 120, label: "Confirmed", variant: "lime", icon: "Spring Boot 3" },
  ],
  edges: [
    { from: "search", to: "select" },
    { from: "select", to: "avail" },
    { from: "avail", to: "lock" },
    { from: "lock", to: "stripe", bend: 0.3 },
    { from: "stripe", to: "hook" },
    { from: "hook", to: "ok", bend: -0.3 },
  ],
};

export const staynestPricing: DiagramSpec = {
  title: "StayNest · Layered pricing (decorator chain)",
  caption:
    "PricingCalculator wraps a BasePriceStrategy in Occupancy, Holiday and Surge decorators; a Spring AI advisor injects a demand-based adjustment before the final quote.",
  width: 1200, height: 340,
  nodes: [
    { id: "base",   x: 30,  y: 170, w: 180, h: 72, label: "Base Price",       sub: "room nightly rate",   variant: "surface",   icon: "Java 21" },
    { id: "occ",    x: 240, y: 170, w: 200, h: 72, label: "Occupancy ×",      sub: "guests / capacity",   variant: "secondary", icon: "Spring Boot 3" },
    { id: "holiday",x: 470, y: 170, w: 200, h: 72, label: "Holiday ×",        sub: "calendar rules",      variant: "primary",   icon: "Spring Boot 3" },
    { id: "surge",  x: 700, y: 170, w: 200, h: 72, label: "Surge ×",          sub: "demand / lead-time",  variant: "accent",    icon: "Spring Boot 3" },
    { id: "ai",     x: 700, y: 50,  w: 200, h: 68, label: "AI Adjustment",    sub: "Spring AI advisor",   variant: "lime",      icon: "Spring AI" },
    { id: "final",  x: 930, y: 170, w: 220, h: 72, label: "Final Price",      sub: "persisted quote",     variant: "lime",      icon: "PostgreSQL" },
  ],
  edges: [
    { from: "base",    to: "occ" },
    { from: "occ",     to: "holiday" },
    { from: "holiday", to: "surge" },
    { from: "surge",   to: "final" },
    { from: "ai",      to: "surge", label: "±%" },
  ],
};


export const staynestReview: DiagramSpec = {
  title: "StayNest · Review Q&A (RAG)",
  caption: "Semantic review search with an LLM-grounded answer, plus a fallback path when the model is unavailable.",
  width: 1000, height: 280,
  nodes: [
    { id: "q", x: 20, y: 110, label: "Guest question", variant: "surface", icon: "React" },
    { id: "svc", x: 210, y: 110, label: "Review Service", variant: "primary", icon: "Spring AI" },
    { id: "vec", x: 410, y: 30, label: "pgvector · reviews", variant: "accent", icon: "PostgreSQL + pgvector" },
    { id: "llm", x: 410, y: 190, label: "Spring AI · OpenAI", variant: "lime", icon: "OpenAI" },
    { id: "ans", x: 620, y: 110, label: "Grounded answer", variant: "secondary", icon: "Spring AI" },
    { id: "ui", x: 830, y: 110, label: "Chat UI", variant: "secondary", icon: "React" },
  ],
  edges: [
    { from: "q", to: "svc" },
    { from: "svc", to: "vec", bend: 0.3 },
    { from: "svc", to: "llm", bend: -0.3 },
    { from: "vec", to: "ans", bend: 0.3 },
    { from: "llm", to: "ans", bend: -0.3 },
    { from: "ans", to: "ui" },
  ],
};

export const staynestEr: DiagramSpec = {
  title: "StayNest · ERD",
  width: 1000, height: 440,
  nodes: [
    { id: "user", x: 30, y: 40, label: "USER", sub: "host / guest", variant: "secondary", icon: "Spring Security" },
    { id: "hotel", x: 260, y: 40, label: "HOTEL", sub: "manager_id", variant: "primary", icon: "PostgreSQL" },
    { id: "room", x: 260, y: 150, label: "ROOM", sub: "hotel_id", variant: "primary", icon: "PostgreSQL" },
    { id: "inv", x: 260, y: 260, label: "INVENTORY", sub: "room · date", variant: "lime", icon: "PostgreSQL" },
    { id: "booking", x: 500, y: 40, label: "BOOKING", sub: "guest · room", variant: "primary", icon: "PostgreSQL" },
    { id: "payment", x: 500, y: 260, label: "PAYMENT", sub: "stripe_id", variant: "accent", icon: "Stripe" },
    { id: "review", x: 740, y: 40, label: "REVIEW", sub: "booking · rating", variant: "accent", icon: "Spring AI" },
    { id: "embed", x: 740, y: 260, label: "EMBEDDING", sub: "pgvector", variant: "lime", icon: "PostgreSQL + pgvector" },
  ],
  edges: [
    { from: "user", to: "hotel", label: "manages" },
    { from: "hotel", to: "room" },
    { from: "room", to: "inv" },
    { from: "user", to: "booking", label: "guest" },
    { from: "room", to: "booking" },
    { from: "booking", to: "payment" },
    { from: "booking", to: "review" },
    { from: "review", to: "embed" },
  ],
};
