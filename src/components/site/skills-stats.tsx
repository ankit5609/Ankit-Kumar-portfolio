import { motion } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";
import { SiSpringboot, SiKubernetes, SiPostgresql, SiRedis, SiApachekafka, SiDocker, SiStripe, SiReact, SiTypescript, SiTailwindcss, SiGithubactions, SiNginx, SiCloudinary, SiHibernate, SiSpringsecurity, SiJsonwebtokens, SiGooglecloud, SiMinio } from "react-icons/si";
import { SiOpenai } from "@/lib/tech-icons";
import { FaJava } from "react-icons/fa";
import { codingStats, site } from "@/lib/site";
import { socialMeta } from "@/lib/tech-icons";

const stacks = [
  {
    title: "Backend",
    color: "#6db33f",
    items: [
      { Icon: FaJava, name: "Java 21", color: "#f89820" },
      { Icon: SiSpringboot, name: "Spring Boot 3", color: "#6db33f" },
      { Icon: SiSpringsecurity, name: "Spring Security", color: "#6db33f" },
      { Icon: SiHibernate, name: "Hibernate / JPA", color: "#bcae79" },
      { Icon: SiJsonwebtokens, name: "JWT", color: "#d63aff" },
    ],
  },
  {
    title: "Data & Messaging",
    color: "#4169e1",
    items: [
      { Icon: SiPostgresql, name: "PostgreSQL", color: "#4169e1" },
      { Icon: SiPostgresql, name: "pgvector", color: "#4169e1" },
      { Icon: SiRedis, name: "Redis", color: "#dc382d" },
      { Icon: SiApachekafka, name: "Kafka", color: "#e8e8ff" },
      { Icon: SiMinio, name: "MinIO", color: "#c72e49" },
    ],
  },
  {
    title: "Cloud & DevOps",
    color: "#326ce5",
    items: [
      { Icon: SiKubernetes, name: "Kubernetes", color: "#326ce5" },
      { Icon: SiGooglecloud, name: "GKE", color: "#4285f4" },
      { Icon: SiDocker, name: "Docker · Jib", color: "#2496ed" },
      { Icon: SiGithubactions, name: "GitHub Actions", color: "#2088ff" },
      { Icon: SiNginx, name: "NGINX", color: "#009639" },
    ],
  },
  {
    title: "AI & Integrations",
    color: "#10a37f",
    items: [
      { Icon: SiOpenai, name: "OpenAI · Spring AI", color: "#10a37f" },
      { Icon: SiStripe, name: "Stripe", color: "#635bff" },
      { Icon: SiCloudinary, name: "Cloudinary", color: "#3448c5" },
    ],
  },
  {
    title: "Frontend",
    color: "#61dafb",
    items: [
      { Icon: SiReact, name: "React", color: "#61dafb" },
      { Icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
      { Icon: SiTailwindcss, name: "Tailwind CSS", color: "#38bdf8" },
    ],
  },
];

const statSocialKey: Record<string, keyof typeof socialMeta> = {
  LeetCode: "leetcode",
  GeeksforGeeks: "gfg",
  CodeChef: "codechef",
  Codeforces: "codeforces",
};

export function SkillsStats() {
  return (
    <section id="skills" className="relative border-y border-border/70 bg-background/35 py-28 sm:py-36">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">{"// skills & signals"}</div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Brand-logo stack, moving like a system map.
            </h2>
          </div>
          <p className="prose-lead">
            Every logo is a tool I've shipped to production. Every stat is a link — click through to
            the profile.
          </p>
        </motion.div>

        {/* Stack grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stacks.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 90 }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="group relative overflow-hidden rounded-[24px] border border-border/70 bg-surface/82 p-6 shadow-[var(--shadow-card)]"
            >
              <div
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                style={{ background: s.color }}
              />
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }} />
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{s.title}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((it, j) => (
                  <motion.div
                    key={it.name + j}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + j * 0.04, type: "spring", stiffness: 260 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 font-mono text-xs"
                  >
                    <it.Icon className="h-4 w-4" style={{ color: it.color }} />
                    {it.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coding stats */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex items-end justify-between gap-4"
          >
            <div>
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">{"// dsa profile"}</div>
              <h3 className="font-display text-3xl font-bold sm:text-4xl">
                <span className="text-primary-glow">1150+</span> problems
                solved · across the internet
              </h3>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {codingStats.map((c, i) => {
              const key = statSocialKey[c.platform];
              const meta = socialMeta[key];
              return (
                <motion.a
                  key={c.platform}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 90 }}
                  whileHover={{ y: -8, rotate: -1 }}
                  className="group relative flex flex-col overflow-hidden rounded-[24px] border border-border/70 bg-surface/82 p-5 shadow-[var(--shadow-card)]"
                >
                  <div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-40"
                    style={{ background: meta.color }}
                  />
                  <div className="flex items-center justify-between">
                    <meta.Icon className="h-8 w-8" style={{ color: meta.color }} />
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-foreground" />
                  </div>
                  <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.primaryLabel}</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold" style={{ color: meta.color }}>{c.primary}</span>
                    <TrendingUp className="h-4 w-4 text-lime" />
                  </div>
                  <div className="mt-2 font-display text-lg font-bold">{c.platform}</div>
                  <ul className="mt-3 space-y-1 font-mono text-[11px] text-muted-foreground">
                    {c.lines.map((l) => (
                      <li key={l} className="flex items-start gap-1.5">
                        <span className="mt-0.5 text-primary">▸</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
