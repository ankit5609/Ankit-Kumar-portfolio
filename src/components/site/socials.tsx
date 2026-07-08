import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { site } from "@/lib/site";
import { socialMeta } from "@/lib/tech-icons";

const order: (keyof typeof socialMeta)[] = ["github", "linkedin", "leetcode", "gfg", "codechef", "codeforces"];

export function Socials({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sz = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const ic = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-5 w-5" : "h-[18px] w-[18px]";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {order.map((k, i) => {
        const meta = socialMeta[k];
        const href = site.socials[k];
        return (
          <motion.a
            key={k}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={meta.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 260 }}
            whileHover={{ y: -4, scale: 1.1, rotate: -6 }}
            whileTap={{ scale: 0.9 }}
            className={`grid ${sz} place-items-center rounded-2xl border border-border/70 bg-surface/82 text-muted-foreground shadow-[var(--shadow-card)] transition-colors hover:text-foreground`}
            style={{ ["--brand" as string]: meta.color }}
          >
            <meta.Icon className={ic} style={{ color: meta.color }} />
          </motion.a>
        );
      })}
    </div>
  );
}

export function SocialsRow() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {order.map((k, i) => {
        const meta = socialMeta[k];
        const href = site.socials[k];
        return (
          <motion.a
            key={k}
            href={href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="flex min-w-0 items-center gap-2.5 rounded-[18px] border border-border/70 bg-surface/82 p-2.5 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-primary/45"
          >
            <meta.Icon className="h-5 w-5 shrink-0" style={{ color: meta.color }} />
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate font-mono text-[11px] font-semibold">{meta.label}</span>
              <span className="truncate font-mono text-[10px] text-muted-foreground">@ankit</span>
            </div>
            <ExternalLink className="hidden h-3.5 w-3.5 shrink-0 text-muted-foreground sm:block" />
          </motion.a>

        );
      })}
    </div>
  );
}
