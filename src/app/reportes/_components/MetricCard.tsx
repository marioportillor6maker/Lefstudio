"use client";

import type { MetricCardData } from '../_types/reports.types';
import { cn } from '@/lib/utils';

interface MetricCardProps extends MetricCardData {
  className?: string;
}

export function MetricCard({
  value,
  label,
  trend,
  trendUp,
  bgColor,
  borderColor,
  textColor,
  meta,
  metaMet,
  className,
}: MetricCardProps) {
  const trendColor =
    trendUp === true
      ? 'text-green-600'
      : trendUp === false
      ? 'text-red-600'
      : 'text-slate-500';

  return (
    <div
      className={cn(
        'rounded-xl border p-5 flex flex-col gap-1 shadow-sm',
        bgColor ?? 'bg-white',
        borderColor ?? 'border-slate-200',
        className,
      )}
    >
      <p
        className={cn(
          'text-3xl font-black tracking-tight',
          textColor ?? 'text-slate-900',
        )}
      >
        {value}
      </p>
      <p className={cn('text-sm font-medium', textColor ?? 'text-slate-600')}>
        {label}
      </p>
      {trend && (
        <p className={cn('text-xs font-semibold mt-1', trendColor)}>{trend}</p>
      )}
      {meta !== undefined && (
        <p
          className={cn(
            'text-xs font-semibold mt-1 flex items-center gap-1',
            metaMet ? 'text-green-600' : 'text-red-600',
          )}
        >
          {metaMet ? '✓' : '✕'} {meta}
        </p>
      )}
    </div>
  );
}
