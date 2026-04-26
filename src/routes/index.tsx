import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Activity, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OralAI — AI Dental Risk Assessment" },
      { name: "description", content: "Predictive analytics and early intervention for oral healthcare powered by AI." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background sm:my-6 sm:min-h-[calc(100vh-3rem)] sm:rounded-[2.25rem] sm:overflow-hidden sm:border sm:border-border shadow-card">
        <div className="relative flex flex-1 flex-col items-center justify-between bg-gradient-hero px-6 py-12 text-center">
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-card shadow-glow">
              <Sparkles className="h-10 w-10 text-mint-foreground" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">OralAI</h1>
            <p className="text-sm text-muted-foreground">Predictive analytics for oral healthcare</p>
          </div>

          <div className="my-10 grid w-full grid-cols-2 gap-3">
            {[
              { t: "AI Risk", d: "Smart scoring" },
              { t: "Early Care", d: "Prevention first" },
              { t: "Reports", d: "Trends & insights" },
              { t: "Dentists", d: "Connect easily" },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-card p-4 text-left shadow-soft">
                <Activity className="mb-2 h-5 w-5 text-mint-foreground" />
                <p className="text-sm font-semibold">{f.t}</p>
                <p className="text-xs text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="w-full space-y-3">
            <button
              onClick={() => navigate({ to: "/signup" })}
              className="w-full rounded-2xl bg-gradient-mint py-4 text-base font-semibold text-mint-foreground shadow-glow active:scale-[0.99]"
            >
              Get Started
            </button>
            <Link
              to="/login"
              className="block w-full rounded-2xl border border-border bg-card py-4 text-center text-base font-semibold text-foreground"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
