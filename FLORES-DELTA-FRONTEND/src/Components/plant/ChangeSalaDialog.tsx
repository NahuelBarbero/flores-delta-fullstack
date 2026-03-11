import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { SalaDto } from "@/interfaces/Planta";
import { Loader2, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChangeSalaDialogProps {
    plantaId: string;
    currentSalaId?: number;
    currentSalaName?: string;
    salas: SalaDto[];
    isOpen: boolean;
    onClose: () => void;
}

export const ChangeSalaDialog = ({
    plantaId,
    currentSalaId,
    currentSalaName,
    salas,
    isOpen,
    onClose,
}: ChangeSalaDialogProps) => {
    const [selectedSalaId, setSelectedSalaId] = useState<string>("");
    const [reason, setReason] = useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: async () => {
            if (!selectedSalaId) throw new Error("Selecciona una sala");

            // 1. Update Planta
            await apiService.updatePlanta(Number(plantaId), { salaId: Number(selectedSalaId) });

            // 2. Create Note Event
            const newSalaName = salas.find(s => s.id.toString() === selectedSalaId)?.nombre || "Nueva Sala";
            const formData = new FormData();
            formData.append("plantaIds", plantaId);
            formData.append("fecha", new Date().toISOString());
            formData.append("text", `🔄 Movimiento de Sala: De "${currentSalaName || 'Sin Sala'}" a "${newSalaName}"${reason ? `\nMotivo: ${reason}` : ''}`);

            return apiService.createNoteEvent(formData);
        },
        onSuccess: () => {
            toast({ title: "Sala Actualizada", description: "La planta se movió correctamente." });
            queryClient.invalidateQueries({ queryKey: ["planta", plantaId] });
            queryClient.invalidateQueries({ queryKey: ["plantEvents", plantaId] });
            onClose();
            setSelectedSalaId("");
            setReason("");
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "No se pudo cambiar la sala.",
            });
        },
    });

    const handleSave = () => {
        mutation.mutate();
    };

    // Filter out current sala to avoid moving to same place
    const availableSalas = salas.filter(s => s.id !== currentSalaId);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ArrowRightLeft className="h-5 w-5 text-primary" />
                        Mover Planta de Sala
                    </DialogTitle>
                    <DialogDescription>
                        Selecciona la nueva sala para esta planta. Se creará un registro del movimiento en la bitácora.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Sala Actual</Label>
                        <div className="p-2 bg-muted rounded-md text-sm font-medium">
                            {currentSalaName || "Sin Asignar"}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Nueva Sala</Label>
                        <Select onValueChange={setSelectedSalaId} value={selectedSalaId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona sala destino..." />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSalas.map((sala) => (
                                    <SelectItem key={sala.id} value={sala.id.toString()}>
                                        {sala.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Motivo / Observación (Opcional)</Label>
                        <Textarea
                            placeholder="Ej: Pasó a floración, espacio insuficiente..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="resize-none"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSave} disabled={!selectedSalaId || mutation.isPending}>
                        {mutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Mover Planta
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
