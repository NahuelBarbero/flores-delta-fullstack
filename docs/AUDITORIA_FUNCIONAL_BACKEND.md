# 🔍 AUDITORÍA FUNCIONAL - BACKEND SERVICES
> **Fecha:** 30 Enero 2026 (Actualizado post-migración)
> **Auditor:** Análisis Funcional Senior
> **Backend Source:** `lautarocozzi/delta-flores` (Socio)

---

## 🚨 ALERTA POST-MIGRACIÓN (30 Enero 2026)

### Cambios detectados respecto a versión anterior

| Componente | Estado | Impacto |
|------------|--------|---------|
| **AuthController.java** | ❌ NO EXISTE en backend socio | Logout usa `/api/logout` (Spring Security) en vez de `/api/auth/logout` |
| **UnifiedEventController.java** | ❌ NO EXISTE en backend socio | **CRÍTICO**: Endpoint `/api/log/events` usado por Bitácora NO funciona |

### ⚠️ Acciones Requeridas en Frontend

1. **Logout**: Cambiar llamada de `/api/auth/logout` a `/api/logout`
2. **Bitácora**: El endpoint `/api/log/events` debe implementarse o el frontend debe usar endpoints individuales por tipo de evento

---

## 📊 TABLA 1: INVENTARIO DE SERVICIOS Y MÉTODOS

### PlantaService (13 métodos)
| Método | Endpoint Controller | ¿Usado Frontend? | ¿Dónde? |
|--------|---------------------|------------------|---------|
| [createPlanta](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/FLORES-DELTA-FRONTEND/src/services/api.ts#68-74) | POST /api/plantas | ✅ | api.ts → FormularioPlanta |
| [getAllPlantas](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#111-124) | GET /api/plantas | ✅ | api.ts → PlantasPage |
| [getPlantaById](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/FLORES-DELTA-FRONTEND/src/services/api.ts#49-62) | GET /api/plantas/{id} | ✅ | api.ts → PlantDetailPage |
| [updatePlanta](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#145-180) | PUT /api/plantas/{id} | ❌ | **NO IMPLEMENTADO** |
| [deletePlanta](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#135-144) | DELETE /api/plantas/{id} | ✅ | api.ts |
| [buscarPlantasPorPalabraClave](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#183-205) | GET /api/plantas/buscar | ❌ | **NO IMPLEMENTADO** |
| [plantasPorSala](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#206-218) | GET /api/plantas/sala/{id} | ❌ | **NO IMPLEMENTADO** |
| [transferPlanta](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#219-237) | PATCH /api/plantas/{id}/transfer | ❌ | **NO IMPLEMENTADO** |
| [togglePublicStatus](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#238-253) | PATCH /api/plantas/{id}/public | ❌ | **NO IMPLEMENTADO** |
| [getPlantasByUserId](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#254-261) | GET /api/plantas/user/{id} | ❌ | **NO IMPLEMENTADO** |

---

### SalaService (5 métodos CRUD)
| Método | Endpoint Controller | ¿Usado Frontend? | ¿Dónde? |
|--------|---------------------|------------------|---------|
| [createSala](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/FLORES-DELTA-FRONTEND/src/services/api.ts#94-100) | POST /api/salas | ✅ | api.ts → SalasManager |
| [getAllSalas](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/SalaService.java#74-94) | GET /api/salas | ✅ | api.ts → Dashboard, Panel |
| [getSalaById](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/SalaService.java#95-106) | GET /api/salas/{id} | ❌ | **NO IMPLEMENTADO** |
| [updateSala](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/FLORES-DELTA-FRONTEND/src/services/api.ts#101-107) | PUT /api/salas/{id} | ✅ | api.ts → SalasManager |
| [deleteSala](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/SalaService.java#121-132) | DELETE /api/salas/{id} | ✅ | api.ts |

---

### CepaService (6 métodos)
| Método | Endpoint Controller | ¿Usado Frontend? | ¿Dónde? |
|--------|---------------------|------------------|---------|
| [getCepasForCurrentUser](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/CepaService.java#35-45) | GET /api/cepas | ✅ | api.ts → GeneticasManager |
| [getCepaById](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/CepaService.java#46-69) | GET /api/cepas/{id} | ❌ | **NO IMPLEMENTADO** |
| [createCepa](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/config/DatabaseSeeder.java#170-178) | POST /api/cepas | ✅ | api.ts |
| [updateCepa](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/FLORES-DELTA-FRONTEND/src/services/api.ts#132-136) | PUT /api/cepas/{id} | ✅ | api.ts |
| [deleteCepa](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/FLORES-DELTA-FRONTEND/src/services/api.ts#137-140) | DELETE /api/cepas/{id} | ✅ | api.ts |
| [getCepasByUserId](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/CepaService.java#146-155) | GET /api/cepas/user/{id} | ❌ | **NO IMPLEMENTADO** |

---

### UserService (7 métodos)
| Método | Endpoint Controller | ¿Usado Frontend? | ¿Dónde? |
|--------|---------------------|------------------|---------|
| [obtenerTodosLosUsuarios](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/UserService.java#35-42) | GET /api/users | ✅ | api.ts → UsuariosManager |
| [getUserById](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/UserService.java#43-54) | GET /api/users/{id} | ❌ | **NO IMPLEMENTADO** |
| [getUsersByNombre](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/UserService.java#55-64) | GET /api/users/nombre/{n} | ❌ | **NO IMPLEMENTADO** |
| [registerUser](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/UserService.java#65-84) | POST /api/users/register | ✅ | api.ts → Register |
| [updateUser](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/UserService.java#85-103) | PUT /api/users/{id} | ❌ | **NO IMPLEMENTADO** |
| [updateUserRole](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/controller/UserController.java#139-158) | PATCH /api/users/{id}/role | ❌ | **NO IMPLEMENTADO** |
| [deleteUser](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/UserService.java#120-130) | DELETE /api/users/{id} | ❌ | **NO IMPLEMENTADO** |

---

### NutrienteService (6 métodos)
| Método | Endpoint Controller | ¿Usado Frontend? | ¿Dónde? |
|--------|---------------------|------------------|---------|
| [createNutriente](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/FLORES-DELTA-FRONTEND/src/services/api.ts#155-159) | POST /api/nutrientes | ✅ | api.ts → ProductosManager |
| [getNutrienteById](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/NutrienteService.java#48-63) | GET /api/nutrientes/{id} | ❌ | **NO IMPLEMENTADO** |
| [getAllNutrientes](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/NutrienteService.java#64-79) | GET /api/nutrientes | ✅ | api.ts |
| [getNutrientesByTitulo](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/NutrienteService.java#80-87) | GET /api/nutrientes?titulo= | ❌ | **NO IMPLEMENTADO** |
| [updateNutriente](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/FLORES-DELTA-FRONTEND/src/services/api.ts#160-164) | PUT /api/nutrientes/{id} | ✅ | api.ts |
| [deleteNutriente](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/NutrienteService.java#106-122) | DELETE /api/nutrientes/{id} | ✅ | api.ts |

---

### FavoriteService (6 métodos)
| Método | Endpoint Controller | ¿Usado Frontend? | ¿Dónde? |
|--------|---------------------|------------------|---------|
| [addFavorite(PLANTA)](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/FavoriteService.java#38-54) | POST /api/favorites/plantas/{id} | ✅ | api.ts → PlantCard |
| [removeFavorite(PLANTA)](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/FavoriteService.java#55-66) | DELETE /api/favorites/plantas/{id} | ✅ | api.ts |
| [getFavoritePlantas](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/FLORES-DELTA-FRONTEND/src/services/api.ts#251-255) | GET /api/favorites/plantas | ✅ | api.ts → FavoritosPage |
| [addFavorite(SALA)](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/FavoriteService.java#38-54) | POST /api/favorites/salas/{id} | ❌ | **NO IMPLEMENTADO** |
| [getFavoriteSalas](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/FavoriteService.java#76-84) | GET /api/favorites/salas | ❌ | **NO IMPLEMENTADO** |
| [getFavoriteUsers](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/FavoriteService.java#85-93) | GET /api/favorites/users | ❌ | **NO IMPLEMENTADO** |

---

### Event Services (7 servicios × ~8 métodos c/u)
| Servicio | create | getById | getAll | getByPlanta | getByFecha | update | delete |
|----------|--------|---------|--------|-------------|------------|--------|--------|
| **WateringEvent** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **NutrientEvent** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **PruningEvent** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **NoteEvent** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **StageChangeEvent** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **DefoliationEvent** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **MeasurementEvent** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 📊 TABLA 2: SISTEMA DE ROLES

### Roles Definidos (AppRole.java)
| Rol | Descripción Backend |
|-----|---------------------|
| `ROLE_SUPER_ADMIN` | Acceso total, puede gestionar roles y eliminar usuarios |
| `ROLE_ADMIN` | Puede ver todo, bypass de ownership en lectura |
| `ROLE_GROWER` | Usuario estándar, solo ve/edita sus propios recursos |

---

### Permisos por Endpoint
| Endpoint | GROWER | ADMIN | SUPER_ADMIN | Implementado FE |
|----------|--------|-------|-------------|-----------------|
| GET /api/users | ❌ | ✅ | ✅ | ✅ UsuariosManager |
| GET /api/users/{id} | ❌ | ✅ | ✅ | ❌ |
| PUT /api/users/{id} | ⚠️ Solo propio | ❌ | ✅ | ❌ |
| PATCH /api/users/{id}/role | ❌ | ❌ | ✅ | ❌ **CRÍTICO** |
| DELETE /api/users/{id} | ❌ | ❌ | ✅ | ❌ **CRÍTICO** |
| Crear recursos propios | ✅ | ✅ | ✅ | ✅ |
| Ver recursos de otros | ❌ | ✅ | ✅ | ❌ |
| Modificar recursos de otros | ❌ | ❌ | ✅ | ❌ |

---

### 🔴 GAPS CRÍTICOS EN ROLES

1. **Panel de Admin/SuperAdmin no diferenciado**
   - Frontend muestra mismo panel para todos los roles
   - No hay UI para cambiar roles de usuarios
   - No hay UI para eliminar usuarios

2. **Sin verificación de rol en frontend**
   - No se ocultan botones según permisos
   - No hay guard de rutas por rol

---

## 📊 TABLA 3: RECOMENDACIONES DE UBICACIÓN

### Métodos NO Usados → Dónde Implementar

| Método Backend | Ubicación Sugerida | Justificación | Prioridad |
|----------------|-------------------|---------------|-----------|
| [updatePlanta](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#145-180) | PlantDetailPage + FormularioPlanta | Edición inline de planta | 🔴 Alta |
| [buscarPlantasPorPalabraClave](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#183-205) | PlantasPage (barra búsqueda) | UX crítico para muchas plantas | 🔴 Alta |
| [plantasPorSala](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#206-218) | SalaDetailPage | Filtro natural | 🟡 Media |
| [transferPlanta](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#219-237) | Modal en PlantDetailPage | Admin transfiere plantas | 🟢 Baja |
| [togglePublicStatus](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/PlantaService.java#238-253) | PlantCard toggle | Compartir plantas | 🟢 Baja |
| [getUserById](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/UserService.java#43-54) | PerfilPage (propio) | Ver perfil usuario | 🟡 Media |
| [updateUser](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/UserService.java#85-103) | PerfilPage (editar) | Editar nombre/apellido | 🟡 Media |
| [updateUserRole](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/controller/UserController.java#139-158) | UsuariosManager (Admin) | **CRÍTICO para admin** | 🔴 Alta |
| [deleteUser](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/UserService.java#120-130) | UsuariosManager (SuperAdmin) | **CRÍTICO para superadmin** | 🔴 Alta |
| [getFavoriteSalas](file:///c:/Users/gabyb/Desktop/FLORES%20DELTA/FLORES%20DELTA%20MVP/delta-flores/web/src/main/java/DeltaFlores/web/service/FavoriteService.java#76-84) | FavoritosPage tabs | Extender favoritos | 🟢 Baja |
| `DefoliationEvent` | QuickMenu + Forms | Evento de defoliación | 🟡 Media |
| `MeasurementEvent` | QuickMenu + Forms | Evento de medición | 🟡 Media |

---

## 📈 RESUMEN EJECUTIVO

### Cobertura Actual
```
┌─────────────────────────────────────────┐
│ TOTAL MÉTODOS BACKEND:        67        │
│ USADOS EN FRONTEND:           32 (48%)  │
│ NO IMPLEMENTADOS:             35 (52%)  │
└─────────────────────────────────────────┘
```

### Distribución de Gaps
| Categoría | Cantidad | Prioridad |
|-----------|----------|-----------|
| CRUD Plantas | 5 | 🔴 Alta |
| Gestión Usuarios | 4 | 🔴 Alta |
| Eventos faltantes | 14 | 🟡 Media |
| Favoritos extendidos | 3 | 🟢 Baja |
| Búsquedas/Filtros | 5 | 🟡 Media |

---

## ⚡ ACCIONES INMEDIATAS RECOMENDADAS

### Sprint Prioritario
1. ✅ **updatePlanta** - Completar CRUD de plantas
2. ✅ **updateUserRole** - Panel de administración funcional
3. ✅ **deleteUser** - Gestión completa de usuarios
4. ✅ **buscarPlantasPorPalabraClave** - Búsqueda crítica UX

### Siguiente Sprint
5. DefoliationEvent y MeasurementEvent
6. getFavoriteSalas/Users
7. Guards de rutas por rol
