import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const primaryNav = [
  { to: "/", label: "Home" },
  { to: "/ea-licensing", label: "EA Licensing" },
  { to: "/pamm", label: "PAMM" },
  { to: "/pricing", label: "Pricing" },
];

const secondaryNav = [
  { to: "/documentation", label: "Docs" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const navLinks = [...primaryNav, ...secondaryNav];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-5 md:px-8 lg:px-10">
        <Logo className="h-7 md:h-8 w-auto" />

        {/* Desktop nav — center */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-1">
          {primaryNav.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-brand-soft data-[status=active]:text-brand data-[status=active]:font-medium"
            >
              {l.label}
            </Link>
          ))}
          <span className="mx-1 h-4 w-px bg-border/70" />
          {secondaryNav.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-brand-soft data-[status=active]:text-brand data-[status=active]:font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/login"
            className="hidden md:inline-flex items-center text-sm font-medium text-foreground hover:text-brand transition-colors px-3"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hidden md:inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            Get started <ArrowUpRight className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center rounded-full border border-border bg-background p-2 text-foreground hover:bg-secondary transition-colors"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

    </header>
    {open && (
      <div className="fixed inset-0 z-[100] md:hidden bg-background text-foreground animate-fade-in">
        <div className="flex min-h-screen flex-col overflow-y-auto px-5 pb-8">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/70">
            <Logo className="h-7 w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background p-2 text-foreground hover:bg-secondary transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-between py-8">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">Menu</p>
              <ul className="mt-5 flex flex-col gap-2">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 font-display text-2xl leading-none text-foreground transition-colors hover:bg-secondary data-[status=active]:border-brand/40 data-[status=active]:bg-brand-soft data-[status=active]:text-brand"
                    >
                      {l.label}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
                >
                  Get started
                </Link>
              </div>
              <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Account</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                <li><Link to="/dashboard" className="block rounded-xl bg-secondary px-4 py-3 text-sm text-foreground hover:text-brand transition-colors">Dashboard</Link></li>
                <li><Link to="/onboarding" className="block rounded-xl bg-secondary px-4 py-3 text-sm text-foreground hover:text-brand transition-colors">EA Onboarding</Link></li>
                <li><Link to="/admin" className="block rounded-xl bg-secondary px-4 py-3 text-sm text-foreground hover:text-brand transition-colors">Admin</Link></li>
                <li><Link to="/forgot-password" className="block rounded-xl bg-secondary px-4 py-3 text-sm text-foreground hover:text-brand transition-colors">Forgot password</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
