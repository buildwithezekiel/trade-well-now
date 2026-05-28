import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, LineChart, Bot, Users, Wallet, Settings, Bell, Search,
  ArrowUpRight, ArrowDownRight, Plus, Activity, Shield, LogOut, ChevronRight, Play, Pause,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

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
  { label: "Today’s trades", value: "47", delta: "+12", up: true },
  { label: "Drawdown", value: "−4.2%", delta: "−0.3%", up: false },
];

const accounts = [
  { broker: "IC Markets", login: "10293847", server: "ICMarkets-Live04", balance: "$84,210.55", equity: "$85,302.10", status: "active" },
  { broker: "Pepperstone", login: "20384756", server: "Pepperstone-Live02", balance: "$52,140.00", equity: "$53,118.90", status: "active" },
  { broker: "FTMO", login: "FTMO-99213", server: "FTMO-Server2", balance: "$50,000.00", equity: "$46,099.18", status: "warning" },
];

const eas = [
  { name: "Aurora Grid v3.2", pair: "EUR/USD", profit: "+$1,420", winrate: "68%", state: "running" },
  { name: "Reaper Scalp", pair: "XAU/USD", profit: "+$842", winrate: "59%", state: "running" },
  { name: "Nightfall Trend", pair: "GBP/JPY", profit: "−$210", winrate: "44%", state: "paused" },
  { name: "Tide Hedge", pair: "USD/CAD", profit: "+$612", winrate: "71%", state: "running" },
];

const trades = [
  { time: "14:02:41", pair: "EUR/USD", side: "BUY", lots: "1.20", entry: "1.0832", pnl: "+$118.40", up: true },
  { time: "13:58:09", pair: "XAU/USD", side: "SELL", lots: "0.50", entry: "2384.20", pnl: "+$245.00", up: true },
  { time: "13:44:22", pair: "GBP/JPY", side: "BUY", lots: "0.30", entry: "198.32", pnl: "−$62.10", up: false },
  { time: "13:21:08", pair: "USD/CAD", side: "SELL", lots: "0.80", entry: "1.3712", pnl: "+$94.20", up: true },
  { time: "12:55:47", pair: "EUR/USD", side: "BUY", lots: "0.60", entry: "1.0828", pnl: "+$48.20", up: true },
];

const pamm = [
  { name: "Helios Capital", master: "M. Chen", aum: "$2.4M", ytd: "+38.2%", fee: "30%" },
  { name: "Quiet Alpha", master: "S. Mitchell", aum: "$1.8M", ytd: "+24.8%", fee: "30%" },
  { name: "Northstar PAMM", master: "J. Rodriguez", aum: "$950K", ytd: "+19.4%", fee: "25%" },
];

const notifications = [
  { title: "Drawdown threshold approached", body: "FTMO-99213 reached 7.8% of 10% limit.", time: "8m" },
  { title: "EA deployed", body: "Aurora Grid v3.2 started on IC Markets (10293847).", time: "1h" },
  { title: "Weekly report ready", body: "Your performance digest is available.", time: "Yesterday" },
];

/* ---------- shell ---------- */
const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "accounts", label: "Accounts", icon: Wallet },
  { id: "eas", label: "EAs & Strategies", icon: Bot },
  { id: "trades", label: "Trades", icon: LineChart },
  { id: "pamm", label: "PAMM", icon: Users },
  { id: "risk", label: "Risk", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

function DashboardPage() {
  const [active, setActive] = useState("overview");
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-background p-6 lg:flex">
          <Link
            to="/"
            className="text-2xl tracking-tight text-foreground"
            style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic" }}
          >
            iTrade
          </Link>

          <nav className="mt-10 flex flex-col gap-1">
            {navItems.map((it) => {
              const Icon = it.icon;
              const isActive = active === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(it.id)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-brand-soft text-brand font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {it.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto">
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
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="px-6 lg:px-10 py-8 space-y-10">
            {active === "overview" && <Overview />}
            {active === "accounts" && <AccountsSection />}
            {active === "eas" && <EAsSection />}
            {active === "trades" && <TradesSection />}
            {active === "pamm" && <PammSection />}
            {active === "risk" && <RiskSection />}
            {active === "settings" && <SettingsSection />}
          </div>
        </main>
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-6 lg:px-10 py-4 backdrop-blur">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search accounts, EAs, trades…"
            className="w-full rounded-full border border-border bg-secondary/60 pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative rounded-full border border-border bg-background p-2 hover:bg-secondary transition-colors">
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-brand" />
        </button>
        <div className="flex items-center gap-3 rounded-full border border-border bg-background pl-1 pr-4 py-1">
          <div className="size-7 rounded-full bg-brand text-brand-foreground grid place-items-center text-xs font-medium">AM</div>
          <div className="hidden md:block leading-tight">
            <p className="text-xs font-medium">Alex Morgan</p>
            <p className="text-[10px] text-muted-foreground">Premium plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- sections ---------- */

function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Overview() {
  return (
    <>
      <Reveal>
        <SectionHead
          eyebrow="Today"
          title="Welcome back, Alex."
          action={
            <button className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
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
              <p className="mt-3 font-display text-3xl tracking-tight">{s.value}</p>
              <p className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${s.up ? "text-brand" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {s.delta} <span className="text-muted-foreground font-normal">vs yesterday</span>
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Equity curve</p>
                <p className="mt-1 font-display text-2xl tracking-tight">Last 30 days</p>
              </div>
              <div className="flex gap-1 text-xs">
                {["1D", "7D", "30D", "YTD"].map((p, i) => (
                  <button
                    key={p}
                    className={`rounded-full px-3 py-1 transition-colors ${i === 2 ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary"}`}
                  >
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
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Alerts</p>
            <ul className="mt-5 space-y-5">
              {notifications.map((n) => (
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

      <AccountsSection compact />
      <TradesSection compact />
    </>
  );
}

function EquityChart() {
  // mock ascending sparkline
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
      </defs>
      <path d={area} fill="url(#eq)" />
      <path d={path} fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors">
              <Plus className="size-4" /> Connect MT4 / MT5
            </button>
          ) : null
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">Broker</th>
              <th className="text-left font-medium px-6 py-3 hidden md:table-cell">Login</th>
              <th className="text-left font-medium px-6 py-3 hidden lg:table-cell">Server</th>
              <th className="text-right font-medium px-6 py-3">Balance</th>
              <th className="text-right font-medium px-6 py-3">Equity</th>
              <th className="text-right font-medium px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.login} className="border-t border-border hover:bg-secondary/40 transition-colors">
                <td className="px-6 py-4 font-medium">{a.broker}</td>
                <td className="px-6 py-4 hidden md:table-cell font-mono text-xs text-muted-foreground">{a.login}</td>
                <td className="px-6 py-4 hidden lg:table-cell text-xs text-muted-foreground">{a.server}</td>
                <td className="px-6 py-4 text-right tabular-nums">{a.balance}</td>
                <td className="px-6 py-4 text-right tabular-nums font-medium">{a.equity}</td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      a.status === "active"
                        ? "bg-brand-soft text-brand"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full ${a.status === "active" ? "bg-brand" : "bg-destructive"}`} />
                    {a.status === "active" ? "Active" : "Watch"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function EAsSection() {
  return (
    <Reveal as="section" className="space-y-5">
      <SectionHead
        eyebrow="Automation"
        title="Expert Advisors"
        action={
          <button className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
            <Plus className="size-4" /> Deploy EA
          </button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {eas.map((ea) => (
          <div key={ea.name} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{ea.pair}</p>
                <h3 className="mt-1 font-display text-2xl tracking-tight">{ea.name}</h3>
              </div>
              <button
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  ea.state === "running" ? "bg-brand-soft text-brand" : "bg-secondary text-muted-foreground"
                }`}
              >
                {ea.state === "running" ? <Pause className="size-3" /> : <Play className="size-3" />}
                {ea.state === "running" ? "Pause" : "Resume"}
              </button>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">P&amp;L</p>
                <p className={`mt-1 text-base font-medium tabular-nums ${ea.profit.startsWith("+") ? "text-brand" : "text-destructive"}`}>
                  {ea.profit}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Win rate</p>
                <p className="mt-1 text-base font-medium tabular-nums">{ea.winrate}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">State</p>
                <p className="mt-1 text-base font-medium capitalize">{ea.state}</p>
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
        action={
          !compact ? (
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm hover:bg-secondary transition-colors">
              Export CSV
            </button>
          ) : null
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
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
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${t.side === "BUY" ? "bg-brand-soft text-brand" : "bg-secondary text-foreground"}`}>
                    {t.side}
                  </span>
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
      <SectionHead eyebrow="Allocators" title="PAMM masters" />
      <div className="grid gap-4 md:grid-cols-3">
        {pamm.map((p) => (
          <div key={p.name} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{p.master}</p>
            <h3 className="mt-1 font-display text-2xl tracking-tight">{p.name}</h3>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">AUM</p>
                <p className="mt-1 text-base font-medium">{p.aum}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">YTD</p>
                <p className="mt-1 text-base font-medium text-brand tabular-nums">{p.ytd}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Fee</p>
                <p className="mt-1 text-base font-medium tabular-nums">{p.fee}</p>
              </div>
            </div>
            <button className="mt-6 inline-flex w-full items-center justify-center gap-1 rounded-full border border-border bg-background py-2 text-sm font-medium hover:bg-secondary transition-colors">
              Allocate <ChevronRight className="size-4" />
            </button>
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
        </div>
        <div className="border-t border-border pt-6 flex flex-wrap gap-3">
          <button className="rounded-full border border-border bg-background px-5 py-2 text-sm hover:bg-secondary transition-colors">
            Edit profile
          </button>
          <button
            onClick={() => navigate({ to: "/login" })}
            className="rounded-full border border-destructive/40 bg-background px-5 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            Sign out
          </button>
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
