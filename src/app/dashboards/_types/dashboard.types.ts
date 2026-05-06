// ─── Tab IDs ────────────────────────────────────────────────────────────────
export type DashTabId =
  | 'operacion'
  | 'rac'
  | 'doct'
  | 'laboratorios'
  | 'stcc'
  | 'estado';

export interface DashTab {
  id: DashTabId;
  label: string;
}

// ─── Shared ──────────────────────────────────────────────────────────────────
export interface MetricCard {
  label: string;
  value: string | number;
  sub?: string;
  trend?: number;        // positive = up, negative = down
  trendGood?: boolean;   // true if upward trend is good
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export interface AlertRow {
  id: string;
  tipo: string;
  descripcion: string;
  area: string;
  nivel: 'critico' | 'warning' | 'info';
}

// ─── Tab: Operacion General ──────────────────────────────────────────────────
export interface FlowEtapaData {
  etapa: string;
  activos: number;
}

export interface TendenciaData {
  mes: string;
  ingresos: number;
  conformes: number;
}

export interface InfoCard {
  titulo: string;
  items: { label: string; value: string | number; highlight?: boolean }[];
}

// ─── Tab: RAC y Tiempos ──────────────────────────────────────────────────────
export interface RacTiempoData {
  mes: string;
  promedio: number;
  meta: number;
}

export interface ProformaItem {
  codigo: string;
  empresa: string;
  monto: number;
  estado: 'pagado' | 'pendiente' | 'vencido';
  diasEspera: number;
}

// ─── Tab: DOCT y Pendientes ───────────────────────────────────────────────────
export interface PendienteTipoData {
  tipo: string;
  pendientes: number;
  color?: string;
}

export interface AlertaDoc {
  folio: string;
  tipo: string;
  empresa: string;
  diasPendiente: number;
  responsable: string;
  nivel: 'critico' | 'warning' | 'info';
}

// ─── Tab: FFQQ / Micro ────────────────────────────────────────────────────────
export interface PruebasTipoData {
  tipo: string;
  ffqq: number;
  micro: number;
}

export interface AnalistaDashCard {
  nombre: string;
  area: 'FFQQ' | 'MICRO';
  asignadas: number;
  completadas: number;
  enProceso: number;
}

// ─── Tab: STCC / DT / DG ─────────────────────────────────────────────────────
export interface AreaDashCard {
  area: 'STCC' | 'DT' | 'DG';
  icon: string;
  metricas: { label: string; value: string | number; status?: 'ok' | 'warn' | 'danger' }[];
}

// ─── Tab: Estado Consolidado ─────────────────────────────────────────────────
export interface EtapaPieData {
  name: string;
  value: number;
  color: string;
}

export interface KpiRow {
  label: string;
  value: string | number;
  meta?: string | number;
  status: 'ok' | 'warn' | 'danger';
}
