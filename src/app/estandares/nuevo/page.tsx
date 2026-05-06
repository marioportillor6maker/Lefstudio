'use client';
import { useState } from 'react';
import { Star, Printer, XCircle, CheckCircle2 } from 'lucide-react';

const TIPOS = ['USP Reference Standard','EP Reference Standard','Working Standard','In-House Standard'];
const PROVEEDORES = ['USP (United States Pharmacopeia)','EP (European Pharmacopoeia)','Sigma-Aldrich','Merck KGaA','Otro'];
const CONDICIONES = ['Temperatura ambiente (15-30°C)','Refrigeración (2-8°C)','Congelación (-20°C)','Proteger de la luz'];

const CHECKLIST_ITEMS = [
  'Certificado de Análisis recibido',
  'Certificado de Pureza / Potencia recibido',
  'Fecha de vencimiento verificada',
  'Condiciones de almacenamiento verificadas',
  'Cantidad verificada contra factura/remisión',
  'Integridad del envase verificada',
];

export default function RegistroRG44() {
  const [nombre, setNombre]               = useState('');
  const [tipo, setTipo]                   = useState('USP Reference Standard');
  const [lote, setLote]                   = useState('');
  const [certificado, setCertificado]     = useState('');
  const [proveedor, setProveedor]         = useState('USP (United States Pharmacopeia)');
  const [cantidad, setCantidad]           = useState('');
  const [unidad, setUnidad]               = useState('mg');
  const [pureza, setPureza]               = useState('');
  const [fechaRecepcion, setFechaRecepcion] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [fechaApertura, setFechaApertura] = useState('');
  const [condicion, setCondicion]         = useState('Temperatura ambiente (15-30°C)');
  const [ubicacion, setUbicacion]         = useState('');
  const [responsable, setResponsable]     = useState('Q.F. Luis Hernández');
  const [checks, setChecks]               = useState<boolean[]>(Array(6).fill(false));
  const [observaciones, setObservaciones] = useState('');
  const [rt30, setRt30]                   = useState('');
  const [recepcion, setRecepcion]         = useState('');
  const [saved, setSaved]                 = useState(false);
  const [rejected, setRejected]           = useState(false);

  const toggleCheck = (i: number) =>
    setChecks(prev => prev.map((v, idx) => idx === i ? !v : v));

  const reset = () => {
    setNombre(''); setLote(''); setCertificado(''); setCantidad('');
    setPureza(''); setFechaRecepcion(''); setFechaVencimiento('');
    setFechaApertura(''); setUbicacion(''); setObservaciones('');
    setRt30(''); setRecepcion(''); setChecks(Array(6).fill(false));
  };

  const handleRegistrar = () => {
    setSaved(true);
    reset();
    setTimeout(() => setSaved(false), 3500);
  };

  const handleRechazar = () => {
    setRejected(true);
    reset();
    setTimeout(() => setRejected(false), 3500);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Toast success */}
      {saved && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-md shadow-xl text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> Estándar registrado en RG-44 exitosamente.
        </div>
      )}
      {rejected && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-red-600 text-white px-5 py-3 rounded-md shadow-xl text-sm font-semibold">
          <XCircle className="w-4 h-4 shrink-0" /> Rechazo RG-58 generado.
        </div>
      )}

      {/* Main form card */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        {/* Card title */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Star className="w-4 h-4 text-[var(--color-primary)] fill-[var(--color-primary)]" />
          <span className="font-semibold text-slate-800 text-sm">Registro de Estándar de Referencia — RG-44</span>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Row 1: Nombre (2 cols) + Tipo */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nombre del Estándar <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ej. Amoxicilina Trihidrato USP Reference Standard"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm pr-10 focus:outline-none focus:border-[var(--color-primary)] bg-white"
                />
                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold border border-slate-200 rounded px-1 py-0.5 bg-slate-50 leading-none">
                  ···
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tipo de Estándar</label>
              <select
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {TIPOS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2: Lote + Certificado + Proveedor */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Número de Lote <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej. USP-AMX-2024A"
                value={lote}
                onChange={e => setLote(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white font-mono placeholder:font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Número de Certificado <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej. CERT-USP-001"
                value={certificado}
                onChange={e => setCertificado(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white font-mono placeholder:font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Proveedor / Fuente</label>
              <select
                value={proveedor}
                onChange={e => setProveedor(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {PROVEEDORES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Row 3: Cantidad + Unidad + Pureza */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Cantidad Recibida <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="0.0"
                value={cantidad}
                onChange={e => setCantidad(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Unidad</label>
              <select
                value={unidad}
                onChange={e => setUnidad(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {['mg','g','mL','UI','µg'].map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pureza / Potencia (%)</label>
              <input
                type="text"
                placeholder="Ej. 99.8"
                value={pureza}
                onChange={e => setPureza(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
          </div>

          {/* Row 4: Fecha Recepción + Vencimiento + Apertura */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fecha de Recepción <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={fechaRecepcion}
                onChange={e => setFechaRecepcion(e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fecha de Vencimiento <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={fechaVencimiento}
                onChange={e => setFechaVencimiento(e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fecha de Apertura</label>
              <input
                type="date"
                value={fechaApertura}
                onChange={e => setFechaApertura(e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
          </div>

          {/* Row 5: Condición + Ubicación + Responsable */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Condición de Almacenamiento</label>
              <select
                value={condicion}
                onChange={e => setCondicion(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {CONDICIONES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ubicación en Almacén</label>
              <input
                type="text"
                placeholder="Ej. Refrigerador A, Gaveta 2"
                value={ubicacion}
                onChange={e => setUbicacion(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Responsable de Recepción</label>
              <input
                type="text"
                value={responsable}
                onChange={e => setResponsable(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="pt-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Validación Documental del Estándar
            </p>
            <div className="space-y-2.5">
              {CHECKLIST_ITEMS.map((item, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checks[i]}
                    onChange={() => toggleCheck(i)}
                    className="w-4 h-4 rounded border-slate-300 accent-[var(--color-primary)] cursor-pointer"
                  />
                  <span className={`text-sm transition-colors ${checks[i] ? 'text-slate-800' : 'text-slate-600'}`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Observaciones del Registro</label>
            <textarea
              rows={3}
              placeholder="Observaciones sobre el estándar recibido..."
              value={observaciones}
              onChange={e => setObservaciones(e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white resize-none"
            />
          </div>

          {/* Recepción Asociada RT-30 */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Recepción Asociada (RT-30)
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">RT-30 de Origen</label>
                <input
                  type="text"
                  placeholder="Ej. RT30-2024-0089 — REC-2024-00147 AMOXICILINA"
                  value={rt30}
                  onChange={e => setRt30(e.target.value)}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Recepción Beneficiaria</label>
                <input
                  type="text"
                  placeholder="Ej. REC-2024-00147"
                  value={recepcion}
                  onChange={e => setRecepcion(e.target.value)}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white font-mono placeholder:font-sans"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex items-center gap-3">
          <button
            onClick={handleRegistrar}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded text-sm font-bold shadow-sm transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> Registrar en RG-44
          </button>
          <button
            onClick={handleRechazar}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded text-sm font-semibold transition-colors"
          >
            <XCircle className="w-4 h-4 text-red-500" /> Rechazar (RG-58)
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded text-sm font-semibold transition-colors">
            <Printer className="w-4 h-4" /> Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}
