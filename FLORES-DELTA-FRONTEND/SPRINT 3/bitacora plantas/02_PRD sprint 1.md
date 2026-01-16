### PRD para el Desarrollo de "Flores del Delta" en Lovable

**Visión del Producto:**
Crear un prototipo de frontend funcional y estéticamente pulido para una aplicación de gestión de cultivos. El objetivo es validar la UX/UI con un cliente final. La aplicación debe ser intuitiva, rápida y seguir los más altos estándares de diseño de Google (Material Design 3).

**Principios de Desarrollo (GUS + Lovable):**
1.  **Iteración Constante:** Seguiremos la regla #1 de Lovable, construyendo la aplicación paso a paso con prompts pequeños y enfocados.
2.  **Design System Primero:** Toda la estética se definirá en `tailwind.config.ts` y `index.css` antes de construir componentes (Regla #4).
3.  **Reutilización de Componentes:** Adaptaremos los componentes de Shadcn UI pre-instalados para que coincidan con nuestra visión de diseño (Regla #5).
4.  **Backend con Lovable Cloud:** La autenticación y la base de datos serán gestionadas por Lovable Cloud (Regla #6).

#### Fase 1: Definición del Design System (Misión para Agente A-001-UX)

Esta es la base de todo el proyecto.

*   **Tipografía:** `Roboto` de Google Fonts.
*   **Colores:** La paleta definida en la encuesta.
*   **Bordes:** Radio estándar de `0.75rem` (`rounded-xl`) para elementos interactivos.
*   **Estilos base:** Configurar `index.css` con las directivas de Tailwind y los estilos base para el `body`.

#### Fase 2: Construcción de Componentes Reutilizables (Misión para Agente A-004-FE)

Basado en el Design System, se deben crear o personalizar los siguientes componentes de Shadcn UI:

1.  `Button`: Con variantes `default` (acento verde) y `outline`.
2.  `Card`: El contenedor base para toda la UI.
3.  `Input` y `Label`: Para los formularios.
4.  `Sidebar`, `Header`, `KpiCard`, `PlantCard`, `EventLogItem`, `ActionsPanel`.

#### Fase 3: Ensamblaje de Vistas (Misión para Agente A-004-FE, Integrador)

1.  **Página de Login:** Ensamblar la vista de login usando los componentes base.
2.  **App Shell (Dashboard):** Crear la estructura principal de la aplicación con la barra lateral y el área de contenido.
3.  **Página del Dashboard:** Integrar los componentes `KpiCard`, `PlantCard` y `EventLogItem` para mostrar los datos simulados.
4.  **Panel de Acciones (Modal):** Implementar el modal que contiene las herramientas de acción rápida.
