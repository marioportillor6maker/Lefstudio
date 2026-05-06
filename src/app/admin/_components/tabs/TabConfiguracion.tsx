"use client";

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FormField, inputCls } from '../AdminBadge';
import { CONFIG_GENERAL_MOCK, CONFIG_SLA_MOCK, CONFIG_NOTIF_MOCK } from '../../_data/adminMockData';
import type { ConfigGeneral, ConfigSLA, ConfigNotificaciones } from '../../_types/admin.types';

const SLA_FIELDS: { key: keyof ConfigSLA; label: string }[] = [
  { key: 'rac',  label: 'Tiempo maximo RAC (dias)'  },
  { key: 'doct', label: 'Tiempo maximo DOCT (dias)' },
  { key: 'str',  label: 'Tiempo maximo STR (dias)'  },
  { key: 'ffqq', label: 'Tiempo maximo FFQQ (dias)' },
  { key: 'micro',label: 'Tiempo maximo Micro (dias)'},
  { key: 'stcc', label: 'Tiempo maximo STCC (dias)' },
  { key: 'dt',   label: 'Tiempo maximo DT (dias)'   },
  { key: 'dg',   label: 'Tiempo maximo DG (dias)'   },
];

const NOTIF_FIELDS: { key: keyof ConfigNotificaciones; label: string }[] = [
  { key: 'alertarSLA',              label: 'Alertar cuando un caso supere el SLA'         },
  { key: 'notificarEstandares',     label: 'Notificar estandares por vencer (30 dias antes)' },
  { key: 'alertarRT30',             label: 'Alertar RT-30 proximos a vencer'               },
  { key: 'notificarAsignaciones',   label: 'Notificar nuevas asignaciones al analista'     },
  { key: 'alertarCasosBloqueados',  label: 'Alertar casos bloqueados por mas de 5 dias'   },
];

export function TabConfiguracion() {
  const [general, setGeneral] = useState<ConfigGeneral>(CONFIG_GENERAL_MOCK);
  const [sla, setSla] = useState<ConfigSLA>(CONFIG_SLA_MOCK);
  const [notif, setNotif] = useState<ConfigNotificaciones>(CONFIG_NOTIF_MOCK);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend — POST /api/admin/configuracion
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-5">
      {/* Top 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* General */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Configuracion General del Sistema</h3>
          <div className="space-y-4">
            <FormField label="Nombre del Laboratorio">
              <input value={general.nombreLaboratorio} onChange={e => setGeneral(p => ({...p, nombreLaboratorio: e.target.value}))} className={inputCls} />
            </FormField>
            <FormField label="Institucion">
              <input value={general.institucion} onChange={e => setGeneral(p => ({...p, institucion: e.target.value}))} className={inputCls} />
            </FormField>
            <FormField label="Prefijo de Correlativo">
              <input value={general.prefijo} onChange={e => setGeneral(p => ({...p, prefijo: e.target.value}))} className={inputCls} />
            </FormField>
            <FormField label="Anio Actual del Sistema">
              <input value={general.anio} onChange={e => setGeneral(p => ({...p, anio: e.target.value}))} className={inputCls} />
            </FormField>
          </div>
        </div>

        {/* SLA */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Parametros de SLA y Tiempos</h3>
          <div className="space-y-3">
            {SLA_FIELDS.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <label className="text-xs text-slate-600 flex-1">{label}</label>
                <input
                  type="number"
                  value={sla[key]}
                  onChange={e => setSla(p => ({...p, [key]: Number(e.target.value)}))}
                  className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  min={1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Configuracion de Notificaciones</h3>
        <div className="space-y-3">
          {NOTIF_FIELDS.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={notif[key]}
                onChange={e => setNotif(p => ({...p, [key]: e.target.checked}))}
                className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <CheckCircle2 className="w-4 h-4" />
          Guardar Configuracion
        </button>
        {saved && (
          <span className="flex items-center gap-2 text-sm text-green-600 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            Configuracion guardada correctamente
          </span>
        )}
      </div>
    </form>
  );
}
