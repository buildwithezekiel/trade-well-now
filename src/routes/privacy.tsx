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
      lede="Last updated 26 May 2026. This page describes what data iTrade processes, the legal basis on which we process it, how long we keep it, and the rights you have over it. We do our best to keep the language plain; the technical detail lives in the documentation portal."
    >
      <Section title="Who we are">
        <p>
          iTrade Operations Ltd. (company number 14872610), 71–75 Shelton Street, Covent Garden, London,
          WC2H 9JQ, United Kingdom, is the controller of personal data described in this policy. Our Data
          Protection Officer can be reached at <a href="mailto:privacy@itrade.example">privacy@itrade.example</a>.
        </p>
      </Section>

      <Section title="Data we collect">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Account data</strong> — email address, hashed password, display name, billing country.</li>
          <li><strong>License data</strong> — MT4/MT5 account numbers, broker name, license tier, activation history.</li>
          <li><strong>Operational telemetry</strong> — EA heartbeats, equity snapshots once per minute, error logs, dashboard session events.</li>
          <li><strong>Billing data</strong> — handled by our payment processor (Stripe, Paystack, Flutterwave, or a crypto on-ramp depending on your choice); we store only the last four digits, the card brand, and the expiry month.</li>
          <li><strong>Support correspondence</strong> — the content of tickets you open and the responses we send, retained for the life of your account plus 2 years.</li>
          <li><strong>Device and connection data</strong> — IP address, browser fingerprint, geographic region, and timezone. Collected for fraud prevention and session security.</li>
        </ul>
      </Section>

      <Section title="Lawful basis">
        <p>
          We process the data listed above under the contract you enter into when subscribing
          (Art. 6(1)(b) GDPR), for compliance with our legal obligations (Art. 6(1)(c) — e.g. tax,
          anti-money-laundering record retention), and, for security telemetry and fraud prevention, under
          our legitimate interest in keeping the service available and free of abuse (Art. 6(1)(f) GDPR).
        </p>
        <p>
          We do not rely on consent as a lawful basis for any processing necessary to deliver the service.
          We do ask for explicit, granular consent before sending product update emails or running optional
          analytics (off by default).
        </p>
      </Section>

      <Section title="What we do not collect">
        <ul className="list-disc pl-5 space-y-2">
          <li>Your broker password. The EA uses MetaTrader's local terminal API, not your credentials.</li>
          <li>Your broker's investor or read-only password. We do not need it; do not share it with us.</li>
          <li>Marketing trackers, cross-site advertising identifiers, or third-party analytics that fingerprint visitors across the web.</li>
          <li>Sensitive categories of data (health, biometric, genetic, racial/ethnic, political opinion, religious belief, trade union membership, sex life, sexual orientation).</li>
          <li>Government identifiers (passport number, national ID, social security number) — those, when required by a broker for KYC, are collected by the broker, not by us.</li>
        </ul>
      </Section>

      <Section title="Retention">
        <p>
          Account and license data are retained for as long as your subscription is active and for 6 years
          afterwards for tax, audit, and anti-money-laundering purposes. Operational telemetry is retained
          in identifiable form for 90 days, then aggregated and anonymized for long-term performance
          analysis. Billing data is retained for 7 years where required by tax law.
        </p>
        <p>
          You may close your account at any time from the dashboard. Closure triggers immediate deletion of
          marketing-related data, removal from all mailing lists, and revocation of all active licenses. The
          legally-required records described above continue to be retained for their statutory periods, in a
          restricted-access archive separate from the operational database.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          You may request access, correction, deletion, restriction, or export (in machine-readable form) of
          your personal data, and you may object to processing based on our legitimate interest. Write to
          <a href="mailto:privacy@itrade.example"> privacy@itrade.example</a> and we will respond within 30
          days. You also have the right to lodge a complaint with your local data protection authority — in
          the UK, the Information Commissioner's Office (<a href="https://ico.org.uk">ico.org.uk</a>).
        </p>
        <p>
          For account access and export we offer self-service tools in the dashboard so that you do not need
          to wait on us. The export includes account data, license history, trade history, billing history,
          and dashboard audit log, in CSV and JSON format.
        </p>
      </Section>

      <Section title="Sub-processors">
        <p>
          We use a small number of sub-processors for hosting (Cloudflare, AWS Frankfurt), payments (Stripe,
          Paystack, Flutterwave), transactional email (Postmark), and error monitoring (Sentry, EU region).
          The full current list, including the legal basis for each transfer and the safeguards in place, is
          published in the documentation portal and updated at least 30 days before any material change.
        </p>
      </Section>

      <Section title="International transfers">
        <p>
          Where personal data is transferred outside the UK or the European Economic Area — primarily to
          payment processors that operate in the United States — we rely on the UK International Data
          Transfer Addendum or the EU Standard Contractual Clauses, with supplementary technical safeguards
          (transport encryption, encryption at rest, access logging) reviewed annually.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We will notify registered users by email at least 30 days before any material change to this
          policy. Non-material changes (typo fixes, clarifications, updates to the sub-processor list) are
          published without notice and visible in the page version history at the bottom of the
          documentation portal.
        </p>
      </Section>
    </PageShell>
  );
}
