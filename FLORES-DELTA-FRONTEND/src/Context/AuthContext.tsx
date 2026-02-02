import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import api from '../Utils/api';
import { authService } from '../services/authService';

// BroadcastChannel for multi-tab session sync
const authChannel = typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel('flores_delta_auth')
    : null;

// Define initial state
const initialState = {
    user: null,
    isAuthenticated: authService.isSessionActive(),
};

// Define reducer (Aligned with simpler mold structure where possible)
const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

// Create Context
const AuthContext = createContext<any>(null);

// Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [loadingUser, setLoadingUser] = useState(false);

    // --- Login (Persistencia Local) ---
    const login = async (credentials: any) => {
        setLoadingUser(true);
        try {
            const payload = { username: credentials.email, password: credentials.password };
            const response = await api.post('/login', payload);

            const { username, roles } = response.data;
            const role = roles && roles.length > 0 ? roles[0].authority : 'ROLE_GROWER';

            const user = {
                email: username,
                role: role,
                id: null
            };

            // PERSISTENCIA: Guardar usuario en localStorage
            localStorage.setItem('flores_delta_user', JSON.stringify(user));
            authService.setToken('session-active');

            dispatch({ type: 'LOGIN', payload: user });

            authChannel?.postMessage({ type: 'LOGIN' });

            return response;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
            }
            throw error;
        } finally {
            setLoadingUser(false);
        }
    };

    // --- Logout ---
    const logoutLocal = useCallback(() => {
        authService.clearToken();
        localStorage.removeItem('flores_delta_user'); // Limpiar usuario
        sessionStorage.removeItem('floresdelta_splash_shown');
        dispatch({ type: 'LOGOUT' });
    }, []);

    const logout = async () => {
        try {
            await api.post('/api/logout');
        } catch (error) {
            console.error('Logout server error:', error);
        } finally {
            logoutLocal();
            authChannel?.postMessage({ type: 'LOGOUT' });
        }
    };

    // --- Listen for auth changes ---
    useEffect(() => {
        if (!authChannel) return;
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'LOGOUT') {
                logoutLocal();
            } else if (event.data.type === 'LOGIN') {
                // Recargar para leer localStorage actualizado
                window.location.reload();
            }
        };
        authChannel.addEventListener('message', handleMessage);
        return () => authChannel.removeEventListener('message', handleMessage);
    }, [logoutLocal]);

    // --- Inicialización (Hidratación) ---
    useEffect(() => {
        // Al iniciar, intentar recuperar usuario del storage
        const storedUser = localStorage.getItem('flores_delta_user');
        if (storedUser && authService.isSessionActive()) {
            try {
                const user = JSON.parse(storedUser);
                dispatch({ type: 'LOGIN', payload: user });
            } catch (e) {
                console.error("Error parsing stored user", e);
                logoutLocal();
            }
        }
        setLoadingUser(false);
    }, []);

    // --- Interceptor for 401 (Safe Local Logout) ---
    useEffect(() => {
        const resInterceptor = api.interceptors.response.use(
            (res) => res,
            (err) => {
                if (err.response?.status === 401) {
                    // CRITICAL FIX: Use logoutLocal to avoid infinite loops 
                    // (logout() tries to call backend, which might 401 again)
                    logoutLocal();
                }
                return Promise.reject(err);
            }
        );
        return () => {
            api.interceptors.response.eject(resInterceptor);
        };
    }, [logoutLocal]);

    // Initial check (equivalent to useEffect in mold)
    useEffect(() => {
        if (state.isAuthenticated) {
            // Optionally verify token validity here or just rely on interceptor
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            dispatch,
            login,
            logout,
            loadingUser,
            isAuthenticated: state.isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for using context
export const useAuthContext = () => useContext(AuthContext);
export const useAuth = useAuthContext; // Alias for compatibility

