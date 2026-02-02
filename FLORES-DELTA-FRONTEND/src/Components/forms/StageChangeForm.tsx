import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { Loader2, Save } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import { Textarea } from '@/Components/ui/textarea';
import { Input } from '@/Components/ui/input';
import { useToast } from '@/Components/ui/use-toast';

// Schema aligned with Backend Enum NuevaEtapa
const stageChangeSchema = z.object({
  nuevaEtapa: z.enum(['GERMINACION', 'PLANTIN', 'VEGETACION', 'FLORACION', 'COSECHADA'], {
    required_error: "Debes seleccionar una etapa",
  }),
  fecha: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha inválida",
  }),
});

type StageChangeFormValues = z.infer<typeof stageChangeSchema>;

interface StageChangeFormProps {
  plantaId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const StageChangeForm: React.FC<StageChangeFormProps> = ({
  plantaId,
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Initialize form
  const form = useForm<StageChangeFormValues>({
    resolver: zodResolver(stageChangeSchema),
    defaultValues: {
      nuevaEtapa: undefined,
      fecha: new Date().toISOString().split('T')[0], // Default to today YYYY-MM-DD
    },
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: (values: StageChangeFormValues) =>
      apiService.createStageChangeEvent({
        plantaIds: [plantaId],
        nuevaEtapa: values.nuevaEtapa,
        fecha: values.fecha, // Backend expects LocalDate (YYYY-MM-DD) or ISO
      }),
    onSuccess: () => {
      toast({
        title: "¡Etapa actualizada!",
        description: "El cambio de ciclo se registró correctamente.",
        variant: "default", // Greenish/Success in standard shadcn setup? Check theme.
      });
      queryClient.invalidateQueries({ queryKey: ['plantEvents', plantaId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['planta', plantaId.toString()] });
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error al cambiar etapa",
        description: error.message || "No se pudo registrar el cambio.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: StageChangeFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        🌽 Cambio de Ciclo Vital
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Nueva Etapa Field */}
          <FormField
            control={form.control}
            name="nuevaEtapa"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Nueva Etapa</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-black/20 border-white/10 text-white">
                      <SelectValue placeholder="Selecciona la nueva etapa..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white">
                    <SelectItem value="GERMINACION">🌱 Germinación</SelectItem>
                    <SelectItem value="PLANTIN">🌿 Plantín</SelectItem>
                    <SelectItem value="VEGETACION">🍃 Vegetación</SelectItem>
                    <SelectItem value="FLORACION">🌸 Floración</SelectItem>
                    <SelectItem value="COSECHADA">✂️ Cosechada</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha Field */}
          <FormField
            control={form.control}
            name="fecha"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Fecha del Cambio</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="bg-black/20 border-white/10 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg shadow-green-900/20"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Registrar Cambio
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
