# 📋 ANÁLISIS NOTION - 20 Puntos de Lautaro (+1 Extra)

> **Fecha:** 24 Enero 2026 (Actualizado: 30 Enero 2026)
> **Fuente:** Notion de Lautaro + Comentarios de Nahuel 
> **Estado:** Documento Vivo - Auditoría en curso

---

## 📊 RESUMEN EJECUTIVO (Estado Actual)

| Categoría | Estado Global | Items Críticos Resueltos |
|-----------|---------------|--------------------------|
| **Sprint A (Base)** | ✅ **COMPLETADO** | Edición, Token, Etapas, Backend |
| **Sprint B (Admin)** | 🚧 **EN PROCESO** | Panel Admin (Logs/Usuarios) |
| **Sprint C (UX)** | ⏳ **PENDIENTE** | Bitácora Visual, Semanas |
| **Sprint D/E** | ⏳ **PENDIENTE** | Eventos Masivos, Pulido UI |

---

## 📝 AUDITORÍA PUNTO POR PUNTO
*Citas textuales del feedback de Notion integradas.*

### 1. Backend repetido
> *"Veo que esta repetido el backend( hay que sacar uno, use el que esta x fuera del frontend)"*
- **Estado:** ✅ **RESUELTO (Sprint A)**
- **Acción:** Se eliminó el código backend duplicado. La única fuente de verdad es `delta-flores/web`.

### 2. Avatar usuario
> *"Veo que llama a una api para obtener una imagen, “US”, hacer una funcion para obtener las iniciales de su nombre y colocar como avatar"*
- **Estado:** ⏳ **PENDIENTE (Sprint E)**
- **Acción:** Implementar utilitario `getInitials()` en frontend.

### 3. Registro de planta
> *"Eliminar produccion esperada del registro eliminar planta publica [...] Mostrar Produccion solo si es asignada"*
- **Estado:** ⏳ **PENDIENTE (Sprint E)**
- **Acción:** Simplificación de formularios en React.

### 4. Botón repetido
> *"Nuevo Registro y añadir planta llevan al mismo formulario, dejar Nuevo registro nomas."*
- **Estado:** ⏳ **PENDIENTE (Sprint E)**
- **Acción:** Unificar UX de creación.

### 5. Registro de evento (Global)
> *"Falta la opcion de sala GLOBAL, registrar un evento para todas las plantas de una sala. Llamar al endpoint de obtener todas las plantas de una sala y mandarle esos ids."*
- **Estado:** ⏳ **PENDIENTE (Sprint D)**
- **Acción:** Implementar selección múltiple y envío masivo de IDs.

### 6. Registro de Riego (Nutrientes)
> *"Con opcion a incluir nutrientes. Si incluyen nutrientes se deberia llamar a DOS endpoint diferentes /api/events/nutrient Y /api/events/watering"*
- **Estado:** ⏳ **PENDIENTE (Sprint D)**
- **Acción:** Lógica de frontend para orquestar doble llamada.

### 7. Bitacora de planta (Imagen)
> *"cambiar imagen (abrir)"*
- **Estado:** ⏳ **PENDIENTE (Sprint C)**
- **Acción:** Reparar modal y flujo de upload de imágenes.

### 8. Agregar Semanas en bitacora
> *"sin comentarios"* (Contexto: Visualización temporal)
- **Estado:** ⏳ **PENDIENTE (Sprint C)**
- **Acción:** Implementar vista cronológica por semanas.

### 9. Componente Evento en Bitacora
> *"Mostrar por cada componente la cantidad de dias y el numero de semana “Dia 14 (Semana 2)” del lado izquiero y del derecho el dd/mm/aa"*
- **Estado:** ⏳ **PENDIENTE (Sprint C)**
- **Acción:** Cálculo dinámico de fechas en el componente de evento.

### 10. Componentes de eventos repetidos diarios
> *"Si en un mismo dia hay dos eventos, acoplarlos en uno, el componente general debe ser visto por fecha."*
- **Estado:** ⏳ **PENDIENTE (Sprint C)**
- **Acción:** Agrupación visual de eventos por fecha.

### 11. Formulario de edicion de evento
> *"Formulario personalizado de acuerdo al evento."*
- **Estado:** ⏳ **PENDIENTE (Sprint D)**
- **Acción:** Crear formularios específicos (Riego, Poda, etc.) en lugar del genérico.

### 12. Componentes CambioEtapa Bitacora
> *"Deben estar bordeados de otro color , marcando puntos fuertes en la etapa de vida de la planta."*
- **Estado:** ⏳ **PENDIENTE (Sprint C)**
- **Acción:** Estilizado CSS para hitos.

### 13. NoteEvent
> *"Registrar un evento de nota es el mismo tanto para audio foto video y texto, acoplarlo"*
- **Estado:** ⏳ **PENDIENTE (Sprint D)**
- **Acción:** Unificar modelo de adjuntos en notas.

### 14. Planta STATE
> *"Tener UNA PLANTA en una varibale de estado useState, si abre la bitacora de una planta, dicha planta ira al state"*
- **Estado:** ⏳ **PENDIENTE (Sprint E)**
- **Acción:** Implementar Contexto Global de Planta.

### 15. Registro cambio de ETAPA
> *"Falta registro de cambio de etapa. el changeEvent"*
- **Estado:** ✅ **RESUELTO (Sprint A.5)**
- **Solución:** Se desarrolló el componente `StageChangeForm` conectado al endpoint existente. Funcionalidad operativa.

### 16. Modificacion cambioETAPA
> *"sin comentarios."*
- **Estado:** ✅ **RESUELTO (Sprint A.5)**
- **Solución:** Resuelto implícitamente con el punto 15 (CRUD completo).

### 17. TOKEN se vence y no cierra sesion
> *"sin comentarios"*
- **Estado:** ✅ **RESUELTO (Sprint A.4)**
- **Solución:** Interceptor de seguridad implementado en `AuthContext`. Logout automático al recibir 401.

### 18. Modificacion de eventos (PUT vs POST)
> *"El boton de editar deberia hacer PUT . se hace un nuevo POST en vez de PUT."*
- **Estado:** ✅ **RESUELTO (Sprint A.3)**
- **Solución:** Se auditó y corrigió `api.ts`. Todas las ediciones usan PUT.

### 19. Crear Panel ADMIN
> *"Que liste los usuarios GROWER, que pueda ver sus plantas, sus salas, sus geneticas"*
- **Estado:** ✅ **RESUELTO (Sprint B.1)**
- **Solución:** Panel Admin básico implementado con listado de usuarios y logs del sistema. Visualización de recursos de terceros en proceso de refinamiento.

### 20. Crear Panel SUPER ADMIN
> *"Que pueda agregar nuevos usuarios, tanto growers como admins [...]"*
- **Estado:** 🚧 **EN PROCESO (Sprint B.2)**
- **Solución:** Estamos implementando los formularios de gestión de usuarios y roles.

### 21. Parámetros de tierra (Extra)
> *"Consejo de grower que testeo la app, me dijo que no tiene cómo administrar los parámetros del estado de la tierra [...]"*
- **Estado:** 🧊 **BACKLOG**
- **Acción:** Feature futura.
