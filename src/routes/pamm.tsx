import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/pamm")({
  head: () => ({
    meta: [
      { title: "PAMM Module — iTrade" },
      { name: "description", content: "Allocate to a managed PAMM strategy with performance-only fees. No custody transfer, no lock-up, transparent equity reporting." },
      { property: "og:title", content: "PAMM Module — iTrade" },
      { property: "og:description", content: "Hands-free allocation to a vetted PAMM strategy with a 30% performance fee and no management fee." },
    ],
  }),
  component: PAMM,
});

function PAMM() {
  return (
    <PageShell
      eyebrow="Product"
      title="PAMM Module"
      lede="A hands-free allocation channel for investors who would rather not run the EA themselves. Funds remain in your own broker account and are linked to a master strategy via PAMM. One fee, charged only on new profit, calculated and deducted by the broker — not by us."
    >
      <Section title="What PAMM is, plainly">
        <p>
          PAMM stands for Percentage Allocation Management Module. It is a feature offered by the broker, not
          by iTrade. The broker creates a virtual link between a master account (run by iTrade) and the
          investor accounts (yours), and any trade placed on the master is mirrored proportionally to every
          linked investor. Your equity goes up or down with the master's performance, scaled to your
          allocation.
        </p>
        <p>
          The crucial point is that your money never leaves your own broker account. PAMM is an allocation
          ledger, not a custody arrangement. iTrade has trade-only authorization on the master and zero
          authorization on yours.
        </p>
      </Section>

      <Section title="How allocation works">
        <p>
          You open an account at one of the recommended brokers, sign the broker's PAMM agreement, and link
          your account to the iTrade master from inside the broker's portal. Trades placed on the master are
          mirrored proportionally to your equity within the same tick. Withdrawals and deposits remain under
          your control at the broker level — adding capital scales your future allocation up; withdrawing
          scales it down.
        </p>
        <p>
          The minimum allocation is 1,000 USD-equivalent. There is no maximum, but the broker may have its
          own per-investor cap depending on jurisdiction. The link can be paused or revoked at any time from
          the broker's portal; pausing stops new trades from mirroring while leaving existing positions open,
          revoking flattens your share of the master's positions immediately.
        </p>
      </Section>

      <Section title="Fee structure">
        <p>
          One fee: <strong>30% of new high-water-mark profit</strong>, charged at the end of each calendar
          month by the broker and paid out automatically to iTrade. There is no management fee, no entry fee,
          no exit fee, and no fee while the strategy is below its prior peak. If you joined at an equity of
          10,000 USD and the strategy drops to 9,200 USD before recovering to 10,500 USD, the fee is charged
          on the 500 USD above the prior peak, not on the full 1,300 USD recovery.
        </p>
        <p>
          The high-water mark is per-investor, not per-master. A new allocation begins at its own watermark
          and is not "behind" the historical performance of the master. This means a new investor cannot be
          charged a fee for profits they were not present for.
        </p>
      </Section>

      <Section title="Reporting and transparency">
        <ul className="list-disc pl-5 space-y-2">
          <li>Live equity curve of the master account, updated every 5 minutes in the dashboard.</li>
          <li>Per-trade history exported as CSV from the dashboard, including all opens, closes, and modifications.</li>
          <li>Monthly statement issued by the broker, independent of iTrade — this is the legal record of your equity and fees.</li>
          <li>Audit log of every fee deduction and every parameter change on the master.</li>
          <li>Quarterly written commentary from the strategy operator covering the regime, the trades that mattered, and any rule changes planned.</li>
        </ul>
      </Section>

      <Section title="Minimums and constraints">
        <ul className="list-disc pl-5 space-y-2">
          <li>Minimum allocation: 1,000 USD-equivalent. Below this the broker's per-trade lot rounding starts to materially distort returns.</li>
          <li>No lock-up. You may withdraw at any time, subject to the broker's settlement cycle (typically T+1 to T+3).</li>
          <li>Allocations are not eligible for the EA license tiers; the two products are independent and cannot be combined on the same account.</li>
          <li>The PAMM master trades the same instruments as the EA: major FX, XAU/USD, and BTC/USD. Symbol coverage may differ slightly by broker.</li>
        </ul>
      </Section>

      <Section title="Historical performance, in plain numbers">
        <p>
          The public master has run continuously since January 2023. Over that period it has produced an
          annualized return in the high-twenties percent range, with the largest peak-to-trough drawdown of
          16.4% in mid-2024. Monthly returns are positive roughly two months out of three. None of these
          numbers are a forecast.
        </p>
        <p>
          We publish the full equity curve, monthly bars, and an interactive drawdown chart in the dashboard.
          We do not publish back-tested or simulated numbers on this page because they cannot be verified by
          a third party and we do not believe they are useful for sizing real allocations.
        </p>
      </Section>

      <Section title="Who PAMM is not for">
        <p>
          If you want to override entries, change risk per trade, or trade additional manual strategies on
          the same account, do not allocate to the PAMM. Use the EA license instead, which gives you direct
          control of the parameters on accounts you own. PAMM is also a poor fit for investors who need
          guaranteed monthly liquidity — settlement can take a few days during weekends or broker maintenance
          windows.
        </p>
        <p>
          Finally, PAMM is not a fixed-income product. There are months with no profit, months with losses,
          and stretches where the strategy is flat for weeks at a time. If a single negative month would make
          you withdraw, the strategy will not work for you, because you will exit at the bottom of every
          drawdown.
        </p>
      </Section>
    </PageShell>
  );
}
