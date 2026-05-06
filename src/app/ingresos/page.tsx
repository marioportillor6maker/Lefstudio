"use client";

import { useState, useMemo, Suspense } from 'react';
import { Search, Filter, Plus, Eye, AlertTriangle, RefreshCw, Download } from 'lucide-react';
import Link from 'next/link';
import { INCOME_RECORDS } from './_data/incomeMockData';
import type { IncomeRecord, IncomeFilters, IncomeStatus, TipoTramite, SlaStatus } from './_types/income.types';
import { EstadoBadge, TipoBadge, PrioridadBadge, SlaBadge, ProgressBar } from './_components/IncomeBadges';
import { ProcessFlow } from './_components/ProcessFlow';
import { QuickPanel } from './_components/QuickPanel';

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
  { value: 'ok', label: 'A tiempo' },
  { value: 'warning', label: 'Por vencer' },
  { value: 'danger', label: 'Vencido' },
];

function BandejaIngresos() {
  const [filters, setFilters] = useState<IncomeFilters>(EMPTY_FILTERS);
  const [selected, setSelected] = useState<IncomeRecord | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const setFilter = <K extends keyof IncomeFilters>(key: K, val: IncomeFilters[K]) =>
    setFilters(prev => ({ ...prev, [key]: val }));

  const filtered = useMemo(() => {
    return INCOME_RECORDS.filter(r => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!r.correlativo.toLowerCase().includes(q) &&
            !r.producto.toLowerCase().includes(q) &&
            !r.empresa.toLowerCase().includes(q) &&
            !r.solicitante.toLowerCase().includes(q)) return false;
      }
      if (filters.estado && r.estadoActual !== filters.estado) return false;
      if (filters.tipoTramite && r.tipoTramite !== filters.tipoTramite) return false;
      if (filters.sla && r.sla !== filters.sla) return false;
      if (filters.soloBloqueados && !r.bloqueado) return false;
      return true;
    });
  }, [filters]);

  // Summary counts
  const counts = useMemo(() => ({
    total: INCOME_RECORDS.length,
    activos: INCOME_RECORDS.filter(r => !['FINALIZADO','DEVUELTO','ANULADO'].includes(r.estadoActual)).length,
    bloqueados: INCOME_RECORDS.filter(r => r.bloqueado).length,
    vencidos: INCOME_RECORDS.filter(r => r.sla === 'danger').length,
    porVencer: INCOME_RECORDS.filter(r => r.sla === 'warning').length,
  }), []);

  const hasFilters = filters.estado || filters.tipoTramite || filters.sla || filters.soloBloqueados;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="px-6 pt-5 pb-4 bg-white border-b border-slate-200 space-y-4 shrink-0">
          {/* Summary cards */}
          <div className="grid grid-cols-5 gap-3">
            <SummaryCard label="Total Ingresos" value={counts.total} color="text-slate-700" />
            <SummaryCard label="En Proceso" value={counts.activos} color="text-primary" />
            <SummaryCard label="Bloqueados" value={counts.bloqueados} color="text-red-600" />
            <SummaryCard label="Por Vencer" value={counts.porVencer} color="text-amber-600" />
            <SummaryCard label="Vencidos" value={counts.vencidos} color="text-red-700" />
          </div>

          {/* Search + actions */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={filters.search}
                onChange={e => setFilter('search', e.target.value)}
                placeholder="Buscar por correlativo, producto, empresa..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${showFilters || hasFilters ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
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

          {/* Filter bar */}
          {showFilters && (
            <div className="flex items-center gap-3 pt-1">
              <FilterSelect
                label="Estado"
                value={filters.estado}
                onChange={v => setFilter('estado', v as IncomeStatus | '')}
                options={ESTADOS.map(e => ({ value: e, label: e }))}
              />
              <FilterSelect
                label="Tipo Trámite"
                value={filters.tipoTramite}
                onChange={v => setFilter('tipoTramite', v as TipoTramite | '')}
                options={TIPOS.map(t => ({ value: t, label: t }))}
              />
              <FilterSelect
                label="SLA"
                value={filters.sla}
                onChange={v => setFilter('sla', v as SlaStatus | '')}
                options={SLA_OPTS.map(s => ({ value: s.value, label: s.label }))}
              />
              <label className="flex items-center gap-1.5 text-sm text-slate-600 cursor-pointer">
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
                <Th>Correlativo</Th>
                <Th>Producto / Empresa</Th>
                <Th>Tipo</Th>
                <Th>Estado Actual</Th>
                <Th>Flujo</Th>
                <Th>Progreso</Th>
                <Th>SLA</Th>
                <Th>Prioridad</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 text-sm">
                    No se encontraron ingresos con los filtros aplicados.
                  </td>
                </tr>
              )}
              {filtered.map(record => (
                <tr
                  key={record.id}
                  onClick={() => setSelected(selected?.id === record.id ? null : record)}
                  className={`border-b border-slate-100 cursor-pointer transition-colors ${selected?.id === record.id ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-slate-50'}`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {record.bloqueado && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                      <span className="font-mono text-xs font-bold text-slate-700">{record.correlativo}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{record.fechaIngreso}</p>
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="font-semibold text-slate-800 text-xs truncate" title={record.producto}>{record.producto}</p>
                    <p className="text-[10px] text-slate-400 truncate">{record.empresa}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <TipoBadge tipo={record.tipoTramite} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <EstadoBadge estado={record.estadoActual} />
                    {record.responsableActual && (
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[120px]">{record.responsableActual}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <ProcessFlow pasos={record.pasos} compact />
                  </td>
                  <td className="px-4 py-3 min-w-[100px]">
                    <ProgressBar value={record.progreso} color={record.sla === 'danger' ? 'bg-red-500' : record.sla === 'warning' ? 'bg-amber-500' : 'bg-green-500'} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <SlaBadge sla={record.sla} dias={record.diasTranscurridos} limite={record.diasLimite} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <PrioridadBadge prioridad={record.prioridad} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/ingresos/${record.correlativo}/vista-360`}
                        onClick={e => e.stopPropagation()}
                        className="p-1.5 hover:bg-primary/10 rounded-md text-slate-400 hover:text-primary transition-colors"
                        title="Vista 360"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">Mostrando <strong>{filtered.length}</strong> de <strong>{INCOME_RECORDS.length}</strong> ingresos</span>
          <span className="text-[10px] text-slate-400">Actualizado: {new Date().toLocaleString('es-HN')}</span>
        </div>
      </div>

      {/* Quick Panel */}
      {selected && <QuickPanel record={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
      <p className="text-[10px] text-slate-500 font-medium">{label}</p>
      <p className={`text-2xl font-black ${color} leading-tight`}>{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{children}</th>;
}

function FilterSelect({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
    >
      <option value="">{label}: Todos</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export default function IngresosPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-slate-400">Cargando...</div>}>
      <BandejaIngresos />
    </Suspense>
  );
}
