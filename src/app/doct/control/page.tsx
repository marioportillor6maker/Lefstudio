import { AlertTriangle, XOctagon } from 'lucide-react';

const PENDIENTES = [
  { recepcion:'REC-2024-00148', producto:'METFORMINA 850mg',    pendiente:'Estándar de referencia',   dias:12 },
  { recepcion:'REC-2024-00149', producto:'ATORVASTATINA 20mg',  pendiente:'Metodología analítica',    dias:8  },
  { recepcion:'REC-2024-00150', producto:'IBUPROFENO 400mg',    pendiente:'Certificado de análisis',  dias:3  },
];

const BLOQUEADOS = [
  { recepcion:'REC-2024-00151', producto:'CIPROFLOXACINO 500mg', bloqueo:'Pdte. Estándar',    dias:25 },
  { recepcion:'REC-2024-00152', producto:'OMEPRAZOL 20mg',       bloqueo:'Pdte. Información', dias:18 },
];

const COMPRAS = [
  { recepcion:'REC-2024-00147', item:'Amoxicilina Trihidrato USP RS', cantidad:'200 mg', proveedor:'Sigma-Aldrich',        fecha:'11/01/2024', estado:'en_proceso' },
  { recepcion:'REC-2024-00151', item:'Ciprofloxacino HCl USP RS',     cantidad:'100 mg', proveedor:'USP Reference Standards',fecha:'15/01/2024', estado:'solicitado' },
];

export default function ControlExpedientePage() {
  return (
    <div className="space-y-6">
      {/* Top 2-col layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pendientes documentales */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="text-sm font-bold text-slate-700 mb-4">Pendientes Documentales</h4>
          <div className="space-y-3">
            {PENDIENTES.map(p => (
              <div key={p.recepcion} className="flex items-start gap-3 p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-700">{p.recepcion}</p>
                    <span className="text-[10px] font-bold text-amber-600">{p.dias}d</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{p.producto}</p>
                  <p className="text-[11px] font-medium text-amber-600 mt-0.5">Pendiente: {p.pendiente}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bloqueados */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="text-sm font-bold text-slate-700 mb-4">Bloqueados por Información/Estándar</h4>
          <div className="space-y-3">
            {BLOQUEADOS.map(b => (
              <div key={b.recepcion} className="flex items-start gap-3 p-3.5 rounded-xl border border-red-200 bg-red-50/40">
                <XOctagon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-700">{b.recepcion}</p>
                    <span className="text-[10px] font-bold text-red-500">{b.dias}d</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{b.producto}</p>
                  <p className="text-[11px] font-medium text-red-500 mt-0.5">Bloqueo: {b.bloqueo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pendientes de Compra RG-39 */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h4 className="text-sm font-bold text-slate-700">Pendientes de Compra — RG-39</h4>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['RECEPCIÓN','ÍTEM REQUERIDO','CANTIDAD','PROVEEDOR','FECHA SOLICITUD','ESTADO COMPRA'].map(h=>(
                <th key={h} className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {COMPRAS.map(c=>(
              <tr key={c.recepcion + c.item} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-xs font-bold" style={{ color:'var(--color-primary)' }}>{c.recepcion}</td>
                <td className="px-4 py-3 text-xs text-slate-700">{c.item}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{c.cantidad}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{c.proveedor}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{c.fecha}</td>
                <td className="px-4 py-3 text-xs font-semibold">
                  {c.estado === 'en_proceso'
                    ? <span className="flex items-center gap-1 text-blue-600"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> En Proceso</span>
                    : <span className="flex items-center gap-1 text-amber-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Solicitado</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
