import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import dashboardImg from "@/assets/dashboard.jpg";
import networkImg from "@/assets/network.jpg";
import editorialImg from "@/assets/editorial.jpg";
import precisionImg from "@/assets/precision.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iTrade — A non-custodial command center for MT4 & MT5" },
      {
        name: "description",
        content:
          "iTrade centralizes automated trading for serious retail traders. Connect MT4 or MT5, deploy strategies, and monitor performance without ever handing over your funds.",
      },
      { property: "og:title", content: "iTrade — Command your strategies" },
      {
        property: "og:description",
        content: "Centralized, non-custodial control over MT4 & MT5 automation.",
      },
    ],
  }),
  component: LandingPage,
});

/* ----------------------------------------------------------------- *
 * Primitives
 * ----------------------------------------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </p>
  );
}

function PrimaryBtn({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:gap-3"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function GhostBtn({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
    >
      {children}
    </Link>
  );
}

function ExploreLink({ to, label = "Explore" }: { to: string; label?: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all"
    >
      <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover:border-foreground">
        {label}
      </span>
      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ----------------------------------------------------------------- *
 * Hero — wide editorial split
 * ----------------------------------------------------------------- */

function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 pt-10 pb-16 md:pt-14 md:pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="grid lg:grid-cols-[1.05fr_1fr]">
              {/* Left — copy */}
              <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20 xl:p-24">
                <Reveal delay={80}>
                  <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-brand-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-brand w-fit">
                    <span className="size-1.5 rounded-full bg-brand" /> Non-custodial · MT4 &amp; MT5
                  </p>
                </Reveal>
                <Reveal delay={140}>
                  <h1 className="font-display text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95] tracking-tight text-foreground">
                    Trade smarter,<br />
                    <span className="text-brand italic">not harder.</span>
                  </h1>
                </Reveal>
                <Reveal delay={220}>
                  <p className="mt-8 max-w-lg text-base md:text-lg leading-relaxed text-muted-foreground">
                    iTrade puts algorithmic trading within reach. Connect your MT4 or MT5 account,
                    deploy strategies, and watch them execute with precision from a single
                    command center — without ever surrendering your funds.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <div className="mt-10 flex flex-wrap items-center gap-3">
                    <PrimaryBtn to="/signup">Start free</PrimaryBtn>
                    <GhostBtn to="/dashboard">View dashboard</GhostBtn>
                  </div>
                </Reveal>
                <Reveal delay={380}>
                  <div className="mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-border pt-8">
                    <div>
                      <p className="font-display text-3xl text-foreground">50K+</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Trades / day</p>
                    </div>
                    <div>
                      <p className="font-display text-3xl text-foreground">99.9%</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Uptime</p>
                    </div>
                    <div>
                      <p className="font-display text-3xl text-foreground">12+</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Brokers</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right — image */}
              <div className="relative min-h-[360px] lg:min-h-[680px] overflow-hidden bg-secondary">
                <img
                  src={dashboardImg}
                  alt="iTrade command center dashboard preview"
                  width={1280}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-foreground/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}




/* ----------------------------------------------------------------- *
 * Core — three cards
 * ----------------------------------------------------------------- */

const coreCards = [
  {
    eyebrow: "Control",
    title: "Centralized trading dashboard",
    body: "See every account, every strategy, every position. Decide faster.",
    img: dashboardImg,
    to: "/ea-licensing",
  },
  {
    eyebrow: "Strategy",
    title: "Algorithm management built right",
    body: "Deploy, tune, and rotate EAs across accounts without manual friction.",
    img: networkImg,
    to: "/pamm",
  },
  {
    eyebrow: "Insight",
    title: "Real-time analytics that tell the truth",
    body: "Know what your capital is doing, the moment it happens.",
    img: editorialImg,
    to: "/documentation",
  },
];

function Core() {
  return (
    <section className="border-b border-border/70 bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:py-32">
        <Reveal className="text-center">
          <Eyebrow>Core</Eyebrow>
          <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1] tracking-tight">
            What sets iTrade apart
          </h2>
          <p className="mt-5 text-sm md:text-base text-muted-foreground">
            Three tools that matter most to serious traders.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {coreCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-card transition-all hover:border-foreground/40">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={c.img}
                    alt=""
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover grayscale-[20%] transition-all duration-[1.2s] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <Eyebrow>{c.eyebrow}</Eyebrow>
                  <h3 className="font-display text-2xl leading-tight tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  <div className="mt-auto pt-2">
                    <ExploreLink to={c.to} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- *
 * Gain — bento
 * ----------------------------------------------------------------- */

function Gain() {
  return (
    <section className="border-b border-border/70 bg-surface">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:py-32">
        <Reveal className="text-center">
          <Eyebrow>Why</Eyebrow>
          <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1] tracking-tight">
            What you gain here
          </h2>
          <p className="mt-5 text-sm md:text-base text-muted-foreground">
            iTrade gives you what matters most.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Big left card spanning 2 cols × 2 rows */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <article className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-card">
              <div className="aspect-[16/10] overflow-hidden bg-secondary md:aspect-auto md:flex-1">
                <img
                  src={precisionImg}
                  alt="Precision instrument representing iTrade's command layer"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="space-y-4 p-8 md:p-10">
                <Eyebrow>Command</Eyebrow>
                <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
                  Enhanced control over your strategies
                </h3>
                <p className="max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
                  You own your algorithms. iTrade never touches your funds and never executes
                  discretionary trades on your behalf. You stay in charge — always.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <GhostBtn to="/ea-licensing">Learn</GhostBtn>
                  <ExploreLink to="/documentation" />
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="flex h-full flex-col gap-5 rounded-md border border-border bg-card p-8">
              <svg viewBox="0 0 24 24" className="size-7 stroke-foreground" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
              </svg>
              <h3 className="font-display text-2xl leading-tight tracking-tight">
                Improved efficiency across operations
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Manage multiple strategies and accounts from one screen, with one set of rules.
              </p>
              <div className="mt-auto"><ExploreLink to="/pamm" /></div>
            </article>
          </Reveal>

          <Reveal delay={200}>
            <article className="flex h-full flex-col gap-5 rounded-md border border-border bg-card p-8">
              <svg viewBox="0 0 24 24" className="size-7 stroke-foreground" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <h3 className="font-display text-2xl leading-tight tracking-tight">
                Total transparency in every transaction
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                See exactly what happens, when it happens. No black boxes, no hidden order flow.
              </p>
              <div className="mt-auto"><ExploreLink to="/documentation" /></div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- *
 * Steps — numbered editorial rows
 * ----------------------------------------------------------------- */

const steps = [
  {
    num: "01",
    tag: "Connect account",
    eyebrow: "Setup",
    title: "Link your MT4 or MT5 in minutes",
    body: "Give iTrade read-only access to your trading accounts. No passwords shared, no funds moved. You control everything from the start.",
    img: networkImg,
  },
  {
    num: "02",
    tag: "Build strategy",
    eyebrow: "Configure",
    title: "Deploy EAs and PAMM masters with one click",
    body: "Pick from licensed expert advisors or follow a verified PAMM master. Set risk envelopes once and propagate them across every connected account.",
    img: dashboardImg,
  },
  {
    num: "03",
    tag: "Monitor & scale",
    eyebrow: "Run",
    title: "Watch performance, scale what works",
    body: "Live P&L, drawdown alerts, exposure heatmaps. Pause, rotate, or scale a strategy the instant the data tells you to.",
    img: editorialImg,
  },
];

function Steps() {
  return (
    <section className="border-b border-border/70 bg-background">
      <div className="mx-auto max-w-[1280px] px-6">
        {steps.map((s, i) => (
          <div key={s.num} className="border-b border-border/70 last:border-b-0">
            <Reveal>
              <div className="flex items-center gap-6 py-5 text-xs">
                <span className="font-mono tabular-nums text-muted-foreground">{s.num}</span>
                <span className="font-medium uppercase tracking-[0.18em] text-foreground">{s.tag}</span>
              </div>
            </Reveal>
            <div className={`grid items-center gap-10 pb-24 pt-6 md:grid-cols-2 md:gap-16 md:pb-28 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <Reveal delay={80}>
                <div className="max-w-md">
                  <Eyebrow>{s.eyebrow}</Eyebrow>
                  <h3 className="mt-4 font-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">{s.body}</p>
                  <div className="mt-8 flex items-center gap-4">
                    <GhostBtn to="/documentation">Learn</GhostBtn>
                    <ExploreLink to="/ea-licensing" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="aspect-[4/3] overflow-hidden rounded-md bg-secondary">
                  <img
                    src={s.img}
                    alt=""
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- *
 * Proof — bento numbers
 * ----------------------------------------------------------------- */

function Proof() {
  return (
    <section className="border-b border-border/70 bg-surface">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:py-32">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <Eyebrow>Proof</Eyebrow>
              <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1] tracking-tight max-w-[14ch]">
                Numbers that speak for themselves
              </h2>
            </div>
            <div className="max-w-md space-y-6">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Traders depend on iTrade to manage their operations. The platform runs clean,
                stays reliable, and delivers what matters most.
              </p>
              <div className="flex items-center gap-4">
                <GhostBtn to="/pricing">Learn</GhostBtn>
                <ExploreLink to="/faq" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="md:row-span-2">
            <article className="flex h-full flex-col rounded-md border border-border bg-card p-8">
              <h3 className="font-display text-7xl md:text-8xl leading-none tracking-tight">50K+</h3>
              <div className="mt-auto pt-12">
                <Eyebrow>Trades managed daily</Eyebrow>
                <p className="mt-2 text-sm text-muted-foreground">Across active strategies and live accounts.</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden rounded-md bg-secondary md:h-full">
              <img src={editorialImg} alt="" loading="lazy" width={800} height={600} className="h-full w-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <article className="flex h-full flex-col rounded-md border border-border bg-card p-8">
              <h3 className="font-display text-6xl md:text-7xl leading-none tracking-tight">2M+</h3>
              <div className="mt-auto pt-10">
                <Eyebrow>Data points analyzed</Eyebrow>
                <p className="mt-2 text-sm text-muted-foreground">Real-time insights into strategy performance.</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={220}>
            <article className="flex h-full flex-col rounded-md border border-border bg-card p-8">
              <h3 className="font-display text-6xl md:text-7xl leading-none tracking-tight">99.9%</h3>
              <div className="mt-auto pt-10">
                <Eyebrow>Platform uptime</Eyebrow>
                <p className="mt-2 text-sm text-muted-foreground">Consistent performance when it matters most.</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={280}>
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden rounded-md bg-secondary md:h-full">
              <img src={precisionImg} alt="" loading="lazy" width={800} height={600} className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- *
 * Voices
 * ----------------------------------------------------------------- */

const voices = [
  {
    quote:
      "iTrade gave me back my time. I stopped managing spreadsheets and started managing strategies that actually work.",
    name: "Marcus Chen",
    role: "Algorithmic trader",
  },
  {
    quote:
      "The transparency here is different. I see exactly what my algorithms do, and I trust the system because I built it.",
    name: "Sarah Mitchell",
    role: "Portfolio manager",
  },
  {
    quote:
      "No complications, no middleman, no surprises. Just clean automation that works the way I need it to work.",
    name: "James Rodriguez",
    role: "Independent trader",
  },
];

function Voices() {
  return (
    <section className="border-b border-border/70 bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:py-32">
        <Reveal className="text-center">
          <Eyebrow>Voices</Eyebrow>
          <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1] tracking-tight">
            Real voices
          </h2>
          <p className="mt-5 text-sm md:text-base text-muted-foreground">What traders say.</p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {voices.map((v, i) => (
            <Reveal key={v.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-md border border-border bg-card p-8">
                <div className="flex gap-0.5 text-brand" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <svg key={k} viewBox="0 0 20 20" className="size-4 fill-current" aria-hidden>
                      <path d="M10 1.5l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 15.4 4.6 18.3l1-6.1L1.2 7.9l6.1-.9L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-6 text-base leading-relaxed text-foreground">
                  “{v.quote}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-8">
                  <div className="size-9 rounded-full bg-secondary border border-border" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- *
 * CTA
 * ----------------------------------------------------------------- */

function CTA() {
  return (
    <section className="border-b border-border/70 bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-28 md:py-40 text-center">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            Ready to take control.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-md text-base text-muted-foreground">
            Start automating your strategies today. No credit card required to begin.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PrimaryBtn to="/pricing">Start</PrimaryBtn>
            <GhostBtn to="/documentation">Learn</GhostBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- *
 * Page
 * ----------------------------------------------------------------- */

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Core />
        <Gain />
        <Steps />
        <Proof />
        <Voices />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

