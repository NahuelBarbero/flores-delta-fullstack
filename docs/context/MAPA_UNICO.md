# 🗺️ MAPA ÚNICO — Flores Delta MVP

**Creado:** 2 Mar 2026 | **Fuentes cruzadas:** 4 | **Items únicos:** 35
**Protocolo:** `protocolo-proyecto` SETUP paso 2

---

## ✅ CERRADO (verificado con evidencia)

> 8 items resueltos en sprints anteriores. No requieren más trabajo.

| ID | Item | Origen | Evidencia |
|:--:|------|--------|-----------|
| ✅1 | Backend duplicado eliminado | Notion #1 | `delta-flores/web` es única fuente |
| ✅2 | Día X (Sem Y) en bitácora planta | Notion #9 | `eventTimeInfo.ts` creado, `tsc` exit 0 |
| ✅3 | Registro cambio de etapa | Notion #15-16 | `StageChangeForm` funcional |
| ✅4 | Token auto-logout | Notion #17 | Interceptor 401 en AuthContext |
| ✅5 | PUT vs POST en edición | Notion #18 | `api.ts` auditado |
| ✅6 | Panel Admin básico | Notion #19 | Listado usuarios + logs |
| ✅7 | Exportación CSV | PRD | `MainLogPage` L232-289 |
| ✅8 | Limpieza Dashboard Sprint G2 | Kanban | KPIs, console.log, imports |

---

## ⚠️ VERIFICAR (dicen "resuelto" pero sin evidencia reciente)

> Verificar en una sesión rápida antes de marcar como cerrados.

| ID | Item | Origen | Qué verificar |
|:--:|------|--------|---------------|
| V1 | Login/Registro fluido | PRD | Flujo E2E, manejo errores |
| V2 | Auto-logout robusto | PRD | ¿Funciona en mobile? ¿Edge cases? |
| V3 | CRUD Salas/Cepas/Plantas | PRD | Crear, editar, eliminar cada uno |
| V4 | Validaciones de formularios | PRD | Zod previene envíos inválidos |
| V5 | Feedback toast en acciones | PRD | Toasts en crear/editar/eliminar |
| V6 | Edición/eliminación eventos | PRD | Todos los tipos de evento |
| V7 | Semanas en bitácora planta | Notion #8 | Agrupación visual funciona |

---

## 📋 PENDIENTES — Organizados por Feature MVP

````carousel
### Feature 3: Bitácora por planta 🔧
*Meta: que la bitácora sea la joya visual del producto*

| ID | Item | Tipo | Prior | Esfuerzo |
|:--:|------|:----:|:-----:|:--------:|
| F3.1 | Agrupar eventos del mismo día | 🟢 | P0 | 🟡 |
| F3.2 | CambioEtapa con borde destacado | 🟢 | P0 | 🟢 |
| F3.3 | Semanas colapsables (accordion) | 🟢 | P1 | 🟡 |
| F3.4 | Estilo visual Growdiaries | 🟢 | P1 | 🔴 |

**Origen:** Notion #10,#12 + Kanban G2-1,G2-2,B1 + Contexto #12
<!-- slide -->
### Feature 4: Bitácora general con filtros 🔧
*Meta: que cualquier evento se encuentre rápido*

| ID | Item | Tipo | Prior | Esfuerzo |
|:--:|------|:----:|:-----:|:--------:|
| F4.1 | Click en evento → navegar a planta | 🟢 | P0 | 🟢 |
| F4.2 | Toggle orden cronológico ↑↓ | 🟢 | P0 | 🟡 |
| F4.3 | Filtro por semana calendario | 🟢 | P1 | 🟡 |
| F4.4 | Modal/detalle al clickear evento | 🟢 | P1 | 🟡 |

**Origen:** Kanban A2,A1,B2,B4
<!-- slide -->
### Feature 5: Panel Admin/SuperAdmin 🔧
*Meta: que Lautaro pueda gestionar usuarios*

| ID | Item | Tipo | Prior | Esfuerzo |
|:--:|------|:----:|:-----:|:--------:|
| F5.1 | Panel SuperAdmin: crear usuarios + roles | 🟡 | P0 | 🟡 |

**Origen:** Notion #20
<!-- slide -->
### Feature 6: Eventos masivos 🟠
*Meta: regar/nutrir toda una sala en un click*

| ID | Item | Tipo | Prior | Esfuerzo |
|:--:|------|:----:|:-----:|:--------:|
| F6.1 | Selector sala → checkbox todas las plantas | 🟠 | P0 | 🟡 |
| F6.2 | Riego + nutriente simultáneo (doble endpoint) | 🟠 | P0 | 🟡 |

**Origen:** Notion #5,#6 + Contexto #8
<!-- slide -->
### Feature 7: UX mobile-first 🔧
*Meta: que la app se sienta nativa en el celular*

| ID | Item | Tipo | Prior | Esfuerzo |
|:--:|------|:----:|:-----:|:--------:|
| F7.1 | DateFilter mobile: Popover → modal | 🟢 | P1 | 🟢 |
| F7.2 | Dashboard carrusel de plantas | 🟢 | P1 | 🟡 |
| F7.3 | Responsive general (audit) | 🟢 | P1 | 🟡 |

**Origen:** Kanban G2-4 + Contexto #13,#14
<!-- slide -->
### Feature 8: Métricas/BI 🟠
*Meta: que el grower vea el resumen de su cultivo*

| ID | Item | Tipo | Prior | Esfuerzo |
|:--:|------|:----:|:-----:|:--------:|
| F8.1 | Auditar vista actual de métricas E2E | 🟠 | P0 | 🟡 |
| F8.2 | Gráficos de proyección/resumen semanal | 🟡 | P0 | 🔴 |

**Origen:** Contexto #10 + PRD
<!-- slide -->
### Feature 9: Notas multimedia 🟠
*Meta: que el grower grabe audio/saque foto desde la app*

| ID | Item | Tipo | Prior | Esfuerzo |
|:--:|------|:----:|:-----:|:--------:|
| F9.1 | Auditar nota multimedia actual E2E | 🟠 | P0 | 🟡 |
| F9.2 | Unificar audio/foto/video/texto en NoteEvent | 🟡 | P0 | 🟡 |

**Origen:** Notion #13 + Contexto #9
<!-- slide -->
### UX / Navegación (cross-cutting)
*Items que mejoran la experiencia general*

| ID | Item | Tipo | Prior | Esfuerzo |
|:--:|------|:----:|:-----:|:--------:|
| UX1 | Avatar con iniciales del usuario | 🟢 | P1 | 🟢 |
| UX2 | Estandarizar labels: "Nueva Planta" / "Nuevo Evento" | 🟢 | P0 | 🟢 |
| UX3 | Limpieza menú: eliminar Inventario, renombrar Nutrientes | 🟢 | P0 | 🟢 |
| UX4 | Menú perfil: LogOut, Perfil, Favoritos | 🟢 | P1 | 🟡 |
| UX5 | Landing page: minimizar, primer link a Login | 🟢 | P1 | 🟢 |
| UX6 | Orden alfabético plantas en salas | 🟢 | P1 | 🟢 |
| UX7 | Simplificar registro planta (eliminar prod esperada) | 🟢 | P1 | 🟢 |
| UX8 | Wizard vs Form rápido (diseño UX) | 🟢 | P2 | 🔴 |

**Origen:** Notion #2,#3,#4 + Contexto #4,#5,#6,#11 + Kanban A5,G2-3,B3
<!-- slide -->
### Deuda técnica (cross-cutting)
*Items que mejoran la calidad del código*

| ID | Item | Tipo | Prior | Esfuerzo |
|:--:|------|:----:|:-----:|:--------:|
| DT1 | Unificar import BackendEvent en MainLogPage | 🟢 | P0 | 🟢 |
| DT2 | Unificar constantes tipos de evento (5 archivos) | 🟢 | P0 | 🟡 |
| DT3 | Ampliar BackendEvent con campos faltantes | 🟡 | P0 | 🟡 |
| DT4 | Eliminar `event: any` de EventCard | 🟢 | P0 | 🟢 |
| DT5 | Fix: UserDiary usa `event.nota` (no existe) | 🟢 | P0 | 🟢 |
| DT6 | Auditar formularios vs endpoints backend | 🟠 | P1 | 🔴 |
| DT7 | Verificar DTOs Zod vs backend real | 🟠 | P1 | 🟡 |
| DT8 | Seguridad prod: ddl-auto + env vars | 🔴 | P1 | 🟡 |
| DT9 | staleTime en React Query (performance) | 🟢 | P1 | 🟢 |
| DT10 | Planta STATE global (arquitectura) | 🟢 | P2 | 🟡 |
| DT11 | Formularios edición personalizados por tipo | 🟢 | P2 | 🔴 |

**Origen:** Kanban A3,A4,C1-C4,H1 + PRD + Notion #11,#14
````

---

## 📊 Resumen numérico

| Categoría | P0 | P1 | P2 | Total |
|-----------|:--:|:--:|:--:|:-----:|
| ✅ Cerrados | — | — | — | 8 |
| ⚠️ Verificar | 7 | — | — | 7 |
| Features 3-9 | 12 | 6 | — | 18 |
| UX/Navegación | 2 | 5 | 1 | 8 |
| Deuda técnica | 5 | 4 | 2 | 11 |
| **Total** | **26** | **15** | **3** | **52** |

> [!WARNING]
> 26 items P0 supera el target de 25. Hay que recortar 1-2 o reclasificar a P1 en la próxima sesión.

---

## 🏷️ Leyenda

| Símbolo | Tipo | Significado |
|:-------:|------|-------------|
| 🟢 | Frontend puro | Nahuel + agentes lo resuelven |
| 🟡 | Consulta | Nahuel avanza, Lautaro valida |
| 🟠 | Auditar integración | Existe, verificar E2E vs backend |
| 🔴 | Requiere backend | Bloqueado hasta que Lautaro implemente |
