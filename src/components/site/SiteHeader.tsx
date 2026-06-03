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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-5 md:px-8 lg:px-10">
        <Link to="/" className="shrink-0">
          <Logo className="h-7 md:h-8 w-auto" />
        </Link>

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

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-background animate-fade-in">
          <div className="mx-auto max-w-[1440px] px-5 py-6 flex flex-col h-full overflow-y-auto">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    className="block rounded-xl px-4 py-3 text-base text-foreground hover:bg-secondary transition-colors data-[status=active]:bg-brand-soft data-[status=active]:text-brand data-[status=active]:font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3">
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
            <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Account</p>
            <ul className="mt-3 flex flex-col gap-1">
              <li><Link to="/dashboard" className="block rounded-xl px-4 py-3 text-sm text-foreground hover:bg-secondary">Dashboard</Link></li>
              <li><Link to="/onboarding" className="block rounded-xl px-4 py-3 text-sm text-foreground hover:bg-secondary">EA Onboarding</Link></li>
              <li><Link to="/admin" className="block rounded-xl px-4 py-3 text-sm text-foreground hover:bg-secondary">Admin</Link></li>
              <li><Link to="/forgot-password" className="block rounded-xl px-4 py-3 text-sm text-foreground hover:bg-secondary">Forgot password</Link></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
