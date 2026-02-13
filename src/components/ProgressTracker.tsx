import { type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: number;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
  onStepChange?: (stepId: number) => void;
  orientation?: "horizontal" | "vertical";
}

const ProgressTracker = ({
  steps,
  currentStep,
  onStepChange,
  orientation = "horizontal",
}: ProgressTrackerProps) => {
  if (orientation === "vertical") {
    return (
      <div className="w-full py-2">
        <div className="flex flex-col gap-3">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isLast = index === steps.length - 1;

            return (
              <button
                key={step.id}
                type="button"
                className="group flex items-start gap-3 text-left w-full rounded-xl p-2 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                onClick={() => onStepChange?.(step.id)}
                aria-current={isCurrent ? "step" : undefined}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isCurrent
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-muted-foreground/30 text-muted-foreground",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-medium">{step.id}</span>
                    )}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-muted-foreground/20 mt-2" />
                  )}
                </div>
                <div className="pt-0.5">
                  <div className="flex items-center gap-2">
                    {step.icon && (
                      <span
                        className={cn(
                          "text-muted-foreground transition-colors",
                          isCurrent && "text-primary",
                          isCompleted && "text-foreground",
                        )}
                      >
                        {step.icon}
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isCurrent
                          ? "text-primary"
                          : isCompleted
                            ? "text-foreground"
                            : "text-muted-foreground",
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 md:py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className="flex items-center flex-1 last:flex-none"
            >
              <button
                type="button"
                className="flex flex-col items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md"
                onClick={() => onStepChange?.(step.id)}
                aria-current={isCurrent ? "step" : undefined}
              >
                <div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-muted-foreground/30 text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <span className="text-xs md:text-sm font-medium">
                      {step.id}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-1.5 text-[10px] md:text-xs font-medium text-center max-w-12 md:max-w-20 leading-tight",
                    isCurrent
                      ? "text-primary"
                      : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </button>

              {!isLast && (
                <div className="flex-1 mx-1 md:mx-2 h-0.5 -mt-4 md:-mt-5">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      isCompleted ? "bg-primary" : "bg-muted-foreground/30",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
