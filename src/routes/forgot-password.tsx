import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, Field, SubmitBtn } from "@/components/site/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{ title: "Forgot password — iTrade" }],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell
      eyebrow="Recovery"
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={
        sent
          ? "If an account exists for that email, a reset link is on its way."
          : "Enter the email tied to your iTrade account and we’ll send a reset link."
      }
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="text-brand hover:underline">Back to sign in</Link>
        </>
      }
    >
      {sent ? (
        <Link
          to="/login"
          className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          Return to sign in
        </Link>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Field label="Email" id="email" type="email" autoComplete="email" placeholder="you@firm.com" required />
          <SubmitBtn>Send reset link</SubmitBtn>
        </form>
      )}
    </AuthShell>
  );
}
