"use client";

import { useState } from 'react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { AdminModal } from '../AdminModal';
import { ConfirmDialog } from '../ConfirmDialog';
import { EstadoBadge, FormField, inputCls, selectCls, ModalFooter } from '../AdminBadge';
import { CATALOGOS_MOCK, CATALOG_LABELS } from '../../_data/adminMockData';
import type { CatalogKey, CatalogItem, CatalogItemForm } from '../../_types/admin.types';

const EMPTY_FORM: CatalogItemForm = { nombre: '', codigo: '', descripcion: '', estado: 'Activo' };

const CATALOG_KEYS: CatalogKey[] = ['tramites','formasFarm','tiposCliente','paises','metodologias'];

export function TabCatalogos() {
  const [catalogs, setCatalogs] = useState(CATALOGOS_MOCK);
  const [active, setActive] = useState<CatalogKey>('tramites');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CatalogItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CatalogItem | null>(null);
  const [form, setForm] = useState<CatalogItemForm>(EMPTY_FORM);
  const [nextId, setNextId] = useState(100);

  const items = catalogs[active];

  const openNew = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (item: CatalogItem) => { setEditTarget(item); setForm({ nombre: item.nombre, codigo: item.codigo ?? '', descripcion: item.descripcion ?? '', estado: item.estado }); setModalOpen(true); };
  const openDelete = (item: CatalogItem) => { setDeleteTarget(item); setConfirmOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    if (editTarget) {
      setCatalogs(prev => ({ ...prev, [active]: prev[active].map(i => i.id === editTarget.id ? { ...i, ...form } : i) }));
    } else {
      setCatalogs(prev => ({ ...prev, [active]: [...prev[active], { id: nextId, ...form }] }));
      setNextId(n => n + 1);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) setCatalogs(prev => ({ ...prev, [active]: prev[active].filter(i => i.id !== deleteTarget.id) }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Left: catalog menu */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Catalogos</p>
        </div>
        <nav className="p-2">
          {CATALOG_KEYS.map(key => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${active === key ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Tag className={`w-3.5 h-3.5 shrink-0 ${active === key ? 'text-primary' : 'text-slate-400'}`} />
              {CATALOG_LABELS[key]}
            </button>
          ))}
        </nav>
      </div>

      {/* Right: items list */}
      <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">{CATALOG_LABELS[active]}</h3>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />Agregar
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {items.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors">
              <span className="text-sm text-slate-400 w-5 shrink-0">{idx + 1}</span>
              <span className="flex-1 text-sm font-medium text-slate-700">{item.nombre}</span>
              {item.codigo && <span className="text-xs text-slate-400 font-mono">{item.codigo}</span>}
              <EstadoBadge estado={item.estado} />
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(item)} aria-label="Editar" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => openDelete(item)} aria-label="Eliminar" className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-center py-10 text-slate-400 text-sm">Sin registros.</p>}
        </div>
      </div>

      {/* Modal */}
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar elemento' : 'Agregar elemento'} maxWidth="max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Nombre" required>
            <input value={form.nombre} onChange={e => setForm(p => ({...p, nombre: e.target.value}))} className={inputCls} placeholder="Nombre del elemento" />
          </FormField>
          <FormField label="Codigo (opcional)">
            <input value={form.codigo} onChange={e => setForm(p => ({...p, codigo: e.target.value}))} className={inputCls} placeholder="Codigo" />
          </FormField>
          <FormField label="Descripcion (opcional)">
            <textarea value={form.descripcion} onChange={e => setForm(p => ({...p, descripcion: e.target.value}))} className={inputCls} rows={2} placeholder="Descripcion breve" />
          </FormField>
          <FormField label="Estado">
            <select value={form.estado} onChange={e => setForm(p => ({...p, estado: e.target.value as 'Activo'|'Inactivo'}))} className={selectCls}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </FormField>
          <ModalFooter onClose={() => setModalOpen(false)} submitLabel={editTarget ? 'Actualizar' : 'Guardar'} />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete}
        title="Eliminar elemento"
        message={`Seguro que deseas eliminar "${deleteTarget?.nombre}" del catalogo? Esta accion no se puede deshacer.`}
        confirmLabel="Eliminar"
      />
    </div>
  );
}
