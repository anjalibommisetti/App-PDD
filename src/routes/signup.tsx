import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, Phone, Stethoscope, FlaskConical, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — OralAI" }] }),
  component: Signup,
});

const roles = [
  { id: "patient", label: "Patient", icon: UserRound },
  { id: "dentist", label: "Dentist", icon: Stethoscope },
  { id: "researcher", label: "Researcher", icon: FlaskConical },
];

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background sm:my-6 sm:min-h-[calc(100vh-3rem)] sm:rounded-[2.25rem] sm:overflow-hidden sm:border sm:border-border shadow-card">
        <div className="flex flex-1 flex-col px-6 pb-8 pt-12">
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join OralAI for personalized dental care.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
            className="mt-6 space-y-4"
          >
            <Field icon={<User className="h-4 w-4" />} label="Full name" placeholder="Jane Doe" />
            <Field icon={<Mail className="h-4 w-4" />} label="Email" type="email" placeholder="you@example.com" />
            <Field icon={<Phone className="h-4 w-4" />} label="Phone" type="tel" placeholder="+1 555 000 0000" />
            <Field icon={<Lock className="h-4 w-4" />} label="Password" type="password" placeholder="••••••••" />

            <div>
              <span className="mb-2 block text-xs font-medium text-muted-foreground">Role</span>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const active = role === r.id;
                  return (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-xs font-medium transition-all",
                        active
                          ? "border-transparent bg-gradient-mint text-mint-foreground shadow-soft"
                          : "border-border bg-card text-muted-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button className="mt-2 w-full rounded-2xl bg-gradient-mint py-4 text-base font-semibold text-mint-foreground shadow-glow active:scale-[0.99]">
              Create account
            </button>
          </form>

          <p className="mt-auto pt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-foreground hover:underline">Login</Link>
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
