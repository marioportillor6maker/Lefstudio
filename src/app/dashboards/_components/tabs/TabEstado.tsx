"use client";

import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { CasosEtapaPieChart } from '../charts/CasosEtapaPieChart';
import { etapaPieData, kpiRows, alertasGenerales } from '../../_data/dashboardMockData';

const statusIcon = {
  ok:     { icon: CheckCircle2,   cls: 'text-green-500' },
  warn:   { icon: AlertTriangle,  cls: 'text-amber-500' },
  danger: { icon: XCircle,        cls: 'text-red-500'   },
} as const;

const nivelBadge = {
  critico: 'bg-red-100 text-red-700',
  warning: 'bg-amber-100 text-amber-700',
  info:    'bg-blue-100 text-blue-700',
} as const;

export function TabEstado() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <CasosEtapaPieChart data={etapaPieData} />

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-1">KPIs Consolidados</h3>
          <p className="text-xs text-slate-500 mb-4">Indicadores clave vs. metas operativas</p>
          <div className="flex flex-col divide-y divide-slate-100">
            {kpiRows.map((kpi, i) => {
              const cfg = statusIcon[kpi.status];
              const Icon = cfg.icon;
              return (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${cfg.cls}`} />
                  <span className="flex-1 text-xs text-slate-700">{kpi.label}</span>
                  {kpi.meta != null && (
                    <span className="text-[10px] text-slate-400 shrink-0">Meta: {kpi.meta}</span>
                  )}
                  <span className={`text-sm font-bold shrink-0 ml-2 ${kpi.status === 'danger' ? 'text-red-600' : kpi.status === 'warn' ? 'text-amber-600' : 'text-green-600'}`}>
                    {kpi.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Alertas Activas del Sistema</h3>
          <p className="text-xs text-slate-500 mt-0.5">Situaciones que requieren seguimiento</p>
        </div>
        <div className="divide-y divide-slate-100">
          {alertasGenerales.map((alerta, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors">
              <span className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${nivelBadge[alerta.nivel]}`}>
                {alerta.nivel}
              </span>
              <span className="text-xs font-semibold text-slate-500 shrink-0 w-20">{alerta.tipo}</span>
              <span className="flex-1 text-xs text-slate-700">{alerta.descripcion}</span>
              <span className="text-xs text-slate-400 shrink-0">{alerta.area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
