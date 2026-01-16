import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/Components/ProtectedRoute";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import PlantDetailPage from "./Pages/PlantDetailPage";
import EditPlantPage from "./Pages/EditPlantPage";
import SalaDetailPage from "./Pages/SalaDetailPage";
import MainLogPage from "./Pages/MainLogPage";
import PanelControl from "./Pages/PanelControl";
import ProfilePage from "./Pages/ProfilePage";
import FavoritosPage from "./Pages/FavoritosPage";
import PlantasPage from "./Pages/PlantasPage";
import NotFound from "./Pages/NotFound";
import { DirectAccessMenu } from "@/Components/DirectAccessMenu";

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
