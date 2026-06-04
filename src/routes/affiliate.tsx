import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Copy, Users, DollarSign, TrendingUp, Share2 } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/affiliate")({
  head: () => ({ meta: [{ title: "Affiliate program — iTrade" }] }),
  component: Page,
});

const referrals = [
  { user: "@leo",      joined: "12 May 2026", plan: "Standard", earned: "$42.00", status: "Active" },
  { user: "@nadia",    joined: "04 May 2026", plan: "Premium",  earned: "$89.40", status: "Active" },
  { user: "@kwame",    joined: "28 Apr 2026", plan: "Starter",  earned: "$11.60", status: "Active" },
  { user: "@hina",     joined: "19 Apr 2026", plan: "Premium",  earned: "$89.40", status: "Active" },
  { user: "@diego",    joined: "02 Apr 2026", plan: "Elite",    earned: "$209.70", status: "Active" },
  { user: "@yuki",     joined: "21 Mar 2026", plan: "Standard", earned: "$38.70", status: "Lapsed" },
];

const payouts = [
  { id: "PAY-20603", date: "01 Jun 2026", amount: "$224.80", method: "USDT (TRC-20)", status: "Sent" },
  { id: "PAY-20503", date: "01 May 2026", amount: "$181.20", method: "Bank Transfer",  status: "Sent" },
  { id: "PAY-20403", date: "01 Apr 2026", amount: "$129.40", method: "USDT (TRC-20)", status: "Sent" },
];

function Page() {
  const [link] = useState("https://itrade.app/r/orion-9F21");
  return (
    <PageShell eyebrow="Earn" title="Affiliate program" lede="Earn 30% recurring commission for 12 months on every paying referral. Mock dashboard with seeded referrals and payouts.">
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { Icon: Users, label: "Active referrals", value: "18" },
          { Icon: DollarSign, label: "Lifetime earned", value: "$1,842.40" },
          { Icon: TrendingUp, label: "MRR contribution", value: "$224.80" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <s.Icon className="size-4 text-brand" />
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="font-display text-2xl mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      <Section title="Your referral link">
        <div className="flex flex-wrap gap-2 items-center">
          <code className="flex-1 min-w-0 truncate rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm">{link}</code>
          <button onClick={() => { navigator.clipboard?.writeText(link); toast.success("Link copied"); }} className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm text-background hover:bg-foreground/90"><Copy className="size-3.5" /> Copy</button>
          <button onClick={() => toast("Share sheet (mock)")} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary"><Share2 className="size-3.5" /> Share</button>
        </div>
      </Section>

      <Section title="Referrals">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-2">User</th><th className="text-left p-2">Joined</th><th className="text-left p-2">Plan</th><th className="text-left p-2">Earned</th><th className="text-left p-2">Status</th></tr>
            </thead>
            <tbody>
              {referrals.map(r => (
                <tr key={r.user} className="border-t border-border">
                  <td className="p-2 font-medium text-foreground">{r.user}</td>
                  <td className="p-2">{r.joined}</td>
                  <td className="p-2">{r.plan}</td>
                  <td className="p-2 font-mono">{r.earned}</td>
                  <td className="p-2"><span className={`rounded-full px-2 py-0.5 text-xs ${r.status === "Active" ? "bg-brand-soft text-brand" : "bg-secondary text-muted-foreground"}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Payouts">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-2">Ref</th><th className="text-left p-2">Date</th><th className="text-left p-2">Amount</th><th className="text-left p-2">Method</th><th className="text-left p-2">Status</th></tr>
            </thead>
            <tbody>
              {payouts.map(p => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-2 font-mono">{p.id}</td>
                  <td className="p-2">{p.date}</td>
                  <td className="p-2 font-mono">{p.amount}</td>
                  <td className="p-2">{p.method}</td>
                  <td className="p-2 text-brand">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </PageShell>
  );
}
