# PRD - Misión: UX para la Bitácora de Planta

**Versión:** 1.0
**Fecha:** 2025-11-10
**Autor:** Project Manager
**Estado:** Aprobado

---

## 1. Visión General

Esta misión se enfoca en el corazón de la aplicación: la experiencia del cultivador al interactuar con su bitácora. El objetivo es transformar el registro de datos de una tarea tediosa a una experiencia visual, intuitiva y potente que entregue valor accionable al usuario.

## 2. User Story

**Como** un cultivador dedicado,
**Quiero** una vista detallada e interactiva del historial de mi planta en formato de línea de tiempo,
**Para** poder visualizar su progreso cronológico, entender la correlación entre eventos (riegos, podas, fotos) y tomar mejores decisiones para su cuidado.

## 3. Requerimientos Funcionales

- **FR-UX-01: Página de Detalle de Planta:**
    - Debe existir una nueva página/ruta en la aplicación que muestre la información de una única planta.
    - La ruta debe ser dinámica para aceptar un ID de planta (ej. `/planta/:id`).

- **FR-UX-02: Encabezado de Información Clave:**
    - La página debe mostrar un resumen con los datos más importantes de la planta: ID/Etiqueta, Genética, Etapa actual del cultivo, y días en la etapa.

- **FR-UX-03: Línea de Tiempo Horizontal de Eventos:**
    - El historial de eventos de la planta (bitácora) debe presentarse como una **línea de tiempo horizontal interactiva**.
    - El usuario debe poder hacer scroll horizontal para navegar a través del tiempo (días/semanas).
    - Cada evento en la línea de tiempo debe ser un punto clickeable.

- **FR-UX-04: Panel de Detalles del Evento:**
    - Al seleccionar un evento de la línea de tiempo, un panel en la misma página debe mostrar los detalles completos de dicho evento (ej. la foto tomada, el texto de una nota, los detalles de un riego).

- **FR-UX-05: Acciones Rápidas Integradas:**
    - La interfaz debe permitir al usuario añadir nuevos eventos a la bitácora (Riego, Poda, Foto, Nota) de forma rápida y contextual, idealmente desde la misma vista de la línea de tiempo.

## 4. Requerimientos No Funcionales

- **NF-UX-01: Diseño y Estilo:** El diseño debe ser coherente con el `Design System` del proyecto, asegurando una experiencia de usuario limpia y sin fricciones.
- **NF-UX-02: Interactividad:** Todas las interacciones (scroll, clicks en eventos) deben ser fluidas y responsivas, sin lag.
- **NF-UX-03: Reutilización de Componentes:** Las funcionalidades para añadir nuevos eventos deben reutilizar los formularios y la lógica ya existentes en el "Menú de Acceso Directo" para mantener la consistencia.

## 5. Criterios de Aceptación (DoD - Definition of Done)

- [ ] Se puede navegar desde una tarjeta de planta en el Dashboard a su nueva página de detalle.
- [ ] La página de detalle muestra la información clave y la línea de tiempo horizontal.
- [ ] La línea de tiempo es navegable horizontalmente.
- [ ] Al hacer click en un evento (mock), se muestra un placeholder para el panel de detalles.
- [ ] Existe un botón visible para "Añadir Nuevo Evento".
- [ ] La página es responsiva en escritorio y móvil.
