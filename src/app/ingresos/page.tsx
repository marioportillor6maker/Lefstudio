"use client";

import { useState, useMemo, Suspense } from 'react';
import { Search, Filter, Plus, Eye, Settings, AlertTriangle, RefreshCw, Download } from 'lucide-react';
import Link from 'next/link';
import { INCOME_RECORDS } from './_data/incomeMockData';
import type { IncomeRecord, IncomeFilters, IncomeStatus, TipoTramite, SlaStatus } from './_types/income.types';
import { EstadoBadge, TipoBadge } from './_components/IncomeBadges';
import { QuickPanel } from './_components/QuickPanel';

const SEL_CLS = "text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary";

const EMPTY_FILTERS: IncomeFilters = {
  search: '',
  estado: '',
  tipoTramite: '',
  areaActual: '',
  sla: '',
  soloBloqueados: false,
};

const ESTADOS: IncomeStatus[] = ['RAC','DOCT','ESTANDAR','FFQQ','MICRO','STCC','DT','DG','FINALIZADO','DEVUELTO','ANULADO'];
const TIPOS: TipoTramite[] = ['Registro Sanitario','Renovacion','Modificacion','Reanalisis','Homologacion'];
const SLA_OPTS: { value: SlaStatus; label: string }[] = [
  { value: 'ok',      label: 'A tiempo' },
  { value: 'warning', label: 'Por vencer' },
  { value: 'danger',  label: 'Vencido' },
];

const ETAPA_LABEL: Record<string, string> = {
  'RAC':           'Recepción RAC',
  'Documentación': 'Revisión Documental',
  'Estándar':      'Control Estándares',
  'FFQQ':          'Análisis FFQQ',
  'Microbiología': 'Análisis Microbiológico',
  'STCC':          'Revisión STCC',
  'Dir. Técnica':  'Revisión Técnica',
  'Dir. General':  'Revisión Final DG',
  'Finalizado':    'Proceso Finalizado',
  'Devuelto':      'Expediente Devuelto',
};

function etapa(r: IncomeRecord): string {
  return r.estadoGlobal ?? ETAPA_LABEL[r.areaActual] ?? r.areaActual;
}

function fmtDate(iso: string): string {
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function BandejaIngresos() {
  const [filters, setFilters]         = useState<IncomeFilters>(EMPTY_FILTERS);
  const [selected, setSelected]       = useState<IncomeRecord | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [checked, setChecked]         = useState<Set<string>>(new Set());

  const setFilter = <K extends keyof IncomeFilters>(key: K, val: IncomeFilters[K]) =>
    setFilters(prev => ({ ...prev, [key]: val }));

  const filtered = useMemo(() => INCOME_RECORDS.filter(r => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!r.correlativo.toLowerCase().includes(q) &&
          !r.producto.toLowerCase().includes(q) &&
          !r.empresa.toLowerCase().includes(q) &&
          !r.solicitante.toLowerCase().includes(q)) return false;
    }
    if (filters.estado     && r.estadoActual !== filters.estado)     return false;
    if (filters.tipoTramite && r.tipoTramite !== filters.tipoTramite) return false;
    if (filters.sla        && r.sla !== filters.sla)                  return false;
    if (filters.soloBloqueados && !r.bloqueado)                       return false;
    return true;
  }), [filters]);

  const counts = useMemo(() => ({
    total:     INCOME_RECORDS.length,
    activos:   INCOME_RECORDS.filter(r => !['FINALIZADO','DEVUELTO','ANULADO'].includes(r.estadoActual)).length,
    bloqueados:INCOME_RECORDS.filter(r => r.bloqueado).length,
    vencidos:  INCOME_RECORDS.filter(r => r.sla === 'danger').length,
    porVencer: INCOME_RECORDS.filter(r => r.sla === 'warning').length,
  }), []);

  const hasFilters = filters.estado || filters.tipoTramite || filters.sla || filters.soloBloqueados;

  const toggleCheck = (id: string) =>
    setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const toggleAll = () =>
    setChecked(checked.size === filtered.length ? new Set() : new Set(filtered.map(r => r.id)));

  const openPanel = (r: IncomeRecord) =>
    setSelected(prev => prev?.id === r.id ? null : r);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="px-6 pt-5 pb-4 bg-white border-b border-slate-200 space-y-4 shrink-0">

          {/* Summary cards */}
          <div className="grid grid-cols-5 gap-3">
            <StatCard label="Total Ingresos" value={counts.total}     color="text-slate-700" />
            <StatCard label="En Proceso"     value={counts.activos}   color="text-primary" />
            <StatCard label="Bloqueados"     value={counts.bloqueados} color="text-red-600" />
            <StatCard label="Por Vencer"     value={counts.porVencer}  color="text-amber-600" />
            <StatCard label="Vencidos"       value={counts.vencidos}   color="text-red-700" />
          </div>

          {/* Search + actions */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={filters.search}
                onChange={e => setFilter('search', e.target.value)}
                placeholder="Buscar correlativo, producto, empresa..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                showFilters || hasFilters
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtros
              {hasFilters && <span className="w-1.5 h-1.5 bg-primary rounded-full" />}
            </button>
            <button
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Limpiar filtros"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <Link
                href="/rac/nuevo"
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nuevo Ingreso
              </Link>
            </div>
          </div>

          {/* Filter row */}
          {showFilters && (
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <select value={filters.estado}      onChange={e => setFilter('estado', e.target.value as IncomeStatus | '')} className={SEL_CLS}>
                <option value="">Estado: Todos</option>
                {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
              <select value={filters.tipoTramite} onChange={e => setFilter('tipoTramite', e.target.value as TipoTramite | '')} className={SEL_CLS}>
                <option value="">Tipo: Todos</option>
                {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={filters.sla}         onChange={e => setFilter('sla', e.target.value as SlaStatus | '')} className={SEL_CLS}>
                <option value="">SLA: Todos</option>
                {SLA_OPTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <label className="flex items-center gap-1.5 text-sm text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.soloBloqueados}
                  onChange={e => setFilter('soloBloqueados', e.target.checked)}
                  className="rounded border-slate-300 text-primary focus:ring-primary w-3.5 h-3.5"
                />
                Solo bloqueados
              </label>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                <th className="px-3 py-2.5 w-8">
                  <input
                    type="checkbox"
                    checked={checked.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded border-slate-300 text-primary focus:ring-primary w-3.5 h-3.5"
                  />
                </th>
                <Th>Correlativo</Th>
                <Th>Producto / Forma Farm.</Th>
                <Th>Cliente</Th>
                <Th>Trámite</Th>
                <Th>Etapa Actual</Th>
                <Th>Estado</Th>
                <Th>Bloqueos</Th>
                <Th>Responsable</Th>
                <Th>F. Recepción</Th>
                <Th>Días</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400 text-sm">
                    No se encontraron ingresos con los filtros aplicados.
                  </td>
                </tr>
              )}
              {filtered.map(r => (
                <tr
                  key={r.id}
                  className={`border-b border-slate-100 transition-colors ${
                    selected?.id === r.id ? 'bg-primary/5' : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-3 py-3 w-8">
                    <input
                      type="checkbox"
                      checked={checked.has(r.id)}
                      onChange={() => toggleCheck(r.id)}
                      className="rounded border-slate-300 text-primary focus:ring-primary w-3.5 h-3.5"
                    />
                  </td>

                  {/* Correlativo */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {r.bloqueado && <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />}
                      <span className="font-mono text-xs font-bold text-primary">{r.correlativo}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      REC-{r.correlativo.replace('LEF-', '')}
                    </p>
                  </td>

                  {/* Producto */}
                  <td className="px-4 py-3 max-w-[180px]">
                    <p className="text-xs font-semibold text-slate-800 truncate" title={r.producto}>{r.producto}</p>
                  </td>

                  {/* Cliente */}
                  <td className="px-4 py-3 max-w-[130px]">
                    <p className="text-xs text-slate-700 truncate" title={r.empresa}>{r.empresa}</p>
                  </td>

                  {/* Trámite */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <TipoBadge tipo={r.tipoTramite} />
                  </td>

                  {/* Etapa Actual */}
                  <td className="px-4 py-3 max-w-[150px]">
                    <p className="text-xs text-slate-700 truncate">{etapa(r)}</p>
                  </td>

                  {/* Estado */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <EstadoBadge estado={r.estadoActual} />
                  </td>

                  {/* Bloqueos */}
                  <td className="px-4 py-3">
                    <BloqueoChips record={r} />
                  </td>

                  {/* Responsable */}
                  <td className="px-4 py-3 max-w-[130px]">
                    <p className="text-xs text-slate-600 truncate">{r.responsableActual ?? '—'}</p>
                  </td>

                  {/* F. Recepción */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-xs text-slate-600">{fmtDate(r.fechaIngreso)}</p>
                  </td>

                  {/* Días */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-xs font-bold ${
                      r.sla === 'danger'  ? 'text-red-600' :
                      r.sla === 'warning' ? 'text-amber-600' :
                                           'text-slate-700'
                    }`}>
                      {r.diasTranscurridos}d
                    </span>
                    <p className="text-[10px] text-slate-400">/ {r.diasLimite}d</p>
                  </td>

                  {/* Acciones */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/ingresos/${encodeURIComponent(r.correlativo)}/vista-360`}
                        className="p-1.5 hover:bg-primary/10 rounded-md text-slate-400 hover:text-primary transition-colors"
                        title="Vista 360"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => openPanel(r)}
                        className={`p-1.5 rounded-md transition-colors ${
                          selected?.id === r.id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                        }`}
                        title="Detalle rápido"
                      >
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Mostrando <strong>{filtered.length}</strong> de <strong>{INCOME_RECORDS.length}</strong> ingresos
            {checked.size > 0 && <> · <strong className="text-primary">{checked.size}</strong> seleccionados</>}
          </span>
          <span suppressHydrationWarning className="text-[10px] text-slate-400">Actualizado: {new Date().toLocaleString('es-HN')}</span>
        </div>
      </div>

      {/* Quick Panel */}
      {selected && <QuickPanel record={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function BloqueoChips({ record }: { record: IncomeRecord }) {
  const chips: { label: string; cls: string }[] = [];
  if (record.bloqueado) {
    chips.push({ label: 'Bloqueado', cls: 'bg-red-50 text-red-700 border-red-200' });
  }
  if (record.sla === 'danger') {
    chips.push({ label: 'SLA Vencido', cls: 'bg-red-50 text-red-700 border-red-200' });
  } else if (record.sla === 'warning') {
    chips.push({ label: 'Por Vencer', cls: 'bg-amber-50 text-amber-700 border-amber-200' });
  }
  if (chips.length === 0) return <span className="text-slate-300 text-xs">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {chips.map((c, i) => (
        <span key={i} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${c.cls}`}>
          {c.label}
        </span>
      ))}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
      <p className="text-[10px] text-slate-500 font-medium">{label}</p>
      <p className={`text-2xl font-black ${color} leading-tight`}>{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
      {children}
    </th>
  );
}

export default function IngresosPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-slate-400">Cargando...</div>}>
      <BandejaIngresos />
    </Suspense>
  );
}
