"use client";

import { useState } from 'react';
import { Plus, Pencil, Shield } from 'lucide-react';
import { AdminModal } from '../AdminModal';
import { ConfirmDialog } from '../ConfirmDialog';
import { FormField, inputCls, selectCls, ModalFooter } from '../AdminBadge';
import { ROLES_MOCK } from '../../_data/adminMockData';
import { PERMISSION_GROUPS } from '../../_types/admin.types';
import type { Rol, RolForm } from '../../_types/admin.types';

const EMPTY_FORM: RolForm = { nombre: '', descripcion: '', permisos: [], estado: 'Activo' };

export function TabRoles() {
  const [roles, setRoles] = useState<Rol[]>(ROLES_MOCK);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Rol | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Rol | null>(null);
  const [form, setForm] = useState<RolForm>(EMPTY_FORM);

  const openNew = () => { setEditTarget(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (r: Rol) => { setEditTarget(r); setForm({ nombre: r.nombre, descripcion: r.descripcion, permisos: [...r.permisos], estado: r.estado }); setModalOpen(true); };
  const openDelete = (r: Rol) => { setDeleteTarget(r); setConfirmOpen(true); };

  const togglePerm = (p: string) => setForm(prev => ({
    ...prev,
    permisos: prev.permisos.includes(p) ? prev.permisos.filter(x => x !== p) : [...prev.permisos, p],
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    if (editTarget) {
      setRoles(prev => prev.map(r => r.id === editTarget.id ? { ...r, ...form } : r));
    } else {
      const newId = `ROL-${String(roles.length + 1).padStart(3, '0')}`;
      setRoles(prev => [...prev, { id: newId, ...form, usuarios: 0 }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) setRoles(prev => prev.filter(r => r.id !== deleteTarget.id));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Roles del Sistema</h3>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />Nuevo Rol
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {roles.map(rol => (
            <div key={rol.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <p className="font-bold text-sm text-slate-800">{rol.nombre}</p>
                  <span className="text-xs text-slate-400">{rol.usuarios} {rol.usuarios === 1 ? 'usuario' : 'usuarios'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {rol.permisos.map(p => (
                    <span key={p} className="inline-block bg-teal-50 text-teal-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-teal-100">{p}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(rol)} aria-label="Editar rol" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-primary transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Rol' : 'Nuevo Rol'} maxWidth="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nombre del rol" required>
              <input value={form.nombre} onChange={e => setForm(p => ({...p, nombre: e.target.value}))} className={inputCls} placeholder="Ej. Analista FFQQ" />
            </FormField>
            <FormField label="Estado">
              <select value={form.estado} onChange={e => setForm(p => ({...p, estado: e.target.value as 'Activo'|'Inactivo'}))} className={selectCls}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </FormField>
          </div>
          <FormField label="Descripcion">
            <input value={form.descripcion} onChange={e => setForm(p => ({...p, descripcion: e.target.value}))} className={inputCls} placeholder="Descripcion del rol" />
          </FormField>
          <div>
            <p className="text-xs font-bold text-slate-600 mb-3">Permisos</p>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {PERMISSION_GROUPS.map(grp => (
                <div key={grp.group}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{grp.group}</p>
                  <div className="flex flex-wrap gap-2">
                    {grp.perms.map(p => (
                      <label key={p} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.permisos.includes(p)}
                          onChange={() => togglePerm(p)}
                          className="rounded border-slate-300 text-primary focus:ring-primary w-3.5 h-3.5"
                        />
                        <span className="text-xs text-slate-600">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ModalFooter onClose={() => setModalOpen(false)} submitLabel={editTarget ? 'Actualizar Rol' : 'Guardar Rol'} />
        </form>
      </AdminModal>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar rol"
        message={
          deleteTarget && deleteTarget.usuarios > 0
            ? `Este rol tiene ${deleteTarget.usuarios} usuario(s) asignado(s). Para eliminarlo, primero reasigna esos usuarios.`
            : `Seguro que deseas eliminar el rol "${deleteTarget?.nombre}"? Esta accion no se puede deshacer.`
        }
        confirmLabel={deleteTarget && deleteTarget.usuarios > 0 ? 'Entendido' : 'Eliminar'}
        danger={!(deleteTarget !== null && deleteTarget.usuarios > 0)}
      />
    </div>
  );
}
