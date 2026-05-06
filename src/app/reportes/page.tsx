"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Download, Filter } from 'lucide-react';
import { TabIngresos }      from './_components/tabs/TabIngresos';
import { TabTiempos }       from './_components/tabs/TabTiempos';
import { TabPendientes }    from './_components/tabs/TabPendientes';
import { TabReanalisis }    from './_components/tabs/TabReanalisis';
import { TabEstandares }    from './_components/tabs/TabEstandares';
import { TabDevoluciones }  from './_components/tabs/TabDevoluciones';
import { TabCargaAnalista } from './_components/tabs/TabCargaAnalista';
import { TabProductividad } from './_components/tabs/TabProductividad';
import type { TabId, ReportTab } from './_types/reports.types';

const TABS: ReportTab[] = [
  { id: 'ingresos',      label: 'Ingresos'           },
  { id: 'tiempos',       label: 'Tiempos por Etapa'  },
  { id: 'pendientes',    label: 'Pendientes por Area' },
  { id: 'reanalisis',    label: 'Reanalisis'          },
  { id: 'estandares',    label: 'Estandares'          },
  { id: 'devoluciones',  label: 'Devoluciones'        },
  { id: 'carga',         label: 'Carga Analista'      },
  { id: 'productividad', label: 'Productividad'       },
];

const VALID_TABS = new Set<TabId>(TABS.map((t) => t.id));

function isValidTab(v: string | null): v is TabId {
  return v !== null && VALID_TABS.has(v as TabId);
}

function TabContent({ activeTab }: { activeTab: TabId }) {
  switch (activeTab) {
    case 'ingresos':      return <TabIngresos />;
    case 'tiempos':       return <TabTiempos />;
    case 'pendientes':    return <TabPendientes />;
    case 'reanalisis':    return <TabReanalisis />;
    case 'estandares':    return <TabEstandares />;
    case 'devoluciones':  return <TabDevoluciones />;
    case 'carga':         return <TabCargaAnalista />;
    case 'productividad': return <TabProductividad />;
    default:              return null;
  }
}

function ReportesPageInner() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const tabParam   = searchParams.get('tab');
  const initialTab = isValidTab(tabParam) ? tabParam : 'ingresos';

  const [activeTab, setActiveTab] = useState<TabId>(initialTab);

  // Sync state when URL param changes (sidebar navigation)
  useEffect(() => {
    const t = searchParams.get('tab');
    if (isValidTab(t) && t !== activeTab) setActiveTab(t);
  }, [searchParams]);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    router.replace(`/reportes?tab=${id}`, { scroll: false });
  };

  return (
    <div className="space-y-5 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Modulo de Reportes Operativos
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Enero 2024 - SistemaLEF CQFH Honduras
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
        </div>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm"
        role="tablist"
        aria-label="Secciones del modulo de reportes"
      >
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex border-b border-slate-100 px-2 pt-1 min-w-max">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => handleTabChange(tab.id)}
                  className={[
                    'px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="p-6"
        >
          <TabContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default function ReportesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-sm">Cargando reportes...</div>}>
      <ReportesPageInner />
    </Suspense>
  );
}
