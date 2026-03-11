# 🌱 Flores Delta - Cannabis Cultivation Management System

> **Versión Actual:** Auditoría de Eventos & Cleanup UX (Marzo 2026)
> **Estado:** 🟡 Estabilizando Sincronización Frontend-Backend

Flores Delta es un sistema integral para la gestión profesional de cultivos de cannabis, diseñado para potenciar la toma de decisiones basada en datos (Data-Driven Cultivation).

[![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%203.2-green)](delta-flores/)
[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TS-blue)](FLORES-DELTA-FRONTEND/)
[![UX](https://img.shields.io/badge/UX-Vibe%20Coding-purple)](docs/audits/CHECKPOINT_DE_BALANCE_12_FEB.md)

## 🌟 Novedades (Sprint G)
*   🧙‍♂️ **Wizard de Plantas:** Creación visual y guiada de nuevas plantas.
*   📱 **Bitácora Feed:** Vista tipo "Instagram" optimizada para móviles.
*   ⚡ **Filtros Ágiles:** Navegación por botones para eventos (Riego, Poda, etc.).
*   📊 **Dashboard Vivo:** Métricas en tiempo real y alertas de riego.

## 🚀 Quick Start (Para Lautaro & Devs)

### Prerrequisitos
*   Docker Desktop (Activo y corriendo).
*   Node.js 18+.

### 1. Iniciar Backend & Base de Datos (Docker)
```bash
cd delta-flores/web
docker-compose up -d
./mvnw spring-boot:run
```
*   **Backend API:** `http://localhost:8080`
*   **Swagger:** `http://localhost:8080/swagger-ui.html`

### 2. Iniciar Frontend
```bash
cd FLORES-DELTA-FRONTEND
npm install
npm run dev
```
*   **App:** `http://localhost:5173`

### 3. Credenciales de Acceso (Admin)
*   **Email:** `admin@delta.com`
*   **Password:** `admin123`

---

## 📚 Documentación Clave
Para entender el estado actual del proyecto, revisa estos documentos en orden:

1.  [📍 STATUS UPDATE MARZO (Para Lautaro)](docs/STATUS_UPDATE_MARZO_2026.md) - **LEER PRIMERO (Sync Backend vs Frontend)**
2.  [CHECKPOINT DE BALANCE (12 Feb)](CHECKPOINT_12_FEB.md) - Resumen general de la nueva UX.
3.  [PLAN MAESTRO SPRINT G](docs/planning/PLAN_MAESTRO_SPRINT_G.md) - El futuro inmediato.
4.  [Contexto Histórico](docs/context/CONTEXTO_SPRINT_D_E_F.md) - Cómo llegamos aquí.

## 🏗️ Arquitectura
*   **Frontend:** React 18, TypeScript, Tailwind, Shadcn UI, TanStack Query.
*   **Backend:** Java Spring Boot 3.2, PostgreSQL, JWT Auth.
*   **Filosofía:** GUS (Growth, Utility, Structure).

---
**Authors:**
*   LautaroCozzi (Backend Architect)
*   NahuelBarbero (Frontend & Product)
*   Antigravity (AI Agent - Assistant)
