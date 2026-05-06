import type { IncomeDetail, ProcessStep } from '../../_types/income.types';
import { Activity, AlertTriangle, CheckCircle2, Clock, Minus } from 'lucide-react';

interface Props { detail: IncomeDetail }

// Granular labels mapped to ProcessStep area, used to render the detailed
// "Progreso del Proceso" timeline like the reference design.
const STEP_LABELS: { area: string; label: string }[] = [
  { area: 'RAC',           label: 'Recepcion RAC' },
  { area: 'Documentacion', label: 'Documentacion DOCT' },
  { area: 'Estandar',      label: 'Estandar de Referencia' },
  { area: 'FFQQ',          label: 'Analisis FFQQ' },
  { area: 'Microbiologia', label: 'Microbiologia' },
  { area: 'STCC',          label: 'Revision STCC' },
  { area: 'Dir. Tecnica',  label: 'Direccion Tecnica' },
  { area: 'Dir. General',  label: 'Direccion General' },
];

export function TabResumen({ detail }: Props) {
  const pasosOrdenados = STEP_LABELS.map(s => {
    const found = detail.pasos.find(p => p.area === s.area);
    return { ...s, paso: found };
  });

  const totalSampling = detail.rac.cantidadesPorDestino?.find(d => /total/i.test(d.destino))?.cantidad
    ?? detail.productoDetalle.cantidadMuestra
    ?? 0;
  const ffqqQty   = detail.rac.cantidadesPorDestino?.find(d => /ffqq/i.test(d.destino))?.cantidad ?? 0;
  const microQty  = detail.rac.cantidadesPorDestino?.find(d => /micro/i.test(d.destino))?.cantidad ?? 0;
  const biblioQty = detail.rac.cantidadesPorDestino?.find(d => /biblio/i.test(d.destino))?.cantidad ?? 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {detail.bloqueado && detail.motivoBloqueo && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">{detail.motivoBloqueo}</p>
        </div>
      )}

      {/* Progreso del Proceso */}
      <div>
        <h3 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" /> Progreso del Proceso
        </h3>
        <ProgressTimeline pasos={pasosOrdenados} />
      </div>

      {/* Three-column data summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50/50 rounded-lg p-5 border border-slate-100 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Datos del Producto</h4>
          <DataRow label="Nombre Comercial" value={detail.productoDetalle.nombreComercial} bold />
          <DataRow label="Concentracion"    value={detail.productoDetalle.concentracion} />
          <DataRow label="Forma Farmaceutica" value={detail.productoDetalle.formaFarmaceutica} />
          {detail.productoDetalle.registroAnterior && (
            <DataRow label="Registro Sanitario" value={detail.productoDetalle.registroAnterior} />
          )}
          {detail.productoDetalle.lote && (
            <DataRow label="Lote" value={detail.productoDetalle.lote} mono bold last />
          )}
        </div>

        <div className="bg-slate-50/50 rounded-lg p-5 border border-slate-100 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Fabricante / Titular</h4>
          <DataRow label="Fabricante" value={detail.productoDetalle.fabricante} />
          <DataRow label="Titular"    value={detail.empresa} />
          <DataRow label="Pais Origen" value={detail.productoDetalle.paisOrigen} />
          {detail.productoDetalle.presentacion && (
            <DataRow label="Presentacion" value={detail.productoDetalle.presentacion} />
          )}
          {detail.solicitanteDetalle.nombre && (
            <DataRow label="Representante" value={detail.solicitanteDetalle.nombre} last />
          )}
        </div>

        <div className="bg-slate-50/50 rounded-lg p-5 border border-slate-100 shadow-sm">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Datos de Recepcion</h4>
          {detail.rac.nroRecepcion && <DataRow label="No. Recepcion" value={detail.rac.nroRecepcion} mono bold />}
          <DataRow label="Correlativo"     value={detail.correlativo} mono />
          <DataRow label="Tipo de Tramite" value={detail.tipoTramite} />
          <DataRow label="Fecha Recepcion" value={detail.rac.fechaIngreso} />
          {detail.rac.nroOrden && <DataRow label="No. Orden" value={detail.rac.nroOrden} mono />}
          {detail.rac.nroLicitacion && detail.rac.nroLicitacion !== 'N/A' && (
            <DataRow label="No. Licitacion" value={detail.rac.nroLicitacion} mono last />
          )}
        </div>
      </div>

      {/* Distribucion de Cantidades */}
      <div>
        <h3 className="font-bold text-slate-800 text-sm mb-4">Distribucion de Cantidades</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuantityCard label="Total Recibida"     value={totalSampling} color="text-slate-900" />
          <QuantityCard label="Para FFQQ"          value={ffqqQty}        color="text-primary" />
          <QuantityCard label="Para Micro"         value={microQty}       color="text-primary" />
          <QuantityCard label="Muestra Biblioteca" value={biblioQty}      color="text-purple-700" />
        </div>
      </div>

      {/* Observaciones de recepcion */}
      {detail.rac.observaciones && (
        <div className="bg-slate-50/50 rounded-lg border border-slate-100 p-4 flex gap-3 items-start">
          <div className="w-7 h-7 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Observaciones de Recepcion</p>
            <p className="text-xs text-slate-700 leading-relaxed">{detail.rac.observaciones}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DataRow({
  label, value, bold = false, mono = false, last = false,
}: { label: string; value: string; bold?: boolean; mono?: boolean; last?: boolean }) {
  return (
    <div className={`flex justify-between items-start gap-4 ${last ? '' : 'border-b border-slate-100 pb-2 mb-2'}`}>
      <span className="text-xs text-slate-500 shrink-0">{label}</span>
      <span className={`text-sm text-right text-slate-900 ${bold ? 'font-bold' : 'font-medium'} ${mono ? 'font-mono' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function QuantityCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="border border-slate-200 rounded-lg p-5 text-center flex flex-col justify-center shadow-sm bg-white">
      <span className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">{label}</span>
      <span className={`text-3xl font-black ${color}`}>{value}</span>
      <span className="text-[10px] text-slate-400 mt-1">unidades</span>
    </div>
  );
}

function ProgressTimeline({
  pasos,
}: {
  pasos: { area: string; label: string; paso?: ProcessStep }[];
}) {
  const completedCount = pasos.filter(p => p.paso?.status === 'completado').length;
  const completedPct = (completedCount / Math.max(1, pasos.length - 1)) * 100;

  return (
    <div className="relative w-full overflow-x-auto custom-scrollbar pb-2">
      <div className="flex items-start relative px-2 min-w-[900px]">
        <div className="absolute left-8 right-8 top-5 h-1 bg-slate-100 rounded-full -z-10" />
        <div
          className="absolute left-8 top-5 h-1 bg-success rounded-full -z-10"
          style={{ width: `calc(${completedPct}% - 2rem)` }}
        />

        {pasos.map((item, i) => {
          const status = item.paso?.status ?? 'pendiente';
          const isDone    = status === 'completado';
          const isActive  = status === 'activo';
          const isSkipped = status === 'saltado';

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2.5 group relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white transition-all z-10 shadow-sm ${
                isDone    ? 'bg-success text-white' :
                isActive  ? 'bg-primary text-white ring-4 ring-primary/20 scale-110' :
                isSkipped ? 'bg-slate-100 text-slate-300' :
                            'bg-white border-slate-200 text-slate-300'
              }`}>
                {isDone    && <CheckCircle2 className="w-5 h-5" />}
                {isActive  && <Clock className="w-5 h-5 animate-pulse" />}
                {isSkipped && <Minus className="w-4 h-4" />}
                {!isDone && !isActive && !isSkipped && <div className="w-2 h-2 bg-slate-300 rounded-full" />}
              </div>

              <span className={`text-[10px] font-bold text-center leading-tight uppercase tracking-tight px-1 ${
                isDone   ? 'text-success' :
                isActive ? 'text-primary' :
                           'text-slate-400'
              }`}>
                {item.label}
              </span>

              {item.paso && (item.paso.fechaInicio || item.paso.fechaFin) && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30 shadow-xl">
                  {item.paso.fechaInicio && <p>Inicio: {item.paso.fechaInicio}</p>}
                  {item.paso.fechaFin && <p>Fin: {item.paso.fechaFin}</p>}
                  {item.paso.diasUsados != null && (
                    <p className={isDone ? 'text-green-300' : 'text-amber-300'}>
                      {item.paso.diasUsados}/{item.paso.diasDisponibles} dias
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
