import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AuthShell, Field, SubmitBtn, SocialBtn } from "@/components/site/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Login — iTrade" }, { name: "description", content: "Sign in to your iTrade account." }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to iTrade"
      subtitle="Resume your command center. No funds are ever held by iTrade."
      footer={
        <>
          New to iTrade?{" "}
          <Link to="/signup" className="text-brand hover:underline">Create an account</Link>
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
        <Field label="Email" id="email" type="email" autoComplete="email" placeholder="you@firm.com" required />
        <div>
          <Field label="Password" id="password" type="password" autoComplete="current-password" placeholder="••••••••" required />
          <div className="mt-2 flex justify-end">
            <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-brand transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
        <SubmitBtn>Sign in</SubmitBtn>

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

        <SocialBtn>Continue with Google</SocialBtn>
        <SocialBtn>Continue with Apple</SocialBtn>
      </form>
    </AuthShell>
  );
}
