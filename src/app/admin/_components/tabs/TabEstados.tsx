"use client";

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminModal } from '../AdminModal';
import { ConfirmDialog } from '../ConfirmDialog';
import { AreaBadge, FormField, inputCls, selectCls, ModalFooter } from '../AdminBadge';
import { ESTADOS_MOCK, AREAS_LIST } from '../../_data/adminMockData';
import type { EstadoFlujo, EstadoFlujoForm } from '../../_types/admin.types';

const COLORS = ['slate','blue','teal','green','amber','orange','red','purple','indigo','yellow','cyan'];
const EMPTY_FORM: EstadoFlujoForm = { codigo: '', etiqueta: '', area: '', color: 'slate', orden: 1, activo: true };

function ColorPreview({ color, label }: { color: string; label: string }) {
  const map: Record<string,string> = { slate:'bg-slate-100 text-slate-700', blue:'bg-blue-100 text-blue-700', teal:'bg-teal-100 text-teal-700', green:'bg-green-100 text-green-700', amber:'bg-amber-100 text-amber-700', orange:'bg-orange-100 text-orange-700', red:'bg-red-100 text-red-700', purple:'bg-purple-100 text-purple-700', indigo:'bg-indigo-100 text-indigo-700', yellow:'bg-yellow-100 text-yellow-800', cyan:'bg-cyan-100 text-cyan-700' };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[color] ?? map.slate}`}>{label}</span>;
}

export function TabEstados() {
  const [estados, setEstados] = useState<EstadoFlujo[]>(ESTADOS_MOCK);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<EstadoFlujo | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EstadoFlujo | null>(null);
  const [form, setForm] = useState<EstadoFlujoForm>(EMPTY_FORM);

  const openNew = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (e: EstadoFlujo) => { setEditTarget(e); setForm({ codigo: e.codigo, etiqueta: e.etiqueta, area: e.area, color: e.color, orden: e.orden, activo: e.activo }); setModalOpen(true); };
  const openDelete = (e: EstadoFlujo) => { setDeleteTarget(e); setConfirmOpen(true); };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!form.codigo.trim() || !form.etiqueta.trim()) return;
    if (editTarget) {
      setEstados(prev => prev.map(e => e.id === editTarget.id ? { ...e, ...form } : e));
    } else {
      const newId = `E-${String(estados.length + 1).padStart(2, '0')}`;
      setEstados(prev => [...prev, { id: newId, ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) setEstados(prev => prev.filter(e => e.id !== deleteTarget.id));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Estados del Flujo</h3>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />Nuevo Estado
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {['#','Codigo','Etiqueta','Area','Vista Previa','Acciones'].map(h => (
                  <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {estados.sort((a,b) => a.orden - b.orden).map(e => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-slate-400 text-xs">{e.orden}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-600 font-semibold">{e.codigo}</td>
                  <td className="px-5 py-3 font-medium text-slate-700">{e.etiqueta}</td>
                  <td className="px-5 py-3"><AreaBadge area={e.area} /></td>
                  <td className="px-5 py-3"><ColorPreview color={e.color} label={e.etiqueta} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(e)} aria-label="Editar" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => openDelete(e)} aria-label="Eliminar" className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Estado' : 'Nuevo Estado'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Codigo" required>
              <input value={form.codigo} onChange={e => setForm(p => ({...p, codigo: e.target.value}))} className={inputCls} placeholder="en_analisis_ffqq" />
            </FormField>
            <FormField label="Orden">
              <input type="number" value={form.orden} onChange={e => setForm(p => ({...p, orden: Number(e.target.value)}))} className={inputCls} min={1} />
            </FormField>
          </div>
          <FormField label="Etiqueta" required>
            <input value={form.etiqueta} onChange={e => setForm(p => ({...p, etiqueta: e.target.value}))} className={inputCls} placeholder="En Analisis FFQQ" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Area">
              <select value={form.area} onChange={e => setForm(p => ({...p, area: e.target.value}))} className={selectCls}>
                <option value="">Seleccionar...</option>
                {AREAS_LIST.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </FormField>
            <FormField label="Color / Variante">
              <select value={form.color} onChange={e => setForm(p => ({...p, color: e.target.value}))} className={selectCls}>
                {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input type="checkbox" checked={form.activo} onChange={e => setForm(p => ({...p, activo: e.target.checked}))} className="rounded border-slate-300 text-primary focus:ring-primary w-3.5 h-3.5" />
            Estado activo en el flujo
          </label>
          <ModalFooter onClose={() => setModalOpen(false)} submitLabel={editTarget ? 'Actualizar Estado' : 'Guardar Estado'} />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete}
        title="Eliminar estado"
        message={`Seguro que deseas eliminar el estado "${deleteTarget?.etiqueta}" del flujo?`}
        confirmLabel="Eliminar"
      />
    </div>
  );
}
