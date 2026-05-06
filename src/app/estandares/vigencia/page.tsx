import { AlertTriangle } from 'lucide-react';

const VENCEN_30 = [
  { nombre: 'Atorvastatina Cálcica USP RS', fecha: '28/02/2025' },
  { nombre: 'Losartán Potásico USP RS',     fecha: '15/02/2025' },
];
const VENCEN_60 = [
  { nombre: 'Omeprazol USP RS',  fecha: '15/03/2025' },
  { nombre: 'Amlodipino USP RS', fecha: '30/03/2025' },
];
const VENCIDOS = [
  { nombre: 'Ibuprofeno USP RS',  fecha: '31/01/2024' },
  { nombre: 'Paracetamol USP RS', fecha: '15/01/2024' },
];

const MOVIMIENTOS = [
  { fecha: '18/01/2024', estandar: 'Amoxicilina Trihidrato USP RS', tipo: 'Entrega', cantidad: -50,  saldo: 320, unidad: 'mg', responsable: 'Luis Hernández', referencia: 'RT27-2024-001' },
  { fecha: '18/01/2024', estandar: 'Amoxicilina Trihidrato USP RS', tipo: 'Entrega', cantidad: -30,  saldo: 370, unidad: 'mg', responsable: 'Luis Hernández', referencia: 'RT27-2024-002' },
  { fecha: '15/01/2024', estandar: 'Amoxicilina Trihidrato USP RS', tipo: 'Ingreso', cantidad: +500, saldo: 500, unidad: 'mg', responsable: 'Luis Hernández', referencia: 'RG44-2024-001' },
];

export default function ControlVigencia() {
  return (
    <div className="space-y-5 pb-12">
      {/* Alert cards row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Vencen 30 días */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <p className="text-xs font-bold text-amber-800 mb-3">Vencen en 30 días</p>
          <div className="space-y-2">
            {VENCEN_30.map(item => (
              <div key={item.nombre} className="flex items-start gap-1.5">
                <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800">
                  {item.nombre} — <span className="font-semibold">{item.fecha}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vencen 60 días */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-xs font-bold text-yellow-800 mb-3">Vencen en 60 días</p>
          <div className="space-y-2">
            {VENCEN_60.map(item => (
              <div key={item.nombre} className="flex items-start gap-1.5">
                <AlertTriangle className="w-3 h-3 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-yellow-800">
                  {item.nombre} — <span className="font-semibold">{item.fecha}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vencidos */}
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-xs font-bold text-red-700 mb-3">Vencidos</p>
          <div className="space-y-2">
            {VENCIDOS.map(item => (
              <div key={item.nombre} className="flex items-start gap-1.5">
                <AlertTriangle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-red-700">
                  {item.nombre} — <span className="font-semibold">{item.fecha}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Movimientos table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <p className="font-semibold text-slate-800 text-sm">Movimientos de Estándares</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['FECHA','ESTÁNDAR','TIPO MOVIMIENTO','CANTIDAD','SALDO','RESPONSABLE','REFERENCIA'].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOVIMIENTOS.map((row, i) => {
                const isEntrega = row.tipo === 'Entrega';
                return (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors h-[60px]">
                    <td className="px-5 text-xs text-slate-500">{row.fecha}</td>
                    <td className="px-5 text-xs font-medium text-slate-800">{row.estandar}</td>
                    <td className="px-5">
                      <span className={`text-xs font-semibold ${isEntrega ? 'text-[var(--color-primary)]' : 'text-green-600'}`}>
                        {row.tipo}
                      </span>
                    </td>
                    <td className="px-5">
                      <span className={`text-xs font-bold ${isEntrega ? 'text-red-500' : 'text-green-600'}`}>
                        {isEntrega ? '' : '+'}{row.cantidad} <span className="text-[10px] font-normal">{row.unidad}</span>
                      </span>
                    </td>
                    <td className="px-5">
                      <span className="text-xs text-slate-600">{row.saldo} <span className="text-[10px] text-slate-400">{row.unidad}</span></span>
                    </td>
                    <td className="px-5 text-xs text-slate-600">{row.responsable}</td>
                    <td className="px-5 text-[11px] text-slate-400 font-mono">{row.referencia}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
