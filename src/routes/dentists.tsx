import { createFileRoute } from "@tanstack/react-router";
import { PhoneShell } from "@/components/PhoneShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { MapPin, Star } from "lucide-react";

export const Route = createFileRoute("/dentists")({
  head: () => ({ meta: [{ title: "Find Dentist — OralAI" }] }),
  component: Dentists,
});

const dentists = [
  { name: "Dr. Sarah Chen", rating: 4.9, exp: "12 yrs", loc: "Downtown · 1.2 km", spec: "Periodontist", initials: "SC" },
  { name: "Dr. Michael Patel", rating: 4.8, exp: "8 yrs", loc: "Westside · 2.4 km", spec: "Cosmetic", initials: "MP" },
  { name: "Dr. Aisha Rahman", rating: 4.7, exp: "15 yrs", loc: "North · 3.8 km", spec: "Orthodontist", initials: "AR" },
  { name: "Dr. Lucas Reyes", rating: 4.9, exp: "10 yrs", loc: "Central · 0.9 km", spec: "General", initials: "LR" },
];

function Dentists() {
  return (
    <PhoneShell>
      <ScreenHeader title="Find a Dentist" subtitle="Verified specialists near you" back="/dashboard" />

      <div className="space-y-3 px-5 pb-24">
        {dentists.map((d) => (
          <div key={d.name} className="rounded-3xl bg-card p-4 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-mint text-base font-bold text-mint-foreground">
                {d.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.spec} · {d.exp}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-peach/40 px-2 py-1 text-[11px] font-bold text-peach-foreground">
                    <Star className="h-3 w-3 fill-current" /> {d.rating}
                  </span>
                </div>
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {d.loc}
                </p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-2xl bg-gradient-mint py-3 text-sm font-semibold text-mint-foreground shadow-sog active:scale-[0.99]">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}
