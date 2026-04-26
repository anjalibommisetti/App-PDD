import { Link, useLocation } from "@tanstack/react-router";
import { Home, BarChart3, Bell, User, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/history", label: "History", icon: BarChart3 },
  { to: "/assessment", label: "Assess", icon: Activity, accent: true },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const location = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex max-w-md items-end justify-between px-3 py-2">
        {items.map(({ to, label, icon: Icon, accent }) => {
          const active = location.pathname === to;
          if (accent) {
            return (
              <li key={to} className="-mt-6">
                <Link
                  to={to}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-mint text-mint-foreground shadow-glow ring-4 ring-background"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              </li>
            );
          }
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "text-mint-foreground")} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
