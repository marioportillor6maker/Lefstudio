'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Printer, CheckCircle2, Clock, Circle } from 'lucide-react'

interface Prueba {
  id: number
  nombre: string
  tecnica: string
  analista: string
  auxiliar: string
  estado: 'Completado' | 'En Proceso' | 'Pendiente'
  auxiliarValor?: string
}

const pruebas: Prueba[] = [
  { id: 1, nombre: 'Descripción / Caracteres Organolépticos', tecnica: 'Visual', analista: 'Karla Suazo', auxiliar: 'RT-71', estado: 'Completado' },
  { id: 2, nombre: 'Identificación por Espectrofotometría IR', tecnica: 'IR', analista: 'Karla Suazo', auxiliar: 'RT-86', estado: 'En Proceso', auxiliarValor: 'RT-86' },
  { id: 3, nombre: 'Valoración por HPLC', tecnica: 'HPLC', analista: 'Karla Suazo', auxiliar: 'RT-84', estado: 'Pendiente', auxiliarValor: 'RT-84' },
  { id: 4, nombre: 'Disolución', tecnica: 'Disolución', analista: 'Jorge Matute', auxiliar: 'RT-85', estado: 'Pendiente', auxiliarValor: 'RT-85' },
  { id: 5, nombre: 'Uniformidad de Contenido', tecnica: 'Gravimétrico', analista: 'Jorge Matute', auxiliar: 'RT-87', estado: 'Pendiente', auxiliarValor: 'RT-87' },
  { id: 6, nombre: 'Prueba de Desintegración', tecnica: 'Mecánico', analista: 'Karla Suazo', auxiliar: 'RT-55', estado: 'Pendiente', auxiliarValor: 'RT-55' },
]

function EstadoDot({ estado }: { estado: Prueba['estado'] }) {
  if (estado === 'Completado') return <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block flex-shrink-0" />
  if (estado === 'En Proceso') return <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block flex-shrink-0" />
  return <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block flex-shrink-0" />
}

function EstadoBadge({ estado }: { estado: Prueba['estado'] }) {
  if (estado === 'Completado') return <span className="text-xs font-medium text-green-600">Completado</span>
  if (estado === 'En Proceso') return <span className="text-xs font-medium text-blue-600">En Proceso</span>
  return <span className="text-xs font-medium text-slate-400">Pendiente</span>
}

interface FormState {
  fecha: string
  horaInicio: string
  horaFin: string
  resultado: string
  resultadoNum: string
  unidad: string
  especificacion: string
  cumple: string
  auxiliarAsoc: string
}

function CapturaForm({ prueba }: { prueba: Prueba }) {
  const [form, setForm] = useState<FormState>({
    fecha: '',
    horaInicio: '',
    horaFin: '',
    resultado: '',
    resultadoNum: '',
    unidad: '',
    especificacion: '',
    cumple: 'si',
    auxiliarAsoc: prueba.auxiliarValor || '',
  })

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
      {/* Row 1: Fecha / Hora inicio / Hora fin */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">Fecha de Ejecución</label>
          <input type="date" value={form.fecha} onChange={set('fecha')}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)]" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">Hora de Inicio</label>
          <input type="time" value={form.horaInicio} onChange={set('horaInicio')}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)]" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">Hora de Finalización</label>
          <input type="time" value={form.horaFin} onChange={set('horaFin')}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)]" />
        </div>
      </div>

      {/* Row 2: Resultado / Observaciones */}
      <div>
        <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">Resultado / Observaciones</label>
        <textarea value={form.resultado} onChange={set('resultado')} rows={3}
          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)] resize-none"
          placeholder="Ingrese el resultado o las observaciones de la prueba..." />
      </div>

      {/* Row 3: Resultado Numérico / Unidad / Especificación */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">Resultado Numérico</label>
          <input type="number" step="0.01" value={form.resultadoNum} onChange={set('resultadoNum')}
            placeholder="0.00"
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)]" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">Unidad</label>
          <input type="text" value={form.unidad} onChange={set('unidad')}
            placeholder="Ej. %, mg, UI"
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)]" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">Especificación</label>
          <input type="text" value={form.especificacion} onChange={set('especificacion')}
            placeholder="Ej. 90.0-110.0%"
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)]" />
        </div>
      </div>

      {/* Row 4: Cumple Especificación / Auxiliar Asociado */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">Cumple Especificación</label>
          <select value={form.cumple} onChange={set('cumple')}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)] bg-white">
            <option value="si">Sí — Conforme</option>
            <option value="no">No — No Conforme</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">Auxiliar Asociado</label>
          <input type="text" value={form.auxiliarAsoc} onChange={set('auxiliarAsoc')}
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)]" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        <button className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors font-medium">
          Guardar Prueba
        </button>
        <button className="px-4 py-1.5 border border-slate-300 text-slate-600 text-sm rounded hover:bg-slate-50 transition-colors">
          Ver Auxiliar
        </button>
      </div>
    </div>
  )
}

export default function FfqqHojaPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(2)

  const toggle = (id: number) => setExpandedRow(prev => prev === id ? null : id)

  return (
    <div className="p-6 space-y-5">
      {/* Main card */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">

        {/* Card header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Expediente Analítico RT-38 — <span className="text-[var(--color-primary)]">REC-2024-00147</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              En Análisis
            </span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-600 hover:bg-slate-50 transition-colors">
              <Printer size={13} />
              Imprimir RT-38
            </button>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-4 gap-0 border-b border-slate-200">
          {[
            { label: 'Recepción', value: 'REC-2024-00147' },
            { label: 'Producto', value: 'AMOXICILINA 500mg Cápsulas' },
            { label: 'Lote', value: 'AM2401X' },
            { label: 'Fabricante', value: 'Laboratorios Vijosa S.A.' },
            { label: 'Metodología', value: 'USP 47' },
            { label: 'Estándar', value: 'Amoxicilina Trihidrato USP RS' },
            { label: 'Analista Principal', value: 'Q.F. Karla Suazo' },
            { label: 'Fecha Inicio', value: '18/01/2024' },
          ].map((item, i) => (
            <div key={i} className={`px-4 py-3 ${i < 4 ? 'border-b border-slate-100' : ''} ${i % 4 !== 3 ? 'border-r border-slate-100' : ''}`}>
              <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">{item.label}</p>
              <p className="text-sm text-slate-700 font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Pruebas section */}
        <div className="px-5 py-4">
          <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold mb-3">Pruebas del Expediente</p>

          <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
            {pruebas.map((prueba) => {
              const isOpen = expandedRow === prueba.id
              const canExpand = prueba.estado !== 'Completado'

              return (
                <div key={prueba.id} className="bg-white">
                  {/* Row header */}
                  <button
                    onClick={() => canExpand && toggle(prueba.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${canExpand ? 'hover:bg-slate-50 cursor-pointer' : 'cursor-default'}`}
                  >
                    <EstadoDot estado={prueba.estado} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{prueba.nombre}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Técnica: {prueba.tecnica} · Analista: {prueba.analista} · Auxiliar: {prueba.auxiliar}
                      </p>
                    </div>
                    <EstadoBadge estado={prueba.estado} />
                    {canExpand && (
                      <span className="text-slate-400 ml-2">
                        {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </span>
                    )}
                    {!canExpand && (
                      <span className="ml-2 w-[15px]" />
                    )}
                  </button>

                  {/* Expanded form */}
                  {isOpen && canExpand && (
                    <div className="px-4 pb-4 bg-slate-50/50">
                      <CapturaForm prueba={prueba} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
