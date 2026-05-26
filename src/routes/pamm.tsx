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
      lede="A hands-free allocation channel for investors who would rather not run the EA themselves. Funds remain in your own broker account and are linked to a master strategy via PAMM."
    >
      <Section title="How allocation works">
        <p>
          You open an account at one of the recommended brokers, sign the broker's PAMM agreement, and link
          your account to the iTrade master. Trades placed on the master are mirrored proportionally to your
          equity. Withdrawals and deposits remain under your control at the broker level.
        </p>
      </Section>

      <Section title="Fee structure">
        <p>
          One fee: <strong>30% of new high-water-mark profit</strong>, charged at the end of each calendar
          month by the broker and paid out automatically. There is no management fee, no entry fee, no exit
          fee, and no fee while the strategy is below its prior peak.
        </p>
      </Section>

      <Section title="Reporting and transparency">
        <ul className="list-disc pl-5 space-y-2">
          <li>Live equity curve of the master account, updated every 5 minutes.</li>
          <li>Per-trade history exported as CSV from the dashboard.</li>
          <li>Monthly statement issued by the broker, independent of iTrade.</li>
          <li>Audit log of every fee deduction and every parameter change on the master.</li>
        </ul>
      </Section>

      <Section title="Minimums and constraints">
        <ul className="list-disc pl-5 space-y-2">
          <li>Minimum allocation: 1,000 USD-equivalent.</li>
          <li>No lock-up. You may withdraw at any time, subject to the broker's settlement cycle.</li>
          <li>Allocations are not eligible for the EA license tiers; the two products are independent.</li>
        </ul>
      </Section>

      <Section title="Who PAMM is not for">
        <p>
          If you want to override entries, change risk per trade, or trade additional manual strategies on the
          same account, do not allocate to the PAMM. Use the EA license instead, which gives you direct
          control of the parameters on accounts you own.
        </p>
      </Section>
    </PageShell>
  );
}
