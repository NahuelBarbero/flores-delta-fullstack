# Sprint H — Backlog: Auditoría de Formularios vs Backend

**Estado:** ⏳ PENDIENTE (no iniciar hasta cerrar Sprint G)
**Origen:** Descubierto durante Sprint G2, sesión 25 Feb 2026

## Problema Detectado

Los formularios del frontend acceden a campos que NO están declarados en las interfaces TypeScript (`BackendEvent`, `PlantaDto`). El uso de `any` oculta estos errores.

## Hallazgos Concretos

### 1. `BackendEvent` (src/interfaces/Eventos.ts) — Campos faltantes
Campos que el backend envía y el frontend USA, pero la interfaz NO declara:

| Campo | Usado en | Tipo probable |
|---|---|---|
| `tempAgua` | EventCard (WATERING) | `number?` |
| `horasLuz` | EventCard (MEASUREMENT) | `number?` |
| `humedad` | EventCard (MEASUREMENT) | `number?` |
| `temperaturaAmbiente` | EventCard (MEASUREMENT) | `number?` |
| `alturaPlanta` | EventCard (MEASUREMENT) | `number?` |
| `nutriente.descripcion` | EventCard (NUTRIENT) | `string?` |

### 2. Uso de `any` en componentes
| Archivo | Línea | Tipo actual | Debería ser |
|---|---|---|---|
| `Components/plant/EventCard.tsx` | L8 | `event: any` | `event: BackendEvent` |
| (auditar más) | | | |

### 3. Tarea Principal
Auditar TODOS los formularios de la app contra los endpoints reales del backend (PlantaService.java, EventoService.java) para garantizar que la interfaz refleja fielmente lo que el backend acepta y devuelve.

## Acción
- [ ] Ampliar `BackendEvent` con campos faltantes (verificar contra backend)
- [ ] Eliminar TODO uso de `any` en componentes que manejan eventos
- [ ] Auditar `FormularioPlanta.tsx` contra `PlantaService.java`
- [ ] Auditar `UniversalEntryForm.tsx` contra endpoints de eventos
- [ ] Verificar que los DTOs de Zod (`DTOSchemas.ts`) reflejan el backend real
