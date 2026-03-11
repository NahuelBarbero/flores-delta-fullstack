import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/Components/ui/form";
import { Button } from "@/Components/ui/button";
import { PlantaDto } from "@/interfaces/Planta";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FormInputField } from "./FormInputField";
import { FormSelectField } from "./FormSelectField";
import { FormCheckboxField } from "./FormCheckboxField";
import { useEffect } from "react";
// import { useAuth } from "@/Context/AuthContext"; // Ya no se usa explícitamente, backend maneja owner

// Schema de validación local para el formulario (adaptado a UX)
// Zod Schema para el formulario (inputs son strings mayormente)
const formSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    salaId: z.string().min(1, "Debes seleccionar una sala"),
    cepaId: z.string().min(1, "Debes seleccionar una genética"),
    etapa: z.enum(['GERMINACION', 'PLANTIN', 'VEGETACION', 'FLORACION', 'COSECHADA']),
    ubicacion: z.string().optional(),
    produccion: z.string().optional(), // Input number devuelve string a veces
    isPublic: z.boolean().default(false),
    isPublic: z.boolean().default(false),
    fechaCreacion: z.string().optional(), // Nueva Fecha Inicio
});

type PlantaFormData = z.infer<typeof formSchema>;

const ETAPAS_OPTIONS = [
    { value: 'GERMINACION', label: 'Germinación' },
    { value: 'PLANTIN', label: 'Plantín' },
    { value: 'VEGETACION', label: 'Vegetación' },
    { value: 'FLORACION', label: 'Floración' },
    { value: 'COSECHADA', label: 'Cosechada' },
];

interface FormularioPlantaProps {
    mode: 'create' | 'edit';
    initialData?: PlantaDto;
    onSuccess: () => void;
}

export const FormularioPlanta = ({ mode, initialData, onSuccess }: FormularioPlantaProps) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    // const { user } = useAuth(); // No necesario, backend usa token

    // Cargar Salas para el select
    const { data: salas = [], isLoading: isLoadingSalas } = useQuery({
        queryKey: ['salas'],
        queryFn: apiService.getSalas,
    });

    // Cargar Cepas para el select
    const { data: cepas = [], isLoading: isLoadingCepas } = useQuery({
        queryKey: ['cepas'],
        queryFn: apiService.getCepas,
    });

    const form = useForm<PlantaFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: initialData?.nombre || '',
            salaId: initialData?.salaId?.toString() || '',
            cepaId: initialData?.cepaId?.toString() || '',
            etapa: initialData?.etapa || 'GERMINACION',
            ubicacion: initialData?.ubicacion || '',
            produccion: initialData?.produccion?.toString() || '',
            isPublic: initialData?.isPublic || false,
            isPublic: initialData?.isPublic || false,
            fechaCreacion: initialData?.fechaCreacion?.split('T')[0] || '',
        },
    });

    // Reset form cuando cambia initialData (modo edición)
    useEffect(() => {
        if (initialData) {
            form.reset({
                nombre: initialData.nombre,
                salaId: initialData.salaId?.toString() || '',
                cepaId: initialData.cepaId?.toString() || '',
                etapa: initialData.etapa,
                ubicacion: initialData.ubicacion || '',
                produccion: initialData.produccion?.toString() || '',
                isPublic: initialData.isPublic || false,
                isPublic: initialData.isPublic || false,
                fechaCreacion: initialData.fechaCreacion?.split('T')[0] || '',
            });
        }
    }, [initialData, form]);

    const mutation = useMutation({
        mutationFn: async (data: PlantaFormData) => {
            const payload: any = { // Usar 'any' temporalmente para evitar bloqueo de TS estricto
                nombre: data.nombre,
                etapa: data.etapa as any,
                salaId: data.salaId ? Number(data.salaId) : null,
                cepaId: data.cepaId ? Number(data.cepaId) : null,
                ubicacion: data.ubicacion || null,
                produccion: data.produccion ? Number(data.produccion) : 0,
                isPublic: data.isPublic || false,
                produccion: data.produccion ? Number(data.produccion) : 0,
                isPublic: data.isPublic || false,
                fechaCreacion: data.fechaCreacion || null,
            };

            if (mode === 'create') {
                return apiService.createPlanta(payload);
            } else {
                const response = await apiService.updatePlanta(initialData!.id, payload);

                // ✅ SPRINT D: Auto-Log Cambio de Sala
                if (initialData?.salaId && payload.salaId && Number(initialData.salaId) !== Number(payload.salaId)) {
                    try {
                        const oldSalaName = salas.find(s => s.id.toString() === initialData.salaId!.toString())?.nombre || 'Sala Anterior';
                        const newSalaName = salas.find(s => s.id.toString() === payload.salaId!.toString())?.nombre || 'Nueva Sala';

                        const formData = new FormData();
                        formData.append("plantaIds", initialData!.id.toString());
                        formData.append("fecha", new Date().toISOString().split('T')[0]);
                        formData.append("text", `🔄 Movimiento de Sala: De "${oldSalaName}" a "${newSalaName}"`);

                        // Fuego y olvido (no bloqueamos el UI si falla el log)
                        apiService.createNoteEvent(formData).catch(e => console.error("Error auto-logging sala change:", e));
                    } catch (err) {
                        console.warn("No se pudo registrar evento cambio sala", err);
                    }
                }
                return response;
            }
        },
        onSuccess: () => {
            toast({
                title: mode === 'create' ? 'Planta Creada' : 'Planta Actualizada',
                description: `La planta ha sido ${mode === 'create' ? 'creada' : 'actualizada'} correctamente.`,
            });
            queryClient.invalidateQueries({ queryKey: ['plantas'] });
            if (initialData?.id) {
                queryClient.invalidateQueries({ queryKey: ['planta', initialData.id.toString()] });
            }
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

    const salasOptions = salas.map(sala => ({
        value: sala.id.toString(),
        label: sala.nombre
    }));

    const cepasOptions = cepas.map(cepa => ({
        value: cepa.id.toString(),
        label: `${cepa.geneticaParental}${cepa.dominancia ? ` (${cepa.dominancia})` : ''}`
    }));

    if (isLoadingSalas || isLoadingCepas) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Cargando datos...</span>
            </div>
        );
    }

    // Validación: Si no hay salas o genéticas, mostrar advertencia
    if (salas.length === 0 || cepas.length === 0) {
        return (
            <div className="p-4 border border-yellow-500 rounded-md bg-yellow-50 dark:bg-yellow-900/20">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Datos Faltantes
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                    Para crear una planta necesitas:
                </p>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside mb-3">
                    {salas.length === 0 && <li>Al menos 1 Sala creada</li>}
                    {cepas.length === 0 && <li>Al menos 1 Genética creada</li>}
                </ul>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    Ve al Panel de Control para crear estos elementos primero.
                </p>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => {
                console.log("🚀 Enviando formulario planta:", data);
                mutation.mutate(data);
            })} className="space-y-4">
                <FormInputField
                    control={form.control}
                    name="nombre"
                    label="Nombre / Etiqueta"
                    placeholder="Ej: GEL-005"
                    required
                />

                <FormSelectField
                    control={form.control}
                    name="salaId"
                    label="Sala"
                    options={salasOptions}
                    placeholder="Selecciona una sala"
                    emptyMessage="No hay salas disponibles"
                />

                <FormSelectField
                    control={form.control}
                    name="cepaId"
                    label="Genética"
                    options={cepasOptions}
                    placeholder="Selecciona una genética"
                    emptyMessage="No hay genéticas disponibles"
                />

                <FormSelectField
                    control={form.control}
                    name="etapa"
                    label="Etapa de Crecimiento"
                    options={ETAPAS_OPTIONS}
                    placeholder="Selecciona etapa"
                />

                <FormInputField
                    control={form.control}
                    name="ubicacion"
                    label="Ubicación en Sala"
                    placeholder="Ej: Estante 2, Esquina izquierda"
                    optional
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormInputField
                        control={form.control}
                        name="produccion"
                        label="Producción Esperada (g)"
                        type="number"
                        placeholder="Ej: 150"
                        optional
                    />

                    <FormInputField
                        control={form.control}
                        name="fechaCreacion"
                        label="Fecha de Inicio (Creación)"
                        type="date"
                        optional={false}
                    />
                </div>

                <FormCheckboxField
                    control={form.control}
                    name="isPublic"
                    label="Planta Pública"
                    description="Permitir que otros usuarios vean esta planta"
                />

                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {mode === 'create' ? 'Crear Planta' : 'Guardar Cambios'}
                </Button>
            </form>
        </Form>
    );
};
