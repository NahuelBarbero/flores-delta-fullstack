---
description: flores-delta - Stack y contexto del proyecto
---

# 📦 CONTEXTO FLORES DELTA

## Stack Técnico
| Capa | Tecnología | Versión |
|------|------------|---------|
| Backend | Spring Boot | 3.x |
| Java | OpenJDK | 21 (objetivo) |
| Database | PostgreSQL | 15 |
| Storage | MinIO | latest |
| Frontend | React + Vite | 18 / 5.x |
| Styling | Tailwind CSS | 3.x |
| State | React Query | 5.x |
| Types | TypeScript | 5.x |

## Rutas Clave
```
FLORES DELTA MVP/
├── delta-flores/           # Backend Spring Boot
│   └── web/src/main/java/DeltaFlores/web/
├── FLORES-DELTA-FRONTEND/  # Frontend React/Vite
│   └── src/
├── docker-compose.yml      # PostgreSQL + MinIO
└── .gemini/skills/         # Skills de este proyecto
```

## Archivos de Contexto
```
brain/c3b4ab07.../
├── project_context.md          # Estado global
├── ANALISIS_NOTION_20_PUNTOS.md # Requerimientos de Lautaro
├── AUDITORIA_FUNCIONAL_BACKEND.md # Métodos backend vs frontend
└── SPRINTS/                    # Specs por sprint
```

## Comandos Frecuentes

### Levantar Todo
```powershell
# Terminal 1: Docker
docker-compose up -d

# Terminal 2: Backend
cd delta-flores && ./mvnw spring-boot:run

# Terminal 3: Frontend
cd FLORES-DELTA-FRONTEND && npm run dev
```

### Verificar Estado
```powershell
docker ps                          # Containers
curl localhost:8080/api/users/check-pass  # Backend
# Frontend: http://localhost:8081
```

## Rama de Trabajo
- **Activa:** `feature/redesign-gwj-hybrid`
- **Main:** Legacy (no tocar)
