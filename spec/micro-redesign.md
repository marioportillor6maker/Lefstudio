# Spec: Módulo Microbiología — Rediseño Visual

## Estado
Implementado parcialmente. Pendiente: refinar según feedback.

## Regla confirmada
- **Sidebar**: mantener color `bg-primary` (#025f85) — igual que el sistema actual (imagen 2). NO cambiar a dark navy.

---

## Cambios implementados

### `src/app/micro/page.tsx`
- Eliminado `<h1>` y párrafo descripción — el Header provee el título.
- **Tabs**: "Bandeja Micro" | "Aceptabilidad" | "Ejecución Microbiológica" | "Captura RT-74" | "Revisión Pre-STCC". Estado activo via `useState<TabKey>`. Underline `border-b-2 border-primary` en activo.
- **Metric cards** (4 columnas): fondo blanco, borde `border-slate-200`, número `text-[28px] font-bold text-slate-900`, label `text-sm text-slate-500`. Sin fondos de colores pesados.
- **Tabla "Casos en Microbiología"**: 9 columnas — Recepción, Producto, Forma Farm., Aceptabilidad, Análisis, RT-74, Días, Estado, Acciones.
  - Aceptabilidad: ícono `CheckCircle2` verde.
  - Análisis: dot verde + "En curso".
  - RT-74: ícono `Clock` ámbar.
  - Estado: dot de color + texto (ver mapa de colores).
  - Acciones: link compacto `FileText + "Analizar"`, NO botón grande.

**Mapa de colores de estado:**
| Estado               | Color    |
|----------------------|----------|
| En Análisis FFQQ     | blue     |
| Pdte. Pago           | orange   |
| En Revisión STCC     | purple   |
| Reanálisis           | red      |
| En Revisión DG       | indigo   |
| Pdte. Información    | amber    |

### `src/components/layout/Sidebar.tsx`
- Color: **bg-primary** (sin cambio de fondo — confirmado por usuario).
- Badges numéricos agregados: RAC:3, Documentación:6, Estándares:2, STR:2, FFQQ:8, Microbiología:3, STCC:2, DT:2, DG:1, Ingresos:24.
- Badge style: `bg-accent/20 text-accent text-[10px] font-bold px-1.5 py-0.5 rounded-full`.
- Logo: ícono `Leaf` en cuadrado `bg-accent`, "SistemaLEF" + "CQFH Honduras".
- Detección de ruta activa via `usePathname` — ítem activo: `bg-white/10 text-white`, ícono `text-accent`.
- Interfaces TypeScript explícitas: `MenuItem`, `SubItem`, `MenuSection`.
- Width: `w-[220px]` expandido, `w-[70px]` colapsado.

### `src/components/layout/Header.tsx`
- `routeTitleMap.micro` → `"Análisis Microbiológico"`.
- Nuevo `breadcrumbDisplayMap` — muestra "Microbiología" en breadcrumb (con tilde), no "Micro".
- Acentos corregidos en todos los módulos (Estándares, Documentación, etc.).
- Badge notificaciones: 3 → 4.

---

## Pendiente / decisiones abiertas

- [ ] Sidebar color definitivo: actualmente `bg-primary` (#025f85). Si se quiere el dark navy de la ref 1, cambiar a `bg-[#1b2333]`.
- [x] Tab "Aceptabilidad" implementado — `TabAceptabilidad` component en `page.tsx`. Form completo con criterios, decisión, USP, observaciones, acciones.
- [x] Tab "Ejecución Microbiológica" implementado — `TabEjecucion` en `page.tsx`. Metadata grid 2×3, 6 pruebas microbiológicas con inputs (Fecha Siembra, Fecha Lectura, Resultado, Cumple Espec.), observaciones, botones Guardar Resultados / Elaborar RT-74.
- [x] Tab "Captura RT-74" implementado — `TabCapturaRT74` en `page.tsx`. Metadata grid 2×3 (N° RT-74 auto, Recepción, Fecha Elaboración, Analista, Supervisor, Versión), tabla resumen 6 pruebas (Resultado, Cumple select, Observaciones), Conclusión + Categoría selects, textarea, botones Finalizar RT-74 / Enviar a STCC / Imprimir RT-74.
- [x] Tab "Revisión Pre-STCC" implementado — `TabRevisionPreSTCC` en `page.tsx`. Lista de 5 casos con ID, producto, analista, lote, badge de estado, botón "Enviar STCC" y ojo que navega a `/ingresos/[id]` (ruta real confirmada: `src/app/ingresos/[id]/page.tsx`).
- [ ] Datos de la tabla son mock estático. Conectar a fuente real cuando exista.
- [ ] Ruta `/micro/caso/[id]` no existe aún — el link "Analizar" apunta ahí.
