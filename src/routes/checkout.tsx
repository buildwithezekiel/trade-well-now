import { useState, useMemo } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { Lock, CreditCard, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";

type Search = { plan?: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): Search => ({ plan: typeof s.plan === "string" ? s.plan : undefined }),
  head: () => ({ meta: [{ title: "Checkout — iTrade" }, { name: "description", content: "Secure checkout (mock)." }] }),
  component: Checkout,
});

const plans: Record<string, { name: string; price: number; period: string; features: string[] }> = {
  starter:  { name: "Starter",  price: 49,  period: "/mo", features: ["1 trading account", "10,000 USD cap", "Email support"] },
  standard: { name: "Standard", price: 129, period: "/mo", features: ["3 accounts", "50,000 USD cap", "Priority support"] },
  premium:  { name: "Premium",  price: 299, period: "/mo", features: ["5 accounts", "250,000 USD cap", "24/7 support"] },
  elite:    { name: "Elite",    price: 699, period: "/mo", features: ["10 accounts", "Unlimited cap", "Dedicated rep"] },
};

function Checkout() {
  const { plan = "premium" } = useSearch({ from: "/checkout" });
  const navigate = useNavigate();
  const tier = plans[plan] ?? plans.premium;
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [exp, setExp] = useState("12/29");
  const [cvc, setCvc] = useState("123");
  const [email, setEmail] = useState("trader@example.com");
  const [country, setCountry] = useState("United Kingdom");

  const tax = useMemo(() => +(tier.price * 0.2).toFixed(2), [tier.price]);
  const total = +(tier.price + tax).toFixed(2);

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Payment authorized");
      navigate({ to: "/checkout-success", search: { plan } });
    }, 1400);
  };

  return (
    <PageShell eyebrow="Billing" title="Secure checkout" lede="This is a mock checkout. No real card is charged. Use any details to simulate the flow.">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={pay} className="space-y-6">
          <Section title="Contact">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand" />
            </label>
          </Section>

          <Section title="Payment method">
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground"><CreditCard className="size-4" /> Card</span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Lock className="size-3" /> Encrypted</span>
              </div>
              <label className="block">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Card number</span>
                <input value={card} onChange={(e) => setCard(e.target.value)} required
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-brand" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Expiry</span>
                  <input value={exp} onChange={(e) => setExp(e.target.value)} required
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-brand" />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">CVC</span>
                  <input value={cvc} onChange={(e) => setCvc(e.target.value)} required
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:border-brand" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Billing country</span>
                <select value={country} onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand">
                  {["United Kingdom","United States","Germany","France","Nigeria","UAE","Singapore","Australia"].map(c => <option key={c}>{c}</option>)}
                </select>
              </label>
            </div>
          </Section>

          <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-background hover:bg-foreground/90 transition disabled:opacity-60">
            {loading ? "Processing…" : <>Pay ${total.toFixed(2)} <ArrowRight className="size-4" /></>}
          </button>
          <p className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-3.5" /> Mock environment — no real charge. PCI-DSS reference flow.</p>
        </form>

        <aside className="rounded-2xl border border-border bg-card p-5 h-fit lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Order summary</p>
          <h3 className="mt-2 font-display text-2xl">{tier.name} EA License</h3>
          <p className="mt-1 text-sm text-muted-foreground">Monthly billing, cancel anytime.</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {tier.features.map(f => <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 text-brand" /> {f}</li>)}
          </ul>
          <dl className="mt-5 space-y-1.5 text-sm border-t border-border pt-4">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-mono">${tier.price.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">VAT (20%)</dt><dd className="font-mono">${tax.toFixed(2)}</dd></div>
            <div className="flex justify-between border-t border-border pt-2 font-medium text-foreground"><dt>Total due</dt><dd className="font-mono">${total.toFixed(2)}{tier.period}</dd></div>
          </dl>
          <Link to="/pricing" className="mt-4 inline-block text-xs text-brand hover:underline">← Change plan</Link>
        </aside>
      </div>
    </PageShell>
  );
}
