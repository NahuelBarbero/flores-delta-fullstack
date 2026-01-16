import { Skeleton } from "@/Components/ui/skeleton";
import { TableCell, TableRow } from "@/Components/ui/table";

/**
 * COMPONENT: EventTableSkeleton
 * PROPÓSITO: Loading state para tablas de eventos (bitácora)
 * FILOSOFÍA SOCIO: Feedback visual estructurado
 */
export const EventTableSkeleton = () => {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                </TableRow>
            ))}
        </>
    );
};
