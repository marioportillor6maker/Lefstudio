"use client";

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminModal } from '../AdminModal';
import { ConfirmDialog } from '../ConfirmDialog';
import { AreaBadge, EstadoBadge, FormField, inputCls, selectCls, ModalFooter } from '../AdminBadge';
import { TECNICAS_MOCK, AREAS_LIST } from '../../_data/adminMockData';
import type { Tecnica, TecnicaForm } from '../../_types/admin.types';

const EMPTY_FORM: TecnicaForm = { codigo: '', nombre: '', auxiliar: '', area: '', estado: 'Activa', descripcion: '' };

export function TabTecnicas() {
  const [tecnicas, setTecnicas] = useState<Tecnica[]>(TECNICAS_MOCK);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Tecnica | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Tecnica | null>(null);
  const [form, setForm] = useState<TecnicaForm>(EMPTY_FORM);

  const openNew = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (t: Tecnica) => { setEditTarget(t); setForm({ codigo: t.codigo, nombre: t.nombre, auxiliar: t.auxiliar, area: t.area, estado: t.estado, descripcion: t.descripcion ?? '' }); setModalOpen(true); };
  const openDelete = (t: Tecnica) => { setDeleteTarget(t); setConfirmOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.codigo.trim() || !form.nombre.trim()) return;
    if (editTarget) {
      setTecnicas(prev => prev.map(t => t.id === editTarget.id ? { ...t, ...form } : t));
    } else {
      const newId = `T-${String(tecnicas.length + 1).padStart(3, '0')}`;
      setTecnicas(prev => [...prev, { id: newId, ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) setTecnicas(prev => prev.filter(t => t.id !== deleteTarget.id));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Tecnicas Analiticas</h3>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />Nueva Tecnica
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {['Codigo','Nombre de la Tecnica','Auxiliar','Area','Estado','Acciones'].map(h => (
                  <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tecnicas.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono font-bold text-primary text-xs">{t.codigo}</td>
                  <td className="px-5 py-3 text-slate-700">{t.nombre}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">{t.auxiliar}</td>
                  <td className="px-5 py-3"><AreaBadge area={t.area} /></td>
                  <td className="px-5 py-3"><EstadoBadge estado={t.estado} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(t)} aria-label="Editar" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => openDelete(t)} aria-label="Eliminar" className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Tecnica' : 'Nueva Tecnica'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Codigo" required>
              <input value={form.codigo} onChange={e => setForm(p => ({...p, codigo: e.target.value}))} className={inputCls} placeholder="HPLC" />
            </FormField>
            <FormField label="Auxiliar / Formato">
              <input value={form.auxiliar} onChange={e => setForm(p => ({...p, auxiliar: e.target.value}))} className={inputCls} placeholder="RT-84" />
            </FormField>
          </div>
          <FormField label="Nombre de la tecnica" required>
            <input value={form.nombre} onChange={e => setForm(p => ({...p, nombre: e.target.value}))} className={inputCls} placeholder="Nombre completo" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Area">
              <select value={form.area} onChange={e => setForm(p => ({...p, area: e.target.value}))} className={selectCls}>
                <option value="">Seleccionar...</option>
                {AREAS_LIST.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </FormField>
            <FormField label="Estado">
              <select value={form.estado} onChange={e => setForm(p => ({...p, estado: e.target.value as 'Activa'|'Inactiva'}))} className={selectCls}>
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
              </select>
            </FormField>
          </div>
          <FormField label="Descripcion (opcional)">
            <textarea value={form.descripcion} onChange={e => setForm(p => ({...p, descripcion: e.target.value}))} className={inputCls} rows={2} placeholder="Descripcion breve" />
          </FormField>
          <ModalFooter onClose={() => setModalOpen(false)} submitLabel={editTarget ? 'Actualizar Tecnica' : 'Guardar Tecnica'} />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete}
        title="Eliminar tecnica"
        message={`Seguro que deseas eliminar la tecnica "${deleteTarget?.nombre}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  );
}
