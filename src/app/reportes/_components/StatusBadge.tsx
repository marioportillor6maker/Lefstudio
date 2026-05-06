"use client";

import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'conforme'
  | 'no_conforme'
  | 'en_proceso'
  | 'en_analisis'
  | 'en_revision'
  | 'emitido'
  | 'archivado'
  | 'resuelto'
  | 'en_meta'
  | 'fuera_meta'
  | 'activo'
  | 'por_vencer'
  | 'eliminado'
  | 'pendiente'
  | 'default';

const variantStyles: Record<BadgeVariant, string> = {
  conforme:    'bg-green-100 text-green-800 border-green-200',
  no_conforme: 'bg-red-100 text-red-800 border-red-200',
  en_proceso:  'bg-amber-100 text-amber-800 border-amber-200',
  en_analisis: 'bg-blue-100 text-blue-800 border-blue-200',
  en_revision: 'bg-purple-100 text-purple-800 border-purple-200',
  emitido:     'bg-teal-100 text-teal-800 border-teal-200',
  archivado:   'bg-slate-100 text-slate-700 border-slate-200',
  resuelto:    'bg-green-100 text-green-800 border-green-200',
  en_meta:     'bg-green-100 text-green-800 border-green-200',
  fuera_meta:  'bg-red-100 text-red-800 border-red-200',
  activo:      'bg-green-100 text-green-800 border-green-200',
  por_vencer:  'bg-amber-100 text-amber-800 border-amber-200',
  eliminado:   'bg-red-100 text-red-800 border-red-200',
  pendiente:   'bg-slate-100 text-slate-600 border-slate-200',
  default:     'bg-slate-100 text-slate-600 border-slate-200',
};

const variantIcons: Partial<Record<BadgeVariant, string>> = {
  en_meta:    '✓ ',
  fuera_meta: '✕ ',
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

/** Detecta la variante a partir de un string de texto si no se pasa explícitamente */
export function resolveVariant(text: string): BadgeVariant {
  const t = text.toLowerCase();
  if (t === 'conforme')       return 'conforme';
  if (t === 'no conforme')    return 'no_conforme';
  if (t.includes('análisis')) return 'en_analisis';
  if (t.includes('revisión')) return 'en_revision';
  if (t === 'emitido')        return 'emitido';
  if (t === 'archivado')      return 'archivado';
  if (t === 'resuelto')       return 'resuelto';
  if (t === 'en proceso')     return 'en_proceso';
  if (t === 'activo')         return 'activo';
  if (t === 'por vencer')     return 'por_vencer';
  if (t === 'eliminado')      return 'eliminado';
  if (t === 'pendiente')      return 'pendiente';
  return 'default';
}

export function StatusBadge({ variant, label, className }: StatusBadgeProps) {
  const styles = variantStyles[variant] ?? variantStyles.default;
  const icon   = variantIcons[variant] ?? '';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border',
        styles,
        className,
      )}
    >
      {icon}{label}
    </span>
  );
}
