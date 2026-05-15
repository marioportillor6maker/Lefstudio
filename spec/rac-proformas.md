# Spec: RAC / Proformas y Pago

**Ruta:** `/rac/proformas`  
**Archivo:** `src/app/rac/proformas/page.tsx`  
**Estado:** VALIDADO 100% — 2026-05-15  
**Tests:** `src/__tests__/rac-proformas.test.tsx` — 104/104 passing

---

## Propósito

Gestión de proformas de cobro y confirmación de pagos para recepciones RAC. Permite al usuario emitir una proforma vinculada a una recepción, visualizar el desglose financiero con ISV, imprimir/descargar el documento, y registrar la confirmación del pago.

---

## Estructura de archivos

```
src/app/rac/proformas/
├── page.tsx                     — Componente principal (exporta ProformasPagoPage + numeroALetras)
├── _types/proforma.types.ts     — Tipos TypeScript (ProformaGenerada, FormErrors, enums)
└── _data/proformaMockData.ts    — 3 proformas mock con ISV calculado al 15%
```

---

## Indicadores (Cards)

| Card | Color | Fuente |
|------|-------|--------|
| Proformas Emitidas | Blanco/Slate | `proformas.length` |
| Pagos Confirmados | Verde | `filter(p => p.estado === "Pagado").length` |
| Pendientes / Vencidos | Naranja | `filter(p => p.estado === "Pendiente" \|\| "Vencido").length` |

---

## Formulario: Emitir Nueva Proforma

### Recepción Asociada (requerido)
- **Control:** Input de texto con autocomplete — no select estático.
- **Filtro:** ID de recepción, nombre de producto, nombre de cliente. Máx. 8 resultados. Fuente: `mockIngresosList`.
- **Selección:** Al elegir, muestra card resumen (ID, producto, cliente) + botón "Ver Muestra" (ícono Info).
- **Limpiar:** Botón X borra selección y query.
- **Cierre dropdown:** Click fuera del componente (useEffect + mousedown listener en `autocompleteRef`).
- **Pendiente funcional:** Validar con el cliente si el autocomplete es suficiente o se requiere modal de búsqueda avanzada cuando el volumen de recepciones sea alto.

### Tipo de Análisis (requerido)
Select: `completo` / `parcial` / `micro` (Análisis Completo / Parcial / Solo Microbiología).

### Precio — exclusión mutua de moneda (requerido)
- Dos inputs paralelos: `precio-l` (Lempiras) y `precio-d` (Dólares).
- Al escribir en uno → el otro se deshabilita (`disabled`) y se limpia.
- State `monedaActiva: "L" | "$" | null` controla cuál está activo.
- Regla de negocio: no se puede guardar con ambos llenos ni ambos vacíos.

### ISV — read-only, auto-calculado
```
ISV_RATE = 0.15   // Artículo 15, Ley del ISV Honduras
isvAmount = precioBase × ISV_RATE
```
- No es un campo input — se muestra como texto read-only.
- Se recalcula en render cada vez que cambia `precioL` o `precioD`. No usa `useEffect`.
- **Pendiente funcional:** Confirmar con el cliente si los servicios del LEF están exentos de ISV según clasificación fiscal. Confirmar si la tasa debe ser configurable desde administración.

### Total y Total en Letras
```
totalAmount = precioBase + isvAmount
totalLetras = numeroALetras(totalAmount, monedaActiva)
```
- Ambos derivados en render — no son estados separados.
- `totalLetras` persiste en la proforma guardada porque se copia al objeto `ProformaGenerada.totalLetras` al momento de guardar (no se recalcula al consultar).
- Visible en tiempo real mientras el usuario escribe el precio.

### Fecha de Emisión
- **Eliminada como campo editable.** No aparece en el formulario.
- En `handleGenerar()` se asigna `new Date()` como solución temporal de mock.
- **PENDIENTE BACKEND:** En producción debe provenir del servidor al confirmar la creación de la proforma.

### Número de Oficio (opcional)
- Input texto, placeholder `OF-2026-0442`.
- Se omite del objeto `ProformaGenerada` si está vacío.
- **Pendiente funcional:** Confirmar con el cliente si debe ser obligatorio.

### Número de Orden ARSA (opcional)
- Input texto, placeholder `ARSA-2026-001`.
- Se omite del objeto `ProformaGenerada` si está vacío.
- **Pendiente funcional:** Confirmar si aplica solo para trámites ARSA.

### Otros campos
| Campo | Tipo | Default |
|-------|------|---------|
| Plazo (días) | number | 15 |
| Método de Pago | select | transferencia |
| Observaciones | textarea | — |

### Validaciones de submit
1. Recepción no seleccionada → error en `errors.recepcion`.
2. Tipo de análisis vacío → error en `errors.tipoAnalisis`.
3. Ambos precios llenos → error en `errors.precio` ("Solo puede ingresar precio en una moneda").
4. Precio cero / sin moneda → error en `errors.precio` ("Ingrese un precio mayor a cero").

---

## Tabla: Proformas Generadas

| Columna | Fuente |
|---------|--------|
| Nº Proforma | `p.id` |
| Recepción | `p.recepcionId` |
| Producto | `p.producto` (truncado, max 120px) |
| Total | `fmtProformaMonto(p)` |
| Emisión / Límite | `p.fechaEmision` + `p.fechaLimite` |
| Estado | Badge: Pagado (verde) / Pendiente (naranja) / Vencido (rojo) |
| Acciones | Ver, Descargar, Imprimir, [Confirmar Pago si pendiente/vencido] |

### Búsqueda en tabla
- Input en cabecera. Filtra por ID, recepción, producto, estado o cliente.
- Resetea la página a 1 al escribir (handler, no useEffect — ESLint compliant).

### Paginación
- `ITEMS_PER_PAGE = 10`.
- Controles Prev/Next visibles solo si `totalPages > 1`.
- `page-indicator` siempre visible: "Página N de M — X proformas".

### Acciones por fila
| Botón | testid | Acción |
|-------|--------|--------|
| Ver | `ver-btn` | Abre `ver-proforma-modal` |
| Descargar | `descargar-btn` | `printProforma(p)` |
| Imprimir | `imprimir-btn` | `printProforma(p)` |
| Confirmar Pago | `confirmar-btn` | Solo si Pendiente o Vencido. Abre `confirm-modal` |

---

## Modales

### `success-modal` — Proforma Generada
Aparece tras `handleGenerar()` exitoso. Muestra recepcionId, total, fechaLimite, totalLetras.  
Acciones: `success-imprimir`, `success-descargar`, `success-cerrar` (texto: "Volver al listado").

### `muestra-modal` — Información de la Muestra
Abre desde botón "Ver Muestra" en la card de recepción seleccionada.  
Campos mostrados (fuente: `mockIngresosList`): Nº Recepción, Fecha Ingreso, Producto, Forma Farmacéutica, Lote, Trámite, Cliente, Tipo Cliente, Etapa, Estado, Responsable, Prioridad.  
Incluye nota de integración: al conectar el backend se añadirán todos los campos de `/rac/nuevo`.

### `ver-proforma-modal` — Detalle de Proforma
Desglose: precioBase, ISV (15%), TOTAL, totalLetras (SON: ...).  
Campos: recepción, fechaEmision, producto, fechaLimite, cliente, tipoAnalisis, nroOficio?, nroOrdenARSA?, observaciones?.  
Acciones: Imprimir, Descargar PDF, Cerrar.

### `confirm-modal` — Confirmar Pago
Campos: Referencia Bancaria / Recibo, Fecha Efectiva.  
Confirmar → actualiza `estado` a `"Pagado"` en el array de proformas.  
Solo disponible para proformas en estado Pendiente o Vencido.

---

## Utilidades

### `numeroALetras(num, moneda)`
```typescript
export function numeroALetras(num: number, moneda: "L" | "$" = "L"): string
```
- Exportada desde `page.tsx` para testabilidad directa.
- Cubre: unidades (0-19), veintis (20-29 fusionados), decenas + Y, centenas (CIEN vs CIENTO), miles, millones.
- Formato: `"CUATRO MIL SEISCIENTOS LEMPIRAS 00/100"`.
- Retorna `""` para valores <= 0 o no finitos.

### `printProforma(p)`
- `window.open("", "_blank")` + HTML inline con CSS de impresión.
- `window.print()` con delay de 300ms.
- Retorna `undefined` si `window.open` retorna `null` (jsdom en tests).
- Sin librería externa (jsPDF, etc.).
- **PENDIENTE BACKEND:** Reemplazar con endpoint que genere PDF en servidor con formato oficial.

---

## Testing

**Archivo:** `src/__tests__/rac-proformas.test.tsx`  
**Total:** 104 tests — 15 grupos — 100% passing  
**Framework:** Vitest + @testing-library/react + jsdom  
**Anotación:** `// @vitest-environment jsdom`

| # | Grupo | Tests |
|---|-------|-------|
| 1 | `numeroALetras` — conversión a letras | 13 |
| 2 | Render básico | 6 |
| 3 | Recepción — autocomplete, no select estático | 11 |
| 4 | Precio — Lempiras y Dólares (exclusión mutua) | 8 |
| 5 | ISV — calculado automáticamente, no editable | 6 |
| 6 | Total — cálculo correcto y letras | 6 |
| 7 | Fecha de emisión — no editable por el usuario | 2 |
| 8 | Campos nuevos — Nro Oficio y Nro Orden ARSA | 6 |
| 9 | Validaciones de submit | 5 |
| 10 | Generación de proforma + modal de éxito | 9 |
| 11 | Modal de información de muestra asociada | 5 |
| 12 | Botones de acción en la tabla | 10 |
| 13 | Confirmar Pago | 5 |
| 14 | Paginación de la tabla | 4 |
| 15 | Búsqueda en la tabla de proformas | 5 |

**Notas de testing:**
- `window.open` retorna `null` en jsdom — `printProforma` maneja con `if (!win) return`.
- `fireEvent` (sincrónico) en lugar de `userEvent` — evita deadlock con fake timers.
- `data-testid` para elementos sin accesibilidad semántica clara.
- Mock de `next/link` vía `vi.mock`.

---

## Estado de Validación

| Check | Estado |
|-------|--------|
| Build producción | ✅ Compilado exitosamente |
| Ruta en bundle | ✅ `/rac/proformas` — estática |
| TypeScript | ✅ Sin errores |
| Lint (archivos nuevos) | ✅ 0 errores |
| Lint (proyecto global) | ⚠️ 17 errores preexistentes en otros módulos — sin relación con este cambio |
| Tests | ✅ 104/104 passing |

---

## Pendientes Funcionales (decisión del cliente)

1. **Búsqueda de recepción:** ¿Autocomplete actual es suficiente o se requiere modal avanzado con filtros por fecha, estado, área cuando el volumen sea alto?
2. **Número de Oficio:** ¿Debe ser obligatorio?
3. **Número de Orden ARSA:** ¿Aplica solo para trámites ARSA? ¿Debe ser obligatorio?
4. **ISV:** ¿Los servicios del LEF están gravados al 15% o exentos según clasificación fiscal?
5. **ISV configurable:** ¿La tasa debe ser editable desde Administración o es constante en código?
6. **PDF oficial:** ¿El documento final requiere formato institucional oficial? (si sí → reemplazar `printProforma` por endpoint servidor).
7. **Fecha de Emisión:** Confirmar que en producción siempre vendrá del servidor al crear la proforma.
