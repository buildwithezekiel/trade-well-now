import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/ea-licensing")({
  head: () => ({
    meta: [
      { title: "EA Licensing — iTrade" },
      { name: "description", content: "License iTrade Expert Advisors and run them on your own MT4/MT5 brokerage accounts. Tiered account limits, balance caps, and risk controls." },
      { property: "og:title", content: "EA Licensing — iTrade" },
      { property: "og:description", content: "Run iTrade Expert Advisors on your own MT4/MT5 accounts under a tiered license." },
    ],
  }),
  component: EALicensing,
});

function EALicensing() {
  return (
    <PageShell
      eyebrow="Product"
      title="EA Licensing"
      lede="Run iTrade Expert Advisors on your own MT4 or MT5 brokerage accounts. You keep custody of your funds; the EA executes inside your terminal under a trade-only API."
    >
      <Section title="How the license works">
        <p>
          A license binds the EA to your account number(s) and to the balance ceiling of your subscription tier.
          When you log into MetaTrader, the EA checks the license server, validates the account, and begins
          monitoring the market. No license, no execution.
        </p>
        <p>
          Licenses are issued per user, not per machine. You can move a slot between accounts of the same
          broker, and you can run the EA on a personal VPS or on the iTrade-hosted VPS without an extra fee.
        </p>
      </Section>

      <Section title="What you need before activating">
        <ul className="list-disc pl-5 space-y-2">
          <li>An MT4 or MT5 account at a supported broker (see Documentation for the broker matrix).</li>
          <li>Hedging mode enabled on the account (required for the grid logic).</li>
          <li>Minimum balance of 500 USD-equivalent per account, regardless of tier.</li>
          <li>A VPS or always-on machine within 100 ms of the broker's MT server.</li>
        </ul>
      </Section>

      <Section title="Tier capabilities">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border">
            <thead className="bg-surface text-foreground">
              <tr>
                <th className="text-left p-3 font-semibold">Tier</th>
                <th className="text-left p-3 font-semibold">Accounts</th>
                <th className="text-left p-3 font-semibold">Aggregate balance</th>
                <th className="text-left p-3 font-semibold">Support</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-t border-border"><td className="p-3">Starter</td><td className="p-3">1</td><td className="p-3">10,000 USD</td><td className="p-3">Email, 48 h</td></tr>
              <tr className="border-t border-border"><td className="p-3">Standard</td><td className="p-3">3</td><td className="p-3">50,000 USD</td><td className="p-3">Email, 24 h</td></tr>
              <tr className="border-t border-border"><td className="p-3">Premium</td><td className="p-3">5</td><td className="p-3">250,000 USD</td><td className="p-3">Priority, 8 h</td></tr>
              <tr className="border-t border-border"><td className="p-3">Elite</td><td className="p-3">10</td><td className="p-3">Unlimited</td><td className="p-3">Dedicated manager</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Risk controls available in the dashboard">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Max daily drawdown</strong> — kills new orders and optionally flattens open positions when breached.</li>
          <li><strong>Equity floor</strong> — hard stop at an absolute equity value per account.</li>
          <li><strong>News blackout</strong> — pauses entries around high-impact macro releases.</li>
          <li><strong>Symbol whitelist</strong> — restricts the EA to the instruments you authorize.</li>
        </ul>
      </Section>

      <Section title="What it does not do">
        <p>
          The EA does not request withdrawal permissions. It cannot move money between accounts, change your
          broker password, or trade against a different account holder's funds. If a broker offers a separate
          "investor" read-only password, that is what we recommend giving to anyone you grant view access to.
        </p>
      </Section>
    </PageShell>
  );
}
