"use client";

import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { DashMetricCard } from '../DashMetricCard';
import { PendientesTipoChart } from '../charts/PendientesTipoChart';
import { doctMetrics, pendientesTipoData, alertasDoc } from '../../_data/dashboardMockData';

const nivelConfig = {
  critico: { icon: AlertTriangle, cls: 'text-red-600',    bg: 'bg-red-50 border-red-200'    },
  warning: { icon: AlertCircle,  cls: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200' },
  info:    { icon: Info,         cls: 'text-blue-600',    bg: 'bg-blue-50 border-blue-200'  },
} as const;

export function TabDoct() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {doctMetrics.map((m, i) => <DashMetricCard key={i} {...m} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <PendientesTipoChart data={pendientesTipoData} />

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Alertas Documentacion</h3>
          <p className="text-xs text-slate-500 mb-4">Casos que requieren atencion inmediata</p>
          <div className="flex flex-col gap-2">
            {alertasDoc.map((alerta, i) => {
              const cfg = nivelConfig[alerta.nivel];
              const Icon = cfg.icon;
              return (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${cfg.bg}`}>
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${cfg.cls}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono font-semibold text-slate-600">{alerta.folio}</span>
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${alerta.nivel === 'critico' ? 'bg-red-200 text-red-800' : alerta.nivel === 'warning' ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'}`}>
                        {alerta.tipo}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 truncate">{alerta.empresa}</p>
                    <p className="text-[10px] text-slate-500">{alerta.responsable}</p>
                  </div>
                  <span className={`text-xs font-bold shrink-0 ${alerta.diasPendiente >= 15 ? 'text-red-600' : alerta.diasPendiente >= 8 ? 'text-amber-600' : 'text-slate-500'}`}>
                    {alerta.diasPendiente}d
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
