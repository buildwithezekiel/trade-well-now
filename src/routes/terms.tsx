import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — iTrade" },
      { name: "description", content: "The agreement between iTrade and its users covering licensing, acceptable use, billing, liability, and termination." },
      { property: "og:title", content: "Terms of Service — iTrade" },
      { property: "og:description", content: "Terms governing use of the iTrade EA, PAMM module, and dashboard." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      lede="Last updated 26 May 2026. By creating an iTrade account you accept the terms below. These terms form a contract between you and iTrade Operations Ltd. If you do not agree, do not create an account, do not subscribe, and do not allocate to the PAMM master."
    >
      <Section title="1. The service">
        <p>
          iTrade provides software — the iTrade Expert Advisor for MetaTrader 4 and 5, the iTrade management
          dashboard, and supporting APIs — and an introduction to a PAMM strategy operated on third-party
          broker infrastructure. iTrade is not a broker, not a custodian, not an investment adviser, and
          does not hold client funds or take discretionary trading decisions on behalf of clients.
        </p>
        <p>
          Where the service refers to "your strategy" or "your account", that refers to a configuration of
          software running on your own MetaTrader terminal and to a brokerage account in your own name, not
          to an asset held by iTrade on your behalf.
        </p>
      </Section>

      <Section title="2. License grant">
        <p>
          Subject to your active subscription and your compliance with these terms, we grant you a
          non-exclusive, non-transferable, revocable license to use the EA on the number of accounts and up
          to the aggregate balance permitted by your tier, and to use the dashboard for the purposes for
          which it is designed. The license is revoked automatically when you cancel, when you breach these
          terms, when payment fails for more than 14 days, or when applicable law requires us to do so.
        </p>
        <p>
          Nothing in this license transfers ownership of the EA, the dashboard, or any related intellectual
          property to you. Reverse engineering, decompiling, redistribution, and resale are all prohibited.
        </p>
      </Section>

      <Section title="3. Eligibility">
        <p>
          You must be at least 18 years old, legally capable of forming a binding contract in your
          jurisdiction, and not located in a country or region against which the United Kingdom, the European
          Union, or the United States maintain comprehensive trade sanctions. You must not be on any
          consolidated sanctions list maintained by HM Treasury, the EU, or OFAC.
        </p>
      </Section>

      <Section title="4. Acceptable use">
        <ul className="list-disc pl-5 space-y-2">
          <li>Do not redistribute, decompile, reverse-engineer, or resell the EA or any part of the dashboard.</li>
          <li>Do not share your license key. Keys are bound to user identity, not to a machine.</li>
          <li>Do not use the service to evade broker terms, sanctions regimes, or applicable law.</li>
          <li>Do not attempt to defeat the license server, the seat counter, or the balance cap by running modified binaries.</li>
          <li>Do not use the platform to launder funds, evade taxes, or facilitate any criminal activity.</li>
          <li>Do not abuse the API or the dashboard with automated traffic beyond the rate limits published in the documentation portal.</li>
          <li>Do not harass our staff or other users in any channel we operate.</li>
        </ul>
      </Section>

      <Section title="5. Billing">
        <p>
          Subscriptions renew automatically at the end of each billing period using the payment method on
          file. Prices are in USD; conversions to local currency are performed by your card issuer or your
          chosen payment processor. We may change prices on 60 days' notice; the new price applies from the
          first renewal after the notice period.
        </p>
        <p>
          You may cancel at any time; cancellation takes effect at the end of the current period and we do
          not pro-rate refunds outside of the 14-day money-back window on a first subscription. For PAMM
          allocations the broker collects and remits the performance fee directly; we have no role in
          processing PAMM fees.
        </p>
      </Section>

      <Section title="6. Disclaimer of warranty">
        <p>
          The service is provided on an "as is" and "as available" basis. We do not warrant that the EA will
          be profitable, that the dashboard will be uninterrupted or error-free, that broker execution will
          match modeled prices, or that the service will meet any specific user's requirements. See the
          <a href="/risk-disclaimer"> Risk Disclaimer</a> for further detail on trading-specific risks.
        </p>
      </Section>

      <Section title="7. Limitation of liability">
        <p>
          To the maximum extent permitted by law, iTrade's aggregate liability arising out of or related to
          the service — whether in contract, tort, or any other theory — is limited to the fees you paid in
          the 12 months preceding the event giving rise to the claim. We are not liable for trading losses,
          lost profits, lost data, lost goodwill, business interruption, or any other consequential, indirect,
          or punitive damages. Nothing in this section limits liability for death or personal injury caused
          by negligence, for fraud, or for any other liability that cannot lawfully be limited.
        </p>
      </Section>

      <Section title="8. Indemnity">
        <p>
          You agree to indemnify iTrade against any claim brought by a third party arising from your breach
          of these terms, your misuse of the service, your violation of any law, or your infringement of any
          third-party right, including reasonable legal fees. We will tell you promptly of any such claim
          and give you reasonable opportunity to take over the defence.
        </p>
      </Section>

      <Section title="9. Termination">
        <p>
          We may suspend or terminate access immediately for breach of these terms, for non-payment, for
          fraud, or where required by law, by court order, or by a broker partner. On termination your right
          to use the EA and the dashboard ceases; open positions on your broker account remain with you and
          can be managed in MetaTrader. You may terminate at any time by cancelling in the dashboard.
        </p>
      </Section>

      <Section title="10. Changes to the service">
        <p>
          We may add, remove, or modify features of the service from time to time. Material reductions in
          functionality during a paid term are communicated in writing with at least 30 days' notice; you
          may cancel and receive a pro-rated refund of the unused period if the change materially diminishes
          the value of your subscription.
        </p>
      </Section>

      <Section title="11. Governing law">
        <p>
          These terms are governed by the laws of England and Wales. Disputes are subject to the exclusive
          jurisdiction of the courts of London, without prejudice to any mandatory consumer protections
          available to you in your country of residence.
        </p>
      </Section>

      <Section title="12. Contact">
        <p>
          Notices to iTrade should be sent to iTrade Operations Ltd., 71–75 Shelton Street, Covent Garden,
          London, WC2H 9JQ, United Kingdom, and copied to <a href="mailto:legal@itrade.example">legal@itrade.example</a>.
          Notices to you will be sent to the email address on your account.
        </p>
      </Section>
    </PageShell>
  );
}
