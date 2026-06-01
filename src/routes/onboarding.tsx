import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "EA Onboarding — iTrade" },
      { name: "description", content: "Connect your MT4 or MT5 account and activate your iTrade EA license." },
    ],
  }),
  component: OnboardingPage,
});

const steps = ["Personal", "Broker", "Account", "Risk", "Review"] as const;
type Step = typeof steps[number];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("Personal");
  const idx = steps.indexOf(step);

  const next = () => {
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
    else navigate({ to: "/dashboard" });
  };
  const back = () => { if (idx > 0) setStep(steps[idx - 1]); };

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 md:px-8 py-5">
          <Logo className="h-7 w-auto" />
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 md:px-8 py-10 md:py-16 grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* Stepper */}
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">Onboarding</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">EA setup</h1>
          <p className="mt-2 text-sm text-muted-foreground">5 quick steps. Nothing stored without your consent.</p>
          <ol className="mt-8 space-y-1">
            {steps.map((s, i) => {
              const done = i < idx;
              const current = i === idx;
              return (
                <li key={s}>
                  <button onClick={() => i <= idx && setStep(s)} className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-left transition-colors ${current ? "bg-brand-soft text-brand font-medium" : done ? "text-foreground hover:bg-secondary" : "text-muted-foreground"}`}>
                    <span className={`grid size-6 place-items-center rounded-full text-[11px] font-medium ${done ? "bg-brand text-brand-foreground" : current ? "border border-brand text-brand" : "border border-border text-muted-foreground"}`}>
                      {done ? <Check className="size-3" /> : i + 1}
                    </span>
                    {s}
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Form */}
        <Reveal key={step}>
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
            {step === "Personal" && (
              <Form title="Personal information" desc="We use this to issue your EA license.">
                <Field label="Full name" placeholder="Alex Morgan" />
                <Field label="Email" type="email" placeholder="you@firm.com" />
                <Field label="Country" placeholder="Singapore" />
              </Form>
            )}
            {step === "Broker" && (
              <Form title="Broker information" desc="iTrade never receives your funds — these details are only used to license the EA.">
                <Field label="Broker name" placeholder="Exness" />
                <Field label="MT4 / MT5 account number" placeholder="458291" />
                <Select label="Platform" options={["MT4", "MT5"]} />
              </Form>
            )}
            {step === "Account" && (
              <Form title="Trading account" desc="Tells the EA the right lot sizing envelope.">
                <Field label="Account size (USD)" placeholder="5000" />
                <Select label="Account currency" options={["USD", "EUR", "GBP", "JPY", "AUD"]} />
              </Form>
            )}
            {step === "Risk" && (
              <Form title="Risk profile" desc="You can change this any time from the dashboard.">
                <RadioGroup name="risk" options={[
                  { v: "low", label: "Low", body: "≤ 0.5% per trade · slow & steady" },
                  { v: "med", label: "Medium", body: "≤ 1.0% per trade · default" },
                  { v: "high", label: "High", body: "≤ 2.0% per trade · aggressive" },
                ]} />
                <Field label="Custom risk % (optional)" placeholder="1.25" />
              </Form>
            )}
            {step === "Review" && (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">Almost done</p>
                  <h2 className="mt-2 font-display text-3xl tracking-tight">Review & accept</h2>
                </div>
                <ul className="space-y-3 rounded-2xl border border-border p-5 text-sm">
                  <li className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">Alex Morgan</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Broker</span><span className="font-medium">Exness · MT5 · 458291</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Account size</span><span className="font-medium tabular-nums">$5,000.00</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Risk profile</span><span className="font-medium">Medium</span></li>
                </ul>
                <label className="flex items-start gap-2 text-sm text-muted-foreground"><input type="checkbox" required className="mt-1 accent-brand" /><span>I accept the <Link to="/terms" className="text-brand hover:underline">Terms</Link> and the <Link to="/risk-disclaimer" className="text-brand hover:underline">Trading Risk Disclaimer</Link>.</span></label>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
              <button onClick={back} disabled={idx === 0} className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-colors">Back</button>
              <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors">
                {idx === steps.length - 1 ? "Activate EA" : "Continue"} <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

function Form({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">Step</p>
        <h2 className="mt-2 font-display text-3xl tracking-tight">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <input type={type} placeholder={placeholder} className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition" />
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <select className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

function RadioGroup({ name, options }: { name: string; options: { v: string; label: string; body: string }[] }) {
  return (
    <div className="md:col-span-2 grid gap-3 md:grid-cols-3">
      {options.map((o, i) => (
        <label key={o.v} className="cursor-pointer rounded-2xl border border-border bg-background p-5 hover:border-brand transition-colors has-[:checked]:border-brand has-[:checked]:bg-brand-soft">
          <input type="radio" name={name} defaultChecked={i === 1} className="sr-only" />
          <p className="font-medium">{o.label}</p>
          <p className="mt-1 text-xs text-muted-foreground">{o.body}</p>
        </label>
      ))}
    </div>
  );
}
