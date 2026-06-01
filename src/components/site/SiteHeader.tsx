import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/ea-licensing", label: "EA Licensing" },
  { to: "/pamm", label: "PAMM" },
  { to: "/pricing", label: "Pricing" },
  { to: "/documentation", label: "Docs" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-10">
        <Logo className="h-7 md:h-8 w-auto" />

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hidden sm:inline-flex items-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors"
          >
            Sign up
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center rounded-full border border-border bg-background p-2 text-foreground hover:bg-secondary transition-colors"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-background animate-fade-in">
          <div className="mx-auto max-w-[1440px] px-5 py-8 flex flex-col h-full overflow-y-auto">
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
            <div className="mt-8 grid grid-cols-2 gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-secondary transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors"
              >
                Sign up
              </Link>
            </div>
            <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Account</p>
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
