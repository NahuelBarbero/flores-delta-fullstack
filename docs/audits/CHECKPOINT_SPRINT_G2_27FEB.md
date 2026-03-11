# Checkpoint Sprint G — Fase 2: Sesión 27 Feb 2026

**Estado General:** 🟢 AVANCE SÓLIDO
**Fase Actual:** Sprint G Fase 2 (Deuda Notion + Consolidación UX)
**Metodología:** Método de Desarrollo v3 (aplicado formalmente por primera vez)

---

## Completado en esta sesión

### Notion #8-9: "Día X (Semana Y)" en Bitácora de Planta
**Estado:** ✅ IMPLEMENTADO (pendiente verificación visual del usuario)

**Archivos creados/modificados:**
| Archivo | Acción |
|---|---|
| `src/Utils/eventTimeInfo.ts` | CREADO — utilidad centralizada de lógica temporal |
| `src/Components/plant/EventCard.tsx` | MODIFICADO — muestra "Día X (Sem Y)" + "dd/mm/aa" |
| `src/Pages/PlantDetailPage.tsx` | MODIFICADO — pasa `fechaCreacion` al EventCard |

**Verificación:** `npx tsc --noEmit` → exit 0, 0 errores.

### Limpieza previa (25 Feb)
- Eliminado `console.log('Selected:', date)` del Dashboard
- Eliminado `bitacora/EventCard.tsx` (código muerto)
- Eliminadas KPI cards del Dashboard (movidas a Panel de Control)
- Limpiados imports muertos en Dashboard.tsx

---

## Descubrimientos importantes

### 1. Interfaz BackendEvent incompleta
`EventCard.tsx` usa `event: any` y accede a 5 campos que NO están declarados en `BackendEvent`:
- `tempAgua`, `horasLuz`, `humedad`, `temperaturaAmbiente`, `alturaPlanta`
- `nutriente.descripcion`

**Acción:** Documentado en `docs/planning/SPRINT_H_BACKLOG.md` para auditoría completa de formularios vs backend.

### 2. Skills del proyecto
- Las skills reales (41 archivos) viven en `.agents/skills/`
- Los symlinks en `.gemini/antigravity/global_skills/` están rotos (apuntan a destino inexistente)
- Solo `metodo-desarrollo` tiene contenido real como directorio en global_skills

### 3. Método de Desarrollo v3 — Primera aplicación formal
Se siguió el protocolo completo de 7 fases para una tarea 🟡 GUIADO.
El Master Prompt evolucionó de v1 a v4 con iteraciones y auditoría de sesgos.
Lección: el GATE de aprobación del usuario en Fase 3 previno ejecutar una solución subóptima.

---

## Pendientes Sprint G Fase 2

| Item | Estado |
|---|---|
| Notion #8-9: Día/Semana en bitácora | ✅ Implementado, pendiente verificación visual |
| Notion #10: Agrupar eventos por fecha | ⏳ Pendiente |
| Notion #12: CambioEtapa con borde destacado | ⏳ Pendiente |
| Notion #2: Avatar con iniciales del usuario | ⏳ Pendiente |
| DateFilter mobile (Popover → modal) | ⏳ Pendiente |

---

## Próximo Sprint (H) — Backlog documentado
Ver `docs/planning/SPRINT_H_BACKLOG.md`:
- Auditoría completa de formularios vs endpoints backend
- Eliminar todos los `any` en componentes de eventos
- Ampliar `BackendEvent` con campos faltantes
- Verificar DTOs de Zod contra backend real
