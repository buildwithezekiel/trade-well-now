import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/risk-disclaimer")({
  head: () => ({
    meta: [
      { title: "Risk Disclaimer — iTrade" },
      { name: "description", content: "Trading leveraged products carries substantial risk of loss. Read the full iTrade risk disclosure before using the EA or allocating to a PAMM strategy." },
      { property: "og:title", content: "Risk Disclaimer — iTrade" },
      { property: "og:description", content: "Full risk disclosure for users of the iTrade EA and PAMM module." },
    ],
  }),
  component: Risk,
});

function Risk() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Risk Disclaimer"
      lede="Read this page before subscribing to a license or allocating to a PAMM strategy. By using iTrade you confirm that you have read and understood it."
    >
      <Section title="Nature of the products traded">
        <p>
          The iTrade Expert Advisor and the PAMM master trade leveraged over-the-counter products including
          spot FX, gold, and crypto CFDs. Leverage magnifies both gains and losses. It is possible to lose
          more than your initial deposit if your broker permits negative balances; even with negative balance
          protection, losses can be rapid and complete.
        </p>
      </Section>

      <Section title="No guarantee of performance">
        <p>
          Historical results — back-tested, simulated, or live — are not a guarantee of future results.
          Strategy parameters, market regimes, broker execution, and liquidity all change over time. A
          strategy that has been profitable for years may produce a sustained drawdown without notice.
        </p>
      </Section>

      <Section title="Operational and technical risk">
        <ul className="list-disc pl-5 space-y-2">
          <li>VPS outages, broker server outages, and internet failures may prevent the EA from managing open positions.</li>
          <li>Broker re-quotes, slippage, and gap moves over weekends or news events can produce fills materially worse than the modeled price.</li>
          <li>Broker bankruptcy or fraud is a tail risk that no software can mitigate. Choose a regulated broker and size accordingly.</li>
        </ul>
      </Section>

      <Section title="Suitability">
        <p>
          Algorithmic trading is not suitable for everyone. Only risk capital you can afford to lose entirely
          should be allocated. If you are unsure whether these products are appropriate for you, seek
          independent financial advice from a licensed professional in your jurisdiction.
        </p>
      </Section>

      <Section title="Regulatory status">
        <p>
          iTrade is a software provider. It is not a broker, not a custodian, not an investment adviser, and
          not a fund manager. It does not solicit deposits, hold client money, or guarantee any return.
        </p>
      </Section>
    </PageShell>
  );
}
