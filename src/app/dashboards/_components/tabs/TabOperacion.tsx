"use client";

import { DashMetricCard } from '../DashMetricCard';
import { ActiveFlowChart } from '../charts/ActiveFlowChart';
import { TendenciaChart }  from '../charts/TendenciaChart';
import {
  operacionMetrics, flowEtapaData, tendenciaData, infoCards,
} from '../../_data/dashboardMockData';

export function TabOperacion() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {operacionMetrics.map((m, i) => <DashMetricCard key={i} {...m} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ActiveFlowChart data={flowEtapaData} />
        <TendenciaChart  data={tendenciaData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {infoCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h4 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">{card.titulo}</h4>
            <ul className="flex flex-col gap-2">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-center justify-between gap-2">
                  <span className={`text-xs ${item.highlight ? 'text-red-600 font-semibold' : 'text-slate-600'}`}>
                    {item.label}
                  </span>
                  {item.value !== '' && (
                    <span className={`text-xs font-bold shrink-0 ${item.highlight ? 'text-red-600' : 'text-slate-800'}`}>
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
