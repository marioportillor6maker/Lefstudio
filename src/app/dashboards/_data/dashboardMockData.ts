import type {
  MetricCard,
  FlowEtapaData,
  TendenciaData,
  InfoCard,
  RacTiempoData,
  ProformaItem,
  PendienteTipoData,
  AlertaDoc,
  PruebasTipoData,
  AnalistaDashCard,
  AreaDashCard,
  EtapaPieData,
  KpiRow,
  AlertRow,
} from '../_types/dashboard.types';

// ─── Operacion General ───────────────────────────────────────────────────────
export const operacionMetrics: MetricCard[] = [
  { label: 'Casos Activos',       value: 142,  sub: 'En proceso',          trend: 8,  trendGood: false, color: 'primary'  },
  { label: 'Ingresados Hoy',      value: 12,   sub: 'Nuevos ingresos',      trend: 3,  trendGood: true,  color: 'success'  },
  { label: 'Alertas Criticas',    value: 7,    sub: 'Requieren atencion',   trend: -2, trendGood: true,  color: 'danger'   },
  { label: 'Tasa Conformidad',    value: '87%', sub: 'Meta: 90%',           trend: 2,  trendGood: true,  color: 'warning'  },
];

export const flowEtapaData: FlowEtapaData[] = [
  { etapa: 'RAC',         activos: 28 },
  { etapa: 'DOCT',        activos: 22 },
  { etapa: 'Estandares',  activos: 18 },
  { etapa: 'STR',         activos: 14 },
  { etapa: 'FFQQ',        activos: 35 },
  { etapa: 'Micro',       activos: 19 },
  { etapa: 'STCC',        activos: 4  },
  { etapa: 'DT',          activos: 2  },
];

export const tendenciaData: TendenciaData[] = [
  { mes: 'Sep',  ingresos: 98,  conformes: 84  },
  { mes: 'Oct',  ingresos: 115, conformes: 96  },
  { mes: 'Nov',  ingresos: 107, conformes: 90  },
  { mes: 'Dic',  ingresos: 89,  conformes: 75  },
  { mes: 'Ene',  ingresos: 124, conformes: 108 },
];

export const infoCards: InfoCard[] = [
  {
    titulo: 'Alertas del Sistema',
    items: [
      { label: '7 casos > 15 dias sin mover',   value: '',    highlight: true },
      { label: '3 proformas vencidas',           value: '',    highlight: true },
      { label: '2 estandares por vencer',        value: '',    highlight: false },
      { label: 'RT-159 pendiente en RAC',        value: '4 casos', highlight: false },
    ],
  },
  {
    titulo: 'Pendientes Criticos',
    items: [
      { label: 'FFQQ — sin hoja de trabajo',     value: 5,     highlight: true  },
      { label: 'Micro — siembra vencida',        value: 2,     highlight: true  },
      { label: 'STCC — comite pendiente',        value: 1,     highlight: false },
      { label: 'DOCT — RT-75 sin respuesta',     value: 6,     highlight: false },
    ],
  },
  {
    titulo: 'Logros del Mes',
    items: [
      { label: 'Conformes emitidos',   value: 108, highlight: false },
      { label: 'Tiempo prom. cierre',  value: '9.2d', highlight: false },
      { label: 'Estandares entregados',value: 14,  highlight: false },
      { label: 'Sin rechazos DT',      value: '✓', highlight: false },
    ],
  },
];

// ─── RAC y Tiempos ────────────────────────────────────────────────────────────
export const racMetrics: MetricCard[] = [
  { label: 'Ingresos RAC',      value: 124, sub: 'Enero 2024',        trend: 14, trendGood: true,  color: 'primary' },
  { label: 'Tiempo Prom. RAC',  value: '3.2d', sub: 'Meta: 3d',        trend: -1, trendGood: false, color: 'warning' },
  { label: 'Distribucion OK',   value: '91%', sub: 'RT-159 emitidos',  trend: 3,  trendGood: true,  color: 'success' },
  { label: 'Proformas Pendientes', value: 8, sub: 'Sin pago',          trend: -3, trendGood: true,  color: 'danger'  },
];

export const racTiempoData: RacTiempoData[] = [
  { mes: 'Sep', promedio: 3.8, meta: 3.0 },
  { mes: 'Oct', promedio: 3.5, meta: 3.0 },
  { mes: 'Nov', promedio: 4.1, meta: 3.0 },
  { mes: 'Dic', promedio: 3.6, meta: 3.0 },
  { mes: 'Ene', promedio: 3.2, meta: 3.0 },
];

export const proformasData: ProformaItem[] = [
  { codigo: 'PRF-2024-089', empresa: 'Lab. Farma S.A.',      monto: 12500, estado: 'pendiente', diasEspera: 5  },
  { codigo: 'PRF-2024-087', empresa: 'Cosmeticos del Valle', monto: 8750,  estado: 'vencido',   diasEspera: 12 },
  { codigo: 'PRF-2024-085', empresa: 'Nutri Foods Corp.',    monto: 22000, estado: 'pagado',    diasEspera: 2  },
  { codigo: 'PRF-2024-083', empresa: 'Industrias Robles',    monto: 5400,  estado: 'pendiente', diasEspera: 7  },
  { codigo: 'PRF-2024-080', empresa: 'Bio-Tech Honduras',    monto: 18300, estado: 'vencido',   diasEspera: 15 },
];

// ─── DOCT y Pendientes ────────────────────────────────────────────────────────
export const doctMetrics: MetricCard[] = [
  { label: 'En Documentacion', value: 22,   sub: 'Bandeja DOCT',       trend: 3,  trendGood: false, color: 'primary' },
  { label: 'RT-75 Pendientes', value: 6,    sub: 'Sin respuesta',       trend: 2,  trendGood: false, color: 'danger'  },
  { label: 'RT-41 Contrastes', value: 11,   sub: 'En revision',         trend: -1, trendGood: true,  color: 'warning' },
  { label: 'Tiempo Prom. DOCT',value: '5.1d', sub: 'Meta: 5d',          trend: -2, trendGood: true,  color: 'success' },
];

export const pendientesTipoData: PendienteTipoData[] = [
  { tipo: 'RT-75',        pendientes: 6,  color: '#ba3d3d' },
  { tipo: 'RT-41',        pendientes: 11, color: '#f59e0b' },
  { tipo: 'RT-30',        pendientes: 4,  color: '#025f85' },
  { tipo: 'RT-38',        pendientes: 7,  color: '#0d9488' },
  { tipo: 'Sin Asignar',  pendientes: 3,  color: '#94a3b8' },
];

export const alertasDoc: AlertaDoc[] = [
  { folio: 'ING-2024-0341', tipo: 'RT-75', empresa: 'Lab. Farma S.A.',     diasPendiente: 18, responsable: 'Q.F. Ana Torres',   nivel: 'critico' },
  { folio: 'ING-2024-0338', tipo: 'RT-41', empresa: 'Cosmeticos del Valle',diasPendiente: 12, responsable: 'Q.F. Luis Mejia',   nivel: 'critico' },
  { folio: 'ING-2024-0332', tipo: 'RT-75', empresa: 'Nutri Foods Corp.',   diasPendiente: 9,  responsable: 'Q.F. Sara Vidal',   nivel: 'warning' },
  { folio: 'ING-2024-0329', tipo: 'RT-30', empresa: 'Bio-Tech Honduras',   diasPendiente: 7,  responsable: 'Q.F. Ana Torres',   nivel: 'warning' },
  { folio: 'ING-2024-0321', tipo: 'RT-38', empresa: 'Industrias Robles',   diasPendiente: 5,  responsable: 'Q.F. Luis Mejia',   nivel: 'info'    },
];

// ─── FFQQ / Micro ─────────────────────────────────────────────────────────────
export const labMetrics: MetricCard[] = [
  { label: 'Pruebas FFQQ',      value: 214, sub: 'Enero 2024',       trend: 18, trendGood: true,  color: 'primary' },
  { label: 'Pruebas Micro',     value: 89,  sub: 'Enero 2024',       trend: 7,  trendGood: true,  color: 'success' },
  { label: 'Resultados Emitidos',value: 271,sub: 'RT-88 + RT-92',    trend: 22, trendGood: true,  color: 'primary' },
  { label: 'Pendientes Lab',    value: 32,  sub: 'Sin resultado',     trend: -5, trendGood: true,  color: 'warning' },
];

export const pruebasTipoData: PruebasTipoData[] = [
  { tipo: 'Fisicoquimicas', ffqq: 88, micro: 0  },
  { tipo: 'Microbiologicas',ffqq: 0,  micro: 52 },
  { tipo: 'Identificacion', ffqq: 45, micro: 18 },
  { tipo: 'Cuantitativas',  ffqq: 52, micro: 0  },
  { tipo: 'Organolépticas', ffqq: 29, micro: 19 },
];

export const analistasCards: AnalistaDashCard[] = [
  { nombre: 'Q.F. Roberto Paz',   area: 'FFQQ', asignadas: 62, completadas: 54, enProceso: 8  },
  { nombre: 'Q.F. Clara Munoz',   area: 'FFQQ', asignadas: 58, completadas: 51, enProceso: 7  },
  { nombre: 'Q.F. Diego Reyes',   area: 'FFQQ', asignadas: 55, completadas: 48, enProceso: 7  },
  { nombre: 'Biol. Sandra Lara',  area: 'MICRO',asignadas: 44, completadas: 40, enProceso: 4  },
  { nombre: 'Biol. Marco Rios',   area: 'MICRO',asignadas: 45, completadas: 39, enProceso: 6  },
];

// ─── STCC / DT / DG ───────────────────────────────────────────────────────────
export const stccMetrics: MetricCard[] = [
  { label: 'Comites Calidad',    value: 3,     sub: 'Pendientes',       trend: 1,  trendGood: false, color: 'warning'  },
  { label: 'Resoluciones DT',   value: 14,    sub: 'Emitidas',          trend: 6,  trendGood: true,  color: 'primary'  },
  { label: 'Firma Digital DG',  value: 'OK',  sub: 'Sin pendientes',    trend: 0,  trendGood: true,  color: 'success'  },
  { label: 'No Conformidades',  value: 2,     sub: 'Abiertas',          trend: -1, trendGood: true,  color: 'danger'   },
];

export const areaCards: AreaDashCard[] = [
  {
    area: 'STCC',
    icon: 'ShieldCheck',
    metricas: [
      { label: 'Comites pendientes',     value: 3,  status: 'warn'   },
      { label: 'No conformidades',       value: 2,  status: 'danger' },
      { label: 'Acciones correctivas',   value: 5,  status: 'warn'   },
      { label: 'Auditorias programadas', value: 1,  status: 'ok'     },
      { label: 'Docs actualizados',      value: 12, status: 'ok'     },
    ],
  },
  {
    area: 'DT',
    icon: 'FileText',
    metricas: [
      { label: 'Resoluciones emitidas',  value: 14, status: 'ok'     },
      { label: 'En revision',            value: 3,  status: 'warn'   },
      { label: 'RT-200 pendientes',      value: 2,  status: 'warn'   },
      { label: 'Rechazos',               value: 0,  status: 'ok'     },
      { label: 'Tiempo prom. DT',        value: '2.1d', status: 'ok' },
    ],
  },
  {
    area: 'DG',
    icon: 'FileSignature',
    metricas: [
      { label: 'Firmas pendientes',      value: 0,  status: 'ok'     },
      { label: 'Certificados emitidos',  value: 14, status: 'ok'     },
      { label: 'Rechazados DG',          value: 0,  status: 'ok'     },
      { label: 'Tiempo firma prom.',     value: '0.8d', status: 'ok' },
      { label: 'Ultimo lote firmado',    value: 'Hoy', status: 'ok'  },
    ],
  },
];

// ─── Estado Consolidado ───────────────────────────────────────────────────────
export const etapaPieData: EtapaPieData[] = [
  { name: 'RAC',        value: 28, color: '#025f85' },
  { name: 'DOCT',       value: 22, color: '#0284c7' },
  { name: 'Estandares', value: 18, color: '#0ea5e9' },
  { name: 'STR',        value: 14, color: '#38bdf8' },
  { name: 'FFQQ',       value: 35, color: '#0d9488' },
  { name: 'Micro',      value: 19, color: '#14b8a6' },
  { name: 'STCC/DT/DG', value: 6,  color: '#a7c051' },
];

export const kpiRows: KpiRow[] = [
  { label: 'Casos activos totales',          value: 142,    meta: 130,   status: 'warn'   },
  { label: 'Tasa de conformidad',            value: '87%',  meta: '90%', status: 'warn'   },
  { label: 'Tiempo promedio de cierre',      value: '9.2d', meta: '8d',  status: 'warn'   },
  { label: 'Casos criticos (>15d)',          value: 7,      meta: 0,     status: 'danger' },
  { label: 'Resoluciones DT emitidas',       value: 14,     meta: 12,    status: 'ok'     },
  { label: 'Firmas DG pendientes',           value: 0,      meta: 0,     status: 'ok'     },
  { label: 'No conformidades abiertas',      value: 2,      meta: 0,     status: 'danger' },
  { label: 'Estandares entregados',          value: 14,     meta: 12,    status: 'ok'     },
  { label: 'Proformas vencidas',             value: 3,      meta: 0,     status: 'danger' },
  { label: 'Pruebas lab sin resultado',      value: 32,     meta: 20,    status: 'warn'   },
];

export const alertasGenerales: AlertRow[] = [
  { id: '1', tipo: 'Tiempo',    descripcion: '7 casos sin movimiento > 15 dias',  area: 'General', nivel: 'critico' },
  { id: '2', tipo: 'Proforma',  descripcion: '3 proformas vencidas sin cobrar',   area: 'RAC',     nivel: 'critico' },
  { id: '3', tipo: 'DOCT',      descripcion: '6 solicitudes RT-75 sin respuesta', area: 'DOCT',    nivel: 'warning' },
  { id: '4', tipo: 'FFQQ',      descripcion: '5 muestras sin hoja de trabajo',    area: 'FFQQ',    nivel: 'warning' },
  { id: '5', tipo: 'Estandar',  descripcion: '2 estandares por vencer pronto',    area: 'DOCT',    nivel: 'info'    },
];
