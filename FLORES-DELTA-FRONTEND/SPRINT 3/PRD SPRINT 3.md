# PRD Sprint 3: "Establecimiento Operacional, Visión UX/UI y Análisis Estratégico Profundo"

**Objetivo del Sprint 3:** Establecer la operatividad crítica del backend, la conexión fundamental del frontend, generar la visión UX/UI con Stitch, y sentar un piso de información soporte estratégico para el crecimiento del proyecto.

---

### **Análisis de Divergencias y Plan de Adaptación (Plan de Sanación)**

Tras la Fase A de análisis, se han detectado divergencias críticas entre el prototipo original y el estado actual del proyecto, resultando en una aplicación no funcional. Este plan detalla la estrategia para resolver estos puntos y realinear el proyecto.

*   **Divergencia 1: Flujo de Autenticación.**
    *   **Observación:** El prototipo usaba Supabase para la autenticación. El frontend actual fue parcialmente adaptado al backend de Java, pero el flujo se rompió.
    *   **Solución:** Abandonar por completo la lógica de Supabase. Refactorizar `Login.tsx` para que use el `apiService` que llama a `POST /login` del backend de Java, gestionando la sesión con la cookie `HttpOnly` y el estado global con `useAuthStore`.

*   **Divergencia 2: Flujo de Navegación Post-Login.**
    *   **Observación:** La experiencia original (Login -> Dashboard -> Menú Emergente) está rota. La causa es una "race condition" al intentar navegar antes de que el estado de autenticación se propague.
    *   **Solución:** Centralizar la lógica de redirección. Se modificará `App.tsx` para que un `useEffect` "escuche" el cambio de estado en `useAuthStore` y ejecute la navegación al `/dashboard` y la apertura del menú emergente solo después de que el login sea exitoso.

*   **Divergencia 3: Renderizado Bloqueado ("Página en Blanco").**
    *   **Observación:** La aplicación no se renderiza en absoluto.
    *   **Causa Raíz:** Un error de sintaxis (`Uncaught SyntaxError`) porque el componente `ProtectedRoute.tsx` no tiene un `export default`, y además, su lógica interna todavía apunta a Supabase.
    *   **Solución (Paso Inmediato y Crítico):** Refactorizar `ProtectedRoute.tsx` para que use `export default`, se conecte a `useAuthStore` para verificar la autenticación, y utilice el componente `<Outlet />` de React Router para renderizar las rutas hijas protegidas. **Esta es la primera acción de ejecución que 'Pro' debe tomar.**

---

### **Fase A: Análisis Estratégico y Contextual (FLASH)**

*   **Tarea S3.A.1: Creación del Manifiesto de Contexto y Análisis Exhaustivo.**
    *   *Descripción:* Crear un manifiesto de todos los documentos de contexto histórico y analizarlos para extraer información útil, identificar puntos de dolor y entender la arquitectura original.
    *   *Estado:* **COMPLETADO.**

### **Fase B: Habilitación del Entorno y Backend (PRO)**

*   **Tarea S3.B.1: [PRO] Instalar y Configurar JDK 21 y Docker.**
    *   *Descripción:* Asegurar que el entorno local cumple con los requisitos del backend.
    *   *Estado:* **COMPLETADO.**
*   **Tarea S3.B.2: [PRO] Ejecutar y Verificar el Backend.**
    *   *Descripción:* Iniciar la base de datos PostgreSQL en Docker y el servidor Spring Boot, confirmando que no hay errores críticos de inicio.
    *   *Estado:* **COMPLETADO.**
*   **Tarea S3.B.3: [FLASH/PRO] Acceder y Documentar la Swagger UI.**
    *   *Descripción:* Obtener el mapa exacto de endpoints y DTOs desde la documentación interactiva del backend.
    *   *Estado:* **COMPLETADO.**

### **Fase C: Integración y Refactorización del Frontend (PRO)**

*   **Tarea S3.C.1: [PRO] Estabilizar el Renderizado.**
    *   *Descripción:* Aplicar la solución a la "Divergencia 3", refactorizando `ProtectedRoute.tsx`.
    *   *Estado:* **PENDIENTE.**
*   **Tarea S3.C.2: [PRO] Implementar Flujo de Autenticación Correcto.**
    *   *Descripción:* Aplicar la solución a las "Divergencias 1 y 2", refactorizando `Login.tsx` y `App.tsx`.
    *   *Estado:* **PENDIENTE.**
*   **Tarea S3.C.3: [PRO] Conectar Listado de Plantas.**
    *   *Descripción:* Modificar el `Dashboard.tsx` para que use el `apiService` y muestre las plantas desde `GET /api/plantas`.
    *   *Estado:* **PENDIENTE.**

### **Fase D: Visión UX/UI con Stitch (PRO - Herramienta IA)**

*   **Tarea S3.D.1: [PRO] Ejecutar Misión "Stitch" para Mockups Figma.**
    *   *Descripción:* Utilizar el "Master Prompt de Diseño para Stitch IA v1.0" para generar los mockups de alta fidelidad.
    *   *Estado:* **PENDIENTE.**

### **Fase E: Gestión de Repositorio (PRO)**

*   **Tarea S3.E.1: [PRO] Commit Inicial del Monorepo Funcional.**
    *   *Descripción:* Realizar el primer commit una vez que el flujo de login y visualización del dashboard esté funcionando.
    *   *Estado:* **PENDIENTE.**

---

### **Tareas Diferidas a Futuros Sprints (Backlog)**

*   Mejoras avanzadas de Autenticación (Registro con campo 'Nombre', Recuperar Contraseña, etc.).
*   Implementación completa del Planificador de Tareas.
*   Conexión de la Bitácora de Eventos del Dashboard a la API.
*   Filtros avanzados y exportación de Bitácora.
*   Carga de datos dinámicos en `PlantDetailPage`.
*   Análisis Estratégico y Futuro (KPIs, QR, etc.).
*   Integraciones de otras entidades (`Usuario`, `Sala`, etc.).