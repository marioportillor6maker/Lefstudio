"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Eye, ClipboardCheck, XCircle, FileText as FileNote, Send, Printer, Archive } from "lucide-react";
import Link from "next/link";

type TabKey = "bandeja" | "revision" | "aprobacion" | "emision" | "cierre";

const TABS: { key: TabKey; label: string }[] = [
  { key: "bandeja",    label: "Bandeja DG" },
  { key: "revision",   label: "Revisión Final" },
  { key: "aprobacion", label: "Aprobación / Observaciones" },
  { key: "emision",    label: "Emisión al Cliente" },
  { key: "cierre",     label: "Cierre y Archivo" },
];

const CASOS = [
  { id: "REC-2024-00147", producto: "AMOXICILINA 500mg Cápsulas",   cliente: "SESAL — Secretaría de Salud", dias: 3,  estado: "En Análisis FFQQ" },
  { id: "REC-2024-00148", producto: "METFORMINA 850mg Tabletas",     cliente: "IHSS",                        dias: 18, estado: "Pdte. Pago" },
  { id: "REC-2024-00149", producto: "CIPROFLOXACINA 500mg Tabletas", cliente: "ARSA",                        dias: 2,  estado: "En Revisión STCC" },
  { id: "REC-2024-00150", producto: "IBUPROFENO 400mg Tabletas",     cliente: "Hospital Escuela",            dias: 4,  estado: "Reanálisis" },
];

const ESTADO_DOT: Record<string, string> = {
  "En Análisis FFQQ":  "bg-blue-500",
  "Pdte. Pago":        "bg-orange-500",
  "En Revisión STCC":  "bg-purple-500",
  "Reanálisis":        "bg-red-500",
  "En Revisión DG":    "bg-indigo-500",
};

const ESTADO_TEXT: Record<string, string> = {
  "En Análisis FFQQ":  "text-blue-700",
  "Pdte. Pago":        "text-orange-600",
  "En Revisión STCC":  "text-purple-700",
  "Reanálisis":        "text-red-600",
  "En Revisión DG":    "text-indigo-700",
};

const VERIFICACION_ITEMS = [
  { id: "rt39",    label: "RT-39 revisado y aprobado por DT",          defaultChecked: true },
  { id: "result",  label: "Resultado técnico conforme con metodología", defaultChecked: true },
  { id: "docs",    label: "Documentación completa del expediente",      defaultChecked: true },
  { id: "obs",     label: "Sin observaciones técnicas pendientes",      defaultChecked: true },
  { id: "emision", label: "Informe listo para emisión al cliente",      defaultChecked: false },
  { id: "oficio",  label: "Número de oficio asignado",                  defaultChecked: false },
];

const INPUT = "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

function TabRevisionFinal() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(VERIFICACION_ITEMS.map((i) => [i.id, i.defaultChecked]))
  );

  return (
    <div className="flex gap-4 items-start">
      {/* Main card */}
      <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800">Revisión Final DG — REC-2024-00147</h3>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          {[
            { label: "Producto",         value: "AMOXICILINA 500mg Cápsulas",  highlight: false },
            { label: "Fabricante",       value: "Laboratorios Vijosa S.A.",     highlight: false },
            { label: "Lote",             value: "AM2401X",                      highlight: false },
            { label: "Cliente",          value: "SESAL — Secretaría de Salud",  highlight: false },
            { label: "Tipo Trámite",     value: "Control de Calidad",           highlight: false },
            { label: "Días Totales",     value: "22 días",                      highlight: false },
            { label: "Resultado DT",     value: "CONFORME",                     highlight: true },
            { label: "Director Técnico", value: "Q.F. Dr. Roberto Paz",         highlight: false },
            { label: "Número RT-39",     value: "RT39-2024-0089",               highlight: false },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{m.label}</p>
              <p className={`text-xs font-semibold mt-0.5 ${m.highlight ? "text-green-600" : "text-slate-800"}`}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* Verificación */}
        <div className="px-5 py-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Verificación Final DG</p>
          <div className="flex flex-col gap-3">
            {VERIFICACION_ITEMS.map((item) => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked[item.id]}
                  onChange={(e) => setChecked((prev) => ({ ...prev, [item.id]: e.target.checked }))}
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                />
                <span className={`text-xs ${checked[item.id] ? "text-primary font-medium" : "text-slate-600"}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-72 shrink-0 flex flex-col gap-4">
        {/* Decisión DG */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
          <h4 className="text-sm font-semibold text-slate-800 mb-3">Decisión DG</h4>
          <div className="flex flex-col gap-2">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-md transition-colors shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" /> Aprobar y Emitir
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
              <FileNote className="w-3.5 h-3.5 text-slate-500" /> Observaciones a DT
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-danger border border-slate-200 rounded-md hover:bg-red-50 transition-colors">
              <XCircle className="w-3.5 h-3.5" /> Rechazar
            </button>
          </div>
        </div>

        {/* Datos del Informe */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-3">
          <h4 className="text-sm font-semibold text-slate-800">Datos del Informe</h4>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Número de Oficio</label>
            <input type="text" defaultValue="CQFH-LEF-2024-0089" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Fecha de Emisión</label>
            <input type="date" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Director General</label>
            <input type="text" defaultValue="Q.F. Dra. Carmen Alvarado" className={INPUT} />
          </div>
        </div>
      </div>
    </div>
  );
}

const HISTORIAL_APROBACIONES = [
  { id: "REC-2024-00145", producto: "LOSARTÁN 50mg",    rt39: "RT39-2024-0087", fecha: "20/01/2024", director: "Q.F. Dra. Carmen Alvarado" },
  { id: "REC-2024-00143", producto: "DICLOFENACO 75mg", rt39: "RT39-2024-0085", fecha: "18/01/2024", director: "Q.F. Dra. Carmen Alvarado" },
];

const ARCHIVADOS = [
  { id: "REC-2024-00145", producto: "LOSARTÁN 50mg",    cliente: "IHSS",            fecha: "22/01/2024", conforme: true,  ubicacion: "Archivo B-3" },
  { id: "REC-2024-00143", producto: "DICLOFENACO 75mg", cliente: "SESAL",           fecha: "20/01/2024", conforme: true,  ubicacion: "Archivo B-2" },
  { id: "REC-2024-00140", producto: "AMLODIPINO 5mg",   cliente: "Hospital Escuela", fecha: "18/01/2024", conforme: false, ubicacion: "Archivo B-1" },
];

const VERIFICACION_CIERRE = [
  "Informe emitido al cliente",
  "Oficio de entrega firmado",
  "Todos los formatos en el expediente",
  "Expediente foliado y ordenado",
  "Muestra biblioteca almacenada",
  "Estándar devuelto o eliminado según corresponda",
];

function TabAprobacionObservaciones() {
  return (
    <div className="space-y-5">
      {/* Form card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">Observaciones / Correcciones al RT-39</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Recepción <span className="text-danger">*</span></label>
            <input type="text" defaultValue="REC-2024-00147 — AMOXICILINA 500mg" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Tipo de Observación</label>
            <input type="text" defaultValue="Corrección de redacción" className={INPUT} />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Observación Detallada <span className="text-danger">*</span></label>
          <textarea rows={4} placeholder="Describa la observación o corrección requerida al RT-39..." className={`${INPUT} resize-none`} />
        </div>

        <div className="max-w-xs">
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Plazo para Corrección (días)</label>
          <input type="number" defaultValue={2} className={INPUT} />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-md shadow-sm transition-colors">
          <Send className="w-3.5 h-3.5" /> Enviar Observación a DT
        </button>
      </div>

      {/* Historial */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800">Historial de Aprobaciones DG</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 font-medium">Recepción</th>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">RT-39</th>
                <th className="px-4 py-3 font-medium">Fecha Aprobación</th>
                <th className="px-4 py-3 font-medium">Director General</th>
                <th className="px-4 py-3 font-medium">Resultado</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HISTORIAL_APROBACIONES.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-semibold text-primary">{h.id}</td>
                  <td className="px-4 py-3 text-xs text-slate-700">{h.producto}</td>
                  <td className="px-4 py-3 text-xs font-medium text-primary">{h.rt39}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{h.fecha}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{h.director}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                      <span className="w-2 h-2 rounded-full bg-green-500" /> Conforme
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                      <span className="w-2 h-2 rounded-full bg-green-500" /> Emitido
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabEmisionCliente() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center shrink-0">
          <Send className="w-3.5 h-3.5 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">Emisión del Informe al Cliente</h3>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Recepción <span className="text-danger">*</span></label>
            <input type="text" defaultValue="REC-2024-00147 — AMOXICILINA 500mg" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Número de Oficio <span className="text-danger">*</span></label>
            <input type="text" defaultValue="CQFH-LEF-2024-0089" disabled className={`${INPUT} bg-slate-50 text-slate-400 cursor-not-allowed`} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Fecha de Emisión <span className="text-danger">*</span></label>
            <input type="date" className={INPUT} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Dirigido a</label>
            <input type="text" defaultValue="SESAL — Secretaría de Salud" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Atención</label>
            <input type="text" placeholder="Nombre del destinatario" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Método de Entrega</label>
            <input type="text" defaultValue="Entrega física" className={INPUT} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Correo Electrónico del Cliente</label>
            <input type="email" placeholder="correo@cliente.hn" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Persona que Recibe</label>
            <input type="text" placeholder="Nombre de quien recibe" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Fecha de Recepción por Cliente</label>
            <input type="date" className={INPUT} />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Observaciones de la Emisión</label>
          <textarea rows={3} placeholder="Observaciones sobre la emisión del informe al cliente..." className={`${INPUT} resize-none`} />
        </div>

        <div className="flex gap-2 pt-1">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-md shadow-sm transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5" /> Registrar Emisión al Cliente
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-50 transition-colors">
            <Printer className="w-3.5 h-3.5" /> Imprimir Oficio
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-50 transition-colors">
            <FileNote className="w-3.5 h-3.5" /> Generar RT-39 Final
          </button>
        </div>
      </div>
    </div>
  );
}

function TabCierreArchivo() {
  const [cierreChecks, setCierreChecks] = useState<boolean[]>(Array(VERIFICACION_CIERRE.length).fill(false));

  return (
    <div className="space-y-5">
      {/* Cierre form */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
          <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center shrink-0">
            <Archive className="w-3.5 h-3.5 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">Cierre y Archivo del Expediente</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Recepción <span className="text-danger">*</span></label>
              <input type="text" defaultValue="REC-2024-00145 — LOSARTÁN 50mg (Emitido)" className={INPUT} />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Fecha de Cierre <span className="text-danger">*</span></label>
              <input type="date" className={INPUT} />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Responsable del Cierre</label>
              <input type="text" defaultValue="Q.F. Dra. Carmen Alvarado" className={INPUT} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Ubicación Física del Expediente</label>
              <input type="text" placeholder="Ej. Archivo Central, Estante 8, Gaveta 3" className={INPUT} />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Número de Fojas</label>
              <input type="number" defaultValue={0} className={INPUT} />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Año de Archivo</label>
              <input type="text" defaultValue="2024" className={INPUT} />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Verificación de Cierre</p>
            <div className="grid grid-cols-2 gap-2">
              {VERIFICACION_CIERRE.map((label, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cierreChecks[i]}
                    onChange={(e) => {
                      const next = [...cierreChecks];
                      next[i] = e.target.checked;
                      setCierreChecks(next);
                    }}
                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-md shadow-sm transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5" /> Cerrar y Archivar Expediente
          </button>
        </div>
      </div>

      {/* Archivados table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800">Expedientes Archivados Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 font-medium">Recepción</th>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Fecha Cierre</th>
                <th className="px-4 py-3 font-medium">Resultado</th>
                <th className="px-4 py-3 font-medium">Ubicación</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ARCHIVADOS.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-semibold text-primary">{a.id}</td>
                  <td className="px-4 py-3 text-xs text-slate-700">{a.producto}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{a.cliente}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{a.fecha}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${a.conforme ? "text-green-600" : "text-red-500"}`}>
                      {a.conforme ? "Conforme" : "No Conforme"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{a.ubicacion}</td>
                  <td className="px-4 py-3">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm min-h-[300px] flex items-center justify-center">
      <p className="text-sm text-slate-400">{label} — En construcción</p>
    </div>
  );
}

function TabBandeja() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: 2, label: "En Revisión DG" },
          { value: 1, label: "Aprobados Hoy" },
          { value: 1, label: "Con Observaciones" },
          { value: 8, label: "Emitidos Este Mes" },
        ].map((c) => (
          <div key={c.label} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <p className="text-[28px] font-bold text-slate-900 leading-none">{c.value}</p>
            <p className="text-sm text-slate-500 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 font-medium">Recepción</th>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium text-center">RT-39</th>
                <th className="px-4 py-3 font-medium">Días DG</th>
                <th className="px-4 py-3 font-medium">Resultado DT</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CASOS.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-primary text-xs">{c.id}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-700">{c.producto}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{c.cliente}</td>
                  <td className="px-4 py-3 text-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{c.dias}d</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                      Conforme
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${ESTADO_DOT[c.estado] ?? "bg-slate-400"}`} />
                      <span className={ESTADO_TEXT[c.estado] ?? "text-slate-600"}>{c.estado}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/ingresos/${c.id}`} className="flex items-center gap-1 text-xs text-slate-500 hover:text-primary transition-colors">
                        <Eye className="w-3.5 h-3.5" /> Ver
                      </Link>
                      <Link href={`/ingresos/${c.id}`} className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark font-medium transition-colors">
                        <ClipboardCheck className="w-3.5 h-3.5" /> Aprobar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DGPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("bandeja");

  useEffect(() => {
    const tab = searchParams.get("tab") as TabKey | null;
    setActiveTab(tab ?? "bandeja");
  }, [searchParams]);

  function handleTabChange(key: TabKey) {
    setActiveTab(key);
    if (key === "bandeja") {
      router.replace("/dg");
    } else {
      router.replace(`/dg?tab=${key}`);
    }
  }

  return (
    <div className="space-y-5 pb-12">
      <div className="flex gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => handleTabChange(t.key)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "bandeja"    && <TabBandeja />}
      {activeTab === "revision"   && <TabRevisionFinal />}
      {activeTab === "aprobacion" && <TabAprobacionObservaciones />}
      {activeTab === "emision"    && <TabEmisionCliente />}
      {activeTab === "cierre"     && <TabCierreArchivo />}
    </div>
  );
}

export default function DGPage() {
  return (
    <Suspense>
      <DGPageContent />
    </Suspense>
  );
}
