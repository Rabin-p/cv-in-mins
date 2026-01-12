import { educationSchema, type EducationForm } from "@/schemas/education.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useCvStore } from "@/store/useCvStore";
import { useState } from "react";
import type { Education as EduType } from "@/types/userInfoTypes";
import FormStepCard from "@/components/FormStepCard";
import { FormField } from "@/components/ui/formField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface EducationProps {
  onNext: () => void;
  onBack: () => void;
}

const Education = ({ onNext, onBack }: EducationProps) => {

  const { cvData, setEducation, removeEducation } = useCvStore();
  const educations = cvData.edu;

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const defaultValues: EducationForm = {
    institution: "",
    degree: "",
    start_date: "",
    is_current: true
  }

  const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm<EducationForm>({
    resolver: zodResolver(educationSchema),
    defaultValues
  })

  const isCurrent = useWatch({ control, name: "is_current" }) ?? true;

  const onAddEducation = (data: EducationForm) => {
    const education: EduType = {
      ...data,
      id: crypto.randomUUID(),
      start_date: startDate ? format(startDate, "yyyy-MM-dd") : "",
      end_date: !data.is_current && endDate ? format(endDate, "yyyy-MM-dd") : undefined
    }
    setEducation(education);
    reset();
    setStartDate(undefined);
    setEndDate(undefined);
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    setValue("start_date", date ? format(date, "yyyy-MM-dd") : "");
  }

  return (
    <FormStepCard title="Education" onSubmit={onSubmit} submitLabel="Next" showBack onBack={onBack}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Degree" id="degree" register={register} error={errors.degree} placeholder="Bsc. CSIT"/>
          <FormField label="Institution" id="institution" register={register} error={errors.institution} placeholder="Tribhuwan University" />
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
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "MMM yyyy") : <span>Pick a date</span>}
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
            {errors.start_date && <p className="text-red-500 text-xs">{errors.start_date.message}</p>}
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
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "MMM yyyy") : <span>Pick a date</span>}
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
              {errors.end_date && <p className="text-red-500 text-xs">{errors.end_date.message}</p>}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="is_current"
            checked={isCurrent}
            onCheckedChange={(checked) => setValue("is_current", checked === true)}
          />
          <Label htmlFor="is_current" className="cursor-pointer text-sm">Currently studying here</Label>
        </div>

        <Button type="button" variant="outline" onClick={handleSubmit(onAddEducation)} className="w-full sm:w-auto">
          Add Education
        </Button>

        {educations.length > 0 && (
          <div className="space-y-2 pt-2">
            <Label className="text-muted-foreground">Added Education ({educations.length})</Label>
            {educations.map((edu) => (
              <div key={edu.id} className="p-3 border rounded-lg flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground truncate">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground">
                    {edu.start_date} - {edu.is_current ? "Present" : edu.end_date}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="shrink-0 h-8 px-2"
                  onClick={() => removeEducation(edu.id)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </FormStepCard>
  )
}

export default Education