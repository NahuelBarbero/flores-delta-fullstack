# Prompt Maestro de Diseño para Stitch IA v1.0

**Para:** Stitch IA (Asistente de Diseño y UX)
**De:** Gemini (Tech Lead) en nombre de GUS (Arquitecto)
**Proyecto:** Flores del Delta
**Objetivo:** Generar los mockups de alta fidelidad y el flujo de usuario para la aplicación, con una perspectiva de diseño a futuro y compatibilidad con Figma.

---

Hola, Stitch. Hemos recopilado toda la información necesaria para que puedas diseñar la aplicación. A continuación, te detallo los requerimientos para cada pantalla, basados en un análisis exhaustivo de la competencia y las necesidades del usuario.

**Estilo Visual General:**
Queremos una fusión de tres conceptos:
1.  **Layout y Amigabilidad de Grow with Jane:** Prioriza los espacios en blanco, un diseño limpio y una sensación accesible.
2.  **Estética "Tech" de Cannect:** Utiliza una paleta de colores profesional y tecnológica. Fondos oscuros (`#111827`), superficies de tarjeta (`#1f2937`) y un verde vibrante como acento principal (`#0fb980`).
3.  **Funcionalidad y Organización de NotebookLM:** La estructura de la aplicación, especialmente el dashboard, debe ser modular y estar orientada a la productividad, como en las aplicaciones de Google. La tipografía debe ser `Roboto` o `Google Sans` para máxima legibilidad.

---

### 1. Landing Page

-   **Propósito principal:** Comunicar nuestra propuesta de valor única: **soberanía de datos y diagnóstico por IA**. El objetivo es que el visitante entienda que esta no es solo otra app de registro, sino un asistente de cultivo inteligente. El CTA principal es "Crear Cuenta Gratis".
-   **Elementos clave:**
    -   **Hero Section:** Un titular impactante como "Tus datos, tu cultivo, tu asistente inteligente." con un subtítulo que mencione la trazabilidad y el diagnóstico.
    -   **Sección de Funciones:** Presentar las 3 funciones clave en tarjetas visuales: "Bitácora de Cultivo Horizontal", "Diagnóstico con IA (Stitch)", y "Exporta tus Datos Siempre".
    -   **Sección de Confianza:** Un apartado dedicado a la privacidad y la seguridad, explicando que los datos del usuario le pertenecen.
    -   **CTA Final:** Un bloque final que invite a registrarse o a ingresar.
-   **Estilo visual:** Utiliza el código de `04_LANDING_PAGE_V2_REFERENCE.md` como base estructural, pero aplica la paleta de colores "tech" oscura y la tipografía profesional que hemos definido.

---

### 2. Página de Login/Registro

-   **Campos necesarios:** Email y contraseña para el registro y el login.
-   **Funcionalidades extra:**
    -   Un botón prominente para **"Ingresar con Google" (SSO)**. Esto es clave para reducir la fricción.
    -   Un enlace para "¿Olvidaste tu contraseña?".
-   **Estilo visual:** Minimalista, seguro y consistente con la estética "tech" de la landing page. Debe transmitir profesionalismo y seguridad.

---

### 3. Menú de Herramientas de Acceso Directo

-   **Ubicación:**
    -   **Móvil:** Un "Floating Action Button" (FAB) con el icono `+` en la esquina inferior derecha. Al tocarlo, se abre un modal con las 6 acciones.
    -   **Escritorio:** Puede ser un botón "Añadir Evento" destacado en la barra de navegación superior o en el encabezado del dashboard.
-   **Contenido:** Los 6 botones de acción que ya hemos definido: "Nueva Planta", "Registrar Riego", "Registrar Poda", "Tomar Foto/Video", "Añadir Nota", "Cambio de Etapa". Cada uno con su icono correspondiente.

---

### 4. Dashboard (Panel de Control) y Vista de Detalle

Este es el corazón de la app y debe reflejar la organización de NotebookLM.

-   **Información clave:** El estado actual de las plantas activas y su historial. La vista principal no es una lista de plantas, sino la **bitácora detallada de la última planta visitada**.
-   **Componentes y Layout:**
    -   **Estructura de Paneles (estilo NotebookLM):**
        -   **Panel Izquierdo (Sidebar):** La navegación principal de la app (Dashboard, Mis Plantas, Espacios, Genéticas, Configuración, etc.), colapsable en escritorio.
        -   **Panel Central (Área de Trabajo Principal):** Aquí se renderiza la **"Vista Detallada de la Bitácora de Planta"**.
        -   **Panel Derecho (Opcional/Futuro):** Un espacio para que "Stitch IA" muestre sus diagnósticos y recomendaciones. Por ahora, puede ser un panel de "Notas Rápidas" o "Resumen de la Planta".
    -   **Vista Detallada de la Bitácora de Planta (Panel Central):**
        -   **Encabezado:** Con los datos clave de la planta (ID, Genética, Etapa).
        -   **Línea de Tiempo Horizontal:** El componente visual más importante. Debe ser una línea de tiempo horizontal que represente las semanas/días del cultivo. Cada evento (riego, foto, etc.) es un punto interactivo en la línea. Al hacer clic en un evento, sus detalles se muestran en un panel inferior. Debe tener un botón `+` para añadir nuevos eventos.
        -   **Panel de Detalles del Evento:** Debajo de la línea de tiempo, un área donde se muestra la información completa del evento seleccionado (la foto, el texto de la nota, los valores de pH/EC del riego, etc.).

---

### Visión a Futuro (para la perspectiva que quieres en Figma)

-   **Dashboard con IA:** Diseña una versión del dashboard donde el panel derecho esté activo, con "Stitch IA" mostrando una tarjeta de diagnóstico: "Hemos detectado un posible exceso de nutrientes en PLT-002. Haz clic aquí para ver el análisis completo."
-   **Integración de Hardware:** Imagina cómo se vería un evento en la línea de tiempo que no fue añadido manualmente, sino automáticamente por un sensor de clima (ej. un icono de termómetro con el texto "Sensor: 24°C").
-   **Modo Offline:** Muestra un pequeño indicador en la UI (ej. un icono de "nube tachada") que le haga saber al usuario que está en modo offline y que sus datos se sincronizarán más tarde.

Con esta guía, deberías poder generar un conjunto completo de mockups que no solo reflejen el estado actual del desarrollo, sino también la visión a futuro del producto.

---
### 5. Contexto de Implementación Frontend Actual (para Referencia de Estructura y Estilo)

Para asegurar que los diseños reflejen la base actual de la aplicación web, considera la siguiente información extraída directamente del código fuente:

**5.1. Estructura General de la Aplicación:**
*   **Tipo:** Single Page Application (SPA) basada en React.
*   **Rutas Principales:** `/`, `/login`, `/dashboard`, `/plant/:id`, `/bitacora-maestra`.
*   **Autenticación:** Las rutas clave (`/dashboard`, `/plant/:id`, `/bitacora-maestra`) están protegidas y requieren autenticación.
*   **Contenedor Raíz:** Todo el contenido se renderiza dentro de `<div id="root"></div>` en `index.html`.

**5.2. Framework de Estilos y Diseño:**
*   **Framework:** Tailwind CSS.
*   **Modo Oscuro:** Implementado con `darkMode: ["class"]`.
*   **Tipografía Principal:** `Roboto` (cargada desde Google Fonts) para todo el texto.
*   **Paleta de Colores (Definición Semántica con CSS Variables):**
    *   Los colores se definen mediante HSL y CSS variables (ej. `--primary`, `--background`). Stitch debe inferir que estos son los puntos de acceso para la tematización.
    *   Se definen paletas para `primary`, `secondary`, `destructive`, `muted`, `accent`, `popover`, `card`.
    *   **Colores específicos para Sidebar:** `sidebar.DEFAULT`, `sidebar.foreground`, `sidebar.primary`, `sidebar.accent`, etc., lo que sugiere una estructura de sidebar prominente.
*   **Border Radius:** Definidos con variables CSS (`var(--radius)`).
*   **Animaciones:** Existen animaciones `accordion-down` y `accordion-up`.

**5.3. Componentes UI Existentes (Contexto de Uso):**
*   La aplicación ya utiliza una librería de componentes basada en `shadcn/ui` o similar (inferido por `components/ui/toaster`, `tooltip`). Stitch debe considerar esto para generar componentes coherentes.

---
