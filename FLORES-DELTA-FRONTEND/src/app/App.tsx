import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PlantDetailPage from "../pages/PlantDetailPage";
import EditPlantPage from "../pages/EditPlantPage";
import SalaDetailPage from "../pages/SalaDetailPage";
import MainLogPage from "../pages/MainLogPage";
import PanelControl from "../pages/PanelControl";
import ProfilePage from "../pages/ProfilePage";
import FavoritosPage from "../pages/FavoritosPage";
import PlantasPage from "../pages/PlantasPage";
import NotFound from "../pages/NotFound";
import { DirectAccessMenu } from "@/components/shared/DirectAccessMenu";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Global DirectAccessMenu - works on all pages */}
        <DirectAccessMenu />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plantas" element={<PlantasPage />} />
            <Route path="/plant/:id" element={<PlantDetailPage />} />
            <Route path="/plantas/:id/editar" element={<EditPlantPage />} />
            <Route path="/sala/:salaId" element={<SalaDetailPage />} />
            <Route path="/bitacora-maestra" element={<MainLogPage />} />
            <Route path="/configuracion" element={<PanelControl />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favoritos" element={<FavoritosPage />} />

            {/* Restored Routes for Sidebar Links using PanelControl tabs */}
            <Route path="/geneticas" element={<PanelControl defaultTab="geneticas" />} />
            <Route path="/riegos" element={<PanelControl defaultTab="nutrientes" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
