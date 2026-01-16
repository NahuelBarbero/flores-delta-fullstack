import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";

export const TestDialog = () => {
    const [open, setOpen] = useState(false);

    console.log("🧪 TestDialog render - open:", open);

    return (
        <div className="p-4">
            <h2>Test Dialog Component</h2>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => {
                        console.log("🔵 Botón clickeado");
                        setOpen(true);
                    }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Test Button
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Test Dialog</DialogTitle>
                        <DialogDescription>
                            Diálogo de prueba para verificar funcionalidad
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-4">
                        <p>Si ves esto, el Dialog funciona</p>
                        <Button onClick={() => setOpen(false)}>Cerrar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
