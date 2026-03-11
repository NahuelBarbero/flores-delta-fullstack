
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Droplets, Scissors, Leaf, StickyNote, Image as ImageIcon, Sparkles, Calendar, MapPin } from "lucide-react";
import { BackendEvent } from "@/interfaces/Eventos";

/**
 * COMPONENTE: BitacoraFeedCard (Mobile First)
 * OBJETIVO: Mostrar eventos como un feed de red social.
 * DISEÑO: Visual, limpio, priorizando fotos y texto legible.
 */

interface BitacoraFeedCardProps {
    event: BackendEvent;
    onClick?: () => void;
}

const EVENT_CONFIG: Record<string, { icon: any, color: string, label: string }> = {
    'WATERING': { icon: Droplets, color: 'text-blue-500', label: 'Riego' },
    'NUTRIENT': { icon: Leaf, color: 'text-green-500', label: 'Nutrientes' },
    'PRUNING': { icon: Scissors, color: 'text-orange-500', label: 'Poda' },
    'NOTE': { icon: StickyNote, color: 'text-yellow-500', label: 'Nota' },
    'PHOTO': { icon: ImageIcon, color: 'text-purple-500', label: 'Foto' },
    'STAGE_CHANGE': { icon: Sparkles, color: 'text-pink-500', label: 'Cambio Etapa' },
};

export const BitacoraFeedCard = ({ event, onClick }: BitacoraFeedCardProps) => {
    const config = EVENT_CONFIG[event.eventType] || { icon: Calendar, color: 'text-gray-500', label: event.eventType };
    const Icon = config.icon;
    const dateObj = new Date(event.fecha);
    const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true, locale: es });

    // Extraer imagen si existe en mediaUrls (asumiendo array de strings)
    const possibleImage = event.mediaUrls && event.mediaUrls.length > 0 ? event.mediaUrls[0] : null;

    return (
        <Card
            className="mb-4 overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] transition-transform"
            onClick={onClick}
        >
            <CardHeader className="p-3 pb-0 flex flex-row justify-between items-start space-y-0">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full bg-secondary/50 ${config.color}`}>
                        <Icon size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm leading-none">{config.label}</h4>
                        <p className="text-xs text-muted-foreground capitalize">{timeAgo}</p>
                    </div>
                </div>
                {/* Badge de Plantas Afectadas si son pocas, o contador si son muchas */}
                {event.plantaIds && event.plantaIds.length > 0 && (
                    <Badge variant="outline" className="text-[10px] h-5">
                        {event.plantaIds.length === 1 ? '1 Planta' : `${event.plantaIds.length} Plantas`}
                    </Badge>
                )}
            </CardHeader>

            <CardContent className="p-3 pt-2">
                {/* Contenido de Texto */}
                {(event.observacion || event.text || event.description) && (
                    <p className="text-sm text-foreground/90 mb-2 line-clamp-3">
                        {event.text || event.observacion || event.description}
                    </p>
                )}

                {/* Detalles Específicos (Riego/Nutrientes) */}
                {(event.phAgua || event.ecAgua) && (
                    <div className="flex gap-2 mb-2">
                        {event.phAgua && <Badge variant="secondary" className="text-xs">pH: {event.phAgua}</Badge>}
                        {event.ecAgua && <Badge variant="secondary" className="text-xs">EC: {event.ecAgua}</Badge>}
                    </div>
                )}
                {event.nuevaEtapa && (
                    <div className="flex gap-2 mb-2">
                        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
                            ➡️ {event.nuevaEtapa}
                        </Badge>
                    </div>
                )}


                {/* Imagen Destacada (Si existe) */}
                {possibleImage && (
                    <div className="rounded-md overflow-hidden mt-2 border border-border/50 aspect-video bg-muted relative">
                        <img
                            src={possibleImage}
                            alt="Evento"
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                            loading="lazy"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
