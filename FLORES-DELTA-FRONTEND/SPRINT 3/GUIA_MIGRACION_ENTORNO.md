# Guía de Migración y Configuración de Entorno

**Proyecto:** Flores Delta
**Propósito:** Este documento proporciona una guía paso a paso para configurar un nuevo entorno de desarrollo y continuar trabajando en el proyecto "Flores Delta".

---

## 1. Paquete de Migración

Para replicar el entorno, necesitas transferir los siguientes directorios a tu nueva máquina (por ejemplo, usando Google Drive):

1.  **Directorio del Proyecto Principal (Esencial):**
    *   `C:\Users\Acer\FLORES-DELTA-FRONTEND`
    *   *Contiene todo el código fuente del frontend, el backend y los artefactos de planificación del Sprint 3.*

2.  **Directorio del Ecosistema GUS (Recomendado):**
    *   `C:\Users\Acer\GUS`
    *   *Contiene la base de datos de nuestros proyectos (`gus_index.db`) y los documentos de nuestra metodología.*

---

## 2. Prerequisitos de Software

Antes de comenzar, asegúrate de tener instalado el siguiente software en tu nueva PC:

*   **Git:** Para el control de versiones.
*   **Node.js:** Versión LTS recomendada (incluye `npm`).
*   **JDK (Java Development Kit):** Versión 21 o superior. Recomendamos **Adoptium Temurin 21**.
*   **Docker Desktop:** Para gestionar nuestra base de datos.
*   **Editor de Código:** VS Code recomendado.
*   **Gemini CLI:** Para interactuar conmigo (Gus).

---

## 3. Pasos de Configuración en la Nueva PC

Sigue estos pasos en orden para asegurar una configuración correcta.

### **Paso 1: Restaurar Archivos del Proyecto**
1.  Descarga y descomprime `FLORES-DELTA-FRONTEND` y `GUS` desde tu Drive a una ubicación de tu elección en la nueva PC (ej. `C:\Users\TuNuevoUsuario\`).
2.  **Importante:** Anota las nuevas rutas completas, ya que las necesitaremos.

### **Paso 2: Validar el Entorno Básico**
1.  Abre una nueva terminal (PowerShell o similar).
2.  Verifica que todo el software pre-requisito esté instalado y accesible ejecutando los siguientes comandos uno por uno:
    ```bash
    node -v
    npm -v
    java -version
    docker --version
    ```
    *Cada comando debe devolver un número de versión sin errores.*

### **Paso 3: Iniciar Dependencias del Backend**
1.  Inicia la aplicación **Docker Desktop**. Espera a que esté completamente en marcha.
2.  El contenedor de nuestra base de datos (`floresdelta-db`) no se migra. Necesitamos crearlo de nuevo. Ejecuta el siguiente comando en tu terminal:
    ```bash
    docker run --name floresdelta-db -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=floresdelta -p 5432:5432 -d postgres:15
    ```
    *Si recibes un error de que el nombre ya existe, primero ejecuta `docker rm floresdelta-db` y luego vuelve a intentar el comando `docker run`.*

### **Paso 4: Instalar Dependencias del Frontend**
1.  Navega en tu terminal al directorio raíz del proyecto:
    ```bash
    cd RUTA\COMPLETA\A\FLORES-DELTA-FRONTEND
    ```
2.  Instala todas las dependencias de Node.js ejecutando:
    ```bash
    npm install
    ```

### **Paso 5: Iniciar los Servidores**
Este paso requiere dos terminales separadas.

1.  **Terminal 1 (Backend):**
    *   Navega al directorio del backend: `cd RUTA\COMPLETA\A\FLORES-DELTA-FRONTEND\BACKEND\web`
    *   Ejecuta el comando para iniciar el backend en segundo plano (este comando es para PowerShell):
    ```powershell
    Start-Process powershell -ArgumentList "-NoProfile -WindowStyle Hidden -Command `".\mvnw spring-boot:run > '..\..\SPRINT 3\backend.log' 2>&1`""
    ```

2.  **Terminal 2 (Frontend):**
    *   Navega al directorio raíz del frontend: `cd RUTA\COMPLETA\A\FLORES-DELTA-FRONTEND`
    *   Ejecuta el comando para iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```

### **Paso 6: Verificación Final**
1.  Espera unos 60 segundos para que el backend se inicie por completo.
2.  Abre tu navegador web y ve a `http://localhost:8081` (el puerto que configuramos para Vite).
3.  La aplicación debería cargar y mostrar la página de Landing o Login sin errores de conexión.

---
**Una vez completados estos pasos, estarás listo para reanudar nuestro trabajo.**
