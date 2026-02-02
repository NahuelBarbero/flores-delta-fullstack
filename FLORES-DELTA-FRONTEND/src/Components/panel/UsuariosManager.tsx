
import { useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import { useAuth } from "@/Context/AuthContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Loader2, Users, Shield, Edit, Trash2, Plus } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { ManageUserDialog } from "@/Components/admin/ManageUserDialog";
import { toast } from "sonner";
import { UserDto } from '@/interfaces/Planta';

export const UsuariosManager = () => {
    const { user: currentUser } = useAuth();
    const queryClient = useQueryClient();
    const isSuperAdmin = currentUser?.role === 'ROLE_SUPER_ADMIN';

    // Estado para el modal
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

    const { data: users = [], isLoading, isError } = useQuery<UserDto[]>({
        queryKey: ['users_list'],
        queryFn: apiService.getUsers,
        retry: 1
    });

    const handleCreate = () => {
        setSelectedUser(null);
        setDialogOpen(true);
    };

    const handleEditRole = (user: UserDto) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿ESTÁS SEGURO? Esta acción es irreversible y eliminará todos los datos del usuario.")) return;

        try {
            await apiService.deleteUser(id);
            toast.success("Usuario eliminado");
            queryClient.invalidateQueries({ queryKey: ['users_list'] });
        } catch (error) {
            toast.error("Error al eliminar usuario");
        }
    };

    if (isLoading) return <div className="text-center py-4"><Loader2 className="animate-spin inline mr-2" /> Cargando usuarios...</div>;

    if (isError) return (
        <div className="text-center py-8 text-destructive">
            <Shield className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No tienes permisos para ver el listado de usuarios.</p>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium flex items-center gap-2">
                    <Users className="w-5 h-5" /> Gestión de Usuarios
                </h3>
                {isSuperAdmin && (
                    <Button onClick={handleCreate} size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Nuevo Usuario
                    </Button>
                )}
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Usuario</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead className="text-right">ID</TableHead>
                            {isSuperAdmin && <TableHead className="text-right">Acciones</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={isSuperAdmin ? 5 : 4} className="text-center py-8 text-muted-foreground">
                                    No hay usuarios encontrados.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <Users className="w-4 h-4 text-blue-500" />
                                        {user.nombre || 'Sin Nombre'} {user.apellido}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'ROLE_SUPER_ADMIN' ? 'destructive' : user.role === 'ROLE_ADMIN' ? 'default' : 'secondary'}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{user.id}</TableCell>

                                    {isSuperAdmin && (
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEditRole(user)}
                                                title="Gestionar Rol"
                                            >
                                                <Edit className="w-4 h-4 text-orange-500" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(user.id)}
                                                disabled={user.id === currentUser?.id}
                                                title="Eliminar Usuario"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <ManageUserDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                userToEdit={selectedUser}
                onSuccess={() => queryClient.invalidateQueries({ queryKey: ['users_list'] })}
            />
        </div>
    );
};
