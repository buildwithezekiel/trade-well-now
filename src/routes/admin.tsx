import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, ScrollText, Bot, Wallet, Gift, Megaphone, ShieldCheck,
  Menu, X, ArrowUpRight, Plus, Search,
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — iTrade" }, { name: "description", content: "iTrade operator console." }],
  }),
  component: AdminPage,
});

const sections = [
  { id: "overview", label: "Overview", icon: ShieldCheck },
  { id: "users", label: "Users", icon: Users },
  { id: "subs", label: "Subscriptions", icon: ScrollText },
  { id: "ea", label: "EA versions", icon: Bot },
  { id: "accounts", label: "Trading accounts", icon: Wallet },
  { id: "pamm", label: "PAMM", icon: Users },
  { id: "referrals", label: "Referrals", icon: Gift },
  { id: "announce", label: "Announcements", icon: Megaphone },
];

type User = { id: string; name: string; email: string; plan: string; accounts: number; status: "Active" | "Suspended" };
type Sub = { id: string; user: string; plan: string; price: string; renew: string; status: "Active" | "Past due" | "Cancelled" };
type EAVer = { id: string; name: string; version: string; state: "Enabled" | "Disabled" | "Beta"; risk: "Low" | "Medium" | "High"; updated: string };
type Payout = { id: string; user: string; amount: string; method: string; requested: string; status: "Pending" | "Approved" | "Paid" | "Rejected" };

const seedUsers: User[] = [
  { id: "u1", name: "Alex Morgan", email: "alex@morgan.fm", plan: "Premium", accounts: 4, status: "Active" },
  { id: "u2", name: "Sara Mitchell", email: "sara@quietalpha.io", plan: "Elite", accounts: 12, status: "Active" },
  { id: "u3", name: "Marcus Chen", email: "m.chen@helios.cap", plan: "Premium", accounts: 7, status: "Active" },
  { id: "u4", name: "Janet Park", email: "janet@pk.studio", plan: "Starter", accounts: 1, status: "Suspended" },
  { id: "u5", name: "Leo N.", email: "leo@trade.bz", plan: "Standard", accounts: 2, status: "Active" },
  { id: "u6", name: "Nadia K.", email: "nadia@kf.co", plan: "Premium", accounts: 3, status: "Active" },
];

const seedSubs: Sub[] = [
  { id: "SUB-9182", user: "Alex Morgan", plan: "Premium", price: "$89.00", renew: "08 Jun 2026", status: "Active" },
  { id: "SUB-9183", user: "Sara Mitchell", plan: "Elite", price: "$149.00", renew: "12 Jun 2026", status: "Active" },
  { id: "SUB-9184", user: "Janet Park", plan: "Starter", price: "$29.00", renew: "01 May 2026", status: "Past due" },
];

const seedEAs: EAVer[] = [
  { id: "ea1", name: "Aurora Grid", version: "3.2.1", state: "Enabled", risk: "Medium", updated: "20 May 2026" },
  { id: "ea2", name: "Reaper Scalp", version: "1.8.0", state: "Enabled", risk: "High", updated: "12 May 2026" },
  { id: "ea3", name: "Nightfall Trend", version: "2.0.4", state: "Beta", risk: "Medium", updated: "01 May 2026" },
  { id: "ea4", name: "Tide Hedge", version: "1.1.2", state: "Enabled", risk: "Low", updated: "18 Apr 2026" },
];

const seedPayouts: Payout[] = [
  { id: "p1", user: "@leo", amount: "$42.00", method: "USDT", requested: "29 May 2026", status: "Pending" },
  { id: "p2", user: "@nadia", amount: "$89.00", method: "Bank", requested: "27 May 2026", status: "Approved" },
  { id: "p3", user: "@kwame", amount: "$11.60", method: "USDT", requested: "20 May 2026", status: "Paid" },
];

function AdminPage() {
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(seedUsers);
  const [subs, setSubs] = useState(seedSubs);
  const [eas, setEAs] = useState(seedEAs);
  const [payouts, setPayouts] = useState(seedPayouts);

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-background p-6 lg:flex">
          <Logo className="h-8 w-auto" />
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-brand">Operator</p>
          <nav className="mt-8 flex flex-col gap-1">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button key={s.id} onClick={() => setActive(s.id)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left transition-colors ${isActive ? "bg-brand-soft text-brand font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                  <Icon className="size-4" /> {s.label}
                </button>
              );
            })}
          </nav>
          <Link to="/dashboard" className="mt-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">← Back to dashboard</Link>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-5 md:px-8 lg:px-10 py-3.5 backdrop-blur">
            <div className="flex items-center gap-3">
              <button onClick={() => setOpen(true)} aria-label="Open menu" className="lg:hidden rounded-full border border-border bg-background p-2 hover:bg-secondary transition-colors"><Menu className="size-4" /></button>
              <Link to="/" className="lg:hidden"><Logo className="h-6 w-auto" /></Link>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input placeholder="Search users, subscriptions…" className="w-80 rounded-full border border-border bg-secondary/60 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40" />
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background pl-1 pr-3 py-1">
              <div className="size-7 rounded-full bg-brand-gradient text-white grid place-items-center text-xs font-medium">OP</div>
              <span className="hidden md:inline text-xs font-medium">Operator · root</span>
            </div>
          </div>

          <div className="px-5 md:px-8 lg:px-10 py-8 space-y-10">
            {active === "overview" && <AdminOverview />}
            {active === "users" && <UsersPanel users={users} setUsers={setUsers} />}
            {active === "subs" && <SubsPanel subs={subs} setSubs={setSubs} />}
            {active === "ea" && <EAPanel eas={eas} setEAs={setEAs} />}
            {active === "accounts" && <AccountsPanel />}
            {active === "pamm" && <PammPanel />}
            {active === "referrals" && <ReferralsPanel payouts={payouts} setPayouts={setPayouts} />}
            {active === "announce" && <AnnouncePanel />}
          </div>
        </main>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-[82%] max-w-xs bg-background border-r border-border p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <Logo className="h-7 w-auto" />
              <button onClick={() => setOpen(false)} className="rounded-full border border-border p-2 hover:bg-secondary"><X className="size-4" /></button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button key={s.id} onClick={() => { setActive(s.id); setOpen(false); }} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left ${active === s.id ? "bg-brand-soft text-brand font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                    <Icon className="size-4" /> {s.label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}

function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight text-ink">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Pill({ tone, children }: { tone: "ok" | "warn" | "bad"; children: React.ReactNode }) {
  const map = { ok: "bg-brand-soft text-brand", warn: "bg-amber-100 text-amber-800", bad: "bg-destructive/10 text-destructive" } as const;
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${map[tone]}`}>{children}</span>;
}

function AdminOverview() {
  return (
    <Reveal as="section" className="space-y-6">
      <SectionHead eyebrow="Today" title="Platform overview" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Users", v: "2,481", d: "+38 this week" },
          { l: "Active subs", v: "1,732", d: "MRR $128.4K" },
          { l: "Connected accounts", v: "4,098", d: "+121 this week" },
          { l: "Open payouts", v: "$8,420", d: "12 pending" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k.l}</p>
            <p className="mt-2 font-display text-3xl tracking-tight text-ink">{k.v}</p>
            <p className="mt-1 text-xs text-brand">{k.d}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function UsersPanel({ users, setUsers }: { users: User[]; setUsers: React.Dispatch<React.SetStateAction<User[]>> }) {
  const toggleStatus = (id: string) => {
    setUsers((arr) => arr.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
    const u = users.find((x) => x.id === id);
    toast(u?.status === "Active" ? "User suspended" : "User reactivated", { description: u?.email });
  };
  const invite = () => toast.success("Invite sent", { description: "new-user@itrade.app" });
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Manage" title="Users" action={<button onClick={invite} className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors"><Plus className="size-4" /> Invite</button>} />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-secondary/60 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">User</th>
              <th className="text-left font-medium px-6 py-3">Email</th>
              <th className="text-left font-medium px-6 py-3">Plan</th>
              <th className="text-right font-medium px-6 py-3">Accounts</th>
              <th className="text-right font-medium px-6 py-3">Status</th>
              <th className="text-right font-medium px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border hover:bg-secondary/40 transition-colors">
                <td className="px-6 py-4 font-medium">{u.name}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground font-mono">{u.email}</td>
                <td className="px-6 py-4 text-xs">{u.plan}</td>
                <td className="px-6 py-4 text-right tabular-nums">{u.accounts}</td>
                <td className="px-6 py-4 text-right"><Pill tone={u.status === "Active" ? "ok" : "bad"}>{u.status}</Pill></td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => toast(`Editing ${u.name}…`)} className="text-xs text-brand hover:underline">Edit</button>
                  <span className="text-muted-foreground"> · </span>
                  <button onClick={() => toggleStatus(u.id)} className={`text-xs hover:underline ${u.status === "Active" ? "text-destructive" : "text-brand"}`}>
                    {u.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function SubsPanel({ subs, setSubs }: { subs: Sub[]; setSubs: React.Dispatch<React.SetStateAction<Sub[]>> }) {
  const cancel = (id: string) => { setSubs((arr) => arr.map((s) => s.id === id ? { ...s, status: "Cancelled" } : s)); toast("Subscription cancelled", { description: id }); };
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Billing" title="Subscriptions" action={<button onClick={() => toast.success("New plan created", { description: "Draft saved." })} className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors"><Plus className="size-4" /> New plan</button>} />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-secondary/60 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">ID</th>
              <th className="text-left font-medium px-6 py-3">User</th>
              <th className="text-left font-medium px-6 py-3">Plan</th>
              <th className="text-right font-medium px-6 py-3">Price</th>
              <th className="text-left font-medium px-6 py-3">Renews</th>
              <th className="text-right font-medium px-6 py-3">Status</th>
              <th className="text-right font-medium px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="px-6 py-4 font-mono text-xs">{s.id}</td>
                <td className="px-6 py-4 font-medium">{s.user}</td>
                <td className="px-6 py-4 text-xs">{s.plan}</td>
                <td className="px-6 py-4 text-right tabular-nums">{s.price}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{s.renew}</td>
                <td className="px-6 py-4 text-right"><Pill tone={s.status === "Active" ? "ok" : s.status === "Past due" ? "warn" : "bad"}>{s.status}</Pill></td>
                <td className="px-6 py-4 text-right">
                  {s.status !== "Cancelled" ? <button onClick={() => cancel(s.id)} className="text-xs text-destructive hover:underline">Cancel</button> : <span className="text-xs text-muted-foreground">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function EAPanel({ eas, setEAs }: { eas: EAVer[]; setEAs: React.Dispatch<React.SetStateAction<EAVer[]>> }) {
  const toggle = (id: string) => {
    setEAs((arr) => arr.map((e) => e.id === id ? { ...e, state: e.state === "Enabled" ? "Disabled" : "Enabled" } : e));
    const e = eas.find((x) => x.id === id);
    toast(`${e?.name} ${e?.state === "Enabled" ? "disabled" : "enabled"}`);
  };
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Releases" title="EA versions" action={<button onClick={() => toast.success("EA version uploaded", { description: "v3.3.0 staged for review." })} className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors"><Plus className="size-4" /> Upload version</button>} />
      <div className="grid gap-4 md:grid-cols-2">
        {eas.map((e) => (
          <div key={e.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl tracking-tight text-ink">{e.name}</h3>
              <Pill tone={e.state === "Enabled" ? "ok" : e.state === "Beta" ? "warn" : "bad"}>{e.state}</Pill>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-sm">
              <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Version</p><p className="mt-1 font-mono">{e.version}</p></div>
              <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Risk</p><p className="mt-1">{e.risk}</p></div>
              <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Updated</p><p className="mt-1 text-xs text-muted-foreground">{e.updated}</p></div>
            </div>
            <div className="mt-5 flex gap-2">
              <button onClick={() => toggle(e.id)} className="flex-1 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-secondary transition-colors">{e.state === "Enabled" ? "Disable" : "Enable"}</button>
              <button onClick={() => toast(`Risk presets · ${e.name}`)} className="flex-1 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-secondary transition-colors">Risk presets</button>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function AccountsPanel() {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Connected" title="Trading accounts" />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { l: "Total accounts", v: "4,098" },
          { l: "MT4 / MT5", v: "1,602 / 2,496" },
          { l: "Expired licenses", v: "182" },
        ].map((k) => (
          <div key={k.l} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k.l}</p>
            <p className="mt-2 font-display text-3xl tracking-tight text-ink">{k.v}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function PammPanel() {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Managed" title="PAMM operations" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6"><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">PAMM users</p><p className="mt-2 font-display text-3xl tracking-tight text-ink">512</p></div>
        <div className="rounded-2xl border border-border bg-card p-6"><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">AUM</p><p className="mt-2 font-display text-3xl tracking-tight text-ink">$5.2M</p></div>
        <div className="rounded-2xl border border-border bg-card p-6"><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Performance fees MTD</p><p className="mt-2 font-display text-3xl tracking-tight text-brand">$48.4K</p></div>
      </div>
    </Reveal>
  );
}

function ReferralsPanel({ payouts, setPayouts }: { payouts: Payout[]; setPayouts: React.Dispatch<React.SetStateAction<Payout[]>> }) {
  const setStatus = (id: string, status: Payout["status"]) => {
    setPayouts((arr) => arr.map((p) => p.id === id ? { ...p, status } : p));
    toast.success(`Payout ${status.toLowerCase()}`, { description: id });
  };
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Affiliates" title="Referral payouts" action={<Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-brand hover:underline">User view <ArrowUpRight className="size-3.5" /></Link>} />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-secondary/60 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">User</th>
              <th className="text-right font-medium px-6 py-3">Amount</th>
              <th className="text-left font-medium px-6 py-3">Method</th>
              <th className="text-left font-medium px-6 py-3">Requested</th>
              <th className="text-right font-medium px-6 py-3">Status</th>
              <th className="text-right font-medium px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-6 py-4 font-medium">{p.user}</td>
                <td className="px-6 py-4 text-right tabular-nums">{p.amount}</td>
                <td className="px-6 py-4 text-xs">{p.method}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{p.requested}</td>
                <td className="px-6 py-4 text-right"><Pill tone={p.status === "Paid" || p.status === "Approved" ? "ok" : p.status === "Rejected" ? "bad" : "warn"}>{p.status}</Pill></td>
                <td className="px-6 py-4 text-right space-x-2">
                  {p.status === "Pending" && <>
                    <button onClick={() => setStatus(p.id, "Approved")} className="text-xs text-brand hover:underline">Approve</button>
                    <button onClick={() => setStatus(p.id, "Rejected")} className="text-xs text-destructive hover:underline">Reject</button>
                  </>}
                  {p.status === "Approved" && <button onClick={() => setStatus(p.id, "Paid")} className="text-xs text-brand hover:underline">Mark paid</button>}
                  {(p.status === "Paid" || p.status === "Rejected") && <span className="text-xs text-muted-foreground">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function AnnouncePanel() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("All users");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) { toast.error("Title and body required"); return; }
    toast.success("Announcement queued", { description: `${audience} · ${title}` });
    setTitle(""); setBody("");
  };
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Broadcast" title="Announcements" />
      <form onSubmit={send} className="rounded-2xl border border-border bg-card p-6 space-y-4 max-w-2xl">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Message body…" rows={5} className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <select value={audience} onChange={(e) => setAudience(e.target.value)} className="rounded-full border border-border bg-background px-4 py-2 text-sm">
            <option>All users</option><option>Premium & Elite</option><option>PAMM users</option><option>Expired subs</option>
          </select>
          <button type="submit" className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">Send announcement</button>
        </div>
      </form>
    </Reveal>
  );
}
