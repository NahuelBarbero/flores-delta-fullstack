# 🌱 Flores Delta MVP

**Sistema de Gestión de Cultivo Indoor Profesional**

Aplicación full-stack para administración completa de cultivos, salas, genéticas y bitácora detallada por planta.

---

## 🚀 Stack Tecnológico

### Backend
- **Spring Boot 3.4** + Java 21
- **PostgreSQL** (base de datos)
- **MinIO** (almacenamiento S3-compatible)
- **Spring Security** + JWT
- **Docker** ready

### Frontend
- **React 18** + TypeScript
- **Vite** (build tool)
- **TanStack Query** (state management)
- **Shadcn UI** + Tailwind CSS
- **React Hook Form** + Zod

---

## 📋 Características

### ✅ Gestión Completa
- **CRUD Salas:** Administra espacios de cultivo
- **CRUD Genéticas:** Catálogo de cepas (THC, CBD, dominancia)
- **CRUD Plantas:** Seguimiento individual con etapas

### 📊 Bitácora Inteligente
- **Timeline de eventos** por planta
- **Filtros avanzados** por tipo de evento
- **Perfil expandido** con métricas clave
- **Eventos:** Riego, Nutrientes, Podas, Mediciones, Notas

### 🎨 UX Moderna
- **Mobile-first** responsive
- **Dark mode** integrado
- **Botones accesibles** (no menús ocultos)
- **Filtrado rápido** con badges clickeables

---

## 🛠️ Instalación

### Requisitos
- Docker Desktop
- Node.js 20+
- Java 21+

### 1. Clonar Repositorio
```bash
git clone [URL_REPO]
cd "FLORES DELTA MVP"
```

### 2. Iniciar Servicios Docker
```bash
docker-compose up -d
```

Esto levanta:
- PostgreSQL (puerto 5432)
- MinIO (puerto 9000/9001)

### 3. Backend
```bash
cd delta-flores/web
.\mvnw.cmd spring-boot:run   # Windows
./mvnw spring-boot:run       # Linux/Mac
```

Backend disponible en: `http://localhost:8080`

### 4. Frontend
```bash
cd FLORES-DELTA-FRONTEND
npm install
npm run dev
```

Frontend disponible en: `http://localhost:8081`

---

## 🔐 Credenciales por Defecto

**Usuario Admin:**
- Email: `admin@delta.com`
- Password: `admin123`

**MinIO:**
- User: `minioadmin`
- Password: `minioadmin`

⚠️ **Cambiar en producción**

---

## 📂 Estructura del Proyecto

```
FLORES DELTA MVP/
├── delta-flores/
│   └── web/                    # Backend Spring Boot
│       ├── src/main/java/
│       │   └── DeltaFlores/web/
│       │       ├── controller/
│       │       ├── service/
│       │       ├── repository/
│       │       ├── dto/
│       │       └── entities/
│       └── pom.xml
│
├── FLORES-DELTA-FRONTEND/      # Frontend React
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── services/
│   │   ├── interfaces/
│   │   └── schemas/
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🧪 Testing

### Backend
```bash
cd delta-flores/web
.\mvnw.cmd test
```

### Frontend
```bash
cd FLORES-DELTA-FRONTEND
npm run test
```

---

## 📦 Build Producción

### Backend
```bash
cd delta-flores/web
.\mvnw.cmd clean package -DskipTests
```

Genera: `target/web-0.0.1-SNAPSHOT.jar`

### Frontend
```bash
cd FLORES-DELTA-FRONTEND
npm run build
```

Genera: `dist/` (archivos estáticos)

---

## 🌐 Deployment

### Opción 1: Docker Compose (Recomendado)
```bash
# TODO: Crear Dockerfiles y docker-compose.prod.yml
```

### Opción 2: Manual
1. Backend: `java -jar web-0.0.1-SNAPSHOT.jar`
2. Frontend: Servir carpeta `dist/` con Nginx/Apache

---

## 🔧 Variables de Entorno

### Backend (`application.properties`)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/floresdelta
spring.datasource.username=postgres
spring.datasource.password=postgres

minio.endpoint=http://localhost:9000
minio.access-key=minioadmin
minio.secret-key=minioadmin
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:8080
```

---

## 📖 API Endpoints

### Autenticación
- `POST /api/users/login` - Login
- `POST /api/users/register` - Registro

### Plantas
- `GET /api/plantas` - Listar todas
- `GET /api/plantas/{id}` - Detalle
- `POST /api/plantas` - Crear
- `PUT /api/plantas/{id}` - Actualizar
- `DELETE /api/plantas/{id}` - Eliminar

### Eventos
- `GET /api/plantas/{id}/events` - Eventos de planta
- `POST /api/events/watering` - Registrar riego
- `POST /api/events/note` - Registrar nota
- `DELETE /api/events/{type}/{id}` - Eliminar evento

*Ver documentación completa en Swagger (próximamente)*

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

---

## 📝 Roadmap

- [ ] Swagger/OpenAPI documentation
- [ ] Dashboard con gráficos BI
- [ ] Notificaciones por email
- [ ] Export CSV/PDF de bitácoras
- [ ] App móvil (React Native)
- [ ] Multi-tenancy

---

## 📄 Licencia

Proprietary - Flores Delta © 2025

---

## 👥 Autores

- **Desarrollo:** 
- Lautaro Cozzi
- Nahuel Barbwro

---
