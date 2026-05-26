import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — iTrade" },
      { name: "description", content: "Support, sales, and partnership contacts for iTrade. Response times by channel and tier." },
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
      lede="The fastest path is usually the in-app chat once you are logged in. The channels below are for everything else."
    >
      <Section title="By topic">
        <dl className="divide-y divide-border">
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Technical support</dt>
            <dd className="md:col-span-2">
              <a href="mailto:support@itrade.example">support@itrade.example</a> — response within 24 h on
              Standard, 8 h on Premium, same-day on Elite.
            </dd>
          </div>
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Sales and licensing</dt>
            <dd className="md:col-span-2">
              <a href="mailto:sales@itrade.example">sales@itrade.example</a>
            </dd>
          </div>
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Compliance and abuse</dt>
            <dd className="md:col-span-2">
              <a href="mailto:compliance@itrade.example">compliance@itrade.example</a>
            </dd>
          </div>
          <div className="py-4 grid md:grid-cols-3 gap-4">
            <dt className="font-semibold text-foreground">Press and partnerships</dt>
            <dd className="md:col-span-2">
              <a href="mailto:partners@itrade.example">partners@itrade.example</a>
            </dd>
          </div>
        </dl>
      </Section>

      <Section title="Office hours">
        <p>
          Live chat is staffed Monday to Friday, 06:00–22:00 UTC. Outside those hours, automated alerts still
          fire (drawdown breaches, disconnects, equity-floor events) and the on-call engineer responds to
          severity-1 incidents within 30 minutes.
        </p>
      </Section>

      <Section title="Mailing address">
        <p>
          iTrade Operations Ltd.<br />
          71–75 Shelton Street, Covent Garden<br />
          London, WC2H 9JQ, United Kingdom
        </p>
      </Section>
    </PageShell>
  );
}
