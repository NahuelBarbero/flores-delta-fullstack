# 🧠 CONTEXTO ACTIVO — Flores Delta MVP
## Última actualización: 2 Mar 2026
## Para continuar: "Leé docs/context/CONTEXTO_ACTIVO.md y seguí desde donde quedamos"

---

## Protocolo de sesión

**Skill:** `protocolo-proyecto` (`.gemini/antigravity/global_skills/protocolo-proyecto/SKILL.md`)
**Método:** `metodo-desarrollo` v3 (`.gemini/antigravity/global_skills/metodo-desarrollo/SKILL.md`)

```
1. Leer este archivo
2. Consultar MAPA_UNICO.md → ¿qué items están en la semana actual?
3. Seleccionar tarea → evaluar complejidad 🟢🟡🔴
4. Aplicar método → ejecutar con skills
5. Verificar con evidencia
6. Actualizar este archivo al cerrar sesión
```

---

## Archivos estructurales

| Archivo | Qué es | Estado |
|---------|--------|--------|
| `docs/context/IDENTIDAD_PROYECTO.md` | Stack, roles, cómo levantar | ✅ Creado |
| `docs/context/MAPA_UNICO.md` | Todas las tareas deduplicadas (35 items) | ✅ Creado |
| `docs/context/ROADMAP.md` | Semanas con milestones (4 semanas, 31 items) | ✅ Creado |
| `docs/context/CONTEXTO_ACTIVO.md` | Este archivo | ✅ Actualizado |

---

## Stack del proyecto
- **Backend:** Java Spring Boot (`:8080`) en `delta-flores/web/`
- **Frontend:** React TypeScript + Vite (`:5173`) en `FLORES-DELTA-FRONTEND/`
- **DB:** PostgreSQL (Docker) + MinIO (Docker)
- **Docker:** `delta-flores/web/docker-compose.yml`

## Cómo levantar
```
1. Docker Desktop → abrir
2. cd delta-flores/web && docker-compose up -d
3. cd delta-flores/web && ./mvnw spring-boot:run
4. cd FLORES-DELTA-FRONTEND && npm run dev
```

---

## Estado actual del sprint

### Última sesión: 11 Mar 2026 (checkout formal)
- ✅ **Pivot Estratégico:** Pausados los Quick Wins para realizar una **Auditoría E2E del Sistema de Eventos** (Plan de 11 pasos creado).
- ✅ **Análisis Backend:** Comparación exhaustiva entre `main` (Lautaro) y local. Descubrimiento riesgoso: 3 endpoints nuevos locales no están en `main`.
- ✅ **Limpieza Repository:** Eliminados backups pesados `.sql`, logs sueltos, rastros de Lovable AI de Vite config. 
- ✅ **Push GitHub:** 5 commits atómicos enviados a `feature/redesign-gwj-hybrid`.
- ✅ **Handover Lautaro:** Creado `STATUS_UPDATE_MARZO_2026.md` para notificarle los gaps y decisiones.

### Próxima sesión: Auditoría Eventos — Paso 1
**Objetivo Inmediato:** Levantar Docker, Backend Java y Frontend React.
**Acción 1:** Validar features E2E básicas empíricamente (V1-V7).
**Acción 2:** Aplicar ampliación de tipados a `BackendEvent` (DT3+DT1) basado en el backend corriendo vivo.

---

## Features MVP (10 confirmadas)

| # | Feature | Estado |
|:-:|---------|:------:|
| 1 | CRUD Salas, Plantas, Cepas | ✅ |
| 2 | Registrar todos los tipos de eventos | ✅ |
| 3 | Bitácora por planta visual | 🔧 |
| 4 | Bitácora general con filtros | 🔧 |
| 5 | Panel Admin/SuperAdmin | 🔧 |
| 6 | Eventos masivos (sala) | 🟠 |
| 7 | UX mobile-first | 🔧 |
| 8 | Métricas/BI | 🟠 |
| 9 | Notas multimedia | 🟠 |
| 10 | _(reservado)_ | — |

---

## Skills disponibles

| Skill | Cuándo usar |
|-------|------------|
| `protocolo-proyecto` | Inicio de proyecto o sesión |
| `metodo-desarrollo` | Clasificar y ejecutar cada tarea |
| `writing-plans` | Crear roadmap o plan de implementación |
| `executing-plans` | Ejecutar plan en batches con checkpoints |
| `brainstorming` | Features que necesitan diseño antes de codear |
| `verification-before-completion` | Antes de declarar algo terminado |
| `systematic-debugging` | Cuando algo no funciona |

---

## Archivos clave del frontend

| Archivo | Qué es |
|---------|--------|
| `src/interfaces/Eventos.ts` | Interfaz BackendEvent (fuente de verdad) |
| `src/Utils/eventTimeInfo.ts` | Utilidad temporal centralizada |
| `src/Components/plant/EventCard.tsx` | Card de evento en bitácora planta |
| `src/Components/bitacora/BitacoraFeedCard.tsx` | Card de evento en bitácora global (mobile) |
| `src/Components/bitacora/BitacoraFilterBar.tsx` | Filtros por tipo de evento |
| `src/Pages/MainLogPage.tsx` | Bitácora General |
| `src/Pages/PlantDetailPage.tsx` | Perfil de planta con bitácora |
| `src/Components/dashboard/UserDiary.tsx` | "Mi Diario" en Dashboard |
