
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Check, ChevronRight, Leaf, MapPin, Settings as SettingsIcon, Sprout, ArrowLeft, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { PlantaDto, CepaDto, SalaDto } from '@/interfaces/Planta';
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

/**
 * COMPONENTE: WizardPlanta
 * OBJETIVO: Reemplazar el formulario aburrido con una experiencia "Grow With Jane" Step-by-Step.
 * ESTRUCTURA:
 * - Paso 1: Selección de Genética (Visual Grid)
 * - Paso 2: Selección de Sala (Cards con ocupación)
 * - Paso 3: Configuración Final (Maceta, Sustrato, Fecha)
 */

interface WizardPlantaProps {
    onClose: () => void;
    onSuccess: (newPlant: PlantaDto) => void;
}

const STEPS = [
    { id: 1, title: 'Genética', icon: Leaf },
    { id: 2, title: 'Ubicación', icon: MapPin },
    { id: 3, title: 'Detalles', icon: SettingsIcon },
];

export const WizardPlanta = ({ onClose, onSuccess }: WizardPlantaProps) => {
    const queryClient = useQueryClient();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<PlantaDto>>({
        nombre: '',
        etapa: 'PLANTIN', // Default
        fecha_inicio: format(new Date(), 'yyyy-MM-dd'),
        cantidad: 1, // Por defecto 1
    });

    // --- DATA FETCHING ---
    const { data: cepasList = [], isLoading: loadingCepas } = useQuery<CepaDto[]>({
        queryKey: ['cepas'],
        queryFn: apiService.getCepas
    });

    const { data: salasList = [], isLoading: loadingSalas } = useQuery<SalaDto[]>({
        queryKey: ['salas'],
        queryFn: apiService.getSalas
    });

    const createMutation = useMutation({
        mutationFn: apiService.createPlanta,
        onSuccess: (newPlant) => {
            toast.success(`¡${newPlant.nombre} creada con éxito! 🌱`);
            queryClient.invalidateQueries({ queryKey: ['plantas'] });
            onSuccess(newPlant);
        },
        onError: (error) => {
            console.error(error);
            toast.error("Error al crear la planta. Revisa los datos.");
        }
    });

    // --- HANDLERS ---
    const handleNext = () => {
        if (currentStep === 1 && !formData.cepaDto) {
            toast.error("Selecciona una genética para continuar");
            return;
        }
        if (currentStep === 2 && !formData.sala) {
            toast.error("Selecciona una sala para continuar");
            return;
        }
        if (currentStep < 3) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = () => {
        if (!formData.nombre) {
            // Auto-generar nombre si no hay
            const cepaName = formData.cepaDto?.nombre || 'Planta';
            const randomId = Math.floor(Math.random() * 1000);
            formData.nombre = `${cepaName} #${randomId}`;
        }
        createMutation.mutate(formData as PlantaDto);
    };

    const selectCepa = (cepa: CepaDto) => {
        setFormData(prev => ({
            ...prev,
            cepaDto: cepa,
            // Pre-fill nombre sugerido
            nombre: `${cepa.nombre} #${Math.floor(Math.random() * 100) + 1}`
        }));
        handleNext(); // Auto-avance opcional
    };

    const selectSala = (sala: SalaDto) => {
        setFormData(prev => ({ ...prev, sala }));
        handleNext();
    };


    // --- RENDERS ---

    // Paso 1: Grid de Genéticas
    const renderStep1 = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-medium mb-4 text-center">¿Qué vas a cultivar hoy?</h3>
            {loadingCepas ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
            ) : (
                <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {cepasList.map(cepa => (
                            <Card
                                key={cepa.id}
                                className={cn(
                                    "cursor-pointer hover:border-primary transition-all group overflow-hidden border-2",
                                    formData.cepaDto?.id === cepa.id ? "border-primary bg-primary/5" : "border-transparent bg-card"
                                )}
                                onClick={() => selectCepa(cepa)}
                            >
                                <div className="aspect-square bg-muted relative">
                                    {/* Placeholder o Foto Real si existiera */}
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                                        {cepa.imagen ? (
                                            <img src={cepa.imagen} alt={cepa.nombre} className="w-full h-full object-cover" />
                                        ) : (
                                            <Leaf size={48} />
                                        )}
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        {formData.cepaDto?.id === cepa.id && <div className="bg-primary text-primary-foreground rounded-full p-1"><Check size={12} /></div>}
                                    </div>
                                </div>
                                <div className="p-3 text-center">
                                    <p className="font-bold text-sm truncate">{cepa.nombre}</p>
                                    <p className="text-xs text-muted-foreground">{cepa.banco || 'Desconocido'}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            )}
            <div className="flex justify-center mt-4">
                <Button variant="ghost" onClick={onClose} className="text-muted-foreground">Cancelar</Button>
            </div>
        </div>
    );

    // Paso 2: Grid de Salas
    const renderStep2 = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-medium mb-4 text-center">¿Dónde vivirá esta planta?</h3>
            {loadingSalas ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {salasList.map(sala => (
                        <Card
                            key={sala.id}
                            className={cn(
                                "cursor-pointer hover:border-primary transition-all p-4 border-2 flex items-center justify-between",
                                formData.sala?.id === sala.id ? "border-primary bg-primary/5" : "border-border"
                            )}
                            onClick={() => selectSala(sala)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-background p-2 rounded-lg border">
                                    <MapPin className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold">{sala.nombre}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {sala.indoor ? 'Indoor' : 'Exterior'} • {sala.contaminada ? '⚠️ Cuarentena' : '✅ Sana'}
                                    </p>
                                    {/* Mostrar ocupación visualmente si se tuviera el dato */}
                                </div>
                            </div>
                            {formData.sala?.id === sala.id && <Check className="text-primary w-6 h-6" />}
                        </Card>
                    ))}
                </div>
            )}
            <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Volver</Button>
                {/* Auto-advance en selección, pero dejamos botón por si acaso */}
            </div>
        </div>
    );

    // Paso 3: Configuración Final
    const renderStep3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 max-w-md mx-auto">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sprout className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">¡Casi listo!</h3>
                <p className="text-muted-foreground">Configura los detalles finales.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Nombre de la Planta</Label>
                    <Input
                        value={formData.nombre}
                        onChange={(e) => setFormData(p => ({ ...p, nombre: e.target.value }))}
                        placeholder="Ej: Gorilla Glue #4"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Maceta (L)</Label>
                        <Input
                            type="number"
                            value={formData.maceta || ''}
                            onChange={(e) => setFormData(p => ({ ...p, maceta: Number(e.target.value) }))}
                            placeholder="Ej: 10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Sustrato</Label>
                        <Input
                            value={formData.sustrato || ''}
                            onChange={(e) => setFormData(p => ({ ...p, sustrato: e.target.value }))}
                            placeholder="Ej: Coco/Perlita"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Fecha de Inicio</Label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="date"
                            className="pl-10"
                            value={formData.fecha_inicio}
                            onChange={(e) => setFormData(p => ({ ...p, fecha_inicio: e.target.value }))}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t">
                <Button variant="outline" onClick={handleBack}>Atrás</Button>
                <Button
                    onClick={handleSubmit}
                    className="w-full ml-4"
                    disabled={createMutation.isPending}
                >
                    {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Plantarlo 🌱
                </Button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl h-full md:h-auto md:max-h-[85vh] flex flex-col shadow-2xl border-primary/20">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-muted/20">
                    <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                        <Sprout className="text-primary" /> Nueva Planta
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>✕</Button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-secondary">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                </div>

                {/* Content Area */}
                <ScrollArea className="flex-1 p-6">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                </ScrollArea>

                {/* Footer only for step indicator usually, but actions are embedded */}
                <div className="p-4 border-t text-center text-xs text-muted-foreground">
                    Paso {currentStep} de 3 • {STEPS[currentStep - 1].title}
                </div>
            </Card>
        </div>
    );
};
