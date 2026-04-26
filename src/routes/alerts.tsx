import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { AlertTriangle, BellRing, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts — OralAI" }] }),
  component: Alerts,
});

const alerts = [
  { icon: ShieldAlert, title: "High risk detected", desc: "Your latest score (78%) requires attention.", time: "2h ago", tone: "alert" },
  { icon: Clock, title: "Follow-up reminder", desc: "Schedule a dental visit within 14 days.", time: "Today", tone: "warning" },
  { icon: BellRing, title: "Brushing reminder", desc: "Don't forget your evening brush!", time: "8:00 PM", tone: "mint" },
  { icon: CheckCircle2, title: "Health improving", desc: "You've maintained your streak for 5 days.", time: "Yesterday", tone: "success" },
  { icon: AlertTriangle, title: "Low health compliance", desc: "Recommendations from last visit not followed.", time: "3d ago", tone: "warning" },
];

const toneStyle = (t: string) =>
  t === "alert" ? "bg-alert/15 text-alert" :
  t === "warning" ? "bg-peach/40 text-peach-foreground" :
  t === "success" ? "bg-mint/40 text-mint-foreground" :
  "bg-mint/40 text-mint-foreground";

function Alerts() {
  return (
    <PhoneShell>
      <ScreenHeader title="Alerts" subtitle="Stay on top of your care" />

      <div className="space-y-3 px-5 pb-24">
        {alerts.map((a, idx) => {
          const Icon = a.icon;
          return (
            <div key={idx} className="flex items-start gap-3 rounded-3xl bg-card p-4 shadow-soft">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${toneStyle(a.tone)}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{a.title}</p>
                  <span className="text-[10px] text-muted-foreground">{a.time}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </PhoneShell>
  );
}
