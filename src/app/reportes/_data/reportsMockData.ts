// ============================================================
// SistemaLEF — Módulo de Reportes Operativos
// Mock Data — TODO: conectar con API real
// Reemplazar llamadas a: getOperationalReports(), getIncomeReports(),
// getStageTimeReports(), getPendingsByArea(), getReanalysisReports(),
// getStandardsReport(), getReturnsReport(), getAnalystLoad(), getProductivity()
// ============================================================

import type {
  MetricCardData,
  IngresoRow,
  IngresoChartData,
  TipoTramiteData,
  TiempoEtapaRow,
  TiempoChartData,
  PendienteAreaData,
  AlertaArea,
  ReanalisisRow,
  EstandarRow,
  DevolucionRow,
  CargaAnalistaRow,
  CargaChartData,
  ProductividadChartData,
  ProductividadMetric,
} from '../_types/reports.types';

// ── Tab 1: Ingresos ───────────────────────────────────────────
export const ingresosMetrics: MetricCardData[] = [
  { value: 24,   label: 'Total Ingresos (Ene)', trend: '↗ +9%',   trendUp: true  },
  { value: 20,   label: 'Conformes',             trend: '↗ 83%',   trendUp: true  },
  { value: 4,    label: 'No Conformes',          trend: '↘ 17%',   trendUp: false },
  { value: 12,   label: 'En Proceso',            trend: '↗ Activos', trendUp: true },
];

export const ingresosChartData: IngresoChartData[] = [
  { mes: 'Sep', Conformes: 15, NoConformes: 3 },
  { mes: 'Oct', Conformes: 19, NoConformes: 3 },
  { mes: 'Nov', Conformes: 17, NoConformes: 3 },
  { mes: 'Dic', Conformes: 13, NoConformes: 2 },
  { mes: 'Ene', Conformes: 20, NoConformes: 4 },
];

export const tipoTramiteData: TipoTramiteData[] = [
  { name: 'Control Calidad',    value: 58, color: '#025f85' },
  { name: 'Registro Sanitario', value: 17, color: '#0d9488' },
  { name: 'Licitación',         value: 13, color: '#a7c051' },
  { name: 'Colaboración',       value: 8,  color: '#f59e0b' },
  { name: 'Vigilancia',         value: 4,  color: '#ba3d3d' },
];

export const ingresosTableData: IngresoRow[] = [
  {
    recepcion: 'REC-2024-00147', producto: 'AMOXICILINA 500mg',    cliente: 'SESAL',
    tipo: 'Control Calidad', fechaRec: '07/01/2024', diasTotales: '18d', diasNum: 18,
    estado: 'En Análisis',    resultado: '—',
  },
  {
    recepcion: 'REC-2024-00146', producto: 'METFORMINA 850mg',     cliente: 'IHSS',
    tipo: 'Licitación',       fechaRec: '06/01/2024', diasTotales: '19d', diasNum: 19,
    estado: 'En Revisión DT', resultado: '—',
  },
  {
    recepcion: 'REC-2024-00145', producto: 'LOSARTÁN 50mg',        cliente: 'IHSS',
    tipo: 'Control Calidad', fechaRec: '05/01/2024', diasTotales: '20d', diasNum: 20,
    estado: 'Emitido',        resultado: 'Conforme',
  },
  {
    recepcion: 'REC-2024-00144', producto: 'ATORVASTATINA 20mg',   cliente: 'Hospital Escuela',
    tipo: 'Registro',         fechaRec: '04/01/2024', diasTotales: '21d', diasNum: 21,
    estado: 'Archivado',      resultado: 'Conforme',
  },
  {
    recepcion: 'REC-2024-00143', producto: 'DICLOFENACO 75mg',     cliente: 'SESAL',
    tipo: 'Control Calidad', fechaRec: '03/01/2024', diasTotales: '22d', diasNum: 22,
    estado: 'Archivado',      resultado: 'Conforme',
  },
];

// ── Tab 2: Tiempos por Etapa ──────────────────────────────────
export const tiemposMetrics: MetricCardData[] = [
  { value: '5/9',  label: 'Etapas en Meta',         trend: '↗ 56%', trendUp: true  },
  { value: '4/9',  label: 'Etapas Fuera de Meta',   trend: '↘ 44%', trendUp: false },
  { value: '3.6d', label: 'Promedio General',        trend: '↗ Estable', trendUp: true },
  { value: '24',   label: 'Casos Analizados',        trend: '↗ Ene', trendUp: true  },
];

export const tiemposChartData: TiempoChartData[] = [
  { etapa: 'RAC',        Promedio: 2.1, Meta: 2 },
  { etapa: 'DOCT',       Promedio: 4.8, Meta: 4 },
  { etapa: 'Estándares', Promedio: 6.2, Meta: 5 },
  { etapa: 'STR',        Promedio: 1.5, Meta: 2 },
  { etapa: 'FFQQ',       Promedio: 5.3, Meta: 5 },
  { etapa: 'Micro',      Promedio: 7.1, Meta: 7 },
  { etapa: 'STCC',       Promedio: 1.8, Meta: 2 },
  { etapa: 'DT',         Promedio: 2.4, Meta: 2 },
  { etapa: 'DG',         Promedio: 1.2, Meta: 1 },
];

export const tiemposTableData: TiempoEtapaRow[] = [
  { etapa: 'RAC',        promedio: 2.1, meta: 2, minimo: 1.3, maximo: 3.8,  casos: 24, cumplimiento: 'fuera_meta' },
  { etapa: 'DOCT',       promedio: 4.8, meta: 4, minimo: 2.9, maximo: 8.6,  casos: 24, cumplimiento: 'fuera_meta' },
  { etapa: 'Estándares', promedio: 6.2, meta: 5, minimo: 3.7, maximo: 11.2, casos: 24, cumplimiento: 'fuera_meta' },
  { etapa: 'STR',        promedio: 1.5, meta: 2, minimo: 0.9, maximo: 2.7,  casos: 24, cumplimiento: 'en_meta'    },
  { etapa: 'FFQQ',       promedio: 5.3, meta: 5, minimo: 3.2, maximo: 9.5,  casos: 24, cumplimiento: 'fuera_meta' },
  { etapa: 'Micro',      promedio: 7.1, meta: 7, minimo: 4.3, maximo: 12.8, casos: 24, cumplimiento: 'fuera_meta' },
  { etapa: 'STCC',       promedio: 1.8, meta: 2, minimo: 1.1, maximo: 3.2,  casos: 24, cumplimiento: 'en_meta'    },
];

// ── Tab 3: Pendientes por Área ────────────────────────────────
export const pendientesChartData: PendienteAreaData[] = [
  { area: 'RAC',        Pendientes: 3,  Criticos: 1 },
  { area: 'DOCT',       Pendientes: 5,  Criticos: 2 },
  { area: 'Estándares', Pendientes: 2,  Criticos: 1 },
  { area: 'STR',        Pendientes: 2,  Criticos: 0 },
  { area: 'FFQQ',       Pendientes: 8,  Criticos: 1 },
  { area: 'Micro',      Pendientes: 4,  Criticos: 0 },
  { area: 'STCC',       Pendientes: 3,  Criticos: 0 },
  { area: 'DT',         Pendientes: 2,  Criticos: 0 },
  { area: 'DG',         Pendientes: 1,  Criticos: 0 },
];

export const alertasAreas: AlertaArea[] = [
  { titulo: 'FFQQ', valor: 8, descripcion: 'Mayor carga operativa',          alerta: '△ 2 críticos' },
  { titulo: 'DOCT', valor: 5, descripcion: '2 bloqueados por información',   alerta: '△ 2 críticos' },
  { titulo: 'Micro', valor: 4, descripcion: 'Dentro de parámetros normales' },
];

// ── Tab 4: Reanálisis ─────────────────────────────────────────
export const reanalisisMetrics: MetricCardData[] = [
  { value: 4, label: 'Total Reanálisis (Ene)', bgColor: 'bg-amber-50',   borderColor: 'border-amber-200',  textColor: 'text-amber-700'  },
  { value: 2, label: 'Resueltos Conformes',    bgColor: 'bg-green-50',   borderColor: 'border-green-200',  textColor: 'text-green-700'  },
  { value: 1, label: 'Resueltos No Conformes', bgColor: 'bg-red-50',     borderColor: 'border-red-200',    textColor: 'text-red-700'    },
  { value: 1, label: 'En Proceso',             bgColor: 'bg-yellow-50',  borderColor: 'border-yellow-200', textColor: 'text-yellow-700' },
];

export const reanalisisTableData: ReanalisisRow[] = [
  {
    recepcion: 'REC-2024-00143', producto: 'DICLOFENACO 75mg',  prueba: 'Disolución',
    motivo: 'Fuera especificaciones', fechaOrden: '15/01/2024',
    analista: 'Jorge Matute', resultado: 'Conforme',    estado: 'Resuelto',
  },
  {
    recepcion: 'REC-2024-00139', producto: 'CAPTOPRIL 25mg',    prueba: 'Valoración HPLC',
    motivo: 'Resultado ambiguo',      fechaOrden: '12/01/2024',
    analista: 'Karla Suazo',  resultado: '—',           estado: 'En Proceso',
  },
  {
    recepcion: 'REC-2024-00135', producto: 'OMEPRAZOL 20mg',    prueba: 'Uniformidad',
    motivo: 'AV fuera de límites',    fechaOrden: '08/01/2024',
    analista: 'Jorge Matute', resultado: 'No Conforme', estado: 'Resuelto',
  },
];

// ── Tab 5: Estándares ─────────────────────────────────────────
export const estandaresMetrics: MetricCardData[] = [
  { value: 14, label: 'Estándares Activos',    trend: '↗ Activos',    trendUp: true  },
  { value: 6,  label: 'Usados Este Mes',       trend: '↗ +2',         trendUp: true  },
  { value: 3,  label: 'Por Vencer (30d)',      trend: '↘ Atención',   trendUp: false },
  { value: 2,  label: 'Eliminados Este Mes',   trend: '↘ Eliminados', trendUp: false },
];

export const estandaresTableData: EstandarRow[] = [
  {
    estandar: 'Amoxicilina Trihidrato USP RS',  lote: 'USP-AMX-2024A',
    cantidadInicial: '500 mg', usado: '180 mg', usadoMg: 180, saldo: '320 mg',
    vencimiento: '31/12/2025', estado: 'Activo',
  },
  {
    estandar: 'Metformina HCl USP RS',          lote: 'USP-MET-2024B',
    cantidadInicial: '200 mg', usado: '0 mg',   usadoMg: 0,   saldo: '200 mg',
    vencimiento: '30/06/2025', estado: 'Activo',
  },
  {
    estandar: 'Atorvastatina Cálcica USP RS',   lote: 'USP-ATV-2024C',
    cantidadInicial: '100 mg', usado: '55 mg',  usadoMg: 55,  saldo: '45 mg',
    vencimiento: '28/02/2025', estado: 'Por Vencer',
  },
];

// ── Tab 6: Devoluciones ───────────────────────────────────────
export const devolucionesMetrics: MetricCardData[] = [
  { value: 6, label: 'Total Devoluciones', trend: '↗ Ene', trendUp: null },
  { value: 2, label: 'Desde STR',          trend: '↗ 33%', trendUp: null },
  { value: 3, label: 'Desde STCC',         trend: '↗ 50%', trendUp: null },
  { value: 1, label: 'Desde DT',           trend: '↗ 17%', trendUp: null },
];

export const devolucionesTableData: DevolucionRow[] = [
  {
    recepcion: 'REC-2024-00143', producto: 'DICLOFENACO 75mg',
    origen: 'STR',  destino: 'DOCT',  motivo: 'RT-38 con errores',
    fecha: '14/01/2024', diasImpacto: '+3d', estado: 'Resuelto',
  },
  {
    recepcion: 'REC-2024-00141', producto: 'CAPTOPRIL 25mg',
    origen: 'STCC', destino: 'FFQQ',  motivo: 'Auxiliares incompletos',
    fecha: '12/01/2024', diasImpacto: '+2d', estado: 'Resuelto',
  },
  {
    recepcion: 'REC-2024-00139', producto: 'OMEPRAZOL 20mg',
    origen: 'DT',   destino: 'STCC',  motivo: 'Conclusión incorrecta',
    fecha: '10/01/2024', diasImpacto: '+4d', estado: 'Resuelto',
  },
];

// ── Tab 7: Carga Analista ─────────────────────────────────────
export const cargaChartData: CargaChartData[] = [
  { analista: 'Karla Suazo',    Total: 32, Completadas: 28 },
  { analista: 'Jorge Matute',   Total: 24, Completadas: 20 },
  { analista: 'T. Montoya',     Total: 15, Completadas: 12 },
  { analista: 'Roberto Paz',    Total: 12, Completadas: 10 },
];

export const cargaTableData: CargaAnalistaRow[] = [
  { analista: 'Q.F. Karla Suazo',    area: 'FFQQ', casosAsignados: 8, pruebasTotales: 32, completadas: 28, pendientes: 4, avancePct: 88 },
  { analista: 'Q.F. Jorge Matute',   area: 'FFQQ', casosAsignados: 6, pruebasTotales: 24, completadas: 20, pendientes: 4, avancePct: 83 },
  { analista: 'Q.F. Teresa Montoya', area: 'Micro', casosAsignados: 5, pruebasTotales: 15, completadas: 12, pendientes: 3, avancePct: 80 },
  { analista: 'Q.F. Roberto Paz',    area: 'FFQQ', casosAsignados: 4, pruebasTotales: 12, completadas: 10, pendientes: 2, avancePct: 83 },
];

// ── Tab 8: Productividad ──────────────────────────────────────
export const productividadChartData: ProductividadChartData[] = [
  { semana: 'S1', Ingresos: 5, Meta: 6 },
  { semana: 'S2', Ingresos: 7, Meta: 6 },
  { semana: 'S3', Ingresos: 6, Meta: 6 },
  { semana: 'S4', Ingresos: 6, Meta: 6 },
];

export const productividadMetrics: ProductividadMetric[] = [
  { value: 24,     label: 'Ingresos Completados (Ene)', meta: 'Meta: 24 — Cumplida',   metaMet: true },
  { value: '18.4d', label: 'Tiempo Promedio Total',     meta: 'Meta: 20d — Cumplida',  metaMet: true },
  { value: '83%',  label: 'Tasa de Conformidad',        meta: 'Meta: 80% — Cumplida',  metaMet: true },
];
