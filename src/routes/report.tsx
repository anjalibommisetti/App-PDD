import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Download, Share2, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Full Report — OralAI" }] }),
  component: Report,
});

const trend = [62, 70, 65, 74, 71, 76, 78];

function Report() {
  const max = Math.max(...trend);
  return (
    <PhoneShell showNav={false}>
      <ScreenHeader title="Full Report" back="/results" />

      <div className="space-y-4 px-5 pb-10">
        <div className="rounded-3xl bg-card p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Patient</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-mint text-mint-foreground font-bold">JD</div>
            <div>
              <p className="font-semibold">Jane Doe</p>
              <p className="text-xs text-muted-foreground">Female · 28 · Urban</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Risk Trend</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-alert/15 px-2 py-1 text-[11px] font-bold text-alert">
              <TrendingUp className="h-3 w-3" /> +6 last month
            </span>
          </div>
          <div className="mt-5 flex h-32 items-end gap-2">
            {trend.map((v, idx) => (
              <div key={idx} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-lg bg-gradient-mint"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">W{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-beige p-5 shadow-soft">
          <p className="text-sm font-semibold">AI Explanation</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">
            Model identified gum disease as the strongest risk driver based on bleeding symptoms and infrequent flossing. Probability of decay progression in 6 months: 64%.
          </p>
        </div>

        <div className="rounded-3xl bg-card p-5 shadow-soft">
          <p className="text-sm font-semibold">Probability Map</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { l: "1 mo", v: 28, c: "bg-success" },
              { l: "3 mo", v: 54, c: "bg-warning" },
              { l: "6 mo", v: 78, c: "bg-danger" },
            ].map((p) => (
              <div key={p.l} className="rounded-2xl bg-secondary p-3">
                <p className="text-xs text-muted-foreground">{p.l}</p>
                <p className="mt-1 text-xl font-bold">{p.v}%</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-card">
                  <div className={`h-full ${p.c}`} style={{ width: `${p.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-4 text-sm font-semibold">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-mint py-4 text-sm font-semibold text-mint-foreground shadow-glow">
            <Download className="h-4 w-4" /> Download
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}
