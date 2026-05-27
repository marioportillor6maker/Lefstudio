'use client';
import { useState } from 'react';
import { Plus, Pencil, Trash2, GripVertical, Eye, Info, Check } from 'lucide-react';

const ENSAYOS = [
  'Valoración',
  'Identificación',
  'Ensayo de Disolución',
  'Prueba de Desintegración',
  'Uniformidad de Masa',
  'Agua',
  'Descripción / Caracteres Organolépticos',
  'Recuento Microbiano Total',
  'Ausencia de Patógenos',
];

const COMPOSICIONES = [
  'Tableta Recubierta',
  'Tableta No Recubierta',
  'Cápsula de Gelatina Dura',
  'Solución Oral',
  'Suspensión Oral',
  'Polvo para Suspensión',
];

interface Item {
  id: string;
  componente: string;
  cantidad: string;
  condicion: string;
  contexto: string;
}

interface Grupo {
  id: string;
  ensayo: string;
  composicion: string;
  items: Item[];
}

const INIT_GRUPOS: Grupo[] = [
  { id: 'g1', ensayo: 'Valoración',           composicion: 'Tableta Recubierta', items: [{ id:'i1', componente:'Amoxicilina Trihidrato', cantidad:'500 mg', condicion:'', contexto:'' }] },
  { id: 'g2', ensayo: 'Identificación',        composicion: 'Tableta Recubierta', items: [{ id:'i2', componente:'Principio activo',        cantidad:'',      condicion:'', contexto:'' }] },
  { id: 'g3', ensayo: 'Ensayo de Disolución',  composicion: 'Tableta Recubierta', items: [{ id:'i3', componente:'Medio de disolución',     cantidad:'900 mL',condicion:'',  contexto:'' }] },
  { id: 'g4', ensayo: 'Prueba de Desintegración', composicion: 'Tableta Recubierta', items: [] },
  { id: 'g5', ensayo: 'Uniformidad de Masa',   composicion: 'Tableta Recubierta', items: [] },
  { id: 'g6', ensayo: 'Agua',                  composicion: 'Tableta Recubierta', items: [] },
];

const INIT_ITEMS: Item[] = [
  { id: 'ni1', componente: 'Nifedipina',       cantidad: '20 mg',  condicion: '',            contexto: '' },
  { id: 'ni2', componente: 'Tableta individual',cantidad: '',       condicion: '≤ 30 min',    contexto: 'Tiempo máximo de desintegración' },
  { id: 'ni3', componente: 'Muestra compuesta', cantidad: '',       condicion: 'Medio acuoso',contexto: 'Ensayo general del producto' },
];

const EMPTY_ITEM = (): Item => ({ id: Date.now().toString(), componente: '', cantidad: '', condicion: '', contexto: '' });

const INPUT  = 'w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder:text-slate-300';
const SELECT = 'w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-400 appearance-none cursor-pointer';

export function ConfigurarRT38() {
  const [ensayo,      setEnsayo]      = useState(ENSAYOS[3]);
  const [composicion, setComposicion] = useState(COMPOSICIONES[0]);
  const [items,       setItems]       = useState<Item[]>(INIT_ITEMS);
  const [grupos,      setGrupos]      = useState<Grupo[]>(INIT_GRUPOS);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const addItem = () => setItems(prev => [...prev, EMPTY_ITEM()]);

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const updateItem = (id: string, field: keyof Item, value: string) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));

  const saveGrupo = () => {
    const nuevo: Grupo = { id: Date.now().toString(), ensayo, composicion, items: [...items] };
    setGrupos(prev => {
      const idx = prev.findIndex(g => g.ensayo === ensayo);
      if (idx >= 0) { const next = [...prev]; next[idx] = nuevo; return next; }
      return [...prev, nuevo];
    });
  };

  const removeGrupo = (id: string) => setGrupos(prev => prev.filter(g => g.id !== id));

  const editGrupo = (g: Grupo) => {
    setEnsayo(g.ensayo);
    setComposicion(g.composicion);
    setItems(g.items.length ? [...g.items] : [EMPTY_ITEM()]);
  };

  return (
    <div className="space-y-6">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-800">Configurar RT-38</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 text-blue-700 bg-blue-50">RT-38</span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl">
            DOCT define los grupos de ensayo y los ítems o subfilas opcionales que conformarán la primera columna del RT-38.
            Un grupo puede contener 0, 1 o varios ítems. Algunos ensayos pueden guardarse sin ítems específicos.
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-50 shrink-0">
          <Eye className="w-3.5 h-3.5" /> Vista previa completa
        </button>
      </div>

      {/* ── Datos del grupo de ensayo ──────────────────────────────── */}
      <div className="rounded-lg border border-slate-200 p-5 space-y-4">
        <h4 className="text-sm font-bold text-slate-700">Datos del grupo de ensayo</h4>
        <div className="flex gap-4 items-start">
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Ensayo</label>
              <div className="relative">
                <select className={SELECT} value={ensayo} onChange={e => setEnsayo(e.target.value)}>
                  {ENSAYOS.map(e => <option key={e}>{e}</option>)}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Composición y contenido por</label>
              <div className="relative">
                <select className={SELECT} value={composicion} onChange={e => setComposicion(e.target.value)}>
                  {COMPOSICIONES.map(c => <option key={c}>{c}</option>)}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-blue-700 max-w-[220px] shrink-0 flex gap-2">
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <p>Un grupo de ensayo puede contener 0, 1 o varios ítems. Algunos ensayos no requieren ítems específicos.</p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-xs text-slate-600 space-y-1">
          <p><span className="font-semibold">"Composición y contenido por"</span> = encabezado general del bloque.</p>
          <p><span className="font-semibold">"Condición específica"</span> = detalle particular del ítem, cuando aplique (ej. ampolla, solución reconstituida, 25±2 °C).</p>
        </div>
      </div>

      {/* ── Ítems del grupo ───────────────────────────────────────── */}
      <div className="rounded-lg border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
          <h4 className="text-sm font-bold text-slate-700">Ítems del grupo <span className="text-slate-400 font-normal">(opcionales)</span></h4>
          <button onClick={addItem} className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-50">
            <Plus className="w-3.5 h-3.5" /> Agregar ítem al grupo
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Componente / analito <Info className="w-3 h-3 inline text-slate-400" />
              </th>
              <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cantidad declarada</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Condición específica <Info className="w-3 h-3 inline text-slate-400" />
              </th>
              <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contexto complementario</th>
              <th className="px-4 py-2.5 text-right text-[10px] font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-xs text-slate-400">
                  Sin ítems específicos — el ensayo se guardará sin subfilas.
                </td>
              </tr>
            )}
            {items.map(item => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-2.5">
                  {editingItem === item.id
                    ? <input className={INPUT} value={item.componente} onChange={e => updateItem(item.id, 'componente', e.target.value)} autoFocus />
                    : <span className="text-slate-700">{item.componente || <span className="text-slate-300">—</span>}</span>
                  }
                </td>
                <td className="px-4 py-2.5">
                  {editingItem === item.id
                    ? <input className={INPUT} value={item.cantidad} onChange={e => updateItem(item.id, 'cantidad', e.target.value)} placeholder="—" />
                    : <span className="text-slate-600">{item.cantidad || <span className="text-slate-300">—</span>}</span>
                  }
                </td>
                <td className="px-4 py-2.5">
                  {editingItem === item.id
                    ? <input className={INPUT} value={item.condicion} onChange={e => updateItem(item.id, 'condicion', e.target.value)} placeholder="—" />
                    : <span className="text-slate-600">{item.condicion || <span className="text-slate-300">—</span>}</span>
                  }
                </td>
                <td className="px-4 py-2.5">
                  {editingItem === item.id
                    ? <input className={INPUT} value={item.contexto} onChange={e => updateItem(item.id, 'contexto', e.target.value)} placeholder="—" />
                    : <span className="text-slate-600">{item.contexto || <span className="text-slate-300">—</span>}</span>
                  }
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setEditingItem(editingItem === item.id ? null : item.id)}
                      className="p-1.5 rounded border border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded border border-red-200 text-red-500 hover:bg-red-50"
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

      {/* ── Vista previa ─────────────────────────────────────────── */}
      <div>
        <p className="text-xs text-slate-500 mb-2">Vista previa de la columna 1 del RT-38 (solo del grupo actual)</p>
        <div className="inline-block rounded border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm">
          {ensayo}
        </div>
      </div>

      {/* ── Acciones ────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <button
          onClick={saveGrupo}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
        >
          <Check className="w-3.5 h-3.5" /> Guardar grupo actual
        </button>
        <button
          onClick={() => { setEnsayo(ENSAYOS[0]); setComposicion(COMPOSICIONES[0]); setItems([]); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          <Plus className="w-3.5 h-3.5" /> Agregar otro ensayo (nuevo grupo)
        </button>
      </div>

      {/* ── Grupos configurados ───────────────────────────────────── */}
      <div className="rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
          <h4 className="text-sm font-bold text-slate-700">Grupos de ensayos configurados</h4>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider w-10">#</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ensayo (grupo)</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ítems del grupo</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Composición y contenido por</th>
              <th className="px-4 py-2.5 text-right text-[10px] font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {grupos.map((g, idx) => (
              <tr key={g.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-400 font-bold text-xs">{idx + 1}</td>
                <td className="px-4 py-3 font-medium text-slate-700">{g.ensayo}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">
                  {g.items.length > 0 ? `${g.items.length} ítem${g.items.length > 1 ? 's' : ''}` : 'Sin ítems específicos'}
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{g.composicion}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => editGrupo(g)} className="p-1.5 rounded border border-blue-200 text-blue-600 hover:bg-blue-50">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-grab">
                      <GripVertical className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => removeGrupo(g.id)} className="p-1.5 rounded border border-red-200 text-red-500 hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-4 py-2.5 text-[10px] text-slate-400 border-t border-slate-100">
          Puede cambiar el orden arrastrando las filas con el ícono de manejo.
        </p>
      </div>
    </div>
  );
}
