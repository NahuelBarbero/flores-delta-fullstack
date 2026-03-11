# 📅 ROADMAP — Flores Delta MVP
## Período: 3 Mar — 2 Abr 2026 (4 semanas)
## Capacidad estimada: 3 sesiones/semana × 2 items = ~6 items/semana

---

## Semana 1 (3-9 Mar): VERIFICAR + LIMPIAR
**Tema:** Cerrar lo que ya está hecho y limpiar deuda rápida
**Milestone:** App verificada E2E, deuda técnica crítica resuelta

### Verificación rápida (levantar app y probar)
| ID | Item | Tipo | Esfuerzo |
|:--:|------|:----:|:--------:|
| V1 | Login/Registro fluido | 🟢 | ✓ check |
| V2 | Auto-logout robusto | 🟢 | ✓ check |
| V3 | CRUD Salas/Cepas/Plantas | 🟢 | ✓ check |
| V4 | Validaciones formularios | 🟢 | ✓ check |
| V5 | Feedback toast | 🟢 | ✓ check |
| V6 | Edición/eliminación eventos | 🟢 | ✓ check |
| V7 | Semanas en bitácora | 🟢 | ✓ check |

### Quick wins de deuda técnica
| ID | Item | Tipo | Esfuerzo |
|:--:|------|:----:|:--------:|
| DT1 | Unificar import BackendEvent | 🟢 | 🟢 |
| DT4 | Eliminar `event: any` de EventCard | 🟢 | 🟢 |
| DT5 | Fix UserDiary `event.nota` bug | 🟢 | 🟢 |
| UX2 | Estandarizar labels botones | 🟢 | 🟢 |
| UX3 | Limpieza menú (Inventario, Nutrientes) | 🟢 | 🟢 |

**Target: 12 items** (7 verificaciones + 5 quick wins)
**Tipo: todo 🟢 frontend puro**

---

## Semana 2 (10-16 Mar): CORE BITÁCORAS
**Tema:** Que las dos bitácoras (planta + general) estén completas
**Milestone:** Demo de bitácoras listo para Lautaro

| ID | Item | Tipo | Esfuerzo |
|:--:|------|:----:|:--------:|
| F3.1 | Agrupar eventos del mismo día | 🟢 | 🟡 |
| F3.2 | CambioEtapa borde destacado | 🟢 | 🟢 |
| F4.1 | Click evento → navegar a planta | 🟢 | 🟢 |
| F4.2 | Toggle orden cronológico | 🟢 | 🟡 |
| DT2 | Unificar constantes tipos | 🟢 | 🟡 |
| DT3 | Ampliar BackendEvent campos | 🟡 | 🟡 |

**Target: 6 items** (mezcla 🟢 y 🟡)

---

## Semana 3 (17-23 Mar): FEATURES MVP + AUDITORÍAS
**Tema:** Auditar integraciones y avanzar features faltantes
**Milestone:** Eventos masivos + métricas + multimedia auditados E2E

| ID | Item | Tipo | Esfuerzo |
|:--:|------|:----:|:--------:|
| F6.1 | Eventos masivos: selector sala | 🟠 | 🟡 |
| F6.2 | Riego + nutriente simultáneo | 🟠 | 🟡 |
| F8.1 | Auditar métricas E2E | 🟠 | 🟡 |
| F9.1 | Auditar notas multimedia E2E | 🟠 | 🟡 |
| F5.1 | Panel SuperAdmin | 🟡 | 🟡 |
| UX1 | Avatar con iniciales | 🟢 | 🟢 |

**Target: 6 items** (mayoría 🟠 auditoría — probablemente generen items 🔴 para Lautaro)

---

## Semana 4 (24-30 Mar): PULIR + PREPARAR AUDITORÍA
**Tema:** UX final, responsive, preparar para revisión con socio
**Milestone:** App lista para auditoría con Lautaro

| ID | Item | Tipo | Esfuerzo |
|:--:|------|:----:|:--------:|
| F7.1 | DateFilter mobile → modal | 🟢 | 🟢 |
| F7.2 | Dashboard carrusel plantas | 🟢 | 🟡 |
| F7.3 | Responsive audit general | 🟢 | 🟡 |
| UX4 | Menú perfil (LogOut, Perfil) | 🟢 | 🟡 |
| UX5 | Landing page simplificada | 🟢 | 🟢 |
| UX6 | Orden alfabético en salas | 🟢 | 🟢 |
| DT9 | staleTime React Query | 🟢 | 🟢 |

**Target: 7 items**

---

## Buffer / desborde

> Items P0 que no entraron en las 4 semanas o que dependen de resultados de auditoría:

| ID | Item | Razón |
|:--:|------|-------|
| F8.2 | Gráficos BI | Depende de resultado de F8.1 (auditoría) |
| F9.2 | Unificar NoteEvent multimedia | Depende de resultado de F9.1 (auditoría) |
| F3.3 | Semanas colapsables | P1, entra si sobra tiempo |
| UX7 | Simplificar registro planta | P1, entra si sobra tiempo |

---

## Items para Lautaro (identificados o por identificar)

| ID | Item | Estado |
|:--:|------|--------|
| DT8 | Seguridad prod: ddl-auto + env vars | 🔴 Requiere backend |
| ??? | Items que surjan de auditorías semana 3 | Por identificar |

> Template de escalación en `protocolo-proyecto/SKILL.md` sección 7.

---

## 📊 Capacidad total

| Semana | Items target | Tipo dominante |
|:------:|:-----------:|:--------------:|
| 1 | 12 | 🟢 verificación + quick wins |
| 2 | 6 | 🟢🟡 features core |
| 3 | 6 | 🟠🟡 auditoría + features |
| 4 | 7 | 🟢 UX polish |
| **Total** | **31** | — |

> [!NOTE]
> 31 items > 26 P0 porque incluye los 7 de verificación (que son rápidos, ~10 min cada uno).
> Si algún V-item falla, se convierte en item nuevo con esfuerzo real.
