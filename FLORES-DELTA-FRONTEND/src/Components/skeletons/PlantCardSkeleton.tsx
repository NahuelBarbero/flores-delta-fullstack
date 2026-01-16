import { Card } from "@/Components/ui/card";
import { Skeleton } from "@/Components/ui/skeleton";

/**
 * COMPONENT: PlantCardSkeleton
 * PROPÓSITO: Loading state para plant cards en dashboard
 * FILOSOFÍA SOCIO: Feedback visual estructurado
 */
export const PlantCardSkeleton = () => {
    return (
        <Card className="p-4">
            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-5 rounded" />
                </div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                </div>
            </div>
        </Card>
    );
};
