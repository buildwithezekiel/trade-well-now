import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { KeyRound, Check, Loader2 } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/activate-license")({
  head: () => ({ meta: [{ title: "Activate license — iTrade" }] }),
  component: Activate,
});

function Activate() {
  const [key, setKey] = useState("");
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | { tier: string; expires: string }>(null);

  const activate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^ITR-[A-Z]{3}-/.test(key.trim())) { toast.error("Invalid key format. Expected ITR-XXX-…"); return; }
    if (!account) { toast.error("Enter the trading account login"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone({ tier: "Premium", expires: "12 Aug 2026" });
      toast.success(`License bound to account ${account}`);
    }, 1200);
  };

  return (
    <PageShell eyebrow="License" title="Activate EA license" lede="Bind a license key to a specific trading account. Each key can be moved between accounts once every 30 days.">
      <Section title="License activation">
        {!done ? (
          <form onSubmit={activate} className="space-y-4 max-w-lg">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1"><KeyRound className="size-3" /> License key</span>
              <input value={key} onChange={(e) => setKey(e.target.value.toUpperCase())} placeholder="ITR-PRE-9F21-4582"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-brand" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Trading account login</span>
              <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="e.g. 458291"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-brand" />
            </label>
            <button disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-60">
              {loading ? <><Loader2 className="size-4 animate-spin" /> Validating…</> : "Activate"}
            </button>
          </form>
        ) : (
          <div className="rounded-xl border border-brand/40 bg-brand-soft/30 p-5 max-w-lg">
            <p className="inline-flex items-center gap-2 font-medium text-foreground"><Check className="size-4 text-brand" /> Activated</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <dt className="text-muted-foreground">Tier</dt><dd className="font-mono">{done.tier}</dd>
              <dt className="text-muted-foreground">Account</dt><dd className="font-mono">#{account}</dd>
              <dt className="text-muted-foreground">Expires</dt><dd className="font-mono">{done.expires}</dd>
              <dt className="text-muted-foreground">Status</dt><dd className="text-brand">Active</dd>
            </dl>
            <div className="mt-4 flex gap-2">
              <Link to="/dashboard" className="rounded-full bg-foreground px-4 py-2 text-sm text-background hover:bg-foreground/90">Open dashboard</Link>
              <button onClick={() => { setDone(null); setKey(""); setAccount(""); }} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">Activate another</button>
            </div>
          </div>
        )}
      </Section>
    </PageShell>
  );
}
