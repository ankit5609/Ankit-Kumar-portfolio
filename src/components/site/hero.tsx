import { motion } from "framer-motion";
import { useRef } from "react";

import { ArrowRight, Download, Terminal } from "lucide-react";
import { SiSpringboot, SiKubernetes, SiPostgresql, SiApachekafka, SiRedis, SiDocker, SiTypescript, SiReact, SiStripe } from "react-icons/si";
import { SiOpenai } from "@/lib/tech-icons";
import { FaJava } from "react-icons/fa";
import { site } from "@/lib/site";

const tickerIcons = [
  { Icon: FaJava, name: "Java 21", color: "#f89820" },
  { Icon: SiSpringboot, name: "Spring Boot", color: "#6db33f" },
  { Icon: SiKubernetes, name: "Kubernetes", color: "#326ce5" },
  { Icon: SiPostgresql, name: "PostgreSQL", color: "#4169e1" },
  { Icon: SiApachekafka, name: "Kafka", color: "#e8e8ff" },
  { Icon: SiRedis, name: "Redis", color: "#dc382d" },
  { Icon: SiDocker, name: "Docker", color: "#2496ed" },
  { Icon: SiOpenai, name: "OpenAI", color: "#10a37f" },
  { Icon: SiStripe, name: "Stripe", color: "#635bff" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
  { Icon: SiReact, name: "React", color: "#61dafb" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate overflow-hidden border-b border-border/70 pt-32 pb-36 sm:pt-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(124,140,255,0.10),transparent_32%,rgba(24,215,165,0.10)_62%,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-8">

        <div className="flex flex-col justify-center">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Open to Java backend / full-stack SDE roles · 2026
          </motion.div>

          {/* Name + role stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex items-center gap-3"
          >
            <span className="h-10 w-1 rounded-full bg-gradient-to-b from-primary via-accent to-lime" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Ankit Kumar · MCA @ NIT Jamshedpur · LeetCode 1739 (top 11%)
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-[76px]"
          >
            I build{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-accent to-lime bg-clip-text text-transparent">
                distributed Java
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-primary via-accent to-lime"
              />
            </span>{" "}
            backends that stay boringly reliable at scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="prose-lead mt-6"
          >
            <span className="text-foreground font-semibold">Spring Cloud · Kubernetes (GKE) · Postgres + pgvector · Kafka · Spring AI.</span>{" "}
            I design 6-service control planes, self-correcting agentic AI loops
            with <span className="text-foreground font-semibold">RAG</span>,{" "}
            <span className="text-foreground font-semibold">pgvector embeddings</span>{" "}
            and pre-warmed sandbox pools — cutting cold starts from{" "}
            <span className="text-accent font-semibold">15s → &lt;1.5s</span> and
            keeping p99 flat under production load.
          </motion.p>



          {/* Signature stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex max-w-2xl divide-x divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-surface/70"
          >
            {[
              { v: "6", l: "Spring Cloud services", accent: "text-primary-glow" },
              { v: "~90%", l: "cold-start cut · GKE", accent: "text-accent" },
              { v: "1150+", l: "DSA · LC 1739", accent: "text-lime" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                whileHover={{ y: -3 }}
                className="flex-1 px-4 py-3.5"
              >
                <div className={`font-display text-2xl font-bold sm:text-[26px] ${s.accent}`}>{s.v}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Download className="h-4 w-4" /> Grab resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/75 px-5 py-3 font-mono text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Open project lab <ArrowRight className="h-4 w-4" />
            </motion.a>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-xs text-muted-foreground underline decoration-dotted underline-offset-4 hover:text-accent"
            >
              {site.email}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 90 }}
          className="relative flex min-h-[560px] items-center justify-center"
        >
          {/* Ambient glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,140,255,0.22),transparent_65%)] blur-2xl" />
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,242,189,0.18),transparent_60%)] blur-xl" />
          </div>

          {/* Orbital system */}
          <div className="relative aspect-square w-full max-w-[560px]">
            {/* Rings */}
            {[0.42, 0.66, 0.9].map((scale, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-full border border-dashed border-border/60"
                style={{ transform: `scale(${scale})` }}
              />
            ))}

            {/* Rotating orbit groups */}
            {[
              { r: 0.21, dur: 60, dir: 1, items: [SiSpringboot, FaJava, SiKubernetes] },
              { r: 0.33, dur: 90, dir: -1, items: [SiPostgresql, SiApachekafka, SiRedis, SiDocker] },
              { r: 0.45, dur: 120, dir: 1, items: [SiReact, SiTypescript, SiStripe, SiOpenai] },
            ].map((orbit, oi) => (
              <motion.div
                key={oi}
                className="absolute inset-0"
                style={{ willChange: "transform" }}
                animate={{ rotate: 360 * orbit.dir }}
                transition={{ duration: orbit.dur, repeat: Infinity, ease: "linear" }}
              >
                {orbit.items.map((Icon, idx) => {
                  const angle = (idx / orbit.items.length) * Math.PI * 2;
                  const x = (50 + Math.cos(angle) * orbit.r * 100).toFixed(2);
                  const y = (50 + Math.sin(angle) * orbit.r * 100).toFixed(2);
                  const meta = tickerIcons.find((t) => t.Icon === Icon);

                  return (
                    <div
                      key={idx}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <div className="group grid h-11 w-11 place-items-center rounded-2xl border border-border/70 bg-surface shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: meta?.color }} />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ))}


            {/* Center core */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 180 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ boxShadow: [
                  "0 0 0 0 rgba(46,242,189,0.45)",
                  "0 0 0 24px rgba(46,242,189,0)",
                ] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                className="relative grid h-[132px] w-[132px] place-items-center rounded-full border border-accent/40 bg-background/90"
              >
                <div className="text-center">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-accent">MCA · NIT JSR</div>
                  <div className="mt-1 font-display text-xl font-bold leading-none">Ankit Kumar</div>
                  <div className="mt-1 font-mono text-[9px] text-muted-foreground">backend / full-stack</div>
                </div>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="pointer-events-none absolute -inset-1 rounded-full border border-dashed border-accent/30"
                />
              </motion.div>
            </motion.div>

            {/* Floating real-data cards */}
            <motion.a
              href={site.socials.leetcode}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="absolute left-0 top-6 rounded-2xl border border-border/70 bg-surface/90 p-3 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">LeetCode</span>
              </div>
              <div className="mt-1 font-display text-xl font-bold text-primary-glow">1739<span className="ml-1 text-[10px] font-mono text-muted-foreground">rating</span></div>
              <div className="font-mono text-[9px] text-accent">top 11.04% · 448 solved</div>
            </motion.a>

            <motion.a
              href={site.socials.gfg}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ delay: 1.35, type: "spring" }}
              className="absolute right-0 top-16 rounded-2xl border border-border/70 bg-surface/90 p-3 shadow-[var(--shadow-card)]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">GeeksforGeeks</div>
              <div className="mt-1 flex items-end gap-2">
                <span className="font-display text-xl font-bold">1262</span>
                <span className="font-mono text-[10px] text-accent">score</span>
              </div>
              <div className="font-mono text-[9px] text-muted-foreground">340 solved · 201-day POTD streak</div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, type: "spring" }}
              className="absolute bottom-4 left-6 rounded-2xl border border-border/70 bg-surface/90 p-3 shadow-[var(--shadow-card)]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Total DSA</div>
              <div className="mt-1 font-display text-xl font-bold text-lime">1150+<span className="ml-1 text-[10px] font-mono text-muted-foreground">solved</span></div>
              <div className="font-mono text-[9px] text-muted-foreground">LC · GFG · CC · CF</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ delay: 1.65, type: "spring", bounce: 0.6 }}
              className="absolute -bottom-2 right-4 rounded-2xl bg-accent px-3 py-2 font-mono text-[10px] font-bold text-accent-foreground shadow-[0_10px_30px_rgba(46,242,189,0.35)]"
            >
              6 MICROSERVICES ✱ GKE
            </motion.div>
          </div>
        </motion.div>
      </div>


      {/* Marquee ticker */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-y border-border/60 bg-background/86 py-4">
        <div className="marquee-track gap-10 px-4">
          {[...tickerIcons, ...tickerIcons].map((t, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <t.Icon style={{ color: t.color }} className="h-5 w-5" />
              {t.name}
              <span className="text-primary">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminalLine({ prompt, cmd, muted, color, delay }: { prompt: string; cmd: string; muted?: boolean; color?: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex gap-2"
    >
      <span className={muted ? "text-muted-foreground" : "text-primary-glow"}>{prompt}</span>
      <span className={color ?? (muted ? "text-muted-foreground" : "text-foreground")}>{cmd}</span>
    </motion.div>
  );
}