import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
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
} from "@/Components/ui/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { SalaDto, CepaDto } from "@/interfaces/Planta";
import { useToast } from "@/hooks/use-toast"; // 1. Importar useToast

const newPlantSchema = z.object({
  genetica_id: z.string().min(1, "La genética es requerida"),
  etiqueta: z.string().min(1, "La etiqueta es requerida"),
  fecha_siembra: z.string().min(1, "La fecha de siembra es requerida"),
  espacio_id: z.string().min(1, "El espacio es requerido"),
  etapa_enum: z.string().min(1, "La etapa es requerida"),
});

type NewPlantFormData = z.infer<typeof newPlantSchema>;

interface NewPlantFormProps {
  onBack: () => void;
  onClose: () => void;
  contextSalaId?: string; // Optional context from parent (e.g., DirectAccessMenu or SalaDetailPage)
}

const ETAPAS_OPTIONS = [
  { id: "GERMINACION", nombre: "Germinación" },
  { id: "PLANTIN", nombre: "Plántula" },
  { id: "VEGETACION", nombre: "Vegetativo" },
  { id: "FLORACION", nombre: "Floración" },
];

export const NewPlantForm = ({ onBack, onClose, contextSalaId }: NewPlantFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [plantId, setPlantId] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast(); // 2. Inicializar el hook

  const { data: salas = [] } = useQuery<SalaDto[]>({
    queryKey: ['salas'],
    queryFn: apiService.getSalas,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const { data: cepas = [] } = useQuery<CepaDto[]>({
    queryKey: ['cepas'],
    queryFn: apiService.getCepas,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const createPlantaMutation = useMutation({
    mutationFn: apiService.createPlanta,
    onSuccess: (data) => {
      toast({
        title: "¡Planta Registrada!",
        description: `La planta ${data.nombre} (ID: ${data.id}) ha sido creada con éxito.`,
      });
      setPlantId(data.id.toString());
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['plantas'] });
    },
    onError: (error: Error) => {
      // 3. Reemplazar alert con toast de error
      toast({
        variant: "destructive",
        title: "Error al crear la planta",
        description: error.message || "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
      });
    }
  });

  const form = useForm<NewPlantFormData>({
    resolver: zodResolver(newPlantSchema),
    defaultValues: {
      genetica_id: "",
      etiqueta: "",
      fecha_siembra: new Date().toISOString().split("T")[0],
      espacio_id: contextSalaId || "", // Preload with context if provided
      etapa_enum: "VEGETACION",
    },
  });

  // Update form when contextSalaId changes
  useEffect(() => {
    if (contextSalaId) {
      form.setValue('espacio_id', contextSalaId);
    }
  }, [contextSalaId, form]);

  const onSubmit = (data: NewPlantFormData) => {
    const payload = {
      nombre: data.etiqueta,
      etapa: data.etapa_enum,
      fechaCreacion: data.fecha_siembra,
      sala: { id: parseInt(data.espacio_id) },
      cepaDto: { id: parseInt(data.genetica_id) },
      produccion: 0,
      isPublic: false
    };

    createPlantaMutation.mutate(payload);
  };

  const handleReset = () => {
    form.reset();
    setIsSubmitted(false);
    setPlantId("");
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">¡Planta Registrada!</h3>
          <p className="text-muted-foreground">
            ID de la planta: <span className="font-mono font-semibold text-primary">{plantId}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            <Plus className="mr-2 h-4 w-4" />
            Crear Otra
          </Button>
          <Button onClick={onClose} className="flex-1">
            Ir al Dashboard
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
          <h3 className="text-xl font-bold text-foreground">Nueva Planta</h3>
          <p className="text-sm text-muted-foreground">Registra una nueva planta en el cultivo</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="etiqueta"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etiqueta / Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: GEL-005" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genetica_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genética</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una genética" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cepas.length > 0 ? cepas.map((gen) => (
                      <SelectItem key={gen.id} value={gen.id.toString()}>
                        {gen.geneticaParental} ({gen.dominancia})
                      </SelectItem>
                    )) : <SelectItem value="none" disabled>No hay cepas registradas</SelectItem>}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fecha_siembra"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Inicio</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="espacio_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Espacio / Sala</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un espacio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {salas.length > 0 ? salas.map((esp) => (
                      <SelectItem key={esp.id} value={esp.id.toString()}>
                        {esp.nombre}
                      </SelectItem>
                    )) : <SelectItem value="none" disabled>No hay salas registradas</SelectItem>}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="etapa_enum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etapa Inicial</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una etapa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ETAPAS_OPTIONS.map((etapa) => (
                      <SelectItem key={etapa.id} value={etapa.id}>
                        {etapa.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg" disabled={createPlantaMutation.isPending}>
            {createPlantaMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-5 w-5" />
            )}
            {createPlantaMutation.isPending ? "Registrando..." : "Registrar Planta"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
