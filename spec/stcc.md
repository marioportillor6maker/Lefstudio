# Spec: Módulo STCC

## Estado
Bandeja STCC implementada. Otros tabs: placeholder.

## Reglas visuales
- Mismo patrón que Microbiología: tabs + metric cards + tabla.
- Sidebar: `bg-primary`, badge 2, sin cambios de estilo.
- Header title: "Supervisión Técnica de Control de Calidad (STCC)".

## Implementado

### `src/app/stcc/page.tsx`
- Reescrito como client component (`"use client"`).
- Tabs: "Bandeja STCC" | "Revisión FFQQ/Micro" | "Observaciones" | "Devoluciones" | "Liberación DT".
- URL sync via `useSearchParams` + `router.replace` — mismo patrón que micro.
- **Metric cards** (4): En Revisión STCC:4 / Observaciones Activas:2 / Devoluciones:1 / Listos para DT:2.
- **Tabla Bandeja STCC**: 8 cols — Recepción, Producto, RT-38 FFQQ (✓), RT-74 Micro (✓), Auxiliares (6/6), Días STCC, Estado, Acciones.
  - Estado: dot + texto, mapa de colores igual que micro.
  - Acciones: "Ver" + "Revisar" — ambos link a `/ingresos/[id]`.
- Tabs restantes muestran `TabPlaceholder`.

### `src/components/layout/Header.tsx`
- `routeTitleMap.stcc` → `"Supervisión Técnica de Control de Calidad (STCC)"`.

## Mapa de colores de estado (igual que micro)
| Estado           | Color  |
|------------------|--------|
| En Análisis FFQQ | blue   |
| Pdte. Pago       | orange |
| En Revisión STCC | purple |
| Reanálisis       | red    |
| En Revisión DG   | indigo |

## Sidebar STCC — subitems (implementado)
Los 5 tabs del módulo tienen subitem en sidebar:
- Bandeja STCC → `/stcc`
- Revisión FFQQ/Micro → `/stcc?tab=revision`
- Observaciones → `/stcc?tab=observaciones`
- Devoluciones → `/stcc?tab=devoluciones`
- Liberación DT → `/stcc?tab=liberacion`

Mismo patrón que Microbiología (query params + `useSearchParams`).

## Pendiente
- [x] Tab "Revisión FFQQ/Micro" — `TabRevisionFFQQMicro`. Layout 2 cols: card principal (3 secciones: RT-38 FFQQ, RT-74 Micro, Auxiliares Dinámicos, cada una con checklist ok/pendiente) + card lateral "Decisión STCC" (botones Liberar DT / Devolver).
- [x] Tab "Observaciones" — `TabObservaciones`. Lista de observaciones (recepción, fecha, tipo badge, texto, acciones Resolver/Responder con estado resuelta). Formulario "Nueva Observación" con Recepción, Tipo (select), textarea, botón Registrar. Estado local via `useState`.
- [x] Tab "Devoluciones" — `TabDevoluciones`. Form: Recepción, Devolver a (select: FFQQ/Micro/STR/RAC), Motivo Principal, Plazo (días), Descripción Detallada. Botón "Registrar Devolución" en `bg-danger`.
- [x] Tab "Liberación DT" — `TabLiberacionDT`. Lista 3 casos con CheckCircle2 verde, ID + producto + subtítulo "FFQQ ✓ · Micro ✓ · Auxiliares ✓ · Sin observaciones pendientes". Botón "Liberar a DT" (`bg-primary`). Click remueve caso de lista via `Set<string>` state.
- [ ] Datos mock. Conectar a fuente real cuando exista.
- [ ] "Revisar" debería ir a ruta dedicada de revisión STCC — no existe aún.
