"use client";

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminModal } from '../AdminModal';
import { ConfirmDialog } from '../ConfirmDialog';
import { TipoBadge, EstadoBadge, FormField, inputCls, selectCls, ModalFooter } from '../AdminBadge';
import { CAUSAS_MOCK } from '../../_data/adminMockData';
import type { CausaReanalisis, CausaReanalisisForm, CausaTipo } from '../../_types/admin.types';

const TIPOS: CausaTipo[] = ['Tecnica','Procedimiento','Administrativa','Comite','Equipo'];
const EMPTY_FORM: CausaReanalisisForm = { causa: '', tipo: 'Tecnica', estado: 'Activo', descripcion: '' };

export function TabCausas() {
  const [causas, setCausas] = useState<CausaReanalisis[]>(CAUSAS_MOCK);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CausaReanalisis | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CausaReanalisis | null>(null);
  const [form, setForm] = useState<CausaReanalisisForm>(EMPTY_FORM);

  const openNew = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (c: CausaReanalisis) => { setEditTarget(c); setForm({ causa: c.causa, tipo: c.tipo, estado: c.estado, descripcion: c.descripcion ?? '' }); setModalOpen(true); };
  const openDelete = (c: CausaReanalisis) => { setDeleteTarget(c); setConfirmOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.causa.trim()) return;
    if (editTarget) {
      setCausas(prev => prev.map(c => c.id === editTarget.id ? { ...c, ...form } : c));
    } else {
      const newId = `CAU-${String(causas.length + 1).padStart(3, '0')}`;
      setCausas(prev => [...prev, { id: newId, ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) setCausas(prev => prev.filter(c => c.id !== deleteTarget.id));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Causas de Reanalisis</h3>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />Nueva Causa
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {['ID','Causa','Tipo','Estado','Acciones'].map(h => (
                  <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {causas.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-slate-500 font-semibold whitespace-nowrap">{c.id}</td>
                  <td className="px-5 py-3 text-slate-700">{c.causa}</td>
                  <td className="px-5 py-3"><TipoBadge tipo={c.tipo} /></td>
                  <td className="px-5 py-3"><EstadoBadge estado={c.estado} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(c)} aria-label="Editar" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => openDelete(c)} aria-label="Eliminar" className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Causa' : 'Nueva Causa'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Causa" required>
            <input value={form.causa} onChange={e => setForm(p => ({...p, causa: e.target.value}))} className={inputCls} placeholder="Descripcion de la causa" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Tipo">
              <select value={form.tipo} onChange={e => setForm(p => ({...p, tipo: e.target.value as CausaTipo}))} className={selectCls}>
                {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </FormField>
            <FormField label="Estado">
              <select value={form.estado} onChange={e => setForm(p => ({...p, estado: e.target.value as 'Activo'|'Inactivo'}))} className={selectCls}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </FormField>
          </div>
          <FormField label="Descripcion (opcional)">
            <textarea value={form.descripcion} onChange={e => setForm(p => ({...p, descripcion: e.target.value}))} className={inputCls} rows={2} placeholder="Descripcion breve" />
          </FormField>
          <ModalFooter onClose={() => setModalOpen(false)} submitLabel={editTarget ? 'Actualizar Causa' : 'Guardar Causa'} />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete}
        title="Eliminar causa"
        message={`Seguro que deseas eliminar la causa "${deleteTarget?.causa}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  );
}
