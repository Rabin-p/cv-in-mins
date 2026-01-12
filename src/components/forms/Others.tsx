import { othersSchema, type OthersForm } from "@/schemas/others.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCvStore } from "@/store/useCvStore";
import type { OtherSection } from "@/types/userInfoTypes";
import FormStepCard from "@/components/FormStepCard";
import { FormField } from "@/components/ui/formField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OthersProps {
  onComplete: () => void;
  onBack: () => void;
}

const Others = ({ onComplete, onBack }: OthersProps) => {

  const { cvData, setOthers, removeOtherSection } = useCvStore();
  const otherSections = cvData.others || [];

  const defaultValues: OthersForm = {
    title: "",
    description: ""
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<OthersForm>({
    resolver: zodResolver(othersSchema),
    defaultValues
  })

  const onAddOther = (data: OthersForm) => {
    const other: OtherSection = {
      ...data,
      id: crypto.randomUUID(),
    }
    setOthers(other);
    reset();
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <FormStepCard title="Other Sections" onSubmit={onSubmit} submitLabel="Finish" showBack onBack={onBack}>
      <div className="space-y-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Add additional sections like certifications, languages, hobbies, awards, etc. (optional)
        </p>

        <FormField
          label="Section Title"
          id="title"
          register={register}
          error={errors.title}
          placeholder="e.g., Certifications, Languages"
        />

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="e.g., AWS Certified, English (Fluent)"
            className="min-h-20"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        <Button type="button" variant="outline" onClick={handleSubmit(onAddOther)} className="w-full sm:w-auto">
          Add Section
        </Button>

        {otherSections.length > 0 && (
          <div className="space-y-2 pt-2">
            <Label className="text-muted-foreground">Added Sections ({otherSections.length})</Label>
            {otherSections.map((other) => (
              <div key={other.id} className="p-3 border rounded-lg flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{other.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{other.description}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="shrink-0 h-8 px-2"
                  onClick={() => removeOtherSection(other.id)}
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

export default Others
