import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    FileText, Camera, Droplets, Scissors, Leaf, RefreshCw,
    Mic, Square, Trash2, CheckCircle, Loader2, Calendar, MapPin
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/Components/ui/select";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { SalaDto, PlantaDto } from "@/interfaces/Planta";
import { BackendEvent } from "@/interfaces/Eventos";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Validaciones
const entrySchema = z.object({
    eventType: z.enum(["NOTE", "WATERING", "PRUNING", "NUTRIENT", "STAGE_CHANGE", "SALA"]),
    fecha: z.string(),
    // Sala Change
    sala_id: z.string().optional(),
    // Note/Photo
    observacion: z.string().optional(),
    // Watering
    phAgua: z.string().optional(),
    ecAgua: z.string().optional(),
    // Pruning
    tipoPoda: z.string().optional(),
    // Nutrient - Solo requerido si eventType es NUTRIENT
    nutriente_id: z.string().optional(),
    // Stage Change
    nuevaEtapa: z.string().optional(),
}).superRefine((data, ctx) => {
    // Validación condicional: nutriente_id requerido solo para NUTRIENT events
    if (data.eventType === 'NUTRIENT' && (!data.nutriente_id || data.nutriente_id === '')) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['nutriente_id'],
            message: 'Debes seleccionar un nutriente',
        });
    }
});

type EntryFormData = z.infer<typeof entrySchema>;

interface UniversalEntryFormProps {
    plantaId: string;
    onClose: () => void;
    defaultType?: "NOTE" | "PHOTO" | "WATERING" | "PRUNING" | "NUTRIENT" | "STAGE_CHANGE" | "SALA";
    initialData?: BackendEvent; // ✅ Permitir edición
}

export const UniversalEntryForm = ({ plantaId, onClose, defaultType = "NOTE", initialData }: UniversalEntryFormProps) => {
    // Si estamos editando, usamos el tipo del evento original
    const [eventType, setEventType] = useState<any>(initialData?.eventType || defaultType);
    const isEditing = !!initialData;
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Load Metadata (Nutrientes)
    const { data: nutrientes = [] } = useQuery({
        queryKey: ['nutrientes'],
        queryFn: apiService.getNutrientes,
        enabled: eventType === 'NUTRIENT'
    });

    const { data: salas = [] } = useQuery<SalaDto[]>({
        queryKey: ['salas'],
        queryFn: apiService.getSalas,
        enabled: eventType === 'SALA'
    });

    // Fetch Planta details for Sala Update
    const { data: planta } = useQuery<PlantaDto>({
        queryKey: ['planta', plantaId],
        queryFn: () => apiService.getPlantaById(plantaId),
        enabled: eventType === 'SALA'
    });

    const form = useForm<EntryFormData>({
        resolver: zodResolver(entrySchema),
        defaultValues: {
            eventType: initialData?.eventType || defaultType,
            fecha: initialData?.fecha ? new Date(initialData.fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            observacion: initialData?.text || initialData?.description || initialData?.observacion || "", // Note uses 'text' in backend
            phAgua: initialData?.phAgua?.toString() || "",
            ecAgua: initialData?.ecAgua?.toString() || "",
            tipoPoda: initialData?.tipoPoda || "",
            nutriente_id: initialData?.nutriente?.id?.toString() || "",
            nuevaEtapa: initialData?.nuevaEtapa || "",
        }
    });

    // Audio Logic
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            const chunks: BlobPart[] = [];
            mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
            mediaRecorder.onstop = () => {
                setAudioBlob(new Blob(chunks, { type: 'audio/webm' }));
                stream.getTracks().forEach(track => track.stop());
            };
            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            timerRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000);
        } catch (err) {
            toast({ variant: "destructive", title: "Error Micrófono", description: "No se pudo acceder." });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    // Mutations
    const mutationMap = {
        NOTE: apiService.createNoteEvent,
        PHOTO: apiService.createPhotoEvent,
        WATERING: apiService.createWateringEvent,
        PRUNING: apiService.createPruningEvent,
        NUTRIENT: apiService.createNutrientEvent,
        STAGE_CHANGE: apiService.createStageChangeEvent
    };

    const genericMutation = useMutation({
        mutationFn: async (data: any) => {
            // Manejo especial Cambio de Sala (FULL Update + Note)
            if (eventType === 'SALA') {
                if (!data.sala_id) throw new Error("Selecciona una sala");
                if (!planta) throw new Error("Datos de planta no cargados");

                // Construct FULL payload to avoid 500 error
                const fullPayload = {
                    ...planta,
                    salaId: Number(data.sala_id),
                    // Ensure dates are strings or nulls as expected by backend DTO
                    fechaCreacion: planta.fechaCreacion ? new Date(planta.fechaCreacion).toISOString().split('T')[0] : null,
                    fechaFin: planta.fechaFin ? new Date(planta.fechaFin).toISOString().split('T')[0] : null,
                };

                await apiService.updatePlanta(Number(plantaId), fullPayload);

                const newSalaName = salas.find(s => s.id.toString() === data.sala_id)?.nombre || "Nueva Sala";
                const oldSalaName = salas.find(s => s.id === planta.salaId)?.nombre || "Sala Anterior";

                const formData = new FormData();
                formData.append("plantaIds", plantaId);
                formData.append("fecha", data.fecha);
                formData.append("text", `🔄 Movimiento de Sala: De "${oldSalaName}" a "${newSalaName}"`);
                if (data.observacion) formData.append("text", `\nMotivo: ${data.observacion}`);
                return apiService.createNoteEvent(formData);
            }

            // Dispatcher based on type
            if (eventType === 'NOTE') {
                const formData = new FormData();
                if (!isEditing) formData.append("plantaIds", plantaId); // Only for create
                formData.append("fecha", data.fecha);
                formData.append("text", data.observacion || "Sin contenido");
                if (mediaFiles) Array.from(mediaFiles).forEach(f => formData.append("files", f)); // Add new files
                if (audioBlob) formData.append("files", new File([audioBlob], "voice.webm", { type: 'audio/webm' }));

                if (isEditing && initialData?.id) {
                    return apiService.updateNoteEvent(initialData.id, formData);
                } else {
                    return apiService.createNoteEvent(formData);
                }
            } else {
                // JSON payloads
                const payload: any = { plantaIds: [parseInt(plantaId)], fecha: data.fecha };
                if (eventType === 'WATERING') {
                    payload.phAgua = parseFloat(data.phAgua);
                    payload.ecAgua = parseFloat(data.ecAgua);
                } else if (eventType === 'PRUNING') {
                    payload.tipoPoda = data.tipoPoda || "Poda General";
                } else if (eventType === 'NUTRIENT') {
                    payload.nutriente = { id: parseInt(data.nutriente_id) };
                } else if (eventType === 'STAGE_CHANGE') {
                    payload.nuevaEtapa = data.nuevaEtapa;
                }
                // Dynamic call to the specific service method
                switch (eventType) {
                    case 'WATERING': return apiService.createWateringEvent(payload);
                    case 'PRUNING': return apiService.createPruningEvent(payload);
                    case 'NUTRIENT': return apiService.createNutrientEvent(payload);
                    case 'STAGE_CHANGE': return apiService.createStageChangeEvent(payload);
                }
            }
        },
        onSuccess: () => {
            if (eventType === 'SALA') {
                toast({ title: "Sala Actualizada", description: "La planta se movió correctamente." });
                queryClient.invalidateQueries({ queryKey: ['planta', plantaId] }); // Update plant profile too
            } else {
                toast({ title: "¡Evento Registrado!", description: `Se ha guardado tu ${eventType.toLowerCase()}.` });
            }
            queryClient.invalidateQueries({ queryKey: ['plantEvents'] });
            onClose();
        },
        onError: (err: any) => {
            toast({ variant: "destructive", title: "Error", description: err.message });
        }
    });

    const onSubmit = (data: EntryFormData) => {
        genericMutation.mutate(data);
    };

    return (
        <div className="space-y-4">
            {/* Type Selector */}
            {/* Type Selector - Compact Grid */}
            <div className="grid grid-cols-6 gap-1 mb-2">
                {[
                    { id: "NOTE", icon: FileText, label: "Nota" },
                    { id: "SALA", icon: MapPin, label: "Sala" }, // Replaced PHOTO with SALA
                    { id: "WATERING", icon: Droplets, label: "Riego" },
                    { id: "NUTRIENT", icon: Leaf, label: "Nutri." },
                    { id: "PRUNING", icon: Scissors, label: "Poda" },
                    { id: "STAGE_CHANGE", icon: RefreshCw, label: "Etapa" }
                ].map((t) => (
                    <Button
                        key={t.id}
                        type="button"
                        variant={eventType === t.id ? "default" : "outline"}
                        className={cn(
                            "flex flex-col h-14 p-1 gap-0.5",
                            eventType === t.id ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                            isEditing && eventType !== t.id ? "opacity-50 cursor-not-allowed" : "" // Disable if editing other type
                        )}
                        onClick={() => !isEditing && setEventType(t.id as any)}
                        disabled={isEditing && eventType !== t.id}
                    >
                        <t.icon className="w-4 h-4" />
                        <span className="text-[9px] font-medium leading-tight">{t.label}</span>
                    </Button>
                ))}
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label>Fecha</Label>
                    <Input type="date" {...form.register("fecha")} />
                </div>

                {/* Dynamic Fields */}
                {(eventType === 'NOTE' || eventType === 'PHOTO') && (
                    <div className="space-y-4">
                        <div>
                            <Label>{eventType === 'NOTE' ? 'Contenido' : 'Descripción'}</Label>
                            {isEditing && form.getValues("observacion")?.includes("Movimiento de Sala") && (
                                <p className="text-xs text-muted-foreground mb-1 bg-yellow-500/10 p-1 rounded border border-yellow-500/20">
                                    💡 Estás editando el registro histórico de un cambio de sala.
                                    Si deseas mover la planta nuevamente, cancela y selecciona "Nuevo Evento &gt; Sala".
                                </p>
                            )}
                            <Textarea {...form.register("observacion")} placeholder="Escribe aquí..." />
                        </div>
                        {/* Audio Recorder */}
                        <div className="border p-2 rounded-md bg-muted/20">
                            <Label className="mb-2 block text-xs">Nota de Voz</Label>
                            {!audioBlob ? (
                                !isRecording ?
                                    <Button type="button" size="sm" variant="secondary" onClick={startRecording}><Mic className="w-4 h-4 mr-1" /> Grabar</Button> :
                                    <Button type="button" size="sm" variant="destructive" onClick={stopRecording}><Square className="w-4 h-4 mr-1" /> Detener ({recordingTime}s)</Button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <audio src={URL.createObjectURL(audioBlob)} controls className="h-8 max-w-[200px]" />
                                    <Button type="button" size="icon" variant="ghost" onClick={() => setAudioBlob(null)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            )}
                        </div>
                        {/* File Upload */}
                        <div>
                            <Label>Archivos / Fotos</Label>
                            <Input type="file" multiple onChange={e => setMediaFiles(e.target.files)} />
                        </div>
                    </div>
                )}

                {eventType === 'WATERING' && (
                    <div className="grid grid-cols-2 gap-4">
                        <div><Label>pH</Label><Input step="0.1" type="number" {...form.register("phAgua")} /></div>
                        <div><Label>EC</Label><Input step="0.01" type="number" {...form.register("ecAgua")} /></div>
                    </div>
                )}

                {eventType === 'NUTRIENT' && (
                    <div>
                        <Label>Nutriente</Label>
                        <Select onValueChange={v => form.setValue("nutriente_id", v)}>
                            <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                            <SelectContent>
                                {nutrientes.map((n: any) => <SelectItem key={n.id} value={n.id.toString()}>{n.titulo}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {eventType === 'STAGE_CHANGE' && (
                    <div>
                        <Label>Nueva Etapa</Label>
                        <Select onValueChange={v => form.setValue("nuevaEtapa", v)}>
                            <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                            <SelectContent>
                                {["GERMINACION", "PLANTIN", "VEGETACION", "FLORACION", "COSECHADA"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {eventType === 'SALA' && (
                    <div className="space-y-3">
                        <div className="bg-muted p-2 rounded text-xs text-muted-foreground">
                            Sala Actual: {planta ? (salas.find(s => s.id === planta.salaId)?.nombre || "Cargando...") : <Loader2 className="w-3 h-3 animate-spin inline" />}
                        </div>
                        <div>
                            <Label>Nueva Sala</Label>
                            <Select onValueChange={v => form.setValue("sala_id", v)}>
                                <SelectTrigger><SelectValue placeholder="Selecciona sala destino..." /></SelectTrigger>
                                <SelectContent>
                                    {salas.filter((s: any) => s.id !== planta?.salaId).map((s: any) => (
                                        <SelectItem key={s.id} value={s.id.toString()}>{s.nombre}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Motivo / Observación</Label>
                            <Textarea {...form.register("observacion")} placeholder="Ej: Pasó a floración..." className="h-20" />
                        </div>
                    </div>
                )}

                {eventType === 'PRUNING' && (
                    <div>
                        <Label>Tipo de Poda</Label>
                        <Input {...form.register("tipoPoda")} placeholder="Ej: Apical, Bajos..." />
                    </div>
                )}

                <Button type="submit" className="w-full" disabled={genericMutation.isPending}>
                    {genericMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    Guardar Evento
                </Button>

            </form>
        </div>
    );
};
