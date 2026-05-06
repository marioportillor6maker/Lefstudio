"use client";

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;       // 0-100
  showLabel?: boolean;
  height?: string;
  className?: string;
}

export function ProgressBar({
  value,
  showLabel = true,
  height = 'h-2',
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  const trackColor =
    clamped >= 80
      ? 'bg-green-500'
      : clamped >= 60
      ? 'bg-amber-400'
      : 'bg-red-500';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex-1 bg-slate-100 rounded-full overflow-hidden', height)}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', trackColor)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-bold text-slate-700 w-10 text-right shrink-0">
          {clamped}%
        </span>
      )}
    </div>
  );
}
