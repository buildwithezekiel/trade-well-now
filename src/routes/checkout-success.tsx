import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";

type Search = { plan?: string };

export const Route = createFileRoute("/checkout-success")({
  validateSearch: (s: Record<string, unknown>): Search => ({ plan: typeof s.plan === "string" ? s.plan : undefined }),
  head: () => ({ meta: [{ title: "Payment successful — iTrade" }] }),
  component: Success,
});

function Success() {
  const { plan = "premium" } = useSearch({ from: "/checkout-success" });
  const key = `ITR-${plan.toUpperCase().slice(0,3)}-${Math.random().toString(36).slice(2,6).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  return (
    <PageShell eyebrow="Confirmation" title="Payment successful" lede="Your EA license is now active. A receipt has been emailed (mock).">
      <Section title="Your license key">
        <div className="rounded-2xl border border-brand/40 bg-brand-soft/30 p-6 flex items-start gap-4">
          <CheckCircle2 className="size-8 text-brand shrink-0" />
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">License</p>
            <p className="mt-1 font-mono text-2xl text-foreground select-all">{key}</p>
            <p className="mt-2 text-sm text-muted-foreground">Bind this key to up to your tier limit of trading accounts from the dashboard.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90">
            Go to dashboard <ArrowRight className="size-4" />
          </Link>
          <Link to="/connect-broker" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-secondary">
            Connect broker
          </Link>
          <button onClick={() => {/* mock */}} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-secondary">
            <Download className="size-4" /> Download receipt (PDF)
          </button>
        </div>
      </Section>
    </PageShell>
  );
}
