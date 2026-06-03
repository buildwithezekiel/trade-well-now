import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

const product = [
  { to: "/ea-licensing", label: "EA Licensing" },
  { to: "/pamm", label: "PAMM Module" },
  { to: "/pricing", label: "Pricing" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/onboarding", label: "EA Onboarding" },
];
const support = [
  { to: "/documentation", label: "Documentation" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];
const account = [
  { to: "/login", label: "Login" },
  { to: "/signup", label: "Sign up" },
  { to: "/forgot-password", label: "Forgot password" },
  { to: "/verify-email", label: "Verify email" },
  { to: "/admin", label: "Admin" },
];
const legal = [
  { to: "/risk-disclaimer", label: "Risk Disclaimer" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
];

const cols = [
  { title: "Product", links: product },
  { title: "Support", links: support },
  { title: "Account", links: account },
  { title: "Legal", links: legal },
];

function MobileCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{title}</span>
        <ChevronDown className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="pb-3 space-y-2 animate-fade-in">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-sm text-foreground hover:text-brand transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DesktopCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-foreground hover:text-brand transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      {/* Mobile compact */}
      <div className="md:hidden mx-auto max-w-[1440px] px-5 py-8">
        <div className="flex items-center justify-between">
          <Logo className="h-7 w-auto" />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-brand-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-brand">
            <span className="size-1.5 rounded-full bg-brand-gradient" /> Non-custodial
          </span>
        </div>
        <div className="mt-5">
          {cols.map((c) => (
            <MobileCol key={c.title} {...c} />
          ))}
        </div>
        <p className="mt-5 text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} iTrade. Funds stay with your broker.
        </p>
      </div>

      {/* Desktop expanded */}
      <div className="hidden md:block">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:px-10 py-20 md:grid-cols-6">
          <div className="md:col-span-2">
            <Logo className="h-9 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A non-custodial command center for automated MT4 / MT5 trading. Funds stay with your broker — always.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-brand-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              <span className="size-1.5 rounded-full bg-brand-gradient" /> Non-custodial
            </div>
          </div>
          {cols.map((c) => (
            <DesktopCol key={c.title} {...c} />
          ))}
        </div>
        <div className="border-t border-border/70">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-6 lg:px-10 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} iTrade. All rights reserved.</p>
            <p>iTrade does not hold client funds and does not execute discretionary trades.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
