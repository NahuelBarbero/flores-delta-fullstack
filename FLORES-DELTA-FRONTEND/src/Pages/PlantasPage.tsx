import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/dashboard/AppSidebar";
import { PlantCard } from "@/Components/dashboard/PlantCard";
import { WizardPlanta } from "@/Components/wizard/WizardPlanta"; // ✅ Importar Wizard
import { FormularioPlanta } from "@/Components/forms/FormularioPlanta"; // ✅ Importar Form Clásico
import { Leaf, Search, Filter, Loader2, PlusCircle, LayoutGrid } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { PlantaDto, SalaDto, CepaDto } from "@/interfaces/Planta";
import { Skeleton } from "@/Components/ui/skeleton";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { useAuth } from "@/Context/AuthContext";


const ETAPAS = ['Todas', 'PLANTIN', 'VEGETACION', 'FLORACION', 'COSECHADA'];

export default function PlantasPage() {
    const { user } = useAuth();
    // Modal State: 'wizard' | 'classic' | null
    const [creationMode, setCreationMode] = useState<'wizard' | 'classic' | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false); // Legacy support if needed

    const [searchQuery, setSearchQuery] = useState('');
    const [filterEtapa, setFilterEtapa] = useState('Todas');
    const [filterSala, setFilterSala] = useState('Todas');

    // ✅ SPRINT C: Debounce para búsqueda backend
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data: salas = [] } = useQuery<SalaDto[]>({
        queryKey: ['salas'],
        queryFn: apiService.getSalas,
        staleTime: 1000 * 60 * 5,
    });

    const { data: cepas = [] } = useQuery<CepaDto[]>({
        queryKey: ['cepas'],
        queryFn: apiService.getCepas,
        staleTime: 1000 * 60 * 5,
    });

    // ✅ SPRINT C: Query base (todas las plantas)
    const { data: allPlantas = [], isLoading: isLoadingAll } = useQuery<PlantaDto[]>({
        queryKey: ['plantas'],
        queryFn: apiService.getPlantas,
        staleTime: 1000 * 60 * 5,
        enabled: debouncedSearch.length < 2 && filterSala === 'Todas',
    });

    // ✅ SPRINT C: Query por búsqueda backend
    const { data: searchResults = [], isLoading: isSearching } = useQuery<PlantaDto[]>({
        queryKey: ['plantas', 'search', debouncedSearch],
        queryFn: () => apiService.searchPlantas(debouncedSearch),
        enabled: debouncedSearch.length >= 2,
        staleTime: 1000 * 30,
    });

    // ✅ SPRINT C: Query por sala backend
    const selectedSalaId = filterSala !== 'Todas'
        ? salas.find(s => s.nombre === filterSala)?.id
        : null;

    const { data: plantasBySala = [], isLoading: isLoadingBySala } = useQuery<PlantaDto[]>({
        queryKey: ['plantas', 'sala', selectedSalaId],
        queryFn: () => apiService.getPlantasBySala(selectedSalaId!),
        enabled: selectedSalaId !== null && debouncedSearch.length < 2,
        staleTime: 1000 * 60 * 2,
    });

    // ✅ SPRINT C: Selección inteligente de datos (backend-first)
    const plantas = useMemo(() => {
        // Prioridad 1: Búsqueda activa
        if (debouncedSearch.length >= 2) return searchResults;
        // Prioridad 2: Filtro por sala
        if (selectedSalaId !== null) return plantasBySala;
        // Sin filtros: todas las plantas
        return allPlantas;
    }, [debouncedSearch, searchResults, selectedSalaId, plantasBySala, allPlantas]);

    // Solo filtrar etapa localmente (no hay endpoint de etapa en backend)
    const filteredPlantas = useMemo(() => {
        if (filterEtapa === 'Todas') return plantas;
        return plantas.filter(p => p.etapa === filterEtapa);
    }, [plantas, filterEtapa]);

    const isLoading = isLoadingAll || isSearching || isLoadingBySala;

    // Group by sala
    const groupedBySala = filteredPlantas.reduce((acc, plant) => {
        // ✅ SPRINT D FIX: Lookup por ID si la relación nested es nula
        const salaName = plant.sala?.nombre || salas.find(s => s.id === plant.salaId)?.nombre || 'Sin Sala';
        if (!acc[salaName]) acc[salaName] = [];
        acc[salaName].push(plant);
        return acc;
    }, {} as Record<string, PlantaDto[]>);

    return (
        <SidebarProvider>
            <div
                className="min-h-screen w-full flex relative"
                style={{
                    backgroundImage: 'url(/images/background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-background/60 pointer-events-none" style={{ position: 'fixed' }} />

                <AppSidebar />
                <div className="flex-1 overflow-auto relative z-10">
                    {/* Header - just title, no filters */}
                    <header className="bg-card/70 backdrop-blur-sm border-b border-border px-4 md:px-6 py-4 sticky top-0 z-40 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 translate-y-[-10px] animate-in fade-in slide-in-from-top-4 duration-500">
                            <div>
                                <h1 className="text-3xl font-bold font-heading text-foreground flex items-center gap-2">
                                    <Leaf className="text-primary w-8 h-8" />
                                    Mis Plantas
                                </h1>
                                <p className="text-muted-foreground">Gestiona tu cultivo activo</p>
                            </div>

                            {/* ✅ Botones de Acción (Desktop & Mobile) */}
                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button
                                    className="flex-1 sm:flex-none font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                                    onClick={() => setCreationMode('wizard')}
                                >
                                    <PlusCircle className="mr-2 h-5 w-5" /> Nueva Planta (Wizard)
                                </Button>
                                <Button
                                    variant="outline"
                                    className="hidden sm:flex"
                                    onClick={() => setCreationMode('classic')}
                                    title="Formulario Clásico"
                                >
                                    <LayoutGrid size={20} />
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* --- FILTROS --- */}
                    <main className="p-4 md:p-6">
                        {/* Filters Section - Separate from header like in Bitácora */}
                        <div className="mb-6 p-4 md:p-6 bg-card/30 backdrop-blur-sm rounded-xl border-2 border-primary/50 shadow-md">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Filter className="mr-2 text-primary" size={20} />
                                Filtros de Plantas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                        <Input
                                            placeholder="Buscar plantas..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                                <Select value={filterEtapa} onValueChange={setFilterEtapa}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Etapa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ETAPAS.map((etapa) => (
                                            <SelectItem key={etapa} value={etapa}>
                                                {etapa === 'Todas' ? 'Todas las etapas' : etapa}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={filterSala} onValueChange={setFilterSala}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sala" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Todas">Todas las salas</SelectItem>
                                        {salas.map((sala) => (
                                            <SelectItem key={sala.id} value={sala.nombre}>
                                                {sala.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {isLoading && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <Skeleton key={i} className="h-48 rounded-lg" />
                                ))}
                            </div>
                        )}

                        {!isLoading && filteredPlantas.length === 0 && (
                            <div className="text-center py-12">
                                <Leaf className="mx-auto mb-4 text-muted-foreground" size={48} />
                                <p className="text-muted-foreground">No se encontraron plantas</p>
                            </div>
                        )}

                        {!isLoading && filteredPlantas.length > 0 && (
                            <div className="space-y-6">
                                {Object.entries(groupedBySala).map(([salaName, plants]) => (
                                    <div key={salaName}>
                                        <h2 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                                            <Leaf size={14} />
                                            {salaName}
                                            <span className="text-muted-foreground font-normal">({plants.length})</span>
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {plants.map((plant) => (
                                                <PlantCard
                                                    key={plant.id}
                                                    id={plant.id.toString()}
                                                    etiqueta={plant.nombre}
                                                    genetica={plant.cepaDto?.geneticaParental || cepas.find(c => c.id === plant.cepaId)?.geneticaParental || 'Desconocida'}
                                                    stage={plant.etapa}
                                                    health={0}
                                                    fechaCreacion={plant.fechaCreacion}
                                                    tipoAmbiente={plant.sala?.tipoAmbiente || salas.find(s => s.id === plant.salaId)?.tipoAmbiente as 'INTERIOR' | 'EXTERIOR' | undefined}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
