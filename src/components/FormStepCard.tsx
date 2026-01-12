import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FormStepCardProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

const FormStepCard = ({
  title,
  onSubmit,
  submitLabel = "Next",
  children,
  showBack = false,
  onBack,
}: FormStepCardProps) => {
  return (
    <Card className="p-4 md:p-6 w-full shadow-sm">
      <CardHeader className="px-0 pt-0 pb-4 md:pb-6">
        <CardTitle className="text-xl md:text-2xl font-bold">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <form onSubmit={onSubmit}>
          {children}

          <div className="flex gap-3 mt-6 md:mt-8">
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
              {submitLabel !== "Finish" && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormStepCard;
