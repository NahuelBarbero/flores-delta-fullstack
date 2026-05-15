import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast"; // Importar useToast

const newSalaSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  horasLuz: z.string().optional(),
  humedad: z.string().refine((val) => !val || !isNaN(parseFloat(val)), "Debe ser un número").optional(),
  temperaturaAmbiente: z.string().refine((val) => !val || !isNaN(parseFloat(val)), "Debe ser un número").optional(),
});

type NewSalaFormData = z.infer<typeof newSalaSchema>;

interface NewSalaFormProps {
  onBack: () => void;
  onClose: () => void;
}

export const NewSalaForm = ({ onBack, onClose }: NewSalaFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast(); // Inicializar el hook

  const createSalaMutation = useMutation({
    mutationFn: (data: any) => {
        const payload = {
            ...data,
            humedad: data.humedad ? parseFloat(data.humedad) : null,
            temperaturaAmbiente: data.temperaturaAmbiente ? parseFloat(data.temperaturaAmbiente) : null
        };
        return apiService.createSala(payload);
    },
    onSuccess: (data) => {
      toast({
        title: "¡Sala Creada!",
        description: `La sala '${data.nombre}' (ID: ${data.id}) ha sido registrada.`,
      });
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['salas'] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error al crear la sala",
        description: error.message || "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
      });
    }
  });

  const form = useForm<NewSalaFormData>({
    resolver: zodResolver(newSalaSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      horasLuz: "18",
      humedad: "",
      temperaturaAmbiente: "",
    },
  });

  const onSubmit = (data: NewSalaFormData) => {
    createSalaMutation.mutate(data);
  };

  const handleReset = () => {
    form.reset();
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">¡Sala Creada!</h3>
          <p className="text-muted-foreground">Tu nuevo espacio de cultivo está listo.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            <Plus className="mr-2 h-4 w-4" />
            Crear Otra
          </Button>
          <Button onClick={onClose} className="flex-1">
            Volver
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-xl font-bold text-foreground">Nueva Sala</h3>
          <p className="text-sm text-muted-foreground">Define un nuevo espacio de cultivo</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la Sala</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Carpa 80x80" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: LED 300W - Vegetativo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="horasLuz"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Horas de Luz</FormLabel>
                    <FormControl>
                    <Input placeholder="18" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="temperaturaAmbiente"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Temp. (°C)</FormLabel>
                    <FormControl>
                    <Input type="number" step="0.1" placeholder="24.5" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
           </div>

          <Button type="submit" className="w-full" size="lg" disabled={createSalaMutation.isPending}>
            {createSalaMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-5 w-5" />
            )}
            Crear Sala
          </Button>
        </form>
      </Form>
    </div>
  );
};
