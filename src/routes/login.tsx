import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — OralAI" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background sm:my-6 sm:min-h-[calc(100vh-3rem)] sm:rounded-[2.25rem] sm:overflow-hidden sm:border sm:border-border shadow-card">
        <div className="flex flex-1 flex-col px-6 pb-8 pt-14">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-mint shadow-glow">
              <Sparkles className="h-8 w-8 text-mint-foreground" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">OralAI</h1>
            <p className="mt-1 text-sm text-muted-foreground">Welcome back. Let's check your smile.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
            className="mt-10 space-y-4"
          >
            <Field icon={<Mail className="h-4 w-4" />} label="Email or Phone" type="email" placeholder="you@example.com" />
            <Field icon={<Lock className="h-4 w-4" />} label="Password" type="password" placeholder="••••••••" />

            <div className="text-right">
              <button type="button" className="text-xs font-medium text-mint-foreground">Forgot password?</button>
            </div>

            <button className="w-full rounded-2xl bg-gradient-mint py-4 text-base font-semibold text-mint-foreground shadow-glow active:scale-[0.99]">
              Login
            </button>
          </form>

          <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-foreground underline-offset-4 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, ...props }: { icon: React.ReactNode; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 focus-within:ring-2 focus-within:ring-ring">
        <span className="text-muted-foreground">{icon}</span>
        <input {...props} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </div>
    </label>
  );
}
