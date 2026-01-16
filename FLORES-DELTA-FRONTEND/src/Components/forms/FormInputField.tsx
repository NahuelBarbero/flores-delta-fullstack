import { Input } from "@/Components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";

interface FormInputFieldProps {
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    optional?: boolean;
}

export const FormInputField = ({
    control,
    name,
    label,
    placeholder,
    type = "text",
    optional = false
}: FormInputFieldProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    {label} {optional && <span className="text-muted-foreground">(Opcional)</span>}
                </FormLabel>
                <FormControl>
                    <Input {...field} type={type} placeholder={placeholder} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);
