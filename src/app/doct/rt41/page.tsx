'use client';
import { useState } from 'react';
import { RefreshCw, CheckCircle2, XCircle, Printer } from 'lucide-react';

const PREVIAS = [
  { id:'REC-2023-0201', fecha:'15/09/2023', lote:'AM2309A', resultado:'conforme' },
  { id:'REC-2023-0034', fecha:'12/02/2023', lote:'AM2302B', resultado:'no_conforme' },
  { id:'REC-2022-0089', fecha:'28/04/2022', lote:'AM2204C', resultado:'conforme' },
];

const CAMPOS = [
  { campo:'Producto',          actual:'AMOXICILINA 500mg Cápsulas',  anterior:'AMOXICILINA 500mg Cápsulas',  match: true },
  { campo:'Fabricante',        actual:'Laboratorios Vijosa S.A.',     anterior:'Laboratorios Vijosa S.A.',     match: true },
  { campo:'Titular',           actual:'Droguería Nacional HN',        anterior:'Droguería Nacional HN',        match: true },
  { campo:'Registro Sanitario',actual:'RS-HN-0042-2019',              anterior:'RS-HN-0042-2019',              match: true },
  { campo:'Lote',              actual:'AM2401X',                      anterior:'AM2309A',                      match: false },
  { campo:'Fecha Expiración',  actual:'12/2026',                      anterior:'06/2026',                      match: false },
  { campo:'Resultado Previo',  actual:'(En análisis)',                 anterior:'CONFORME',                     match: true },
];

export default function Rt41Page() {
  const [selected, setSelected] = useState('REC-2023-0201');
  const [hallazgos, setHallazgos] = useState('');
  const [saved, setSaved] = useState(false);

  const prev = PREVIAS.find(p => p.id === selected)!;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        {/* Title */}
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
          <RefreshCw className="w-4 h-4" style={{ color:'var(--color-primary)' }} />
          Contraste Histórico — RT-41
        </h3>

        {/* Header fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Field label="Recepción Actual *">
            <input className={INPUT} value="REC-2024-00147 — AMOXICILINA 500mg (Lote AM2401X)" readOnly />
          </Field>
          <Field label="Fecha de Contraste">
            <input type="text" className={INPUT} defaultValue="10/01/2024" />
          </Field>
          <Field label="Responsable DOCT">
            <input className={INPUT} value="Q.F. Ana Patricia Flores" readOnly />
          </Field>
          <Field label="Número de Recepciones Previas Encontradas">
            <input className={INPUT} value={PREVIAS.length} readOnly />
          </Field>
        </div>

        {/* Previous reception cards */}
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Recepciones Previas del Producto</h4>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {PREVIAS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`text-left p-3.5 rounded-xl border-2 transition-colors ${
                selected === p.id ? 'border-[var(--color-primary)] bg-blue-50/40' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <p className="text-xs font-bold" style={{ color:'var(--color-primary)' }}>{p.id}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{p.fecha} — Lote: {p.lote}</p>
              <p className={`text-[11px] font-semibold mt-1.5 flex items-center gap-1 ${p.resultado === 'conforme' ? 'text-green-600' : 'text-red-500'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${p.resultado === 'conforme' ? 'bg-green-500' : 'bg-red-500'}`} />
                {p.resultado === 'conforme' ? 'Conforme' : 'No Conforme'}
              </p>
            </button>
          ))}
        </div>

        {/* Comparison table */}
        <div className="rounded-xl border border-slate-200 overflow-hidden mb-6">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-700">Comparación: Recepción Actual vs {selected}</h4>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className={TH}>Campo</th>
                <th className={TH}>Recepción Actual (REC-2024-00147)</th>
                <th className={TH}>Recepción Anterior ({selected})</th>
                <th className={TH + ' text-center'}>Coincidencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CAMPOS.map(r => (
                <tr key={r.campo} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-xs font-semibold text-slate-600">{r.campo}</td>
                  <td className="px-4 py-3 text-xs text-slate-700">{r.actual}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{r.anterior}</td>
                  <td className="px-4 py-3 text-center">
                    {r.match
                      ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                      : <span className="text-xs font-bold text-amber-500">Diferente</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hallazgos */}
        <Field label="Hallazgos y Observaciones del Contraste">
          <textarea
            rows={3}
            className={INPUT + ' resize-none'}
            placeholder="Documente hallazgos relevantes del contraste histórico: cambios en fabricante, resultados previos no conformes, observaciones técnicas, etc."
            value={hallazgos}
            onChange={e => setHallazgos(e.target.value)}
          />
        </Field>

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setSaved(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ backgroundColor:'var(--color-primary)' }}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Registrar Contraste RT-41
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Printer className="w-3.5 h-3.5" /> Imprimir RT-41
          </button>
        </div>

        {/* Success toast */}
        {saved && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <p className="text-xs font-semibold text-green-700">Contraste RT-41 registrado correctamente.</p>
            <button onClick={() => setSaved(false)} className="ml-auto"><XCircle className="w-4 h-4 text-green-400 hover:text-green-600" /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
      {children}
    </div>
  );
}

const INPUT = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 placeholder:text-slate-300';
const TH    = 'px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider';
