# Plan Maestro Sprint G: Experiencia de Usuario & Consolidación BI (GUS)

**Fecha de Inicio:** 12 Feb 2026
**Objetivo:** Transformar la aplicación de una herramienta funcional (Utility) a una experiencia placentera y profesional (Growth & Vibe).

## Filosofía GUS en Sprint G
*   **Growth (Crecimiento):** Datos de BI útiles y accesibles. Si un dato no ayuda a tomar decisiones, se elimina.
*   **Utility (Utilidad):** Navegación fluida en Mobile y Desktop. Filtros que funcionan al instante.
*   **Structure (Estructura):** Componentes limpios (Wizard, Feed) que encapsulan complejidad.

---

## Backlog Priorizado (Roadmap de Ejecución)

### 1. UX Desktop: Experiencia "Grow With Jane" (Wizard)
*   **Problema:** El formulario actual es largo y poco "sexy". Falta botón de acceso rápido en Desktop.
*   **Solución:** Crear `WizardPlanta.tsx`.
    *   **Paso 1 (Genética):** Grid visual de cepas disponibles (con fotos).
    *   **Paso 2 (Ubicación):** Selección de Sala (con indicador de ocupación).
    *   **Paso 3 (Configuración):** Maceta, Sustrato, Fecha de Inicio.
    *   **Acceso:** Botón FAB o "Nueva Planta" prominente en Header de `PlantasPage`.

### 2. UI Mobile: Bitácora "Feed de Cultivo"
*   **Problema:** Tabla de datos aplastada en mobile. Díficil de leer.
*   **Solución:** Transformar `BitacoraPage` en un Timeline Feed.
    *   **Diseño:** Tarjetas estilo Instagram. Foto grande (si hay) + Icono de evento + Texto corto.
    *   **Filtros:** Reemplazar dropdowns por **Botones de Icono** (Riego, Poda, Foto) tipo "Toggle Group" horizontal scrolleable.

### 3. BI & Visualización de Datos
*   **Problema:** KPIs invaden pantalla en mobile. Datos de "Producción Proyectada" dudosos.
*   **Solución:**
    *   **Mobile Sparklines:** Componente de métricas compacto (slider horizontal) para mobile.
    *   **Auditoría Backend:** Revisar servicio de cálculo de producción. Si no es confiable, se oculta hasta tener datos reales.

### 4. Navegación & Estructura
*   **Mobile Nav:** Cambiar icono "Perfil" por "Panel de Control" (Settings/Admin). Mover Perfil dentro de ese panel.
*   **Tablas:** Mejorar visibilidad de la Tabla de Salas (oculta o poco clara actualmente).

### 5. Filtros Avanzados (Utility Core)
*   **Date Filter:** Reparar lógica de rango de fechas (actualmente roto).
*   **Favoritas:** Implementar toggle "Corazón" en PlantCard y filtro correspondiente.
*   **Salas:** Arreglar filtro de Sala en `PlantasPage` y `BitacoraPage`.

---

## Estrategia Técnica (GUS Structure)

### Nuevos Componentes (UI Kit)
1.  `WizardStep`: Contenedor para pasos del formulario.
2.  `EventFeedCard`: Tarjeta optimizada para bitácora.
3.  `SparklineKpi`: KPI minimalista para mobile.
4.  `FilterToggleGroup`: Grupo de botones de filtro con iconos.

### Backend Requirements
*   Auditoría de endpoints de estadísticas (`/stats`).
*   Verificar si `favorito` es un campo persistido en `Planta` o necesita migración DB.

## Prompt de Activación (Para Agente de Ejecución)
El siguiente prompt está diseñado para que cualquier ingeniero IA pueda ejecutar la primera fase del plan sin dudas:

```text
@Antigravity Inicia la Fase 1 del Sprint G.
Objetivo: "Wizard de Creación de Plantas y Acceso Desktop".
1. Crea el componente `WizardPlanta.tsx` en `src/Components/wizard/`.
2. Implementa la máquina de estados simple (paso 1 -> paso 2 -> submit).
3. Añade el botón "Nueva Planta" en el Header de `PlantasPage.tsx` (visible solo en Desktop).
Estilo: Visual, limpio, usando las fotos de las genéticas.
```
