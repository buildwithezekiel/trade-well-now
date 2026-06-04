import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, ShieldCheck, Activity } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/track-record")({
  head: () => ({ meta: [{ title: "Track record — iTrade" }, { name: "description", content: "Mock verified performance across iTrade EA strategies." }] }),
  component: Page,
});

const strategies = ["Aurora Grid v3.2", "Reaper Scalp", "Nightfall Trend", "Tide Hedge"];

// deterministic pseudo-random curve
function curve(seed: number, n = 120, start = 10000) {
  let v = start;
  const pts: number[] = [];
  for (let i = 0; i < n; i++) {
    const r = Math.sin(seed * (i + 1) * 0.37) * 0.012 + 0.0015;
    v = v * (1 + r);
    pts.push(v);
  }
  return pts;
}

function Sparkline({ data }: { data: number[] }) {
  const w = 700, h = 200;
  const min = Math.min(...data), max = Math.max(...data);
  const path = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48 text-brand">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g)" />
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Page() {
  const [strategy, setStrategy] = useState(strategies[0]);
  const seed = useMemo(() => strategies.indexOf(strategy) + 1, [strategy]);
  const data = useMemo(() => curve(seed), [seed]);
  const final = data[data.length - 1];
  const ret = ((final / data[0] - 1) * 100).toFixed(1);
  const dd = (Math.random() * 0 + 8.4 + seed * 0.6).toFixed(1);

  return (
    <PageShell eyebrow="Performance" title="Verified track record" lede="Mock equity curves for active iTrade EA strategies. Live data ships with broker-verified myFxBook attestation.">
      <div className="flex flex-wrap gap-2">
        {strategies.map(s => (
          <button key={s} onClick={() => setStrategy(s)} className={`rounded-full border px-3 py-1.5 text-xs ${strategy === s ? "border-brand bg-brand-soft text-brand" : "border-border text-muted-foreground hover:bg-secondary"}`}>{s}</button>
        ))}
      </div>

      <Section title={strategy}>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { Icon: TrendingUp, label: "Return (120d)", value: `+${ret}%` },
              { Icon: Activity, label: "Max drawdown", value: `-${dd}%` },
              { Icon: ShieldCheck, label: "Verified by", value: "myFxBook" },
            ].map(s => (
              <div key={s.label}>
                <s.Icon className="size-4 text-brand" />
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="font-display text-2xl">{s.value}</p>
              </div>
            ))}
          </div>
          <Sparkline data={data} />
        </div>
      </Section>

      <Section title="Monthly returns (mock)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-2">Month</th><th className="text-right p-2">Return</th><th className="text-right p-2">DD</th><th className="text-right p-2">Trades</th></tr>
            </thead>
            <tbody>
              {["May 26","Apr 26","Mar 26","Feb 26","Jan 26","Dec 25"].map((m, i) => {
                const r = (Math.sin(seed * (i + 2)) * 4 + 3.2).toFixed(2);
                return (
                  <tr key={m} className="border-t border-border">
                    <td className="p-2">{m}</td>
                    <td className={`p-2 text-right ${+r >= 0 ? "text-emerald-500" : "text-red-500"}`}>{+r >= 0 ? "+" : ""}{r}%</td>
                    <td className="p-2 text-right text-muted-foreground">-{(Math.abs(+r) * 0.7).toFixed(2)}%</td>
                    <td className="p-2 text-right text-muted-foreground">{120 + i * 18}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs">Past performance does not guarantee future results. Returns shown are net of all platform fees.</p>
      </Section>
    </PageShell>
  );
}
