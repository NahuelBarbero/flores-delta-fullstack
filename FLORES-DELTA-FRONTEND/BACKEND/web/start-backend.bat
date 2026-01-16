@echo off
echo ====================================
echo INICIANDO BACKEND FLORES DELTA
echo ====================================

REM Configurar variables de entorno
set DB_PASSWORD=password
set MINIO_ACCESS_KEY=minioadmin
set MINIO_SECRET_KEY=minioadmin
set JWT_SECRET=mi-super-secreto-jwt-local-desarrollo-no-usar-en-produccion-123456789

echo.
echo Variables de entorno configuradas.
echo Iniciando Spring Boot...
echo.

REM Navegar al directorio del backend
cd /d "%~dp0"

REM Ejecutar Maven con las variables cargadas
call mvnw.cmd spring-boot:run

pause
