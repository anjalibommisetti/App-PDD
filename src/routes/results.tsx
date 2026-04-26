import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { AlertTriangle, Brain, CalendarPlus, CheckCircle2, FileText } from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [{ title: "Risk Results — OralAI" }] }),
  component: Results,
});

function Results() {
  const score = 78;
  const breakdown = [
    { label: "Cavities", value: 72, color: "bg-warning" },
    { label: "Gum Disease", value: 84, color: "bg-danger" },
    { label: "Infection", value: 41, color: "bg-success" },
  ];

  return (
    <PhoneShell showNav={false}>
      <ScreenHeader title="Risk Results" subtitle="AI analysis complete" back="/dashboard" />

      <div className="space-y-4 px-5 pb-10">
        {/* Risk hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-alert p-6 text-alert-foreground shadow-card">
          <div className="flex items-start justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Risk Score</p>
            <span className="rounded-full bg-card/30 px-3 py-1 text-[11px] font-bold backdrop-blur">High</span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <p className="text-6xl font-black leading-none">{score}</p>
            <span className="mb-1 text-2xl font-bold opacity-80">%</span>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-card/30">
            <div className="h-full rounded-full bg-card" style={{ width: `${score}%` }} />
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-card/20 p-3 backdrop-blur">
            <AlertTriangle className="h-5 w-5" />
            <p className="text-sm font-semibold">Immediate Attention Required</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="rounded-3xl bg-card p-5 shadow-soft">
          <p className="mb-4 text-sm font-semibold">Risk Breakdown</p>
          <div className="space-y-4">
            {breakdown.map((b) => (
              <div key={b.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{b.label}</span>
                  <span className="font-bold">{b.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <div className="rounded-3xl bg-beige p-5 shadow-soft">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-card">
              <Brain className="h-4 w-4 text-mint-foreground" />
            </div>
            <p className="text-sm font-semibold">AI Insight</p>
            <span className="ml-auto rounded-full bg-card px-2 py-0.5 text-[10px] font-bold text-success">92% confidence</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">
            Your reported bleeding gums combined with infrequent flossing and high sugar intake significantly elevate your gum disease risk. Early intervention can reduce this score by up to 40%.
          </p>
        </div>

        {/* Recommendations */}
        <div className="rounded-3xl bg-card p-5 shadow-soft">
          <p className="mb-3 text-sm font-semibold">Recommendations</p>
          <ul className="space-y-2.5">
            {[
              "Brush twice daily with fluoride toothpaste",
              "Floss at least once per day",
              "Reduce sugar intake — especially before sleep",
              "Schedule a dental visit within 2 weeks",
            ].map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-2xl bg-secondary p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span className="text-sm">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/report" className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-4 text-sm font-semibold">
            <FileText className="h-4 w-4" /> Full Report
          </Link>
          <Link to="/dentists" className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-mint py-4 text-sm font-semibold text-mint-foreground shadow-glow">
            <CalendarPlus className="h-4 w-4" /> Book Visit
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}
