import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, LineChart, Bot, Users, Wallet, Settings, Bell, Search,
  ArrowUpRight, ArrowDownRight, Plus, Activity, Shield, LogOut, ChevronRight, Play, Pause,
  Menu, X, Gift, CreditCard, ScrollText, ShieldCheck, Copy, Trash2, RefreshCw, Sliders, Mail, Megaphone, Check,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — iTrade" }, { name: "description", content: "Your iTrade command center." }],
  }),
  component: DashboardPage,
});

/* ---------- types & seed mock data ---------- */
type AccountStatus = "Active" | "Expired" | "Pending";
type Risk = "Low" | "Medium" | "High";
type Account = { id: string; broker: string; login: string; platform: "MT4" | "MT5"; risk: Risk; status: AccountStatus; expiry: string; balance: string; equity: string };
type EA = { id: string; name: string; pair: string; profit: string; winrate: string; state: "running" | "paused"; license: string; expiry: string };
type Notif = { id: string; title: string; body: string; time: string; kind: "alert" | "billing" | "ea" | "referral" | "announce"; read: boolean };

const seedAccounts: Account[] = [
  { id: "a1", broker: "Exness", login: "458291", platform: "MT5", risk: "Medium", status: "Active", expiry: "12 Aug 2026", balance: "$8,420.55", equity: "$8,512.10" },
  { id: "a2", broker: "HFM", login: "773821", platform: "MT4", risk: "Low", status: "Active", expiry: "18 Sep 2026", balance: "$2,140.00", equity: "$2,188.90" },
  { id: "a3", broker: "IC Markets", login: "992812", platform: "MT5", risk: "High", status: "Expired", expiry: "10 May 2026", balance: "$5,000.00", equity: "$4,609.18" },
  { id: "a4", broker: "Pepperstone", login: "20384756", platform: "MT5", risk: "Medium", status: "Active", expiry: "02 Jan 2027", balance: "$52,140.00", equity: "$53,118.90" },
  { id: "a5", broker: "FTMO", login: "FTMO-99213", platform: "MT4", risk: "High", status: "Pending", expiry: "—", balance: "$50,000.00", equity: "$50,000.00" },
];

const seedEAs: EA[] = [
  { id: "e1", name: "Aurora Grid v3.2", pair: "EUR/USD", profit: "+$1,420", winrate: "68%", state: "running", license: "ITR-AUR-9F21", expiry: "12 Aug 2026" },
  { id: "e2", name: "Reaper Scalp", pair: "XAU/USD", profit: "+$842", winrate: "59%", state: "running", license: "ITR-RPS-7C04", expiry: "18 Sep 2026" },
  { id: "e3", name: "Nightfall Trend", pair: "GBP/JPY", profit: "−$210", winrate: "44%", state: "paused", license: "ITR-NTF-3A88", expiry: "10 May 2026" },
  { id: "e4", name: "Tide Hedge", pair: "USD/CAD", profit: "+$612", winrate: "71%", state: "running", license: "ITR-THG-1B55", expiry: "02 Jan 2027" },
];

const seedTrades = [
  { time: "14:02:41", pair: "EUR/USD", side: "BUY", lots: "1.20", entry: "1.0832", pnl: "+$118.40", up: true },
  { time: "13:58:09", pair: "XAU/USD", side: "SELL", lots: "0.50", entry: "2384.20", pnl: "+$245.00", up: true },
  { time: "13:44:22", pair: "GBP/JPY", side: "BUY", lots: "0.30", entry: "198.32", pnl: "−$62.10", up: false },
  { time: "13:21:08", pair: "USD/CAD", side: "SELL", lots: "0.80", entry: "1.3712", pnl: "+$94.20", up: true },
  { time: "12:55:47", pair: "EUR/USD", side: "BUY", lots: "0.60", entry: "1.0828", pnl: "+$48.20", up: true },
  { time: "12:14:12", pair: "AUD/USD", side: "SELL", lots: "0.40", entry: "0.6584", pnl: "+$28.10", up: true },
];

const pammMasters = [
  { name: "Helios Capital", master: "M. Chen", aum: "$2.4M", ytd: "+38.2%", fee: "30%" },
  { name: "Quiet Alpha", master: "S. Mitchell", aum: "$1.8M", ytd: "+24.8%", fee: "30%" },
  { name: "Northstar PAMM", master: "J. Rodriguez", aum: "$950K", ytd: "+19.4%", fee: "25%" },
];

const seedNotifs: Notif[] = [
  { id: "n1", title: "Drawdown threshold approached", body: "FTMO-99213 reached 7.8% of 10% limit.", time: "8m", kind: "alert", read: false },
  { id: "n2", title: "Subscription renewing", body: "Exness 458291 renews in 7 days ($89.00).", time: "2h", kind: "billing", read: false },
  { id: "n3", title: "EA deployed", body: "Aurora Grid v3.2 started on Pepperstone (20384756).", time: "5h", kind: "ea", read: false },
  { id: "n4", title: "Referral payout", body: "$42.00 commission credited from referral @leo.", time: "1d", kind: "referral", read: true },
  { id: "n5", title: "Platform update", body: "Risk presets v2 now available across all plans.", time: "3d", kind: "announce", read: true },
];

const plansSeed = [
  { name: "Starter", range: "$500 – $1,999", price: "$29", limit: "1 account" },
  { name: "Standard", range: "$2,000 – $4,999", price: "$59", limit: "3 accounts" },
  { name: "Premium", range: "$5,000 – $9,999", price: "$89", limit: "10 accounts" },
  { name: "Elite", range: "$10,000+", price: "$149", limit: "Unlimited" },
];

const invoices = [
  { id: "INV-20603", date: "01 Jun 2026", plan: "Premium", amount: "$89.00", status: "Paid" },
  { id: "INV-20502", date: "01 May 2026", plan: "Premium", amount: "$89.00", status: "Paid" },
  { id: "INV-20401", date: "01 Apr 2026", plan: "Standard", amount: "$59.00", status: "Paid" },
];

const referralsSeed = [
  { user: "@leo", joined: "12 May 2026", plan: "Standard", earned: "$42.00", status: "Active" },
  { user: "@nadia", joined: "04 May 2026", plan: "Premium", earned: "$89.00", status: "Active" },
  { user: "@kwame", joined: "28 Apr 2026", plan: "Starter", earned: "$11.60", status: "Active" },
  { user: "@maria", joined: "12 Apr 2026", plan: "—", earned: "$0.00", status: "Pending" },
];

/* ---------- helpers ---------- */
function addDays(label: string, days: number): string {
  const now = new Date();
  if (label !== "—" && label !== "Expired") {
    const parsed = new Date(label);
    if (!isNaN(+parsed)) now.setTime(+parsed);
  }
  now.setDate(now.getDate() + days);
  return now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
const nextRisk = (r: Risk): Risk => (r === "Low" ? "Medium" : r === "Medium" ? "High" : "Low");
const downloadCSV = (rows: object[], filename: string) => {
  if (!rows.length) return;
  const cols = Object.keys(rows[0]);
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => JSON.stringify((r as Record<string, unknown>)[c] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

/* ---------- shell ---------- */
const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "accounts", label: "Accounts", icon: Wallet },
  { id: "eas", label: "EA Licensing", icon: Bot },
  { id: "trades", label: "Trades", icon: LineChart },
  { id: "pamm", label: "PAMM", icon: Users },
  { id: "referrals", label: "Referrals", icon: Gift },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "risk", label: "Risk", icon: Shield },
  { id: "admin", label: "Admin", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
];

function DashboardPage() {
  const [active, setActive] = useState("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lifted mock state — every list is editable so all buttons actually mutate it
  const [accounts, setAccounts] = useState<Account[]>(seedAccounts);
  const [eas, setEAs] = useState<EA[]>(seedEAs);
  const [notifs, setNotifs] = useState<Notif[]>(seedNotifs);
  const [currentPlan, setCurrentPlan] = useState<string>("Premium");
  const [addOpen, setAddOpen] = useState(false);
  const [range, setRange] = useState<"1D" | "7D" | "30D" | "YTD">("30D");

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleSelect = (id: string) => { setActive(id); setDrawerOpen(false); };

  /* ----- account actions ----- */
  const renewAccount = (id: string) => {
    setAccounts((acc) => acc.map((a) => a.id === id ? { ...a, status: "Active", expiry: addDays(a.expiry, 30) } : a));
    const a = accounts.find((x) => x.id === id);
    toast.success("Subscription renewed", { description: `${a?.broker} ${a?.login} extended 30 days.` });
  };
  const cycleRisk = (id: string) => {
    setAccounts((acc) => acc.map((a) => a.id === id ? { ...a, risk: nextRisk(a.risk) } : a));
    const a = accounts.find((x) => x.id === id);
    toast(`Risk set to ${nextRisk(a?.risk ?? "Low")}`, { description: `${a?.broker} ${a?.login}` });
  };
  const removeAccount = (id: string) => {
    const a = accounts.find((x) => x.id === id);
    setAccounts((acc) => acc.filter((x) => x.id !== id));
    toast.success("Account removed", { description: `${a?.broker} ${a?.login} disconnected.` });
  };
  const addAccount = (data: { broker: string; login: string; platform: "MT4" | "MT5"; risk: Risk }) => {
    const id = `a${Date.now()}`;
    setAccounts((acc) => [
      ...acc,
      { id, broker: data.broker, login: data.login, platform: data.platform, risk: data.risk, status: "Pending", expiry: addDays("", 30), balance: "$0.00", equity: "$0.00" },
    ]);
    toast.success("Account connected", { description: `License pending validation for ${data.broker} ${data.login}.` });
    setActive("accounts");
  };

  /* ----- EA actions ----- */
  const toggleEA = (id: string) => {
    setEAs((list) => list.map((e) => e.id === id ? { ...e, state: e.state === "running" ? "paused" : "running" } : e));
    const e = eas.find((x) => x.id === id);
    toast(e?.state === "running" ? "EA paused" : "EA resumed", { description: e?.name });
  };

  /* ----- notifications ----- */
  const markAllRead = () => { setNotifs((n) => n.map((x) => ({ ...x, read: true }))); toast.success("All notifications marked read"); };
  const unreadCount = useMemo(() => notifs.filter((n) => !n.read).length, [notifs]);

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-background p-6 lg:flex">
          <Logo className="h-8 w-auto" />
          <SidebarNav active={active} onSelect={handleSelect} currentPlan={currentPlan} unread={unreadCount} />
        </aside>

        <main className="min-w-0 flex-1">
          <Topbar onMenu={() => setDrawerOpen(true)} unread={unreadCount} onBell={() => handleSelect("notifications")} />
          <div className="px-5 md:px-8 lg:px-10 py-8 space-y-10">
            {active === "overview" && <Overview onJump={handleSelect} accounts={accounts} notifs={notifs} onConnect={() => setAddOpen(true)} range={range} setRange={setRange} />}
            {active === "accounts" && <AccountsSection accounts={accounts} onConnect={() => setAddOpen(true)} onRenew={renewAccount} onRisk={cycleRisk} onRemove={removeAccount} />}
            {active === "eas" && <EAsSection eas={eas} onToggle={toggleEA} />}
            {active === "trades" && <TradesSection />}
            {active === "pamm" && <PammSection />}
            {active === "referrals" && <ReferralsSection />}
            {active === "billing" && <BillingSection currentPlan={currentPlan} onChoose={(name) => { setCurrentPlan(name); toast.success(`Switched to ${name} plan`); }} />}
            {active === "notifications" && <NotificationsSection notifs={notifs} onMarkAll={markAllRead} onRead={(id) => setNotifs((n) => n.map((x) => x.id === id ? { ...x, read: true } : x))} />}
            {active === "risk" && <RiskSection />}
            {active === "admin" && <AdminSection />}
            {active === "settings" && <SettingsSection />}
          </div>
        </main>
      </div>

      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <aside className="relative h-full w-[82%] max-w-xs bg-background border-r border-border p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <Logo className="h-7 w-auto" />
              <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="rounded-full border border-border p-2 hover:bg-secondary"><X className="size-4" /></button>
            </div>
            <SidebarNav active={active} onSelect={handleSelect} currentPlan={currentPlan} unread={unreadCount} />
          </aside>
        </div>
      )}

      {addOpen && <AddAccountDialog onClose={() => setAddOpen(false)} onSubmit={(d) => { addAccount(d); setAddOpen(false); }} />}
    </div>
  );
}

function SidebarNav({ active, onSelect, currentPlan, unread }: { active: string; onSelect: (id: string) => void; currentPlan: string; unread: number }) {
  const navigate = useNavigate();
  return (
    <>
      <nav className="mt-10 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onSelect(it.id)}
              className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors text-left ${
                isActive ? "bg-brand-soft text-brand font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="inline-flex items-center gap-3"><Icon className="size-4 shrink-0" />{it.label}</span>
              {it.id === "notifications" && unread > 0 && (
                <span className="rounded-full bg-brand text-brand-foreground text-[10px] px-1.5 py-0.5 leading-none font-medium">{unread}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Plan</p>
          <p className="mt-1 font-medium text-foreground">{currentPlan}</p>
          <p className="mt-1 text-xs text-muted-foreground">Manage from billing.</p>
          <button onClick={() => onSelect("billing")} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline">
            Upgrade <ArrowUpRight className="size-3" />
          </button>
        </div>
        <button
          onClick={() => { toast("Signed out"); navigate({ to: "/login" }); }}
          className="mt-4 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
    </>
  );
}

function Topbar({ onMenu, unread, onBell }: { onMenu: () => void; unread: number; onBell: () => void }) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-5 md:px-8 lg:px-10 py-3.5 backdrop-blur">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button onClick={onMenu} aria-label="Open menu" className="lg:hidden rounded-full border border-border bg-background p-2 hover:bg-secondary transition-colors shrink-0">
          <Menu className="size-4" />
        </button>
        <Link to="/" className="lg:hidden"><Logo className="h-6 w-auto" /></Link>
        <div className="relative w-full hidden md:block max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search accounts, EAs, trades…"
            className="w-full rounded-full border border-border bg-secondary/60 pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <button onClick={onBell} aria-label="Notifications" className="relative rounded-full border border-border bg-background p-2 hover:bg-secondary transition-colors">
          <Bell className="size-4" />
          {unread > 0 && <span className="absolute -top-1 -right-1 grid place-items-center size-4 rounded-full bg-brand text-brand-foreground text-[9px] font-medium">{unread}</span>}
        </button>
        <div className="flex items-center gap-3 rounded-full border border-border bg-background pl-1 pr-3 md:pr-4 py-1">
          <div className="size-7 rounded-full bg-brand-gradient text-white grid place-items-center text-xs font-medium">AM</div>
          <div className="hidden md:block leading-tight">
            <p className="text-xs font-medium">Alex Morgan</p>
            <p className="text-[10px] text-muted-foreground">Premium plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- shared atoms ---------- */
function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight text-ink">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Pill({ tone, children }: { tone: "ok" | "warn" | "bad" | "neutral"; children: React.ReactNode }) {
  const map = {
    ok: "bg-brand-soft text-brand",
    warn: "bg-amber-100 text-amber-800",
    bad: "bg-destructive/10 text-destructive",
    neutral: "bg-secondary text-muted-foreground",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${map[tone]}`}>
      <span className={`size-1.5 rounded-full ${tone === "ok" ? "bg-brand" : tone === "warn" ? "bg-amber-500" : tone === "bad" ? "bg-destructive" : "bg-muted-foreground"}`} />
      {children}
    </span>
  );
}

function IconBtn({ children, label, onClick, tone = "default" }: { children: React.ReactNode; label: string; onClick?: () => void; tone?: "default" | "danger" }) {
  return (
    <button
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`rounded-full border p-1.5 transition-colors ${tone === "danger" ? "border-destructive/40 text-destructive hover:bg-destructive/10" : "border-border bg-background hover:bg-secondary"}`}
    >
      {children}
    </button>
  );
}

/* ---------- sections ---------- */

function Overview({ onJump, accounts, notifs, onConnect, range, setRange }: {
  onJump: (id: string) => void; accounts: Account[]; notifs: Notif[]; onConnect: () => void;
  range: "1D" | "7D" | "30D" | "YTD"; setRange: (r: "1D" | "7D" | "30D" | "YTD") => void;
}) {
  const activeSubs = accounts.filter((a) => a.status === "Active").length;
  const totalEquity = accounts.reduce((s, a) => s + parseFloat(a.equity.replace(/[$,]/g, "")), 0);
  const stats = [
    { label: "Total equity", value: `$${totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, delta: "+2.4%", up: true },
    { label: "Open P&L", value: "+$3,128.40", delta: "+1.69%", up: true },
    { label: "Active subscriptions", value: String(activeSubs), delta: "+1", up: true },
    { label: "Drawdown", value: "−4.2%", delta: "−0.3%", up: false },
  ];

  return (
    <>
      <Reveal>
        <SectionHead
          eyebrow="Today"
          title="Welcome back, Alex."
          action={
            <button onClick={onConnect} className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
              <Plus className="size-4" /> Connect account
            </button>
          }
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 60}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.label}</p>
              <p className="mt-3 font-display text-3xl tracking-tight text-ink">{s.value}</p>
              <p className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${s.up ? "text-brand" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {s.delta} <span className="text-muted-foreground font-normal">vs last week</span>
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Equity curve</p>
                <p className="mt-1 font-display text-2xl tracking-tight text-ink">Last {range === "YTD" ? "YTD" : range}</p>
              </div>
              <div className="flex gap-1 text-xs">
                {(["1D", "7D", "30D", "YTD"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setRange(p)}
                    className={`rounded-full px-3 py-1 transition-colors ${range === p ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <EquityChart range={range} />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-2xl border border-border bg-card p-6 h-full">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Alerts</p>
              <button onClick={() => onJump("notifications")} className="text-[11px] text-brand font-medium hover:underline">View all</button>
            </div>
            <ul className="mt-5 space-y-5">
              {notifs.slice(0, 4).map((n) => (
                <li key={n.id} className="flex gap-3">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${n.read ? "bg-border" : "bg-brand"}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{n.time} ago</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <QuickGrid onJump={onJump} />
    </>
  );
}

function QuickGrid({ onJump }: { onJump: (id: string) => void }) {
  const tiles = [
    { id: "pamm", label: "PAMM status", value: "Joined · Helios Capital", icon: Users },
    { id: "referrals", label: "Referral earnings", value: "$142.60 · 4 referrals", icon: Gift },
    { id: "billing", label: "Next renewal", value: "Premium · 7 days", icon: CreditCard },
    { id: "eas", label: "Licenses", value: "4 active · 1 expired", icon: ScrollText },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {tiles.map((t) => {
        const Icon = t.icon;
        return (
          <button key={t.id} onClick={() => onJump(t.id)} className="text-left rounded-2xl border border-border bg-card p-5 hover:border-brand hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between">
              <Icon className="size-5 text-brand" />
              <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t.label}</p>
            <p className="mt-1 text-sm font-medium">{t.value}</p>
          </button>
        );
      })}
    </div>
  );
}

function EquityChart({ range }: { range: "1D" | "7D" | "30D" | "YTD" }) {
  const base = [10, 22, 18, 30, 26, 38, 35, 48, 44, 56, 60, 58, 72, 68, 80, 84, 78, 92, 96, 90, 104, 110, 108, 120, 124, 130, 128, 140, 144, 152];
  const slices = { "1D": base.slice(-6), "7D": base.slice(-12), "30D": base, "YTD": [...base, 158, 166, 162, 178, 182, 196, 190, 210] } as const;
  const points = slices[range];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 800, h = 220;
  const path = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min || 1)) * (h - 20) - 10;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-6 w-full h-56" preserveAspectRatio="none">
      <defs>
        <linearGradient id="eq" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="eqLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--brand-green)" />
          <stop offset="50%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--brand-blue)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#eq)" />
      <path d={path} fill="none" stroke="url(#eqLine)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccountsSection({ accounts, onConnect, onRenew, onRisk, onRemove }: {
  accounts: Account[]; onConnect: () => void; onRenew: (id: string) => void; onRisk: (id: string) => void; onRemove: (id: string) => void;
}) {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead
        eyebrow="Accounts"
        title="Connected trading accounts"
        action={
          <button onClick={onConnect} className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
            <Plus className="size-4" /> Connect MT4 / MT5
          </button>
        }
      />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-secondary/60 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">Broker</th>
              <th className="text-left font-medium px-6 py-3">Login</th>
              <th className="text-left font-medium px-6 py-3">Platform</th>
              <th className="text-left font-medium px-6 py-3">Risk</th>
              <th className="text-right font-medium px-6 py-3 hidden md:table-cell">Equity</th>
              <th className="text-left font-medium px-6 py-3">Expiry</th>
              <th className="text-right font-medium px-6 py-3">Status</th>
              <th className="text-right font-medium px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id} className="border-t border-border hover:bg-secondary/40 transition-colors">
                <td className="px-6 py-4 font-medium">{a.broker}</td>
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{a.login}</td>
                <td className="px-6 py-4 text-xs">{a.platform}</td>
                <td className="px-6 py-4 text-xs">{a.risk}</td>
                <td className="px-6 py-4 text-right tabular-nums hidden md:table-cell">{a.equity}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{a.expiry}</td>
                <td className="px-6 py-4 text-right">
                  <Pill tone={a.status === "Active" ? "ok" : a.status === "Pending" ? "warn" : "bad"}>{a.status}</Pill>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-1">
                    <IconBtn label="Renew" onClick={() => onRenew(a.id)}><RefreshCw className="size-3.5" /></IconBtn>
                    <IconBtn label="Cycle risk" onClick={() => onRisk(a.id)}><Sliders className="size-3.5" /></IconBtn>
                    <IconBtn label="Remove" tone="danger" onClick={() => onRemove(a.id)}><Trash2 className="size-3.5" /></IconBtn>
                  </div>
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr><td colSpan={8} className="px-6 py-10 text-center text-sm text-muted-foreground">No accounts connected yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function AddAccountDialog({ onClose, onSubmit }: { onClose: () => void; onSubmit: (d: { broker: string; login: string; platform: "MT4" | "MT5"; risk: Risk }) => void }) {
  const [broker, setBroker] = useState("Exness");
  const [login, setLogin] = useState("");
  const [platform, setPlatform] = useState<"MT4" | "MT5">("MT5");
  const [risk, setRisk] = useState<Risk>("Medium");
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center px-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-fade-in">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand">Onboarding</p>
            <h3 className="mt-1 font-display text-2xl tracking-tight text-ink">Connect MT4 / MT5</h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-border p-1.5 hover:bg-secondary"><X className="size-4" /></button>
        </div>
        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => { e.preventDefault(); if (!login.trim()) return; onSubmit({ broker, login: login.trim(), platform, risk }); }}
        >
          <Field label="Broker">
            <select value={broker} onChange={(e) => setBroker(e.target.value)} className="input">
              {["Exness", "HFM", "IC Markets", "Pepperstone", "FTMO", "Tickmill", "OctaFX"].map((b) => <option key={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Account number">
            <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="e.g. 458291" className="input" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Platform">
              <select value={platform} onChange={(e) => setPlatform(e.target.value as "MT4" | "MT5")} className="input">
                <option>MT4</option><option>MT5</option>
              </select>
            </Field>
            <Field label="Risk profile">
              <select value={risk} onChange={(e) => setRisk(e.target.value as Risk)} className="input">
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </Field>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors">Cancel</button>
            <button type="submit" className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">Connect</button>
          </div>
        </form>
      </div>
      <style>{`.input{display:block;width:100%;border-radius:0.75rem;border:1px solid var(--border);background:var(--background);padding:0.6rem 0.85rem;font-size:0.875rem;color:var(--foreground);outline:none}.input:focus{box-shadow:0 0 0 2px color-mix(in oklab, var(--brand) 35%, transparent)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function EAsSection({ eas, onToggle }: { eas: EA[]; onToggle: (id: string) => void }) {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead
        eyebrow="Automation"
        title="EA licensing & deployment"
        action={
          <Link to="/onboarding" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
            <Plus className="size-4" /> Deploy EA
          </Link>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {eas.map((ea) => (
          <div key={ea.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{ea.pair}</p>
                <h3 className="mt-1 font-display text-2xl tracking-tight text-ink">{ea.name}</h3>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">License · {ea.license}</p>
              </div>
              <button
                onClick={() => onToggle(ea.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${ea.state === "running" ? "bg-brand-soft text-brand hover:bg-brand/15" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
              >
                {ea.state === "running" ? <Pause className="size-3" /> : <Play className="size-3" />}
                {ea.state === "running" ? "Pause" : "Resume"}
              </button>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3 border-t border-border pt-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">P&amp;L</p>
                <p className={`mt-1 text-base font-medium tabular-nums ${ea.profit.startsWith("+") ? "text-brand" : "text-destructive"}`}>{ea.profit}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Win rate</p>
                <p className="mt-1 text-base font-medium tabular-nums">{ea.winrate}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">State</p>
                <p className="mt-1 text-base font-medium capitalize">{ea.state}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Expiry</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">{ea.expiry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function TradesSection() {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead
        eyebrow="Activity"
        title="Trade history"
        action={
          <button
            onClick={() => { downloadCSV(seedTrades, "itrade-trades.csv"); toast.success("CSV downloaded", { description: `${seedTrades.length} trades exported.` }); }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors"
          >
            Export CSV
          </button>
        }
      />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-secondary/60 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">Time</th>
              <th className="text-left font-medium px-6 py-3">Pair</th>
              <th className="text-left font-medium px-6 py-3">Side</th>
              <th className="text-right font-medium px-6 py-3 hidden md:table-cell">Lots</th>
              <th className="text-right font-medium px-6 py-3 hidden md:table-cell">Entry</th>
              <th className="text-right font-medium px-6 py-3">P&amp;L</th>
            </tr>
          </thead>
          <tbody>
            {seedTrades.map((t) => (
              <tr key={t.time} className="border-t border-border hover:bg-secondary/40 transition-colors">
                <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{t.time}</td>
                <td className="px-6 py-3 font-medium">{t.pair}</td>
                <td className="px-6 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${t.side === "BUY" ? "bg-brand-soft text-brand" : "bg-secondary text-foreground"}`}>{t.side}</span>
                </td>
                <td className="px-6 py-3 text-right hidden md:table-cell tabular-nums">{t.lots}</td>
                <td className="px-6 py-3 text-right hidden md:table-cell tabular-nums">{t.entry}</td>
                <td className={`px-6 py-3 text-right tabular-nums font-medium ${t.up ? "text-brand" : "text-destructive"}`}>{t.pnl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function PammSection() {
  const [joined, setJoined] = useState<string | null>("Helios Capital");
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead
        eyebrow="Managed trading"
        title="PAMM masters"
        action={<a href="https://example.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors"><Plus className="size-4" /> Join via broker</a>}
      />
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Your participation</p>
        <div className="mt-3 grid gap-6 md:grid-cols-4">
          <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Master</p><p className="mt-1 font-medium">{joined ?? "—"}</p></div>
          <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Broker</p><p className="mt-1 font-medium">Exness Partner</p></div>
          <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Allocated</p><p className="mt-1 font-medium tabular-nums">$12,400.00</p></div>
          <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">YTD profit</p><p className="mt-1 font-medium text-brand tabular-nums">+$2,841.20</p></div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {pammMasters.map((p) => {
          const isJoined = joined === p.name;
          return (
            <div key={p.name} className={`rounded-2xl border bg-card p-6 ${isJoined ? "border-brand ring-1 ring-brand/30" : "border-border"}`}>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{p.master}</p>
              <h3 className="mt-1 font-display text-2xl tracking-tight text-ink">{p.name}</h3>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
                <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">AUM</p><p className="mt-1 text-base font-medium">{p.aum}</p></div>
                <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">YTD</p><p className="mt-1 text-base font-medium text-brand tabular-nums">{p.ytd}</p></div>
                <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Fee</p><p className="mt-1 text-base font-medium tabular-nums">{p.fee}</p></div>
              </div>
              <button
                onClick={() => { if (isJoined) { setJoined(null); toast("Left PAMM strategy", { description: p.name }); } else { setJoined(p.name); toast.success("Joined PAMM strategy", { description: `${p.name} · 30% performance fee on profits.` }); } }}
                className={`mt-6 inline-flex w-full items-center justify-center gap-1 rounded-full py-2 text-sm font-medium transition-colors ${isJoined ? "bg-brand-soft text-brand hover:bg-brand/15" : "border border-border bg-background hover:bg-secondary"}`}
              >
                {isJoined ? <>Joined <Check className="size-4" /></> : <>Join strategy <ChevronRight className="size-4" /></>}
              </button>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

function ReferralsSection() {
  const link = "https://itrade.app/r/alex-morgan";
  const [refs, setRefs] = useState(referralsSeed);
  const earnings = refs.reduce((s, r) => s + parseFloat(r.earned.replace(/[$,]/g, "")), 0);
  const copy = () => { navigator.clipboard.writeText(link).then(() => toast.success("Referral link copied")); };
  const requestPayout = () => { toast.success("Payout requested", { description: `$${earnings.toFixed(2)} → review within 24 hours.` }); };
  const simulateRefer = () => {
    const n = refs.length + 1;
    setRefs((r) => [...r, { user: `@new${n}`, joined: "today", plan: "Starter", earned: "$11.60", status: "Active" }]);
    toast.success("New referral joined", { description: "+$11.60 commission credited." });
  };

  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead
        eyebrow="Gamified"
        title="Referrals"
        action={<button onClick={simulateRefer} className="rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors">Simulate referral</button>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Total earnings</p>
          <p className="mt-2 font-display text-3xl tracking-tight text-ink">${earnings.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Referrals</p>
          <p className="mt-2 font-display text-3xl tracking-tight text-ink">{refs.length} <span className="text-base text-muted-foreground">/ 10 to next tier</span></p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Tier</p>
          <p className="mt-2 font-display text-3xl tracking-tight text-ink">{refs.length >= 10 ? "Gold" : refs.length >= 5 ? "Silver" : "Bronze"}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Your referral link</p>
        <div className="mt-3 flex flex-col sm:flex-row items-stretch gap-2">
          <input readOnly value={link} className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-mono text-muted-foreground" />
          <button onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
            <Copy className="size-4" /> Copy
          </button>
          <button onClick={requestPayout} className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors">
            Request payout
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-secondary/60 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">User</th>
              <th className="text-left font-medium px-6 py-3">Joined</th>
              <th className="text-left font-medium px-6 py-3">Plan</th>
              <th className="text-right font-medium px-6 py-3">Earned</th>
              <th className="text-right font-medium px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {refs.map((r) => (
              <tr key={r.user} className="border-t border-border">
                <td className="px-6 py-4 font-medium">{r.user}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{r.joined}</td>
                <td className="px-6 py-4 text-xs">{r.plan}</td>
                <td className="px-6 py-4 text-right tabular-nums font-medium">{r.earned}</td>
                <td className="px-6 py-4 text-right"><Pill tone={r.status === "Active" ? "ok" : "warn"}>{r.status}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function BillingSection({ currentPlan, onChoose }: { currentPlan: string; onChoose: (name: string) => void }) {
  const [method, setMethod] = useState<"Stripe" | "Paystack" | "Flutterwave" | "Crypto">("Stripe");
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Subscriptions" title="Plans & billing" />
      <div className="grid gap-4 md:grid-cols-4">
        {plansSeed.map((p) => {
          const isCurrent = p.name === currentPlan;
          return (
            <div key={p.name} className={`rounded-2xl border bg-card p-6 ${isCurrent ? "border-brand ring-1 ring-brand/30" : "border-border"}`}>
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{p.name}</p>
                {isCurrent && <Pill tone="ok">Current</Pill>}
              </div>
              <p className="mt-3 font-display text-3xl tracking-tight text-ink">{p.price}<span className="text-sm text-muted-foreground">/mo</span></p>
              <p className="mt-2 text-xs text-muted-foreground">{p.range}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.limit}</p>
              <button
                onClick={() => isCurrent ? toast("Already on this plan") : onChoose(p.name)}
                className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${isCurrent ? "border border-border bg-background hover:bg-secondary" : "bg-foreground text-background hover:bg-foreground/90"}`}
              >
                {isCurrent ? "Manage" : "Switch"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <div className="px-6 py-4 border-b border-border"><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Invoices</p></div>
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-secondary/60 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-6 py-3">Invoice</th>
                <th className="text-left font-medium px-6 py-3">Date</th>
                <th className="text-left font-medium px-6 py-3">Plan</th>
                <th className="text-right font-medium px-6 py-3">Amount</th>
                <th className="text-right font-medium px-6 py-3">Status</th>
                <th className="text-right font-medium px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} className="border-t border-border">
                  <td className="px-6 py-4 font-mono text-xs">{i.id}</td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">{i.date}</td>
                  <td className="px-6 py-4 text-xs">{i.plan}</td>
                  <td className="px-6 py-4 text-right tabular-nums">{i.amount}</td>
                  <td className="px-6 py-4 text-right"><Pill tone="ok">{i.status}</Pill></td>
                  <td className="px-6 py-4 text-right"><button onClick={() => toast.success("Invoice downloaded", { description: i.id })} className="text-xs text-brand hover:underline">Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Payment method</p>
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div className="flex items-center gap-3"><CreditCard className="size-5 text-brand" /><div><p className="text-sm font-medium">Visa •••• 4242</p><p className="text-xs text-muted-foreground">Expires 09/28</p></div></div>
            <Pill tone="ok">Default</Pill>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {(["Stripe", "Paystack", "Flutterwave", "Crypto"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMethod(m); toast(`Provider: ${m}`); }}
                className={`rounded-full border px-3 py-1.5 transition-colors ${method === m ? "border-brand bg-brand-soft text-brand" : "border-border bg-background hover:bg-secondary"}`}
              >
                {m}
              </button>
            ))}
          </div>
          <button onClick={() => toast.success("Method added", { description: "Mastercard •••• 1881" })} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors"><Plus className="size-4" /> Add method</button>
        </div>
      </div>
    </Reveal>
  );
}

function NotificationsSection({ notifs, onMarkAll, onRead }: { notifs: Notif[]; onMarkAll: () => void; onRead: (id: string) => void }) {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Inbox" title="Notifications" action={<button onClick={onMarkAll} className="text-sm text-muted-foreground hover:text-foreground">Mark all read</button>} />
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {notifs.map((n) => (
          <button key={n.id} onClick={() => onRead(n.id)} className={`flex w-full items-start gap-4 p-6 text-left transition-colors hover:bg-secondary/40 ${n.read ? "opacity-70" : ""}`}>
            <div className="mt-1 size-9 shrink-0 grid place-items-center rounded-full bg-brand-soft text-brand">
              {n.kind === "alert" && <Shield className="size-4" />}
              {n.kind === "billing" && <CreditCard className="size-4" />}
              {n.kind === "ea" && <Bot className="size-4" />}
              {n.kind === "referral" && <Gift className="size-4" />}
              {n.kind === "announce" && <Megaphone className="size-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{n.title}{!n.read && <span className="ml-2 inline-block size-1.5 rounded-full bg-brand align-middle" />}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground shrink-0">{n.time}</p>
          </button>
        ))}
      </div>
    </Reveal>
  );
}

function RiskSection() {
  const initial = [
    { key: "dailyLoss", label: "Max daily loss", val: "2.0%", icon: Shield, enabled: true },
    { key: "posSize", label: "Max position size", val: "1.5 lots", icon: Activity, enabled: true },
    { key: "news", label: "News blackout", val: "Enabled", icon: Bell, enabled: true },
    { key: "default", label: "Default risk profile", val: "Medium", icon: Sliders, enabled: true },
    { key: "margin", label: "Margin alerts", val: "≤ 250%", icon: Shield, enabled: true },
    { key: "flatten", label: "Auto-flatten", val: "Disabled", icon: ShieldCheck, enabled: false },
  ];
  const [items, setItems] = useState(initial);
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Guardrails" title="Risk controls" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r, idx) => {
          const Icon = r.icon;
          return (
            <div key={r.key} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <Icon className="size-5 text-brand" />
                <button
                  onClick={() => { setItems((arr) => arr.map((x, i) => i === idx ? { ...x, enabled: !x.enabled } : x)); toast(`${r.label}: ${r.enabled ? "disabled" : "enabled"}`); }}
                  className={`text-[11px] font-medium rounded-full px-2.5 py-1 transition-colors ${r.enabled ? "bg-brand-soft text-brand" : "bg-secondary text-muted-foreground"}`}
                >
                  {r.enabled ? "On" : "Off"}
                </button>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">{r.label}</p>
              <p className="mt-1 font-display text-3xl tracking-tight text-ink">{r.val}</p>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

function AdminSection() {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Operator" title="Admin controls" action={<Link to="/admin" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors">Open admin console <ArrowUpRight className="size-3.5" /></Link>} />
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Users", value: "2,481" },
          { label: "Active subs", value: "1,732" },
          { label: "Connected accounts", value: "4,098" },
          { label: "Open payouts", value: "$8,420" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl tracking-tight text-ink">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">For full user, subscription, EA version, PAMM and payout management open the operator console.</p>
    </Reveal>
  );
}

function SettingsSection() {
  const navigate = useNavigate();
  const [twofa, setTwofa] = useState(true);
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Profile" title="Account settings" />
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6 max-w-2xl">
        <div className="grid gap-4 md:grid-cols-2">
          <Setting label="Name" value="Alex Morgan" />
          <Setting label="Email" value="alex@morgan.fm" />
          <Setting label="Plan" value="Premium" />
          <Setting label="2FA" value={twofa ? "Enabled" : "Disabled"} />
          <Setting label="Country" value="Singapore" />
          <Setting label="Default risk" value="Medium" />
        </div>
        <div className="border-t border-border pt-6 flex flex-wrap gap-3">
          <button onClick={() => toast.success("Profile updated")} className="rounded-full border border-border bg-background px-5 py-2 text-sm hover:bg-secondary transition-colors">Edit profile</button>
          <button onClick={() => toast.success("Verification email sent", { description: "alex@morgan.fm" })} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-sm hover:bg-secondary transition-colors"><Mail className="size-4" /> Verify email</button>
          <button onClick={() => { setTwofa((v) => !v); toast(twofa ? "2FA disabled" : "2FA enabled"); }} className="rounded-full border border-border bg-background px-5 py-2 text-sm hover:bg-secondary transition-colors">Toggle 2FA</button>
          <button onClick={() => { toast("Signed out"); navigate({ to: "/login" }); }} className="rounded-full border border-destructive/40 bg-background px-5 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">Sign out</button>
        </div>
      </div>
    </Reveal>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
