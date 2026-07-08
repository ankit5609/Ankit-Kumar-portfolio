import { motion } from "framer-motion";
import { GraduationCap, MapPin, Mail, Coffee } from "lucide-react";
import { SiSpringboot, SiKubernetes, SiPostgresql, SiRedis, SiApachekafka } from "react-icons/si";
import { site } from "@/lib/site";
import { Socials } from "./socials";

const highlights = [
  { Icon: GraduationCap, label: "Education", value: "MCA · NIT Jamshedpur" },
  { Icon: MapPin, label: "Location", value: "India · Remote-friendly" },
  { Icon: Mail, label: "Email", value: site.email },
  { Icon: Coffee, label: "Currently", value: "Building AI-native dev tools" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr] xl:grid-cols-[430px_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[30px] border border-border/70 bg-surface/84 p-3 shadow-[var(--shadow-card)]">
              <div className="relative overflow-hidden rounded-[26px]">
                <img
                  src={site.portraitUrl}
                  alt="Ankit Kumar portrait"
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                  style={{ filter: "grayscale(0.75) contrast(1.08) brightness(0.98)" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30" style={{
                  backgroundImage: "linear-gradient(135deg, rgba(143,181,255,0.12), transparent 42%, rgba(46,242,189,0.10))"
                }} />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-3 top-6 rounded-2xl bg-primary px-3 py-1.5 font-mono text-[10px] font-bold text-primary-foreground"
              >
                @ankit5609
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-3 bottom-8 rounded-2xl bg-accent px-3 py-1.5 font-mono text-[10px] font-bold text-accent-foreground"
              >
                v3.2.0
              </motion.div>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent"
            >
              {"// about_me"}
            </motion.div>

            <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Backend engineering with product-level motion.
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="prose-lead mt-6"
            >
              MCA student at NIT Jamshedpur focused on backend systems and cloud infrastructure.
              I've shipped two production platforms: a Kubernetes-native collaborative IDE and a
              Spring Boot hotel booking system with payments, semantic search, and a review Q&A
              chatbot.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="prose-lead mt-4"
            >
              I love solving architectural challenges — measured latency, idempotent event flows,
              sensible failure modes, and clean domain boundaries.
            </motion.p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, type: "spring" }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex items-center gap-3 rounded-[20px] border border-border/70 bg-surface/82 p-4 shadow-[var(--shadow-card)]"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/15 text-primary-glow">
                    <h.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{h.label}</div>
                    <div className="font-mono text-sm">{h.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Socials />
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <SiSpringboot className="h-4 w-4" style={{ color: "#6db33f" }} />
                <SiKubernetes className="h-4 w-4" style={{ color: "#326ce5" }} />
                <SiPostgresql className="h-4 w-4" style={{ color: "#4169e1" }} />
                <SiRedis className="h-4 w-4" style={{ color: "#dc382d" }} />
                <SiApachekafka className="h-4 w-4" style={{ color: "#e8e8ff" }} />
                <span>daily driver</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
