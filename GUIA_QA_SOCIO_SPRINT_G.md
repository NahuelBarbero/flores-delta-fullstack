# Guía de Validación Profesional (Sprint G)
**Para:** Socio / Stakeholder
**Objetivo:** Validar la Nueva Experiencia de Usuario (UX) y Estabilidad.
**Versión a Testear:** v1.5 (UX Revolution)

---

## 🏗️ Preparación del Entorno
Antes de empezar, asegúrate de tener el sistema corriendo:
1.  Backend (Docker) en verde.
2.  Frontend corriendo en `http://localhost:5173`.
3.  Usa Google Chrome. Para probar la versión móvil, presiona `F12` y activa el icono de celular y tablet 📱.

---

## 🧪 Escenario 1: El "Efecto WOW" (Creación de Planta)
*Contexto:* Un cultivador compra una nueva genética y quiere registrarla rápido.

**Pasos a Ejecutar:**
1.  Ve a la sección **"Plantas"**.
2.  Busca el botón destacado **"Nueva Planta (Wizard)"** (arriba a la derecha).
3.  **Acción:** Clickealo. Debe abrirse una experiencia visual limpia.
4.  **Paso 1 (Genética):** Selecciona una genética. *Deberías ver fotos si están cargadas.*
5.  **Paso 2 (Sala):** Selecciona dónde ponerla. *Observa los indicadores de sala.*
6.  **Paso 3 (Detalles):** Confirma.
7.  **Resultado Esperado:** Toast verde de éxito "¡Planta creada!". La planta aparece inmediatamente en la lista.

> **Criterio de Éxito:** El proceso debe sentirse fluido, sin "saltos" extraños y visualmente atractivo.

---

## 🧪 Escenario 2: La Rutina Diaria (Bitácora Mobile)
*Contexto:* El cultivador está dentro de la sala con el celular, registrando un riego.

**Pasos a Ejecutar:**
1.  Activa el **Modo Móvil** en tu navegador (`F12` -> Icono Celular).
2.  Ve a la sección **"Bitácoras"**.
3.  **Observación:** NO deberías ver una tabla horizontal incomoda.
4.  **Verificación:** Debes ver una lista vertical de **Tarjetas (Cards)**.
    *   Icono grande del evento (Gota para riego, Tijera para poda).
    *   Texto legible.
    *   Foto grande (si el evento tiene foto).
5.  **Prueba de Filtro:**
    *   En la parte superior, busca la barra de iconos horizontales.
    *   Selecciona **"Riego"** (Gota).
    *   La lista debe filtrarse instantáneamente para mostrar solo riegos.

> **Criterio de Éxito:** La interfaz debe ser navegarle con el pulgar. Lectura clara de "Qué pasó y cuándo".

---

## 🧪 Escenario 3: Análisis de Datos (Dashboard)
*Contexto:* El socio revisa cómo va el cultivo general.

**Pasos a Ejecutar:**
1.  Ve al **"Inicio" (Dashboard)**.
2.  Observa las tarjetas de métricas superiores (KPIs).
3.  **Prueba de Alerta:** Si hay plantas que necesitan riego, la tarjeta de "Riego" debe tener un borde rojo pulsante.
4.  Scrollea hacia abajo. Revisa el calendario de actividad.

---

## 📝 Reporte de Feedback
Si encuentras algo que no se siente "Premium", anótalo usando este formato:
*   **Pantalla:** (Ej: Bitácora Mobile)
*   **Lo que vi:** (Ej: El texto se corta)
*   **Lo que esperaba:** (Ej: Leer todo el texto)
*   **Severidad:** cosmética / molesta / bloqueante.
