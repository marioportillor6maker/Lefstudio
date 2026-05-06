// ─── Status / Enums ───────────────────────────────────────────────────────────
export type IncomeStatus =
  | 'RAC'
  | 'DOCT'
  | 'ESTANDAR'
  | 'FFQQ'
  | 'MICRO'
  | 'STCC'
  | 'DT'
  | 'DG'
  | 'FINALIZADO'
  | 'DEVUELTO'
  | 'ANULADO';

export type TipoTramite =
  | 'Registro Sanitario'
  | 'Renovacion'
  | 'Modificacion'
  | 'Reanalisis'
  | 'Homologacion';

export type SlaStatus = 'ok' | 'warning' | 'danger';

export type NivelPrioridad = 'Alta' | 'Media' | 'Baja';

// ─── Filters ──────────────────────────────────────────────────────────────────
export interface IncomeFilters {
  search: string;
  estado: IncomeStatus | '';
  tipoTramite: TipoTramite | '';
  areaActual: string;
  sla: SlaStatus | '';
  soloBloqueados: boolean;
}

// ─── Process Step (timeline in bandeja) ──────────────────────────────────────
export interface ProcessStep {
  area: string;
  abrev: string;
  status: 'completado' | 'activo' | 'pendiente' | 'saltado';
  fechaInicio?: string;
  fechaFin?: string;
  responsable?: string;
  diasUsados?: number;
  diasDisponibles?: number;
}

// ─── Timeline Event ───────────────────────────────────────────────────────────
export interface TimelineEvent {
  id: string;
  fecha: string;
  hora: string;
  area: string;
  usuario: string;
  accion: string;
  detalle?: string;
  tipo: 'ingreso' | 'transicion' | 'observacion' | 'documento' | 'devolucion' | 'aprobacion' | 'bloqueo';
}

// ─── Observation ─────────────────────────────────────────────────────────────
export interface Observation {
  id: string;
  fecha: string;
  hora: string;
  area: string;
  ruta?: string;
  usuario: string;
  texto: string;
  tipo: 'interna' | 'solicitante' | 'tecnica' | 'aprobacion' | 'obs';
  visible: boolean;
}

// ─── Document/Format ─────────────────────────────────────────────────────────
export interface DocumentFormat {
  id: string;
  codigo: string;
  nombre: string;
  area: string;
  estado: 'pendiente' | 'completado' | 'rechazado';
  fechaCompletado?: string;
  responsable?: string;
  url?: string;
}

// ─── FFQQ Test ────────────────────────────────────────────────────────────────
export interface FfqqTest {
  id: string;
  codigo: string;
  prueba: string;
  tecnica?: string;
  metodo?: string;
  resultado?: string;
  especificacion?: string;
  cumple?: boolean | null;
  analista?: string;
  fecha?: string;
  estado: 'completada' | 'en_proceso' | 'pendiente';
  rt?: string;
  resultadoObtenido?: string;
}

// ─── Microbiology Test ───────────────────────────────────────────────────────
export interface MicroTest {
  id: string;
  prueba: string;
  metodo?: string;
  especificacion?: string;
  resultado?: string;
  limite?: string;
  cumple?: boolean | null;
  analista?: string;
  fecha?: string;
  estado: 'completada' | 'en_proceso' | 'pendiente';
}

// ─── Checklist Item ──────────────────────────────────────────────────────────
export interface ChecklistItem {
  id: string;
  descripcion: string;
  completado: boolean;
  obligatorio: boolean;
  area: string;
}

// ─── Solicitante ─────────────────────────────────────────────────────────────
export interface Solicitante {
  nombre: string;
  empresa: string;
  telefono: string;
  email: string;
  nit: string;
}

// ─── Producto ─────────────────────────────────────────────────────────────────
export interface Producto {
  nombreComercial: string;
  nombreGenerico: string;
  fabricante: string;
  paisOrigen: string;
  formaFarmaceutica: string;
  concentracion: string;
  presentacion: string;
  condicionVenta: string;
  registroAnterior?: string;
  lote?: string;
  cantidadMuestra?: number;
}

// ─── RAC Detail ──────────────────────────────────────────────────────────────
export interface RacDistribucionDetalle {
  area: string;
  accion: string;
  fecha?: string;
  responsable?: string;
  estado: 'completado' | 'pendiente';
}

export interface RacCantidadDestino {
  destino: string;
  cantidad: number;
  unidad: string;
}

export interface VerificacionDocItem {
  descripcion: string;
  cumple: boolean;
  requerido?: boolean;
}

export interface RacDetail {
  fechaIngreso: string;
  horaIngreso: string;
  receptor: string;
  proforma?: string;
  montoPagado?: number;
  fechaPago?: string;
  distribucionRt159?: boolean;
  checklist: ChecklistItem[];
  observaciones?: string;
  // Registro Maestro RG-41
  nroRecepcion?: string;
  mesRecepcion?: string;
  tipoTramiteRac?: string;
  prioridadRac?: string;
  // Referencias documentales
  nroOrden?: string;
  nroExpediente?: string;
  nroLicitacion?: string;
  nroCarta?: string;
  // Cantidades por destino
  cantidadesPorDestino?: RacCantidadDestino[];
  // Verificación documental mínima
  verificacionDocumental?: VerificacionDocItem[];
  // RT-159 detalle por área
  distribucionDetalle?: RacDistribucionDetalle[];
}

// ─── DOCT Detail ─────────────────────────────────────────────────────────────
export interface ContrasteRow {
  recepcion: string;
  fecha: string;
  lote: string;
  tramite: string;
  resultado: 'Conforme' | 'No Conforme' | 'En análisis';
  analista: string;
  observaciones?: string;
}

export interface SolicitudItem {
  descripcion: string;
  estado: 'completado' | 'pendiente' | 'rechazado';
}

export interface DoctDetail {
  tecnico: string;
  fechaRevision?: string;
  rt75Estado: 'pendiente' | 'completado' | 'rechazado' | 'na';
  rt41Estado: 'pendiente' | 'completado' | 'rechazado' | 'na';
  rt30Estado: 'pendiente' | 'completado' | 'rechazado' | 'na';
  rt38Estado: 'pendiente' | 'completado' | 'rechazado' | 'na';
  checklist: ChecklistItem[];
  observaciones?: string;
  // RT-75
  rt75Solicitante?: string;
  rt75FechaSolicitud?: string;
  rt75FechaRespuesta?: string;
  rt75RecepcionesPrevias?: number;
  // RT-41
  rt41Filas?: ContrasteRow[];
  // RT-38
  rt38EstadoGlobal?: string;
  rt38CreadoPor?: string;
  rt38FechaCreacion?: string;
  rt38PruebasConfiguradas?: number;
  rt38FechaPruebas?: string;
  rt38AuxiliaresGenerados?: number;
  rt38FechaAuxiliares?: string;
  rt38PaqueteEnviadoA?: string;
  rt38FechaPaquete?: string;
  // RT-30
  rt30FechaEmision?: string;
  rt30FirmadoPor?: string;
  rt30EnviadoA?: string;
  rt30PlazoLimite?: string;
  rt30DiasTranscurridos?: number;
  rt30DiasTotal?: number;
  rt30Items?: SolicitudItem[];
}

// ─── Estandar Detail ─────────────────────────────────────────────────────────
export interface EstandarMovimiento {
  codigo: string;
  descripcion: string;
  responsable: string;
  fecha: string;
  cantidad: number; // positive = entrada, negative = salida
  unidad: string;
}

export interface EstandarDetail {
  codigo?: string;
  estado: 'pendiente' | 'registrado' | 'entregado' | 'rechazado';
  analista?: string;
  fechaRegistro?: string;
  rg44Estado: 'pendiente' | 'completado' | 'na';
  rt27Estado: 'pendiente' | 'completado' | 'na';
  observaciones?: string;
  // RG-44 detalle
  registroInterno?: string;
  nombreEstandar?: string;
  loteCodigo?: string;
  nroCertificado?: string;
  cantidadTotal?: number;
  cantidadDisponible?: number;
  cantidadUsada?: number;
  unidadMedida?: string;
  condicionesAlmacenamiento?: string;
  fechaRecepcion?: string;
  fechaAceptacion?: string;
  fechaVencimiento?: string;
  validadoPor?: string;
  entregaRt27?: string;
  alertaVencimiento?: boolean;
  movimientos?: EstandarMovimiento[];
}

// ─── STCC/DT/DG Detail ───────────────────────────────────────────────────────
export interface StccCheckItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface StccDtDgDetail {
  stccEstado: 'pendiente' | 'en_analisis' | 'aprobado' | 'rechazado' | 'na';
  stccAnalista?: string;
  stccFecha?: string;
  stccObservacion?: string;
  stccChecklist?: StccCheckItem[];
  dtEstado: 'pendiente_stcc' | 'pendiente' | 'aprobado' | 'rechazado' | 'na';
  dtResponsable?: string;
  dtFecha?: string;
  dgEstado: 'pendiente_dt' | 'pendiente' | 'firmado' | 'na';
  dgResponsable?: string;
  dgFecha?: string;
  dgNroInforme?: string;
  dgNroOficio?: string;
  dgFechaAprobacion?: string;
  dgCanalEntrega?: string;
  resolucion?: string;
}

// ─── Historical Comparison ───────────────────────────────────────────────────
export interface HistoricalRecord {
  correlativo: string;
  tipo: string;
  fechaIngreso: string;
  fechaFin?: string;
  estado: IncomeStatus;
  diasTotales?: number;
  lote?: string;
  resultado?: 'conforme' | 'no_conforme';
}

// ─── Main Income Record (for table/list) ─────────────────────────────────────
export interface IncomeRecord {
  id: string;
  correlativo: string;
  fechaIngreso: string;
  solicitante: string;
  empresa: string;
  producto: string;
  tipoTramite: TipoTramite;
  estadoActual: IncomeStatus;
  areaActual: string;
  diasTranscurridos: number;
  diasLimite: number;
  sla: SlaStatus;
  prioridad: NivelPrioridad;
  bloqueado: boolean;
  motivoBloqueo?: string;
  responsableActual?: string;
  estadoGlobal?: string; // e.g. 'En Captura FFQQ'
  progreso: number; // 0-100
  pasos: ProcessStep[];
}

// ─── Full Income Detail (for Vista 360) ──────────────────────────────────────
export interface IncomeDetail extends IncomeRecord {
  solicitanteDetalle: Solicitante;
  producto: string;
  productoDetalle: Producto;
  rac: RacDetail;
  doct: DoctDetail;
  estandar: EstandarDetail;
  ffqq: {
    analistas?: string[];
    rt40Emitido?: string;
    str?: string;
    analista?: string;
    fechaInicio?: string;
    fechaFin?: string;
    pruebas: FfqqTest[];
    observaciones?: string;
  };
  micro: {
    recepcion?: {
      fechaHora: string;
      responsable: string;
      cantidad: string;
      estadoMuestra: string;
    };
    aceptabilidad?: {
      aceptada: boolean;
      texto: string;
      fecha: string;
    };
    rt74Estado?: 'en_proceso' | 'pendiente' | 'completado';
    analista?: string;
    fechaInicio?: string;
    fechaFin?: string;
    pruebas: MicroTest[];
    observaciones?: string;
  };
  stccDtDg: StccDtDgDetail;
  documentos: DocumentFormat[];
  timeline: TimelineEvent[];
  observaciones: Observation[];
  historico: HistoricalRecord[];
}

// ─── Vista 360 Tab IDs ───────────────────────────────────────────────────────
export type Vista360Tab =
  | 'resumen'
  | 'rac'
  | 'doct'
  | 'estandar'
  | 'ffqq'
  | 'micro'
  | 'stcc'
  | 'documentos';

export type PanelTab = 'timeline' | 'observaciones' | 'comparador';
