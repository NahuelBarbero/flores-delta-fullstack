/**
 * Servicio de autenticación seguro
 * ✅ FIXED: NO almacena JWT (viaja en HttpOnly cookie)
 * Solo mantiene flag de sesión activa para UI
 */
class AuthService {
    constructor() {
        // No necesitamos recuperar nada del constructor
        // El JWT está en la cookie HttpOnly del navegador
    }

    /**
     * Marcar sesión como activa (solo flag UI)
     * ⚠️ NO almacena el JWT real - ese viaja en cookie HttpOnly
     * @param _sessionFlag - Ignorado, solo para compatibilidad con código existente
     */
    setToken(_sessionFlag?: string) {
        // ✅ FIXED: Solo flag booleano, NO el token
        sessionStorage.setItem('session_active', 'true');
    }

    /**
     * Verificar si hay sesión activa
     * ✅ FIXED: Retorna solo el flag, no el JWT
     * @returns Flag de sesión o null
     */
    getToken(): string | null {
        return sessionStorage.getItem('session_active');
    }

    /**
     * Limpiar flag de sesión e invalidar cookie JWT en servidor
     * ✅ Backend-First: Sesión se invalida en servidor primero
     */
    async clearToken() {
        // Backend usa cookies HttpOnly - no hay endpoint de logout
        // Solo limpiamos el flag de sesión local
        sessionStorage.removeItem('session_active');
    }

    /**
     * Verificar si hay sesión activa
     * @returns true si hay token válido
     */
    isSessionActive(): boolean {
        return !!this.getToken();
    }
}

export const authService = new AuthService();
