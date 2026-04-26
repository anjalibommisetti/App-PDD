import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/PhoneShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "History — OralAI" }] }),
  component: History,
});

const items = [
  { date: "Apr 22, 2026", score: 78, status: "High", tone: "alert" },
  { date: "Mar 15, 2026", score: 72, status: "Medium", tone: "warning" },
  { date: "Feb 10, 2026", score: 65, status: "Medium", tone: "warning" },
  { date: "Jan 05, 2026", score: 48, status: "Low", tone: "success" },
  { date: "Dec 02, 2025", score: 42, status: "Low", tone: "success" },
];

function History() {
  const [tab, setTab] = useState<"assessments" | "reports">("assessments");
  return (
    <PhoneShell>
      <ScreenHeader title="History" subtitle="Your past activity" />

      <div className="px-5 pb-24">
        <div className="flex gap-2 rounded-2xl bg-secondary p-1.5">
          {(["assessments", "reports"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-xl py-2.5 text-sm font-semibold capitalize transition-all",
                tab === t ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {items.map((it) => (
            <Link
              key={it.date}
              to="/results"
              className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-soft active:scale-[0.99]"
            >
              <div className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold",
                it.tone === "alert" && "bg-alert/15 text-alert",
                it.tone === "warning" && "bg-peach/40 text-peach-foreground",
                it.tone === "success" && "bg-mint/40 text-mint-foreground",
              )}>
                {it.score}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{tab === "assessments" ? "Risk Assessment" : "Report"}</p>
                <p className="text-xs text-muted-foreground">{it.date}</p>
                <span className={cn(
                  "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
                  it.tone === "alert" && "bg-alert/15 text-alert",
                  it.tone === "warning" && "bg-peach/50 text-peach-foreground",
                  it.tone === "success" && "bg-mint/40 text-mint-foreground",
                )}>
                  {it.status} risk
                </span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}
