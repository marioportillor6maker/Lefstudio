'use client'

const pruebas = [
  {
    nombre: 'Descripción Visual',
    analista: 'Karla Suazo',
    fechaInicio: '18/01/2024',
    horaInicio: '09:00',
    horaFin: '18/01/2024 09:30',
    resultado: 'Conforme',
    estado: 'Completado' as const,
  },
  {
    nombre: 'Identificación IR',
    analista: 'Karla Suazo',
    fechaInicio: '18/01/2024',
    horaInicio: '10:00',
    horaFin: '—',
    resultado: 'En proceso',
    estado: 'En Proceso' as const,
  },
  {
    nombre: 'Valoración HPLC',
    analista: 'Karla Suazo',
    fechaInicio: '—',
    horaInicio: '—',
    horaFin: '—',
    resultado: '—',
    estado: 'Pendiente' as const,
  },
  {
    nombre: 'Disolución',
    analista: 'Jorge Matute',
    fechaInicio: '—',
    horaInicio: '—',
    horaFin: '—',
    resultado: '—',
    estado: 'Pendiente' as const,
  },
  {
    nombre: 'Uniformidad de Contenido',
    analista: 'Jorge Matute',
    fechaInicio: '—',
    horaInicio: '—',
    horaFin: '—',
    resultado: '—',
    estado: 'Pendiente' as const,
  },
  {
    nombre: 'Desintegración',
    analista: 'Karla Suazo',
    fechaInicio: '—',
    horaInicio: '—',
    horaFin: '—',
    resultado: '—',
    estado: 'Pendiente' as const,
  },
]

type Estado = 'Completado' | 'En Proceso' | 'Pendiente'

function Dot({ estado }: { estado: Estado }) {
  if (estado === 'Completado') return <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0 inline-block" />
  if (estado === 'En Proceso') return <span className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 inline-block" />
  return <span className="w-3 h-3 rounded-full bg-slate-300 flex-shrink-0 inline-block" />
}

function EstadoBadge({ estado }: { estado: Estado }) {
  if (estado === 'Completado') return <span className="text-sm font-semibold text-green-600">Completado</span>
  if (estado === 'En Proceso') return <span className="text-sm font-semibold text-blue-600">En Proceso</span>
  return <span className="text-sm font-medium text-slate-400">Pendiente</span>
}

function ResultadoText({ valor, estado }: { valor: string; estado: Estado }) {
  if (estado === 'Completado') return <span className="text-sm font-semibold text-green-600">{valor}</span>
  if (estado === 'En Proceso') return <span className="text-sm font-medium text-blue-500">{valor}</span>
  return <span className="text-sm text-slate-300">{valor}</span>
}

export default function FfqqHistorialPage() {
  const completadas = pruebas.filter(p => p.estado === 'Completado').length
  const total = pruebas.length
  const pct = Math.round((completadas / total) * 100)

  return (
    <div className="p-6">
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">
            Estado de Pruebas — <span className="text-[var(--color-primary)]">REC-2024-00147</span> AMOXICILINA 500mg
          </h2>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {pruebas.map((p, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              {/* Dot + name + analista */}
              <Dot estado={p.estado} />
              <div className="w-52 flex-shrink-0">
                <p className="text-sm font-medium text-slate-800">{p.nombre}</p>
                <p className="text-xs text-slate-400 mt-0.5">Analista: {p.analista}</p>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Dates */}
              <div className="flex items-center gap-6 text-sm text-slate-500 tabular-nums">
                <span>{p.fechaInicio} {p.fechaInicio !== '—' ? p.horaInicio : ''}</span>
                <span>{p.horaFin}</span>
              </div>

              {/* Resultado */}
              <div className="w-24 text-right">
                <ResultadoText valor={p.resultado} estado={p.estado} />
              </div>

              {/* Estado badge */}
              <div className="w-28 text-right">
                <EstadoBadge estado={p.estado} />
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="px-5 py-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">Progreso del análisis</p>
            <p className="text-xs font-medium text-slate-600">{completadas}/{total} pruebas completadas ({pct}%)</p>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-accent)] rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
