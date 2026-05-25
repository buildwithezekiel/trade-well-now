import { createFileRoute } from "@tanstack/react-router";
import networkImg from "@/assets/network.jpg";
import dashboardImg from "@/assets/dashboard.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iTrade — The Command Center for Algorithmic Wealth" },
      {
        name: "description",
        content:
          "iTrade centralizes automated MT4/MT5 trading. License the EA on your own broker accounts, or join a hands-free PAMM strategy. Non-custodial by design.",
      },
      { property: "og:title", content: "iTrade — The Command Center for Algorithmic Wealth" },
      {
        property: "og:description",
        content:
          "Securely link your brokerage to elite Expert Advisors or join high-performance PAMM strategies from one unified portal.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: LandingPage,
});

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

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {["How It Works", "Pricing", "PAMM Strategy", "FAQ"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-foreground">
            Login
          </a>
          <a
            href="#"
            className="px-5 py-2.5 bg-brand text-brand-foreground text-sm font-bold rounded-full hover:bg-brand/90 transition-all"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="relative pt-24 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/20 bg-brand/5 mb-8">
            <span className="size-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-brand">
              Version 4.0 Now Live
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-8 tracking-tight">
            The Command Center for{" "}
            <span className="text-muted-foreground italic font-medium">Algorithmic</span> Wealth.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
            Centralize your automated trading ecosystem. Securely link your brokerage accounts to
            elite Expert Advisors or join high-performance PAMM strategies from one unified portal.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#pricing"
              className="px-8 py-4 bg-brand text-brand-foreground font-bold rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Launch Your Dashboard
            </a>
            <a
              href="#pamm-strategy"
              className="px-8 py-4 bg-white/5 border border-border hover:bg-white/10 font-bold rounded-lg transition-all"
            >
              Explore Strategies
            </a>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none [mask-image:linear-gradient(to_left,black,transparent)]">
        <img
          src={networkImg}
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}

function TwoPaths() {
  return (
    <section id="how-it-works" className="py-24 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="flex-1 p-8 rounded-2xl bg-surface border border-border group hover:border-brand/40 transition-all">
            <div className="size-12 rounded-lg bg-brand/10 flex items-center justify-center mb-6">
              <div className="size-6 border-2 border-brand rounded" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Licensed EA Access</h3>
            <p className="text-muted-foreground mb-8">
              Connect your MT4/MT5 accounts to our proprietary trading algorithms. You keep 100% of
              the profit; we manage the license and safety limits.
            </p>
            <ul className="space-y-4 mb-8 text-sm font-medium">
              {[
                "Secure Broker Integration",
                "Tiered Account Size Limits",
                "Real-time Performance Monitoring",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="text-brand">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 text-brand font-bold text-sm uppercase tracking-wider"
            >
              View Tiers{" "}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div
            id="pamm-strategy"
            className="flex-1 p-8 rounded-2xl bg-secondary border border-border group hover:border-brand/40 transition-all"
          >
            <div className="size-12 rounded-lg bg-white/5 flex items-center justify-center mb-6">
              <div className="size-6 bg-white/20 rounded-full" />
            </div>
            <h3 className="text-2xl font-bold mb-4">PAMM Managed Strategy</h3>
            <p className="text-muted-foreground mb-8">
              A completely hands-free experience. Join our high-frequency allocation module where we
              only earn when you do via a performance fee.
            </p>
            <ul className="space-y-4 mb-8 text-sm font-medium">
              {[
                "No Monthly Subscriptions",
                "30% Performance-Only Fee",
                "Recommended Global Brokers",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="text-brand">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-foreground font-bold text-sm uppercase tracking-wider"
            >
              Learn About PAMM{" "}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePreview() {
  return (
    <section className="py-24 bg-surface border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full aspect-[4/3] bg-background rounded-xl border border-border shadow-2xl ring-1 ring-white/5 overflow-hidden">
              <img
                src={dashboardImg}
                alt="iTrade dashboard preview"
                loading="lazy"
                width={1280}
                height={960}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 bg-brand rounded-xl shadow-xl text-brand-foreground">
              <p className="text-[11px] font-bold uppercase tracking-tighter opacity-70">
                Total Volume Handled
              </p>
              <p className="text-3xl font-mono font-bold">$1.2B+</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
              Total Control Over
              <br />
              Your Risk Profile.
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Our dashboard isn't just a viewer — it's a control center. Toggle your EA on/off
              instantly, adjust drawdown limits, and manage license expiries across multiple
              brokerage accounts from one single login.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: "01.", t: "Multi-Account", d: "Manage up to 10 MT4/MT5 accounts simultaneously." },
                { n: "02.", t: "Risk Guard", d: "Hard stop equity limits to protect your capital from spikes." },
              ].map((c) => (
                <div key={c.n}>
                  <p className="font-mono text-brand mb-2 font-bold">{c.n}</p>
                  <h4 className="font-bold mb-2">{c.t}</h4>
                  <p className="text-sm text-muted-foreground">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols: { title: string; links: string[] }[] = [
    { title: "Product", links: ["EA Licensing", "PAMM Module", "Pricing"] },
    { title: "Support", links: ["Documentation", "FAQ", "Contact"] },
    { title: "Legal", links: ["Risk Disclaimer", "Privacy Policy", "Terms of Service"] },
  ];
  return (
    <footer className="py-16 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <Logo />
            <p className="text-sm text-muted-foreground mt-6">
              Sophisticated automation for the modern retail trader.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h5 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">
                {c.title}
              </h5>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-brand transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border/40 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
            Risk Warning: Trading involves significant risk of loss. Past performance does not
            guarantee future results.
          </p>
          <p className="text-xs text-muted-foreground/70">
            © 2026 iTrade Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <TwoPaths />
      <FeaturePreview />
      <Footer />
    </div>
  );
}
