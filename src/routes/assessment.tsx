import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assessment")({
  head: () => ({ meta: [{ title: "AI Assessment — OralAI" }] }),
  component: Assessment,
});

type Step = {
  title: string;
  subtitle: string;
  options?: { label: string; multi?: boolean }[];
  type: "input" | "single" | "multi";
  fieldType?: "number" | "text";
  placeholder?: string;
};

const steps: Step[] = [
  { title: "What's your age?", subtitle: "Basic information", type: "input", fieldType: "number", placeholder: "e.g. 28" },
  { title: "Gender", subtitle: "Basic information", type: "single", options: [{ label: "Male" }, { label: "Female" }, { label: "Other" }] },
  { title: "Where do you live?", subtitle: "Basic information", type: "single", options: [{ label: "Urban" }, { label: "Rural" }] },
  { title: "Education level", subtitle: "About you", type: "single", options: [{ label: "Primary" }, { label: "Secondary" }, { label: "Graduate" }, { label: "Postgraduate" }] },
  { title: "How often do you brush?", subtitle: "Oral hygiene", type: "single", options: [{ label: "Once a day" }, { label: "Twice a day" }, { label: "After every meal" }, { label: "Rarely" }] },
  { title: "Do you use fluoride toothpaste?", subtitle: "Oral hygiene", type: "single", options: [{ label: "Always" }, { label: "Sometimes" }, { label: "Never" }] },
  { title: "Tools you use", subtitle: "Oral hygiene", type: "multi", options: [{ label: "Floss" }, { label: "Mouthwash" }, { label: "Interdental brush" }, { label: "None" }] },
  { title: "Tongue cleaning", subtitle: "Oral hygiene", type: "single", options: [{ label: "Daily" }, { label: "Occasionally" }, { label: "Never" }] },
  { title: "Sugar intake frequency", subtitle: "Dietary habits", type: "single", options: [{ label: "Rarely" }, { label: "Sometimes" }, { label: "Often" }, { label: "Very often" }] },
  { title: "Sweet drinks before sleep?", subtitle: "Dietary habits", type: "single", options: [{ label: "Never" }, { label: "Occasionally" }, { label: "Frequently" }] },
  { title: "Tooth decay history", subtitle: "Dental history", type: "single", options: [{ label: "None" }, { label: "Mild" }, { label: "Severe" }] },
  { title: "Past treatments", subtitle: "Dental history", type: "multi", options: [{ label: "Fillings" }, { label: "RCT" }, { label: "Extraction" }, { label: "Scaling" }, { label: "None" }] },
  { title: "Current symptoms", subtitle: "⚠️ Important", type: "multi", options: [{ label: "Bleeding gums" }, { label: "Tooth pain" }, { label: "Loose teeth" }, { label: "Bad breath" }, { label: "Swelling" }] },
  { title: "Health conditions", subtitle: "General health", type: "multi", options: [{ label: "Diabetes" }, { label: "Heart disease" }, { label: "Hypertension" }, { label: "None" }] },
  { title: "Lifestyle", subtitle: "Tobacco & alcohol", type: "multi", options: [{ label: "Tobacco" }, { label: "Alcohol" }, { label: "Neither" }] },
  { title: "Will you follow advice?", subtitle: "Awareness", type: "single", options: [{ label: "Definitely" }, { label: "Probably" }, { label: "Not sure" }] },
  { title: "Self evaluation of your oral health", subtitle: "Final step", type: "single", options: [{ label: "Very Good" }, { label: "Good" }, { label: "Fair" }, { label: "Poor" }] },
];

function Assessment() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const step = steps[i];
  const progress = useMemo(() => ((i + 1) / steps.length) * 100, [i]);
  const answered = answers[i] !== undefined && (Array.isArray(answers[i]) ? (answers[i] as string[]).length > 0 : (answers[i] as string).length > 0);

  const setAnswer = (val: string | string[]) => setAnswers({ ...answers, [i]: val });
  const toggleMulti = (label: string) => {
    const cur = (answers[i] as string[]) ?? [];
    setAnswer(cur.includes(label) ? cur.filter((v) => v !== label) : [...cur, label]);
  };

  const next = () => {
    if (i === steps.length - 1) navigate({ to: "/results" });
    else setI(i + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background sm:my-6 sm:min-h-[calc(100vh-3rem)] sm:rounded-[2.25rem] sm:overflow-hidden sm:border sm:border-border shadow-card">
        <header className="px-5 pb-3 pt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (i === 0 ? navigate({ to: "/dashboard" }) : setI(i - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Step {i + 1} of {steps.length}</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gradient-mint transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 px-5 pb-6 pt-6">
          <div className="rounded-3xl bg-card p-6 shadow-card">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-mint/40 px-3 py-1 text-[11px] font-semibold text-mint-foreground">
              <Sparkles className="h-3 w-3" /> {step.subtitle}
            </div>
            <h2 className="mt-2 text-2xl font-bold leading-tight">{step.title}</h2>

            <div className="mt-6 space-y-2.5">
              {step.type === "input" && (
                <input
                  type={step.fieldType}
                  placeholder={step.placeholder}
                  value={(answers[i] as string) ?? ""}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-4 text-lg font-semibold outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
              )}

              {step.type === "single" && step.options?.map((opt) => {
                const active = answers[i] === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => setAnswer(opt.label)}
                    className={cn(
                      "w-full rounded-2xl border p-4 text-left text-sm font-semibold transition-all",
                      active
                        ? "border-transparent bg-gradient-mint text-mint-foreground shadow-soft"
                        : "border-border bg-background text-foreground hover:bg-secondary"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}

              {step.type === "multi" && step.options?.map((opt) => {
                const active = ((answers[i] as string[]) ?? []).includes(opt.label);
                return (
                  <button
                    key={opt.label}
                    onClick={() => toggleMulti(opt.label)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition-all",
                      active
                        ? "border-transparent bg-gradient-mint text-mint-foreground shadow-soft"
                        : "border-border bg-background text-foreground hover:bg-secondary"
                    )}
                  >
                    {opt.label}
                    <span className={cn("flex h-5 w-5 items-center justify-center rounded-md border-2", active ? "border-mint-foreground bg-mint-foreground/20" : "border-border")}>
                      {active && <span className="h-2 w-2 rounded-sm bg-mint-foreground" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-card/80 px-5 py-4 backdrop-blur">
          <button
            disabled={!answered}
            onClick={next}
            className="w-full rounded-2xl bg-gradient-mint py-4 text-base font-semibold text-mint-foreground shadow-glow disabled:opacity-40 active:scale-[0.99]"
          >
            {i === steps.length - 1 ? "Analyze Risk" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
