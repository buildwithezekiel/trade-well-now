import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Logo } from "@/components/site/Logo";

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between">
          <Logo className="h-8 w-auto" />
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-16">
          <Reveal className="w-full max-w-md">
            <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-sm">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
              )}
              <div className="mt-8">{children}</div>
            </div>
            {footer && (
              <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  id,
  type = "text",
  placeholder,
  autoComplete,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition"
      />
    </div>
  );
}

export function SubmitBtn({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-all hover:bg-brand/90"
    >
      {children}
    </button>
  );
}

export function SocialBtn({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
    >
      {children}
    </button>
  );
}
