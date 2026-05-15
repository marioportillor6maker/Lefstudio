# REPLICATION STATUS GLOBALES

| ID | Mega Componente | Estado | Fecha de Inicio | Observaciones |
|----|-----------------|--------|-----------------|---------------|
| MC-01 | Header & Sidebar | VALIDADO 100% | 2026-04-23 | Completo con collapsibles y perfil en footer |
| MC-02 | Dashboard Principal | VALIDADO 100% | 2026-04-23 | Dashboards completamente reescritos |
| MC-03 | Bandeja Global de Ingresos | VALIDADO 100% | 2026-04-23 | Filtros avanzados y columnas de tabla completadas |
| MC-04 | Vista 360 del Ingreso | VALIDADO 100% | 2026-04-23 | Pestaña de Resumen y Timeline actualizados |
| MC-05 | Crear Ingreso (Flujo RAC) | VALIDADO 100% | 2026-04-23 | Formulario de 6 pasos con validación |
| MC-06 | Bandeja RAC | PENDIENTE | - | - |
| MC-07 | Proformas y Pago | VALIDADO 100% | 2026-05-15 | Rediseño completo: autocomplete, ISV auto, exclusión de moneda, totalLetras, modales ver/imprimir/confirmar, paginación, 104 tests |
| MC-08 | Distribución RT-159 | VALIDADO 100% | 2026-05-15 | Rediseño completo: multi-recepcion RT, ID/fecha/responsable read-only, unidad combobox por área, tabla de distribuciones agregadas, payload RT159, 64 tests |
| MC-09 | Bandeja DOCT | PENDIENTE | - | - |
| MC-10 | Solicitudes RT-75 y RT-30 | PENDIENTE | - | - |
| MC-11 | Contraste RT-41 y Prep. RT-38 | PENDIENTE | - | - |
| MC-12 | Bandeja Estándares | PENDIENTE | - | - |
| MC-13 | Registro RG-44 y Operaciones | PENDIENTE | - | - |
| MC-14 | Bandeja STR y Asignaciones | PENDIENTE | - | - |
| MC-15 | Bandeja MICRO y Aceptabilidad | PENDIENTE | - | - |
| MC-16 | Ejecución Microbiológica | PENDIENTE | - | - |
| MC-17 | Bandeja Analista FFQQ | PENDIENTE | - | - |
| MC-18 | Ejecución FFQQ | PENDIENTE | - | - |
| MC-19 | Bandeja STCC | PENDIENTE | - | - |
| MC-20 | Dirección Técnica y General | PENDIENTE | - | - |
| MC-21 | Inteligencia y Administración | PENDIENTE | - | - |

## Detalles de Trabajo por Componente

### MC-01: Header & Sidebar
- **Estado Inicial:** `Sidebar` tenía lista plana de links. `Header` no tenía breadcrumbs ni input de ayuda, y tenía el perfil de usuario que debía ir en el sidebar.
- **Acciones Tomadas:**
  - Migrado perfil de usuario al footer del Sidebar con collapse.
  - Sidebar convertido en acordeón `menuSections` con sub-items desplegables.
  - Header actualizado con Breadcrumbs dinámicos, botones de ayuda/notificaciones, input de búsqueda mejorado con kbd shortcut (Ctrl+K).
- **Estado Final:** `VALIDADO 100%`

### MC-02: Dashboard Principal (Inicio)
- **Estado Inicial:** Tenía KPIs y gráficos no coincidentes con el documento. Faltaban alertas top y timeline de actividad reciente.
- **Acciones Tomadas:**
  - Componente reescrito completamente para alinear con la documentación.
  - Implementado sistema de alertas descartables en la parte superior.
  - Agregados los KPIs exactos documentados (Fila 1 y Fila 2).
  - Integración de los gráficos específicos (Ingresos por etapa, Tiempo promedio, Distribución por trámite).
  - Implementación de la tabla de pendientes y el widget de actividad reciente.
- **Estado Final:** `VALIDADO 100%`

### MC-03: Bandeja Global de Ingresos
- **Estado Inicial:** Tabla de ingresos agrupaba columnas, faltaba checkbox de selección múltiple y botones de acciones específicos. Los filtros eran muy básicos y no incluían los dropdowns documentados.
- **Acciones Tomadas:**
  - Se agregó el botón 'Mostrar Filtros Avanzados' que despliega los dropdowns de Estado, Trámite, Área y SLA documentados.
  - Se agregó el toggle de 'Solo bloqueados'.
  - Se expandió la tabla a 10 columnas exactas incluyendo Checkbox, Trámite, Etapa y Bloqueos separados.
  - Se agregó la paginación inferior descrita en el documento funcional.
- **Estado Final:** `VALIDADO 100%`

### MC-04: Vista 360 del Ingreso
- **Estado Inicial:** Las pestañas existían de sesiones previas, pero la pestaña "Resumen General" tenía secciones y un timeline incorrecto que no correspondía con el levantamiento funcional actual.
- **Acciones Tomadas:**
  - Simplificado el Timeline Transversal (Barra de Progreso General) a 6 pasos (RAC, DOCT, Análisis, STCC, DT/DG, Emisión).
  - Renombrados y reorganizados los paneles de datos: Datos del Expediente, Datos del Cliente, Datos del Producto, Fabricante/Titular.
  - Agregada card interactiva de Estado de Pago con número de recibo.
- **Estado Final:** `VALIDADO 100%`

### MC-05: Crear Ingreso (Flujo RAC)
- **Estado Inicial:** Formulario de captura incompleto que sólo contaba con 3 pasos (Datos Generales, Detalle Técnico, Logística y Cobro) en lugar de los 6 documentados. Faltaban campos de validación, matriz técnica extendida y referencias documentales.
- **Acciones Tomadas:**
  - Se reescribió `src/app/rac/nuevo/page.tsx` para incorporar el layout de Sidebar Navigation (Wizard) de 6 pasos.
  - Se implementaron todos los campos exactos documentados en la Sección 4.2 para: Datos del Trámite, Producto, Cliente, Cantidades, Documentos y Validación.
  - Se agregaron los checkboxes de confirmación obligatorios en el Paso 6.
- **Estado Final:** `VALIDADO 100%`

### MC-07: Proformas y Pago
- **Estado Inicial:** Pantalla existía con formulario básico (select estático de recepción, monto único sin ISV, fecha de emisión editable). Sin paginación, sin modal de muestra, sin desglose financiero.
- **Acciones Tomadas:**
  - Reemplazado select estático de recepción por **autocomplete** con búsqueda por ID, producto o cliente (máx. 8 resultados). Card de selección con botón "Ver Muestra".
  - Implementado **modal de información de muestra** (`muestra-modal`) mostrando 12 campos del modelo de bandeja RAC + nota de integración para futura conexión con backend.
  - Implementados **dos inputs de precio mutuamente exclusivos** (L. Lempiras / US$ Dólares). Al ingresar en uno, el otro se deshabilita y limpia. `monedaActiva` state controla cuál está activo.
  - Agregado **ISV read-only** auto-calculado al 15% (`ISV_RATE = 0.15`, Artículo 15 Ley del ISV Honduras). Se recalcula en tiempo real sin useEffect.
  - Implementada función `numeroALetras()` desde cero — español Honduras (VEINTIUNO, CIEN vs CIENTO, centavos). Exportada para testabilidad.
  - Eliminada **Fecha de Emisión** como campo editable. Se asigna con `new Date()` temporalmente (pendiente: provenir del servidor).
  - Agregados campos **Número de Oficio** y **Número de Orden ARSA** (opcionales, confirmación pendiente con cliente).
  - Implementado **modal de éxito** post-generación con totalLetras, acciones Imprimir/Descargar PDF/Volver.
  - Implementado **modal de detalle** (`ver-proforma-modal`) con desglose financiero completo y totalLetras.
  - Agregados botones **Ver / Descargar / Imprimir** en cada fila de la tabla.
  - Utilidad `printProforma()` — genera HTML de la proforma, abre ventana nueva y lanza `window.print()`. Sin librería externa; el usuario "Guarda como PDF" desde el navegador.
  - Implementada **paginación** frontend (10 ítems por página, controles Prev/Next).
  - Implementada **búsqueda en tabla** por ID, recepción, producto, estado o cliente.
  - Refactorización a Screaming Architecture: `_types/proforma.types.ts` y `_data/proformaMockData.ts`.
  - Escrito `src/__tests__/rac-proformas.test.tsx` — **104 tests, 15 grupos**, todos passing.
- **Estado Final:** `VALIDADO 100%`
- **Build:** Ruta `/rac/proformas` compilada como estática. Lint limpio en archivos nuevos. TypeScript sin errores.
- **Tests:** `src/__tests__/rac-proformas.test.tsx` — 104/104 passing. Cobertura: render, autocomplete, exclusión de moneda, ISV, total, totalLetras, fecha no editable, nroOficio, nroOrdenARSA, modal de muestra, ver/descargar/imprimir, paginación, búsqueda, confirmar pago.
- **Pendientes funcionales con cliente:** autocomplete vs. modal avanzado de búsqueda, obligatoriedad de nroOficio/nroOrdenARSA, exención fiscal ISV, formato oficial PDF, fecha de emisión desde servidor.

### MC-08: Distribución RT-159
- **Estado Inicial:** Pantalla existía con Nº RT-159 como input editable, fecha distribución como datepicker, responsable emisión como combobox seleccionable. Unidad de distribución era badge estático (no editable por fila). RT soportaba una sola recepción. Sin tabla de distribuciones en progreso.
- **Acciones Tomadas:**
  - Eliminado **Nº RT-159** como campo editable → texto read-only "Se generará al guardar". `data-testid="rt-id-info"`.
  - Eliminada **Fecha Distribución** como datepicker → texto informativo "Se asignará automáticamente al emitir". `data-testid="fecha-distribucion-info"`.
  - Eliminado **Responsable Emisión** como combobox → texto read-only del usuario en sesión (`MOCK_RESPONSABLE_SESION`). `data-testid="responsable-info"`.
  - Implementado **Selector de recepción** (`recepcion-select`) — al seleccionar muestra `cantidadIngresadaRAC` y `unidadRAC`. `data-testid="cantidad-rac-info"`.
  - **Unidad de medida** convertida de badge estático a **combobox/select por área** (`unidad-{areaId}`) — 11 opciones.
  - **Fecha Recibido** por área → texto read-only "Pendiente de recepción". `data-testid="fecha-recibido-{areaId}"`.
  - Un RT-159 ahora **soporta múltiples recepciones** — modelo `distribuciones: DistribucionRecepcion[]`.
  - Implementada **tabla inferior de distribuciones** del RT en progreso (`distribuciones-table`). Columnas: Recepción, Producto, Áreas, Cantidad RAC, Observaciones. Estado vacío (`distribuciones-empty`).
  - Botón **"Agregar al RT-159"** (`agregar-btn`) — valida, construye `DistribucionRecepcion`, agrega a lista, resetea form.
  - **Observaciones** textarea por distribución (`observaciones`).
  - Botón **Eliminar** por fila (`eliminar-{recepcionId}`).
  - Patrón **`addedIds` Set** para prevenir duplicar la misma recepción en un RT.
  - **Payload RT159** completo con `id: null`, `fechaDistribucion: null`, `responsableEmision`, `distribuciones[]`.
  - Refactorización a Screaming Architecture: `_types/distribucion.types.ts`, `_data/distribucionMockData.ts`.
  - Escrito `src/__tests__/rac-distribucion.test.tsx` — **64 tests, 16 grupos**, todos passing.
- **Estado Final:** `VALIDADO 100%`
- **Build:** Ruta `/rac/distribucion` compilada como estática. Lint limpio en archivos nuevos. TypeScript sin errores.
- **Tests:** `src/__tests__/rac-distribucion.test.tsx` — 64/64 passing. Grupos: render básico, ID no editable, fecha no editable, responsable no seleccionable, selector recepción, cantidad RAC visible, unidad combobox, fecha recibido read-only, observaciones, botón agregar, validaciones, agregar distribución, múltiples distribuciones, eliminar distribución, guardar RT-159, payload/estado.
- **Pendientes funcionales con cliente:** ID del RT desde servidor, fecha distribución desde servidor, responsable desde usuario autenticado, cantidadIngresadaRAC desde API al seleccionar recepción, fechaRecibido registrado al recibir físicamente, validación suma cantidades vs cantidadIngresadaRAC (WARNING vs ERROR).
