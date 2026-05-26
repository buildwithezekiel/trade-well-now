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
      lede="Last updated 26 May 2026. By creating an iTrade account you accept the terms below."
    >
      <Section title="1. The service">
        <p>
          iTrade provides software (the Expert Advisor and the management dashboard) and an introduction to a
          PAMM strategy operated on third-party broker infrastructure. iTrade is not a broker, not a
          custodian, and not an investment adviser.
        </p>
      </Section>

      <Section title="2. License grant">
        <p>
          We grant you a non-exclusive, non-transferable license to use the EA on the number of accounts and
          up to the aggregate balance permitted by your tier, for the duration of your active subscription.
          The license is revoked when you cancel, when you breach these terms, or when payment fails for more
          than 14 days.
        </p>
      </Section>

      <Section title="3. Acceptable use">
        <ul className="list-disc pl-5 space-y-2">
          <li>Do not redistribute, decompile, or resell the EA or any part of the dashboard.</li>
          <li>Do not share your license key. Keys are bound to user identity, not to a machine.</li>
          <li>Do not use the service to evade broker terms, sanctions regimes, or applicable law.</li>
        </ul>
      </Section>

      <Section title="4. Billing">
        <p>
          Subscriptions renew automatically at the end of each billing period using the payment method on
          file. You may cancel at any time; cancellation takes effect at the end of the current period and we
          do not pro-rate refunds outside of the 14-day money-back window on a first subscription.
        </p>
      </Section>

      <Section title="5. Disclaimer of warranty">
        <p>
          The service is provided on an "as is" and "as available" basis. We do not warrant that the EA will
          be profitable, that the dashboard will be uninterrupted, or that broker execution will match
          modeled prices. See the <a href="/risk-disclaimer">Risk Disclaimer</a> for detail.
        </p>
      </Section>

      <Section title="6. Limitation of liability">
        <p>
          To the maximum extent permitted by law, iTrade's aggregate liability arising out of or related to
          the service is limited to the fees you paid in the 12 months preceding the event giving rise to
          the claim. We are not liable for trading losses, lost profits, or consequential damages.
        </p>
      </Section>

      <Section title="7. Termination">
        <p>
          We may suspend or terminate access immediately for breach of these terms, for non-payment, or where
          required by law or by a broker partner. You may terminate at any time by cancelling in the
          dashboard.
        </p>
      </Section>

      <Section title="8. Governing law">
        <p>
          These terms are governed by the laws of England and Wales. Disputes are subject to the exclusive
          jurisdiction of the courts of London, without prejudice to any mandatory consumer protections
          available to you in your country of residence.
        </p>
      </Section>
    </PageShell>
  );
}
