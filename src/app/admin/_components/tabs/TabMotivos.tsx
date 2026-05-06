"use client";

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminModal } from '../AdminModal';
import { ConfirmDialog } from '../ConfirmDialog';
import { AreaBadge, EstadoBadge, FormField, inputCls, selectCls, ModalFooter } from '../AdminBadge';
import { MOTIVOS_MOCK, AREAS_LIST } from '../../_data/adminMockData';
import type { MotivoDev, MotivoDevForm } from '../../_types/admin.types';

const EMPTY_FORM: MotivoDevForm = { motivo: '', areaOrigen: '', estado: 'Activo', descripcion: '' };

export function TabMotivos() {
  const [motivos, setMotivos] = useState<MotivoDev[]>(MOTIVOS_MOCK);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<MotivoDev | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MotivoDev | null>(null);
  const [form, setForm] = useState<MotivoDevForm>(EMPTY_FORM);

  const openNew = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (m: MotivoDev) => { setEditTarget(m); setForm({ motivo: m.motivo, areaOrigen: m.areaOrigen, estado: m.estado, descripcion: m.descripcion ?? '' }); setModalOpen(true); };
  const openDelete = (m: MotivoDev) => { setDeleteTarget(m); setConfirmOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.motivo.trim()) return;
    if (editTarget) {
      setMotivos(prev => prev.map(m => m.id === editTarget.id ? { ...m, ...form } : m));
    } else {
      const newId = `MOT-${String(motivos.length + 1).padStart(3, '0')}`;
      setMotivos(prev => [...prev, { id: newId, ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) setMotivos(prev => prev.filter(m => m.id !== deleteTarget.id));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Motivos de Devolucion</h3>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />Nuevo Motivo
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {['ID','Motivo','Area de Origen','Estado','Acciones'].map(h => (
                  <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {motivos.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-slate-500 font-semibold whitespace-nowrap">{m.id}</td>
                  <td className="px-5 py-3 text-slate-700">{m.motivo}</td>
                  <td className="px-5 py-3"><AreaBadge area={m.areaOrigen} /></td>
                  <td className="px-5 py-3"><EstadoBadge estado={m.estado} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(m)} aria-label="Editar" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => openDelete(m)} aria-label="Eliminar" className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Motivo' : 'Nuevo Motivo'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Motivo" required>
            <input value={form.motivo} onChange={e => setForm(p => ({...p, motivo: e.target.value}))} className={inputCls} placeholder="Descripcion del motivo" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Area de Origen">
              <select value={form.areaOrigen} onChange={e => setForm(p => ({...p, areaOrigen: e.target.value}))} className={selectCls}>
                <option value="">Seleccionar...</option>
                {AREAS_LIST.map(a => <option key={a} value={a}>{a}</option>)}
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
          <ModalFooter onClose={() => setModalOpen(false)} submitLabel={editTarget ? 'Actualizar Motivo' : 'Guardar Motivo'} />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete}
        title="Eliminar motivo"
        message={`Seguro que deseas eliminar el motivo "${deleteTarget?.motivo}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  );
}
