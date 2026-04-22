// ==========================================
// LEF System – Expanded Mock Data Layer
// Covers full process cycle per Especificación Arquitectura
// ==========================================

export const mockIngreso360 = {
  id: "REC-2024-1020",
  consecutivo: 847,
  estado: "Pendiente Estándar",
  subestado: "RT-30 Emitido — Esperando respuesta del cliente",
  tramite: "Registro Sanitario (ARSA)",
  urgencia: "Normal",
  prioridad: "Media",
  cliente: "Laboratorios Industriales S.A.",
  clienteTipo: "ARSA",
  contactoCliente: "Lic. María Elena Gómez — Tel. 2238-5544",
  responsableActual: { nombre: "Dr. Edil Ballesteros", rol: "DOCT", area: "Documentación Técnica" },
  fechaRecepcion: "12/04/2024",
  fechaRegistro: "12/04/2024 09:05",
  fechaPagoAnalisis: "12/04/2024 10:25",
  fechaPagoEstandar: "-",
  mesRecepcion: "Abril 2024",
  diasEnProceso: 5,
  slaRestante: "55 días calendario (de 60 para estándar)",
  bloqueos: [
    { tipo: "Falta de Estándar", descripcion: "Estándar USP de Paracetamol no provisto por el cliente. RT-30 emitido.", severidad: "Crítico" }
  ],
  producto: {
    nombreComercial: "Paracetamol 500mg",
    nombreGenerico: "Acetaminofén",
    formaFarmaceutica: "Tableta",
    concentracion: "500 mg",
    presentacion: "Caja x 100 Tabletas",
    lote: "L-847291",
    vencimiento: "2026-12",
    fechaFabricacion: "2024-01",
    registroSanitario: "HN-M-10293",
    fabricante: "PharmaCorp International",
    titular: "Laboratorios Industriales S.A.",
    drogueria: "DrogueSalud Honduras",
    representante: "Lic. Carlos Mendoza",
    paisOrigen: "India",
  },
  muestras: {
    cantidadRecibida: "120 Tabletas",
    cantidadFFQQ: "60 Tabletas",
    cantidadMicro: "40 Tabletas",
    cantidadMuestroteca: "20 Tabletas",
    ubicacionEstante: "E-3 / N-2",
    distribucion: [
      { area: "Físico-Químico", cantidad: "60 Tabletas", estado: "Entregado", fechaEntrega: "13/04/2024" },
      { area: "Microbiología", cantidad: "40 Tabletas", estado: "Entregado", fechaEntrega: "13/04/2024" },
      { area: "Muestroteca (Retención)", cantidad: "20 Tabletas", estado: "Almacenado", fechaEntrega: "12/04/2024" }
    ]
  },
  logistica: {
    proforma: { numero: "PROF-2024-0412", monto: "L. 12,500.00", estadoPago: "Pagado", fechaPago: "12/04/2024 10:25", factura: "FAC-2024-1180" },
    condicionAlmacenamiento: "Temperatura Ambiente (15–25°C)",
    estadoProducto: "Bueno — Sin observaciones visibles",
    observacionEstado: "Empaque íntegro, etiquetas legibles, condiciones de transporte adecuadas."
  },
  expediente: {
    numeroExpediente: "EXP-10293-A",
    tieneHistorial: true,
    ingresosAnteriores: 3,
    ultimoIngreso: { id: "REC-2023-0847", fecha: "15/08/2023", resultado: "Aprobado" },
    estadoRT75: "Emitido — Archivo respondió",
    estadoRT41: "Historial disponible — 3 ingresos previos",
    estadoRT30: "Emitido — Pendiente respuesta (55 días restantes)",
    contenidoExpediente: [
      "Fórmula Cualitativa-cuantitativa",
      "Metodología analítica completa",
      "Certificado de análisis del producto terminado",
      "Certificado de Registro Sanitario",
    ],
    faltantes: ["Estándar primario o secundario trazable con su respectivo certificado de análisis"],
  },
  // Rocket-inspired full narrative timeline (18 events covering entire cycle)
  timeline: [
    { fecha: "12/04/2024 08:45", actor: "Aracely Sevilla", rol: "ERAC", accion: "Muestra y documentación recibida del cliente", documento: null, icono: "ingreso" },
    { fecha: "12/04/2024 08:55", actor: "Aracely Sevilla", rol: "ERAC", accion: "Documentación mínima validada — Trámite clasificado como ARSA", documento: null, icono: "validacion" },
    { fecha: "12/04/2024 09:05", actor: "Aracely Sevilla", rol: "ERAC", accion: "Ingreso registrado en sistema — N° Recepción REC-2024-1020 asignado", documento: "RG-41", icono: "registro" },
    { fecha: "12/04/2024 09:10", actor: "Aracely Sevilla", rol: "ERAC", accion: "Muestra etiquetada y expediente inicial generado", documento: "RG-13, RG-72", icono: "documento" },
    { fecha: "12/04/2024 09:30", actor: "Aracely Sevilla", rol: "ERAC", accion: "Proforma de análisis emitida al cliente — L. 12,500.00", documento: "Proforma", icono: "pago" },
    { fecha: "12/04/2024 10:25", actor: "Sistema Contable CQFH", rol: "Sistema", accion: "Pago confirmado — Factura FAC-2024-1180 emitida", documento: "Factura", icono: "pago" },
    { fecha: "12/04/2024 10:40", actor: "Aracely Sevilla", rol: "ERAC", accion: "RT-159 emitido — Muestras distribuidas a DOCT (60 uds.) y Microbiología (40 uds.)", documento: "RT-159", icono: "distribucion" },
    { fecha: "13/04/2024 08:15", actor: "Edil Ballesteros", rol: "ADT", accion: "RT-159 recibido en Documentación Técnica — Muestra verificada contra documento", documento: "RT-159", icono: "recepcion" },
    { fecha: "13/04/2024 08:20", actor: "Almandina Fernández", rol: "AM", accion: "RT-159 recibido en Microbiología — Registro en bitácora interna", documento: "RT-159", icono: "recepcion" },
    { fecha: "13/04/2024 09:00", actor: "Edil Ballesteros", rol: "ADT", accion: "RT-75 emitido — Solicitud de expediente histórico enviada a Archivo", documento: "RT-75", icono: "documento" },
    { fecha: "13/04/2024 09:45", actor: "Jennifer Vallecillo", rol: "EA", accion: "Expediente encontrado — 3 ingresos previos del producto identificados", documento: "RT-75", icono: "historial" },
    { fecha: "13/04/2024 10:00", actor: "Edil Ballesteros", rol: "ADT", accion: "Contraste histórico con RT-41 completado — Sin disparidad técnica", documento: "RT-41", icono: "historial" },
    { fecha: "13/04/2024 10:30", actor: "Edil Ballesteros", rol: "ADT", accion: "Faltante detectado: Estándar primario USP no provisto por el cliente", documento: null, icono: "alerta" },
    { fecha: "13/04/2024 11:00", actor: "Edil Ballesteros", rol: "ADT", accion: "RT-30 emitido — Solicitud de estándar y certificado de análisis al cliente", documento: "RT-30", icono: "documento" },
    { fecha: "13/04/2024 11:15", actor: "German Rodríguez", rol: "STR", accion: "RT-30 revisado y firmado para envío al cliente", documento: "RT-30", icono: "firma" },
    { fecha: "13/04/2024 11:30", actor: "Edil Ballesteros", rol: "ADT", accion: "Estado actualizado a 'Pendiente de Estándar' — Plazo de 60 días activado", documento: null, icono: "estado" },
    { fecha: "16/04/2024 08:00", actor: "Almandina Fernández", rol: "AM", accion: "Muestra evaluada — Aceptable para análisis microbiológico (condiciones íntegras)", documento: null, icono: "validacion" },
    { fecha: "17/04/2024 09:00", actor: "Sistema", rol: "Sistema", accion: "Alerta automática: 55 días restantes para recepción de estándar del cliente", documento: null, icono: "alerta" },
  ],
  documentos: [
    { nombre: "RG-13_REC-1020.pdf", tipo: "Recepción Documentos y Muestras", codigo: "RG-13", fecha: "12/04/2024", estado: "Emitido", etapa: "RAC" },
    { nombre: "RG-72_REC-1020.pdf", tipo: "Expediente Interno del Producto", codigo: "RG-72", fecha: "12/04/2024", estado: "Emitido", etapa: "RAC" },
    { nombre: "RT-159_REC-1020.pdf", tipo: "Distribución de Muestras", codigo: "RT-159", fecha: "12/04/2024", estado: "Firmado (3 áreas)", etapa: "RAC" },
    { nombre: "RT-75_REC-1020.pdf", tipo: "Solicitud de Expediente a Archivo", codigo: "RT-75", fecha: "13/04/2024", estado: "Respondido", etapa: "DOCT" },
    { nombre: "RT-30_REC-1020.pdf", tipo: "Solicitud de Estándar al Cliente", codigo: "RT-30", fecha: "13/04/2024", estado: "Emitido (Esperando)", etapa: "DOCT" },
  ],
  ensayosAsignados: [
    { ensayo: "Identificación por HPLC", tecnica: "HPLC", auxiliar: "RT-86", estado: "Bloqueado", analista: "-", razon: "Requiere estándar", especificacion: "USP 44", resultado: null },
    { ensayo: "Valoración de Principio Activo", tecnica: "HPLC", auxiliar: "RT-86", estado: "Bloqueado", analista: "-", razon: "Requiere estándar", especificacion: "90.0–110.0%", resultado: null },
    { ensayo: "Disolución", tecnica: "UV-Vis", auxiliar: "RT-87", estado: "Bloqueado", analista: "-", razon: "Requiere estándar", especificacion: "Q ≥ 80% en 30 min", resultado: null },
    { ensayo: "Uniformidad de Peso", tecnica: "Gravimetría", auxiliar: "RT-55", estado: "Completado", analista: "Alessandra Alonzo (AF)", resultado: "Cumple", especificacion: "±5% del peso promedio" },
    { ensayo: "Dimensiones Geométricas", tecnica: "Física", auxiliar: "RT-55", estado: "Completado", analista: "Alessandra Alonzo (AF)", resultado: "Cumple", especificacion: "Tableta estándar" },
  ],
  ensayosMicro: [
    { ensayo: "Recuento Microbiano", estado: "Incubación — Día 3 de 5", analista: "Almandina Fernández (AM)", resultado: null },
    { ensayo: "Límites Microbianos (E. coli, S. aureus)", estado: "Incubación — Día 3 de 5", analista: "Almandina Fernández (AM)", resultado: null },
  ],
  observaciones: [
    { autor: "Edil Ballesteros", area: "DOCT", rol: "ADT", texto: "Falta estándar de referencia primario USP. Se solicitó mediante RT-30 al cliente. Plazo: 60 días calendario a partir del 13/04/2024.", fecha: "13/04/2024 11:00", tipo: "bloqueo" },
    { autor: "Almandina Fernández", area: "Microbiología", rol: "AM", texto: "Muestra aceptada para análisis microbiológico. Sin observaciones de integridad.", fecha: "16/04/2024 08:00", tipo: "informativo" },
  ],
  revisiones: {
    stcc: null,
    dt: null,
    dg: null,
    reanálisis: [],
    comite: null,
  }
};

// Enriched ingresos list for bandejas
export const mockIngresosList = [
  { id: "REC-2024-1030", producto: "Metformina 850mg", formaFarmaceutica: "Tableta", lote: "L-993021", cliente: "FarmaSalud S.A.", clienteTipo: "ARSA", estado: "Borrador de Recepción", etapa: "RAC", responsable: "Aracely Sevilla (ERAC)", fechaIngreso: "Hoy 08:30", sla: "10 min", prioridad: "Alta", bloqueo: null, tramite: "ARSA" },
  { id: "REC-2024-1029", producto: "Losartán 50mg", formaFarmaceutica: "Tableta", lote: "L-887412", cliente: "Droguería Central", clienteTipo: "Particular", estado: "Pendiente de Pago", etapa: "RAC", responsable: "Katya Leonzo (ARAC)", fechaIngreso: "Hoy 07:45", sla: "2 hrs", prioridad: "Normal", bloqueo: "Pago", tramite: "Particular" },
  { id: "REC-2024-1028", producto: "Amoxicilina Susp. 250mg/5ml", formaFarmaceutica: "Suspensión", lote: "L-552083", cliente: "IHSS", clienteTipo: "IHSS", estado: "Distribuido por RT-159", etapa: "RAC → DOCT", responsable: "Aracely Sevilla (ERAC)", fechaIngreso: "Ayer", sla: "En tiempo", prioridad: "Normal", bloqueo: null, tramite: "Licitación IHSS" },
  { id: "REC-2024-1024", producto: "Ibuprofeno 400mg", formaFarmaceutica: "Tableta", lote: "L-443110", cliente: "FarmaSalud S.A.", clienteTipo: "ARSA", estado: "Registrado en RG-41", etapa: "RAC", responsable: "Aracely Sevilla (ERAC)", fechaIngreso: "Hoy 11:00", sla: "5 min", prioridad: "Normal", bloqueo: null, tramite: "ARSA" },
  { id: "REC-2024-1020", producto: "Paracetamol 500mg", formaFarmaceutica: "Tableta", lote: "L-847291", cliente: "Laboratorios Industriales S.A.", clienteTipo: "ARSA", estado: "Pendiente Estándar", etapa: "DOCT", responsable: "Edil Ballesteros (ADT)", fechaIngreso: "12/04/2024", sla: "55 días (estándar)", prioridad: "Media", bloqueo: "Estándar", tramite: "ARSA" },
  { id: "REC-2024-1015", producto: "Amoxicilina Susp. 500mg", formaFarmaceutica: "Suspensión", lote: "L-330291", cliente: "Droguería Central", clienteTipo: "ARSA", estado: "En Análisis FFQQ", etapa: "FFQQ", responsable: "Alessandra Alonzo (AF)", fechaIngreso: "10/04/2024", sla: "5 días", prioridad: "Normal", bloqueo: null, tramite: "ARSA" },
  { id: "REC-2024-0988", producto: "Loratadina Jbe. 5mg/5ml", formaFarmaceutica: "Jarabe", lote: "L-219477", cliente: "FarmaSalud S.A.", clienteTipo: "ARSA", estado: "En revisión STCC", etapa: "STCC", responsable: "Marianela Girón (STCC)", fechaIngreso: "28/03/2024", sla: "1 día", prioridad: "Alta", bloqueo: null, tramite: "ARSA" },
  { id: "REC-2024-0985", producto: "Diclofenaco Sódico 50mg", formaFarmaceutica: "Tableta", lote: "L-110038", cliente: "Hospital Escuela", clienteTipo: "Hospital Escuela", estado: "En revisión DT", etapa: "DT", responsable: "Dr. Henry Ponce (DT)", fechaIngreso: "25/03/2024", sla: "En evaluación", prioridad: "Alta", bloqueo: null, tramite: "Licitación Hospital Escuela" },
  { id: "REC-2024-0950", producto: "Omeprazol Cápsulas 20mg", formaFarmaceutica: "Cápsula", lote: "L-881244", cliente: "SESAL", clienteTipo: "SESAL", estado: "Borrador RT-39", etapa: "SDT", responsable: "Norma Corea (SDT)", fechaIngreso: "15/03/2024", sla: "2 días", prioridad: "Normal", bloqueo: null, tramite: "SESAL" },
  { id: "REC-2024-0940", producto: "Cetirizina 10mg", formaFarmaceutica: "Tableta", lote: "L-772300", cliente: "Lab. Vital", clienteTipo: "Particular", estado: "Aprobado Final", etapa: "DG", responsable: "Dr. Erick Irías (DG)", fechaIngreso: "10/03/2024", sla: "Completado", prioridad: "Normal", bloqueo: null, tramite: "Particular" },
];

// Estándares inventory for /estandares module
export const mockEstandares = [
  { id: "EST-001", nombre: "Paracetamol USP RS", lote: "R04920", certificado: "Sí", cantidadRestante: "450 mg", fechaVencimiento: "2025-06-30", estado: "Activo", ubicacion: "Ref-A1", casosVinculados: 4, ultimoUso: "15/03/2024" },
  { id: "EST-002", nombre: "Amoxicilina Trihidrato USP", lote: "R09821", certificado: "Sí", cantidadRestante: "200 mg", fechaVencimiento: "2024-08-15", estado: "Por Vencer", ubicacion: "Ref-A2", casosVinculados: 2, ultimoUso: "10/04/2024" },
  { id: "EST-003", nombre: "Ibuprofeno RS USP", lote: "R11002", certificado: "Sí", cantidadRestante: "15 mg", fechaVencimiento: "2025-01-31", estado: "Bajo Stock", ubicacion: "Ref-B1", casosVinculados: 1, ultimoUso: "08/04/2024" },
  { id: "EST-004", nombre: "Loratadina RS", lote: "R07744", certificado: "No", cantidadRestante: "0 mg", fechaVencimiento: "2024-12-01", estado: "Agotado", ubicacion: "-", casosVinculados: 0, ultimoUso: "01/02/2024" },
  { id: "EST-005", nombre: "Diclofenaco Sódico RS", lote: "R12558", certificado: "Sí", cantidadRestante: "800 mg", fechaVencimiento: "2026-03-15", estado: "Activo", ubicacion: "Ref-B3", casosVinculados: 3, ultimoUso: "20/03/2024" },
  { id: "EST-006", nombre: "Omeprazol USP RS", lote: "R09100", certificado: "Sí", cantidadRestante: "320 mg", fechaVencimiento: "2025-09-20", estado: "Activo", ubicacion: "Ref-C1", casosVinculados: 2, ultimoUso: "12/04/2024" },
];

// DG pending approvals
export const mockDGPendientes = [
  { id: "REC-2024-0950", producto: "Omeprazol Cápsulas 20mg", cliente: "SESAL", tramite: "SESAL", estado: "Borrador RT-39", rt39Version: "v1", fechaRecepcionDG: "14/04/2024", observacionesDT: "Sin observaciones — Aprobado por DT", resultado: "Cumple especificaciones" },
  { id: "REC-2024-0940", producto: "Cetirizina 10mg", cliente: "Lab. Vital", tramite: "Particular", estado: "Aprobado Final — Pendiente Emisión", rt39Version: "v1", fechaRecepcionDG: "16/04/2024", observacionesDT: "Sin observaciones", resultado: "Cumple especificaciones" },
];

// Catálogos
export const catalogoTramites = [
  { value: "ARSA", label: "Registro Sanitario (ARSA)", requierePago: true, documentosRequeridos: ["Orden de análisis", "Acta de toma de muestra"] },
  { value: "SESAL", label: "SESAL — Acta de Toma de Muestra", requierePago: false, documentosRequeridos: ["Acta de toma de muestra"] },
  { value: "IHSS", label: "Licitación IHSS", requierePago: true, documentosRequeridos: ["Oficio general", "Oficios individuales"] },
  { value: "HE", label: "Licitación Hospital Escuela", requierePago: true, documentosRequeridos: ["Oficio o Acta"] },
  { value: "PARTICULAR", label: "Análisis Particular", requierePago: true, documentosRequeridos: ["Solicitud específica"] },
  { value: "COLABORACION", label: "Colaboración (DGC)", requierePago: false, documentosRequeridos: ["Documentación de Dirección de Garantía de Calidad"] },
];
