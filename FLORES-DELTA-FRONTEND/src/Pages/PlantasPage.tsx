import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/dashboard/AppSidebar";
import { PlantCard } from "@/Components/dashboard/PlantCard";
import { Leaf, Search, Filter } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { PlantaDto, SalaDto } from "@/interfaces/Planta";
import { Skeleton } from "@/Components/ui/skeleton";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

const ETAPAS = ['Todas', 'PLANTIN', 'VEGETACION', 'FLORACION', 'COSECHADA'];

export default function PlantasPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterEtapa, setFilterEtapa] = useState('Todas');
    const [filterSala, setFilterSala] = useState('Todas');

    const { data: plantas = [], isLoading } = useQuery<PlantaDto[]>({
        queryKey: ['plantas'],
        queryFn: apiService.getPlantas,
        staleTime: 1000 * 60 * 5,
    });

    const { data: salas = [] } = useQuery<SalaDto[]>({
        queryKey: ['salas'],
        queryFn: apiService.getSalas,
        staleTime: 1000 * 60 * 5,
    });

    // Filter plants
    const filteredPlantas = plantas.filter((plant) => {
        const matchesSearch = plant.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plant.cepaDto?.geneticaParental?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEtapa = filterEtapa === 'Todas' || plant.etapa === filterEtapa;
        const matchesSala = filterSala === 'Todas' || plant.sala?.nombre === filterSala;
        return matchesSearch && matchesEtapa && matchesSala;
    });

    // Group by sala
    const groupedBySala = filteredPlantas.reduce((acc, plant) => {
        const salaName = plant.sala?.nombre || 'Sin Sala';
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
                        <div className="flex items-center gap-3">
                            <SidebarTrigger />
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Leaf className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">Plantas</h1>
                                    <p className="text-xs text-muted-foreground">
                                        {filteredPlantas.length} plantas
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

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
                                                    genetica={plant.cepaDto?.geneticaParental || 'Desconocida'}
                                                    stage={plant.etapa}
                                                    health={0}
                                                    fechaCreacion={plant.fechaCreacion}
                                                    tipoAmbiente={plant.sala?.tipoAmbiente as 'INTERIOR' | 'EXTERIOR' | undefined}
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
