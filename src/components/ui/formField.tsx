import { type FieldValues, type UseFormRegister, type FieldError, type Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
    label: string;
    id: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    type?: string;
    placeholder?: string;
}

export function FormField<T extends FieldValues>({
    label,
    id,
    register,
    error,
    type = "text",
    placeholder,
}: FormFieldProps<T>) {
    return (
        <div className="flex flex-col gap-2 mb-5 last:mb-0">
            <Label htmlFor={String(id)}>{label}</Label>
            <Input
                id={String(id)}
                type={type}
                placeholder={placeholder}
                {...register(id, type === "file" ? {
                    setValueAs: (v: FileList) => v?.[0]
                } : {})}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}
