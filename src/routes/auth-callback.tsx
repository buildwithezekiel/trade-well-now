import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth-callback")({
  head: () => ({
    meta: [{ title: "Authenticating… — iTrade" }],
  }),
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/dashboard" }), 1400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto flex size-12 items-center justify-center">
          <span className="block size-6 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        </div>
        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
          Authenticating
        </p>
        <h1 className="mt-2 font-display text-3xl tracking-tight">Securing your session</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Verifying credentials and loading your command center…
        </p>
      </div>
    </div>
  );
}
