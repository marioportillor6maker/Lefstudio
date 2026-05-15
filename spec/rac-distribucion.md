# Spec: RAC / Distribución RT-159

**Ruta:** `/rac/distribucion`  
**Archivo:** `src/app/rac/distribucion/page.tsx`  
**Estado:** VALIDADO 100% — 2026-05-15  
**Tests:** `src/__tests__/rac-distribucion.test.tsx` — 64/64 passing

---

## Propósito

Emisión del formulario RT-159 (Distribución de Muestras RAC). Permite configurar cómo se distribuyen las muestras de una o más recepciones RAC entre las áreas de análisis (DOCT, Microbiología, Muestra Biblioteca), y emitir el documento RT-159 que agrupa todas las distribuciones.

---

## Estructura de archivos

```
src/app/rac/distribucion/
├── page.tsx                          — Componente principal (DistribucionPage)
├── _types/distribucion.types.ts      — Tipos TypeScript
└── _data/distribucionMockData.ts     — Mock data (recepciones, unidades, áreas, sesión)
```

---

## Tipos principales

```typescript
// distribucion.types.ts
type UnidadMedida = "frascos" | "pastillas" | "viales" | "ampollas" | "cajas"
  | "tabletas" | "cápsulas" | "unidades" | "ml" | "g" | "mg";

interface AreaRow {
  id: string; name: string; cantidad: string;
  unidad: UnidadMedida | ""; responsable: string;
}

interface DistribucionRecepcion {
  recepcionId: string; producto: string; cantidadIngresadaRAC: number;
  unidadRAC: string; observaciones: string;
  distribucionPorArea: DistribucionPorArea[];
}

interface RT159Payload {
  id: null; formato: "RT-159"; fechaDistribucion: null;
  responsableEmision: string; distribuciones: DistribucionRecepcion[];
}
```

---

## Panel: Identificación del RT

| Campo | Control | Comportamiento |
|-------|---------|----------------|
| Nº RT-159 | Texto estático | "Se generará al guardar" — NO editable. `data-testid="rt-id-info"` |
| Fecha Distribución | Texto estático | "Se asignará automáticamente al emitir" — NO datepicker. `data-testid="fecha-distribucion-info"` |
| Responsable Emisión | Texto read-only | `MOCK_RESPONSABLE_SESION` del usuario en sesión — NO combobox. `data-testid="responsable-info"` |

---

## Panel: Configurar Distribución

### Selector de Recepción

- **Control:** `<select>` con opción placeholder ("Seleccionar recepción...") + 4 opciones mock.
- **Fuente:** `MOCK_RECEPCIONES_RAC` — contiene `cantidadIngresadaRAC` y `unidadRAC` que no están en el shared mockData.
- **Al seleccionar:** Muestra badge `cantidadIngresadaRAC unidadRAC`. `data-testid="cantidad-rac-info"`.
- **Restricción:** Opciones ya agregadas al RT se deshabilitan (`addedIds` Set).
- **Pendiente backend:** `cantidadIngresadaRAC` y `unidadRAC` deben venir del servidor al seleccionar.

### Tabla de Áreas (3 filas fijas)

| Área | id | Responsable por defecto |
|------|----|------------------------|
| Documentación (DOCT) | `doct` | Carlos Ruiz (DOCT) |
| Microbiología | `micro` | Dra. Ana Torres (Micro) |
| Muestra Biblioteca | `biblioteca` | Custodio STR |

Columnas por área:

| Columna | Control | testid |
|---------|---------|--------|
| Área | Texto | — |
| Responsable | Texto read-only | `responsable-{id}` |
| Cantidad | Input numérico | `cantidad-{id}` |
| Unidad | Select (11 opciones) | `unidad-{id}` |
| Fecha Recibido | Texto "Pendiente de recepción" | `fecha-recibido-{id}` |

### Observaciones

Textarea opcional. `data-testid="observaciones"`. Se incluye en el `DistribucionRecepcion` emitido.

### Botón "Agregar al RT-159"

`data-testid="agregar-btn"`. Al click ejecuta `handleAgregar()`:

1. Valida recepción seleccionada → error `recepcion`.
2. Valida al menos 1 área con cantidad > 0 y unidad seleccionada → error `areas`.
3. Valida cantidades no negativas.
4. Verifica que `recepcionId` no esté ya en `addedIds` → error `recepcion`.
5. Construye `DistribucionRecepcion` (solo áreas con cantidad > 0 y unidad).
6. Append a `distribuciones` state.
7. Resetea: `recepcionSel → null`, `areaRows → makeInitialRows()`, `observaciones → ""`, `errors → {}`.

---

## Panel: Distribuciones del RT

Tabla inferior que muestra el RT-159 en construcción.

| Columna | Fuente |
|---------|--------|
| Recepción | `recepcionId` |
| Producto | `producto` |
| Áreas con muestra | Badge con count de `distribucionPorArea.length` |
| Cantidad RAC | `cantidadIngresadaRAC unidadRAC` |
| Observaciones | `observaciones` (truncado si largo) |
| Acciones | Botón Eliminar (`eliminar-{recepcionId}`) |

**Estado vacío:** `data-testid="distribuciones-empty"` — "No hay distribuciones agregadas. Use el formulario de arriba."

**testid de tabla:** `distribuciones-table`  
**testid por fila:** `dist-row-{recepcionId}`

---

## Botones de acción principal

| Botón | testid | Comportamiento |
|-------|--------|----------------|
| Emitir RT-159 | `emitir-btn` | Valida `distribuciones.length > 0`, loguea `RT159Payload` (pendiente: POST servidor) |
| Guardar Borrador | `borrador-btn` | Loguea estado actual (pendiente: endpoint borrador) |
| Error guardar | `save-error` | Mensaje de error cuando distribuciones vacías al intentar emitir |

---

## Validaciones

| Regla | Trigger | Error |
|-------|---------|-------|
| Recepción requerida | `agregar-btn` | `errors.recepcion = "Seleccioná una recepción"` |
| Recepción duplicada | `agregar-btn` | `errors.recepcion = "Esta recepción ya fue agregada al RT"` |
| Al menos 1 área configurada | `agregar-btn` | `errors.areas = "Completá al menos un área con cantidad y unidad"` |
| Cantidad negativa | `agregar-btn` | `errors.areas = "Las cantidades no pueden ser negativas"` |
| RT sin distribuciones al emitir | `emitir-btn` | `saveError = "Debe agregar al menos una distribución antes de emitir"` |

---

## Payload RT159

```typescript
{
  id: null,                              // servidor asigna
  formato: "RT-159",
  fechaDistribucion: null,               // servidor asigna al emitir
  responsableEmision: "Q.F. María Rodríguez (RAC)",  // usuario en sesión
  distribuciones: [
    {
      recepcionId: "REC-2024-1030",
      producto: "Metformina 850mg",
      cantidadIngresadaRAC: 120,
      unidadRAC: "tabletas",
      observaciones: "",
      distribucionPorArea: [
        {
          area: "Documentación (DOCT)", areaId: "doct",
          cantidad: 5, unidad: "tabletas",
          responsable: "Carlos Ruiz (DOCT)", fechaRecibido: null
        }
      ]
    }
  ]
}
```

---

## Tests — 64 tests, 16 grupos

| Grupo | Tests | Qué verifica |
|-------|-------|--------------|
| Render básico | 6 | Header, panels, select, table, botones principales |
| ID RT no editable | 3 | Texto estático "Se generará", no input, no editable |
| Fecha no editable | 3 | Texto "Se asignará automáticamente", no datepicker |
| Responsable no seleccionable | 2 | Texto read-only del mock de sesión |
| Selector recepción | 4 | Opciones presentes, placeholder, selección, cambio |
| Cantidad RAC visible | 4 | Badge con cantidadIngresadaRAC al seleccionar recepción |
| Unidad combobox | 5 | Select por área, opciones, cambio, independencia entre áreas |
| Fecha Recibido read-only | 3 | Texto "Pendiente de recepción" por área |
| Observaciones | 3 | Textarea present, editable, se incluye en distribución |
| Botón Agregar | 3 | Presente, texto correcto, habilitado/deshabilitado |
| Validaciones | 6 | Recepción vacía, áreas vacías, cantidad negativa, duplicado |
| Agregar distribución | 8 | Happy path, reset form, tabla actualizada, payload correcto |
| Múltiples distribuciones | 4 | 2 recepciones distintas, tabla con 2 filas, payload con 2 distribuciones |
| Eliminar distribución | 4 | Botón eliminar, fila desaparece, otras filas intactas |
| Guardar RT-159 | 3 | Error si vacío, éxito con distribuciones, payload loguea |
| Payload/estado | 3 | Estructura exacta del RT159Payload con id/fecha null |

---

## Mock Data

### MOCK_RECEPCIONES_RAC (local — no en shared mockData)

| ID | Producto | Forma | Lote | Cliente | Cantidad | Unidad |
|----|----------|-------|------|---------|----------|--------|
| REC-2024-1030 | Metformina 850mg | Tableta | L-993021 | FarmaSalud S.A. | 120 | tabletas |
| REC-2024-1029 | Losartán 50mg | Tableta | L-887412 | Droguería Central | 80 | tabletas |
| REC-2024-1028 | Amoxicilina Susp. 250mg/5ml | Suspensión | L-552083 | IHSS | 48 | frascos |
| REC-2024-1024 | Ibuprofeno 400mg | Tableta | L-443110 | FarmaSalud S.A. | 200 | tabletas |

### UNIDADES_MEDIDA (11 opciones)

`frascos, pastillas, viales, ampollas, cajas, tabletas, cápsulas, unidades, ml, g, mg`

### MOCK_RESPONSABLE_SESION

`"Q.F. María Rodríguez (RAC)"` — pendiente integración auth.

---

## Pendientes funcionales (validar con cliente)

1. `id` del RT: generado en servidor — frontend no lo asigna.
2. `fechaDistribucion`: asignada por servidor al emitir — no editable.
3. `responsableEmision`: usuario autenticado en sesión (pendiente integración auth).
4. `cantidadIngresadaRAC` / `unidadRAC`: deben venir del servidor al seleccionar recepción.
5. `fechaRecibido` por área: se registra cuando el área confirma recepción física (servidor). Pendiente en frontend.
6. Validación suma de cantidades distribuidas vs `cantidadIngresadaRAC`: ¿WARNING o ERROR? Pendiente confirmar con cliente.
7. Endpoint para guardar borrador del RT-159 (actualmente solo `console.log`).
