import {
  coverLetterSchema,
  type CoverLetterForm,
} from "@/schemas/coverLetter.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCvStore } from "@/store/useCvStore";
import FormStepCard from "@/components/FormStepCard";
import { FormField } from "@/components/ui/formField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";

interface CoverLetterProps {
  onComplete: () => void;
  onBack: () => void;
}

const CoverLetter = ({ onComplete, onBack }: CoverLetterProps) => {
  const { cvData, setCoverLetter } = useCvStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CoverLetterForm>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: cvData.coverLetter,
  });

  const handleUseName = () => {
    if (cvData.personal.name) {
      setValue("signature", cvData.personal.name, { shouldDirty: true });
    }
  };

  const handleUseDate = () => {
    const today = new Date().toISOString().slice(0, 10);
    setValue("date", today, { shouldDirty: true });
  };

  const handleGenerateFromCv = () => {
    const currentValues = getValues();
    const today = new Date().toISOString().slice(0, 10);
    const primaryRole = cvData.exp[0]?.position;
    const primaryCompany = cvData.exp[0]?.company;
    const topSkills = cvData.skills
      .map((skill) => skill.name)
      .filter(Boolean)
      .slice(0, 3);

    const roleTarget = currentValues.position || "this role";
    const companyTarget = currentValues.company || "your team";
    const skillLine = topSkills.length
      ? ` I bring strengths in ${topSkills.join(", ")}.`
      : "";
    const experienceLine = primaryRole
      ? `In my recent role as ${primaryRole}${
          primaryCompany ? ` at ${primaryCompany}` : ""
        }, I focused on delivering measurable outcomes and collaborating cross-functionally.`
      : "I have focused on delivering measurable outcomes and collaborating cross-functionally.";

    const generatedBody = `${
      currentValues.body ||
      `I am excited to apply for ${roleTarget} at ${companyTarget}. ${experienceLine}${skillLine}\n\nI would welcome the opportunity to discuss how my background can support your team.`
    }`;

    if (!currentValues.recipientName) {
      setValue("recipientName", "Hiring Manager", { shouldDirty: true });
    }
    if (!currentValues.company && cvData.exp[0]?.company) {
      setValue("company", cvData.exp[0].company, { shouldDirty: true });
    }
    if (!currentValues.position && cvData.exp[0]?.position) {
      setValue("position", cvData.exp[0].position, { shouldDirty: true });
    }
    if (!currentValues.date) {
      setValue("date", today, { shouldDirty: true });
    }
    if (!currentValues.opening) {
      setValue("opening", "Dear Hiring Manager,", { shouldDirty: true });
    }
    if (!currentValues.body) {
      setValue("body", generatedBody, { shouldDirty: true });
    }
    if (!currentValues.closing) {
      setValue("closing", "Sincerely,", { shouldDirty: true });
    }
    if (!currentValues.signature && cvData.personal.name) {
      setValue("signature", cvData.personal.name, { shouldDirty: true });
    }
  };

  const onSubmit = (data: CoverLetterForm) => {
    setCoverLetter(data);
    onComplete();
  };

  return (
    <FormStepCard
      title="Cover Letter"
      subtitle="Create a tailored cover letter to match your CV."
      badges={["Optional", "Print-ready"]}
      icon={<FilePenLine className="w-5 h-5" />}
      onSubmit={handleSubmit(onSubmit)}
      submitLabel="Finish"
      showBack
      onBack={onBack}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateFromCv}
          >
            Generate from CV
          </Button>
          <Button type="button" variant="ghost" onClick={handleUseDate}>
            Use today
          </Button>
        </div>
        <div className="rounded-2xl border bg-muted/20 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Recipient Name"
              id="recipientName"
              register={register}
              error={errors.recipientName}
              placeholder="Hiring Manager"
            />
            <FormField
              label="Company"
              id="company"
              register={register}
              error={errors.company}
              placeholder="Acme Inc."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Role / Position"
              id="position"
              register={register}
              error={errors.position}
              placeholder="Product Designer"
            />
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Date</Label>
              <div className="flex gap-2">
                <input
                  id="date"
                  type="date"
                  className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  {...register("date")}
                />
                <button
                  type="button"
                  onClick={handleUseDate}
                  className="rounded-md border bg-white px-3 text-xs font-medium hover:bg-gray-50"
                >
                  Today
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="opening">Opening</Label>
            <Textarea
              id="opening"
              placeholder="Dear Hiring Manager,"
              className="min-h-16"
              {...register("opening")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              placeholder="Write 2-3 short paragraphs about your fit for the role..."
              className="min-h-36"
              {...register("body")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="closing">Closing</Label>
              <Textarea
                id="closing"
                placeholder="Sincerely,"
                className="min-h-12"
                {...register("closing")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="signature">Signature</Label>
              <div className="flex gap-2">
                <input
                  id="signature"
                  type="text"
                  className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  {...register("signature")}
                />
                <button
                  type="button"
                  onClick={handleUseName}
                  className="rounded-md border bg-white px-3 text-xs font-medium hover:bg-gray-50"
                >
                  Use name
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormStepCard>
  );
};

export default CoverLetter;
