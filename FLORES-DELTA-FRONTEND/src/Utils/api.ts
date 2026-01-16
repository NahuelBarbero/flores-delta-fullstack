import axios from 'axios';
import { authService } from '../services/authService';

// Base URL configuration
// Base URL configuration
const urlBase = import.meta.env.VITE_API_URL || 'http://localhost:8080/';

// Initial config object (similar to mold)
const config = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
};

export { urlBase, config };

// Create axios instance
const api = axios.create({
    baseURL: urlBase, // Use the variable
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// No request interceptor needed - JWT is automatically sent via HttpOnly cookie
// The backend JwtAuthorizationFilter will read it from the 'jwt' cookie

// ✅ FASE 3: Interceptor de errores Zod para feedback visual
api.interceptors.response.use(
    response => response,  // Responses exitosas pasan directo
    error => {
        // Detectar errores de validación Zod
        if (error.message?.includes("Invalid server response")) {
            // Mostrar toast al usuario (se importa dinámicamente para evitar ciclos)
            import('@/Components/ui/use-toast').then(({ toast }) => {
                toast({
                    variant: "destructive",
                    title: "Error de Validación",
                    description: "El servidor retornó datos inválidos. Verifica la consola o contacta soporte.",
                    duration: 5000,
                });
            });
        }
        return Promise.reject(error);
    }
);

export default api;
