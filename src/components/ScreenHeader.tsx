import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  back?: string;
  right?: ReactNode;
}

export function ScreenHeader({ title, subtitle, back, right }: ScreenHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-5 pt-6 pb-3">
      {back && (
        <Link
          to={back}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-muted"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      )}
      <div className="flex-1">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
