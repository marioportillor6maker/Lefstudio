"use client";

import { ShieldCheck, FileText, FileSignature } from 'lucide-react';
import { DashMetricCard } from '../DashMetricCard';
import { stccMetrics, areaCards } from '../../_data/dashboardMockData';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  FileText,
  FileSignature,
};

const statusDot = {
  ok:     'bg-green-500',
  warn:   'bg-amber-400',
  danger: 'bg-red-500',
} as const;

export function TabStcc() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stccMetrics.map((m, i) => <DashMetricCard key={i} {...m} />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {areaCards.map((card, i) => {
          const Icon = iconMap[card.icon] ?? ShieldCheck;
          const areaColors: Record<string, string> = {
            STCC: 'bg-primary/10 text-primary border-primary/20',
            DT:   'bg-blue-50 text-blue-700 border-blue-200',
            DG:   'bg-green-50 text-green-700 border-green-200',
          };
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className={`px-5 py-4 flex items-center gap-3 border-b ${areaColors[card.area] ?? 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                <Icon className="w-5 h-5 shrink-0" />
                <h4 className="text-sm font-black">{card.area}</h4>
              </div>
              <div className="p-5">
                <ul className="flex flex-col gap-3">
                  {card.metricas.map((m, j) => (
                    <li key={j} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot[m.status ?? 'ok']}`} />
                        <span className="text-xs text-slate-600">{m.label}</span>
                      </div>
                      <span className={`text-sm font-bold shrink-0 ${m.status === 'danger' ? 'text-red-600' : m.status === 'warn' ? 'text-amber-600' : 'text-slate-800'}`}>
                        {m.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
