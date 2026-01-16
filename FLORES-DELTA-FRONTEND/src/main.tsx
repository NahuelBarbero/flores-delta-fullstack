import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
// Providers in requested order
import { ThemeProvider } from "./Context/ThemeContext.tsx";
import { SnackbarProvider } from "./Context/SnackbarContext.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { ProductProvider } from "./Context/ProductContext.jsx"; // Keeping jsx for now if not refactored
import { Toaster } from "sonner"; // Visual toast component

createRoot(document.getElementById("root")!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SnackbarProvider>
            <AuthProvider>
                <ProductProvider>
                    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                        <Toaster /> {/* Toaster is part of the visual layer, usually inside Theme/Snack */}
                        <App />
                    </BrowserRouter>
                </ProductProvider>
            </AuthProvider>
        </SnackbarProvider>
    </ThemeProvider>
);
