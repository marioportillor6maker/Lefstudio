'use client';
import { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, ChevronDown, ChevronRight, FileText, Send } from 'lucide-react';
import type { IncomeDetail, FfqqTest } from '../../_types/income.types';

interface Props { detail: IncomeDetail }

export function TabFfqq({ detail }: Props) {
  const { ffqq } = detail;
  const [expandedId, setExpandedId] = useState<string | null>('f3');
  const [resultados, setResultados] = useState<Record<string, string>>({});

  const total      = ffqq.pruebas.length;
  const completadas = ffqq.pruebas.filter(p => p.estado === 'completada').length;
  const enProceso  = ffqq.pruebas.filter(p => p.estado === 'en_proceso').length;
  const pendientes = ffqq.pruebas.filter(p => p.estado === 'pendiente').length;

  return (
    <div className="space-y-4">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Total Pruebas"  value={total}       color="text-slate-700" />
        <StatCard label="Completadas"    value={completadas} color="text-blue-600"  />
        <StatCard label="En Proceso"     value={enProceso}   color="text-amber-600" />
        <StatCard label="Pendientes"     value={pendientes}  color="text-slate-400" />
      </div>

      {/* ── Analistas RT-40 bar ── */}
      <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500">Analistas RT-40:</span>
        <div className="flex gap-1.5">
          {(ffqq.analistas ?? [ffqq.analista]).filter(Boolean).map(a => (
            <span key={a} className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
              {a}
            </span>
          ))}
        </div>
        {ffqq.rt40Emitido && (
          <span className="ml-auto text-xs text-slate-400">
            RT-40 emitido: {ffqq.rt40Emitido}
            {ffqq.str && <> · STR: {ffqq.str}</>}
          </span>
        )}
      </div>

      {/* ── Pruebas RT-38 ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
          <h4 className="text-sm font-semibold text-slate-700">Pruebas del RT-38 — Ejecución</h4>
        </div>

        <div className="divide-y divide-slate-100">
          {ffqq.pruebas.map(prueba => (
            <PruebaRow
              key={prueba.id}
              prueba={prueba}
              isExpanded={expandedId === prueba.id}
              onToggle={() => setExpandedId(expandedId === prueba.id ? null : prueba.id)}
              resultado={resultados[prueba.id] ?? ''}
              onResultadoChange={val => setResultados(r => ({ ...r, [prueba.id]: val }))}
            />
          ))}
        </div>

        {/* Bottom action buttons */}
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            <FileText className="w-3.5 h-3.5" />
            Abrir RT-38 Completo
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Send className="w-3.5 h-3.5" />
            Enviar a Revisión STCC
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Individual prueba row ── */
interface PruebaRowProps {
  prueba: FfqqTest;
  isExpanded: boolean;
  onToggle: () => void;
  resultado: string;
  onResultadoChange: (v: string) => void;
}

function resolverNombre(corto?: string) {
  if (corto === 'Karla') return 'Karla Suazo';
  if (corto === 'Jorge') return 'Jorge Matute';
  return corto ?? '—';
}

function PruebaRow({ prueba, isExpanded, onToggle, resultado, onResultadoChange }: PruebaRowProps) {
  return (
    <div>
      {/* Row header — always clickable */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={onToggle}
      >
        {/* Código */}
        <span className="text-xs font-mono text-slate-400 w-8 shrink-0">{prueba.codigo}</span>

        {/* Nombre */}
        <span className="text-sm font-semibold text-slate-700 flex-1">{prueba.prueba}</span>

        {/* Técnica */}
        <span className="text-xs text-slate-400 hidden sm:block w-44 shrink-0">{prueba.tecnica}</span>

        {/* Analista */}
        <span className="text-xs text-slate-500 w-12 shrink-0">{prueba.analista}</span>

        {/* Completada dot */}
        {prueba.estado === 'completada' && (
          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
        )}

        {/* RT badge */}
        {prueba.rt ? (
          <span
            className="px-2 py-0.5 rounded text-[10px] font-bold border shrink-0"
            style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)', opacity: 0.85 }}
          >
            {prueba.rt}
          </span>
        ) : (
          <span className="w-10 shrink-0" />
        )}

        {/* Estado badge */}
        <EstadoBadge estado={prueba.estado} />

        {/* Chevron */}
        {isExpanded
          ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        }
      </div>

      {/* ── Expanded panel ── */}
      {isExpanded && (
        <div className="mx-4 mb-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          {prueba.estado === 'completada' ? (
            /* Completada: 2-col read-only */
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <FieldReadOnly label="Especificación"     value={prueba.especificacion ?? '—'} />
                <FieldReadOnly label="Técnica Utilizada"  value={prueba.tecnica         ?? '—'} />
                <FieldReadOnly label="Analista Responsable" value={resolverNombre(prueba.analista)} />
              </div>
              <div>
                <FieldReadOnly label="Resultado Obtenido" value={prueba.resultado ?? '—'} />
              </div>
            </div>
          ) : prueba.estado === 'en_proceso' ? (
            /* En proceso: captura de resultado */
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <FieldReadOnly label="Especificación"       value={prueba.especificacion ?? '—'} />
                <FieldReadOnly label="Técnica Utilizada"    value={prueba.tecnica         ?? '—'} />
                <FieldReadOnly label="Analista Responsable" value={resolverNombre(prueba.analista)} />
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Resultado Obtenido{' '}
                    <span className="text-slate-300 font-normal normal-case">(en captura)</span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 resize-none"
                    placeholder="Ingrese el resultado obtenido..."
                    value={resultado}
                    onChange={e => onResultadoChange(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-colors"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Guardar Resultado
                  </button>
                  {prueba.rt && (
                    <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                      <FileText className="w-3 h-3" />
                      {prueba.rt}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Pendiente: formulario igual que en_proceso */
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <FieldReadOnly label="Especificación"       value={prueba.especificacion ?? '—'} />
                <FieldReadOnly label="Técnica Utilizada"    value={prueba.tecnica         ?? '—'} />
                <FieldReadOnly label="Analista Responsable" value={resolverNombre(prueba.analista)} />
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    Resultado Obtenido{' '}
                    <span className="text-slate-300 font-normal normal-case">(en captura)</span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 resize-none"
                    placeholder="Ingrese el resultado obtenido..."
                    value={resultado}
                    onChange={e => onResultadoChange(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-colors"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Guardar Resultado
                  </button>
                  {prueba.rt && (
                    <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                      <FileText className="w-3 h-3" />
                      {prueba.rt}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Estado badge ── */
function EstadoBadge({ estado }: { estado: FfqqTest['estado'] }) {
  if (estado === 'completada') return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-200 shrink-0">
      <CheckCircle2 className="w-3 h-3" /> Completada
    </span>
  );
  if (estado === 'en_proceso') return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200 shrink-0">
      <Clock className="w-3 h-3" /> En Proceso
    </span>
  );
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[10px] font-semibold border border-slate-200 shrink-0">
      <AlertCircle className="w-3 h-3" /> Pendiente
    </span>
  );
}

/* ── Helpers ── */
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

function FieldReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 leading-relaxed">{value}</div>
    </div>
  );
}
