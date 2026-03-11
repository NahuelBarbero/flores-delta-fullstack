
import { Button } from "@/Components/ui/button";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area";
import { Droplets, Scissors, Leaf, StickyNote, Image as ImageIcon, Sparkles, FilterX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * COMPONENTE: BitacoraFilterBar
 * OBJETIVO: Reemplazar dropdowns con botones de filtro visuales y rápidos.
 * UX: Scrolling horizontal en mobile, botones grandes en desktop.
 */

interface BitacoraFilterBarProps {
    selectedType: string | null;
    onSelectType: (type: string | null) => void;
}

const EVENT_TYPES = [
    { id: 'WATERING', label: 'Riego', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    { id: 'NUTRIENT', label: 'Nutrientes', icon: Leaf, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20' }, // Usamos Leaf pq Sprout no es tan claro
    { id: 'PRUNING', label: 'Poda', icon: Scissors, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
    { id: 'NOTE', label: 'Nota', icon: StickyNote, color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20' },
    { id: 'PHOTO', label: 'Foto', icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20' },
    { id: 'STAGE_CHANGE', label: 'Etapa', icon: Sparkles, color: 'text-pink-500', bg: 'bg-pink-500/10 border-pink-500/20' },
];

export const BitacoraFilterBar = ({ selectedType, onSelectType }: BitacoraFilterBarProps) => {
    return (
        <div className="w-full mb-4">
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <div className="flex w-max space-x-2 p-1">
                    <Button
                        variant={selectedType === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => onSelectType(null)}
                        className="rounded-full px-4"
                    >
                        <FilterX className="mr-2 h-4 w-4" />
                        Todos
                    </Button>

                    {/* Botones de Tipo */}
                    {EVENT_TYPES.map((type) => {
                        const isSelected = selectedType === type.id;
                        const Icon = type.icon;

                        return (
                            <Button
                                key={type.id}
                                variant="outline"
                                size="sm"
                                onClick={() => onSelectType(isSelected ? null : type.id)}
                                className={cn(
                                    "rounded-full border transition-all",
                                    isSelected
                                        ? `${type.bg} border-current ${type.color} font-bold shadow-sm`
                                        : "hover:bg-accent text-muted-foreground"
                                )}
                            >
                                <Icon className={cn("mr-2 h-4 w-4", isSelected ? "animate-pulse" : "")} />
                                {type.label}
                            </Button>
                        );
                    })}
                </div>
                <ScrollBar orientation="horizontal" className="invisible sm:visible" />
            </ScrollArea>
        </div>
    );
};
