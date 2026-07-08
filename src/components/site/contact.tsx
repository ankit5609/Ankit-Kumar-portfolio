import { motion } from "framer-motion";
import { Mail, ArrowRight, Copy, Check, Send, User, MessageSquare, Sparkles } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";
import { SocialsRow } from "./socials";

import { sendEmailFn } from "@/lib/actions";
import { toast } from "sonner";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendEmailFn({ data: form });
      setSent(true);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80 }}
          className="relative overflow-hidden rounded-[30px] border border-border/70 bg-surface/84 p-8 shadow-[var(--shadow-card)] sm:p-12"
        >
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">{"// let's build"}</div>
              <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
                Got a system that{" "}
                <span className="text-gradient gradient-animated bg-clip-text text-transparent">shouldn't</span>{" "}
                wake you at 3am?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Backend / full-stack roles, freelance builds, and collaborations —
                especially anything Java, cloud-native, or AI-adjacent.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-mono text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  <Mail className="h-4 w-4" /> {site.email}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-3 font-mono text-sm hover:border-accent hover:text-accent"
                >
                  {copied ? <Check className="h-4 w-4 text-lime" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy email"}
                </motion.button>
              </div>

              <div className="mt-9">
                <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">or find me on</div>
                <SocialsRow />
              </div>
            </div>

            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative rounded-[24px] border border-border/70 bg-background/82 p-6 shadow-[var(--shadow-card)] sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                  <Sparkles className="h-3.5 w-3.5" /> quick connect
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-magenta/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
                </div>
              </div>

              <div className="space-y-4">
                <Field icon={<User className="h-4 w-4" />} label="name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Ada Lovelace"
                    className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                  />
                </Field>
                <Field icon={<Mail className="h-4 w-4" />} label="email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@company.com"
                    className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                  />
                </Field>
                <Field icon={<MessageSquare className="h-4 w-4" />} label="message" align="start">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="What are you building?"
                    className="w-full resize-none bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                  />
                </Field>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-5 py-3.5 font-mono text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Sending message..."
                ) : sent ? (
                  <>
                    <Check className="h-4 w-4 text-lime" /> Message sent!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send message
                  </>
                )}
              </motion.button>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                delivered directly via Brevo SMTP
              </p>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ icon, label, children, align = "center" }: { icon: React.ReactNode; label: string; children: React.ReactNode; align?: "center" | "start" }) {
  return (
    <label className={`flex ${align === "start" ? "items-start" : "items-center"} gap-3 rounded-2xl border border-border/60 bg-surface/60 px-4 py-3 transition focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(24,215,165,0.15)]`}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-background/60 text-accent">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
        {children}
      </div>
    </label>
  );
}
