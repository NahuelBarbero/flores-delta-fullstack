# Historial de Cambios y Adaptaciones del Backend

**Proyecto:** Flores Delta
**Propósito:** Este documento registra todas las modificaciones realizadas al código original del backend para asegurar la trazabilidad y facilitar la revisión por parte de los stakeholders.

---

### **Cambio #1: Corrección de Bug Crítico de Login**

*   **Fecha:** 2025-11-27
*   **Archivo Modificado:** `src/main/java/DeltaFlores/web/entities/User.java`
*   **Cambio Realizado:** Se reemplazó la anotación `@JsonIgnore` en el campo `password` por `@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)`.
*   **Justificación (Por qué):** El `@JsonIgnore` original prevenía que la contraseña enviada por el frontend durante el login fuera leída por el backend, causando que todos los intentos de login fallaran con un error `401 Unauthorized` (ya que se intentaba validar una contraseña `null`). La nueva anotación corrige este bug permitiendo que la contraseña se lea en la petición de login, pero mantiene la seguridad al prevenir que se envíe en cualquier respuesta de la API.

---

### **Cambio #2: Corrección de Error de Compilación**

*   **Fecha:** 2025-11-27
*   **Archivo Modificado:** `src/main/java/DeltaFlores/web/entities/User.java`
*   **Cambio Realizado:** Se re-introdujo la línea `import com.fasterxml.jackson.annotation.JsonFormat;` en el bloque de importaciones.
*   **Justificación (Por qué):** El primer cambio eliminó accidentalmente esta importación, que era requerida por la anotación `@JsonFormat` en el campo `fechaRegistro`. Esto causaba un error de compilación que impedía que el backend se iniciara. Esta corrección resolvió el error de compilación.

---

### **Cambio #3: Corrección de Error de CORS (Pre-flight)**

*   **Fecha:** 2025-11-27
*   **Archivo Modificado:** `src/main/java/DeltaFlores/web/security/WebSecurityConfig.java`
*   **Cambio Realizado:** Se añadió la regla `.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()` a la configuración de seguridad de Spring.
*   **Justificación (Por qué):** Para resolver el error `404 Not Found` que ocurría durante la petición de "pre-vuelo" (`OPTIONS`) del navegador. Este cambio permite que el backend responda afirmativamente a las comprobaciones de CORS, desbloqueando así la petición `POST` de login real desde el frontend.

---
