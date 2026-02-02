# Análisis Fundacional del Proyecto Flores Delta

**Fecha:** 22 de Enero de 2026
**Rol:** PM - Análisis Fundacional
**Estado:** Fase Final de Desarrollo

## 1. Composición del Proyecto

El entorno del proyecto ha evolucionado hacia una arquitectura unificada (híbrido/monorepo) que consolida tanto el Frontend como el Backend y la documentación en un único repositorio principal.

### Estructura de Directorios Principal
La raíz del proyecto (`FLORES DELTA MVP`) actúa como el contenedor principal orquestando los siguientes módulos:

*   **`delta-flores/` (Backend Ecosystem)**
    *   **Nucleo:** El código fuente principal reside en el subdirectorio `web/`.
    *   **Tecnología:** Java con **Spring Boot**, gestionado por **Maven**.
    *   **Infraestructura:** Contiene su propia configuración de Docker y logs.

*   **`FLORES-DELTA-FRONTEND/` (Frontend Ecosystem - Activo)**
    *   **Nucleo:** Aplicación SPA (Single Page Application).
    *   **Tecnología:** **React** construido sobre **Vite** y **TypeScript**.
    *   **UI/UX:** Utiliza **Shadcn UI** y **Tailwind CSS** para el sistema de diseño.
    *   **Estado:** Es el directorio de trabajo activo para la interfaz de usuario.

*   **`pegamys-web/` (Legacy/Referencia)**
    *   Contiene estructuras anteriores o dependencias legadas. Actualmente el desarrollo activo se centra prohibidamente en `FLORES-DELTA-FRONTEND`.

*   **`docs/` (Centro de Conocimiento)**
    *   Directorio centralizado para toda la documentación estratégica, técnica y de auditoría.

*   **`docker-compose.yml`**: Orquestación de contenedores en la raíz para levantar servicios conjuntamente.

---

## 2. Listado de Archivos Recientes (Último Mes)

A continuación se detallan los archivos clave de documentación y planificación generados durante las últimas semanas de trabajo intensivo ("Planning Mode" y ejecución), organizados por propósito.

### 📘 Documentación Estratégica y de Producto (Guides/Architecture)
Archivos enfocados en la visión, requisitos y estado operativo del sistema.

*   `docs/architecture/CONTEXTO_ESTRATEGICO_FLORESDELTA.md` - *Visión macro y objetivos a largo plazo.*
*   `docs/guides/PRD_CHECKPOINT.md` - *Requisitos y estado actual del producto.*
*   `docs/guides/SISTEMA_LISTO.md` - *Confirmación de operatividad para testing.*
*   `docs/guides/RESUMEN_PRE_TESTING.md` - *Resumen ejecutivo antes de la fase de pruebas.*
*   `docs/guides/INSTRUCCIONES_ARRANQUE.md` - *Guía rápida para levantar el entorno.*

### 🛡️ Auditorías y Calidad (Audits)
Archivos resultantes del análisis profundo de seguridad, código y funcionalidad.

*   `docs/audits/CHECKPOINT_TESTING_MANUAL.md` - *Bitácora y guía para las pruebas manuales.*
*   `docs/audits/AUDITORIA_TECNICA.md` - *Análisis técnico profundo.*
*   `docs/audits/REPORTE_GEMINI.md` - *Resultados de auditoría automatizada (Gemini).*
*   `docs/audits/REPORTE_CLAUDE.md` - *Resultados de auditoría automatizada (Claude).*
*   `Fotos FD/flores_delta_audit_checkpoint.md` - *Evidencia visual/audit de punto de control.*

### 🛠️ Archivos de Infraestructura y Raíz
*   `README-DOCKER.md` - *Documentación específica para despliegue en contenedores.*
*   `README.md` - *Punto de entrada general del proyecto.*

---

**Nota del PM:** Esta estructura refleja un proyecto maduro que entra en fases de estabilización y testing. La separación clara entre documentación (`docs/`) y código (`delta-flores`, `FLORES-DELTA-FRONTEND`) facilita la mantenibilidad.
