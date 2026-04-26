import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface PhoneShellProps {
  children: ReactNode;
  showNav?: boolean;
}

export function PhoneShell({ children, showNav = true }: PhoneShellProps) {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-card sm:my-6 sm:min-h-[calc(100vh-3rem)] sm:rounded-[2.25rem] sm:overflow-hidden sm:border sm:border-border">
        <main className="flex-1 overflow-y-auto pb-2">{children}</main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
