"use client";

import { X, Eye, AlertTriangle, Calendar, User, Building2, Pill, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import type { IncomeRecord } from '../_types/income.types';
import { EstadoBadge, TipoBadge, PrioridadBadge, SlaBadge, ProgressBar } from './IncomeBadges';
import { ProcessFlow } from './ProcessFlow';

interface Props {
  record: IncomeRecord | null;
  onClose: () => void;
}

export function QuickPanel({ record, onClose }: Props) {
  if (!record) return null;

  return (
    <div className="w-80 shrink-0 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vista Rápida</p>
          <p className="text-sm font-bold text-slate-800 font-mono">{record.correlativo}</p>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Estado + Prioridad */}
        <div className="flex items-center justify-between">
          <EstadoBadge estado={record.estadoActual} />
          <PrioridadBadge prioridad={record.prioridad} />
        </div>

        {/* Bloqueo */}
        {record.bloqueado && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-red-700">Expediente Bloqueado</p>
              {record.motivoBloqueo && <p className="text-[10px] text-red-600 mt-0.5">{record.motivoBloqueo}</p>}
            </div>
          </div>
        )}

        {/* Info grid */}
        <div className="space-y-3">
          <InfoRow icon={<Pill className="w-3.5 h-3.5" />} label="Producto" value={record.producto} />
          <InfoRow icon={<Building2 className="w-3.5 h-3.5" />} label="Empresa" value={record.empresa} />
          <InfoRow icon={<User className="w-3.5 h-3.5" />} label="Solicitante" value={record.solicitante} />
          <InfoRow icon={<Tag className="w-3.5 h-3.5" />} label="Tipo de Trámite" value={<TipoBadge tipo={record.tipoTramite} />} />
          <InfoRow icon={<Calendar className="w-3.5 h-3.5" />} label="Fecha Ingreso" value={record.fechaIngreso} />
          {record.responsableActual && (
            <InfoRow icon={<User className="w-3.5 h-3.5" />} label="Responsable Actual" value={record.responsableActual} />
          )}
        </div>

        {/* SLA */}
        <div className="bg-slate-50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-slate-600">SLA / Tiempo</p>
            <SlaBadge sla={record.sla} dias={record.diasTranscurridos} limite={record.diasLimite} />
          </div>
        </div>

        {/* Progreso */}
        <div>
          <p className="text-[10px] font-bold text-slate-600 mb-2">Progreso General</p>
          <ProgressBar value={record.progreso} color={record.progreso >= 100 ? 'bg-green-500' : record.sla === 'danger' ? 'bg-red-500' : 'bg-primary'} />
        </div>

        {/* Flujo de proceso */}
        <div>
          <p className="text-[10px] font-bold text-slate-600 mb-2">Flujo del Proceso</p>
          <div className="flex justify-start">
            <ProcessFlow pasos={record.pasos} compact />
          </div>
          <div className="mt-2 space-y-1">
            {record.pasos.filter(p => p.status === 'activo').map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] text-primary">
                <Clock className="w-3 h-3" />
                <span className="font-semibold">{p.area}</span>
                {p.diasUsados != null && <span className="text-slate-400">— {p.diasUsados} de {p.diasDisponibles} días usados</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <Link
          href={`/ingresos/${record.correlativo}/vista-360`}
          className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-2 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Ver Vista 360
        </Link>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-slate-400 mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-slate-400 font-medium">{label}</p>
        <div className="text-xs font-semibold text-slate-700 truncate">{value}</div>
      </div>
    </div>
  );
}
