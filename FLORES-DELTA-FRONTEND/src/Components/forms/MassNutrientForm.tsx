import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Droplets, Loader2, X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { PlantaDto, SalaDto } from "@/interfaces/Planta";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Interface for backend nutrient
interface NutrienteDto {
    id: number;
    titulo: string;
    descripcion?: string;
}

const massNutrientSchema = z.object({
    nutriente_id: z.string().min(1, "Debes seleccionar un nutriente"),
    plantas_ids: z.array(z.number()).min(1, "Debes seleccionar al menos una planta"),
});

type MassNutrientFormData = z.infer<typeof massNutrientSchema>;

export const MassNutrientForm = () => {
    const [selectedSalaIds, setSelectedSalaIds] = useState<string[]>([]);
    const [filteredPlantas, setFilteredPlantas] = useState<PlantaDto[]>([]);
    const [salaPopoverOpen, setSalaPopoverOpen] = useState(false);

    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: plantas = [] } = useQuery<PlantaDto[]>({
        queryKey: ['plantas'],
        queryFn: apiService.getPlantas,
        staleTime: 1000 * 60 * 5,
    });

    const { data: salas = [] } = useQuery<SalaDto[]>({
        queryKey: ['salas'],
        queryFn: apiService.getSalas,
        staleTime: 1000 * 60 * 5,
    });

    const { data: nutrientes = [] } = useQuery<NutrienteDto[]>({
        queryKey: ['nutrientes'],
        queryFn: apiService.getNutrientes,
        staleTime: 1000 * 60 * 5,
    });

    const form = useForm<MassNutrientFormData>({
        resolver: zodResolver(massNutrientSchema),
        defaultValues: {
            nutriente_id: "",
            plantas_ids: [],
        },
    });

    // Filter plants when sala selection changes
    useEffect(() => {
        if (!plantas) return;
        let filtered = plantas.filter(p => p.etapa !== 'COSECHADA');
        if (selectedSalaIds.length > 0) {
            filtered = filtered.filter(p => selectedSalaIds.includes(p.sala?.id.toString() || ''));
        }
        setFilteredPlantas(filtered);
    }, [selectedSalaIds, plantas]);

    const createNutrientMutation = useMutation({
        mutationFn: apiService.createNutrientEvent,
        onSuccess: (data) => {
            toast({
                title: "¡Aplicación Masiva Exitosa!",
                description: `Se aplicó el nutriente a ${data.plantaIds.length} plantas.`,
            });
            form.reset({ nutriente_id: "", plantas_ids: [] });
            setSelectedSalaIds([]);
            queryClient.invalidateQueries({ queryKey: ['plantEvents'] });
        },
        onError: (error: Error) => {
            toast({
                variant: "destructive",
                title: "Error en aplicación masiva",
                description: error.message,
            });
        }
    });

    const onSubmit = (data: MassNutrientFormData) => {
        const payload = {
            fecha: new Date().toISOString().split('T')[0],
            plantaIds: data.plantas_ids,
            nutriente: { id: parseInt(data.nutriente_id) },
        };
        createNutrientMutation.mutate(payload);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            form.setValue("plantas_ids", filteredPlantas.map(p => p.id));
        } else {
            form.setValue("plantas_ids", []);
        }
    };

    const handleToggleSala = (salaId: string) => {
        setSelectedSalaIds(prev =>
            prev.includes(salaId)
                ? prev.filter(id => id !== salaId)
                : [...prev, salaId]
        );
        form.setValue("plantas_ids", []);
    };

    const handleClearSalas = () => {
        setSelectedSalaIds([]);
        form.setValue("plantas_ids", []);
    };

    // Get selected sala names for display
    const selectedSalaNames = salas
        .filter(s => selectedSalaIds.includes(s.id.toString()))
        .map(s => s.nombre);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    Aplicación Masiva de Nutrientes
                </CardTitle>
                <CardDescription>
                    Selecciona un grupo de plantas (de una o varias salas) y registra una aplicación de nutrientes en lote.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Row: Sala Filter + Nutrient Selector - Centered */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            {/* Multi-Sala Dropdown */}
                            <FormItem>
                                <FormLabel>Filtrar por Sala(s)</FormLabel>
                                <Popover open={salaPopoverOpen} onOpenChange={setSalaPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={salaPopoverOpen}
                                            className="w-full justify-between h-10 font-normal"
                                        >
                                            {selectedSalaIds.length === 0 ? (
                                                <span className="text-muted-foreground">Selecciona salas...</span>
                                            ) : (
                                                <span className="truncate">
                                                    {selectedSalaIds.length === 1
                                                        ? selectedSalaNames[0]
                                                        : `${selectedSalaIds.length} salas seleccionadas`
                                                    }
                                                </span>
                                            )}
                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                        <div className="p-2 border-b">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Salas</span>
                                                {selectedSalaIds.length > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={handleClearSalas}
                                                        className="h-6 px-2 text-xs"
                                                    >
                                                        <X size={12} className="mr-1" />
                                                        Limpiar
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="max-h-[200px] overflow-y-auto p-1">
                                            {salas.map((sala) => {
                                                const isSelected = selectedSalaIds.includes(sala.id.toString());
                                                return (
                                                    <div
                                                        key={sala.id}
                                                        onClick={() => handleToggleSala(sala.id.toString())}
                                                        className={cn(
                                                            "flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer text-sm",
                                                            isSelected
                                                                ? "bg-primary/10 text-primary"
                                                                : "hover:bg-accent"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "w-4 h-4 border rounded-sm flex items-center justify-center",
                                                            isSelected
                                                                ? "bg-primary border-primary"
                                                                : "border-input"
                                                        )}>
                                                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                                                        </div>
                                                        {sala.nombre}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </FormItem>

                            {/* Nutrient Selector */}
                            <FormField
                                control={form.control}
                                name="nutriente_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nutriente a Aplicar</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona Nutriente" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {nutrientes.map((n) => (
                                                    <SelectItem key={n.id} value={n.id.toString()}>
                                                        {n.titulo}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Plants Selection */}
                        <div className="border rounded-md p-4">
                            <div className="flex items-center justify-between mb-4 pb-2 border-b">
                                <h4 className="font-medium text-sm">
                                    Plantas Seleccionadas ({form.watch("plantas_ids")?.length || 0})
                                </h4>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="select-all"
                                        onCheckedChange={handleSelectAll}
                                        checked={filteredPlantas.length > 0 && form.watch("plantas_ids")?.length === filteredPlantas.length}
                                    />
                                    <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                                        Seleccionar Todo
                                    </label>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="plantas_ids"
                                render={() => (
                                    <FormItem>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
                                            {filteredPlantas.length === 0 ? (
                                                <p className="text-sm text-muted-foreground col-span-full text-center py-4">
                                                    {selectedSalaIds.length === 0
                                                        ? "Selecciona una o más salas para ver las plantas"
                                                        : "No hay plantas en las salas seleccionadas."
                                                    }
                                                </p>
                                            ) : (
                                                filteredPlantas.map((item) => (
                                                    <FormField
                                                        key={item.id}
                                                        control={form.control}
                                                        name="plantas_ids"
                                                        render={({ field }) => (
                                                            <FormItem
                                                                className="flex items-start space-x-3 space-y-0 rounded-md border p-2 bg-card hover:bg-accent/50 transition-colors"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(field.value?.filter(v => v !== item.id))
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <div className="leading-none">
                                                                    <FormLabel className="font-normal cursor-pointer text-xs sm:text-sm">
                                                                        <span className="font-bold block">{item.nombre}</span>
                                                                        <span className="text-xs text-muted-foreground">
                                                                            {item.cepaDto?.geneticaParental || 'N/A'}
                                                                        </span>
                                                                    </FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                ))
                                            )}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={createNutrientMutation.isPending || form.watch("plantas_ids")?.length === 0}
                        >
                            {createNutrientMutation.isPending
                                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                : <Droplets className="mr-2 h-5 w-5" />
                            }
                            Aplicar Nutrientes
                        </Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
