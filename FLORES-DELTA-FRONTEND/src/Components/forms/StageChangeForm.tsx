import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Leaf, CheckCircle, ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/Components/ui/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { PlantaDto } from "@/interfaces/Planta";
import { useToast } from "@/hooks/use-toast";

// Valores del enum NuevaEtapa del backend
const ETAPAS_OPTIONS = [
  { value: "GERMINACION", label: "Germinación" },
  { value: "PLANTIN", label: "Plántula" },
  { value: "VEGETACION", label: "Vegetación" },
  { value: "FLORACION", label: "Floración" },
  { value: "COSECHADA", label: "Cosechada" },
];

// Tipos para el evento de backend
interface BackendEvent {
  id: number;
  eventType: string;
  fecha: string;
  plantaIds: number[];
  nuevaEtapa?: "GERMINACION" | "PLANTIN" | "VEGETACION" | "FLORACION" | "COSECHADA"; // Para StageChange
}

const stageChangeSchema = z.object({
  planta_id: z.string().optional(),
  nuevaEtapa: z.enum(["GERMINACION", "PLANTIN", "VEGETACION", "FLORACION", "COSECHADA"], {
    required_error: "Debes seleccionar una nueva etapa",
  }),
});

type StageChangeFormData = z.infer<typeof stageChangeSchema>;

interface StageChangeFormProps {
  onBack: () => void;
  onClose: () => void;
  plantaId?: string;
  eventToEdit?: BackendEvent; // Prop opcional para modo edición
}

export const StageChangeForm = ({ onBack, onClose, plantaId, eventToEdit }: StageChangeFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: plantas = [], isLoading: isLoadingPlantas } = useQuery<PlantaDto[]>({
    queryKey: ['plantas'],
    queryFn: apiService.getPlantas,
    enabled: !plantaId && !eventToEdit,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
  const createStageChangeMutation = useMutation({
    mutationFn: apiService.createStageChangeEvent,
    onSuccess: (data) => {
      toast({
        title: "¡Etapa Cambiada!",
        description: `La planta (ID: ${data.plantaIds[0]}) ha cambiado a etapa: ${data.nuevaEtapa}.`,
      });
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['plantEvents'] });
      queryClient.invalidateQueries({ queryKey: ['plantas'] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error al cambiar de etapa",
        description: error.message || "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
      });
    }
  });

  const updateStageChangeMutation = useMutation({
    mutationFn: ({ eventId, payload }: { eventId: string; payload: any }) =>
      apiService.updateEvent("stage-change", eventId, payload),
    onSuccess: (data) => {
      toast({
        title: "¡Etapa Actualizada!",
        description: `La etapa (ID: ${data.id}) ha sido actualizada a: ${data.nuevaEtapa}.`,
      });
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['plantEvents'] });
      queryClient.invalidateQueries({ queryKey: ['plantas'] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error al actualizar la etapa",
        description: error.message || "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
      });
    }
  });

  const form = useForm<StageChangeFormData>({
    resolver: zodResolver(stageChangeSchema),
    defaultValues: {
      planta_id: plantaId || eventToEdit?.plantaIds[0]?.toString() || "",
      nuevaEtapa: (eventToEdit?.nuevaEtapa as "GERMINACION" | "PLANTIN" | "VEGETACION" | "FLORACION" | "COSECHADA") || "VEGETACION",
    },
  });

  useEffect(() => {
    if (plantaId) {
      form.setValue("planta_id", plantaId);
    } else if (eventToEdit) {
      form.setValue("planta_id", eventToEdit.plantaIds[0]?.toString() || "");
      form.setValue("nuevaEtapa", (eventToEdit.nuevaEtapa as "GERMINACION" | "PLANTIN" | "VEGETACION" | "FLORACION" | "COSECHADA") || "VEGETACION");
    }
  }, [plantaId, eventToEdit, form]);

  const onSubmit = (data: StageChangeFormData) => {
    const selectedPlantaId = plantaId || data.planta_id;

    if (!selectedPlantaId) {
      toast({
        variant: "destructive",
        title: "Selección Requerida",
        description: "Debes seleccionar una planta para cambiar su etapa.",
      });
      return;
    }

    const payload = {
      fecha: eventToEdit?.fecha || new Date().toISOString().split('T')[0],
      plantaIds: [parseInt(selectedPlantaId)],
      nuevaEtapa: data.nuevaEtapa,
    };

    if (eventToEdit) {
      updateStageChangeMutation.mutate({ eventId: eventToEdit.id.toString(), payload });
    } else {
      createStageChangeMutation.mutate(payload);
    }
  };

  const handleReset = () => {
    form.reset();
    setIsSubmitted(false);
  };

  const isPending = createStageChangeMutation.isPending || updateStageChangeMutation.isPending;

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">¡Etapa {eventToEdit ? 'Actualizada' : 'Cambiada'}!</h3>
          <p className="text-muted-foreground">
            La etapa de la planta se ha actualizado correctamente.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            {eventToEdit ? 'Editar Otra' : 'Cambiar Otra'}
          </Button>
          <Button onClick={onClose} className="flex-1">
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold text-foreground">{eventToEdit ? 'Editar Cambio de Etapa' : 'Cambiar Etapa de Planta'}</h3>
          <p className="text-sm text-muted-foreground">Actualiza la fase de crecimiento de tu planta</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {!plantaId && !eventToEdit && (
            <FormField
              control={form.control}
              name="planta_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una planta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingPlantas ? (
                        <SelectItem value="loading" disabled>Cargando plantas...</SelectItem>
                      ) : plantas.length > 0 ? (
                        plantas.map((planta) => (
                          <SelectItem key={planta.id} value={planta.id.toString()}>
                            {planta.nombre}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>No hay plantas disponibles</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {eventToEdit && (
            <FormItem>
              <FormLabel>Planta</FormLabel>
              <FormControl>
                <Input value={eventToEdit.plantaIds[0]} disabled className="text-muted-foreground" />
              </FormControl>
              <FormDescription>ID de la planta a la que se aplica el cambio de etapa.</FormDescription>
            </FormItem>
          )}

          <FormField
            control={form.control}
            name="nuevaEtapa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva Etapa</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la nueva etapa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ETAPAS_OPTIONS.map((etapa) => (
                      <SelectItem key={etapa.value} value={etapa.value}>
                        {etapa.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  La etapa actual de la planta se actualizará.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-5 w-5" />
            )}
            {eventToEdit ? 'Guardar Cambios' : 'Guardar Cambio de Etapa'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
