import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Droplets,
  Scissors,
  Leaf,
  Camera,
  FileText,
  Search,
  X,
  CheckSquare,
  Square,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { DirectAccessButton } from "@/Components/DirectAccessButton";
import { PlantSelectableChip } from "@/Components/PlantSelectableChip";
import { BatchConfirmDialog } from "@/Components/BatchConfirmDialog";
import { useDirectAccessMenuStore } from "@/stores/useDirectAccessMenuStore";
import { usePlantSelectionStore } from "@/stores/usePlantSelectionStore";
import { NewPlantForm } from "@/Components/forms/NewPlantForm";
import { NewSalaForm } from "@/Components/forms/NewSalaForm";
import { NewCepaForm } from "@/Components/forms/NewCepaForm";
import { WateringForm } from "@/Components/forms/WateringForm";
import { PruningForm } from "@/Components/forms/PruningForm";
import { NutrientsForm } from "@/Components/forms/NutrientsForm";
import { PhotoForm } from "@/Components/forms/PhotoForm";
import { NoteForm } from "@/Components/forms/NoteForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { SalaDto, PlantaDto } from "@/interfaces/Planta";
import { useToast } from "@/hooks/use-toast";

export const DirectAccessMenu = () => {
  const { isOpen, closeMenu } = useDirectAccessMenuStore();
  const {
    selectedPlantIds,
    selectedPlants,
    clearSelection,
    selectAll,
    pendingAction,
    setPendingAction,
  } = usePlantSelectionStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedSalaIds, setSelectedSalaIds] = useState<string[]>([]);
  const [searchPlant, setSearchPlant] = useState("");
  const [showBatchConfirm, setShowBatchConfirm] = useState(false);

  // Reset state when menu opens
  useEffect(() => {
    if (isOpen) {
      setSelectedTool(null);
      setSelectedSalaIds([]);
      setSearchPlant("");
      clearSelection();
    }
  }, [isOpen, clearSelection]);

  // Queries
  const { data: salas = [] } = useQuery<SalaDto[]>({
    queryKey: ['salas'],
    queryFn: apiService.getSalas,
    enabled: isOpen,
    staleTime: 1000 * 60 * 5,
  });

  const { data: plantas = [] } = useQuery<PlantaDto[]>({
    queryKey: ['plantas'],
    queryFn: apiService.getPlantas,
    enabled: isOpen,
    staleTime: 1000 * 60 * 5,
  });

  // Filter plants - only show if there's a filter or search
  const hasFilter = selectedSalaIds.length > 0 || searchPlant.length > 0;

  const filteredPlantas = selectedSalaIds.length > 0
    ? plantas.filter(p => selectedSalaIds.includes(p.sala?.id.toString() || ''))
    : plantas;

  const searchedPlantas = filteredPlantas.filter(p =>
    p.nombre.toLowerCase().includes(searchPlant.toLowerCase())
  );

  // Batch mutation example (for watering - can be extended)
  const batchWateringMutation = useMutation({
    mutationFn: async (plantIds: number[]) => {
      const payload = {
        fecha: new Date().toISOString().split('T')[0],
        plantaIds: plantIds,
        phAgua: 6.5,
        ecAgua: 1.0,
        tempAgua: 22.0,
      };
      return apiService.createWateringEvent(payload);
    },
    onSuccess: () => {
      toast({
        title: "¡Operación Completada!",
        description: `Se aplicó ${pendingAction} a ${selectedPlantIds.length} plantas.`,
      });
      queryClient.invalidateQueries({ queryKey: ['plantEvents'] });
      queryClient.invalidateQueries({ queryKey: ['plantas'] });
      clearSelection();
      setShowBatchConfirm(false);
      setPendingAction(null);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error en operación masiva",
        description: error.message,
      });
    },
  });

  const handleClose = () => {
    setSelectedTool(null);
    setSelectedSalaIds([]);
    setSearchPlant("");
    clearSelection();
    closeMenu();
  };

  const handleToggleSala = (salaId: string) => {
    setSelectedSalaIds(prev =>
      prev.includes(salaId)
        ? prev.filter(id => id !== salaId)
        : [...prev, salaId]
    );
  };

  const handleClearSalas = () => {
    setSelectedSalaIds([]);
  };

  const handleActionClick = (actionName: string) => {
    // If plants are selected, show confirmation
    if (selectedPlantIds.length > 0) {
      setPendingAction(actionName);
      setShowBatchConfirm(true);
    } else {
      // Single plant mode - go to form
      setSelectedTool(actionName);
    }
  };

  const handleBatchConfirm = () => {
    // Execute batch operation based on pending action
    if (pendingAction === "registrar-riego") {
      batchWateringMutation.mutate(selectedPlantIds);
    } else {
      // For other actions, navigate to form with multi-plant context
      // TODO: Extend forms to accept plantIds[]
      toast({
        title: "Función en desarrollo",
        description: `El lote de ${pendingAction} para múltiples plantas se implementará próximamente.`,
      });
      setShowBatchConfirm(false);
    }
  };

  const handleSelectAll = () => {
    selectAll(searchedPlantas);
  };

  const handleBackToMenu = () => {
    setSelectedTool(null);
  };

  const handleFormComplete = () => {
    handleClose();
    navigate("/dashboard");
  };

  const handlePlantNavigate = (plantaId: number) => {
    navigate(`/plant/${plantaId}`);
    handleClose();
  };

  // Actions definition
  const actions = [
    { icon: Plus, label: "Nueva Planta", name: "nueva-planta" },
    { icon: Droplets, label: "Registrar Riego", name: "registrar-riego" },
    { icon: Scissors, label: "Registrar Poda", name: "registrar-poda" },
    { icon: Leaf, label: "Añadir Nutrientes", name: "anadir-nutrientes" },
    { icon: Camera, label: "Tomar Foto", name: "tomar-foto" },
    { icon: FileText, label: "Nueva Nota", name: "nueva-nota" },
  ];

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const renderFormContent = () => {
    switch (selectedTool) {
      case "nueva-planta":
        return <NewPlantForm onBack={handleBackToMenu} onClose={handleFormComplete} contextSalaId={selectedSalaIds[0] || undefined} />;
      case "nueva-sala":
        return <NewSalaForm onBack={handleBackToMenu} onClose={handleFormComplete} />;
      case "nueva-cepa":
        return <NewCepaForm onBack={handleBackToMenu} onClose={handleFormComplete} />;
      case "registrar-riego":
        return <WateringForm onBack={handleBackToMenu} onClose={handleFormComplete} />;
      case "registrar-poda":
        return <PruningForm onBack={handleBackToMenu} onClose={handleFormComplete} />;
      case "anadir-nutrientes":
        return <NutrientsForm onBack={handleBackToMenu} onClose={handleFormComplete} />;
      case "tomar-foto":
        return <PhotoForm onBack={handleBackToMenu} onClose={handleFormComplete} />;
      case "nueva-nota":
        return <NoteForm onBack={handleBackToMenu} onClose={handleFormComplete} />;
      default:
        return null;
    }
  };

  const getActionLabel = (actionName: string) => {
    return actions.find(a => a.name === actionName)?.label || actionName;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {!selectedTool ? (
            <div className="flex flex-col gap-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary">
                  Menú Principal
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Selecciona plantas y aplica acciones masivas
                </DialogDescription>
              </DialogHeader>

              {/* Plant Selection Section */}
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Search size={16} /> Seleccionar Plantas
                </h3>

                <div className="flex flex-col gap-3">
                  {/* Sala Filter - Multi-select chips */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Filtrar por Sala</span>
                      {selectedSalaIds.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleClearSalas}
                          className="h-6 px-2 text-xs"
                        >
                          <X size={12} className="mr-1" />
                          Limpiar ({selectedSalaIds.length})
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {salas.map((sala) => {
                        const isSelected = selectedSalaIds.includes(sala.id.toString());
                        return (
                          <button
                            key={sala.id}
                            onClick={() => handleToggleSala(sala.id.toString())}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${isSelected
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                              }`}
                          >
                            {isSelected && <CheckSquare size={10} className="inline mr-1" />}
                            {sala.nombre}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Buscar planta..."
                    value={searchPlant}
                    onChange={(e) => setSearchPlant(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />

                  {/* Selection Controls */}
                  {hasFilter && searchedPlantas.length > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSelectAll}
                          className="text-xs"
                        >
                          <CheckSquare size={14} className="mr-1" />
                          Seleccionar Todas
                        </Button>
                        {selectedPlantIds.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearSelection}
                            className="text-xs"
                          >
                            <Square size={14} className="mr-1" />
                            Limpiar
                          </Button>
                        )}
                      </div>
                      {selectedPlantIds.length > 0 && (
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {selectedPlantIds.length} seleccionada{selectedPlantIds.length !== 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Plant List - Only show if there's a filter */}
                  {hasFilter ? (
                    <div
                      role="listbox"
                      aria-label="Seleccionar plantas"
                      className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto"
                    >
                      {searchedPlantas.length > 0 ? (
                        searchedPlantas.map((planta) => (
                          <PlantSelectableChip
                            key={planta.id}
                            plant={planta}
                          />
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground col-span-2 text-center py-2">
                          No se encontraron plantas
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-4 bg-muted/50 rounded-md">
                      Filtra por sala o busca para ver las plantas
                    </p>
                  )}

                  {/* Quick Navigate Link */}
                  {selectedPlantIds.length === 1 && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handlePlantNavigate(selectedPlantIds[0])}
                      className="text-xs self-start"
                    >
                      <Leaf size={12} className="mr-1" />
                      Ir a bitácora de {selectedPlants[0]?.nombre}
                    </Button>
                  )}
                </div>
              </div>

              {/* Actions Section */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                  <span>Acciones</span>
                  {selectedPlantIds.length > 0 && (
                    <span className="text-xs text-muted-foreground font-normal">
                      Se aplicarán a {selectedPlantIds.length} planta{selectedPlantIds.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </h3>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {actions.map((action, index) => (
                      <motion.div
                        key={action.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <DirectAccessButton
                          icon={action.icon}
                          label={action.label}
                          onClick={() => handleActionClick(action.name)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex justify-center pt-2 border-t border-border">
                <Button onClick={handleClose} variant="ghost" className="w-full">
                  Cerrar Menú
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <DialogHeader className="sr-only">
                <DialogTitle>Formulario de Acción</DialogTitle>
                <DialogDescription>Complete el formulario para registrar la acción</DialogDescription>
              </DialogHeader>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTool}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderFormContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Batch Confirmation Dialog */}
      <BatchConfirmDialog
        open={showBatchConfirm}
        onOpenChange={setShowBatchConfirm}
        actionName={getActionLabel(pendingAction || "")}
        plants={selectedPlants}
        onConfirm={handleBatchConfirm}
        isLoading={batchWateringMutation.isPending}
      />
    </>
  );
};
