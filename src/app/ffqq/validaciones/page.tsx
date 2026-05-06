'use client'

import { CheckCircle2, Send } from 'lucide-react'

const resumen = [
  { prueba: 'Descripción Visual',    resultado: 'Conforme',  conforme: true  },
  { prueba: 'Identificación IR',     resultado: 'Pendiente', conforme: false },
  { prueba: 'Valoración HPLC',       resultado: 'Pendiente', conforme: false },
  { prueba: 'Disolución',            resultado: 'Pendiente', conforme: false },
  { prueba: 'Uniformidad Contenido', resultado: 'Pendiente', conforme: false },
  { prueba: 'Desintegración',        resultado: 'Pendiente', conforme: false },
]

export default function FfqqValidacionesPage() {
  return (
    <div className="p-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={14} className="text-white" />
          </div>
          <h2 className="text-sm font-semibold text-slate-800">Cierre Técnico del Análisis FFQQ</h2>
        </div>

        {/* Resumen de resultados */}
        <div className="border border-slate-200 rounded-lg p-4 space-y-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">Resumen de Resultados</p>
          <div className="grid grid-cols-3 gap-3">
            {resumen.map(r => (
              <div key={r.prueba} className="border border-slate-200 rounded-lg px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">{r.prueba}</p>
                <p className={`text-sm font-bold ${r.conforme ? 'text-[var(--color-accent)]' : 'text-slate-500'}`}>
                  {r.resultado}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusión + Fecha */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-600 mb-1.5 font-medium">Conclusión General FFQQ</label>
            <input
              type="text"
              defaultValue="Conforme — Todas las pruebas dentro de especificaciones"
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1.5 font-medium">Fecha de Cierre</label>
            <input
              type="date"
              placeholder="dd/mm/aaaa"
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
        </div>

        {/* Observaciones */}
        <div>
          <label className="block text-xs text-slate-600 mb-1.5 font-medium">Observaciones Técnicas del Analista</label>
          <textarea
            rows={4}
            placeholder="Observaciones técnicas relevantes sobre el análisis fisicoquímico..."
            className="w-full border border-slate-200 rounded px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)] resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white text-sm rounded hover:opacity-90 transition-opacity font-medium">
            <CheckCircle2 size={14} />
            Cerrar Análisis FFQQ
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-600 text-sm rounded hover:bg-slate-50 transition-colors">
            <Send size={13} />
            Enviar a STCC
          </button>
        </div>
      </div>
    </div>
  )
}
