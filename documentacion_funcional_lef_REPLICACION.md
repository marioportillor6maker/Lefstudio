# SISTEMA LEF – DOCUMENTACIÓN FUNCIONAL COMPLETA

Este documento contiene el levantamiento exhaustivo del sistema LEF, basado en la exploración sistemática de todas las pantallas, módulos y flujos.

---

## 1. ESTRUCTURA Y NAVEGACIÓN GLOBAL

El sistema está organizado en tres áreas principales que conforman el Layout General:

### 1.1 Header (Cabecera Superior) [REPLICADO]
- **Breadcrumbs:** Muestra la ruta actual (ej. SistemaLEF > Inicio). [REPLICADO]
- **Título de Pantalla:** Dinámico según la vista (ej. "Panel Principal — Q.F. María Rodríguez"). [REPLICADO]
- **Barra de Búsqueda:** Campo global (Placeholder: "Buscar ingreso, producto, lote... (Ctrl+K)"). [REPLICADO]
- **Acciones Rápidas:** [REPLICADO]
  - Botón/Icono: Ayuda (Tooltip: "Ayuda"). [REPLICADO]
  - Botón/Icono: Notificaciones (Tooltip: "Notificaciones", Badge rojo con contador). [REPLICADO]

### 1.2 Sidebar (Menú de Navegación Lateral) [REPLICADO]
- **Cabecera:** Logo y texto "SistemaLEF CQFH Honduras". Botón de colapso/expansión. [REPLICADO]
- **Estructura de Enlaces:** [REPLICADO]
  - **PRINCIPAL**
    - Inicio
    - Ingresos (Desplegable: Bandeja General, Vista 360, Crear Ingreso)
  - **MÓDULOS OPERATIVOS**
    - RAC (Desplegable: Bandeja RAC, Nuevo Ingreso, Proformas y Pago, Distribución RT-159)
    - Documentación (Desplegable: Bandeja DOCT, Solicitudes RT-75, Contraste RT-41, Solicitudes RT-30, Preparación RT-38)
    - Estándares (Desplegable: Bandeja Estándares, Registro RG-44, Entrega RT-27, Rechazo RG-58, Eliminación RT-45)
    - STR (Desplegable: Bandeja STR, Registro de Muestras)
    - FFQQ (Desplegable: Bandeja FFQQ, Hoja de Trabajo, Resultados RT-88, Validaciones, Bitácora Reactivos, Control de Equipos, Métodos Analíticos, Historial Casos)
    - Microbiología (Desplegable: Bandeja MICRO, Siembra y Lectura, Resultados RT-92)
    - STCC (Desplegable: Bandeja STCC, Comité de Calidad)
  - **DIRECCIÓN**
    - Dirección Técnica (Desplegable: Bandeja DT, Resoluciones RT-200)
    - Dirección General (Desplegable: Firma Digital)
  - **INTELIGENCIA**
    - Reportes (Desplegable: Lista de Ingresos, Tiempos por Etapa, Pendientes por Área, Reanálisis, Productividad)
    - Dashboards (Desplegable: Operación General, RAC y Tiempos, FFQQ / Micro, Estado Consolidado)
  - **SISTEMA**
    - Administración (Desplegable: Usuarios, Roles y Permisos, Catálogos, Técnicas, Configuración)
    - Bitácora / Auditoría
- **Perfil (Footer del Sidebar):** Muestra iniciales ("MR"), Nombre ("Q.F. María Rodríguez"), Rol ("RAC — Recepción") y botón de "Cerrar sesión". [REPLICADO]

---

## 2. PANTALLA: DASHBOARD PRINCIPAL (INICIO) [REPLICADO]

**Identificación** [REPLICADO]
- URL/Ruta: `/dashboard-personal` (o equivalente a Inicio). [REPLICADO]
- Acceso: Pantalla inicial al iniciar sesión / Clic en "Inicio" en el Sidebar. [REPLICADO]

### 2.1 Banners de Alerta (Top Area) [REPLICADO]
Notificaciones críticas en la parte superior. Cada alerta cuenta con los botones de acción **[Ver]** y **[Descartar]**. [REPLICADO]
- **Crítica (Rojo):** "LEF-2024-00156 — Paracetamol 500mg escalado a Comité de Calidad" (Badge/Tag: DT). [REPLICADO]
- **Advertencia (Naranja):** "LEF-2024-00148 — Metformina 850mg con pago pendiente hace 10 días" (Badge/Tag: RAC). [REPLICADO]
- **Advertencia (Naranja):** "LEF-2024-00152 — RT-30 con 7 días transcurridos" (Badge/Tag: DOCT). [REPLICADO]
- **Informativa (Azul):** "LEF-2024-00149 — Auxiliar RT-84 pendiente de actualización" (Badge/Tag: STCC). [REPLICADO]

### 2.2 Indicadores KPI (Cards) [REPLICADO]
**Fila 1 (Métricas Principales Interactivas):** [REPLICADO]
- Card 1: **"Ingresos Activos"** | Valor: 24 | Comparativo: "31 en enero" | Tendencia: +3 (Verde). [REPLICADO]
- Card 2: **"Pendientes de Mi Acción"** | Valor: 7 | Comparativo: "Acción inmediata" | Tendencia: +2 (Naranja). [REPLICADO]
- Card 3: **"Bloqueos Activos"** | Valor: 5 | Comparativo: "Pago, estándar, info" | Tendencia: -1 (Verde). [REPLICADO]

**Fila 2 (Estado Operativo):** [REPLICADO]
- Card 1: **"Solicitudes de Información"** | Valor: 3 activas | Subtexto: "Rango: 7–52 días". [REPLICADO]
- Card 2: **"Reanálisis en Curso"** | Valor: 2 activos | Estado/Badge: "Crítico". [REPLICADO]
- Card 3: **"Tiempo Promedio / Etapa"** | Valor: 4.2d | Subtexto: "Meta: 5 días" | Estado/Badge: "Dentro de meta". [REPLICADO]
- Card 4: **"Carga Máx. por Analista"** | Valor: 8 casos | Subtexto: "Karla Suazo". [REPLICADO]

### 2.3 Visualización de Datos (Gráficos) [REPLICADO]
- **Gráfico de Barras Horizontales ("Ingresos por Etapa"):** Muestra la distribución de la carga de trabajo en las áreas: RAC, DOCT, EST, STR, FFQQ (mayor volumen), MICRO, STCC, DT. [REPLICADO]
- **Gráfico de Líneas ("Tiempo Promedio de Análisis"):** Muestra la evolución en semanas (S48 a S02), comparando el promedio real contra la meta estática de 5 días. [REPLICADO]
- **Gráfico de Dona ("Distribución por Trámite - Enero 2024"):** Muestra desglose: Control Calidad (12), Licitación (7), Registro San. (4), Vigilancia (5), Colaboración (3). [REPLICADO]

### 2.4 Listados y Componentes Adicionales [REPLICADO]
- **Tabla: "Ingresos Pendientes de Acción"** [REPLICADO]
  - **Columnas:** Correlativo | Producto | Cliente | Etapa | Estado | Bloqueo | Días | Acción. [REPLICADO]
  - **Datos ejemplo:** LEF-2024-00147 | Amoxicilina 500mg | SESAL | Análisis FFQQ | [Estado activo] | [Sin bloqueo] | 11 días | [Botón Acción]. [REPLICADO]
- **Widget (Timeline): "Actividad Reciente"** [REPLICADO]
  - **Contenido:** Lista cronológica de acciones de usuarios con marca de tiempo y correlativo (ej. "KS actualizó RT-38", "RP emitió RT-40"). [REPLICADO]

---

## 3. MÓDULO: INGRESOS

### 3.1 PANTALLA: Bandeja General (Bandeja Global de Ingresos) [REPLICADO]
**Identificación** [REPLICADO]
- Ruta: `/bandeja-global-de-ingresos` [REPLICADO]
- Acceso: Menú Lateral > Ingresos > Bandeja General [REPLICADO]

**Estructura General** [REPLICADO]
- **Header:** Título "Bandeja Global de Ingresos", buscador principal, botones de acción rápida. [REPLICADO]
- **Filtros:** Panel superior con filtros desplegables y toggles. [REPLICADO]
- **Contenido:** Tabla principal con listado de ingresos y paginación. [REPLICADO]

**Componentes e Interacciones** [REPLICADO]
- **Buscador (Input):** Placeholder "Buscar por correlativo, producto, lote, RS...". Permite filtrado en tiempo real. [REPLICADO]
- **Botón Filtros:** Despliega/oculta el panel de filtros avanzados. [REPLICADO]
- **Botón Exportar:** Acción para descargar la vista actual en formato Excel/CSV. [REPLICADO]
- **Botón Nuevo Ingreso:** Link primario (azul) que redirige al flujo de creación. [REPLICADO]
- **Filtro Estado (Select):** Opciones: Todos, Pdte. Pago, Distribuido RT-159, Recibido DOCT, Pdte. Información, Estándar Rechazado, Elab. RT-38, En Análisis (FFQQ/Micro), Revisión (STCC/DT/DG), Aprobado, Emitido. [REPLICADO]
- **Filtro Tipo de Trámite (Select):** Opciones: Control de Calidad, Licitación, Registro Sanitario, Vigilancia Sanitaria, Colaboración, Reanálisis. [REPLICADO]
- **Filtro Área Actual (Select):** Opciones: RAC, DOCT, STR, FFQQ, Micro, STCC, DT, DG. [REPLICADO]
- **Filtro SLA (Select):** Opciones: Todos, En tiempo, En riesgo, Vencido. [REPLICADO]
- **Toggle:** "Solo bloqueados" (Filtra ingresos con bloqueos operativos activos). [REPLICADO]

**Tabla: Listado de Ingresos** [REPLICADO]
- **Columnas:** [REPLICADO]
  1. Checkbox (Selección masiva) [REPLICADO]
  2. Correlativo (ID único, link a Vista 360) [REPLICADO]
  3. Producto / Forma Farmacéutica (Nombre y descripción) [REPLICADO]
  4. Cliente (Nombre de la entidad) [REPLICADO]
  5. Trámite (Tipo de gestión) [REPLICADO]
  6. Etapa Actual (Área donde se encuentra) [REPLICADO]
  7. Estado (Badge de color indicativo) [REPLICADO]
  8. Bloqueos (Iconos de alerta si existen) [REPLICADO]
  9. Responsable (Nombre del usuario asignado) [REPLICADO]
  10. Acciones (Botones: Ver Vista 360 -icono ojo-, Panel Lateral, Reasignar) [REPLICADO]
- **Paginación:** Selector de "Mostrar [5, 10, 20, 50] por página" y controles de navegación (Anterior, Siguiente, números). [REPLICADO]

---

### 3.2 PANTALLA: Vista 360 del Ingreso [REPLICADO]
**Identificación** [REPLICADO]
- Ruta: `/vista-360-del-ingreso` [REPLICADO]
- Acceso: Click en Correlativo o botón "Ver Vista 360" (ojo) desde cualquier bandeja. [REPLICADO]

**Estructura de Pestañas (Tabs) y Contenido** [REPLICADO]

**Pestaña 1: Resumen General** [REPLICADO]
- **Header:** Muestra Correlativo (ej. LEF-2024-XXXX), Nº Recepción, Estado Global y Responsable Actual. [REPLICADO]
- **Card de Producto:** Detalle rápido (Nombre, Lote, Cliente, Días Transcurridos). [REPLICADO]
- **Línea de Vida (Stepper):** Indicador visual del progreso desde RAC hasta Emisión. Cada etapa cambia de color (Gris: Pendiente, Azul: En curso, Verde: Completado). [REPLICADO]
- **Paneles de Datos:** Cuadrículas con "Datos del Producto", "Fabricante/Titular" y "Datos de Recepción". [REPLICADO]

**Pestaña 2: RAC / Recepción**
- **Sección Maestro (RG-41):** Datos de entrada (Fecha, Prioridad: URGENTE/NORMAL).
- **Verificación Documental (Checklist):** Requisitos (Orden de Compra, Acta de Toma de Muestra, etc.) con estados (Check verde / X roja).

**Pestaña 3: Documentación**
- **RT-75 (Solicitud de Expediente):** Historial de fechas de solicitud y respuesta.
- **RT-41 (Contraste Histórico):** Tabla con registros previos del mismo producto (Lotes, Resultados, Analistas anteriores).

**Pestaña 4: Estándar**
- **Status de Referencia:** Indica si el estándar está aceptado o rechazado (RG-44/RT-27).
- **Control de Inventario:** Barra de progreso con miligramos disponibles vs. usados.

**Pestaña 5: Análisis FFQQ**
- **Resumen de Pruebas:** Cards con métricas (Total, Completadas, En Proceso).
- **Listado RT-38:** Tabla de pruebas (Descripción, Metodología, Analista, Estado con icono).

**Pestaña 6: Microbiología**
- **Bitácora de Recepción:** Datos de integridad de la muestra y temperatura.
- **RT-74:** Resultados de recuentos y pruebas de esterilidad (si aplica).

**Pestaña 7: STCC / DT / DG**
- **Checklist de Supervisión:** Verificación técnica de cumplimiento documental.
- **Botones de Flujo:** "Liberar a DT" y "Devolver con observaciones".

---

### 3.3 PANTALLA: Crear Ingreso (Flujo RAC) [REPLICADO]
**Identificación** [REPLICADO]
- Ruta: `/rac` (o dentro del componente Nuevo Ingreso) [REPLICADO]
- Acceso: Menú Lateral > RAC > Nuevo Ingreso o Botón "Nuevo Ingreso" en Bandeja. [REPLICADO]

**Estructura del Formulario (Por Secciones)** [REPLICADO]

**Sección 1: Datos del Trámite** [REPLICADO]
- **Campos:** [REPLICADO]
  - Tipo de Trámite (Select) [REPLICADO]
  - Prioridad (Select) [REPLICADO]
  - Fecha y Hora de Recepción (Date/Time picker) [REPLICADO]
  - Mes (Select) [REPLICADO]
  - Responsable RAC (Select) [REPLICADO]
  - Requiere Pago (Select: Sí/No) [REPLICADO]

**Sección 2: Producto** [REPLICADO]
- **Campos:** [REPLICADO]
  - Nombre Genérico (Input) [REPLICADO]
  - Nombre Comercial (Input) [REPLICADO]
  - Concentración (Input) [REPLICADO]
  - Forma Farmacéutica (Select) [REPLICADO]
  - Lote (Input) [REPLICADO]
  - Fecha de Fabricación (Date picker) [REPLICADO]
  - Fecha de Vencimiento (Date picker) [REPLICADO]
  - Registro Sanitario (Input) [REPLICADO]

**Sección 3: Cliente / Ente Externo** [REPLICADO]
- **Campos:** [REPLICADO]
  - Cliente (Autocomplete/Input) [REPLICADO]
  - Solicitante (Input) [REPLICADO]
  - Fabricante (Input) [REPLICADO]
  - País (Select) [REPLICADO]
  - Titular del Registro (Input) [REPLICADO]

**Sección 4: Cantidades y Ubicación** [REPLICADO]
- **Campos:** [REPLICADO]
  - Cantidad Recibida (Input numérico) [REPLICADO]
  - Unidad (Select: Frascos, Tabletas, Ampollas, etc.) [REPLICADO]
  - Cantidad para Análisis (Input numérico) [REPLICADO]
  - Cantidad para Contramuestra (Input numérico) [REPLICADO]
  - Ubicación física (Input) [REPLICADO]

**Sección 5: Referencias Documentales** [REPLICADO]
- **Campos:** [REPLICADO]
  - Nº Orden de Compra (Input) [REPLICADO]
  - Nº Expediente (Input) [REPLICADO]
  - Nº Licitación (Input) [REPLICADO]
  - Nº Acta de Toma de Muestra (Input) [REPLICADO]
- **Acciones:** Botones "[Adjuntar]" (Upload) al lado de cada campo para cargar PDF/Imagen. [REPLICADO]

**Sección 6: Observaciones** [REPLICADO]
- **Campos:** [REPLICADO]
  - Comentarios Generales (Textarea) [REPLICADO]
  - Notas técnicas para áreas posteriores (Textarea) [REPLICADO]

**Botones de Acción (Flujo):** [REPLICADO]
- **Botón [Guardar Borrador]:** Almacena el progreso parcial. [REPLICADO]
- **Botón [Siguiente / Finalizar]:** Valida campos obligatorios y crea el registro. [REPLICADO]

---

## 4. MÓDULO: RAC (Recepción y Atención al Cliente)

### 4.1 PANTALLA: Bandeja RAC
**Identificación**
- Ruta: `/rac` (Pestaña por defecto)
- Acceso: Menú Lateral > RAC > Bandeja RAC

**Estructura General y Componentes**
- **Indicadores (Cards Superiores):**
  - **Total en RAC:** Valor: `12`.
  - **Pendiente Validación:** Valor: `3`.
  - **Pendiente Pago:** Valor: `2`.
  - **Listos para Distribuir:** Valor: `4`.
- **Filtros y Búsqueda:**
  - **Buscador (Input):** Búsqueda por producto, recepción, cliente...
  - **Filtro Estado (Dropdown):** Filtra por estados específicos de RAC (Pendiente, Validado, etc.).
  - **Botón:** "Más filtros" (despliega panel avanzado).
- **Tabla: Bandeja de Ingresos RAC:**
  - **Columnas:** Nº Recepción, Producto (Lote), Cliente, Tipo Trámite, Fecha Rec., Estado (Badge), Bloqueos (Chips).
  - **Acciones (Por fila):** Botón "Ver" (Abre Vista 360), Botón "Validar" (Check verde).

---

### 4.2 PANTALLA: Nuevo Ingreso (Formulario Multi-paso) [REPLICADO]
**Identificación** [REPLICADO]
- Ruta: `/rac` (Pestaña "Nuevo Ingreso") [REPLICADO]
- Estructura: Sidebar de navegación interna con 6 pasos obligatorios. [REPLICADO]

**Paso 1: Datos del Trámite** [REPLICADO]
- **Campos:** [REPLICADO]
  - Tipo de Trámite (Select) [REPLICADO]
  - Prioridad (Select) [REPLICADO]
  - Fecha de Recepción (Date picker) [REPLICADO]
  - Mes de Recepción (Select) [REPLICADO]
  - Hora de Recepción (Time picker) [REPLICADO]
  - Responsable RAC (Select) [REPLICADO]
  - Subtipo/Modalidad (Select) [REPLICADO]
  - Requiere Pago Previo (Select: Sí/No) [REPLICADO]
  - Estado Inicial del Producto (Textarea) [REPLICADO]

**Paso 2: Producto** [REPLICADO]
- **Campos:** [REPLICADO]
  - Nombre Comercial (Input) [REPLICADO]
  - Concentración (Input) [REPLICADO]
  - Forma Farmacéutica (Select) [REPLICADO]
  - Nº Lote (Input) [REPLICADO]
  - Fecha Fabricación (Input MM/AAAA) [REPLICADO]
  - Fecha Expiración (Date picker) [REPLICADO]
  - Registro Sanitario (Input) [REPLICADO]
  - País de Origen (Select) [REPLICADO]
  - Fabricante (Input) [REPLICADO]
  - Titular (Input) [REPLICADO]
  - Droguería (Input) [REPLICADO]
  - Representante Legal (Input) [REPLICADO]
  - Principio Activo (DCI) (Input) [REPLICADO]

**Paso 3: Cliente / Ente Externo** [REPLICADO]
- **Campos:** [REPLICADO]
  - Tipo de Cliente (Select) [REPLICADO]
  - Nombre Institución (Input) [REPLICADO]
  - Nombre Solicitante (Input) [REPLICADO]
  - Cargo (Input) [REPLICADO]
  - Teléfono (Input numérico) [REPLICADO]
  - Correo (Input email) [REPLICADO]
  - Dirección (Textarea) [REPLICADO]
  - Persona que Entrega (Input) [REPLICADO]
  - Identificación (Input) [REPLICADO]

**Paso 4: Cantidades y Ubicación** [REPLICADO]
- **Campos:** [REPLICADO]
  - Cantidad Total (Input numérico) [REPLICADO]
  - Unidad de Medida (Select) [REPLICADO]
  - Cantidad para FFQQ (Input numérico) [REPLICADO]
  - Cantidad para Microbiología (Input numérico) [REPLICADO]
  - Cantidad Muestra Biblioteca (Input numérico) [REPLICADO]
  - Cantidad Devuelta (Input numérico) [REPLICADO]
  - Ubicación Física (Input) [REPLICADO]
  - Condición Almacenamiento (Select) [REPLICADO]
  - Temperatura (°C) (Input numérico) [REPLICADO]
  - Humedad (%) (Input numérico) [REPLICADO]

**Paso 5: Referencias Documentales** [REPLICADO]
- **Campos y Adjuntos:** [REPLICADO]
  - Orden de Compra (Input) + Botón Adjuntar [REPLICADO]
  - Expediente (Input) [REPLICADO]
  - Licitación (Input) [REPLICADO]
  - Carta/Oficio (Input) + Botón Adjuntar [REPLICADO]
  - Acta de Toma de Muestra (Nº y Fecha) (Input/Date) + Botón Adjuntar [REPLICADO]
  - Contrato (Input) [REPLICADO]
  - Resolución ARSA (Input) [REPLICADO]

**Paso 6: Observaciones y Validación** [REPLICADO]
- **Campos y Controles:** [REPLICADO]
  - Observaciones Generales (Textarea) [REPLICADO]
  - Observaciones Estado Producto (Textarea) [REPLICADO]
  - Requiere Estándar (Select: Sí/No) [REPLICADO]
  - Requiere Info Adicional (Select: Sí/No) [REPLICADO]
  - **Checkboxes de Confirmación:** [REPLICADO]
    1. Verificación de documentos. [REPLICADO]
    2. Verificación de identidad. [REPLICADO]
    3. Verificación de estado físico. [REPLICADO]
    4. Veracidad de datos. [REPLICADO]

---

### 4.3 PANTALLA: Proformas y Pago
**Identificación**
- Pestaña: "Proformas y Pago" dentro del Módulo RAC.

**Estructura y Componentes**
- **Indicadores (Cards):** 
  - Proformas Emitidas (8)
  - Pagos Confirmados (6)
  - Pendientes de Pago (2)
- **Tabla: Proformas y Estado de Pago:**
  - **Columnas:** Nº Proforma, Recepción, Producto, Monto (L.), Fecha Emisión, Fecha Límite, Estado (Badge: Pagado, Pendiente, Vencido).
  - **Acciones:** Ver, Imprimir (Icono PDF), Confirmar (Abre modal de pago).
- **Formulario: Emitir Nueva Proforma:**
  - **Campos:** Recepción Asociada (Select), Tipo de Análisis (Select), Monto (Input), Fecha Emisión (Date picker), Plazo en Días (Input), Método de Pago (Select), Observaciones (Textarea).

---

### 4.4 PANTALLA: Distribución RT-159
**Identificación**
- Pestaña: "Distribución RT-159" dentro del Módulo RAC.

**Estructura del Formulario**
- **Campos Principales:** 
  - Nº RT-159 (Input autogenerado/Read-only)
  - Recepción (Select)
  - Fecha Distribución (Date picker)
  - Responsable Emisión (Read-only)
- **Sección: Distribución por Área (Grid/Tabla):**
  - **Áreas Listadas:** Documentación (DOCT), Microbiología, Muestra Biblioteca.
  - **Datos por Área:** Responsable (Select), Cantidad (Input), Unidad (Read-only), Fecha Recibo (Date picker), Estado (Badge: Recibido/Pendiente).

---

## 5. MÓDULO: DOCUMENTACIÓN (DOCT)

### 5.1 PANTALLA: Bandeja DOCT
**Identificación**
- Ruta: `/doct`
- Acceso: Menú Lateral > Documentación > Bandeja DOCT

**Estructura y Componentes**
- **Indicadores (Cards):** 
  - En DOCT (9)
  - Pdte. Expediente (3)
  - Pdte. Información (2)
  - RT-38 en Preparación (4)
- **Tabla: Control Documental de Ingresos:**
  - **Columnas:** Recepción, Producto, Recibido, RT-75 (Status Icon), RT-41 (Status Icon), RT-30 (Status Icon), RT-38 (Status Icon), Estado (Badge).
  - **Acciones:** Ver detalle (Abre Vista 360).

---

### 5.2 PANTALLA: Solicitudes RT-75 (Solicitud de Expediente)
- **Formulario de Emisión:** 
  - Recepción (Select)
  - Fecha (Date picker)
  - Solicitante (Input)
  - Dirigido a (Input)
  - Plazo (Input numérico)
  - Prioridad (Select)
  - Producto a Consultar (Read-only)
  - Observaciones (Textarea)
- **Tabla: Historial RT-75:** 
  - **Columnas:** Nº RT-75, Recepción, Producto, Fecha, Plazo, Respuesta, Historial, Estado.

---

### 5.3 PANTALLA: Contraste RT-41 (Contraste Histórico)
- **Campos Principales:** 
  - Recepción Actual (Read-only)
  - Fecha (Read-only)
  - Responsable (Read-only)
  - Nº Recepciones Previas (Contador numérico).
- **Sección: Recepciones Previas:** 
  - Cards interactivas con historial de lotes, mostrando resultados anteriores (Ej. Conforme/No Conforme).
- **Tabla de Comparación:** 
  - Compara automáticamente Producto, Fabricante y Titular entre la recepción actual y la seleccionada del historial. Muestra iconos de coincidencia (Check/Warning).

---

### 5.4 PANTALLA: Solicitudes RT-30 (Información / Estándar)
- **Formulario:** 
  - Recepción (Select)
  - Tipo de Solicitud (Select: Estándar o Información)
  - Fecha (Date picker)
  - Dirigido a (Input)
  - Plazo (Input numérico)
  - Fecha Límite (Calculada auto).
- **Lista de Ítems (Dinamica):** 
  - Listado con checkboxes para seleccionar qué se solicita (Estándares, Certificados de Análisis, Metodologías Analíticas). Badges de estado: Pendiente/Recibido.

---

### 5.5 PANTALLA: Preparación RT-38 (Expediente Analítico)
- **Campos de Cabecera:** 
  - Recepción (Select)
  - Fecha (Date)
  - Responsable (Read-only)
  - Metodología Referencia (Select: USP, BP, In-house, etc.)
  - Versión (Input)
  - Estado Expediente (Badge).
- **Sección: Pruebas Configuradas:** 
  - Cards de pruebas específicas que componen el expediente (ej. Identificación IR, HPLC, Disolución, Uniformidad de Contenido).
  - Cada card muestra: Técnica, Área Asignada, Auxiliar asociado y un Checkbox/estado de "Obligatoria".

---

### 5.6 PANTALLA: Control Expediente
- **Cards de Alertas/Pendientes:** 
  - Listado de recepciones que presentan bloqueos documentales, mostrando los días de retraso y el motivo exacto (Falta estándar, falta metodología, etc.).
- **Tabla: Pendientes de Compra — RG-39:** 
  - **Columnas:** Recepción, Ítem Requerido, Cantidad, Proveedor, Fecha Solicitud, Estado Compra (Badge).

---

## 6. MÓDULO: ESTÁNDARES DE REFERENCIA

### 6.1 PANTALLA: Bandeja Estándares
**Identificación**
- Ruta: `/estandares` (Pestaña por defecto)
- Acceso: Menú Lateral > Estándares > Bandeja Estándares

**Estructura y Componentes**
- **Indicadores (Cards):** 
  - Estándares Activos (14)
  - En Validación (2)
  - Por Vencer (3)
  - Vencidos (1)
- **Tabla: Inventario de Estándares:**
  - **Columnas:** Nº RG-44, Nombre Estándar, Lote, Certificado, Cantidad Inicial, Cantidad Actual (mg), Fecha Vencimiento, Estado (Badge: Activo, Agotado, Vencido).
  - **Acciones:** Ver Detalle.

---

### 6.2 PANTALLA: Registro RG-44 (Ingreso de Estándar)
**Estructura del Formulario**
- **Datos Principales:** 
  - Nombre del Estándar (Input)
  - Tipo de Estándar (Select: Primario, Secundario)
  - Lote (Input)
  - Nº Certificado de Análisis (Input)
  - Proveedor (Input)
- **Cantidades y Fechas:** 
  - Cantidad Recibida (mg/mL) (Input numérico)
  - Pureza / Potencia (%) (Input numérico)
  - Fecha de Recepción (Date picker)
  - Fecha de Vencimiento (Date picker)
  - Fecha de Apertura (Date picker)
- **Condiciones:** 
  - Condiciones de Almacenamiento (Select: Refrigerado, Congelado, Ambiente, Protegido luz).
  - Responsable de Custodia (Select).
- **Validación Documental (Checklist):** 
  - Certificado de Análisis adjunto (Check)
  - Verificación de pureza (Check)
  - Verificación de vencimiento (Check)
  - Condiciones de almacenamiento correctas (Check)

---

### 6.3 PANTALLA: Entrega RT-27 (Distribución)
**Estructura del Formulario**
- **Campos de Entrega:** 
  - Estándar a Entregar (Select/Autocomplete filtrado por Activos)
  - Cantidad Entregada (mg) (Input numérico)
  - Destino / Área (Select: FFQQ, Microbiología)
  - Analista Receptor (Select)
  - Fecha y Hora de Entrega (Datetime picker)
  - Temperatura al momento de entrega (°C) (Input numérico)
  - Observaciones (Textarea)
- **Flujo:** Al guardar, descuenta automáticamente la cantidad del inventario principal (RG-44).

---

### 6.4 PANTALLA: Rechazo RG-58 y Eliminación RT-45
- **Formulario Rechazo RG-58:** 
  - Motivo de Rechazo (Select: Empaque dañado, Vencido al recibir, Certificado inválido, etc.)
  - Descripción Detallada (Textarea)
  - Acción a Tomar (Select: Devolución a proveedor, Destrucción)
  - Fecha de Acción (Date picker).
- **Formulario Eliminación RT-45 (Control de Disposición):** 
  - Selección de Ítems: Lista multi-select de estándares en estado "Agotado" o "Vencido".
  - Mes/Fecha de Eliminación (Date picker)
  - Responsable de Eliminación (Select)
  - Testigo QA/QC (Select)
  - Método de Disposición (Select: Incineración, Tratamiento Químico).

---

## 7. MÓDULO: SUPERVISIÓN TÉCNICA DE REGISTRO (STR)

### 7.1 PANTALLA: Bandeja STR
**Identificación**
- Ruta: `/str`
- Acceso: Menú Lateral > STR > Bandeja STR

**Estructura General**
- **Listado de Casos en STR:** 
  - Se visualizan ingresos derivados de RAC/DOCT. 
  - Categorías/Vistas: En Revisión, Paquetes Listos, Devoluciones Activas.

---

### 7.2 PANTALLA: Control Pre-Análisis y Revisión Documental
- **Verificación de Hitos (Control Pre-Análisis):** 
  - Vista en formato Timeline/Checklist visual. Rastrea si el ingreso ya cuenta con: RG-41 (Recepción), RT-159 (Distribución), RT-75 (Expediente), RT-38 (Preparación analítica completada).
- **Formulario de Revisión Documental:** 
  - Panel para validar que todo el paquete técnico entregado por DOCT está correcto. 
  - Campos: Dictamen (Select: Conforme / No Conforme), Observaciones por Documento (Textarea).

---

### 7.3 PANTALLA: Asignaciones RT-40 (Distribución de Trabajo)
*(Nota: Incluye la funcionalidad de Asignación de Muestras).*
- **Formulario de Asignación Estratégica:** 
  - Recepción a Asignar (Select/Read-only desde tabla)
  - **Sección Área FFQQ:** Seleccionar Pruebas a asignar, Analista Primario (Select), Fecha Límite Esperada (Date picker), Prioridad Analítica (Select).
  - **Sección Área Microbiología:** Seleccionar Pruebas, Analista (Select), Fecha Límite.
  - Comentarios del Supervisor (Textarea).
- **Flujo:** Al hacer clic en "Asignar (Generar RT-40)", los casos aparecen en las bandejas respectivas de FFQQ y Micro para iniciar "Siembra" o "Hoja de Trabajo".

---

## 8. MÓDULO: MICROBIOLOGÍA

### 8.1 PANTALLA: Bandeja MICRO
**Identificación**
- Ruta: `/microbiologia`
- Acceso: Menú Lateral > Microbiología > Bandeja MICRO

**Estructura y Componentes**
- **Indicadores (Cards):** 
  - En Análisis Microbiológico (4)
  - Reportes (RT-74) Elaborados (2)
- **Tabla Operativa:** Listado de muestras asignadas mediante RT-40, mostrando Producto, Analista y Estado (Pendiente Siembra, En Incubación, En Lectura).

---

### 8.2 PANTALLA: Aceptabilidad
- **Checklist Inicial (Recepción de Muestra en el Área):** 
  - Formulario de verificación antes de iniciar el análisis.
  - Toggles/Checkboxes: ¿Integridad de sellos correcta?, ¿Cantidad suficiente?, ¿Condiciones de almacenamiento mantenidas durante traslado?
  - Si es No Conforme, despliega campo "Motivo de Rechazo Interno".

---

### 8.3 PANTALLA: Siembra y Lectura (Ejecución Microbiológica)
- **Dinámica del Formulario:** Se despliegan sub-paneles según las pruebas asignadas en el RT-38/RT-40.
- **Campos por Prueba (Ej. RTAM, RTHL, E. coli, Salmonella):** 
  - Método de Referencia (Read-only)
  - Especificación (Read-only, ej. "Ausencia en 1g")
  - Fecha y Hora de Siembra (Datetime picker)
  - Fecha y Hora de Lectura (Datetime picker)
  - Resultado Numérico (UFC/g) o Cualitativo (Input / Select: Presencia/Ausencia)
  - Cumplimiento (Select: Sí / No).

---

### 8.4 PANTALLA: Captura RT-74 (Informe de Resultados y Pre-STCC)
- **Consolidación RT-74:** 
  - Resumen automático de todos los ensayos realizados en la etapa de lectura.
  - Conclusión Final del Análisis Microbiológico (Textarea).
  - Botones de Flujo: [Guardar Avance], [Generar Vista Previa RT-74 PDF], [Finalizar Análisis].
- **Revisión Pre-STCC (Flujo Final):** 
  - Validación final que bloquea los campos tras la firma del analista. El caso se transfiere automáticamente a la bandeja de "Control de Calidad (STCC)".

---

## 9. MÓDULO: FFQQ (ANÁLISIS FÍSICO-QUÍMICO)

### 9.1 PANTALLA: Bandeja Analista (Bandeja FFQQ)
**Identificación**
- Ruta: `/ffqq` (Pestaña: Bandeja Analista)
- Acceso: Menú Lateral > FFQQ > Bandeja FFQQ

**Estructura y Componentes**
- **Indicadores (Cards):**
  - Casos Asignados (8)
  - En Análisis (5)
  - Pruebas Pendientes (23)
  - Completados Hoy (3)
- **Tabla: Casos Asignados:**
  - **Columnas:** Recepción, Producto, Pruebas Asignadas (Total), Completadas, Pendientes, Días transcurridos (SLA), Estado (Badge), Acciones.
  - **Acciones:** Botón "Analizar" (inicia el flujo de captura).

---

### 9.2 PANTALLA: Auxiliares Dinámicos (Hoja de Trabajo)
**Descripción:** Formularios técnicos dinámicos para registro de parámetros de equipos.
- **Técnicas Disponibles (Sidebar Izquierdo):** HPLC Valoración, Disolución, Espectrofotometría IR, Uniformidad.
- **Campos de Formulario (Ejemplo HPLC):**
  - Columna HPLC (Input)
  - Fase Móvil (Input)
  - Flujo mL/min (Input numérico)
  - Longitud de Onda nm (Input numérico)
  - Temperatura Columna °C (Input numérico)
  - Volumen Inyección μL (Input numérico)
  - Tiempo Retención Estándar (Input numérico)
- **Sección: Corridas de Análisis:**
  - **Botón:** "Agregar Corrida"
  - **Campos por Corrida:** Área Estándar (Input numérico), Área Muestra (Input numérico), Peso Muestra mg (Input numérico), Concentración Calculada % (Input autocalculado/manual), Cumple (Select: Sí/No).

---

### 9.3 PANTALLA: Captura RT-38 (Resultados)
**Descripción:** Expediente analítico para registrar los resultados finales numéricos.
- **Formulario por Prueba:**
  - Fecha de Ejecución (Datepicker)
  - Hora de Inicio / Final (Timepicker)
  - Resultado Numérico (Input)
  - Unidad (Select)
  - Especificación (Read-only)
  - Observaciones y Novedades Analíticas (Textarea)
- **Acciones Generales:** Botón "Guardar Resultados", Botón "Imprimir RT-38".

---

## 10. MÓDULO: STCC (SUPERVISIÓN TÉCNICA DE CONTROL DE CALIDAD)

### 10.1 PANTALLA: Bandeja STCC
**Identificación**
- Ruta: `/stcc`
- Acceso: Menú Lateral > STCC > Bandeja STCC

**Estructura y Componentes**
- **Tabla de Revisión de Calidad:**
  - **Columnas:** Recepción, Producto, RT-38 FFQQ (Status Check), RT-74 Micro (Status Check), Auxiliares (Status Check), Días en STCC, Estado, Acciones.
  - **Acciones:** Botón "Revisar" (Abre el panel de dictamen).

---

### 10.2 PANTALLA: Revisión Técnica (Dictamen Final)
- **Componentes de Verificación (Checklist del Comité):**
  - Toggle: Pruebas configuradas correctamente.
  - Toggle: Auxiliares completos y firmados.
  - Toggle: Cálculos verificados y trazables.
- **Acciones de Decisión (Side Panel):**
  - **Botón "Liberar a DT":** Aprueba el paquete y lo envía a Dirección Técnica.
  - **Botón "Devolver con Observaciones":** Rechaza el paquete (Abre campo Textarea obligatorio para justificar el rechazo y redirige a STR/Analista).

---

## 11. MÓDULO: DIRECCIÓN TÉCNICA Y GENERAL

### 11.1 PANTALLA: Decisiones Técnicas (Resoluciones RT-200)
**Identificación**
- Ruta: `/dt` > Decisiones Técnicas

**Estructura del Formulario de Resolución:**
- Tipo de Decisión (Select: Aprobar y Emitir, Exigir Re-análisis, Escalar a Comité Técnico).
- Fecha de Decisión (Date picker)
- Plazo para Resolución en días (Input numérico)
- Fundamento Técnico de la Decisión (Textarea extenso)
- Instrucciones Específicas (Textarea)
- **Botones:** "Registrar Decisión", "Imprimir".

---

### 11.2 PANTALLA: Elaboración RT-39 (Certificado Analítico Final)
- **Campos de Estructura:** 
  - Número RT-39 (Autogenerado)
  - Director Técnico Asignado (Read-only)
  - Versión (Input)
  - Estado (Badge: Borrador/Emitido)
- **Secciones de Texto Enriquecido:** Metodología Aplicada, Resultados Físico-Químicos Consolidados, Conclusión/Dictamen Legal.

---

### 11.3 PANTALLA: Revisión Final (Firma Digital) - Dirección General
**Identificación**
- Ruta: `/dg` > Revisión Final

**Estructura:**
- Vista consolidada de solo lectura (PDF preview) del Certificado Analítico Final.
- **Acción Crítica:** Botón gigante "Firma Digital y Cierre", que incrusta el sello criptográfico en el PDF y finaliza el ciclo de vida del ingreso, pasando su estado a 'Emitido'.

---

## 12. MÓDULOS: INTELIGENCIA Y SISTEMA (REPORTES Y ADMINISTRACIÓN)

### 12.1 PANTALLA: Dashboards (Panel de Inteligencia)
- **Gráficos Visibles y Componentes:**
  - **Ingresos por Etapa (Gráfico de Barras):** Visualiza el cuello de botella actual mostrando barras para RAC, DOCT, STR, FFQQ, MICRO, STCC, DT y DG.
  - **Tiempo Promedio de Análisis (Gráfico de Líneas):** Rastrea el SLA (Service Level Agreement) promedio en el tiempo contra una línea base meta.
  - **Distribución por Trámite (Gráfico de Dona):** Porcentajes de Control de Calidad, Licitación, Registro Sanitario, etc.
  - **Alertas Críticas (Panel lateral):** Lista de ingresos en riesgo de vencimiento de SLA o con bloqueos operativos.

### 12.2 PANTALLA: Administración (Usuarios, Roles y Catálogos)
**Identificación**
- Ruta: `/administracion`

**Estructura de Pestañas:**
- **Pestaña Usuarios:**
  - Tabla (ID, Nombre, Rol, Área, Estado).
  - Formulario de Nuevo Usuario: Nombre Completo, Email, Contraseña, Área Asignada (Select), Rol del Sistema (Select).
- **Pestaña Catálogos (Tablas Maestras):**
  - Listados editables para: Tipos de Trámite, Formas Farmacéuticas, Metodologías USP/BP/In-house.
- **Pestaña Configuración:**
  - **Tiempos SLA (Configurables):** Inputs numéricos independientes para "Tiempo máximo por etapa" de RAC, FFQQ, Micro, STCC, DT, DG.
  - **Configuración Institucional:** Nombre del Laboratorio (Input), Prefijo de Correlativo (ej. "LEF-2024-") (Input).

---
**FIN DEL DOCUMENTO.**


