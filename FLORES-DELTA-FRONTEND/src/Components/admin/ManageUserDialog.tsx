
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog, DialogContent, DailogHeader, DialogTitle,
    DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiService } from '@/services/api';
import { toast } from 'sonner';
import { UserDto } from '@/interfaces/Planta';
import { Loader2 } from 'lucide-react';

// Esquema para crear usuario
const createUserSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    role: z.enum(["ROLE_GROWER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN"])
});

type CreateUserForm = z.infer<typeof createUserSchema>;

interface ManageUserDialogProps {
    userToEdit: UserDto | null; // Si es null, estamos en modo CREAR
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function ManageUserDialog({ userToEdit, open, onOpenChange, onSuccess }: ManageUserDialogProps) {
    const [loading, setLoading] = useState(false);

    // -- Form Crear Usuario --
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateUserForm>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            role: "ROLE_GROWER"
        }
    });

    // -- Estado Editar Rol --
    const [selectedRole, setSelectedRole] = useState<string>(userToEdit?.role || "ROLE_GROWER");

    // Reset when dialog opens/closes
    React.useEffect(() => {
        if (!open) {
            reset();
            setLoading(false);
        } else if (userToEdit) {
            setSelectedRole(userToEdit.role);
        }
    }, [open, userToEdit, reset]);

    const handleCreateUser = async (data: CreateUserForm) => {
        setLoading(true);
        try {
            // 1. Crear usuario (por defecto nace como GROWER en backend socio, o según lógica de registro)
            const newUser = await apiService.registerUser(data.email, data.password);

            // 2. Si se eligió un rol distinto a GROWER, actualizarlo inmediatamente
            if (data.role !== 'ROLE_GROWER' && newUser.id) {
                await apiService.updateUserRole(newUser.id, data.role);
                toast.info(`Usuario creado y elevado a ${data.role}`);
            } else {
                toast.success("Usuario creado correctamente");
            }

            onSuccess();
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error.message || "Error al crear usuario");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRole = async () => {
        if (!userToEdit) return;
        setLoading(true);
        try {
            await apiService.updateUserRole(userToEdit.id, selectedRole);
            toast.success("Rol actualizado correctamente");
            onSuccess();
            onOpenChange(false);
        } catch (error: any) {
            toast.error("Error al actualizar rol");
        } finally {
            setLoading(false);
        }
    };

    const isEditing = !!userToEdit;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? `Gestionar: ${userToEdit.email}` : "Crear Nuevo Usuario"}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Modifica el nivel de acceso de este usuario."
                            : "Registra un nuevo usuario y asígnale un rol inicial."}
                    </DialogDescription>
                </DialogHeader>

                {isEditing ? (
                    // --- MODO EDICIÓN ---
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Rol Actual</Label>
                            <div className="col-span-3 font-mono text-sm">{userToEdit.role}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Nuevo Rol</Label>
                            <Select value={selectedRole} onValueChange={setSelectedRole}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Seleccionar rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ROLE_GROWER">Grower (Básico)</SelectItem>
                                    <SelectItem value="ROLE_ADMIN">Admin (Gestión)</SelectItem>
                                    <SelectItem value="ROLE_SUPER_ADMIN">Super Admin (Total)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                            <Button onClick={handleUpdateRole} disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Guardar Cambios
                            </Button>
                        </DialogFooter>
                    </div>
                ) : (
                    // --- MODO CREACIÓN ---
                    <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" {...register("email")} placeholder="usuario@delta.com" />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label>Rol Inicial</Label>
                            <Select onValueChange={(val) => setValue("role", val as any)} defaultValue="ROLE_GROWER">
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ROLE_GROWER">Grower (Básico)</SelectItem>
                                    <SelectItem value="ROLE_ADMIN">Admin (Gestión)</SelectItem>
                                    <SelectItem value="ROLE_SUPER_ADMIN">Super Admin (Total)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Crear Usuario
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
