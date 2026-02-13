import {
  experienceSchema,
  type ExperienceForm,
} from "@/schemas/experience.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useCvStore } from "@/store/useCvStore";
import { useState } from "react";
import type { Experience as ExperienceType } from "@/types/userInfoTypes";
import FormStepCard from "@/components/FormStepCard";
import { FormField } from "@/components/ui/formField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ExperienceProps {
  onNext: () => void;
  onBack: () => void;
}

const Experience = ({ onNext, onBack }: ExperienceProps) => {
  const { cvData, setExperience, removeExperience } = useCvStore();
  const experiences = cvData.exp;

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const defaultValues: ExperienceForm = {
    company: "",
    position: "",
    start_date: "",
    is_current: false,
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<ExperienceForm>({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  const isCurrent = useWatch({ control, name: "is_current" }) ?? false;

  const onAddExperience = (data: ExperienceForm) => {
    const experience: ExperienceType = {
      ...data,
      id: crypto.randomUUID(),
      start_date: startDate ? format(startDate, "yyyy-MM-dd") : "",
      end_date:
        !data.is_current && endDate ? format(endDate, "yyyy-MM-dd") : undefined,
    };
    setExperience(experience);
    reset();
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    setValue("start_date", date ? format(date, "yyyy-MM-dd") : "");
  };

  return (
    <FormStepCard
      title="Work Experience"
      subtitle="Show impact with roles, timelines, and outcomes."
      badges={["Required: add at least 1 role"]}
      icon={<Briefcase className="w-5 h-5" />}
      onSubmit={onSubmit}
      submitLabel="Next"
      showBack
      onBack={onBack}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border bg-muted/20 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Company"
              id="company"
              register={register}
              error={errors.company}
              placeholder="Acme Inc."
            />
            <FormField
              label="Position"
              id="position"
              register={register}
              error={errors.position}
              placeholder="Software Engineer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-9",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "MMM yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateSelect}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.start_date && (
                <p className="text-red-500 text-xs">
                  {errors.start_date.message}
                </p>
              )}
            </div>

            {!isCurrent && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="end_date">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-9",
                        !endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "MMM yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.end_date && (
                  <p className="text-red-500 text-xs">
                    {errors.end_date.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="is_current"
              checked={isCurrent}
              onCheckedChange={(checked) =>
                setValue("is_current", checked === true)
              }
            />
            <Label htmlFor="is_current" className="cursor-pointer text-sm">
              I currently work here
            </Label>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your responsibilities and achievements..."
              className="min-h-20"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleSubmit(onAddExperience)}
          className="w-full sm:w-auto"
        >
          Add Experience
        </Button>

        {experiences.length > 0 ? (
          <div className="space-y-2 pt-2">
            <Label className="text-muted-foreground">
              Added Experience ({experiences.length})
            </Label>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-3 border rounded-lg flex justify-between items-start gap-2 animate-rise"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{exp.position}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {exp.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {exp.start_date} -{" "}
                    {exp.is_current ? "Present" : exp.end_date}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="shrink-0 h-8 px-2"
                  onClick={() => removeExperience(exp.id)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed bg-muted/10 p-4 text-center">
            <Briefcase className="w-6 h-6 mx-auto text-muted-foreground" />
            <p className="text-sm font-medium mt-2">No roles added yet</p>
            <p className="text-xs text-muted-foreground">
              Add your most recent role first.
            </p>
          </div>
        )}
      </div>
    </FormStepCard>
  );
};

export default Experience;
