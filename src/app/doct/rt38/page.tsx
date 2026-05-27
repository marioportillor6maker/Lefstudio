'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileText, Send, Printer, CheckCircle2, X, ClipboardList } from 'lucide-react';
import { ConfigurarRT38 } from './_components/ConfigurarRT38';


const METODOLOGIAS = [
  'USP 47 — Amoxicillin Capsules',
  'BP 2024 — Amoxicillin Capsules',
  'Ph. Eur. 10 — Amoxicillin',
  'Metodología Interna LEF-M-001',
];

const ESTADOS = ['En Preparación', 'En Revisión', 'Aprobado', 'Observado', 'Rechazado'];

interface TomaMuestra {
  responsableLEF: string;
  responsableExterno: string;
  lugar: string;
  tamanoLote: string;
  cantidadTomada: string;
  fecha: string;
  procedimiento: string;
  acta: string;
}

const TOMA_MUESTRA_MOCK: Record<string, TomaMuestra> = {
  'REC-2024-1030': {
    responsableLEF:      'Q.F. Carlos Reyes',
    responsableExterno:  'Ing. Patricia Solís',
    lugar:               'Bodega Principal — Estante B2',
    tamanoLote:          '85,000 tabletas',
    cantidadTomada:      '300 tabletas',
    fecha:               '2024-01-10',
    procedimiento:       'PNO-LEF-002 — Toma de Muestra de Tabletas',
    acta:                'ACTA-2024-0091',
  },
  'REC-2024-1029': {
    responsableLEF:      'Q.F. Mónica Álvarez',
    responsableExterno:  'Lic. Juan Hernández',
    lugar:               'Almacén Secundario — Zona Fría',
    tamanoLote:          '60,000 tabletas',
    cantidadTomada:      '150 tabletas',
    fecha:               '2024-01-08',
    procedimiento:       'PNO-LEF-002 — Toma de Muestra de Tabletas',
    acta:                'ACTA-2024-0090',
  },
  'REC-2024-1028': {
    responsableLEF:      'Q.F. Ana Patricia Flores',
    responsableExterno:  'Ing. Roberto Méndez',
    lugar:               'Almacén Central — Bodega 3',
    tamanoLote:          '20,000 frascos',
    cantidadTomada:      '120 frascos',
    fecha:               '2024-01-16',
    procedimiento:       'PNO-LEF-003 — Toma de Muestra de Líquidos',
    acta:                'ACTA-2024-0089',
  },
  'REC-2024-1024': {
    responsableLEF:      'Q.F. Diego Martínez',
    responsableExterno:  'Téc. Sandra López',
    lugar:               'Bodega Auxiliar — Nivel 1',
    tamanoLote:          '100,000 tabletas',
    cantidadTomada:      '400 tabletas',
    fecha:               '2024-01-11',
    procedimiento:       'PNO-LEF-002 — Toma de Muestra de Tabletas',
    acta:                'ACTA-2024-0092',
  },
};

const DEFAULT_TOMA: TomaMuestra = {
  responsableLEF:      'Q.F. Ana Patricia Flores',
  responsableExterno:  'Ing. Roberto Méndez',
  lugar:               'Almacén Central — Bodega 3',
  tamanoLote:          '50,000 unidades',
  cantidadTomada:      '200 unidades',
  fecha:               '2024-01-16',
  procedimiento:       'PNO-LEF-001 — Toma de Muestra de Sólidos Orales',
  acta:                'ACTA-2024-0089',
};

export default function Rt38Page() {
  const searchParams  = useSearchParams();
  const recepcion     = searchParams.get('recepcion') ?? '—';
  const producto      = searchParams.get('producto')  ?? '—';
  const lote          = searchParams.get('lote')      ?? '—';
  const empresa       = searchParams.get('empresa')   ?? '—';
  const toma          = TOMA_MUESTRA_MOCK[recepcion] ?? DEFAULT_TOMA;

  const [obs, setObs]             = useState('');
  const [saved, setSaved]         = useState(false);
  const [metodologia, setMetodologia] = useState(METODOLOGIAS[0]);
  const [estado, setEstado]           = useState(ESTADOS[0]);

  return (
    <div className="space-y-6">

      {/* ── Datos del Expediente (from RAC) ──────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
          <ClipboardList className="w-4 h-4" style={{ color:'var(--color-primary)' }} />
          Datos del Expediente
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <InfoCard label="N° de Recepción"    value={recepcion} />
          <InfoCard label="Producto"            value={producto} />
          <InfoCard label="Lote del Fabricante" value={lote} />
          <InfoCard label="Cliente / Empresa"   value={empresa} />
        </div>
      </div>

      {/* ── Preparación RT-38 ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
          <FileText className="w-4 h-4" style={{ color:'var(--color-primary)' }} />
          Preparación de Expediente Analítico — RT-38
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <Field label="Responsable DOCT">
            <input className={INPUT} defaultValue="Q.F. Ana Patricia Flores" readOnly />
          </Field>
          <Field label="Metodología de Referencia">
            <select
              className={SELECT}
              value={metodologia}
              onChange={e => setMetodologia(e.target.value)}
            >
              {METODOLOGIAS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
          <Field label="Estado del Expediente">
            <select
              className={SELECT}
              value={estado}
              onChange={e => setEstado(e.target.value)}
            >
              {ESTADOS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        {/* ── Toma de Muestra ─────────────────────────────────────────── */}
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Toma de Muestra</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <Field label="Responsable del LEF-CQF">
            <input className={INPUT} defaultValue={toma.responsableLEF} />
          </Field>
          <Field label="Responsable del Ente Externo">
            <input className={INPUT} defaultValue={toma.responsableExterno} />
          </Field>
          <Field label="Lugar de Toma de Muestra">
            <input className={INPUT} defaultValue={toma.lugar} />
          </Field>
          <Field label="Tamaño del Lote">
            <input className={INPUT} defaultValue={toma.tamanoLote} />
          </Field>
          <Field label="Cantidad Tomada">
            <input className={INPUT} defaultValue={toma.cantidadTomada} />
          </Field>
          <Field label="Fecha de Toma de Muestra">
            <input type="date" className={INPUT} defaultValue={toma.fecha} />
          </Field>
          <Field label="Procedimiento">
            <input className={INPUT} defaultValue={toma.procedimiento} />
          </Field>
          <Field label="N° de Acta de Toma de Muestra">
            <input className={INPUT} defaultValue={toma.acta} />
          </Field>
        </div>

        {/* ── Observaciones ────────────────────────────────────────────── */}
        <Field label="Observaciones del Expediente Analítico">
          <textarea rows={3} className={INPUT + ' resize-none'} placeholder="Observaciones sobre la configuración del expediente analítico..." value={obs} onChange={e=>setObs(e.target.value)} />
        </Field>

        {/* ── Actions ──────────────────────────────────────────────────── */}
        <div className="flex gap-3 mt-5">
          <button onClick={() => setSaved(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ backgroundColor:'var(--color-primary)' }}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Finalizar RT-38
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Send className="w-3.5 h-3.5" /> Enviar a STR
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Printer className="w-3.5 h-3.5" /> Imprimir
          </button>
        </div>

        {saved && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <p className="text-xs font-semibold text-green-700">RT-38 finalizado y enviado correctamente.</p>
            <button onClick={() => setSaved(false)} className="ml-auto"><X className="w-4 h-4 text-green-400" /></button>
          </div>
        )}
      </div>

      {/* ── Configurar RT-38 (grupos de ensayo) ──────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <ConfigurarRT38 />
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

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5">
      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-xs font-semibold text-slate-700">{value}</p>
    </div>
  );
}

const INPUT  = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 placeholder:text-slate-300';
const SELECT = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 appearance-none cursor-pointer';
