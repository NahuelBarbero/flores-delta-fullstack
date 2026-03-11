import { ArrowLeft, Calendar, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { PlantaDto } from "@/interfaces/Planta";
import { BackendEvent } from "@/interfaces/Eventos";
import { UniversalEntryForm } from "@/Components/forms/UniversalEntryForm";
import { PlantProfile } from "@/Components/plant/PlantProfile";
import { EventFilters } from "@/Components/plant/EventFilters";
import { EventCard } from "@/Components/plant/EventCard";
import { useToast } from "@/hooks/use-toast";
import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PlantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletePlantOpen, setIsDeletePlantOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<BackendEvent | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<string>("todos");

  const { data: planta, isLoading: isLoadingPlanta, isError: isErrorPlanta } = useQuery<PlantaDto>({
    queryKey: ['planta', id],
    queryFn: () => apiService.getPlantaById(id!),
    enabled: !!id,
  });

  const { data: events = [], isLoading: isLoadingEvents } = useQuery<BackendEvent[]>({
    queryKey: ['plantEvents', id],
    queryFn: () => apiService.getPlantEvents(id!),
    enabled: !!id,
  });

  // ✅ SPRINT D: Fetch de listas maestras para Fallback de UI (Backend devuelve nulos)
  const { data: salas = [] } = useQuery({
    queryKey: ['salas'],
    queryFn: apiService.getSalas,
  });

  const { data: cepas = [] } = useQuery({
    queryKey: ['cepas'],
    queryFn: apiService.getCepas,
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Filtrado de eventos
  const filteredEvents = useMemo(() => {
    if (selectedEventType === "todos") return events;
    return events.filter(e => e.eventType === selectedEventType);
  }, [events, selectedEventType]);

  // Conteo por tipo
  const eventCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach(e => {
      counts[e.eventType] = (counts[e.eventType] || 0) + 1;
    });
    return counts;
  }, [events]);

  // ✅ SPRINT C - Fase 5: Función para calcular semana desde fechaCreacion de planta
  const calcularSemana = (fechaEvento: string, fechaCreacionPlanta: string): number => {
    const inicio = new Date(fechaCreacionPlanta);
    const evento = new Date(fechaEvento);
    const diffMs = evento.getTime() - inicio.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.floor(diffDays / 7) + 1);
  };

  // ✅ SPRINT C - Fase 5: Agrupar eventos filtrados por semana
  const eventosAgrupados = useMemo(() => {
    if (!planta?.fechaCreacion) return { 1: filteredEvents };

    const grupos: Record<number, BackendEvent[]> = {};

    filteredEvents.forEach(evento => {
      const semana = calcularSemana(evento.fecha, planta.fechaCreacion);
      if (!grupos[semana]) grupos[semana] = [];
      grupos[semana].push(evento);
    });

    // Ordenar eventos dentro de cada semana por fecha descendente
    Object.values(grupos).forEach(grupo => {
      grupo.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    });

    return grupos;
  }, [filteredEvents, planta?.fechaCreacion]);

  // Obtener semanas ordenadas (de más reciente a más antigua)
  const semanasOrdenadas = useMemo(() => {
    return Object.keys(eventosAgrupados)
      .map(Number)
      .sort((a, b) => b - a);
  }, [eventosAgrupados]);

  const deleteEventMutation = useMutation({
    mutationFn: ({ eventType, eventId }: { eventType: string; eventId: string }) =>
      apiService.deleteEvent(eventType, eventId),
    onSuccess: () => {
      toast({ title: "Evento eliminado", description: "El evento se eliminó correctamente." });
      queryClient.invalidateQueries({ queryKey: ['plantEvents', id] });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar el evento." });
    },
  });

  const deletePlantaMutation = useMutation({
    mutationFn: (plantaId: number) => apiService.deletePlanta(plantaId),
    onSuccess: () => {
      toast({ title: "Planta eliminada", description: "La planta se eliminó permanentemente." });
      navigate('/plantas');
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar la planta." });
    },
  });

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: BackendEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (event: BackendEvent) => {
    if (window.confirm(`¿Eliminar este evento de ${event.eventType}?`)) {
      deleteEventMutation.mutate({ eventType: event.eventType, eventId: event.id.toString() });
    }
  };

  if (isLoadingPlanta) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  if (isErrorPlanta || !planta) return <div className="p-8 text-center text-destructive">Error al cargar la planta o planta no encontrada.</div>;

  return (
    <div className="min-h-screen w-full bg-background p-4 sm:p-6 lg:p-8">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate('/plantas')} className="mr-4">
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <Calendar size={28} className="mr-3 text-primary" />
                Bitácora de {planta.nombre}
              </h1>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAddEvent}>
              <Plus className="mr-2 h-4 w-4" /> Registrar Evento
            </Button>
          </div>
        </div>
      </header>

      <main className="space-y-6">
        {/* Perfil de Planta */}
        <PlantProfile
          planta={planta}
          salas={salas}
          cepas={cepas}
          onEdit={() => navigate(`/plantas/${id}/editar`)}
          onDelete={() => setIsDeletePlantOpen(true)}
        />

        {/* Filtros de Eventos */}
        <EventFilters
          selectedType={selectedEventType}
          onTypeChange={setSelectedEventType}
          eventCounts={eventCounts}
        />

        {/* Timeline de Eventos */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Historia de Vida Semanal</h2>

          {isLoadingEvents ? (
            <div className="text-center py-8">
              <Loader2 className="animate-spin text-primary mx-auto mb-2" size={32} />
              Cargando bitácora...
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="mx-auto mb-4" size={48} />
              <p>No hay eventos registrados {selectedEventType !== "todos" && "de este tipo"}.</p>
              <Button onClick={handleAddEvent} className="mt-4">
                <Plus className="mr-2" /> Registrar Primer Evento
              </Button>
            </div>
          ) : (
            // ✅ SPRINT C - Fase 5: Renderizado agrupado por semanas
            <div className="space-y-6">
              {semanasOrdenadas.map((semana) => (
                <div key={semana} className="space-y-3">
                  {/* Separador visual de semana */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-full">
                      <Calendar size={14} />
                      Semana {semana}
                    </div>
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">
                      {eventosAgrupados[semana]?.length || 0} eventos
                    </span>
                  </div>

                  {/* Eventos de esta semana */}
                  <div className="space-y-3 pl-2 border-l-2 border-primary/20">
                    {eventosAgrupados[semana]?.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        plantCreationDate={planta?.fechaCreacion}
                        onEdit={() => handleEditEvent(event)}
                        onDelete={() => handleDeleteEvent(event)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Dialog para agregar/editar eventos */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Editar Evento' : 'Registrar Nuevo Evento'}</DialogTitle>
            <DialogDescription>
              {editingEvent
                ? 'Modifica los datos del evento'
                : 'Completa los datos para registrar un nuevo evento'}
            </DialogDescription>
          </DialogHeader>
          <UniversalEntryForm
            plantaId={id!}
            onClose={() => setIsModalOpen(false)}
            defaultType={editingEvent?.eventType as any || "NOTE"}
            initialData={editingEvent || undefined}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog eliminar planta */}
      <AlertDialog open={isDeletePlantOpen} onOpenChange={setIsDeletePlantOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar {planta.nombre}?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente esta planta
              y todos sus eventos, fotos y notas asociadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePlantaMutation.mutate(planta.id)}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deletePlantaMutation.isPending}
            >
              {deletePlantaMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Eliminar Permanentemente
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
