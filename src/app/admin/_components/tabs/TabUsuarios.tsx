"use client";

import { useState, useMemo } from 'react';
import { Search, Plus, Pencil, KeyRound, UserX } from 'lucide-react';
import { AdminModal } from '../AdminModal';
import { ConfirmDialog } from '../ConfirmDialog';
import { AreaBadge, EstadoBadge, FormField, inputCls, selectCls, ModalFooter } from '../AdminBadge';
import { USUARIOS_MOCK, ROLES_LIST, AREAS_LIST } from '../../_data/adminMockData';
import type { Usuario, UsuarioForm } from '../../_types/admin.types';

const EMPTY_FORM: UsuarioForm = { nombre:'', correo:'', rol:'', area:'', estado:'Activo', password:'', confirmPassword:'', enviarCredenciales: false };

export function TabUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(USUARIOS_MOCK);
  const [search, setSearch] = useState('');
  const [filterRol, setFilterRol] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Usuario | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Usuario | null>(null);
  const [form, setForm] = useState<UsuarioForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof UsuarioForm, string>>>({});

  const filtered = useMemo(() => usuarios.filter(u => {
    const q = search.toLowerCase();
    const matchQ = !q || u.nombre.toLowerCase().includes(q) || u.correo.toLowerCase().includes(q) || u.rol.toLowerCase().includes(q) || u.area.toLowerCase().includes(q);
    const matchRol = !filterRol || u.rol === filterRol;
    return matchQ && matchRol;
  }), [usuarios, search, filterRol]);

  const openNew = () => { setEditTarget(null); setForm(EMPTY_FORM); setErrors({}); setModalOpen(true); };
  const openEdit = (u: Usuario) => { setEditTarget(u); setForm({ nombre: u.nombre, correo: u.correo, rol: u.rol, area: u.area, estado: u.estado, enviarCredenciales: false }); setErrors({}); setModalOpen(true); };
  const openDelete = (u: Usuario) => { setDeleteTarget(u); setConfirmOpen(true); };

  const validate = () => {
    const e: Partial<Record<keyof UsuarioForm, string>> = {};
    if (!form.nombre.trim()) e.nombre = 'Requerido';
    if (!form.correo.trim() || !/\S+@\S+\.\S+/.test(form.correo)) e.correo = 'Correo invalido';
    if (!form.rol) e.rol = 'Requerido';
    if (!form.area) e.area = 'Requerido';
    if (!editTarget && !form.password) e.password = 'Requerido';
    if (!editTarget && form.password !== form.confirmPassword) e.confirmPassword = 'Las contrasenas no coinciden';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (editTarget) {
      setUsuarios(prev => prev.map(u => u.id === editTarget.id ? { ...u, nombre: form.nombre, correo: form.correo, rol: form.rol, area: form.area, estado: form.estado } : u));
    } else {
      const newId = `USR-${String(usuarios.length + 1).padStart(3, '0')}`;
      setUsuarios(prev => [...prev, { id: newId, nombre: form.nombre, correo: form.correo, rol: form.rol, area: form.area, estado: form.estado, ultimoAcceso: 'Nunca' }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) setUsuarios(prev => prev.map(u => u.id === deleteTarget.id ? { ...u, estado: 'Inactivo' } : u));
  };

  const activeCount = usuarios.filter(u => u.estado === 'Activo').length;
  const rolesAsignados = new Set(usuarios.map(u => u.rol)).size;
  const areasCubiertas = new Set(usuarios.map(u => u.area)).size;
  const inactivos = usuarios.filter(u => u.estado === 'Inactivo').length;

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { val: activeCount, label: 'Usuarios Activos',  bg: 'bg-green-50 border-green-200',  text: 'text-green-700'  },
          { val: rolesAsignados, label: 'Roles Asignados',bg: 'bg-blue-50 border-blue-200',    text: 'text-blue-700'   },
          { val: areasCubiertas, label: 'Areas Cubiertas',bg: 'bg-teal-50 border-teal-200',    text: 'text-teal-700'   },
          { val: inactivos, label: 'Inactivos',           bg: 'bg-slate-50 border-slate-200',  text: 'text-slate-600'  },
        ].map((c, i) => (
          <div key={i} className={`rounded-xl border p-5 ${c.bg}`}>
            <p className={`text-3xl font-black ${c.text}`}>{c.val}</p>
            <p className="text-xs text-slate-500 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar usuario..." className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <select value={filterRol} onChange={e => setFilterRol(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-slate-600">
            <option value="">Todos los roles</option>
            {ROLES_LIST.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus className="w-4 h-4" />Nuevo Usuario
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {['ID','Nombre','Correo','Rol','Area','Ultimo Acceso','Estado','Acciones'].map(h => (
                  <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-slate-500 font-semibold">{u.id}</td>
                  <td className="px-5 py-3 font-semibold text-slate-800 whitespace-nowrap">{u.nombre}</td>
                  <td className="px-5 py-3 text-slate-600">{u.correo}</td>
                  <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{u.rol}</td>
                  <td className="px-5 py-3"><AreaBadge area={u.area} /></td>
                  <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{u.ultimoAcceso}</td>
                  <td className="px-5 py-3"><EstadoBadge estado={u.estado} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(u)} aria-label="Editar" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-primary transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button aria-label="Permisos" className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-blue-600 transition-colors"><KeyRound className="w-3.5 h-3.5" /></button>
                      <button onClick={() => openDelete(u)} aria-label="Desactivar" className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-colors"><UserX className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center py-10 text-slate-400 text-sm">No se encontraron usuarios.</p>}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Editar Usuario' : 'Nuevo Usuario'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Nombre completo" required>
            <input value={form.nombre} onChange={e => setForm(p => ({...p, nombre: e.target.value}))} className={inputCls} placeholder="Nombre completo" />
            {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
          </FormField>
          <FormField label="Correo electronico" required>
            <input type="email" value={form.correo} onChange={e => setForm(p => ({...p, correo: e.target.value}))} className={inputCls} placeholder="usuario@cqfh.hn" />
            {errors.correo && <p className="text-xs text-red-500">{errors.correo}</p>}
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Rol" required>
              <select value={form.rol} onChange={e => setForm(p => ({...p, rol: e.target.value}))} className={selectCls}>
                <option value="">Seleccionar...</option>
                {ROLES_LIST.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.rol && <p className="text-xs text-red-500">{errors.rol}</p>}
            </FormField>
            <FormField label="Area" required>
              <select value={form.area} onChange={e => setForm(p => ({...p, area: e.target.value}))} className={selectCls}>
                <option value="">Seleccionar...</option>
                {AREAS_LIST.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              {errors.area && <p className="text-xs text-red-500">{errors.area}</p>}
            </FormField>
          </div>
          <FormField label="Estado">
            <select value={form.estado} onChange={e => setForm(p => ({...p, estado: e.target.value as 'Activo'|'Inactivo'}))} className={selectCls}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </FormField>
          {!editTarget && (
            <>
              <FormField label="Contrasena temporal" required>
                <input type="password" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))} className={inputCls} placeholder="••••••••" />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </FormField>
              <FormField label="Confirmar contrasena" required>
                <input type="password" value={form.confirmPassword} onChange={e => setForm(p => ({...p, confirmPassword: e.target.value}))} className={inputCls} placeholder="••••••••" />
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
              </FormField>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" checked={form.enviarCredenciales} onChange={e => setForm(p => ({...p, enviarCredenciales: e.target.checked}))} className="rounded border-slate-300 text-primary focus:ring-primary" />
                Enviar credenciales por correo
              </label>
            </>
          )}
          <ModalFooter onClose={() => setModalOpen(false)} submitLabel={editTarget ? 'Actualizar Usuario' : 'Guardar Usuario'} />
        </form>
      </AdminModal>

      {/* Confirm deactivate */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Desactivar usuario"
        message={`Seguro que deseas desactivar a "${deleteTarget?.nombre}"? El usuario no podra acceder al sistema hasta ser reactivado.`}
        confirmLabel="Desactivar"
      />
    </div>
  );
}
