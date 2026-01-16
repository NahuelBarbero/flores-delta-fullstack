# Resultados de la Investigación Estratégica - Sprint 3 (v1.0)
### Proyecto: Flores Delta

---

## 1. Tareas Pendientes y En Progreso (Consolidado)

Esta sección consolida las tareas identificadas en varios documentos, marcando su estado y relevancia actual para el nuevo Sprint 3.

### 1.1. Pendientes de Ejecución Inmediata (Cubiertas por Sprint 3)

*   **Entorno Java (PRO):** Instalar JDK 21 y configurar `JAVA_HOME`.
*   **Backend (PRO):** Iniciar y verificar el servidor Spring Boot.
*   **API (FLASH/PRO):** Acceder y documentar la Swagger UI para endpoints y DTOs.
*   **Autenticación y API Frontend (FLASH/PRO):** Diseñar e implementar servicio de autenticación y API base.
*   **Conexión Plantas (PRO):** Conectar listado y formulario de creación de plantas a la API.
*   **Misión Stitch (PRO):** Ejecutar prompts con Stitch IA para mockups Figma.
*   **Resultados Stitch (FLASH/PRO):** Recopilar y analizar los entregables de Stitch.
*   **Git (PRO):** Realizar el commit inicial del monorepo.
*   **Frontend Misión Landing Page Profesional (PRO):** Implementar la Landing Page utilizando `04_LANDING_PAGE_V2_REFERENCE.md`.
*   **Frontend Misión UX Bitácora de Planta (PRO):** Implementar la página `PlantDetailPage` utilizando `reference_plant_detail_page.jsx` (inicialmente con datos mock).

### 1.2. Pendientes para Futuros Sprints (Backlog)

*   **Autenticación Avanzada:** Añadir campo "Nombre" al registro, flujo de "Recuperar Contraseña", link "Crea tu cuenta" en Header.
*   **Planificador de Tareas:** Completar formularios (Poda, Nota, Foto, etc.), implementar lógica de guardado.
*   **Bitácora Detallada:** Carga de datos dinámicos para `PlantDetailPage`, implementar filtro por semana (`MainLogPage`), planificar/implementar exportación (Excel/PDF).
*   **Análisis Estratégico Futuro:** Evaluación de Códigos QR, pulir mejoras, análisis de PRDs de competencia y flujo de datos, integrar nueva investigación, implementar KPIs.
*   **Integración de otras Entidades:** Gestión de Usuario, Sala, Cepa, y eventos específicos.

---

## 2. Decisiones de Diseño y Arquitectura (Confirmadas/Propuestas)

*   **Monorepo:** Estructura actual con Frontend (Vite, TS, React) y Backend (Java 21, Spring Boot, Maven) en un mismo repositorio.
*   **Tecnologías Frontend:** Vite, TypeScript, React, shadcn-ui, Tailwind CSS.
*   **Tecnologías Backend:** Java 21, Spring Boot 3.5.6, PostgreSQL, Spring Data JPA, Spring Security (JWT), Minio/GCS para almacenamiento de archivos.
*   **Documentación API:** Se usará Springdoc-OpenAPI (Swagger UI) para documentar el backend.
*   **Estructura de Datos:** Basada en el ERD proporcionado (con entidades como `User`, `Planta`, `Sala`, `Cepa`, `PlantEvent` y sus especializaciones). El ERD de Supabase `migrations` complementa esto con RLS.
*   **UX/UI Bitácora:** Adopción de la "Visión B" (Lista Vertical Semanal) para `PlantDetailPage`.
*   **Flujo de IA:** Planificación y ejecución de tareas con "Gemini Flash" (planificación) y "Gemini Pro" (ejecución).
*   **Base de Código para Landing Page:** `04_LANDING_PAGE_V2_REFERENCE.md`.
*   **Base de Código para `PlantDetailPage`:** `reference_plant_detail_page.jsx`.
*   **Design System:** Uso de Tailwind CSS. Colores específicos para Cannect (`#111827`, `#1f2937`, `#0fb980`). Tipografía `Roboto`/`Google Sans`.
*   **Integración Supabase:** El SQL de migración indica el uso de Supabase con funciones RLS (Row Level Security), lo que refuerza la seguridad a nivel de datos y multi-tenancy.

---

## 3. Puntos de Dolor y Desafíos (Históricos y Potenciales)

*   **[CRÍTICO] Falta de Herramientas de Diagnóstico (UX):** Usuarios dependen de foros; alta demanda de IA prescriptiva (subida de fotos/videos para autodiagnóstico).
*   **[CRÍTICO] Imposibilidad de Exportar Datos (Confianza/Operacional):** Miedo a "vendor lock-in" y pérdida de un activo intelectual valioso. **Flores Delta debe ofrecer exportación.**
*   **[ALTO RIESGO] Preocupaciones de Privacidad y Seguridad:** Necesidad de anonimato y control de datos. La privacidad debe ser un pilar de diseño y comunicación.
*   **Fricción Operacional:**
    *   **Necesidad de Modo Offline:** Áreas de cultivo sin conectividad; registro manual impreciso.
    *   **Deseo de Integración de Hardware Abierto:** Automatización de entrada de datos (ej. Arduino/Raspberry Pi) para evitar entrada manual.
*   **Consistencia del Design System (Técnico/UX):** Riesgo de inconsistencia si no se gestiona bien (ej. `class` vs `className` warnings).
*   **Rendimiento y UX:** Posibles riesgos de repintado costoso en elementos fijos (identificado en Cannect). Necesidad de optimización de imágenes (`Lazy Loading`, formatos modernos como WebP/AVIF).
*   **Fractura Tecnológica:** Evitar la descoordinación entre diferentes stacks tecnológicos (ej. Landing Page vs. App principal, como se vio en Cannect).
*   **Technical Debt:** Warnings de consola (`autocomplete` en Login, React Router future flags).

---

## 4. Requisitos Funcionales y No Funcionales (Confirmados)

*   **Funcionales:**
    *   **Gestión Integral de Cultivo:** Administrador central.
    *   **Trazabilidad:** Desde semilla/esqueje hasta cosecha, por planta, por semanas, con registros multimedia.
    *   **Bitácora:** "Log de cultivo" similar a Growdiaries (fotos, videos, notas, audio).
    *   **Registro de Eventos:** Poda, riego, notas, cambios de etapa, mediciones (PH, EC, temp, humedad, altura).
    *   **Gestión de Espacios:** 3 salas con posiciones mapeables.
    *   **Catálogo de Productos/Genéticas:** Gestión de genéticas, productos (ID, precio, stock, descripción).
    *   **Autenticación:** Login, Registro (con campo 'Nombre'), Recuperar Contraseña, Google SSO.
    *   **Métricas y Análisis:** Historial de desarrollo, comparación de plantas/genéticas, métricas de rendimiento.
    *   **Exportación de Datos:** (PDF/CSV) - CRÍTICO.
*   **No Funcionales:**
    *   **Diseño:** Intuitivo, rápido, altos estándares de Google (Material Design 3). Moderno, limpio. Mobile-first.
    *   **Rendimiento:** Optimización de imágenes, `lazy loading`, tiempos de carga rápidos.
    *   **Seguridad y Privacidad:** Soberanía del dato, anonimato, control de datos. RLS (Row Level Security) a nivel de DB.
    *   **Escalabilidad:** Base de datos para años de datos.
    *   **Coherencia Tecnológica:** Un único stack (Next.js/React con Tailwind).
    *   **Operatividad Offline:** (Deseable) Capacidad de operar sin conexión y sincronizar después.
    *   **Integración Hardware:** (Deseable) API abierta para automatización de datos (sensores).

---

## 5. Conclusiones Clave del Análisis de la Competencia

*   **Cannect:** Estética "tech" y sofisticada, pero con una implementación de ingeniería mixta (Wix para landing, app separada) y riesgos de rendimiento.
    *   *Lecciones:* Adoptar flujos dinámicos (SVG), gobernanza estricta de Design System, priorizar rendimiento, evitar fractura tecnológica, priorizar código limpio.
*   **Growdiaries:** Plataforma madura, robusta, prioriza densidad de información, SEO (SSR/SSG, inferido Next.js/Nuxt.js), comunidad activa.
    *   *Lecciones:* Capitalizar su falla de confianza (exportación de datos), adoptar acentos estratégicos (naranja para actividad), considerar arquitectura Next.js, priorizar Lazy Loading e imágenes optimizadas, diseño de tarjetas para bitácora.
*   **Grow with Jane:** Enfoque mobile-first, diseño "amigable", trazabilidad funcional (Calendario/Toolbox), eficiencia con Utility-First CSS (Tailwind).
    *   *Lecciones:* Adoptar Utility-First (Tailwind), priorizar trazabilidad funcional (Toolbox/Calendario), implementar transparencia de contenido (Tiempo de Lectura), optimización estricta de contenido visual (Lazy Loading, WebP/AVIF), fuerte orientación mobile-first.
*   **NotebookLM:** Ingeniería de clase mundial, diseño subordinado a la productividad (Google Standards, Material Design 3, FinOps), estructura tripartita modular, persistencia del contexto, Trust UX.
    *   *Lecciones:* Adoptar estructura de paneles modular, priorizar persistencia del contexto, integrar "Trust UX" (citas/grounding para IA), utilizar Design Tokens semánticos, optimización de rendimiento frontend.

---
**Observaciones Adicionales:**
*   El ERD de Supabase es más detallado y específico en sus tipos de datos (UUIDs) y en la implementación de RLS y funciones de trigger para la creación automática de perfiles de usuario. Esto confirma una arquitectura con un enfoque fuerte en la seguridad a nivel de base de datos.
*   Los archivos JSX de referencia (`01-login-view.jsx`, `02-menu-view.jsx`, `03-dashboard-view.jsx`, `reference_plant_detail_page.jsx`) proporcionan una base concreta para la implementación de las vistas clave del frontend.
*   Las advertencias de la consola (`autocomplete` inválido, React Router future flags) indican áreas de mejora y deuda técnica en el código actual del frontend que deben ser abordadas para mantener la calidad.
