import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — iTrade" },
      { name: "description", content: "Four EA license tiers plus a single performance-only fee for the PAMM module. No hidden costs, no charges below your high-water mark." },
      { property: "og:title", content: "Pricing — iTrade" },
      { property: "og:description", content: "Transparent tiered licensing for EA users, and a 30% performance-only fee for PAMM allocators." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  { name: "Starter",  price: "49",  accounts: "1 account",   cap: "10,000 USD aggregate",  best: "Trial a single account" },
  { name: "Standard", price: "129", accounts: "3 accounts",  cap: "50,000 USD aggregate",  best: "Multi-broker diversification" },
  { name: "Premium",  price: "299", accounts: "5 accounts",  cap: "250,000 USD aggregate", best: "Serious retail allocators" },
  { name: "Elite",    price: "699", accounts: "10 accounts", cap: "Unlimited",             best: "Family office / prop teams" },
];

function Pricing() {
  return (
    <PageShell
      eyebrow="Product"
      title="Pricing"
      lede="Two products, two pricing models. EA licenses are a flat monthly fee tied to account count and aggregate balance. The PAMM module charges nothing unless you make new profit."
    >
      <Section title="EA license tiers">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border">
            <thead className="bg-surface text-foreground">
              <tr>
                <th className="text-left p-3 font-semibold">Tier</th>
                <th className="text-left p-3 font-semibold">Monthly (USD)</th>
                <th className="text-left p-3 font-semibold">Accounts</th>
                <th className="text-left p-3 font-semibold">Balance cap</th>
                <th className="text-left p-3 font-semibold">Best for</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {tiers.map((t) => (
                <tr key={t.name} className="border-t border-border">
                  <td className="p-3 font-medium text-foreground">{t.name}</td>
                  <td className="p-3 font-mono">${t.price}</td>
                  <td className="p-3">{t.accounts}</td>
                  <td className="p-3">{t.cap}</td>
                  <td className="p-3">{t.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs">Annual billing saves two months. Quarterly billing saves one month.</p>
      </Section>

      <Section title="PAMM module">
        <p>
          <strong>30%</strong> of net new profit above the prior high-water mark, calculated and deducted by
          the broker on the last trading day of each calendar month. No management fee, no entry or exit fee,
          no charge in a losing or sideways month.
        </p>
      </Section>

      <Section title="What is included in every tier">
        <ul className="list-disc pl-5 space-y-2">
          <li>All future EA version updates within the major release line.</li>
          <li>Web dashboard for risk controls, equity monitoring, and trade history.</li>
          <li>Email alerts for drawdown breaches, disconnects, and equity-floor events.</li>
          <li>Access to the documentation portal and community channel.</li>
        </ul>
      </Section>

      <Section title="What is not included">
        <ul className="list-disc pl-5 space-y-2">
          <li>VPS hosting (we can recommend providers; expect 15–30 USD/month).</li>
          <li>Broker spreads, commissions, and swaps — those are paid to the broker, not to iTrade.</li>
          <li>Tax reporting. Statements are exportable; filing is your responsibility.</li>
        </ul>
      </Section>
    </PageShell>
  );
}
