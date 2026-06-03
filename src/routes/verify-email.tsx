import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthShell } from "@/components/site/AuthShell";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [{ title: "Verify email — iTrade" }],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setCode((arr) => arr.map((c, idx) => (idx === i ? d : c)));
    if (d) {
      const next = document.getElementById(`otp-${i + 1}`);
      next?.focus();
    }
  };

  const resend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Verification code re-sent", { description: "Check your inbox in a moment." });
    }, 700);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.some((c) => !c)) {
      toast.error("Enter all 6 digits");
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      toast.success("Email verified", { description: "Redirecting to your dashboard…" });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 600);
    }, 900);
  };

  return (
    <AuthShell
      eyebrow="Verify"
      title="Confirm your email"
      subtitle="We sent a 6-digit code to your inbox. Enter it below to activate your iTrade account."
      footer={
        <>
          Wrong address?{" "}
          <Link to="/signup" className="font-medium text-foreground hover:text-brand">
            Start over
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {code.map((c, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              inputMode="numeric"
              maxLength={1}
              value={c}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !c && i > 0) {
                  document.getElementById(`otp-${i - 1}`)?.focus();
                }
              }}
              className="h-14 w-full max-w-[3.25rem] rounded-xl border border-input bg-background text-center font-display text-2xl tracking-wider text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={verifying}
          className="w-full rounded-full bg-foreground py-3 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-60 transition-colors"
        >
          {verifying ? "Verifying…" : "Verify email"}
        </button>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Didn&rsquo;t get it?</span>
          <button
            type="button"
            onClick={resend}
            disabled={sending}
            className="font-medium text-brand hover:underline disabled:opacity-60"
          >
            {sending ? "Sending…" : "Resend code"}
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
