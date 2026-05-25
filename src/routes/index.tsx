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

function StatsBar() {
  const stats = [
    { v: "$1.2B+", l: "Volume Routed" },
    { v: "14,200", l: "Active Licenses" },
    { v: "37", l: "Supported Brokers" },
    { v: "99.98%", l: "Uptime (12mo)" },
  ];
  return (
    <section className="border-y border-border/60 bg-surface/40">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l}>
            <p className="text-3xl md:text-4xl font-mono font-bold text-brand">{s.v}</p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-2">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Choose Your Path", d: "Subscribe to a license tier and run the EA on your own broker, or join the PAMM pool for hands-free allocation." },
    { n: "02", t: "Connect Your Broker", d: "Link any MT4/MT5 account via secure API. iTrade requests trade-only permissions — never withdrawal rights." },
    { n: "03", t: "Configure Risk", d: "Set drawdown ceilings, per-trade exposure, and instrument filters. Limits are enforced server-side." },
    { n: "04", t: "Monitor & Scale", d: "Watch live equity, license status, and PAMM performance from one console. Add accounts as you grow." },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-[11px] font-mono uppercase tracking-widest text-brand mb-4">The Flow</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Four steps from sign-up to systematic execution.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8 hover:bg-surface transition-colors">
              <p className="font-mono text-brand text-sm mb-8">{s.n}</p>
              <h4 className="font-bold text-lg mb-3">{s.t}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Starter", price: "49", max: "$2,500", accts: "1", feats: ["MT4 or MT5", "Standard risk presets", "Email support"] },
    { name: "Standard", price: "99", max: "$10,000", accts: "3", feats: ["MT4 + MT5", "Custom risk presets", "Email + chat"] },
    { name: "Premium", price: "199", max: "$50,000", accts: "10", feats: ["Priority VPS", "Advanced analytics", "Priority support"], popular: true },
    { name: "Elite", price: "499", max: "Unlimited", accts: "Unlimited", feats: ["Dedicated VPS", "API access", "Account manager"] },
  ];
  return (
    <section id="pricing" className="py-24 bg-surface border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-mono uppercase tracking-widest text-brand mb-4">Subscription Tiers</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">License the EA on your terms.</h2>
          <p className="text-muted-foreground">Pick the tier that matches your account size. Upgrade or downgrade anytime — your license carries over instantly.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t) => (
            <div key={t.name} className={`relative p-8 rounded-2xl bg-background border flex flex-col ${t.popular ? "border-brand ring-1 ring-brand/30" : "border-border"}`}>
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand text-brand-foreground text-[10px] font-bold uppercase tracking-widest rounded-full">Most Popular</div>
              )}
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">{t.name}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold tracking-tight">${t.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <div className="space-y-3 mb-8 text-sm">
                <div className="flex justify-between border-b border-border/60 pb-2"><span className="text-muted-foreground">Max Balance</span><span className="font-mono">{t.max}</span></div>
                <div className="flex justify-between border-b border-border/60 pb-2"><span className="text-muted-foreground">Accounts</span><span className="font-mono">{t.accts}</span></div>
              </div>
              <ul className="space-y-3 mb-8 text-sm flex-grow">
                {t.feats.map((f) => (<li key={f} className="flex items-center gap-3"><span className="text-brand">✓</span> {f}</li>))}
              </ul>
              <a href="#" className={`w-full text-center py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${t.popular ? "bg-brand text-brand-foreground hover:bg-brand/90" : "bg-white/5 border border-border hover:bg-white/10"}`}>Select Tier</a>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-10">
          Prefer hands-free? <a href="#pamm-strategy" className="text-brand hover:underline">Join the PAMM strategy</a> — no subscription, 30% performance fee only.
        </p>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    { t: "Non-Custodial by Design", d: "iTrade never touches your funds. Deposits, withdrawals, and balances live exclusively at your regulated broker." },
    { t: "Trade-Only API Permissions", d: "Our integration requests order execution access only — withdrawal rights are technically impossible." },
    { t: "Encrypted Credential Vault", d: "Broker credentials are encrypted at rest with AES-256 and isolated per tenant in a hardened vault." },
    { t: "Server-Side Risk Enforcement", d: "Drawdown ceilings and exposure caps run on our infrastructure — not the client — and cannot be bypassed." },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="md:sticky md:top-28">
            <p className="text-[11px] font-mono uppercase tracking-widest text-brand mb-4">Security Posture</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Your capital stays at your broker.</h2>
            <p className="text-muted-foreground text-lg mb-8">We're a software licensing portal — not a custodian, not a fund, not a financial advisor. Every architectural choice protects that boundary.</p>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand/5 border border-brand/20">
              <span className="text-brand">✓</span>
              <span className="text-xs font-bold uppercase tracking-widest text-brand">Verified Non-Custodial</span>
            </div>
          </div>
          <div className="space-y-2">
            {items.map((i, idx) => (
              <div key={i.t} className="p-6 rounded-xl bg-surface border border-border">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-brand text-sm pt-1">{String(idx + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 className="font-bold mb-2">{i.t}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{i.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Brokers() {
  const brokers = ["IC Markets", "Pepperstone", "FxPro", "Tickmill", "Exness", "FBS", "OctaFX", "XM"];
  return (
    <section className="py-20 border-y border-border/60 bg-surface/40">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-10">Compatible with leading MT4 / MT5 brokers</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-8 items-center">
          {brokers.map((b) => (
            <div key={b} className="text-center text-muted-foreground/70 font-bold tracking-tight text-sm hover:text-foreground transition-colors">{b}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "I run six accounts across three prop firms from one dashboard. The risk-guard alone paid for the Elite tier in a week.", n: "Marcus Veldt", r: "Systematic Trader, London" },
    { q: "Switched from a self-hosted VPS setup to iTrade. License management is the first thing that finally feels professional.", n: "Priya Anand", r: "Quant Developer, Singapore" },
    { q: "The PAMM is exactly what I wanted — no subscription, fee only on profit. Aligns perfectly with what I'm trying to do.", n: "Daniel Okafor", r: "PAMM Investor, Lagos" },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <p className="text-[11px] font-mono uppercase tracking-widest text-brand mb-4">From the Field</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Trusted by traders who treat capital seriously.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <figure key={q.n} className="p-8 rounded-2xl bg-surface border border-border flex flex-col">
              <blockquote className="text-foreground/90 leading-relaxed flex-grow">"{q.q}"</blockquote>
              <figcaption className="mt-8 pt-6 border-t border-border/60">
                <p className="font-bold text-sm">{q.n}</p>
                <p className="text-xs text-muted-foreground mt-1">{q.r}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Does iTrade hold my money?", a: "Never. iTrade is a software licensing and management platform. Your funds remain with your regulated broker at all times. We only request trade execution permissions via API." },
    { q: "Which brokers and platforms are supported?", a: "Any broker offering MT4 or MT5 is supported. We have first-class integrations with IC Markets, Pepperstone, FxPro, Tickmill, Exness, FBS, OctaFX, and XM." },
    { q: "What's the difference between EA licensing and PAMM?", a: "With EA licensing, you pay a monthly subscription and run our algorithm on your own broker accounts. With PAMM, you allocate to our master pool through a recommended broker and pay only a 30% fee on realized profits." },
    { q: "Can I cancel anytime?", a: "Yes. Subscriptions are month-to-month. Cancel from your dashboard and your license remains active until the end of the billing period." },
    { q: "What happens if my drawdown limit is breached?", a: "Server-side risk enforcement immediately disables the EA on the affected account and notifies you via email and dashboard alert. You re-enable manually after reviewing." },
    { q: "Do you guarantee returns?", a: "No. Trading carries significant risk of loss and past performance does not guarantee future results. iTrade provides software, not financial advice." },
  ];
  return (
    <section id="faq" className="py-24 bg-surface border-y border-border/60">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[11px] font-mono uppercase tracking-widest text-brand mb-4">Common Questions</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Frequently asked.</h2>
        </div>
        <div className="space-y-3">
          {items.map((i) => (
            <details key={i.q} className="group rounded-xl bg-background border border-border p-6 open:border-brand/30 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold">
                <span>{i.q}</span>
                <span className="text-brand text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Bring your strategy <br className="hidden sm:inline" />into the command center.</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">Two minutes to create an account. Connect your broker, set your risk, and let the system execute.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#" className="px-8 py-4 bg-brand text-brand-foreground font-bold rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all">Create Free Account</a>
          <a href="#pricing" className="px-8 py-4 bg-white/5 border border-border hover:bg-white/10 font-bold rounded-lg transition-all">Compare Tiers</a>
        </div>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <StatsBar />
      <TwoPaths />
      <HowItWorks />
      <FeaturePreview />
      <Security />
      <Brokers />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
