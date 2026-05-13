# Spec: Sidebar Menu

## Fuente de verdad
`src/lib/sidebar-menu.ts` — MENU_SECTIONS_DATA es la única fuente. El componente Sidebar.tsx importa de ahí.

## Regla de badges
- **Ingresos**: badge explícito `24` (contador de cola de trabajo, no cuenta de subitems).
- **Módulos operativos y Dirección**: SIN badge explícito. El Sidebar auto-computa `subItems.length`.
- **INTELIGENCIA / SISTEMA**: sin badge.

Nunca hardcodear badge en módulos — modificar subitems automáticamente actualiza el contador.

## Conteo canónico de subitems

| id         | label              | subitems |
|------------|--------------------|----------|
| ingresos   | Ingresos           | 3        |
| rac        | RAC                | 4        |
| doct       | Documentación      | 6        |
| est        | Estándares         | 6        |
| str        | STR                | 6        |
| ffqq       | FFQQ               | 8        |
| micro      | Microbiología      | 5        |
| stcc       | STCC               | 5        |
| dt         | Dirección Técnica  | 5        |
| dg         | Dirección General  | 1        |
| reportes   | Reportes           | 8        |
| dashboards | Dashboards         | 6        |
| admin      | Administración     | 5        |

## Regresión automática
Test: `src/__tests__/sidebar-menu.test.ts`
Ejecutar: `npm test`

### Qué valida el test
1. `subitem counts match EXPECTED_COUNTS` — si alguien agrega/elimina un subitem sin actualizar la tabla, el test falla.
2. `every subitem href starts with /` — hrefs siempre son rutas relativas válidas.
3. `no duplicate subitem hrefs within the same parent` — sin duplicados de ruta.
4. `no duplicate subitem labels within the same parent` — sin duplicados de label.
5. `ingresos keeps explicit badge 24` — el badge especial de Ingresos no se pierde.
6. `module items have no explicit badge` — no se hardcodean badges en módulos.

## Cómo agregar un subitem nuevo
1. Editar `src/lib/sidebar-menu.ts` — agregar a `subItems[]` del módulo.
2. Actualizar `EXPECTED_COUNTS[id]` en `src/__tests__/sidebar-menu.test.ts`.
3. Correr `npm test` — debe pasar.
4. El badge del módulo se actualiza automáticamente en la UI.

## Cómo agregar un módulo nuevo con badge
1. Agregar entrada en `MENU_SECTIONS_DATA` sin campo `badge`.
2. Agregar `ICON_MAP[id]` en `Sidebar.tsx`.
3. Agregar al `EXPECTED_COUNTS` en el test.
