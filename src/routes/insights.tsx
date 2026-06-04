import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "Insights — iTrade" }, { name: "description", content: "Notes on algorithmic risk, broker mechanics, and PAMM operations." }] }),
  component: Page,
});

export const posts = [
  { slug: "drawdown-isnt-risk", title: "Drawdown isn't risk — exposure is", date: "28 May 2026", tag: "Risk", read: "6 min", excerpt: "Most retail traders confuse peak-to-trough equity with the actual exposure their position size implies. Here's the distinction that matters." },
  { slug: "pamm-vs-copy-trading", title: "PAMM vs copy trading: the structural difference", date: "14 May 2026", tag: "PAMM", read: "8 min", excerpt: "Both let one trader manage capital for many — but the legal, fee, and execution mechanics differ in ways that change outcomes." },
  { slug: "vps-latency-myth", title: "The VPS latency myth in retail FX", date: "02 May 2026", tag: "Infra", read: "5 min", excerpt: "Sub-5ms is a marketing number. Here is what actually moves PnL on a mid-frequency EA." },
  { slug: "news-blackouts-2026", title: "News blackouts: what we changed in 2026", date: "19 Apr 2026", tag: "Product", read: "4 min", excerpt: "We extended the default blackout window from 8 to 15 minutes around high-impact prints. The reasoning, with data." },
  { slug: "hedging-on-mt5", title: "Hedging on MT5 — when it costs you", date: "07 Apr 2026", tag: "EA", read: "9 min", excerpt: "Hedging mode looks free on the surface. Swap, spread, and margin treatment say otherwise." },
];

function Page() {
  return (
    <PageShell eyebrow="Insights" title="Notes from the desk" lede="Research, post-mortems, and operational notes from the iTrade quant and infra teams.">
      <Section title="Latest">
        <ul className="divide-y divide-border">
          {posts.map(p => (
            <li key={p.slug}>
              <Link to="/insights/$slug" params={{ slug: p.slug }} className="group flex gap-4 py-5 items-start hover:bg-secondary/50 -mx-2 px-2 rounded-lg transition">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-brand-soft text-brand px-2 py-0.5">{p.tag}</span>
                    <span>{p.date}</span>
                    <span>· {p.read} read</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl text-foreground group-hover:text-brand transition">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.excerpt}</p>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-brand mt-2" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
