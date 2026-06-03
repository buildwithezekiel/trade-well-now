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
      lede="Two products, two pricing models. EA licenses are a flat monthly fee tied to account count and aggregate balance. The PAMM module charges nothing unless you make new profit. There are no hidden fees, no charges for support, no upcharges for new EA versions within a major release line."
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
        <p className="text-xs">
          Annual billing saves two months (a 16.7% discount). Quarterly billing saves one month (an 8.3%
          discount). All prices exclude VAT where applicable; the dashboard shows the tax-inclusive total at
          checkout based on your billing country.
        </p>
      </Section>

      <Section title="PAMM module">
        <p>
          <strong>30%</strong> of net new profit above the prior high-water mark, calculated and deducted by
          the broker on the last trading day of each calendar month. No management fee, no entry or exit
          fee, no charge in a losing or sideways month. The 30% fee is shared between iTrade and the
          strategy operator under a private agreement; from your perspective it is a single line item on
          your broker statement.
        </p>
        <p>
          Worked example: you allocate 10,000 USD. The strategy returns +6% in month one (high-water mark
          rises to 10,600). At month-end the broker deducts 30% × 600 = 180 USD and you keep 420. In month
          two the strategy returns −4% (equity falls to 10,176). No fee. In month three the strategy returns
          +3% (equity 10,481), still below the watermark of 10,600 — no fee. Only profits above 10,600 in
          subsequent months are fee-eligible.
        </p>
      </Section>

      <Section title="What is included in every tier">
        <ul className="list-disc pl-5 space-y-2">
          <li>All future EA version updates within the major release line.</li>
          <li>Web dashboard for risk controls, equity monitoring, trade history, and the audit log.</li>
          <li>Email alerts for drawdown breaches, disconnects, equity-floor events, and license expiry.</li>
          <li>Access to the documentation portal, the community channel, and the public office-hours call.</li>
          <li>Self-service account closure with a full data export (CSV + JSON).</li>
        </ul>
      </Section>

      <Section title="What is not included">
        <ul className="list-disc pl-5 space-y-2">
          <li>VPS hosting (we can recommend providers; expect 15–30 USD/month for an adequate spec).</li>
          <li>Broker spreads, commissions, and swaps — those are paid to the broker, not to iTrade.</li>
          <li>Tax reporting. Statements are exportable; filing is your responsibility.</li>
          <li>Customisation of the strategy itself. The EA inputs are tunable within the documented ranges; bespoke versions are not offered.</li>
          <li>Phone support. Even on Elite, support is asynchronous — tickets, chat, and scheduled calls only.</li>
        </ul>
      </Section>

      <Section title="Payment methods">
        <p>
          Card payments are processed by Stripe (most regions), Paystack (Nigeria, Ghana, Kenya, South
          Africa), and Flutterwave (broader Africa). Crypto payments are accepted via a third-party on-ramp
          for USDT, USDC, and BTC; crypto payments are non-refundable once confirmed. Bank transfer is
          available for Elite tier and annual prepay only — contact sales for the wire instructions.
        </p>
      </Section>

      <Section title="The 14-day money-back window">
        <p>
          Every first subscription comes with a no-questions-asked refund window of 14 calendar days from
          the first successful payment. Cancel from the dashboard within the window and the full amount is
          returned via the original payment method within 7 business days. The window applies only to a
          customer's first subscription — subsequent subscriptions are billed under the standard
          end-of-period cancellation rule.
        </p>
      </Section>
    </PageShell>
  );
}
