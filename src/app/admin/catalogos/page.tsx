"use client";

import { useState } from "react";
import { ListTree, ArrowLeft, Search, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CatalogoItem { id: string; nombre: string; codigo?: string; activo: boolean }

// ─── Mock data ────────────────────────────────────────────────────────────────

const INIT_FORMAS: CatalogoItem[] = [
  { id: "ff-01", nombre: "Tableta",          codigo: "TAB", activo: true  },
  { id: "ff-02", nombre: "Cápsula",          codigo: "CAP", activo: true  },
  { id: "ff-03", nombre: "Ampolla",          codigo: "AMP", activo: true  },
  { id: "ff-04", nombre: "Jarabe",           codigo: "JAR", activo: true  },
  { id: "ff-05", nombre: "Suspensión",       codigo: "SUS", activo: true  },
  { id: "ff-06", nombre: "Crema",            codigo: "CRE", activo: true  },
  { id: "ff-07", nombre: "Solución Oral",    codigo: "SOL", activo: true  },
  { id: "ff-08", nombre: "Polvo para Inyección", codigo: "POL", activo: true },
  { id: "ff-09", nombre: "Parche Transdérmico", codigo: "PAR", activo: false },
  { id: "ff-10", nombre: "Supositorio",      codigo: "SUP", activo: true  },
];

const INIT_PAISES: CatalogoItem[] = [
  { id: "pa-01", nombre: "Honduras",         codigo: "HN", activo: true },
  { id: "pa-02", nombre: "Guatemala",        codigo: "GT", activo: true },
  { id: "pa-03", nombre: "El Salvador",      codigo: "SV", activo: true },
  { id: "pa-04", nombre: "México",           codigo: "MX", activo: true },
  { id: "pa-05", nombre: "Estados Unidos",   codigo: "US", activo: true },
  { id: "pa-06", nombre: "Colombia",         codigo: "CO", activo: true },
  { id: "pa-07", nombre: "India",            codigo: "IN", activo: true },
  { id: "pa-08", nombre: "Alemania",         codigo: "DE", activo: true },
  { id: "pa-09", nombre: "España",           codigo: "ES", activo: true },
  { id: "pa-10", nombre: "Argentina",        codigo: "AR", activo: true },
  { id: "pa-11", nombre: "Brasil",           codigo: "BR", activo: true },
  { id: "pa-12", nombre: "Nicaragua",        codigo: "NI", activo: true },
];

const INIT_UNIDADES: CatalogoItem[] = [
  { id: "um-01", nombre: "Miligramos",  codigo: "mg",  activo: true },
  { id: "um-02", nombre: "Gramos",      codigo: "g",   activo: true },
  { id: "um-03", nombre: "Microgramos", codigo: "mcg", activo: true },
  { id: "um-04", nombre: "Mililitros",  codigo: "mL",  activo: true },
  { id: "um-05", nombre: "Litros",      codigo: "L",   activo: true },
  { id: "um-06", nombre: "Unidades Internacionales", codigo: "UI", activo: true },
  { id: "um-07", nombre: "Porcentaje",  codigo: "%",   activo: true },
  { id: "um-08", nombre: "Unidades",    codigo: "U",   activo: true },
  { id: "um-09", nombre: "Tabletas",    codigo: "tab", activo: true },
  { id: "um-10", nombre: "Cápsulas",    codigo: "cap", activo: true },
];

type TabKey = "formas" | "paises" | "unidades";
const TABS: { key: TabKey; label: string }[] = [
  { key: "formas",   label: "Formas Farmacéuticas" },
  { key: "paises",   label: "Países"               },
  { key: "unidades", label: "Unidades de Medida"   },
];

// ─── Catalog table ────────────────────────────────────────────────────────────

function CatalogoTable({
  items,
  onEdit,
  onDelete,
}: {
  items: CatalogoItem[];
  onEdit: (item: CatalogoItem) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" data-testid="catalogo-table">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Nombre</th>
            <th className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 w-28">Código</th>
            <th className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 w-24">Estado</th>
            <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500 w-24">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.length === 0 && (
            <tr><td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-400">Sin resultados</td></tr>
          )}
          {items.map(item => (
            <tr key={item.id} className="hover:bg-slate-50/70 transition-colors" data-testid="catalogo-row">
              <td className="px-4 py-3 text-sm font-medium text-slate-800">{item.nombre}</td>
              <td className="px-4 py-3 text-xs font-mono text-slate-600">{item.codigo ?? "—"}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${item.activo ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {item.activo ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex items-center gap-2">
                  <button
                    data-testid="catalogo-editar"
                    onClick={() => onEdit(item)}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    data-testid="catalogo-eliminar"
                    onClick={() => onDelete(item.id)}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Form modal ───────────────────────────────────────────────────────────────

function FormModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: CatalogoItem;
  onSave: (item: Omit<CatalogoItem, "id">) => void;
  onClose: () => void;
}) {
  const [nombre,  setNombre]  = useState(initial?.nombre  ?? "");
  const [codigo,  setCodigo]  = useState(initial?.codigo  ?? "");
  const [activo,  setActivo]  = useState(initial?.activo  ?? true);

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden" data-testid="catalogo-modal">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 text-sm">{initial ? "Editar entrada" : "Nueva entrada"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Nombre <span className="text-red-500">*</span></label>
            <input
              data-testid="modal-nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Código</label>
            <input
              data-testid="modal-codigo"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              className="w-full h-9 px-3 bg-white border border-slate-300 rounded text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Abreviatura"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              data-testid="modal-activo"
              type="checkbox"
              checked={activo}
              onChange={e => setActivo(e.target.checked)}
              className="accent-primary"
            />
            <span className="text-sm text-slate-700">Activo</span>
          </label>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50">Cancelar</button>
          <button
            data-testid="modal-guardar"
            onClick={() => { if (nombre.trim()) onSave({ nombre: nombre.trim(), codigo: codigo.trim() || undefined, activo }); }}
            disabled={!nombre.trim()}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold shadow-sm flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CatalogosPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("formas");
  const [search,    setSearch]    = useState("");
  const [modal,     setModal]     = useState<{ open: boolean; item?: CatalogoItem }>({ open: false });

  const [formas,    setFormas]    = useState<CatalogoItem[]>(INIT_FORMAS);
  const [paises,    setPaises]    = useState<CatalogoItem[]>(INIT_PAISES);
  const [unidades,  setUnidades]  = useState<CatalogoItem[]>(INIT_UNIDADES);

  const getItems  = () => activeTab === "formas" ? formas   : activeTab === "paises" ? paises   : unidades;
  const setItems  = (fn: (prev: CatalogoItem[]) => CatalogoItem[]) => {
    if (activeTab === "formas")   setFormas(fn);
    else if (activeTab === "paises")   setPaises(fn);
    else setUnidades(fn);
  };

  const filtered = getItems().filter(i =>
    i.nombre.toLowerCase().includes(search.toLowerCase()) ||
    (i.codigo ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const openNew  = () => setModal({ open: true });
  const openEdit = (item: CatalogoItem) => setModal({ open: true, item });
  const closeModal = () => setModal({ open: false });

  const handleSave = (data: Omit<CatalogoItem, "id">) => {
    if (modal.item) {
      setItems(prev => prev.map(i => i.id === modal.item!.id ? { ...i, ...data } : i));
    } else {
      setItems(prev => [...prev, { id: `${activeTab}-${Date.now()}`, ...data }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ListTree className="w-6 h-6 text-primary" /> Catálogos del Sistema
            </h1>
            <p className="text-slate-500 text-sm mt-1">Administración de datos maestros y paramétricos.</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              data-testid="catalogo-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-full h-9 pl-9 pr-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            data-testid="catalogo-nuevo"
            onClick={openNew}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Nuevo
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.key}
              data-testid={`tab-${tab.key}`}
              onClick={() => { setActiveTab(tab.key); setSearch(""); }}
              className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
                {getItems().length}
              </span>
            </button>
          ))}
        </div>

        <CatalogoTable items={filtered} onEdit={openEdit} onDelete={handleDelete} />

        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400">
          {filtered.length} de {getItems().length} entradas
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <FormModal
          initial={modal.item}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
