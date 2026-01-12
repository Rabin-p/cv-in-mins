import { personalInfoSchema } from "@/schemas/personalInfo.schema";
import { useCvStore } from "@/store/useCvStore";
import { type PersonalInfo } from "@/types/userInfoTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/formField";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useState } from "react";
import FormStepCard from "@/components/FormStepCard";

interface PersonalInfoFormProps {
    onNext: () => void;
}

const PersonalInfoForm = ({ onNext }: PersonalInfoFormProps) => {
    const { cvData, setPersonalInfo } = useCvStore();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<PersonalInfo>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: cvData.personal
    });

    const onSubmit = (data: PersonalInfo) => {
        setPersonalInfo(data);
        console.log("saved personal info:", data);
        onNext();
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("photo", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <FormStepCard
            title="Personal Information"
            onSubmit={handleSubmit(onSubmit)}
            submitLabel="Next"
        >
            <div className="space-y-6">
                {/* Required Fields Section */}
                <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-semibold text-gray-700 border-b pb-2">Required</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Full Name" id="name" register={register} error={errors.name} placeholder="John Doe" />
                        <FormField label="Email" id="email" register={register} error={errors.email} placeholder="john.doe@example.com" />
                    </div>
                    <FormField label="Address" id="address" register={register} error={errors.address} placeholder="123 Main St, Anytown, USA" />
                    <FormField label="Phone" id="phone" register={register} error={errors.phone} placeholder="123-456-7890" />

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="photo">Photo (optional)</Label>
                        <label
                            htmlFor="photo"
                            className="flex flex-col items-center justify-center w-full h-28 md:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            {photoPreview ? (
                                <img src={photoPreview} alt="Preview" className="h-full w-auto object-contain rounded-lg" />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-4">
                                    <Upload className="w-6 h-6 md:w-8 md:h-8 mb-2 text-gray-400" />
                                    <p className="text-xs md:text-sm text-gray-500">Click to upload photo</p>
                                    <p className="text-[10px] md:text-xs text-gray-400">PNG, JPG up to 5MB</p>
                                </div>
                            )}
                            <input id="photo" type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                        </label>
                        {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                    </div>
                </div>

                {/* Optional Fields Section */}
                <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-semibold text-gray-500 border-b pb-2">Social Links (optional)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="LinkedIn" id="socialMedia.linkedin" register={register} error={errors.socialMedia?.linkedin} placeholder="linkedin.com/in/username" />
                        <FormField label="GitHub" id="socialMedia.github" register={register} error={errors.socialMedia?.github} placeholder="github.com/username" />
                        <FormField label="Website" id="socialMedia.website" register={register} error={errors.socialMedia?.website} placeholder="yourwebsite.com" />
                        <FormField label="Twitter" id="socialMedia.twitter" register={register} error={errors.socialMedia?.twitter} placeholder="twitter.com/username" />
                    </div>
                </div>
            </div>
        </FormStepCard>
    );
};

export default PersonalInfoForm;