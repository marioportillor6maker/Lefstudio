'use client'

import { useState } from 'react'
import { Printer, Save, Plus } from 'lucide-react'

// ── shared field helpers ────────────────────────────────────────────────────
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">{children}</label>
)
const Field = ({ value, placeholder, gray }: { value?: string; placeholder?: string; gray?: boolean }) => (
  <div className={`border border-slate-200 rounded px-2.5 py-1.5 text-sm ${gray ? 'bg-slate-50 text-slate-400' : 'text-slate-700 bg-white'}`}>
    {value ?? <span className="text-slate-300">{placeholder}</span>}
  </div>
)
const Input = ({ placeholder, type = 'text', defaultValue }: { placeholder?: string; type?: string; defaultValue?: string }) => (
  <input type={type} defaultValue={defaultValue} placeholder={placeholder}
    className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)] bg-white" />
)
const SaveBtn = ({ label }: { label: string }) => (
  <button className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-accent)] text-white text-sm rounded hover:opacity-90 transition-opacity font-medium">
    <Save size={13} /> {label}
  </button>
)
const PrintBtn = () => (
  <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-600 text-sm rounded hover:bg-slate-50 transition-colors">
    <Printer size={13} /> Imprimir
  </button>
)

// ── RT-84 HPLC Valoración ───────────────────────────────────────────────────
function RT84() {
  const [corridas, setCorridas] = useState([1, 2])
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Auxiliar HPLC — Valoración (RT-84)</h3>
        <p className="text-xs text-slate-400 mt-0.5">REC-2024-00147 · AMOXICILINA 500mg · Analista: Q.F. Karla Suazo</p>
      </div>
      <div className="border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Columna HPLC</Label><Field value="C18, 250mm x 4.6mm, 5μm" /></div>
          <div><Label>Fase Móvil</Label><Field value="Buffer pH 4.5 / Acetonitrilo 95:5" /></div>
          <div><Label>Flujo (mL/min)</Label><Field value="1.0" /></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Longitud de Onda (nm)</Label><Field value="254" /></div>
          <div><Label>Temperatura Columna (°C)</Label><Field value="30" /></div>
          <div><Label>Volumen Inyección (μL)</Label><Field value="20" /></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Tiempo de Corrida (min)</Label><Field value="15" /></div>
          <div><Label>Tiempo de Retención Estándar (min)</Label><Field value="6.42" /></div>
          <div><Label>Factor de Respuesta Estándar</Label><Field value="1.0023" /></div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">Corridas de Análisis</p>
          <button onClick={() => setCorridas(c => [...c, c.length + 1])}
            className="flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline">
            <Plus size={12} /> Agregar Corrida
          </button>
        </div>
        <div className="space-y-3">
          {corridas.map(n => (
            <div key={n} className="border border-slate-200 rounded-lg p-4 space-y-3">
              <p className="text-xs font-semibold text-slate-600">Corrida #{n}</p>
              <div className="grid grid-cols-4 gap-3">
                <div><Label>Área Estándar</Label><Input placeholder="0" /></div>
                <div><Label>Área Muestra</Label><Input placeholder="0" /></div>
                <div><Label>Peso Muestra (mg)</Label><Input placeholder="0.0000" /></div>
                <div><Label>Tiempo Retención (min)</Label><Input placeholder="0.00" /></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div><Label>Concentración Calculada (%)</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">0.00</div></div>
                <div><Label>Factor de Dilución</Label><Input defaultValue="1" /></div>
                <div><Label>Cumple (90-110%)</Label><Input defaultValue="Sí — Conforme" /></div>
                <div><Label>Observaciones</Label><Input placeholder="Obs. de la corrida" /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Promedio de Valoración (%)</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">Calculado automáticamente</div></div>
          <div><Label>RSD (%)</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">0.000</div></div>
          <div><Label>Resultado Final</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-white text-slate-700">Conforme (90.0-110.0%)</div></div>
        </div>
      </div>

      <div>
        <Label>Observaciones Generales del Auxiliar HPLC</Label>
        <textarea rows={3} placeholder="Observaciones sobre el análisis HPLC..."
          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)] resize-none" />
      </div>
      <div className="flex gap-2"><SaveBtn label="Guardar RT-84" /><PrintBtn /></div>
    </div>
  )
}

// ── RT-85 Disolución ────────────────────────────────────────────────────────
function RT85() {
  const units = ['U1','U2','U3','U4','U5','U6']
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Auxiliar Disolución (RT-85)</h3>
        <p className="text-xs text-slate-400 mt-0.5">REC-2024-00147 · AMOXICILINA 500mg</p>
      </div>
      <div className="border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Aparato</Label><Field value="Aparato II (Paletas)" /></div>
          <div><Label>Velocidad (rpm)</Label><Field value="50" /></div>
          <div><Label>Medio de Disolución</Label><Field value="Buffer pH 6.8, 900 mL" /></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Temperatura (°C)</Label><Field value="37.0" /></div>
          <div><Label>Tiempo de Muestreo (min)</Label><Field value="45" /></div>
          <div><Label>Especificación (Q)</Label><Field value="NLT 80% en 45 min" /></div>
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold mb-3">Resultados por Unidad</p>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Unidad','Absorbancia','Concentración (mg/mL)','% Disuelto','Cumple Q'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] uppercase tracking-wide text-slate-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {units.map(u => (
                <tr key={u}>
                  <td className="px-3 py-2 text-slate-600 font-medium">{u}</td>
                  <td className="px-3 py-2"><Input placeholder="0.0000" /></td>
                  <td className="px-3 py-2"><Input placeholder="0.000" /></td>
                  <td className="px-3 py-2"><Input placeholder="0.00" /></td>
                  <td className="px-3 py-2"><Input defaultValue="Sí" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Promedio % Disuelto</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">Calculado</div></div>
          <div><Label>RSD (%)</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">0.000</div></div>
          <div><Label>Resultado Final</Label><Field value="Conforme (NLT 80%)" /></div>
        </div>
      </div>

      <div>
        <Label>Observaciones</Label>
        <textarea rows={3} placeholder="Observaciones sobre la prueba de disolución..."
          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)] resize-none" />
      </div>
      <div className="flex gap-2"><SaveBtn label="Guardar RT-85" /><PrintBtn /></div>
    </div>
  )
}

// ── RT-86 Espectrofotometría IR ─────────────────────────────────────────────
const bandas = [
  { rango: '3300-3500 cm⁻¹', desc: 'Estiramiento N-H (amida)' },
  { rango: '1760-1780 cm⁻¹', desc: 'Estiramiento C=O (β-lactama)' },
  { rango: '1680-1700 cm⁻¹', desc: 'Estiramiento C=O (amida)' },
  { rango: '1600-1620 cm⁻¹', desc: 'Deformación N-H' },
  { rango: '1000-1100 cm⁻¹', desc: 'Estiramiento C-O' },
]
function RT86() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Auxiliar Espectrofotometría IR (RT-86)</h3>
      </div>
      <div className="border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Equipo IR</Label><Field value="Perkin Elmer Spectrum Two" /></div>
          <div><Label>Técnica de Preparación</Label><Field value="Pastilla KBr" /></div>
          <div><Label>Rango de Barrido (cm⁻¹)</Label><Field value="4000-400" /></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Número de Barridos</Label><Field value="32" /></div>
          <div><Label>Resolución (cm⁻¹)</Label><Field value="4" /></div>
          <div><Label>Fecha de Análisis</Label><Input type="date" placeholder="dd/mm/aaaa" /></div>
        </div>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold mb-3">Bandas de Absorción Características</p>
        <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
          {bandas.map(b => (
            <div key={b.rango} className="flex items-center gap-4 px-4 py-3">
              <span className="text-xs font-mono font-semibold text-slate-700 w-32 flex-shrink-0">{b.rango}</span>
              <span className="text-sm text-slate-600 flex-1">{b.desc}</span>
              <label className="flex items-center gap-1.5 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[var(--color-primary)]" />
                Muestra
              </label>
              <label className="flex items-center gap-1.5 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[var(--color-primary)]" />
                Estándar
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div><Label>Concordancia con Estándar</Label><Input defaultValue="Conforme — Espectros concordantes" /></div>
        <div><Label>% Concordancia (si aplica)</Label><Input placeholder="0.0" /></div>
      </div>
      <div>
        <Label>Observaciones</Label>
        <textarea rows={3} placeholder="Observaciones sobre el análisis IR..."
          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)] resize-none" />
      </div>
      <div className="flex gap-2"><SaveBtn label="Guardar RT-86" /><PrintBtn /></div>
    </div>
  )
}

// ── RT-87 Uniformidad de Contenido ─────────────────────────────────────────
function RT87() {
  const units = ['U1','U2','U3','U4','U5','U6','U7','U8','U9','U10']
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Auxiliar Uniformidad de Contenido (RT-87)</h3>
      </div>
      <div className="border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Método</Label><Field value="Uniformidad de Contenido (USP)" /></div>
          <div><Label>Número de Unidades</Label><Field value="10" /></div>
          <div><Label>Especificación</Label><Field value="85.0-115.0% (AV ≤ 15)" /></div>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Unidad','Peso (mg)','Área HPLC','Contenido (mg)','% Contenido','Cumple'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-[10px] uppercase tracking-wide text-slate-500 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {units.map(u => (
              <tr key={u}>
                <td className="px-3 py-2 text-slate-600 font-medium">{u}</td>
                <td className="px-3 py-2"><Input placeholder="0.0000" /></td>
                <td className="px-3 py-2"><Input placeholder="0" /></td>
                <td className="px-3 py-2"><div className="border border-slate-200 rounded px-2 py-1.5 text-sm bg-slate-50 text-slate-400">0.00</div></td>
                <td className="px-3 py-2"><div className="border border-slate-200 rounded px-2 py-1.5 text-sm bg-slate-50 text-slate-400">0.00</div></td>
                <td className="px-3 py-2"><Input defaultValue="Sí" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-4 gap-3">
          <div><Label>Promedio (%)</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">Calculado</div></div>
          <div><Label>Desv. Estándar</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">0.000</div></div>
          <div><Label>AV (Acceptance Value)</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">0.0</div></div>
          <div><Label>Resultado</Label><Field value="Conforme (AV ≤ 15)" /></div>
        </div>
      </div>
      <div className="flex gap-2"><SaveBtn label="Guardar RT-87" /><PrintBtn /></div>
    </div>
  )
}

// ── RT-71 Descripción Visual ────────────────────────────────────────────────
function RT71() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Auxiliar Descripción Visual (RT-71)</h3>
      </div>
      <div className="border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Forma</Label><Input defaultValue="Cápsulas" /></div>
          <div><Label>Color</Label><Input placeholder="Ej. Blanco opaco" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Tamaño (mm)</Label><Input placeholder="Ej. 22 x 7" /></div>
          <div><Label>Olor</Label><Input defaultValue="Característico" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Superficie</Label><Input defaultValue="Lisa" /></div>
          <div><Label>Marcado / Impresión</Label><Input placeholder="Ej. AMX 500" /></div>
        </div>
        <div>
          <Label>Descripción Completa</Label>
          <textarea rows={3} placeholder="Descripción detallada de los caracteres organolépticos..."
            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-sm text-slate-700 focus:outline-none focus:border-[var(--color-primary)] resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Defectos Observados</Label><Input defaultValue="Sin defectos" /></div>
          <div><Label>Resultado</Label><Input defaultValue="Conforme" /></div>
        </div>
      </div>
      <div className="flex gap-2"><SaveBtn label="Guardar RT-71" /><PrintBtn /></div>
    </div>
  )
}

// ── RT-55 Desintegración ────────────────────────────────────────────────────
function RT55() {
  const units = ['U1','U2','U3','U4','U5','U6']
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Auxiliar Desintegración (RT-55)</h3>
      </div>
      <div className="border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Medio</Label><Field value="Agua" /></div>
          <div><Label>Temperatura (°C)</Label><Field value="37.0" /></div>
          <div><Label>Especificación (min)</Label><Field value="NMT 30 min" /></div>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wide text-slate-500 font-medium">Unidad</th>
              <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wide text-slate-500 font-medium">Tiempo Desintegración (min)</th>
              <th className="px-3 py-2 text-left text-[10px] uppercase tracking-wide text-slate-500 font-medium">Cumple</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {units.map(u => (
              <tr key={u}>
                <td className="px-3 py-2 text-slate-600 font-medium">{u}</td>
                <td className="px-3 py-2 w-64"><Input placeholder="0.0" /></td>
                <td className="px-3 py-2 w-32"><Input defaultValue="Sí" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Tiempo Máximo (min)</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">Calculado</div></div>
          <div><Label>Tiempo Promedio (min)</Label><div className="border border-slate-200 rounded px-2.5 py-1.5 text-sm bg-slate-50 text-slate-400">Calculado</div></div>
          <div><Label>Resultado</Label><Field value="Conforme (NMT 30 min)" /></div>
        </div>
      </div>
      <div className="flex gap-2"><SaveBtn label="Guardar RT-55" /><PrintBtn /></div>
    </div>
  )
}

// ── main page ───────────────────────────────────────────────────────────────
type TecnicaKey = 'RT-84' | 'RT-85' | 'RT-86' | 'RT-87' | 'RT-71' | 'RT-55'

const tecnicas: { key: TecnicaKey; nombre: string; codigo: string }[] = [
  { key: 'RT-84', nombre: 'HPLC — Valoración', codigo: 'RT-84' },
  { key: 'RT-85', nombre: 'Disolución', codigo: 'RT-85' },
  { key: 'RT-86', nombre: 'Espectrofotometría IR', codigo: 'RT-86' },
  { key: 'RT-87', nombre: 'Uniformidad de Contenido', codigo: 'RT-87' },
  { key: 'RT-71', nombre: 'Descripción Visual', codigo: 'RT-71' },
  { key: 'RT-55', nombre: 'Desintegración', codigo: 'RT-55' },
]

const panels: Record<TecnicaKey, React.ReactNode> = {
  'RT-84': <RT84 />,
  'RT-85': <RT85 />,
  'RT-86': <RT86 />,
  'RT-87': <RT87 />,
  'RT-71': <RT71 />,
  'RT-55': <RT55 />,
}

export default function FfqqReactivosPage() {
  const [selected, setSelected] = useState<TecnicaKey>('RT-84')

  return (
    <div className="p-6">
      <div className="flex gap-5 items-start">
        {/* Left panel */}
        <div className="w-56 flex-shrink-0 bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">Técnicas / Auxiliares</p>
          </div>
          <div className="divide-y divide-slate-100">
            {tecnicas.map(t => (
              <button key={t.key} onClick={() => setSelected(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50
                  ${selected === t.key ? 'border-l-2 border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-l-2 border-transparent'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold
                  ${selected === t.key ? 'bg-[var(--color-accent)] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  Δ
                </div>
                <div>
                  <p className={`text-sm font-medium leading-tight ${selected === t.key ? 'text-[var(--color-accent)]' : 'text-slate-700'}`}>{t.nombre}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.codigo}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-5 min-w-0">
          {panels[selected]}
        </div>
      </div>
    </div>
  )
}
