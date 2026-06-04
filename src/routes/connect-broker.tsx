import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, Server, KeyRound, ShieldCheck, Loader2 } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/connect-broker")({
  head: () => ({ meta: [{ title: "Connect broker — iTrade" }] }),
  component: Connect,
});

const brokers = ["Exness", "HFM", "IC Markets", "Pepperstone", "FTMO", "OANDA", "Tickmill", "FxPro"];

function Connect() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [broker, setBroker] = useState("Exness");
  const [platform, setPlatform] = useState<"MT4" | "MT5">("MT5");
  const [login, setLogin] = useState("");
  const [server, setServer] = useState("Exness-Real4");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const test = () => {
    if (!login || !pwd) { toast.error("Login and investor password required"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${platform} handshake OK — bridge online`);
      setStep(3);
    }, 1600);
  };

  const finish = () => {
    toast.success("Broker linked to your iTrade account");
    navigate({ to: "/dashboard" });
  };

  return (
    <PageShell eyebrow="Onboarding" title="Connect your broker" lede="Mock wizard that mirrors the production MT4/MT5 bridge handshake. No live credentials are stored.">
      <div className="flex gap-2 text-xs">
        {["Broker", "Credentials", "Confirm"].map((s, i) => (
          <div key={s} className={`flex-1 rounded-full px-3 py-2 border ${step > i ? "border-brand bg-brand-soft text-brand" : "border-border text-muted-foreground"}`}>
            {i + 1}. {s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Section title="Select broker & platform">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {brokers.map(b => (
              <button key={b} onClick={() => setBroker(b)} className={`rounded-xl border px-3 py-3 text-sm ${broker === b ? "border-brand bg-brand-soft text-brand" : "border-border hover:bg-secondary"}`}>
                {b}
              </button>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            {(["MT4","MT5"] as const).map(p => (
              <button key={p} onClick={() => setPlatform(p)} className={`rounded-full border px-4 py-2 text-sm ${platform === p ? "border-brand bg-brand-soft text-brand" : "border-border hover:bg-secondary"}`}>{p}</button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="mt-4 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90">Continue</button>
        </Section>
      )}

      {step === 2 && (
        <Section title="Enter investor credentials">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Account login</span>
              <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="e.g. 458291"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-brand" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Server</span>
              <input value={server} onChange={(e) => setServer(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-brand" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1"><KeyRound className="size-3" /> Investor (read) password</span>
              <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand" />
            </label>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1"><ShieldCheck className="size-3" /> Investor password is read-only — it cannot place trades.</p>
          <div className="flex gap-2 pt-2">
            <button onClick={() => setStep(1)} className="rounded-full border border-border px-5 py-2.5 text-sm hover:bg-secondary">Back</button>
            <button onClick={test} disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-60">
              {loading ? <><Loader2 className="size-4 animate-spin" /> Testing handshake…</> : <><Server className="size-4" /> Test connection</>}
            </button>
          </div>
        </Section>
      )}

      {step === 3 && (
        <Section title="Connection verified">
          <div className="rounded-xl border border-brand/40 bg-brand-soft/30 p-5">
            <p className="inline-flex items-center gap-2 font-medium text-foreground"><Check className="size-4 text-brand" /> {broker} {platform} #{login} linked</p>
            <ul className="mt-3 text-sm text-muted-foreground space-y-1 font-mono">
              <li>Latency: 38 ms</li>
              <li>Bridge: itrade-eu-west-2</li>
              <li>Equity snapshot: $8,420.55</li>
              <li>Symbols visible: 142</li>
            </ul>
          </div>
          <button onClick={finish} className="mt-3 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90">Finish & open dashboard</button>
        </Section>
      )}
    </PageShell>
  );
}
