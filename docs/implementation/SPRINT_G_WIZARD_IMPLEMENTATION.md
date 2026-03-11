# Implementación Sprint G: Wizard de Creación de Plantas

**Fecha:** 12 de Febrero de 2026
**Autor:** Antigravity (Inguriero Frontend)
**Estado:** Verificado & Integrado

## Resumen de Cambios
Se ha implementado el **WizardPlanta**, un componente clave para la mejora de la experiencia de usuario (UX) solicitada. Este componente reemplazará la complejidad del formulario tradicional con un proceso guiado paso a paso, visual y amigable.

### Componentes Creados/Modificados

1.  **`src/Components/wizard/WizardPlanta.tsx` (NUEVO)**
    *   **Arquitectura:** Stepper de 3 fases (Genética -> Sala -> Detalles).
    *   **Estado:** Usa `useState` local para el form data y `react-query` para fetching de datos.
    *   **Vibe Coding:**
        *   Uso de `framer-motion` (simulado con clases `animate-in`) para transiciones suaves.
        *   Grid visual con selección de tarjetas (Cards) con bordes activos.
        *   Feedback inmediato (Toast) y manejo de errores.
    *   **Integración:** Conectado directamente a `apiService.createPlanta`.

2.  **`src/Pages/PlantasPage.tsx` (MODIFICADO)**
    *   **Acceso Desktop:** Se añadió el botón "Nueva Planta (Wizard)" en el header, visible en pantallas grandes.
    *   **Coexistencia:** Se mantiene el acceso al formulario "Clásico" mediante botón secundario, permitiendo flexibilidad al usuario avanzado.
    *   **Modal Management:** Estado `creationMode` gestiona la apertura de Wizard vs. Clásico.

## Verificación de Requerimientos

| Requerimiento Usuario | Implementación | Estado |
| :--- | :--- | :--- |
| "UX Intuitivo tipo Grow With Jane" | Wizard paso a paso con iconos y tarjetas grandes. | ✅ CUMPLIDO |
| "Botón agregar siempre visible en Desktop" | Botón añadido en el Header de `PlantasPage`. | ✅ CUMPLIDO |
| "Selección visual de fotos" | El Wizard muestra fotos de cepas si existen (`cepa.imagen`). | ✅ CUMPLIDO |
| "Estética linda y cognitiva" | Diseño limpio, barra de progreso, iconos `lucide-react`. | ✅ CUMPLIDO |

## Próximos Pasos (Sprint G - Fase 2)
1.  **Bitácora Feed:** Transformar la tabla de eventos en un feed vertical.
2.  **Filtros por Botón:** Reemplazar dropdowns con Toggle Groups.
