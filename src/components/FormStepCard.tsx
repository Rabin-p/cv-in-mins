import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FormStepCardProps {
  title: string;
  subtitle?: string;
  badges?: string[];
  icon?: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

const FormStepCard = ({
  title,
  subtitle,
  badges,
  icon,
  onSubmit,
  submitLabel = "Next",
  children,
  showBack = false,
  onBack,
}: FormStepCardProps) => {
  return (
    <Card className="p-5 md:p-7 w-full shadow-sm border bg-white/90 backdrop-blur">
      <CardHeader className="px-0 pt-0 pb-5 md:pb-6">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight">
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border bg-white/80 px-3 py-1 text-xs font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <form onSubmit={onSubmit}>
          {children}

          <div className="sticky bottom-4 mt-8">
            <div className="flex gap-3 rounded-2xl border bg-white/90 backdrop-blur shadow-lg p-3">
              {showBack && onBack && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 h-11"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              )}
              <Button type="submit" className="flex-1 h-11">
                <span>{submitLabel}</span>
                {submitLabel !== "Finish" && (
                  <ChevronRight className="w-4 h-4 ml-1" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormStepCard;
