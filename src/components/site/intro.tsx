import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

export function IntroAnimation() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const seen = typeof window !== "undefined" && window.sessionStorage.getItem("intro-seen");
    if (seen) { setShow(false); return; }
    const t = setTimeout(() => {
      setShow(false);
      try { window.sessionStorage.setItem("intro-seen", "1"); } catch { /* ignore */ }
    }, 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="text-center"
          >
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent"
            >
              <Terminal className="h-3 w-3" /> booting portfolio
            </motion.div>
            <div className="font-display text-5xl font-bold sm:text-7xl">
              <TypeText text="ankit.kumar" />
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 h-[3px] w-40 origin-left rounded-full bg-gradient-to-r from-primary via-accent to-magenta"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
            >
              cloud-native · ai-adjacent · reliable
            </motion.div>
          </motion.div>
          <motion.div
            aria-hidden
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ delay: 1.55, duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 origin-top bg-surface"
          />
          <motion.div
            aria-hidden
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ delay: 1.55, duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-surface"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypeText({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.045, type: "spring", stiffness: 220 }}
          className="inline-block text-gradient gradient-animated bg-clip-text text-transparent"
        >
          {ch}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 inline-block h-[0.9em] w-[0.55ch] translate-y-1 bg-accent align-middle"
      />
    </span>
  );
}
