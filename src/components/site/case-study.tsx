import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Zap, Database, BookOpen, Sparkles, ChevronRight, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { ReactNode } from "react";
import { projects, type ProjectSlug } from "@/lib/site";
import { iconFor } from "@/lib/tech-icons";
import { Diagram, type DiagramSpec } from "./diagrams";

interface CaseStudyProps {
  slug: ProjectSlug;
  overview: ReactNode;
  metrics?: { label: string; value: string }[];
  diagrams: DiagramSpec[];
  schema?: string;
  lessons: ReactNode[];
}

export function CaseStudy({ slug, overview, metrics, diagrams, schema, lessons }: CaseStudyProps) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="relative mx-auto max-w-[1300px] px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-96">
        <div className="mx-auto h-px w-[70%] bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      <Link
        to="/"
        hash="projects"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/82 px-3 py-1.5 font-mono text-xs text-muted-foreground transition hover:border-accent hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All projects
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90 }}
        className="mt-6"
      >
        <div className="inline-block rounded-md bg-primary/15 px-2.5 py-0.5 font-mono text-[11px] text-primary-glow">
          {project.subtitle}
        </div>
        <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
          <span className="text-gradient gradient-animated bg-clip-text text-transparent">{project.title}</span>
        </h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => {
            const { Icon: TIcon, color } = iconFor(t);
            return (
              <motion.span
                key={t}
                whileHover={{ y: -2, scale: 1.06 }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/70 px-2.5 py-1 font-mono text-[11px]"
              >
                <TIcon className="h-3.5 w-3.5" style={{ color }} />
                {t}
              </motion.span>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-2.5 font-mono text-sm hover:border-foreground"
          >
            <SiGithub className="h-4 w-4" /> Source
          </motion.a>
          {project.demo && (
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 font-mono text-sm font-semibold text-accent-foreground shadow-[0_12px_36px_rgba(46,242,189,0.18)]"
            >
              <ExternalLink className="h-4 w-4" /> Live demo
            </motion.a>
          )}
        </div>
      </motion.header>

      <section className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
            <BookOpen className="h-3.5 w-3.5" /> overview
          </div>
          <div className="prose-lead space-y-4 [&_strong]:text-foreground [&_strong]:font-semibold">{overview}</div>
        </motion.div>
        {metrics && (
          <div className="grid grid-cols-2 gap-3 content-start">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ y: -4 }}
                className="glass glass-hover rounded-2xl p-5"
              >
                <div className="font-display text-3xl font-bold text-gradient gradient-animated bg-clip-text text-transparent">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex items-end justify-between gap-4"
        >
          <div>
            <div className="mb-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
              <Zap className="h-3.5 w-3.5" /> architecture & flows
            </div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Every diagram, animated <span className="text-gradient gradient-animated bg-clip-text text-transparent">live</span>.
            </h2>
          </div>
          <div className="hidden rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-[10px] font-bold text-accent sm:block">
            ⤢ click any tile to zoom
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {diagrams.map((d) => (
            <Diagram key={d.title} spec={d} />
          ))}
        </div>
      </section>

      {schema && (
        <section className="mt-20">
          <div className="mb-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
            <Database className="h-3.5 w-3.5" /> schema.sql
          </div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Database schema</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass ring-glow mt-6 overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 bg-surface/60 px-5 py-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                ▸ schema.sql
              </span>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
              </div>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-[12px] leading-relaxed text-foreground/90">
              <code>{schema}</code>
            </pre>
          </motion.div>
        </section>
      )}

      <section className="mt-20">
        <div className="mb-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
          <Sparkles className="h-3.5 w-3.5" /> lessons_learned
        </div>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Deep dive & lessons</h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {lessons.map((l, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 90 }}
              whileHover={{ y: -4 }}
              className="glass glass-hover relative overflow-hidden rounded-2xl p-6 pl-16"
            >
              <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-xl bg-primary/20 font-mono text-xs font-bold text-primary-glow ring-1 ring-primary/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="text-sm leading-relaxed text-muted-foreground">{l}</div>
            </motion.li>
          ))}
        </ul>
      </section>

      <nav className="mt-24 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <motion.div whileHover={{ x: -4 }}>
          <Link to="/projects/$slug" params={{ slug: prev.slug }} className="glass glass-hover group flex flex-col rounded-2xl p-6">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </div>
            <div className="mt-2 font-display text-xl font-bold group-hover:text-accent">{prev.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{prev.subtitle}</div>
          </Link>
        </motion.div>
        <motion.div whileHover={{ x: 4 }}>
          <Link to="/projects/$slug" params={{ slug: next.slug }} className="glass glass-hover group flex flex-col rounded-2xl p-6 text-right">
            <div className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Next <ChevronRight className="h-3.5 w-3.5" />
            </div>
            <div className="mt-2 font-display text-xl font-bold group-hover:text-accent">{next.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{next.subtitle}</div>
            <ArrowRight className="ml-auto mt-2 h-4 w-4 text-primary-glow transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </nav>
    </article>
  );
}
