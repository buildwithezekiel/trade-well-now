import { Link } from "@tanstack/react-router";

function Logo() {
  return (
    <span
      className="text-2xl tracking-tight text-foreground"
      style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic" }}
    >
      iTrade
    </span>
  );
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/ea-licensing", label: "EA Licensing" },
  { to: "/pamm", label: "PAMM" },
  { to: "/pricing", label: "Pricing" },
  { to: "/documentation", label: "Docs" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        <div className="hidden lg:flex items-center gap-8">
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
            className="hidden sm:inline-flex items-center rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center rounded-full bg-brand px-5 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
