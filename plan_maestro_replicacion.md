# Plan Maestro de Replicación LEF

## 1. Módulos Detectados
1. Estructura y Navegación Global
2. Dashboard Principal (Inicio)
3. Ingresos
4. RAC (Recepción y Atención al Cliente)
5. Documentación (DOCT)
6. Estándares de Referencia
7. Supervisión Técnica de Registro (STR)
8. Microbiología
9. FFQQ (Análisis Físico-Químico)
10. STCC (Supervisión Técnica de Control de Calidad)
11. Dirección Técnica y General
12. Módulos: Inteligencia y Sistema (Reportes y Administración)

---

## 2. Lista de Mega Componentes (Extraídos del Documento Funcional)

1. **Estructura y Navegación Global**
   - MC-01.1 Header (Cabecera Superior) [REPLICADO]
   - MC-01.2 Sidebar (Menú de Navegación Lateral) [REPLICADO]
2. **Dashboard Principal**
   - MC-02.1 Dashboard Principal (Inicio) [REPLICADO]
3. **Ingresos**
   - MC-03.1 Bandeja General (Bandeja Global de Ingresos) [REPLICADO]
   - MC-03.2 Vista 360 del Ingreso [REPLICADO]
   - MC-03.3 Crear Ingreso (Flujo RAC) [REPLICADO]
4. **RAC**
   - MC-04.1 Bandeja RAC
   - MC-04.2 Nuevo Ingreso (Formulario Multi-paso) [REPLICADO]
   - MC-04.3 Proformas y Pago
   - MC-04.4 Distribución RT-159
5. **Documentación (DOCT)**
   - MC-05.1 Bandeja DOCT
   - MC-05.2 Solicitudes RT-75 (Solicitud de Expediente)
   - MC-05.3 Contraste RT-41 (Contraste Histórico)
   - MC-05.4 Solicitudes RT-30 (Información / Estándar)
   - MC-05.5 Preparación RT-38 (Expediente Analítico)
   - MC-05.6 Control Expediente
6. **Estándares de Referencia**
   - MC-06.1 Bandeja Estándares
   - MC-06.2 Registro RG-44 (Ingreso de Estándar)
   - MC-06.3 Entrega RT-27 (Distribución)
   - MC-06.4 Rechazo RG-58 y Eliminación RT-45
7. **STR**
   - MC-07.1 Bandeja STR
   - MC-07.2 Control Pre-Análisis y Revisión Documental
   - MC-07.3 Asignaciones RT-40 (Distribución de Trabajo)
8. **Microbiología**
   - MC-08.1 Bandeja MICRO
   - MC-08.2 Aceptabilidad
   - MC-08.3 Siembra y Lectura (Ejecución Microbiológica)
   - MC-08.4 Captura RT-74 (Informe de Resultados y Pre-STCC)
9. **FFQQ**
   - MC-09.1 Bandeja Analista (Bandeja FFQQ)
   - MC-09.2 Auxiliares Dinámicos (Hoja de Trabajo)
   - MC-09.3 Captura RT-38 (Resultados)
10. **STCC**
    - MC-10.1 Bandeja STCC
    - MC-10.2 Revisión Técnica (Dictamen Final)
11. **Dirección Técnica y General**
    - MC-11.1 Decisiones Técnicas (Resoluciones RT-200)
    - MC-11.2 Elaboración RT-39 (Certificado Analítico Final)
    - MC-11.3 Revisión Final (Firma Digital) - Dirección General
12. **Inteligencia y Sistema**
    - MC-12.1 Dashboards (Panel de Inteligencia)
    - MC-12.2 Administración (Usuarios, Roles y Catálogos)

---

## 3. Checklist por Mega Componente

*(Se detallan los checklist para los componentes pendientes de replicación)*

### MC-04.1 Bandeja RAC
- [x] Componentes UI: Indicadores (Total, Pdte. Validación, Pdte. Pago, Listos para distribuir).
- [x] Filtros y Búsqueda: Buscador, Filtro Estado (Dropdown), Botón "Más filtros".
- [x] Tablas: Bandeja de Ingresos RAC (Columnas: Nº Recepción, Producto/Lote, Cliente, Tipo Trámite, Fecha Rec., Estado, Bloqueos).
- [x] Acciones/Botones: Botón "Ver" (Vista 360), Botón "Validar".

### MC-04.3 Proformas y Pago
- [x] Componentes UI: Indicadores (Proformas Emitidas, Pagos Confirmados, Pendientes de Pago).
- [x] Tablas: Proformas y Estado de Pago (Columnas: Nº Proforma, Recepción, Producto, Monto (L.), Fecha Emisión, Fecha Límite, Estado).
- [x] Acciones de Tabla: Botones "Ver", "Imprimir (PDF)", "Confirmar (Abre modal)".
- [x] Formularios: Emitir Nueva Proforma (Campos: Recepción, Tipo Análisis, Monto, Fecha Emisión, Plazo, Método Pago, Observaciones).

### MC-04.4 Distribución RT-159
- [x] Componentes UI: Título, Header del Formulario.
- [x] Campos Principales: Nº RT-159 (Read-only), Recepción (Select), Fecha Distribución (Date), Responsable Emisión (Read-only).
- [x] Sección Distribución por Área (Tabla/Grid): Áreas listadas (DOCT, Microbiología, Muestra Biblioteca).
- [x] Datos por Área: Responsable (Select), Cantidad (Input), Unidad (Read-only), Fecha Recibo (Date picker), Estado (Badge: Recibido/Pendiente).

### MC-05.1 Bandeja DOCT
- [ ] Componentes UI: Indicadores (En DOCT, Pdte. Expediente, Pdte. Información, RT-38 en Preparación).
- [ ] Tabla: Control Documental de Ingresos (Columnas: Recepción, Producto, Recibido, RT-75 (Icon), RT-41 (Icon), RT-30 (Icon), RT-38 (Icon), Estado (Badge)).
- [ ] Acciones: Botón "Ver detalle" (Icono ojo -> abre Vista 360).

### MC-05.2 Solicitudes RT-75 (Solicitud de Expediente)
- [ ] *Elaborar checklist al explorar el documento para este módulo*

### MC-05.3 Contraste RT-41 (Contraste Histórico)
- [ ] *Elaborar checklist al explorar el documento para este módulo*

### MC-05.4 Solicitudes RT-30 (Información / Estándar)
- [ ] *Elaborar checklist al explorar el documento para este módulo*

### MC-05.5 Preparación RT-38 (Expediente Analítico)
- [ ] *Elaborar checklist al explorar el documento para este módulo*

### MC-05.6 Control Expediente
- [ ] *Elaborar checklist al explorar el documento para este módulo*

*(Nota: Los checklists de los demás componentes se irán detallando en este archivo conforme avance la Fase 2 del Ciclo de Replicación).*
