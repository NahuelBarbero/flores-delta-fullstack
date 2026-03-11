# 📢 Status Update: Marzo 2026 (Mensaje para Lautaro)

> **Fecha:** 11 Mar 2026
> **De:** Nahuel (& Antigravity)
> **Para:** Lautaro (Backend Architect)

Lautaro, acabamos de hacer un push grande a la rama `feature/redesign-gwj-hybrid`. Antes de que merges a `main` o continúes, queremos dejarte este status para que sepas exactamente en qué estamos, qué se subió, y qué descubrimos sobre el backend.

---

## 🚀 1. ¿Qué se acaba de pushear?

Pusheamos los últimos meses de trabajo local acumulado. Está dividido en 4 commits limpios para que puedas revisarlos fácil:

1. **`fix(backend)`**: Cambios que estaban colgados localmente en `delta-flores/` (más detalle abajo).
2. **`feat(frontend)`**: Componentes nuevos principales:
   - `Wizard` para creación guiada de plantas
   - Componentes nuevos de la `Bitacora` (FeedMobile, EventCard refactorizado)
   - `ChangeSalaDialog` y utilidades de fechas (`eventTimeInfo.ts`)
3. **`refactor(frontend)`**: Actualizaciones a formularios existentes, páginas principales (`Dashboard`, `MainLogPage`, `PlantDetailPage`), y actualización del `api.ts`.
4. **`docs`**: Toda esta nueva estructura de documentación, checklists, y planeamiento.

---

## 🎯 2. ¿En qué estamos trabajando ahora? (El Plan Actual)

Arrancamos a ver problemas de tipado y componentes rotos en el frontend vinculados a los eventos. Al analizarlo en profundidad, nos dimos cuenta de que **el sistema de eventos no estaba alineado entre el backend real y las interfaces de TypeScript**.

**Pivotamos el Sprint a una Auditoría de Eventos E2E.**
El objetivo es que cada tipo de evento (Poda, Riego, Nutriente, Nota) se comporte de manera *idéntica y consistente* en todos los puntos de la app (Menú Directo, Bitácora de Planta, Diario del Usuario, etc.).

### Plan de 11 tareas en curso:
- **Tareas 1-6:** Levantar entorno, tipar correctamente `BackendEvent` sumando todos los campos que tu backend y DTOs mandan en realidad (que faltaban en TS), y hacer cleanup de UI básica.
- **Tareas 7-10 (Core):** Auditoría visual y de código *evento por evento* (Riego, Poda, Nutrientes, Notas) de punta a punta.

---

## ⚠️ 3. Análisis Backend: `main` vs Nuestra rama local

Hicimos un diff línea por línea entre tu backend oficial (`main`) y lo que teníamos nosotros localmente (que acabamos de pushear).

**✅ Las excelentes noticias:**
- Todos los DTOs (`WateringEventDto`, `PruningEventDto`, etc.) son **idénticos**.
- Todos los `EventService` (la lógica base) son **idénticos**.

**🔴 La única gran diferencia:**
En `PlantaService.java`, nuestra versión local tiene **3 endpoints agregados** que no están en tu `main`. Si en el futuro pasamos a usar 100% tu backend actual, el frontend nuestro se va a romper acá:

1. **`getPlantasBySalaId()`**: El frontend lo usa para filtrar plantas por sala en el Menú de Acceso Directo.
2. **`getPlantasByUserId()`**: Lo usamos para búsquedas específicas por usuario en listas.
3. **`transferPlanta()`**: Una función admin para transferir plantas entre cultivos.

**Otras de detalle menor:**
- En nuestro `DtoMapper.java`, eliminamos el mapeo de `etapaAnterior` porque el campo ya no existe en la entidad ni en el DTO, y rompía la compilación. Asumimos que eso también lo vas a tener que arreglar en `main` si no lo borraste.
- Diferencias menores de puertos en `application.properties` y ajustes de robustez al `JwtAuthenticationFilter`.

### ¿Qué necesitamos de vos?
1. Echarle un vistazo a los 3 endpoints nuevos de `PlantaService.java` que pusheamos. Sería ideal que los **incorpores a main**, para que no tengamos que hacer downgrade de funcionalidades en el UI.
2. Leer este doc y darnos el OK de que estás al tanto de por qué estamos auditando los eventos!
