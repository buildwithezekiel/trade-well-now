import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, LineChart, Bot, Users, Wallet, Settings, Bell, Search,
  ArrowUpRight, ArrowDownRight, Plus, Activity, Shield, LogOut, ChevronRight, Play, Pause,
  Menu, X, Gift, CreditCard, ScrollText, ShieldCheck, Copy, Trash2, RefreshCw, Sliders, Mail, Megaphone,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — iTrade" }, { name: "description", content: "Your iTrade command center." }],
  }),
  component: DashboardPage,
});

/* ---------- mock data ---------- */
const stats = [
  { label: "Total equity", value: "$184,520.18", delta: "+2.4%", up: true },
  { label: "Open P&L", value: "+$3,128.40", delta: "+1.69%", up: true },
  { label: "Active subscriptions", value: "6", delta: "+1", up: true },
  { label: "Drawdown", value: "−4.2%", delta: "−0.3%", up: false },
];

type AccountStatus = "Active" | "Expired" | "Pending";
type Risk = "Low" | "Medium" | "High";
const accounts: { broker: string; login: string; platform: "MT4" | "MT5"; risk: Risk; status: AccountStatus; expiry: string; balance: string; equity: string }[] = [
  { broker: "Exness", login: "458291", platform: "MT5", risk: "Medium", status: "Active", expiry: "12 Aug 2026", balance: "$8,420.55", equity: "$8,512.10" },
  { broker: "HFM", login: "773821", platform: "MT4", risk: "Low", status: "Active", expiry: "18 Sep 2026", balance: "$2,140.00", equity: "$2,188.90" },
  { broker: "IC Markets", login: "992812", platform: "MT5", risk: "High", status: "Expired", expiry: "10 May 2026", balance: "$5,000.00", equity: "$4,609.18" },
  { broker: "Pepperstone", login: "20384756", platform: "MT5", risk: "Medium", status: "Active", expiry: "02 Jan 2027", balance: "$52,140.00", equity: "$53,118.90" },
  { broker: "FTMO", login: "FTMO-99213", platform: "MT4", risk: "High", status: "Pending", expiry: "—", balance: "$50,000.00", equity: "$50,000.00" },
];

const eas = [
  { name: "Aurora Grid v3.2", pair: "EUR/USD", profit: "+$1,420", winrate: "68%", state: "running", license: "ITR-AUR-9F21", expiry: "12 Aug 2026" },
  { name: "Reaper Scalp", pair: "XAU/USD", profit: "+$842", winrate: "59%", state: "running", license: "ITR-RPS-7C04", expiry: "18 Sep 2026" },
  { name: "Nightfall Trend", pair: "GBP/JPY", profit: "−$210", winrate: "44%", state: "paused", license: "ITR-NTF-3A88", expiry: "10 May 2026" },
  { name: "Tide Hedge", pair: "USD/CAD", profit: "+$612", winrate: "71%", state: "running", license: "ITR-THG-1B55", expiry: "02 Jan 2027" },
];

const trades = [
  { time: "14:02:41", pair: "EUR/USD", side: "BUY", lots: "1.20", entry: "1.0832", pnl: "+$118.40", up: true },
  { time: "13:58:09", pair: "XAU/USD", side: "SELL", lots: "0.50", entry: "2384.20", pnl: "+$245.00", up: true },
  { time: "13:44:22", pair: "GBP/JPY", side: "BUY", lots: "0.30", entry: "198.32", pnl: "−$62.10", up: false },
  { time: "13:21:08", pair: "USD/CAD", side: "SELL", lots: "0.80", entry: "1.3712", pnl: "+$94.20", up: true },
  { time: "12:55:47", pair: "EUR/USD", side: "BUY", lots: "0.60", entry: "1.0828", pnl: "+$48.20", up: true },
  { time: "12:14:12", pair: "AUD/USD", side: "SELL", lots: "0.40", entry: "0.6584", pnl: "+$28.10", up: true },
];

const pamm = [
  { name: "Helios Capital", master: "M. Chen", aum: "$2.4M", ytd: "+38.2%", fee: "30%" },
  { name: "Quiet Alpha", master: "S. Mitchell", aum: "$1.8M", ytd: "+24.8%", fee: "30%" },
  { name: "Northstar PAMM", master: "J. Rodriguez", aum: "$950K", ytd: "+19.4%", fee: "25%" },
];

const notifications = [
  { title: "Drawdown threshold approached", body: "FTMO-99213 reached 7.8% of 10% limit.", time: "8m", kind: "alert" as const },
  { title: "Subscription renewing", body: "Exness 458291 renews in 7 days ($89.00).", time: "2h", kind: "billing" as const },
  { title: "EA deployed", body: "Aurora Grid v3.2 started on Pepperstone (20384756).", time: "5h", kind: "ea" as const },
  { title: "Referral payout", body: "$42.00 commission credited from referral @leo.", time: "1d", kind: "referral" as const },
  { title: "Platform update", body: "Risk presets v2 now available across all plans.", time: "3d", kind: "announce" as const },
];

const plans = [
  { name: "Starter", range: "$500 – $1,999", price: "$29", limit: "1 account" },
  { name: "Standard", range: "$2,000 – $4,999", price: "$59", limit: "3 accounts" },
  { name: "Premium", range: "$5,000 – $9,999", price: "$89", limit: "10 accounts", current: true },
  { name: "Elite", range: "$10,000+", price: "$149", limit: "Unlimited" },
];

const invoices = [
  { id: "INV-20603", date: "01 Jun 2026", plan: "Premium", amount: "$89.00", status: "Paid" },
  { id: "INV-20502", date: "01 May 2026", plan: "Premium", amount: "$89.00", status: "Paid" },
  { id: "INV-20401", date: "01 Apr 2026", plan: "Standard", amount: "$59.00", status: "Paid" },
];

const referrals = [
  { user: "@leo", joined: "12 May 2026", plan: "Standard", earned: "$42.00", status: "Active" },
  { user: "@nadia", joined: "04 May 2026", plan: "Premium", earned: "$89.00", status: "Active" },
  { user: "@kwame", joined: "28 Apr 2026", plan: "Starter", earned: "$11.60", status: "Active" },
  { user: "@maria", joined: "12 Apr 2026", plan: "—", earned: "$0.00", status: "Pending" },
];

const adminUsers = [
  { name: "Alex Morgan", email: "alex@morgan.fm", plan: "Premium", accounts: 4, status: "Active" },
  { name: "Sara Mitchell", email: "sara@quietalpha.io", plan: "Elite", accounts: 12, status: "Active" },
  { name: "Marcus Chen", email: "m.chen@helios.cap", plan: "Premium", accounts: 7, status: "Active" },
  { name: "Janet Park", email: "janet@pk.studio", plan: "Starter", accounts: 1, status: "Suspended" },
];

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

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleSelect = (id: string) => {
    setActive(id);
    setDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-background p-6 lg:flex">
          <Logo className="h-8 w-auto" />
          <SidebarNav active={active} onSelect={handleSelect} />
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <Topbar onMenu={() => setDrawerOpen(true)} />
          <div className="px-5 md:px-8 lg:px-10 py-8 space-y-10">
            {active === "overview" && <Overview onJump={handleSelect} />}
            {active === "accounts" && <AccountsSection />}
            {active === "eas" && <EAsSection />}
            {active === "trades" && <TradesSection />}
            {active === "pamm" && <PammSection />}
            {active === "referrals" && <ReferralsSection />}
            {active === "billing" && <BillingSection />}
            {active === "notifications" && <NotificationsSection />}
            {active === "risk" && <RiskSection />}
            {active === "admin" && <AdminSection />}
            {active === "settings" && <SettingsSection />}
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={() => setDrawerOpen(false)} />
          <aside className="relative h-full w-[82%] max-w-xs bg-background border-r border-border p-6 flex flex-col animate-slide-in-right" style={{ animation: "slide-in-right 0.25s ease-out" }}>
            <div className="flex items-center justify-between">
              <Logo className="h-7 w-auto" />
              <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="rounded-full border border-border p-2 hover:bg-secondary transition-colors">
                <X className="size-4" />
              </button>
            </div>
            <SidebarNav active={active} onSelect={handleSelect} />
          </aside>
        </div>
      )}
    </div>
  );
}

function SidebarNav({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
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
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors text-left ${
                isActive
                  ? "bg-brand-soft text-brand font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {it.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Plan</p>
          <p className="mt-1 font-medium text-foreground">Premium</p>
          <p className="mt-1 text-xs text-muted-foreground">Up to 10 accounts.</p>
          <Link to="/pricing" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline">
            Upgrade <ArrowUpRight className="size-3" />
          </Link>
        </div>
        <Link
          to="/login"
          className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <LogOut className="size-4" /> Sign out
        </Link>
      </div>
    </>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-5 md:px-8 lg:px-10 py-3.5 backdrop-blur">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button onClick={onMenu} aria-label="Open menu" className="lg:hidden rounded-full border border-border bg-background p-2 hover:bg-secondary transition-colors shrink-0">
          <Menu className="size-4" />
        </button>
        <Link to="/" className="lg:hidden">
          <Logo className="h-6 w-auto" />
        </Link>
        <div className="relative w-full hidden md:block max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search accounts, EAs, trades…"
            className="w-full rounded-full border border-border bg-secondary/60 pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <button className="relative rounded-full border border-border bg-background p-2 hover:bg-secondary transition-colors">
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-brand" />
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
        <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">{title}</h2>
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

/* ---------- sections ---------- */

function Overview({ onJump }: { onJump: (id: string) => void }) {
  return (
    <>
      <Reveal>
        <SectionHead
          eyebrow="Today"
          title="Welcome back, Alex."
          action={
            <Link to="/onboarding" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
              <Plus className="size-4" /> Connect account
            </Link>
          }
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 60}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.label}</p>
              <p className="mt-3 font-display text-3xl tracking-tight">{s.value}</p>
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
                <p className="mt-1 font-display text-2xl tracking-tight">Last 30 days</p>
              </div>
              <div className="flex gap-1 text-xs">
                {["1D", "7D", "30D", "YTD"].map((p, i) => (
                  <button key={p} className={`rounded-full px-3 py-1 transition-colors ${i === 2 ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <EquityChart />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-2xl border border-border bg-card p-6 h-full">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Alerts</p>
              <button onClick={() => onJump("notifications")} className="text-[11px] text-brand font-medium hover:underline">View all</button>
            </div>
            <ul className="mt-5 space-y-5">
              {notifications.slice(0, 4).map((n) => (
                <li key={n.title} className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
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
      <AccountsSection compact />
      <TradesSection compact />
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
          <button key={t.id} onClick={() => onJump(t.id)} className="text-left rounded-2xl border border-border bg-card p-5 hover:border-brand/40 hover:bg-card transition-colors group">
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

function EquityChart() {
  const points = [10, 22, 18, 30, 26, 38, 35, 48, 44, 56, 60, 58, 72, 68, 80, 84, 78, 92, 96, 90, 104, 110, 108, 120, 124, 130, 128, 140, 144, 152];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 800, h = 220;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min)) * (h - 20) - 10;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-6 w-full h-56" preserveAspectRatio="none">
      <defs>
        <linearGradient id="eq" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="eqLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--brand-green)" />
          <stop offset="50%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--brand-blue)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#eq)" />
      <path d={path} fill="none" stroke="url(#eqLine)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccountsSection({ compact = false }: { compact?: boolean }) {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead
        eyebrow="Accounts"
        title={compact ? "Connected accounts" : "All trading accounts"}
        action={
          !compact ? (
            <Link to="/onboarding" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
              <Plus className="size-4" /> Connect MT4 / MT5
            </Link>
          ) : null
        }
      />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-secondary/50 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">Broker</th>
              <th className="text-left font-medium px-6 py-3">Login</th>
              <th className="text-left font-medium px-6 py-3">Platform</th>
              <th className="text-left font-medium px-6 py-3">Risk</th>
              <th className="text-right font-medium px-6 py-3 hidden md:table-cell">Equity</th>
              <th className="text-left font-medium px-6 py-3">Expiry</th>
              <th className="text-right font-medium px-6 py-3">Status</th>
              {!compact && <th className="text-right font-medium px-6 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.login} className="border-t border-border hover:bg-secondary/40 transition-colors">
                <td className="px-6 py-4 font-medium">{a.broker}</td>
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{a.login}</td>
                <td className="px-6 py-4 text-xs">{a.platform}</td>
                <td className="px-6 py-4 text-xs">{a.risk}</td>
                <td className="px-6 py-4 text-right tabular-nums hidden md:table-cell">{a.equity}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{a.expiry}</td>
                <td className="px-6 py-4 text-right">
                  <Pill tone={a.status === "Active" ? "ok" : a.status === "Pending" ? "warn" : "bad"}>{a.status}</Pill>
                </td>
                {!compact && (
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <IconBtn label="Renew"><RefreshCw className="size-3.5" /></IconBtn>
                      <IconBtn label="Change risk"><Sliders className="size-3.5" /></IconBtn>
                      <IconBtn label="Remove"><Trash2 className="size-3.5" /></IconBtn>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button title={label} aria-label={label} className="rounded-full border border-border bg-background p-1.5 hover:bg-secondary transition-colors">
      {children}
    </button>
  );
}

function EAsSection() {
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
          <div key={ea.name} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{ea.pair}</p>
                <h3 className="mt-1 font-display text-2xl tracking-tight">{ea.name}</h3>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">License · {ea.license}</p>
              </div>
              <button className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${ea.state === "running" ? "bg-brand-soft text-brand" : "bg-secondary text-muted-foreground"}`}>
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

function TradesSection({ compact = false }: { compact?: boolean }) {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead
        eyebrow="Activity"
        title={compact ? "Recent trades" : "Trade history"}
        action={!compact ? <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors">Export CSV</button> : null}
      />
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-secondary/50 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
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
            {trades.map((t) => (
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
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead
        eyebrow="Managed trading"
        title="PAMM masters"
        action={<button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors"><Plus className="size-4" /> Join via broker</button>}
      />
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Your participation</p>
        <div className="mt-3 grid gap-6 md:grid-cols-4">
          <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Master</p><p className="mt-1 font-medium">Helios Capital</p></div>
          <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Broker</p><p className="mt-1 font-medium">Exness Partner</p></div>
          <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Allocated</p><p className="mt-1 font-medium tabular-nums">$12,400.00</p></div>
          <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">YTD profit</p><p className="mt-1 font-medium text-brand tabular-nums">+$2,841.20</p></div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {pamm.map((p) => (
          <div key={p.name} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{p.master}</p>
            <h3 className="mt-1 font-display text-2xl tracking-tight">{p.name}</h3>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
              <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">AUM</p><p className="mt-1 text-base font-medium">{p.aum}</p></div>
              <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">YTD</p><p className="mt-1 text-base font-medium text-brand tabular-nums">{p.ytd}</p></div>
              <div><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Fee</p><p className="mt-1 text-base font-medium tabular-nums">{p.fee}</p></div>
            </div>
            <button className="mt-6 inline-flex w-full items-center justify-center gap-1 rounded-full border border-border bg-background py-2 text-sm font-medium hover:bg-secondary transition-colors">
              View profile <ChevronRight className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function ReferralsSection() {
  const link = "https://itrade.app/r/alex-morgan";
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Gamified" title="Referrals" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Total earnings</p>
          <p className="mt-2 font-display text-3xl tracking-tight">$142.60</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Referrals</p>
          <p className="mt-2 font-display text-3xl tracking-tight">4 <span className="text-base text-muted-foreground">/ 10 to next tier</span></p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Tier</p>
          <p className="mt-2 font-display text-3xl tracking-tight">Silver</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Your referral link</p>
        <div className="mt-3 flex flex-col sm:flex-row items-stretch gap-2">
          <input readOnly value={link} className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-mono text-muted-foreground" />
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
            <Copy className="size-4" /> Copy
          </button>
          <button className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors">
            Request payout
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-secondary/50 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">User</th>
              <th className="text-left font-medium px-6 py-3">Joined</th>
              <th className="text-left font-medium px-6 py-3">Plan</th>
              <th className="text-right font-medium px-6 py-3">Earned</th>
              <th className="text-right font-medium px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((r) => (
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

function BillingSection() {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Subscriptions" title="Plans & billing" />
      <div className="grid gap-4 md:grid-cols-4">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-2xl border bg-card p-6 ${p.current ? "border-brand ring-1 ring-brand/30" : "border-border"}`}>
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{p.name}</p>
              {p.current && <Pill tone="ok">Current</Pill>}
            </div>
            <p className="mt-3 font-display text-3xl tracking-tight">{p.price}<span className="text-sm text-muted-foreground">/mo</span></p>
            <p className="mt-2 text-xs text-muted-foreground">{p.range}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.limit}</p>
            <button className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${p.current ? "border border-border bg-background hover:bg-secondary" : "bg-foreground text-background hover:bg-foreground/90"}`}>
              {p.current ? "Manage" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <div className="px-6 py-4 border-b border-border"><p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Invoices</p></div>
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-secondary/50 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-6 py-3">Invoice</th>
                <th className="text-left font-medium px-6 py-3">Date</th>
                <th className="text-left font-medium px-6 py-3">Plan</th>
                <th className="text-right font-medium px-6 py-3">Amount</th>
                <th className="text-right font-medium px-6 py-3">Status</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Payment methods</p>
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div className="flex items-center gap-3"><CreditCard className="size-5 text-brand" /><div><p className="text-sm font-medium">Visa •••• 4242</p><p className="text-xs text-muted-foreground">Expires 09/28</p></div></div>
            <Pill tone="ok">Default</Pill>
          </div>
          <div className="text-xs text-muted-foreground">Stripe · Paystack · Flutterwave · Crypto</div>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors"><Plus className="size-4" /> Add method</button>
        </div>
      </div>
    </Reveal>
  );
}

function NotificationsSection() {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Inbox" title="Notifications" action={<button className="text-sm text-muted-foreground hover:text-foreground">Mark all read</button>} />
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {notifications.map((n) => (
          <div key={n.title} className="flex items-start gap-4 p-6">
            <div className="mt-1 size-9 shrink-0 grid place-items-center rounded-full bg-brand-soft text-brand">
              {n.kind === "alert" && <Shield className="size-4" />}
              {n.kind === "billing" && <CreditCard className="size-4" />}
              {n.kind === "ea" && <Bot className="size-4" />}
              {n.kind === "referral" && <Gift className="size-4" />}
              {n.kind === "announce" && <Megaphone className="size-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground shrink-0">{n.time}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function RiskSection() {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Guardrails" title="Risk controls" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Max daily loss", val: "2.0%", icon: Shield },
          { label: "Max position size", val: "1.5 lots", icon: Activity },
          { label: "News blackout", val: "Enabled", icon: Bell },
          { label: "Default risk profile", val: "Medium", icon: Sliders },
          { label: "Margin alerts", val: "≤ 250%", icon: Shield },
          { label: "Auto-flatten", val: "Disabled", icon: ShieldCheck },
        ].map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.label} className="rounded-2xl border border-border bg-card p-6">
              <Icon className="size-5 text-brand" />
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">{r.label}</p>
              <p className="mt-1 font-display text-3xl tracking-tight">{r.val}</p>
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
            <p className="mt-2 font-display text-3xl tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-secondary/50 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">User</th>
              <th className="text-left font-medium px-6 py-3">Email</th>
              <th className="text-left font-medium px-6 py-3">Plan</th>
              <th className="text-right font-medium px-6 py-3">Accounts</th>
              <th className="text-right font-medium px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((u) => (
              <tr key={u.email} className="border-t border-border">
                <td className="px-6 py-4 font-medium">{u.name}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground font-mono">{u.email}</td>
                <td className="px-6 py-4 text-xs">{u.plan}</td>
                <td className="px-6 py-4 text-right tabular-nums">{u.accounts}</td>
                <td className="px-6 py-4 text-right"><Pill tone={u.status === "Active" ? "ok" : "bad"}>{u.status}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function SettingsSection() {
  const navigate = useNavigate();
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead eyebrow="Profile" title="Account settings" />
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6 max-w-2xl">
        <div className="grid gap-4 md:grid-cols-2">
          <Setting label="Name" value="Alex Morgan" />
          <Setting label="Email" value="alex@morgan.fm" />
          <Setting label="Plan" value="Premium" />
          <Setting label="2FA" value="Enabled" />
          <Setting label="Country" value="Singapore" />
          <Setting label="Default risk" value="Medium" />
        </div>
        <div className="border-t border-border pt-6 flex flex-wrap gap-3">
          <button className="rounded-full border border-border bg-background px-5 py-2 text-sm hover:bg-secondary transition-colors">Edit profile</button>
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-sm hover:bg-secondary transition-colors"><Mail className="size-4" /> Verify email</button>
          <button onClick={() => navigate({ to: "/login" })} className="rounded-full border border-destructive/40 bg-background px-5 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">Sign out</button>
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
