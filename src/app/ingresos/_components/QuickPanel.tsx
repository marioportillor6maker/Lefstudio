"use client";

import { X, Eye, AlertTriangle, Pill, Building2, User, Package, Clock } from 'lucide-react';
import Link from 'next/link';
import type { IncomeRecord } from '../_types/income.types';
import { EstadoBadge, TipoBadge } from './IncomeBadges';
import { getIncomeDetail } from '../_data/incomeMockData';

interface Props {
  record: IncomeRecord | null;
  onClose: () => void;
}

function fmtDate(iso: string): string {
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function QuickPanel({ record, onClose }: Props) {
  if (!record) return null;

  const detail      = getIncomeDetail(record.correlativo);
  const cantidades  = detail?.rac.cantidadesPorDestino ?? [];
  const nroRec      = `REC-${record.correlativo.replace('LEF-', '')}`;

  const slaColor =
    record.sla === 'danger'  ? 'text-red-600 bg-red-50 border-red-200' :
    record.sla === 'warning' ? 'text-amber-600 bg-amber-50 border-amber-200' :
                               'text-green-700 bg-green-50 border-green-200';

  const slaLabel =
    record.sla === 'danger'  ? 'SLA Vencido' :
    record.sla === 'warning' ? 'Por Vencer' :
                               'A Tiempo';

  return (
    <div className="w-80 shrink-0 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl">

      {/* Header */}
      <div className="flex items-start justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-50 shrink-0">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Detalle del Expediente</p>
          <p className="text-sm font-bold text-primary font-mono mt-0.5">{record.correlativo}</p>
          <p className="text-[10px] text-slate-400 font-mono">{nroRec}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-colors mt-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Status strip */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-slate-100 bg-white">
        <EstadoBadge estado={record.estadoActual} />
        <TipoBadge  tipo={record.tipoTramite} />
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* Bloqueo alert */}
        {record.bloqueado && (
          <div className="mx-4 mt-3 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-red-700 uppercase tracking-wide">Expediente Bloqueado</p>
              {record.motivoBloqueo && (
                <p className="text-[10px] text-red-600 mt-0.5 leading-relaxed">{record.motivoBloqueo}</p>
              )}
            </div>
          </div>
        )}

        <div className="p-4 space-y-4">

          {/* PRODUCTO */}
          <PanelSection title="Producto" icon={<Pill className="w-3 h-3" />}>
            <InfoRow label="Nombre"       value={record.producto} />
            {detail?.productoDetalle.formaFarmaceutica && (
              <InfoRow label="Forma Farm." value={detail.productoDetalle.formaFarmaceutica} />
            )}
            {detail?.productoDetalle.concentracion && (
              <InfoRow label="Concentración" value={detail.productoDetalle.concentracion} />
            )}
            {detail?.productoDetalle.presentacion && (
              <InfoRow label="Presentación" value={detail.productoDetalle.presentacion} />
            )}
          </PanelSection>

          {/* CLIENTE */}
          <PanelSection title="Cliente" icon={<Building2 className="w-3 h-3" />}>
            <InfoRow label="Empresa"        value={record.empresa} />
            <InfoRow label="Representante"  value={record.solicitante} />
          </PanelSection>

          {/* RESPONSABLE Y FECHAS */}
          <PanelSection title="Responsable y Fechas" icon={<User className="w-3 h-3" />}>
            {record.responsableActual && (
              <InfoRow label="Responsable" value={record.responsableActual} />
            )}
            <InfoRow label="F. Recepción" value={fmtDate(record.fechaIngreso)} />
            <div className="flex items-center justify-between pt-1 mt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Clock className="w-3 h-3" />
                Días en proceso
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-800">
                  {record.diasTranscurridos}
                  <span className="font-normal text-slate-400"> / {record.diasLimite}d</span>
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${slaColor}`}>
                  {slaLabel}
                </span>
              </div>
            </div>
          </PanelSection>

          {/* CANTIDADES */}
          {cantidades.length > 0 && (
            <PanelSection title="Cantidades" icon={<Package className="w-3 h-3" />}>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {cantidades.map((c, i) => (
                  <div key={i} className="bg-white rounded-lg p-2.5 text-center border border-slate-200 shadow-sm">
                    <p className="text-xl font-black text-slate-800">{c.cantidad}</p>
                    <p className="text-[9px] text-slate-500 font-semibold leading-tight mt-0.5">{c.destino}</p>
                    <p className="text-[9px] text-slate-400">{c.unidad}</p>
                  </div>
                ))}
              </div>
            </PanelSection>
          )}

        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
        <Link
          href={`/ingresos/${encodeURIComponent(record.correlativo)}/vista-360`}
          className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Abrir Vista 360 Completa
        </Link>
      </div>
    </div>
  );
}

function PanelSection({ title, icon, children }: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
        <span className="text-slate-400">{icon}</span>
        {title}
      </h4>
      <div className="space-y-1.5 bg-slate-50 rounded-lg p-3 border border-slate-100">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-[10px] text-slate-500 shrink-0">{label}</span>
      <span className="text-[10px] font-semibold text-slate-700 text-right leading-tight">{value}</span>
    </div>
  );
}
