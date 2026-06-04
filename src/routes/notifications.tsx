import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Bell, AlertTriangle, CreditCard, Bot, Gift, Megaphone, Check } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — iTrade" }] }),
  component: Page,
});

type Kind = "alert" | "billing" | "ea" | "referral" | "announce";
type Notif = { id: string; title: string; body: string; time: string; kind: Kind; read: boolean };

const seed: Notif[] = [
  { id: "n1", title: "Drawdown threshold approached", body: "FTMO-99213 reached 7.8% of 10% daily limit.", time: "8m ago", kind: "alert", read: false },
  { id: "n2", title: "Subscription renews in 7 days", body: "Exness #458291 — Premium ($89.00) on 11 Jun.", time: "2h ago", kind: "billing", read: false },
  { id: "n3", title: "EA deployed", body: "Aurora Grid v3.2 started on Pepperstone #20384756.", time: "5h ago", kind: "ea", read: false },
  { id: "n4", title: "Referral payout", body: "$42.00 commission credited from @leo.", time: "1d ago", kind: "referral", read: true },
  { id: "n5", title: "Platform update v4.1", body: "Risk presets v2 are live across all plans.", time: "3d ago", kind: "announce", read: true },
  { id: "n6", title: "VPS migration complete", body: "Your EU node moved to itrade-eu-west-2 with zero downtime.", time: "5d ago", kind: "announce", read: true },
  { id: "n7", title: "PAMM withdrawal processed", body: "$1,240.00 sent to source wallet · ref WTH-20461", time: "1w ago", kind: "billing", read: true },
];

const icons: Record<Kind, typeof Bell> = { alert: AlertTriangle, billing: CreditCard, ea: Bot, referral: Gift, announce: Megaphone };
const tones: Record<Kind, string> = { alert: "text-amber-500", billing: "text-brand", ea: "text-emerald-500", referral: "text-fuchsia-500", announce: "text-sky-500" };

function Page() {
  const [items, setItems] = useState(seed);
  const [filter, setFilter] = useState<Kind | "all">("all");
  const visible = filter === "all" ? items : items.filter(i => i.kind === filter);
  const unread = items.filter(i => !i.read).length;

  return (
    <PageShell eyebrow="Inbox" title="Notifications" lede={`${unread} unread message${unread === 1 ? "" : "s"}. Mock data — drawdown, billing, EA, referral, and platform alerts.`}>
      <div className="flex flex-wrap gap-2">
        {(["all","alert","billing","ea","referral","announce"] as const).map(k => (
          <button key={k} onClick={() => setFilter(k)} className={`rounded-full border px-3 py-1.5 text-xs capitalize ${filter === k ? "border-brand bg-brand-soft text-brand" : "border-border text-muted-foreground hover:bg-secondary"}`}>{k}</button>
        ))}
        <button onClick={() => { setItems(items.map(i => ({...i, read: true}))); toast.success("All marked as read"); }} className="ml-auto rounded-full border border-border px-3 py-1.5 text-xs hover:bg-secondary inline-flex items-center gap-1"><Check className="size-3" /> Mark all read</button>
      </div>

      <Section title="Inbox">
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {visible.map(n => {
            const Icon = icons[n.kind];
            return (
              <li key={n.id} className={`flex gap-4 p-4 ${!n.read ? "bg-brand-soft/20" : ""}`}>
                <Icon className={`size-5 mt-0.5 ${tones[n.kind]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-medium text-foreground">{n.title}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>
                </div>
                {!n.read && <button onClick={() => setItems(items.map(i => i.id === n.id ? {...i, read: true} : i))} className="text-xs text-brand hover:underline self-start">Mark read</button>}
              </li>
            );
          })}
          {visible.length === 0 && <li className="p-8 text-center text-sm text-muted-foreground">No notifications in this category.</li>}
        </ul>
      </Section>
    </PageShell>
  );
}
