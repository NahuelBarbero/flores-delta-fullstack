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

### Última sesión: 2 Mar 2026 (checkout formal)
- ✅ Creado skill global `protocolo-proyecto` (SETUP/CONTINUE/LOOP/CHECKOUT)
- ✅ Creado `IDENTIDAD_PROYECTO.md`
- ✅ Creado `MAPA_UNICO.md` — 35 items de 4 fuentes cruzadas y deduplicadas
- ✅ Creado `ROADMAP.md` — 4 semanas, 31 items planificados
- ✅ Creado workflow `/inicio-sesion` — llave de arranque automático
- ✅ Actualizado `CONTEXTO_ACTIVO.md` como punto de entrada del sistema

### Estado Actual: Auditoría del Sistema de Eventos (Mar 2026)
**Objetivo:** Alinear al 100% el tipado y renderizado del frontend con el backend real de Lautaro.
**Plan Activo:** Plan de 11 pasos documentado en `../STATUS_UPDATE_MARZO_2026.md` y `C:\Users\gabyb\.gemini\antigravity\brain\53c8512c-9916-4e45-92b5-9cfef23d3355\implementation_plan.md`
**Meta Inmediata:** Levantar la app, unificar `BackendEvent`, corregir `any` types en las cards de eventos, y auditar cada evento individual (Poda, Riego, etc.).

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
