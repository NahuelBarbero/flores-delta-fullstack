import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { SalaDto } from "@/interfaces/Planta";
import { Button } from "@/Components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { FormInputField } from "./FormInputField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Loader2, Home, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const salaFormSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    descripcion: z.string().optional(),
    horasLuz: z.string().optional(),
    humedad: z.string().optional(),
    temperaturaAmbiente: z.string().optional(),
    tipoAmbiente: z.enum(['INTERIOR', 'EXTERIOR']).optional(),
});

type SalaFormData = z.infer<typeof salaFormSchema>;

interface FormularioSalaProps {
    mode: 'create' | 'edit';
    initialData?: SalaDto;
    onSuccess: () => void;
}

export const FormularioSala = ({ mode, initialData, onSuccess }: FormularioSalaProps) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const form = useForm<SalaFormData>({
        resolver: zodResolver(salaFormSchema),
        defaultValues: {
            nombre: initialData?.nombre || '',
            descripcion: initialData?.descripcion || '',
            horasLuz: initialData?.horasLuz || '',
            humedad: initialData?.humedad?.toString() || '',
            temperaturaAmbiente: initialData?.temperaturaAmbiente?.toString() || '',
            tipoAmbiente: initialData?.tipoAmbiente || undefined,
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: SalaFormData) => {
            const payload = {
                nombre: data.nombre,
                descripcion: data.descripcion || null,
                horasLuz: data.horasLuz || null,
                humedad: data.humedad ? parseFloat(data.humedad) : null,
                temperaturaAmbiente: data.temperaturaAmbiente ? parseFloat(data.temperaturaAmbiente) : null,
                tipoAmbiente: data.tipoAmbiente || null,
            };

            if (mode === 'create') {
                return apiService.createSala(payload);
            } else {
                return apiService.updateSala(initialData!.id, payload);
            }
        },
        onSuccess: () => {
            toast({
                title: mode === 'create' ? 'Sala Creada' : 'Sala Actualizada',
                description: `La sala ha sido ${mode === 'create' ? 'creada' : 'actualizada'} correctamente.`,
            });
            queryClient.invalidateQueries({ queryKey: ['salas'] });
            onSuccess();
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Ocurrió un error inesperado.',
            });
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
                <FormInputField
                    control={form.control}
                    name="nombre"
                    label="Nombre"
                    placeholder="Ej: Sala de Vegetativo"
                    required
                />

                <FormInputField
                    control={form.control}
                    name="descripcion"
                    label="Descripción"
                    placeholder="Ej: Sala principal de crecimiento"
                    optional
                />

                {/* Tipo de Ambiente */}
                <FormField
                    control={form.control}
                    name="tipoAmbiente"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Ambiente</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el tipo..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="INTERIOR">
                                        <div className="flex items-center gap-2">
                                            <Home className="w-4 h-4 text-blue-400" />
                                            <span>Interior</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="EXTERIOR">
                                        <div className="flex items-center gap-2">
                                            <Sun className="w-4 h-4 text-orange-400" />
                                            <span>Exterior</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormInputField
                    control={form.control}
                    name="horasLuz"
                    label="Horas de Luz"
                    placeholder="Ej: 18/6"
                    optional
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormInputField
                        control={form.control}
                        name="humedad"
                        label="Humedad (%)"
                        type="number"
                        placeholder="Ej: 65"
                        optional
                    />

                    <FormInputField
                        control={form.control}
                        name="temperaturaAmbiente"
                        label="Temperatura (°C)"
                        type="number"
                        placeholder="Ej: 24"
                        optional
                    />
                </div>

                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {mode === 'create' ? 'Crear Sala' : 'Guardar Cambios'}
                </Button>
            </form>
        </Form>
    );
};
