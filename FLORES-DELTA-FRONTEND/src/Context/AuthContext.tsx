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
    const [loadingUser, setLoadingUser] = useState(false); // Match variable name from mold

    // --- Fetch User (Matches Mold Signature) ---
    const fetchUser = async () => {
        setLoadingUser(true);
        try {
            // Adaptation: We check if we have a token first to avoid useless 401s
            if (!authService.getToken()) {
                throw new Error("No token found");
            }
            // In a real adaptation, this endpoint should return the user profile. 
            // For now, we simulate it or call an existing profile endpoint if available.
            // If backend doesn't have 'usuarios/me', we use stored user for now to not break app.
            const response = await api.get('/api/users/me');
            dispatch({ type: 'LOGIN', payload: response.data });

        } catch (error) {
            console.error('Error al obtener el usuario autenticado:', error);
            // If fetch fails (token expired), we logout
            logoutLocal();
        } finally {
            setLoadingUser(false);
        }
    };

    // --- Login (Matches Mold Signature) ---
    const login = async (credentials: any) => {
        setLoadingUser(true);
        try {
            // We use the new API instance
            // Map email to username for Spring Security default expectation
            const payload = { username: credentials.email, password: credentials.password };
            const response = await api.post('/login', payload);

            // ADAPT TO BACKEND: Backend returns {username, roles}
            // Token comes in HttpOnly cookie, not in body
            const { username, roles } = response.data;

            // Extract role from roles array (first authority)
            const role = roles && roles.length > 0 ? roles[0].authority : 'ROLE_GROWER';

            // Since token comes in cookie and backend doesn't send ID in login response,
            // we fetch user details or use username as identifier
            const user = {
                email: username,  // username IS the email
                role: role,
                id: null  // Will be populated when we fetch user profile if needed
            };

            // Token will be automatically sent via cookie in subsequent requests
            // Mark session as active without storing token (it's in HttpOnly cookie)
            authService.setToken('session-active'); // Just a flag, not the actual JWT

            dispatch({ type: 'LOGIN', payload: user });

            // Notify other tabs about login
            authChannel?.postMessage({ type: 'LOGIN' });

            return response;
        } catch (error: any) {
            // Parsear error 401 para mostrar mensaje claro
            if (error.response?.status === 401) {
                throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
            }
            throw error;
        } finally {
            setLoadingUser(false);
        }
    };

    // --- Local logout (without broadcasting) ---
    const logoutLocal = useCallback(() => {
        authService.clearToken();
        sessionStorage.removeItem('floresdelta_splash_shown');
        dispatch({ type: 'LOGOUT' });
    }, []);

    // --- Logout (Matches Mold Signature) ---
    const logout = async () => {
        try {
            await api.post('/api/logout');
        } catch (error) {
            console.error('Logout server error:', error);
        } finally {
            logoutLocal();
            // Notify other tabs to logout too
            authChannel?.postMessage({ type: 'LOGOUT' });
        }
    };

    // --- Listen for auth changes from other tabs ---
    useEffect(() => {
        if (!authChannel) return;

        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'LOGOUT') {
                logoutLocal();
            } else if (event.data.type === 'LOGIN') {
                // Refresh the page to sync login state
                window.location.reload();
            }
        };

        authChannel.addEventListener('message', handleMessage);
        return () => authChannel.removeEventListener('message', handleMessage);
    }, [logoutLocal]);

    // --- Interceptor for 401 (Matches Mold Pattern) ---
    useEffect(() => {
        const resInterceptor = api.interceptors.response.use(
            (res) => res,
            (err) => {
                if (err.response?.status === 401) {
                    logout();
                }
                return Promise.reject(err);
            }
        );
        return () => {
            api.interceptors.response.eject(resInterceptor);
        };
    }, []);

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
            fetchUser,
            loadingUser,
            isAuthenticated: state.isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for using context
export const useAuthContext = () => useContext(AuthContext);

