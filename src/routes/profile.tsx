import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Award, ChevronRight, Flame, LogOut, Settings, Shield, Sparkles } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — OralAI" }] }),
  component: Profile,
});

const badges = [
  { name: "Healthy Habits", icon: Sparkles, tone: "mint" },
  { name: "Risk Reducer", icon: Shield, tone: "peach" },
  { name: "Consistent", icon: Award, tone: "beige" },
];

function Profile() {
  return (
    <PhoneShell>
      <ScreenHeader title="Profile" />

      <div className="space-y-5 px-5 pb-24">
        <div className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-soft">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-mint text-xl font-bold text-mint-foreground">JD</div>
          <div>
            <p className="font-semibold">Jane Doe</p>
            <p className="text-xs text-muted-foreground">jane@example.com</p>
            <span className="mt-1 inline-block rounded-full bg-mint/40 px-2 py-0.5 text-[10px] font-bold text-mint-foreground">Patient</span>
          </div>
        </div>

        {/* Streak */}
        <div className="rounded-3xl bg-gradient-peach p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <Flame className="h-7 w-7 text-peach-foreground" />
            <div>
              <p className="text-2xl font-bold text-peach-foreground">5 days</p>
              <p className="text-xs text-peach-foreground/80">Oral care streak</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={`h-8 rounded-lg ${i < 5 ? "bg-card" : "bg-card/30"}`} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-card p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">Brushing</p>
            <p className="mt-1 text-2xl font-bold">86%</p>
            <p className="text-[11px] font-semibold text-success">Consistent</p>
          </div>
          <div className="rounded-3xl bg-card p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">Risk change</p>
            <p className="mt-1 text-2xl font-bold">−12%</p>
            <p className="text-[11px] font-semibold text-success">Improving</p>
          </div>
        </div>

        {/* Badges */}
        <div className="rounded-3xl bg-card p-5 shadow-soft">
          <p className="mb-3 text-sm font-semibold">Badges</p>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((b) => {
              const Icon = b.icon;
              const bg = b.tone === "mint" ? "bg-mint/40" : b.tone === "peach" ? "bg-peach/50" : "bg-beige";
              return (
                <div key={b.name} className={`flex flex-col items-center gap-2 rounded-2xl ${bg} p-3 text-center`}>
                  <Icon className="h-6 w-6" />
                  <span className="text-[11px] font-semibold leading-tight">{b.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Menu */}
        <div className="overflow-hidden rounded-3xl bg-card shadow-soft">
          <MenuRow icon={<Settings className="h-4 w-4" />} label="Settings" />
          <div className="h-px bg-border" />
          <MenuRow icon={<Shield className="h-4 w-4" />} label="Privacy & data sharing" />
          <div className="h-px bg-border" />
          <Link to="/" className="flex items-center justify-between px-5 py-4 text-sm font-medium text-alert">
            <span className="flex items-center gap-3"><LogOut className="h-4 w-4" /> Log out</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}

function MenuRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium hover:bg-secondary">
      <span className="flex items-center gap-3">{icon} {label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
