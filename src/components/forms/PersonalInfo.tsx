import { personalInfoSchema } from "@/schemas/personalInfo.schema";
import { useCvStore } from "@/store/useCvStore";
import { type PersonalInfo } from "@/types/userInfoTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/formField";
import { Label } from "@/components/ui/label";
import { Upload, UserRound } from "lucide-react";
import { useState } from "react";
import FormStepCard from "@/components/FormStepCard";

interface PersonalInfoFormProps {
  onNext: () => void;
}

const PersonalInfoForm = ({ onNext }: PersonalInfoFormProps) => {
  const { cvData, setPersonalInfo } = useCvStore();
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    cvData.personal.photo || null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: cvData.personal,
  });

  const onSubmit = (data: PersonalInfo) => {
    setPersonalInfo(data);
    console.log("saved personal info:", data);
    onNext();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPhotoPreview(dataUrl);
        setValue("photo", dataUrl, { shouldDirty: true, shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    setPhotoPreview(null);
    setValue("photo", "", { shouldDirty: true, shouldValidate: true });
  };

  return (
    <FormStepCard
      title="Personal Information"
      subtitle="Tell us who you are so your CV feels complete."
      badges={["Required fields", "Optional social links"]}
      icon={<UserRound className="w-5 h-5" />}
      onSubmit={handleSubmit(onSubmit)}
      submitLabel="Next"
    >
      <div className="space-y-6">
        {/* Required Fields Section */}
        <div className="space-y-4 rounded-2xl border bg-muted/20 p-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 border-b pb-2">
            Required
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              id="name"
              register={register}
              error={errors.name}
              placeholder="John Doe"
            />
            <FormField
              label="Email"
              id="email"
              register={register}
              error={errors.email}
              placeholder="john.doe@example.com"
            />
          </div>
          <FormField
            label="Address"
            id="address"
            register={register}
            error={errors.address}
            placeholder="123 Main St, Anytown, USA"
          />
          <FormField
            label="Phone"
            id="phone"
            register={register}
            error={errors.phone}
            placeholder="123-456-7890"
          />

          <div className="flex flex-col gap-2">
            <Label htmlFor="photo">Photo (optional)</Label>
            <div className="flex flex-col sm:flex-row items-center gap-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
              <div className="h-24 w-24 rounded-full bg-white border overflow-hidden flex items-center justify-center">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Upload className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm font-medium text-gray-700">
                  {photoPreview ? "Photo ready" : "Upload a profile photo"}
                </p>
                <p className="text-xs text-gray-500">PNG or JPG, up to 5MB</p>
                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <label
                    htmlFor="photo"
                    className="inline-flex items-center justify-center rounded-md bg-white border px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm cursor-pointer hover:bg-gray-100"
                  >
                    {photoPreview ? "Replace" : "Choose file"}
                  </label>
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={handlePhotoRemove}
                      className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <input
                id="photo"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}
          </div>
        </div>

        {/* Optional Fields Section */}
        <div className="space-y-4 rounded-2xl border bg-white/70 p-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-500 border-b pb-2">
            Social Links (optional)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="LinkedIn"
              id="socialMedia.linkedin"
              register={register}
              error={errors.socialMedia?.linkedin}
              placeholder="linkedin.com/in/username"
            />
            <FormField
              label="GitHub"
              id="socialMedia.github"
              register={register}
              error={errors.socialMedia?.github}
              placeholder="github.com/username"
            />
            <FormField
              label="Website"
              id="socialMedia.website"
              register={register}
              error={errors.socialMedia?.website}
              placeholder="yourwebsite.com"
            />
            <FormField
              label="Twitter"
              id="socialMedia.twitter"
              register={register}
              error={errors.socialMedia?.twitter}
              placeholder="twitter.com/username"
            />
          </div>
        </div>
      </div>
    </FormStepCard>
  );
};

export default PersonalInfoForm;
