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

const qa: { q: string; a: string }[] = [
  {
    q: "Does iTrade ever hold my funds?",
    a: "No. Funds stay at your broker. The EA executes inside your MetaTrader terminal under a trade-only API; the PAMM module mirrors trades from a master account into yours without moving cash.",
  },
  {
    q: "What happens if I stop paying for the EA license?",
    a: "The EA disables new entries and stops managing existing ones. Open positions remain on your account; you can flatten them manually in MetaTrader at any time.",
  },
  {
    q: "Can I run the EA and allocate to PAMM at the same time?",
    a: "Yes, on separate accounts. You cannot run the EA on an account that is linked to the PAMM master — the broker enforces this restriction.",
  },
  {
    q: "Which timeframe and symbols does the EA trade?",
    a: "The default profile trades M15 on major FX pairs, XAU/USD, and BTC/USD. The symbol whitelist is editable per license.",
  },
  {
    q: "What drawdown should I expect?",
    a: "Historical maximum month-on-month drawdown on the public master is in the 8–12% range. Past performance is not a guarantee of future results; size your allocation accordingly.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. EA licenses cancel at the end of the current billing period. PAMM allocations can be withdrawn at any time, subject to your broker's settlement cycle.",
  },
  {
    q: "Do you offer a free trial?",
    a: "We offer a 14-day money-back window on the first month of any EA tier. The PAMM module charges nothing in months without new profit.",
  },
];

function FAQ() {
  return (
    <PageShell
      eyebrow="Support"
      title="Frequently asked questions"
      lede="If your question is not answered here, the documentation portal goes into more depth, and the contact page lists every channel we monitor."
    >
      <Section title="General">
        <dl className="divide-y divide-border">
          {qa.map(({ q, a }) => (
            <div key={q} className="py-5 grid md:grid-cols-3 gap-4">
              <dt className="font-semibold text-foreground md:col-span-1">{q}</dt>
              <dd className="md:col-span-2">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </PageShell>
  );
}
