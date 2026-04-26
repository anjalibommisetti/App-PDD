import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { Activity, BarChart3, Bell, Calendar, ChevronRight, Flame, Sparkles, Stethoscope, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — OralAI" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <PhoneShell>
      <header className="px-5 pt-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Good morning,</p>
            <h1 className="text-xl font-bold">Jane Doe</h1>
          </div>
          <Link to="/alerts" className="relative flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-alert" />
          </Link>
        </div>
        <h2 className="mt-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">Oral Health Dashboard</h2>
      </header>

      <div className="space-y-4 px-5 pb-24 pt-4">
        {/* Hero AI card */}
        <Link
          to="/assessment"
          className="block rounded-3xl bg-gradient-mint p-5 shadow-glow"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card/70 backdrop-blur">
              <Sparkles className="h-5 w-5 text-mint-foreground" />
            </div>
            <span className="rounded-full bg-card/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-mint-foreground">AI</span>
          </div>
          <p className="mt-5 text-lg font-bold text-mint-foreground">AI Risk Assessment</p>
          <p className="mt-1 text-sm text-mint-foreground/80">Check your dental health using AI analysis</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-soft">
            Start Assessment <ChevronRight className="h-4 w-4" />
          </div>
        </Link>

        {/* Streak */}
        <div className="flex items-center gap-4 rounded-3xl bg-gradient-peach p-4 shadow-soft">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card/70">
            <Flame className="h-6 w-6 text-peach-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-peach-foreground">5 Day Oral Care Streak 🔥</p>
            <p className="text-xs text-peach-foreground/80">Keep brushing to reach 7 days</p>
          </div>
        </div>

        {/* Last report */}
        <div className="rounded-3xl bg-card p-5 shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Last assessment</p>
              <p className="mt-1 text-3xl font-bold">72%</p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-peach/40 px-2.5 py-1 text-[11px] font-semibold text-peach-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                Medium Risk
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <Calendar className="ml-auto mb-1 h-4 w-4" />
              Apr 22, 2026
            </div>
          </div>
          <Link
            to="/results"
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-border bg-secondary py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            View Report <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Quick actions */}
        <div>
          <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick actions</p>
          <div className="grid grid-cols-3 gap-3">
            <QuickAction to="/history" icon={<BarChart3 className="h-5 w-5" />} label="Reports" tone="mint" />
            <QuickAction to="/dentists" icon={<Stethoscope className="h-5 w-5" />} label="Dentist" tone="peach" />
            <QuickAction to="/alerts" icon={<Bell className="h-5 w-5" />} label="Reminders" tone="beige" />
          </div>
        </div>

        {/* AI confidence */}
        <div className="rounded-3xl bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint/40">
                <TrendingUp className="h-5 w-5 text-mint-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Confidence</p>
                <p className="text-xs text-muted-foreground">Based on data quality</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">92%</p>
              <p className="text-[11px] font-semibold text-success">High</p>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[92%] rounded-full bg-gradient-mint" />
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function QuickAction({
  to, icon, label, tone,
}: { to: "/history" | "/dentists" | "/alerts"; icon: React.ReactNode; label: string; tone: "mint" | "peach" | "beige" }) {
  const bg = tone === "mint" ? "bg-mint/40" : tone === "peach" ? "bg-peach/50" : "bg-beige";
  return (
    <Link to={to} className="flex flex-col items-center gap-2 rounded-2xl bg-card p-4 shadow-soft active:scale-[0.97]">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${bg} text-foreground`}>{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
