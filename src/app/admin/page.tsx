"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TabUsuarios }      from './_components/tabs/TabUsuarios';
import { TabRoles }         from './_components/tabs/TabRoles';
import { TabCatalogos }     from './_components/tabs/TabCatalogos';
import { TabTecnicas }      from './_components/tabs/TabTecnicas';
import { TabEstados }       from './_components/tabs/TabEstados';
import { TabMotivos }       from './_components/tabs/TabMotivos';
import { TabCausas }        from './_components/tabs/TabCausas';
import { TabConfiguracion } from './_components/tabs/TabConfiguracion';
import type { AdminTabId, AdminTab } from './_types/admin.types';

const TABS: AdminTab[] = [
  { id: 'usuarios',       label: 'Usuarios'          },
  { id: 'roles',          label: 'Roles y Permisos'  },
  { id: 'catalogos',      label: 'Catalogos'         },
  { id: 'tecnicas',       label: 'Tecnicas'          },
  { id: 'estados',        label: 'Estados'           },
  { id: 'motivos',        label: 'Motivos Devolucion'},
  { id: 'causas',         label: 'Causas Reanalisis' },
  { id: 'configuracion',  label: 'Configuracion'     },
];

const VALID = new Set<AdminTabId>(TABS.map(t => t.id));
function isValid(v: string | null): v is AdminTabId { return v !== null && VALID.has(v as AdminTabId); }

function TabContent({ tab }: { tab: AdminTabId }) {
  switch (tab) {
    case 'usuarios':      return <TabUsuarios />;
    case 'roles':         return <TabRoles />;
    case 'catalogos':     return <TabCatalogos />;
    case 'tecnicas':      return <TabTecnicas />;
    case 'estados':       return <TabEstados />;
    case 'motivos':       return <TabMotivos />;
    case 'causas':        return <TabCausas />;
    case 'configuracion': return <TabConfiguracion />;
    default:              return null;
  }
}

function AdminInner() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const tabParam     = searchParams.get('tab');
  const initial      = isValid(tabParam) ? tabParam : 'usuarios';
  const [activeTab, setActiveTab] = useState<AdminTabId>(initial);

  useEffect(() => {
    const t = searchParams.get('tab');
    if (isValid(t) && t !== activeTab) setActiveTab(t);
  }, [searchParams]);

  const handleTab = (id: AdminTabId) => {
    setActiveTab(id);
    router.replace(`/admin?tab=${id}`, { scroll: false });
  };

  return (
    <div className="space-y-5 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Administracion del Sistema</h1>
        <p className="text-slate-500 text-sm mt-0.5">Configuracion, catalogos, usuarios y parametros del sistema LEF</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm" role="tablist" aria-label="Secciones de administracion">
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex border-b border-slate-100 px-2 pt-1 min-w-max">
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => handleTab(tab.id)}
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
          <TabContent tab={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500 text-sm">Cargando administracion...</div>}>
      <AdminInner />
    </Suspense>
  );
}
