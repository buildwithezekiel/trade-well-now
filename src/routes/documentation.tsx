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
      lede="Practical guides for setting up the EA, linking a PAMM account, configuring risk, and operating the dashboard. Pages are versioned per EA release."
    >
      <Section title="Getting started">
        <ol className="list-decimal pl-5 space-y-2">
          <li>Create an iTrade account and verify your email.</li>
          <li>Choose a license tier or accept the PAMM agreement.</li>
          <li>Open or nominate an MT4/MT5 account at a supported broker.</li>
          <li>Download the EA installer or PAMM linker from the dashboard.</li>
          <li>Attach the EA to a chart, enter your license key, and enable AutoTrading.</li>
        </ol>
      </Section>

      <Section title="Installation">
        <p>
          Copy <code className="font-mono text-foreground">iTrade.ex5</code> into the
          <code className="font-mono text-foreground"> MQL5/Experts</code> directory of your terminal, restart
          MetaTrader, and drag the EA onto an M15 chart of any whitelisted symbol. You will be prompted for
          your license key on first attach. The EA writes its log to
          <code className="font-mono text-foreground"> MQL5/Files/itrade.log</code>.
        </p>
      </Section>

      <Section title="Configuration reference">
        <p>
          Every input on the EA panel mirrors a control in the web dashboard. Changes made in the dashboard
          push to the terminal within 30 seconds. Changes made directly in the terminal are read back by the
          dashboard on the next heartbeat. In a conflict, the dashboard value wins.
        </p>
        <p>The most commonly edited inputs:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>RiskPercent</strong> — risk per entry as a percentage of equity.</li>
          <li><strong>MaxDailyDD</strong> — daily drawdown ceiling, in percent of starting-day equity.</li>
          <li><strong>SymbolWhitelist</strong> — comma-separated list of allowed instruments.</li>
          <li><strong>NewsBlackoutMin</strong> — minutes of pause around red-folder events.</li>
        </ul>
      </Section>

      <Section title="Broker matrix">
        <p>
          Supported brokers are listed in the dashboard with a green / amber / red status indicating whether
          their server clock, hedging policy, and execution model are compatible. Amber means usable with
          caveats; red means we have observed material slippage or symbol-suffix issues.
        </p>
      </Section>

      <Section title="Operational notes">
        <ul className="list-disc pl-5 space-y-2">
          <li>Run on a VPS within ~100 ms of the broker. Home connections will degrade fills.</li>
          <li>Do not run other EAs on the same account unless they trade disjoint symbols.</li>
          <li>If the terminal is closed for more than an hour, review open positions before restarting.</li>
        </ul>
      </Section>
    </PageShell>
  );
}
