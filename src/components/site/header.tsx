import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const navItems = [
  { href: "#home", label: "Home", num: "01" },
  { href: "#about", label: "About", num: "02" },
  { href: "#skills", label: "Skills", num: "03" },
  { href: "#projects", label: "Work", num: "04" },
  { href: "#contact", label: "Contact", num: "05" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 rounded-[22px] border border-border/70 bg-background/92 px-4 py-2.5 shadow-[var(--shadow-card)] transition-all ${
            scrolled ? "border-primary/45" : ""
          }`}
        >
          <Link to="/" className="group flex items-center gap-3">
            <motion.span
              whileHover={{ rotate: -12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="grid h-9 w-9 place-items-center rounded-2xl bg-primary font-display text-sm font-bold text-primary-foreground shadow-lg"
            >
              AK
            </motion.span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-bold">ankit.kumar</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {"//"} backend engineer
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="group relative rounded-lg px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="mr-1.5 text-[10px] text-primary/70">{n.num}</span>
                {n.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-primary via-accent to-magenta transition-transform duration-300 group-hover:scale-x-100" />
              </motion.a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-4 py-2 font-mono text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Download className="h-3.5 w-3.5" />
              Resume.pdf
            </motion.a>
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mt-2 flex flex-col gap-1 overflow-hidden rounded-[22px] border border-border/70 bg-background/96 p-3 shadow-[var(--shadow-card)] lg:hidden"
            >
              {navItems.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-2 font-mono text-sm hover:bg-surface-alt"
                >
                  <span className="mr-2 text-primary/70">{n.num}</span>
                  {n.label}
                </a>
              ))}
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-sm font-semibold text-primary-foreground"
              >
                <Download className="h-4 w-4" /> Resume.pdf
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
