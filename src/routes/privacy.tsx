import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — iTrade" },
      { name: "description", content: "What data iTrade collects, why we collect it, how long we keep it, and the rights you have over it." },
      { property: "og:title", content: "Privacy Policy — iTrade" },
      { property: "og:description", content: "iTrade privacy policy: data collected, lawful basis, retention, and user rights." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      lede="Last updated 26 May 2026. This page describes what data iTrade processes and why."
    >
      <Section title="Data we collect">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Account data</strong> — email, hashed password, billing country.</li>
          <li><strong>License data</strong> — MT4/MT5 account numbers, broker name, license tier.</li>
          <li><strong>Operational telemetry</strong> — EA heartbeats, equity snapshots, error logs.</li>
          <li><strong>Billing data</strong> — handled by our payment processor; we store only the last four digits and the expiry month.</li>
        </ul>
      </Section>

      <Section title="Lawful basis">
        <p>
          We process the data listed above under the contract you enter into when subscribing
          (Art. 6(1)(b) GDPR) and, for security telemetry, under our legitimate interest in keeping the
          service available (Art. 6(1)(f) GDPR).
        </p>
      </Section>

      <Section title="What we do not collect">
        <ul className="list-disc pl-5 space-y-2">
          <li>Your broker password. The EA uses MetaTrader's local terminal API, not your credentials.</li>
          <li>Marketing trackers or cross-site advertising identifiers.</li>
          <li>Sensitive categories of data (health, biometric, political opinion, etc.).</li>
        </ul>
      </Section>

      <Section title="Retention">
        <p>
          Account and license data are retained for as long as your subscription is active and for 6 years
          afterwards for tax and audit purposes. Operational telemetry is retained for 90 days, then
          aggregated and anonymized.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          You may request access, correction, deletion, or export of your personal data, and you may object
          to processing based on legitimate interest. Write to
          <a href="mailto:privacy@itrade.example"> privacy@itrade.example</a> and we will respond within 30
          days. You also have the right to lodge a complaint with your local data protection authority.
        </p>
      </Section>

      <Section title="Sub-processors">
        <p>
          We use a small number of sub-processors for hosting, payments, transactional email, and error
          monitoring. The current list is published in the documentation portal and updated at least 30 days
          before any change.
        </p>
      </Section>
    </PageShell>
  );
}
