import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — iTrade" },
      { name: "description", content: "Answers to common questions about custody, broker compatibility, drawdown, fees, and switching between EA and PAMM." },
      { property: "og:title", content: "FAQ — iTrade" },
      { property: "og:description", content: "Common questions about iTrade EA licensing, the PAMM module, custody, and risk." },
    ],
  }),
  component: FAQ,
});

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Custody and security",
    items: [
      {
        q: "Does iTrade ever hold my funds?",
        a: "No. Funds stay at your broker at all times. The EA executes inside your MetaTrader terminal under a trade-only API; the PAMM module mirrors trades from a master account into yours without ever moving cash. iTrade has no withdrawal permission on any account.",
      },
      {
        q: "What does iTrade actually have access to?",
        a: "For EA users: your MT4/MT5 account number, your broker name, the trade history the EA itself produced, and equity snapshots once per minute. We never see your broker login password. For PAMM users: the same telemetry plus the equity curve of the master account you allocated to.",
      },
      {
        q: "What happens if iTrade is acquired or shuts down?",
        a: "Open positions remain on your broker account. You can close them in MetaTrader manually at any time. The EA continues to run for the duration of its current license period even if the license server is unreachable, after which it will refuse to open new positions and stop managing existing ones.",
      },
    ],
  },
  {
    title: "Licensing and billing",
    items: [
      {
        q: "What happens if I stop paying for the EA license?",
        a: "The EA disables new entries within 24 hours of a failed renewal and stops managing existing positions after 7 days. Open positions remain on your account; you can flatten them manually in MetaTrader at any time. Your dashboard remains accessible in read-only mode for 90 days so you can export history.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. EA licenses cancel at the end of the current billing period. PAMM allocations can be withdrawn at any time, subject to your broker's settlement cycle (typically 1–3 business days).",
      },
      {
        q: "Do you offer a free trial?",
        a: "We offer a 14-day money-back window on the first month of any EA tier, no questions asked. The PAMM module charges nothing in months without new profit, which functions as an open-ended trial.",
      },
      {
        q: "Can I move a license between brokers?",
        a: "Yes. A license seat is bound to an account number; reassigning it to a new account at a different broker is a one-click action in the dashboard, with a 24-hour cooldown to prevent abuse.",
      },
    ],
  },
  {
    title: "Performance and risk",
    items: [
      {
        q: "Which timeframe and symbols does the EA trade?",
        a: "The default profile trades M15 on major FX pairs (EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD), XAU/USD, and BTC/USD. The symbol whitelist is editable per license. Higher tiers can request additional instruments subject to broker support.",
      },
      {
        q: "What drawdown should I expect?",
        a: "Historical maximum month-on-month drawdown on the public master is in the 8–12% range. The worst recorded peak-to-trough drawdown was 16.4% over 9 weeks in 2024. Past performance is not a guarantee of future results; size your allocation so that twice the historical worst case is still tolerable to you.",
      },
      {
        q: "Can I override the EA's decisions?",
        a: "Yes, but with caveats. You can pause the EA, flatten its positions, or change its risk envelope at any time from the dashboard. You cannot selectively cancel one of its open orders without also pausing the EA on that account — partial overrides confuse the position-management logic.",
      },
    ],
  },
  {
    title: "Combining products",
    items: [
      {
        q: "Can I run the EA and allocate to PAMM at the same time?",
        a: "Yes, on separate accounts. You cannot run the EA on an account that is linked to the PAMM master — the broker enforces this restriction and the iTrade dashboard will refuse to activate a license on a PAMM-linked account.",
      },
      {
        q: "Can I run multiple EAs on the same account?",
        a: "Only if they trade strictly disjoint symbols and use distinct magic numbers. Mixing iTrade's grid logic with another grid EA on the same symbol is unsafe and will void the 14-day money-back guarantee.",
      },
      {
        q: "Do you support copy-trading to a friend's account?",
        a: "Not as a standalone product. The PAMM module is the supported way to mirror trades to other accounts. We do not recommend MetaTrader's built-in Signals service for the iTrade strategy because the latency is too high for the grid logic to behave correctly.",
      },
    ],
  },
];

function FAQ() {
  return (
    <PageShell
      eyebrow="Support"
      title="Frequently asked questions"
      lede="If your question is not answered here, the documentation portal goes into more depth, and the contact page lists every channel we monitor. Answers below are reviewed quarterly; the last review was 26 May 2026."
    >
      {groups.map(({ title, items }) => (
        <Section key={title} title={title}>
          <dl className="divide-y divide-border">
            {items.map(({ q, a }) => (
              <div key={q} className="py-5 grid md:grid-cols-3 gap-4">
                <dt className="font-semibold text-foreground md:col-span-1">{q}</dt>
                <dd className="md:col-span-2">{a}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}

      <Section title="Still stuck?">
        <p>
          Open a ticket from inside the dashboard if you are signed in — it arrives with your account context
          attached and is usually resolved in a single round trip. Otherwise the channels on the
          <a href="/contact"> Contact</a> page are the right place to start.
        </p>
      </Section>
    </PageShell>
  );
}
