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
      lede="Read this page before subscribing to a license or allocating to a PAMM strategy. By creating an iTrade account and accepting our Terms of Service you confirm that you have read, understood, and accepted everything below."
    >
      <Section title="Plain-language summary">
        <p>
          Trading leveraged financial products is a risk-taking activity. You can lose money. You can lose all
          of the money you allocate. Past performance, including performance shown anywhere on this site, the
          dashboard, or in marketing material, is not a reliable indicator of future performance. Use only
          risk capital — money whose loss would not materially change your standard of living.
        </p>
      </Section>

      <Section title="Nature of the products traded">
        <p>
          The iTrade Expert Advisor and the PAMM master trade leveraged over-the-counter products including
          spot FX, gold, and crypto CFDs. Leverage magnifies both gains and losses, often dramatically. A 1%
          adverse move on a 1:30 leveraged position is a 30% loss on the margin posted; on a 1:500 position
          it is total loss of margin and beyond.
        </p>
        <p>
          It is possible to lose more than your initial deposit if your broker permits negative balances;
          even with negative balance protection (mandatory in some jurisdictions, optional in others), losses
          can be rapid and complete. Negative balance protection does not refund you — it caps your loss at
          zero, which is still a 100% loss of allocated capital.
        </p>
      </Section>

      <Section title="No guarantee of performance">
        <p>
          Historical results — back-tested, simulated, or live — are not a guarantee of future results.
          Strategy parameters, market regimes, broker execution quality, and liquidity all change over time.
          A strategy that has been profitable for years may produce a sustained drawdown without notice.
          Profitable months do not "owe" the strategy losing months; losing months do not "owe" the strategy
          profitable months. The future distribution of returns may differ from the past distribution.
        </p>
        <p>
          We publish historical equity curves because we believe transparency is preferable to opacity, not
          because they project the future. Investors should size allocations against a pessimistic view of
          the historical worst case, not against the average or the median.
        </p>
      </Section>

      <Section title="Operational and technical risk">
        <ul className="list-disc pl-5 space-y-2">
          <li>VPS outages, broker server outages, and internet failures may prevent the EA from managing open positions during the outage window.</li>
          <li>Broker re-quotes, slippage, and gap moves over weekends or news events can produce fills materially worse than the modeled price. The strategy assumes "typical" execution; atypical execution will degrade returns.</li>
          <li>Software bugs in the EA, the dashboard, or the broker bridge could in principle cause unintended trades. We mitigate this with server-side stop-losses and an external watchdog, but we cannot eliminate the possibility.</li>
          <li>Broker bankruptcy, fraud, or unilateral terms changes are tail risks that no software can mitigate. Choose a regulated broker, hold compensation-scheme coverage where available, and do not concentrate all capital at a single counterparty.</li>
          <li>Country-level events — capital controls, sanctions, payment-rail outages — can prevent withdrawal regardless of strategy performance.</li>
        </ul>
      </Section>

      <Section title="Suitability">
        <p>
          Algorithmic trading is not suitable for everyone. Only risk capital you can afford to lose entirely
          should be allocated. If you are unsure whether these products are appropriate for you, seek
          independent financial advice from a licensed professional in your jurisdiction before subscribing
          or allocating. iTrade does not provide personalised investment advice and the existence of this
          platform is not an endorsement of leveraged trading for your specific circumstances.
        </p>
        <p>
          Specifically, leveraged trading is generally unsuitable for retirement-only capital, for funds
          earmarked for foreseeable expenses within 12 months, and for capital held in trust or on behalf of
          beneficiaries who have not themselves accepted the risk.
        </p>
      </Section>

      <Section title="Tax and regulation">
        <p>
          Trading profits are taxable in most jurisdictions. The treatment varies — capital gains, income,
          mark-to-market, or some combination — and depends on your residency, your broker's domicile, and
          the product traded. iTrade does not provide tax advice. Statements are exportable from the
          dashboard; filing is your responsibility.
        </p>
        <p>
          Some jurisdictions restrict or prohibit retail access to leveraged FX and CFD products entirely. It
          is your responsibility to verify that you are permitted to use these products before subscribing.
          iTrade is not available to residents of jurisdictions where the underlying broker services are
          prohibited.
        </p>
      </Section>

      <Section title="Regulatory status of iTrade">
        <p>
          iTrade is a software provider. It is not a broker, not a custodian, not an investment adviser, and
          not a fund manager. It does not solicit deposits, hold client money, guarantee any return, or take
          discretionary trading decisions on behalf of clients. Where the dashboard refers to "your
          strategy", that refers to the configuration you have chosen for software running on your own
          terminal — iTrade is not managing your capital in a fiduciary sense.
        </p>
      </Section>

      <Section title="If you have already started and want to stop">
        <p>
          Pause the EA from the dashboard or close MetaTrader to halt new entries. Flatten open positions
          manually in MetaTrader if you want immediate exposure removal. For PAMM allocations, contact your
          broker's PAMM desk to revoke the link, which will flatten your share of the master's positions at
          market. None of these actions require iTrade's involvement.
        </p>
      </Section>
    </PageShell>
  );
}
