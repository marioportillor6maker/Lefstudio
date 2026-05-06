// ============================================================
// SistemaLEF — Módulo de Reportes Operativos
// Types
// ============================================================

export type TabId =
  | 'ingresos'
  | 'tiempos'
  | 'pendientes'
  | 'reanalisis'
  | 'estandares'
  | 'devoluciones'
  | 'carga'
  | 'productividad';

export interface ReportTab {
  id: TabId;
  label: string;
}

// ── Metric Cards ──────────────────────────────────────────────
export interface MetricCardData {
  value: string | number;
  label: string;
  trend?: string;
  trendUp?: boolean | null; // null = neutral
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  meta?: string;
  metaMet?: boolean;
}

// ── Tab 1: Ingresos ───────────────────────────────────────────
export type EstadoIngreso =
  | 'En Análisis'
  | 'En Revisión DT'
  | 'Emitido'
  | 'Archivado'
  | 'Pendiente';

export type ResultadoIngreso = 'Conforme' | 'No Conforme' | '—';

export interface IngresoRow {
  recepcion: string;
  producto: string;
  cliente: string;
  tipo: string;
  fechaRec: string;
  diasTotales: string;
  diasNum: number;
  estado: EstadoIngreso;
  resultado: ResultadoIngreso;
}

export interface IngresoChartData {
  mes: string;
  Conformes: number;
  NoConformes: number;
}

export interface TipoTramiteData {
  name: string;
  value: number;
  color: string;
}

// ── Tab 2: Tiempos por Etapa ──────────────────────────────────
export type CumplimientoStatus = 'en_meta' | 'fuera_meta';

export interface TiempoEtapaRow {
  etapa: string;
  promedio: number;
  meta: number;
  minimo: number;
  maximo: number;
  casos: number;
  cumplimiento: CumplimientoStatus;
}

export interface TiempoChartData {
  etapa: string;
  Promedio: number;
  Meta: number;
}

// ── Tab 3: Pendientes por Área ────────────────────────────────
export interface PendienteAreaData {
  area: string;
  Pendientes: number;
  Criticos: number;
}

export interface AlertaArea {
  titulo: string;
  valor: number;
  descripcion: string;
  alerta?: string;
}

// ── Tab 4: Reanálisis ─────────────────────────────────────────
export type ResultadoReanalisis = 'Conforme' | 'No Conforme' | '—';
export type EstadoReanalisis = 'Resuelto' | 'En Proceso';

export interface ReanalisisRow {
  recepcion: string;
  producto: string;
  prueba: string;
  motivo: string;
  fechaOrden: string;
  analista: string;
  resultado: ResultadoReanalisis;
  estado: EstadoReanalisis;
}

// ── Tab 5: Estándares ─────────────────────────────────────────
export type EstadoEstandar = 'Activo' | 'Por Vencer' | 'Eliminado';

export interface EstandarRow {
  estandar: string;
  lote: string;
  cantidadInicial: string;
  usado: string;
  usadoMg: number;
  saldo: string;
  vencimiento: string;
  estado: EstadoEstandar;
}

// ── Tab 6: Devoluciones ───────────────────────────────────────
export type EstadoDevolucion = 'Resuelto' | 'Pendiente' | 'En Proceso';

export interface DevolucionRow {
  recepcion: string;
  producto: string;
  origen: string;
  destino: string;
  motivo: string;
  fecha: string;
  diasImpacto: string;
  estado: EstadoDevolucion;
}

// ── Tab 7: Carga Analista ─────────────────────────────────────
export interface CargaAnalistaRow {
  analista: string;
  area: string;
  casosAsignados: number;
  pruebasTotales: number;
  completadas: number;
  pendientes: number;
  avancePct: number;
}

export interface CargaChartData {
  analista: string;
  Total: number;
  Completadas: number;
}

// ── Tab 8: Productividad ──────────────────────────────────────
export interface ProductividadChartData {
  semana: string;
  Ingresos: number;
  Meta: number;
}

export interface ProductividadMetric extends MetricCardData {
  meta: string;
  metaMet: boolean;
}
