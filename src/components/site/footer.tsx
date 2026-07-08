import { Socials } from "./socials";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ankit Kumar · Crafted with obsessive detail
        </div>
        <Socials size="sm" />
      </div>
    </footer>
  );
}
