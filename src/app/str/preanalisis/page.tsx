import { CheckCircle2, XCircle } from 'lucide-react';

interface CheckItem { label: string; ok: boolean }
interface Caso {
  id: string; producto: string;
  completados: number; total: number;
  estado: string; estadoColor: string;
  checks: CheckItem[];
}

const CASOS: Caso[] = [
  {
    id: 'REC-2024-00147', producto: 'AMOXICILINA 500mg Cápsulas',
    completados: 8, total: 8, estado: 'En Análisis FFQQ', estadoColor: 'text-blue-600',
    checks: [
      { label: 'RG-41 completo',    ok: true  },
      { label: 'RT-159 emitido',    ok: true  },
      { label: 'RT-75 respondido',  ok: true  },
      { label: 'RT-41 completado',  ok: true  },
      { label: 'RT-30 respondido',  ok: true  },
      { label: 'Estándar aceptado', ok: true  },
      { label: 'RT-38 preparado',   ok: true  },
      { label: 'RT-40 emitido',     ok: true  },
    ],
  },
  {
    id: 'REC-2024-00148', producto: 'METFORMINA 850mg Tabletas',
    completados: 6, total: 8, estado: 'Pdte. Pago', estadoColor: 'text-orange-500',
    checks: [
      { label: 'RG-41 completo',    ok: true  },
      { label: 'RT-159 emitido',    ok: true  },
      { label: 'RT-75 respondido',  ok: true  },
      { label: 'RT-41 completado',  ok: true  },
      { label: 'RT-30 respondido',  ok: true  },
      { label: 'Estándar aceptado', ok: true  },
      { label: 'RT-38 preparado',   ok: false },
      { label: 'RT-40 emitido',     ok: false },
    ],
  },
  {
    id: 'REC-2024-00149', producto: 'CIPROFLOXACINA 500mg Tabletas',
    completados: 8, total: 8, estado: 'En Revisión STCC', estadoColor: 'text-blue-600',
    checks: [
      { label: 'RG-41 completo',    ok: true },
      { label: 'RT-159 emitido',    ok: true },
      { label: 'RT-75 respondido',  ok: true },
      { label: 'RT-41 completado',  ok: true },
      { label: 'RT-30 respondido',  ok: true },
      { label: 'Estándar aceptado', ok: true },
      { label: 'RT-38 preparado',   ok: true },
      { label: 'RT-40 emitido',     ok: true },
    ],
  },
  {
    id: 'REC-2024-00150', producto: 'IBUPROFENO 400mg Tabletas',
    completados: 6, total: 8, estado: 'Reanálisis', estadoColor: 'text-orange-500',
    checks: [
      { label: 'RG-41 completo',    ok: true  },
      { label: 'RT-159 emitido',    ok: true  },
      { label: 'RT-75 respondido',  ok: true  },
      { label: 'RT-41 completado',  ok: true  },
      { label: 'RT-30 respondido',  ok: true  },
      { label: 'Estándar aceptado', ok: true  },
      { label: 'RT-38 preparado',   ok: false },
      { label: 'RT-40 emitido',     ok: false },
    ],
  },
  {
    id: 'REC-2024-00151', producto: 'ENALAPRIL 10mg Tabletas',
    completados: 8, total: 8, estado: 'En Revisión DG', estadoColor: 'text-blue-600',
    checks: [
      { label: 'RG-41 completo',    ok: true },
      { label: 'RT-159 emitido',    ok: true },
      { label: 'RT-75 respondido',  ok: true },
      { label: 'RT-41 completado',  ok: true },
      { label: 'RT-30 respondido',  ok: true },
      { label: 'Estándar aceptado', ok: true },
      { label: 'RT-38 preparado',   ok: true },
      { label: 'RT-40 emitido',     ok: true },
    ],
  },
  {
    id: 'REC-2024-00152', producto: 'AMLODIPINO 5mg Tabletas',
    completados: 4, total: 8, estado: 'Pdte. Información', estadoColor: 'text-orange-500',
    checks: [
      { label: 'RG-41 completo',    ok: true  },
      { label: 'RT-159 emitido',    ok: true  },
      { label: 'RT-75 respondido',  ok: true  },
      { label: 'RT-41 completado',  ok: true  },
      { label: 'RT-30 respondido',  ok: false },
      { label: 'Estándar aceptado', ok: false },
      { label: 'RT-38 preparado',   ok: false },
      { label: 'RT-40 emitido',     ok: false },
    ],
  },
];

export default function ControlPreAnalisis() {
  return (
    <div className="space-y-3 pb-12">
      <p className="font-semibold text-slate-800 text-sm">Control Pre-Análisis — Estado de Casos</p>

      {CASOS.map(caso => (
        <div key={caso.id} className="bg-white rounded-md border border-slate-200 shadow-sm px-5 py-4">
          {/* Top row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[var(--color-primary)] font-mono">{caso.id}</span>
              <span className="text-xs font-semibold text-slate-700">{caso.producto}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">
                {caso.completados}/{caso.total}
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${caso.estadoColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${caso.estadoColor.replace('text-','bg-')}`} />
                {caso.estado}
              </span>
            </div>
          </div>

          {/* Check pills */}
          <div className="flex flex-wrap gap-2">
            {caso.checks.map((ch, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium ${
                  ch.ok
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}
              >
                {ch.ok
                  ? <CheckCircle2 className="w-3 h-3 shrink-0" />
                  : <XCircle className="w-3 h-3 shrink-0" />
                }
                {ch.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
