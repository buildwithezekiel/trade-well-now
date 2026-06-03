import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Documentation — iTrade" },
      { name: "description", content: "Setup, configuration, and operational guides for the iTrade EA, the PAMM module, and the management dashboard." },
      { property: "og:title", content: "Documentation — iTrade" },
      { property: "og:description", content: "Installation, configuration, and operational guides for the iTrade platform." },
    ],
  }),
  component: Documentation,
});

function Documentation() {
  return (
    <PageShell
      eyebrow="Support"
      title="Documentation"
      lede="Practical, opinionated guides for setting up the EA, linking a PAMM account, configuring risk, and operating the dashboard. Pages are versioned per EA release; the version selector lives in the top-right of every article."
    >
      <Section title="Before you start">
        <p>
          The iTrade platform is a thin coordination layer on top of MetaTrader. It does not replace your
          broker, your terminal, or your risk discipline. Everything documented here assumes you already have
          a funded MT4 or MT5 account at a regulated broker, a stable hosting environment within roughly
          100 ms of that broker's server, and a working understanding of leveraged trading.
        </p>
        <p>
          If any of those three are missing, stop and address them first. The most common failure mode for new
          users is not a misconfigured EA — it is running on a residential connection with intermittent
          packet loss, where the dashboard sees disconnect events every few minutes and the EA cannot manage
          its positions reliably.
        </p>
      </Section>

      <Section title="Getting started in eight steps">
        <ol className="list-decimal pl-5 space-y-2">
          <li>Create an iTrade account and verify your email.</li>
          <li>Complete the EA onboarding form (broker, account size, risk profile).</li>
          <li>Choose a license tier that covers your account count and aggregate balance.</li>
          <li>Open or nominate an MT4/MT5 account at a supported broker.</li>
          <li>Download the EA installer from the dashboard. The download is signed; verify the SHA-256.</li>
          <li>Copy <code className="font-mono text-foreground">iTrade.ex5</code> into <code className="font-mono text-foreground">MQL5/Experts</code> and restart MetaTrader.</li>
          <li>Attach the EA to an M15 chart of any whitelisted symbol, paste your license key, enable AutoTrading.</li>
          <li>Open the dashboard, confirm the heartbeat is green, and set your risk envelope.</li>
        </ol>
        <p>
          The whole sequence usually takes 20–40 minutes the first time. From the second account onward it is
          closer to five minutes, because the license key is shared and the risk envelope can be cloned from
          an existing account.
        </p>
      </Section>

      <Section title="Installation in detail">
        <p>
          Copy <code className="font-mono text-foreground">iTrade.ex5</code> into the
          <code className="font-mono text-foreground"> MQL5/Experts</code> directory of your terminal
          (<code className="font-mono text-foreground">MQL4/Experts</code> for MT4 users), restart MetaTrader,
          and drag the EA onto an M15 chart of any whitelisted symbol. You will be prompted for your license
          key on first attach. The EA writes its log to <code className="font-mono text-foreground">MQL5/Files/itrade.log</code>
          and rotates the file every 24 hours; 30 days of logs are retained on disk.
        </p>
        <p>
          MetaTrader must be set to allow algorithmic trading globally (the "AutoTrading" toolbar button must
          be highlighted green) and per-EA on the "Common" tab of the EA input dialog. If either is off, the
          dashboard will show the account as <em>Connected · Not authorized</em> and no orders will be placed.
        </p>
      </Section>

      <Section title="Configuration reference">
        <p>
          Every input on the EA panel mirrors a control in the web dashboard. Changes made in the dashboard
          push to the terminal within 30 seconds via the heartbeat channel. Changes made directly in the
          terminal are read back by the dashboard on the next heartbeat. In a conflict, the dashboard value
          wins — this is intentional, so that revoking access to a compromised terminal does not require you
          to log into MetaTrader.
        </p>
        <p>The most commonly edited inputs:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>RiskPercent</strong> — risk per entry as a percentage of equity. Default 0.5%.</li>
          <li><strong>MaxDailyDD</strong> — daily drawdown ceiling, in percent of starting-day equity. Default 4%.</li>
          <li><strong>EquityFloor</strong> — hard stop at an absolute equity value per account. Default disabled.</li>
          <li><strong>SymbolWhitelist</strong> — comma-separated list of allowed instruments. Empty list disables trading.</li>
          <li><strong>NewsBlackoutMin</strong> — minutes of pause around red-folder events. Default 15.</li>
          <li><strong>MaxConcurrentPositions</strong> — cap on simultaneously open positions per symbol. Default 3.</li>
          <li><strong>WeekendFlatten</strong> — close all positions before Friday close. Default true for crypto, false for FX.</li>
        </ul>
        <p>
          Defaults are conservative and tuned for a 5,000–10,000 USD account on a major broker. They are not
          the highest-return configuration; they are the configuration that keeps a new user out of trouble
          while they build intuition.
        </p>
      </Section>

      <Section title="Broker matrix">
        <p>
          Supported brokers are listed in the dashboard with a green / amber / red status indicating whether
          their server clock, hedging policy, and execution model are compatible with the EA. Green means
          fully supported. Amber means usable with caveats — typically an unusual symbol suffix
          (<code className="font-mono text-foreground">EURUSD.m</code> vs <code className="font-mono text-foreground">EURUSD</code>)
          or a slightly drifting server clock. Red means we have observed material slippage, frequent
          requotes, or restrictive hedging rules and the EA will refuse to attach.
        </p>
        <p>
          We do not maintain a "recommended" broker list on this page because broker quality varies by region
          and by year. The dashboard's live matrix is always the source of truth.
        </p>
      </Section>

      <Section title="Operational notes and gotchas">
        <ul className="list-disc pl-5 space-y-2">
          <li>Run on a VPS within ~100 ms of the broker. Home connections will degrade fills, especially around news.</li>
          <li>Do not run other EAs on the same account unless they trade strictly disjoint symbols and disjoint magic numbers.</li>
          <li>If the terminal is closed for more than an hour, the EA logs a <em>session-gap</em> event and refuses to open new positions until a human acknowledges it in the dashboard. Review open positions before acknowledging.</li>
          <li>Daylight-saving transitions occasionally desync the EA's internal session clock for a few hours. The dashboard flags this; the EA falls back to a conservative profile until the next broker server restart.</li>
          <li>Broker maintenance windows (typically Saturday early morning UTC) will register as a disconnect. This is expected and not an alert condition.</li>
        </ul>
      </Section>

      <Section title="Upgrading the EA">
        <p>
          New EA versions are published in the dashboard with full changelogs and a recommended upgrade
          window. Minor patches (x.y.<strong>z</strong>) can be hot-swapped during market hours; minor
          versions (x.<strong>y</strong>.0) should be applied at the weekend; major versions
          (<strong>x</strong>.0.0) are opt-in for 30 days before becoming the default. The dashboard will
          warn you 14 days before a major version becomes mandatory.
        </p>
      </Section>

      <Section title="Where to get help">
        <p>
          Search the documentation portal first, then the community channel, then open a support ticket from
          inside the dashboard. Tickets opened from the dashboard arrive with your account context attached,
          which usually saves a round trip. Response times are listed on the <a href="/contact">Contact</a>
          page and vary by tier.
        </p>
      </Section>
    </PageShell>
  );
}
