# 🌱 Backend - Flores Delta MVP

Sistema de gestión de cultivos de cannabis - Backend Spring Boot

---

## 🚀 Setup

### Prerequisites

- **Java 17** o superior
- **PostgreSQL 15**
- **MinIO** (opcional para desarrollo local)
- **Maven** 3.8+ (incluido con wrapper `./mvnw`)

### Installation

```bash
cd web

# Instalar dependencias y compilar
./mvnw clean install

# Ejecutar en modo desarrollo
./mvnw spring-boot:run

# O saltando tests
./mvnw spring-boot:run -DskipTests
```

El servidor arrancará en: `http://localhost:8080`

---

## ⚙️ Environment Variables

Crea un archivo `.env` basado en `.env.example` en la raíz del proyecto backend:

```bash
# Copiar template
cp .env.example .env

# Editar con tus valores
nano .env
```

**Variables requeridas:**

- `DATABASE_URL` - PostgreSQL connection string
- `DATABASE_USERNAME` - Usuario PostgreSQLdatabase
- `DATABASE_PASSWORD` - Contraseña PostgreSQL
- `JWT_SECRET` - Secret para firmar tokens JWT (mínimo 32 caracteres)
- `MINIO_URL` - URL MinIO server (opcional local: `http://localhost:9000`)
- `MINIO_ACCESS_KEY` - Access key MinIO
- `MINIO_SECRET_KEY` - Secret key MinIO

Ver `.env.example` para documentación completa.

---

## 📁 Estructura del Proyecto

```
delta-flores/
├── web/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/DeltaFlores/web/
│   │   │   │   ├── controller/    # REST Controllers
│   │   │   │   ├── service/       # Business Logic
│   │   │   │   ├── entities/      # JPA Entities
│   │   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   ├── repository/    # Database Repositories
│   │   │   │   ├── security/      # JWT, Auth Filters
│   │   │   │   └── config/        # Spring Configuration
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw              # Maven Wrapper
├── .env.example
└── README.md             # Este archivo
```

---

## 🔐 Seguridad

- **Autenticación:** JWT en cookies HttpOnly
- **Autorización:** Spring Security con roles `GROWER` / `ADMIN`
- **CSRF Protection:** Cookies `SameSite=Strict`
- **Validación:** Jakarta Bean Validation en DTOs
- **Database:** Prepared Statements (JPA previene SQL injection)

---

## 🧪 Testing

```bash
# Ejecutar todos los tests
./mvnw test

# Tests específicos
./mvnw test -Dtest=PlantaControllerTest

# Con cobertura
./mvnw test jacoco:report
```

---

## 🐳 Docker

```bash
# Build imagen
docker build -t flores-delta-backend .

# Run con compose (desde raíz del proyecto)
cd ..
docker-compose up backend
```

Ver `README-DOCKER.md` en raíz para deployment completo.

---

## 📚 API Endpoints

**Autenticación:**
- `POST /api/auth/login` - Login con credentials
- `POST /api/auth/logout` - Logout e invalidar sesión

**Plantas:**
- `GET /api/plantas` - Listar plantas del usuario
- `POST /api/plantas` - Crear nueva planta
- `GET /api/plantas/{id}` - Detalle de planta
- `PUT /api/plantas/{id}` - Actualizar planta

**Salas:**
- `GET /api/salas` - Listar salas
- `POST /api/salas` - Crear sala

**Eventos:**
- `POST /api/events/watering` - Registrar riego
- `POST /api/events/note` - Agregar nota
- `POST /api/events/photo` - Subir foto

Ver controllers en `src/main/java/DeltaFlores/web/controller/` para documentación completa.

---

## 🛠️ Troubleshooting

**Error: Port 8080 already in use**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8080 | xargs kill
```

**Error: Connection to PostgreSQL refused**
- Verificar que PostgreSQL esté corriendo
- Confirmar credenciales en `.env`
- Revisar `application.properties`

**Error: MinIO connection failed**
- MinIO es opcional para desarrollo
- Comentar endpoints que usan MinIO si no está disponible

---

## 👥 Autor

Proyecto desarrollado por el equipo Flores Delta

**Stack Tecnológico:**
- Spring Boot 3.2
- Java 21
- PostgreSQL 15
- MinIO
- JWT Authentication
- Spring Security
