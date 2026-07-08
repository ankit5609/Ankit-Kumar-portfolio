import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Boxes, Building2, ChevronDown, Database, ExternalLink, GitBranch, Layers3, Network, Server, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useMemo, useState } from "react";
import { projects, type ProjectSlug } from "@/lib/site";
import { iconFor } from "@/lib/tech-icons";
import { Diagram, type DiagramSpec } from "./diagrams";
import { distributedArch, distributedPreview, distributedRag, staynestArch, staynestBooking, staynestPricing } from "./diagrams";

const projectMeta: Record<ProjectSlug, { Icon: typeof Server; gradient: string; accent: string }> = {
  "distributed-codeforge": { Icon: Boxes, gradient: "linear-gradient(135deg,#2ef2bd 0%,#8fb5ff 100%)", accent: "#2ef2bd" },
  staynest: { Icon: Building2, gradient: "linear-gradient(135deg,#ff7a90 0%,#ffd166 48%,#2ef2bd 100%)", accent: "#ff7a90" },
  "codeforge-monolith": { Icon: Server, gradient: "linear-gradient(135deg,#8fb5ff 0%,#d4e4ff 100%)", accent: "#8fb5ff" },
};

const projectDiagrams: Record<ProjectSlug, DiagramSpec[]> = {
  "distributed-codeforge": [distributedArch, distributedPreview, distributedRag],
  staynest: [staynestArch, staynestBooking, staynestPricing],
  "codeforge-monolith": [],
};

const featureIcons = [Network, GitBranch, Database, Layers3, Sparkles];

const projectDetails: Record<ProjectSlug, string[]> = {
  "distributed-codeforge": [
    "6 Spring Cloud microservices on GKE",
    "Kafka + Redis driven collaborative workflows",
    "Pre-warmed sandbox pods reduce preview cold start ~90%",
    "Spring AI + pgvector RAG loop for self-healing code fixes",
  ],
  staynest: [
    "Spring Boot 3 REST backend for hotel, room, booking, review and payment flows",
    "Pessimistic inventory locks prevent double-booking during checkout",
    "Stripe webhooks use idempotent payment records",
    "Cloudinary media and pgvector review Q&A power guest answers",
  ],
  "codeforge-monolith": [
    "Original monolithic Spring Boot collaborative IDE",
    "WebSocket-driven multi-user real-time editing",
    "In-process code execution with JWT auth",
    "Predecessor to the distributed Kubernetes rebuild",
  ],
};

export function ProjectsGrid() {
  const [active, setActive] = useState<ProjectSlug>(projects[0]?.slug ?? "distributed-codeforge");
  const activeProject = useMemo(() => projects.find((p) => p.slug === active) ?? projects[0], [active]);
  const activeDiagrams = projectDiagrams[activeProject.slug];

  return (
    <section id="projects" className="relative overflow-hidden border-y border-border/70 bg-surface/20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.26em] text-accent">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]" /> live project lab
            </div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Case studies stay on this screen.
            </h2>
          </div>
          <p className="prose-lead">
            Tap a project tile: the details collapse open, diagrams animate inline, and every diagram can expand into a full-screen replay.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]">
          <div className="space-y-3">
            {projects.map((p, i) => {
              const meta = projectMeta[p.slug];
              const Icon = meta.Icon;
              const open = p.slug === active;
              return (
                <motion.article
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 110, damping: 18 }}
                  className={`overflow-hidden rounded-[24px] border bg-background/78 shadow-[var(--shadow-card)] transition-colors ${open ? "border-primary/60" : "border-border/70 hover:border-accent/50"}`}
                >
                  <button type="button" onClick={() => setActive(p.slug)} className="flex w-full items-center gap-4 p-5 text-left">
                    <motion.span
                      animate={{ rotate: open ? -8 : 0, scale: open ? 1.08 : 1 }}
                      className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl"
                      style={{ background: meta.gradient, boxShadow: open ? `0 18px 55px ${meta.accent}55` : undefined }}
                    >
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </motion.span>
                    <span className="min-w-0 flex-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">project · 0{i + 1}</span>
                      <span className="block truncate font-display text-xl font-bold sm:text-2xl">{p.title}</span>
                    </span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-surface">
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 140, damping: 22 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/70 p-5 pt-4">
                          <p className="prose-lead text-[14px] sm:text-[15px]">{p.pitch}</p>
                          {p.highlights && p.highlights.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              {p.highlights.map((h, hi) => (
                                <motion.div
                                  key={h.label}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: hi * 0.06 }}
                                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-surface/70 to-background/60 p-3"
                                >
                                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-70" />
                                  <div className="font-display text-lg font-bold leading-none text-primary-glow">
                                    {h.metric}
                                  </div>
                                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                    {h.label}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          <div className="mt-4 grid gap-2">
                            {projectDetails[p.slug].map((detail: string, k: number) => {
                              const DetailIcon = featureIcons[k % featureIcons.length];
                              return (
                                <motion.div
                                  key={detail}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: k * 0.06 }}
                                  className="flex items-start gap-2 rounded-2xl border border-border/60 bg-surface/55 px-3 py-2 font-mono text-[11px] text-muted-foreground"
                                >
                                  <DetailIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                                  <span>{detail}</span>
                                </motion.div>
                              );
                            })}
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {p.tech.map((t) => {
                              const { Icon: TIcon, color } = iconFor(t);
                              return (
                                <motion.span
                                  key={t}
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  whileHover={{ y: -2, scale: 1.05 }}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/65 px-2.5 py-1 font-mono text-[11px]"
                                >
                                  <TIcon className="h-3.5 w-3.5" style={{ color }} />
                                  {t}
                                </motion.span>
                              );
                            })}
                          </div>
                          <div className="mt-5 flex flex-wrap gap-3">
                            {p.hasCaseStudy && (
                              <Link
                                to="/projects/$slug"
                                params={{ slug: p.slug }}
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 font-mono text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                              >
                                Full case study <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            )}
                            {p.demo && (
                              <a
                                href={p.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 font-mono text-xs font-semibold text-accent-foreground shadow-[0_12px_36px_rgba(46,242,189,0.18)] transition hover:scale-[1.03]"
                              >
                                <ExternalLink className="h-4 w-4" /> Live demo
                              </a>
                            )}
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2.5 font-mono text-xs hover:border-foreground"
                            >
                              <SiGithub className="h-4 w-4" /> Source
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>

          <motion.div layout className="relative min-h-[540px] overflow-hidden rounded-[30px] border border-border/70 bg-background/82 p-3 shadow-[var(--shadow-card)] sm:p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -20 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="relative"
              >
                 <div className="mb-4 flex flex-col justify-between gap-3 rounded-[24px] border border-border/70 bg-surface/80 p-5 sm:flex-row sm:items-end">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">animated architecture board</div>
                    <h3 className="mt-2 font-display text-3xl font-bold">{activeProject.title}</h3>
                  </div>
                   <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    {activeProject.demo && (
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-2 font-mono text-[11px] font-bold text-accent-foreground transition hover:scale-[1.03]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live demo
                      </a>
                    )}
                    <div className="flex -space-x-2">
                    {activeProject.tech.slice(0, 5).map((t, i) => {
                      const { Icon: TIcon, color } = iconFor(t);
                      return (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background shadow-lg"
                        >
                          <TIcon className="h-5 w-5" style={{ color }} />
                        </motion.span>
                      );
                    })}
                    </div>
                  </div>
                </div>
                {activeDiagrams.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
                    {activeDiagrams.map((d: DiagramSpec, i: number) => (
                      <motion.div
                        key={d.title}
                        initial={{ opacity: 0, y: 40, rotateX: -8 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: i * 0.12, type: "spring", stiffness: 110, damping: 18 }}
                        className={i === 0 ? "2xl:col-span-2" : ""}
                      >
                        <Diagram spec={d} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid place-items-center rounded-[26px] border border-dashed border-border/60 bg-surface/40 p-12 text-center">
                    <div>
                      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl" style={{ background: projectMeta[activeProject.slug].gradient }}>
                        <Server className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="font-display text-2xl font-bold">Legacy monolith · reference only</div>
                      <p className="mt-2 max-w-md font-mono text-xs text-muted-foreground">
                        This project ships without an inline case study. Grab the source on GitHub — it's the codebase the distributed rebuild replaced.
                      </p>
                      <div className="mt-5 flex justify-center gap-3">
                        <a
                          href={activeProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2.5 font-mono text-xs hover:border-foreground"
                        >
                          <SiGithub className="h-4 w-4" /> View source
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
