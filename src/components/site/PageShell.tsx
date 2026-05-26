import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 bg-brand rounded flex items-center justify-center">
        <div className="size-3.5 bg-background rounded-sm rotate-45" />
      </div>
      <span className="text-xl font-bold tracking-tight uppercase">iTrade</span>
    </div>
  );
}

const productLinks = [
  { to: "/ea-licensing", label: "EA Licensing" },
  { to: "/pamm", label: "PAMM Module" },
  { to: "/pricing", label: "Pricing" },
];
const supportLinks = [
  { to: "/documentation", label: "Documentation" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];
const legalLinks = [
  { to: "/risk-disclaimer", label: "Risk Disclaimer" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
];

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/"><Logo /></Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/ea-licensing" className="text-sm font-medium text-muted-foreground hover:text-foreground">EA Licensing</Link>
          <Link to="/pamm" className="text-sm font-medium text-muted-foreground hover:text-foreground">PAMM</Link>
          <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</Link>
          <Link to="/documentation" className="text-sm font-medium text-muted-foreground hover:text-foreground">Docs</Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-foreground">Login</a>
          <a href="#" className="px-5 py-2.5 bg-brand text-brand-foreground text-sm font-bold rounded-full hover:bg-brand/90 transition-all">Get Started</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const col = (title: string, items: { to: string; label: string }[]) => (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            A non-custodial command center for automated MT4/MT5 trading.
          </p>
        </div>
        {col("Product", productLinks)}
        {col("Support", supportLinks)}
        {col("Legal", legalLinks)}
      </div>
      <div className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} iTrade. All rights reserved.</p>
          <p>iTrade does not hold client funds and does not execute trades on a discretionary basis.</p>
        </div>
      </div>
    </footer>
  );
}

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
      <Nav />
      <header className="border-b border-border/60">
        <div className="max-w-4xl mx-auto px-6 py-20">
          {eyebrow && (
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand mb-4">{eyebrow}</p>
          )}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
          {lede && <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{lede}</p>}
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <article className="prose-page space-y-10">{children}</article>
      </main>
      <Footer />
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight border-b border-border/60 pb-3">{title}</h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_a]:text-brand [&_a:hover]:underline">
        {children}
      </div>
    </section>
  );
}
