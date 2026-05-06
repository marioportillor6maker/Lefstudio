"use client";

import type { MetricCard } from '../_types/dashboard.types';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colorMap = {
  primary: { bg: 'bg-primary/10', text: 'text-primary',   border: 'border-primary/20'  },
  success: { bg: 'bg-green-50',   text: 'text-green-700', border: 'border-green-200'   },
  warning: { bg: 'bg-amber-50',   text: 'text-amber-700', border: 'border-amber-200'   },
  danger:  { bg: 'bg-red-50',     text: 'text-red-700',   border: 'border-red-200'     },
} as const;

export function DashMetricCard({ label, value, sub, trend, trendGood, color = 'primary' }: MetricCard) {
  const c = colorMap[color];
  const trendUp = (trend ?? 0) > 0;
  const trendNeutral = (trend ?? 0) === 0;
  const trendPositive = trendGood ? trendUp : !trendUp;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-5 flex flex-col gap-2`}>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
      <p className={`text-3xl font-black ${c.text} leading-none`}>{value}</p>
      <div className="flex items-center justify-between mt-1">
        {sub && <span className="text-xs text-slate-500">{sub}</span>}
        {!trendNeutral && (
          <span className={`flex items-center gap-1 text-xs font-semibold ml-auto ${trendPositive ? 'text-green-600' : 'text-red-500'}`}>
            {trendUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {Math.abs(trend ?? 0)}
          </span>
        )}
      </div>
    </div>
  );
}
