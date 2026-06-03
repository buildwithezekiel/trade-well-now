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
      lede="Run iTrade Expert Advisors on your own MT4 or MT5 brokerage accounts. You keep custody of your funds; the EA executes inside your terminal under a trade-only API. One subscription per account size band, scalable up to dozens of accounts under a single seat."
    >
      <Section title="The mental model">
        <p>
          Think of an iTrade license as a key, not a service. The key unlocks the EA to run inside your
          MetaTrader terminal, on the accounts you nominate, up to the aggregate balance your tier permits.
          The license server's job is narrow: validate the key, count the seats, and revoke when the
          subscription lapses. Everything else — the trading, the risk management, the bookkeeping — happens
          locally on your machine and at your broker.
        </p>
        <p>
          This matters because it changes the failure modes you have to plan for. If our license server is
          unreachable, the EA continues to run on its last-known license for up to 72 hours. If our entire
          platform goes offline, your open positions remain on your broker account and you can manage them in
          MetaTrader exactly as you would manage any manual position.
        </p>
      </Section>

      <Section title="How the license works">
        <p>
          A license binds the EA to your account number(s) and to the balance ceiling of your subscription
          tier. When you log into MetaTrader, the EA checks the license server, validates the account,
          confirms the aggregate balance across all licensed accounts is within your tier's cap, and begins
          monitoring the market. No license, no execution.
        </p>
        <p>
          Licenses are issued per user, not per machine. You can move a slot between accounts of the same
          broker (or different brokers) with a 24-hour cooldown, and you can run the EA on a personal VPS or
          on the iTrade-hosted VPS without an extra license fee. If you exceed the aggregate balance cap
          mid-month due to profits, the EA stops opening new positions but continues to manage existing ones
          until you upgrade.
        </p>
      </Section>

      <Section title="What you need before activating">
        <ul className="list-disc pl-5 space-y-2">
          <li>An MT4 or MT5 account at a supported broker (see Documentation for the broker matrix).</li>
          <li>Hedging mode enabled on the account (required for the grid logic; not available on US-regulated brokers).</li>
          <li>Minimum balance of 500 USD-equivalent per account, regardless of tier.</li>
          <li>A VPS or always-on machine within 100 ms of the broker's MT server.</li>
          <li>The account must allow algorithmic trading. Some prop firms disable this on funded accounts.</li>
          <li>Account leverage of at least 1:30. The EA refuses to attach to accounts with lower leverage because position sizing becomes too coarse.</li>
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
                <th className="text-left p-3 font-semibold">Symbol whitelist</th>
                <th className="text-left p-3 font-semibold">Support</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-t border-border"><td className="p-3 font-medium text-foreground">Starter</td><td className="p-3">1</td><td className="p-3">10,000 USD</td><td className="p-3">Majors only</td><td className="p-3">Email, 48 h</td></tr>
              <tr className="border-t border-border"><td className="p-3 font-medium text-foreground">Standard</td><td className="p-3">3</td><td className="p-3">50,000 USD</td><td className="p-3">Majors + gold</td><td className="p-3">Email, 24 h</td></tr>
              <tr className="border-t border-border"><td className="p-3 font-medium text-foreground">Premium</td><td className="p-3">5</td><td className="p-3">250,000 USD</td><td className="p-3">Majors + metals + crypto</td><td className="p-3">Priority, 8 h</td></tr>
              <tr className="border-t border-border"><td className="p-3 font-medium text-foreground">Elite</td><td className="p-3">10</td><td className="p-3">Unlimited</td><td className="p-3">Full + custom requests</td><td className="p-3">Dedicated manager</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs">Accounts and aggregate balance are hard caps. The EA refuses to attach beyond the seat count and stops opening new positions beyond the balance cap.</p>
      </Section>

      <Section title="Risk controls available in the dashboard">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Max daily drawdown</strong> — kills new orders and optionally flattens open positions when breached. Resets at broker midnight.</li>
          <li><strong>Equity floor</strong> — hard stop at an absolute equity value per account. The EA flattens and refuses to re-enter until manually unlocked.</li>
          <li><strong>News blackout</strong> — pauses entries around high-impact macro releases. Sources: Forex Factory red-folder calendar, updated nightly.</li>
          <li><strong>Symbol whitelist</strong> — restricts the EA to the instruments you authorize. Empty list disables trading entirely.</li>
          <li><strong>Max concurrent positions</strong> — per-symbol cap that overrides the strategy default.</li>
          <li><strong>Weekend flatten</strong> — closes all positions before Friday close. Recommended for crypto accounts, optional for FX.</li>
          <li><strong>Slippage tolerance</strong> — rejects fills more than N pips away from the requested price.</li>
        </ul>
        <p>
          Every control is logged with the user who changed it, the previous value, and the new value. The
          audit log is exportable as CSV from the dashboard and is retained for the life of the account.
        </p>
      </Section>

      <Section title="What it does not do">
        <p>
          The EA does not request withdrawal permissions on your broker account. It cannot move money between
          accounts, change your broker password, or trade against a different account holder's funds. If a
          broker offers a separate "investor" read-only password, that is what we recommend giving to anyone
          you grant view access to.
        </p>
        <p>
          The EA also does not trade outside its symbol whitelist, does not place positions larger than the
          configured risk percent, and does not chase losses by doubling down beyond the configured grid
          width. Each of those constraints is enforced both in the EA itself and on the broker side via
          server-side stop-loss orders, so a corrupted local configuration cannot bypass them.
        </p>
      </Section>

      <Section title="Common pitfalls">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Running on a home PC.</strong> The EA needs sub-second responsiveness. Even a brief Wi-Fi blip during a news event can leave a position unhedged.</li>
          <li><strong>Setting risk too high too fast.</strong> 0.5% risk per entry is the default for a reason. New users who set 2% or 5% will see the historical drawdown roughly quadrupled.</li>
          <li><strong>Running multiple EAs on the same symbol.</strong> Conflicting orders on the same symbol confuse the grid logic and produce unintended hedges.</li>
          <li><strong>Ignoring the broker matrix.</strong> An amber-status broker can still work, but you should accept the documented caveats first.</li>
        </ul>
      </Section>
    </PageShell>
  );
}
