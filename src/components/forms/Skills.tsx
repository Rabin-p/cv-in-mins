import { skillSchema, type SkillForm } from "@/schemas/skills.schema";
import { useCvStore } from "@/store/useCvStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/formField";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormStepCard from "@/components/FormStepCard";

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

interface SkillsFormProps {
    onNext: () => void;
    onBack: () => void;
}

const SkillsForm = ({ onNext, onBack }: SkillsFormProps) => {
    const { cvData, setSkill, removeSkill } = useCvStore();
    const skills = cvData.skills;

    const defaultValues: SkillForm = {
        name: "",
        proficiency: "Beginner"
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<SkillForm>({
        resolver: zodResolver(skillSchema),
        defaultValues
    })

    const onAddSkill = (data: SkillForm) => {
        setSkill({ ...data, id: crypto.randomUUID() });
        reset();
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    }

    return (
        <FormStepCard title="Skills" onSubmit={onSubmit} submitLabel="Next" showBack onBack={onBack}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Skill" id="name" register={register} error={errors.name} placeholder="JavaScript" />
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="proficiency">Proficiency</Label>
                        <select
                            id="proficiency"
                            {...register("proficiency")}
                            className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        >
                            {proficiencyLevels.map((level) => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                        {errors.proficiency && <p className="text-red-500 text-sm">{errors.proficiency.message}</p>}
                    </div>
                </div>

                <Button type="button" variant="outline" onClick={handleSubmit(onAddSkill)} className="w-full sm:w-auto">
                    Add Skill
                </Button>

                {skills.length > 0 && (
                    <div className="space-y-2 pt-2">
                        <Label className="text-muted-foreground">Added Skills ({skills.length})</Label>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs sm:text-sm"
                                >
                                    <span>{skill.name}</span>
                                    <span className="text-muted-foreground">•</span>
                                    <span className="text-muted-foreground">{skill.proficiency}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill.id)}
                                        className="ml-1 text-muted-foreground hover:text-destructive"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </FormStepCard>
    )
}

export default SkillsForm
