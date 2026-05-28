import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Reveal } from "./Reveal";

export function PageShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            {eyebrow && (
              <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-brand">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] tracking-tight">
              {title}
            </h1>
            {lede && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{lede}</p>}
          </Reveal>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-16">
        <article className="space-y-12">{children}</article>
      </main>
      <SiteFooter />
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal as="section" className="space-y-4">
      <h2 className="border-b border-border/60 pb-3 font-display text-3xl tracking-tight">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_a]:text-brand [&_a:hover]:underline">
        {children}
      </div>
    </Reveal>
  );
}
