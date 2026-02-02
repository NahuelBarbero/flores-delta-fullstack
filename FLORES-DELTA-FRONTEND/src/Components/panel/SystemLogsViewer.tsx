import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Loader2, RefreshCw, Terminal } from "lucide-react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Badge } from "@/Components/ui/badge";

export const SystemLogsViewer = () => {
    const { data: logs = [], isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ['systemLogs'],
        queryFn: () => apiService.getSystemLogs(200), // Default to last 200 lines
        refetchInterval: 10000, // Auto-refresh every 10s
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Logs del Sistema</h3>
                    <Badge variant="outline" className="ml-2 bg-black text-green-500 border-green-900 font-mono">
                        tail -n 200
                    </Badge>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refetch()}
                    disabled={isLoading || isRefetching}
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                    Actualizar
                </Button>
            </div>

            <Card className="bg-zinc-950 border-zinc-800 shadow-xl">
                <CardHeader className="py-3 border-b border-zinc-800 bg-zinc-900/50">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <CardDescription className="text-xs font-mono text-zinc-500">app.log</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[500px] w-full p-4 font-mono text-xs">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full text-zinc-500">
                                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                Conectando al servidor de logs...
                            </div>
                        ) : isError ? (
                            <div className="text-red-400 p-4">
                                Error al conectar con el servicio de logs. Verifica tus permisos o la conexión al backend.
                            </div>
                        ) : (
                            <div className="flex flex-col gap-0.5">
                                {logs.length === 0 ? (
                                    <span className="text-zinc-600 italic">// El archivo de logs está vacío</span>
                                ) : (
                                    logs.map((line, i) => {
                                        // Simple syntax highlighting
                                        let colorClass = "text-zinc-300";
                                        if (line.includes("ERROR")) colorClass = "text-red-400 font-bold";
                                        else if (line.includes("WARN")) colorClass = "text-yellow-400";
                                        else if (line.includes("INFO")) colorClass = "text-blue-300";
                                        else if (line.includes("DEBUG")) colorClass = "text-zinc-500";

                                        return (
                                            <div key={i} className={`break-words whitespace-pre-wrap ${colorClass} hover:bg-zinc-900/50 px-1 rounded`}>
                                                <span className="select-none text-zinc-700 mr-2 md:inline-block w-8 text-right hidden">{i + 1}</span>
                                                {line}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};
