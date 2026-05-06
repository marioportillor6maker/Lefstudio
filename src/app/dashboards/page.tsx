"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { TabOperacion }    from './_components/tabs/TabOperacion';
import { TabRac }          from './_components/tabs/TabRac';
import { TabDoct }         from './_components/tabs/TabDoct';
import { TabLaboratorios } from './_components/tabs/TabLaboratorios';
import { TabStcc }         from './_components/tabs/TabStcc';
import { TabEstado }       from './_components/tabs/TabEstado';
import type { DashTabId, DashTab } from './_types/dashboard.types';

const TABS: DashTab[] = [
  { id: 'operacion',    label: 'Operacion General'  },
  { id: 'rac',          label: 'RAC y Tiempos'       },
  { id: 'doct',         label: 'DOCT y Pendientes'   },
  { id: 'laboratorios', label: 'FFQQ / Micro'        },
  { id: 'stcc',         label: 'STCC / DT / DG'      },
  { id: 'estado',       label: 'Estado Consolidado'  },
];

const VALID_TABS = new Set<DashTabId>(TABS.map((t) => t.id));

function isValidTab(v: string | null): v is DashTabId {
  return v !== null && VALID_TABS.has(v as DashTabId);
}

function TabContent({ activeTab }: { activeTab: DashTabId }) {
  switch (activeTab) {
    case 'operacion':    return <TabOperacion />;
    case 'rac':          return <TabRac />;
    case 'doct':         return <TabDoct />;
    case 'laboratorios': return <TabLaboratorios />;
    case 'stcc':         return <TabStcc />;
    case 'estado':       return <TabEstado />;
    default:             return null;
  }
}

function DashboardsInner() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const tabParam   = searchParams.get('tab');
  const initialTab = isValidTab(tabParam) ? tabParam : 'operacion';

  const [activeTab, setActiveTab] = useState<DashTabId>(initialTab);

  useEffect(() => {
    const t = searchParams.get('tab');
    if (isValidTab(t) && t !== activeTab) setActiveTab(t);
  }, [searchParams]);

  const handleTabChange = (id: DashTabId) => {
    setActiveTab(id);
    router.replace(`/dashboards?tab=${id}`, { scroll: false });
  };

  return (
    <div className="space-y-5 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Dashboards Gerenciales — LEF
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Enero 2024 — SistemaLEF CQFH Honduras
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm shrink-0">
          <RefreshCw className="w-4 h-4" />
          Actualizar datos
        </button>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm"
        role="tablist"
        aria-label="Secciones del dashboard gerencial"
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

export default function DashboardsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500 text-sm">Cargando dashboards...</div>}>
      <DashboardsInner />
    </Suspense>
  );
}
