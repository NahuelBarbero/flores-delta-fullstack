# 🌿 Identidad del Proyecto: Flores Delta MVP

## Stack
- **Frontend:** React TypeScript + Vite (`:5173`) → `FLORES-DELTA-FRONTEND/`
- **Backend:** Java Spring Boot (`:8080`) → `delta-flores/web/`
- **DB:** PostgreSQL (Docker) + MinIO (Docker)
- **UI:** Shadcn UI + Tailwind CSS
- **State:** React Query (TanStack) + Zustand

## Roles
| Persona | Rol | Responsabilidad |
|---------|-----|-----------------|
| **Nahuel** | Creativo / UX-UI / Frontend | Diseño, frontend, dirección del producto |
| **Lautaro** | Backend / Seguridad / Servidor | Backend, endpoints, DB, seguridad, decisiones técnicas |
| **Agentes IA** | Ejecutores | Codear, auditar, documentar bajo dirección de Nahuel |

## Cómo levantar
```
1. Docker Desktop → abrir
2. cd delta-flores/web && docker-compose up -d
3. cd delta-flores/web && ./mvnw spring-boot:run
4. cd FLORES-DELTA-FRONTEND && npm run dev
```

## Archivos estructurales
| Archivo | Qué es |
|---------|--------|
| `docs/context/IDENTIDAD_PROYECTO.md` | Este archivo |
| `docs/context/MAPA_UNICO.md` | Todas las tareas deduplicadas |
| `docs/context/ROADMAP.md` | Semanas con milestones |
| `docs/context/CONTEXTO_ACTIVO.md` | Entrada principal de cada sesión |
