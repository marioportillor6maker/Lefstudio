"use client";

import { useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Eye, Clock, Flag, Printer, Download, ChevronDown,
  Beaker, Building, Calendar, ShieldCheck, User,
} from 'lucide-react';
import { getIncomeDetail } from '../../_data/incomeMockData';
import type { Vista360Tab, PanelTab } from '../../_types/income.types';
import { TabResumen }         from '../../_components/tabs/TabResumen';
import { TabRac }             from '../../_components/tabs/TabRac';
import { TabDoct }            from '../../_components/tabs/TabDoct';
import { TabEstandar }        from '../../_components/tabs/TabEstandar';
import { TabFfqq }            from '../../_components/tabs/TabFfqq';
import { TabMicro }           from '../../_components/tabs/TabMicro';
import { TabStcc }            from '../../_components/tabs/TabStcc';
import { TabDocumentos }      from '../../_components/tabs/TabDocumentos';
import { PanelTimeline }      from '../../_components/panels/PanelTimeline';
import { PanelObservaciones } from '../../_components/panels/PanelObservaciones';
import { PanelComparador }    from '../../_components/panels/PanelComparador';

const MAIN_TABS: { id: Vista360Tab; label: string }[] = [
  { id: 'resumen',    label: 'Resumen General' },
  { id: 'rac',        label: 'RAC / Recepcion' },
  { id: 'doct',       label: 'Documentacion' },
  { id: 'estandar',   label: 'Estandar' },
  { id: 'ffqq',       label: 'Analisis FFQQ' },
  { id: 'micro',      label: 'Microbiologia' },
  { id: 'stcc',       label: 'STCC / DT / DG' },
  { id: 'documentos', label: 'Documentos / Formatos' },
];

const PANEL_TABS: { id: PanelTab; label: string }[] = [
  { id: 'timeline',      label: 'Timeline' },
  { id: 'observaciones', label: 'Observaciones' },
  { id: 'comparador',    label: 'Comparador' },
];

function Vista360Inner() {
  const params = useParams();
  const correlativo = decodeURIComponent(params.id as string);
  const [activeTab, setActiveTab] = useState<Vista360Tab>('resumen');
  const [activePanel, setActivePanel] = useState<PanelTab>('timeline');

  const detail = getIncomeDetail(correlativo);

  if (!detail) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Eye className="w-10 h-10 opacity-30" />
        <p className="text-sm font-medium">No se encontro el expediente <strong className="font-mono">{correlativo}</strong></p>
        <Link href="/ingresos" className="flex items-center gap-2 text-xs text-primary hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver a Ingresos
        </Link>
      </div>
    );
  }

  const nroRecepcion = `REC-${correlativo.replace('LEF-', '')}`;
  const analistas = detail.responsableActual ? [detail.responsableActual] : [];
  const slaToneText =
    detail.sla === 'danger'  ? 'text-red-600' :
    detail.sla === 'warning' ? 'text-amber-600' :
                               'text-success';
  const slaToneIcon =
    detail.sla === 'danger'  ? 'text-red-500' :
    detail.sla === 'warning' ? 'text-amber-500' :
                               'text-success';

  return (
    <div className="max-w-screen-2xl mx-auto space-y-4 pb-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 min-w-0 flex-wrap">
        <Link href="/ingresos" className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" />SistemaLEF
        </Link>
        <span className="text-slate-300 text-xs">/</span>
        <Link href="/ingresos" className="text-xs text-slate-400 hover:text-primary transition-colors">Ingresos</Link>
        <span className="text-slate-300 text-xs">/</span>
        <span className="font-mono text-xs font-bold text-slate-700">{correlativo}</span>
      </div>

      <h1 className="text-xl font-black text-slate-900">
        Vista 360 <span className="text-slate-400 font-bold mx-1">|</span>
        <span className="font-mono">{correlativo}</span>
      </h1>

      {/* 1. PRIMARY HEADER (navy hero) */}
      <div className="bg-primary rounded-lg p-4 text-white flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {detail.prioridad === 'Alta' && (
            <div className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-md font-bold text-xs uppercase tracking-wider shadow-sm">
              <Flag className="w-3.5 h-3.5" /> Urgente
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">Correlativo</span>
            <span className="font-bold text-white text-sm tracking-wide font-mono">{correlativo}</span>
          </div>

          <div className="w-px h-8 bg-primary-dark hidden md:block" />

          <div className="flex flex-col">
            <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">No. Recepcion</span>
            <span className="font-bold text-white text-sm tracking-wide font-mono">{nroRecepcion}</span>
          </div>

          <div className="w-px h-8 bg-primary-dark hidden md:block" />

          {detail.estadoGlobal && (
            <div className="flex flex-col">
              <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">Estado Global</span>
              <span className="inline-flex items-center text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mr-1.5" /> {detail.estadoGlobal}
              </span>
            </div>
          )}

          <div className="w-px h-8 bg-primary-dark hidden lg:block" />

          <div className="flex-col hidden lg:flex">
            <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">Etapa Actual</span>
            <span className="font-bold text-white text-sm">{detail.areaActual}</span>
          </div>

          {detail.responsableActual && (
            <>
              <div className="w-px h-8 bg-primary-dark hidden lg:block" />
              <div className="flex-col hidden lg:flex">
                <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">Responsable Actual</span>
                <span className="font-bold text-white text-sm flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary-light" /> {detail.responsableActual}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 w-full xl:w-auto">
          <button className="bg-primary-dark hover:bg-primary-dark/80 text-white border border-primary-dark/50 px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5" /> Imprimir
          </button>
          <button className="bg-primary-dark hover:bg-primary-dark/80 text-white border border-primary-dark/50 px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Exportar
          </button>
          <button className="bg-accent hover:bg-accent-dark text-primary-dark hover:text-white px-4 py-2 rounded-md text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5">
            Acciones <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. PRODUCT INFO HEADER */}
      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-primary-light/20 border border-primary-light/40 flex items-center justify-center shrink-0">
            <Beaker className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900 leading-tight truncate">
              {detail.productoDetalle.nombreComercial} {detail.productoDetalle.concentracion}
            </h2>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
              <span>{detail.productoDetalle.concentracion}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{detail.productoDetalle.formaFarmaceutica}</span>
              {detail.productoDetalle.lote && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>Lote: <span className="font-mono font-semibold text-slate-700">{detail.productoDetalle.lote}</span></span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 xl:gap-x-8 flex-1">
          <div className="flex items-start gap-3">
            <Building className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">{detail.empresa}</p>
              <p className="text-xs text-slate-500 mt-0.5">{detail.tipoTramite}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold leading-tight">Fecha Recepcion</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{detail.rac.fechaIngreso}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className={`w-4 h-4 mt-0.5 ${slaToneIcon}`} />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold leading-tight">Dias en Proceso</p>
              <p className={`text-sm font-bold mt-0.5 ${slaToneText}`}>
                {detail.diasTranscurridos} / {detail.diasLimite} dias
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold leading-tight">Reg. Sanitario</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{detail.productoDetalle.registroAnterior ?? 'Pendiente'}</p>
            </div>
          </div>
        </div>

        {analistas.length > 0 && (
          <div className="flex flex-col gap-1.5 border-t xl:border-t-0 xl:border-l border-slate-200 pt-4 xl:pt-0 xl:pl-6 w-full xl:w-auto">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <User className="w-3 h-3" /> Analistas Asignados
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {analistas.map((a, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold border border-slate-200 shadow-sm">
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. MAIN WORKSPACE: tab nav + content + side panel */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Left Column */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">

            {/* Scrollable tab nav */}
            <div className="relative border-b border-slate-200 bg-slate-50/50">
              <div className="flex overflow-x-auto custom-scrollbar w-full scroll-smooth">
                {MAIN_TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-colors flex-shrink-0 border-b-2 ${
                      activeTab === tab.id
                        ? 'text-primary border-primary bg-white'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="p-6">
              {activeTab === 'resumen'    && <TabResumen    detail={detail} />}
              {activeTab === 'rac'        && <TabRac        detail={detail} />}
              {activeTab === 'doct'       && <TabDoct       detail={detail} />}
              {activeTab === 'estandar'   && <TabEstandar   detail={detail} />}
              {activeTab === 'ffqq'       && <TabFfqq       detail={detail} />}
              {activeTab === 'micro'      && <TabMicro      detail={detail} />}
              {activeTab === 'stcc'       && <TabStcc       detail={detail} />}
              {activeTab === 'documentos' && <TabDocumentos detail={detail} />}
            </div>
          </div>
        </div>

        {/* Right Column: side panel */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col sticky top-4 max-h-screen">
            <div className="flex border-b border-slate-200 bg-slate-50/50">
              {PANEL_TABS.map(pt => {
                const isActive = activePanel === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setActivePanel(pt.id)}
                    className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
                      isActive
                        ? 'border-primary text-primary bg-white'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {pt.label}
                  </button>
                );
              })}
            </div>

            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
              {activePanel === 'timeline'      && <PanelTimeline events={detail.timeline} />}
              {activePanel === 'observaciones' && <PanelObservaciones observaciones={detail.observaciones} />}
              {activePanel === 'comparador'    && <PanelComparador detail={detail} />}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function Vista360Page() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-slate-400">Cargando Vista 360...</div>}>
      <Vista360Inner />
    </Suspense>
  );
}
