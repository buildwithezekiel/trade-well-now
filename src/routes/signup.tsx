import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AuthShell, Field, SubmitBtn, SocialBtn } from "@/components/site/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [{ title: "Sign up — iTrade" }, { name: "description", content: "Create your iTrade account." }],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Five minutes to connect your first MT4 or MT5 account. No card required."
      footer={
        <>
          Already a member?{" "}
          <Link to="/login" className="text-brand hover:underline">Sign in</Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/auth-callback" });
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" id="first" autoComplete="given-name" placeholder="Alex" required />
          <Field label="Last name" id="last" autoComplete="family-name" placeholder="Morgan" required />
        </div>
        <Field label="Email" id="email" type="email" autoComplete="email" placeholder="you@firm.com" required />
        <Field label="Password" id="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" required />

        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" required className="mt-0.5 accent-brand" />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="text-brand hover:underline">Terms</Link> and{" "}
            <Link to="/privacy" className="text-brand hover:underline">Privacy Policy</Link>.
          </span>
        </label>

        <SubmitBtn>Create account</SubmitBtn>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              or
            </span>
          </div>
        </div>

        <SocialBtn>Sign up with Google</SocialBtn>
        <SocialBtn>Sign up with Apple</SocialBtn>
      </form>
    </AuthShell>
  );
}
