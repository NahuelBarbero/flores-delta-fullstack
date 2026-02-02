---
description: Quick start - Begin session and check services status
---

# 🚀 INICIO DE SESIÓN

## Paso 1: Verificar Estado de Servicios

### Docker (PostgreSQL + MinIO)
```powershell
docker ps
```

Esperado:
- `postgres:15-alpine` → Puerto 5432
- `minio/minio` → Puerto 9000/9001

Si no están corriendo:
```powershell
cd "C:\Users\gabyb\Desktop\FLORES DELTA\FLORES DELTA MVP"
docker-compose up -d
```

### Backend (Spring Boot)
```powershell
cd "C:\Users\gabyb\Desktop\FLORES DELTA\FLORES DELTA MVP\delta-flores"
./mvnw spring-boot:run
```
Esperado: `Started WebApplication` en `localhost:8080`

### Frontend (Vite)
```powershell
cd "C:\Users\gabyb\Desktop\FLORES DELTA\FLORES DELTA MVP\FLORES-DELTA-FRONTEND"
npm run dev
```
Esperado: `ready` en `localhost:8081`

---

## Paso 2: Verificar Conectividad

### Health Check Backend
```
GET http://localhost:8080/api/users/check-pass
```
Esperado: Respuesta sin error

### Frontend Accesible
```
http://localhost:8081
```
Esperado: Login page visible

---

## Paso 3: Definir Foco de Sesión

Preguntar:
1. ¿Qué sprint trabajamos? (A, B, C, D, E)
2. ¿Qué item específico?
3. ¿Rol preferido? (PM, Tech Lead, QA)

---

## Paso 4: Cargar Contexto Mínimo

Solo cargar:
- `project_context.md`
- `SPRINTS/SPRINT_X/spec.md` del sprint activo

NO cargar todo el histórico.
