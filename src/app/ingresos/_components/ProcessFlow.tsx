import type { ProcessStep } from '../_types/income.types';
import { Check, Clock, Minus } from 'lucide-react';

interface Props {
  pasos: ProcessStep[];
  compact?: boolean;
}

export function ProcessFlow({ pasos, compact = false }: Props) {
  if (compact) {
    // Compact mode: small inline circles for table rows
    return (
      <div className="flex items-center">
        {pasos.map((paso, idx) => {
          const isDone   = paso.status === 'completado';
          const isActive = paso.status === 'activo';
          return (
            <div key={idx} className="flex items-center">
              <div
                title={paso.area}
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  isDone   ? 'bg-green-500 border-green-500' :
                  isActive ? 'bg-primary border-primary' :
                             'bg-white border-slate-200'
                }`}
              >
                {isDone   && <Check className="w-2.5 h-2.5 text-white" />}
                {isActive && <Clock className="w-2.5 h-2.5 text-white" />}
              </div>
              {idx < pasos.length - 1 && (
                <div className={`w-2 h-px shrink-0 ${isDone ? 'bg-green-300' : 'bg-slate-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Full mode: spans the full width, connectors stretch to fill space
  return (
    <div className="w-full">
      {/* Circles + connectors row */}
      <div className="flex items-center w-full">
        {pasos.map((paso, idx) => {
          const isDone    = paso.status === 'completado';
          const isActive  = paso.status === 'activo';
          const isSkipped = paso.status === 'saltado';

          return (
            <div key={idx} className="flex items-center flex-1 last:flex-none">
              {/* Circle */}
              <div className="flex flex-col items-center gap-1.5 relative group shrink-0">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105 ${
                    isDone    ? 'bg-green-500 border-green-400 text-white' :
                    isActive  ? 'bg-primary border-primary text-white' :
                    isSkipped ? 'bg-slate-100 border-slate-300 text-slate-400' :
                                'bg-white border-slate-200 text-slate-300'
                  }`}
                >
                  {isDone    && <Check className="w-4 h-4" />}
                  {isActive  && <Clock className="w-4 h-4 animate-pulse" />}
                  {isSkipped && <Minus className="w-4 h-4" />}
                </div>

                {/* Label */}
                <span className={`text-[10px] font-bold text-center whitespace-nowrap ${
                  isActive ? 'text-primary' :
                  isDone   ? 'text-green-600' :
                             'text-slate-400'
                }`}>
                  {paso.abrev}
                </span>

                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30 shadow-xl">
                  <p className="font-bold">{paso.area}</p>
                  {isActive && paso.diasUsados != null && (
                    <p className="text-amber-300">{paso.diasUsados}/{paso.diasDisponibles} días usados</p>
                  )}
                  {isDone && paso.diasUsados != null && (
                    <p className="text-green-300">Completado en {paso.diasUsados}d</p>
                  )}
                  {!isDone && !isActive && <p className="text-slate-400">Pendiente</p>}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                </div>
              </div>

              {/* Connector — stretches to fill space between steps */}
              {idx < pasos.length - 1 && (
                <div className="flex-1 h-0.5 mx-1 mb-6 rounded-full overflow-hidden bg-slate-200">
                  {isDone && <div className="h-full bg-green-300 w-full" />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
