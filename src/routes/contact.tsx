import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — iTrade" },
      { name: "description", content: "Support, sales, compliance, and partnership contacts for iTrade. Response times by channel and tier." },
      { property: "og:title", content: "Contact — iTrade" },
      { property: "og:description", content: "How to reach iTrade support, sales, compliance, and partnerships." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell
      eyebrow="Support"
      title="Contact"
      lede="The fastest path is usually the in-app chat once you are logged in — tickets opened from inside the dashboard arrive with your account, broker, and license context already attached, which typically saves a full round-trip. The channels below are for everything else, including pre-sales questions, compliance matters, and partnership enquiries."
    >
      <Section title="Pick the right channel">
        <p>
          We respond faster, and with better answers, when the question reaches the right inbox. Use the
          table below to decide where to write — or use the in-app chat if you are already signed in and the
          question relates to your own account.
        </p>
        <dl className="divide-y divide-border">
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Technical support</dt>
            <dd className="md:col-span-2">
              <a href="mailto:support@itrade.example">support@itrade.example</a> — anything about installing,
              configuring, or operating the EA or the dashboard. Response within 48 h on Starter, 24 h on
              Standard, 8 h on Premium, and same-day on Elite.
            </dd>
          </div>
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Sales and licensing</dt>
            <dd className="md:col-span-2">
              <a href="mailto:sales@itrade.example">sales@itrade.example</a> — tier upgrades, multi-seat
              orders, volume pricing for prop firms, custom symbol whitelists. Response within one business
              day.
            </dd>
          </div>
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Billing</dt>
            <dd className="md:col-span-2">
              <a href="mailto:billing@itrade.example">billing@itrade.example</a> — invoices, VAT receipts,
              refund requests within the 14-day window, payment-method changes that the dashboard cannot
              handle. Include your invoice number if you have one.
            </dd>
          </div>
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Compliance and abuse</dt>
            <dd className="md:col-span-2">
              <a href="mailto:compliance@itrade.example">compliance@itrade.example</a> — KYC questions,
              sanctions queries, law-enforcement requests, abuse reports. We respond to law-enforcement
              requests routed through this address only when accompanied by valid legal process.
            </dd>
          </div>
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Privacy and data rights</dt>
            <dd className="md:col-span-2">
              <a href="mailto:privacy@itrade.example">privacy@itrade.example</a> — access requests, deletion
              requests, data exports, and any matter relating to the <a href="/privacy">Privacy Policy</a>.
              We respond within 30 days as required.
            </dd>
          </div>
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Press and partnerships</dt>
            <dd className="md:col-span-2">
              <a href="mailto:partners@itrade.example">partners@itrade.example</a> — broker partnerships,
              integration enquiries, press requests, podcast appearances. Please include a brief on what you
              are working on.
            </dd>
          </div>
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Security disclosures</dt>
            <dd className="md:col-span-2">
              <a href="mailto:security@itrade.example">security@itrade.example</a> — responsible disclosure
              of vulnerabilities. PGP key fingerprint and bounty programme details are in the documentation
              portal under <em>Security</em>.
            </dd>
          </div>
        </dl>
      </Section>

      <Section title="Office hours and on-call">
        <p>
          Live chat is staffed Monday to Friday, 06:00–22:00 UTC. Outside those hours, automated alerts still
          fire (drawdown breaches, disconnects, equity-floor events, license expiry warnings) and the
          on-call engineer responds to severity-1 incidents — defined as platform-wide outages or anything
          that prevents the EA from managing open positions — within 30 minutes.
        </p>
        <p>
          For non-urgent questions raised over the weekend, expect a response on the next business day. The
          status page (<a href="https://status.itrade.example">status.itrade.example</a>) is updated in real
          time during incidents.
        </p>
      </Section>

      <Section title="Mailing address">
        <p>
          iTrade Operations Ltd.<br />
          71–75 Shelton Street, Covent Garden<br />
          London, WC2H 9JQ, United Kingdom<br />
          Company number 14872610
        </p>
        <p>
          We accept postal correspondence but do not staff the registered office for walk-ins. Please use the
          email channels above for anything time-sensitive.
        </p>
      </Section>

      <Section title="What to include in a support ticket">
        <ul className="list-disc pl-5 space-y-2">
          <li>Your iTrade account email and (if relevant) the MT4/MT5 account number affected.</li>
          <li>The broker, server name, and the EA version shown in the terminal's Experts tab.</li>
          <li>A clear description of the expected behaviour and the actual behaviour.</li>
          <li>Timestamps in UTC. Local timestamps cost us a round-trip to clarify.</li>
          <li>The relevant lines from <code className="font-mono text-foreground">MQL5/Files/itrade.log</code> when reporting an EA issue. Attach the file if it is short, or paste the last 200 lines if it is long.</li>
        </ul>
      </Section>
    </PageShell>
  );
}
