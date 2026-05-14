"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2, Eye, ClipboardEdit,
  AlertTriangle, RotateCcw, Users, Send, FileText,
  Printer,
} from "lucide-react";
import Link from "next/link";

type TabKey = "bandeja" | "revision" | "decisiones" | "reanalisis" | "rt39";

const TABS: { key: TabKey; label: string }[] = [
  { key: "bandeja",    label: "Bandeja DT" },
  { key: "revision",   label: "Revisión Consolidada" },
  { key: "decisiones", label: "Decisiones Técnicas" },
  { key: "reanalisis", label: "Reanálisis / Comité" },
  { key: "rt39",       label: "Elaboración RT-39" },
];

const CASOS = [
  { id: "REC-2024-00147", producto: "AMOXICILINA 500mg Cápsulas",   tipo: "Control Calidad", dias: 3,  estado: "En Análisis FFQQ" },
  { id: "REC-2024-00148", producto: "METFORMINA 850mg Tabletas",     tipo: "Control Calidad", dias: 10, estado: "Pdte. Pago" },
  { id: "REC-2024-00149", producto: "CIPROFLOXACINA 500mg Tabletas", tipo: "Control Calidad", dias: 2,  estado: "En Revisión STCC" },
  { id: "REC-2024-00150", producto: "IBUPROFENO 400mg Tabletas",     tipo: "Control Calidad", dias: 4,  estado: "Reanálisis" },
  { id: "REC-2024-00151", producto: "ENALAPRIL 10mg Tabletas",       tipo: "Control Calidad", dias: 1,  estado: "En Revisión DG" },
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

const SECCIONES = [
  {
    nombre: "RAC", ok: 4, total: 4,
    items: [
      { texto: "RG-41 completo",               warn: false },
      { texto: "Pago confirmado",              warn: false },
      { texto: "Documentación mínima verificada", warn: false },
      { texto: "RT-159 emitido",               warn: false },
    ],
  },
  {
    nombre: "DOCT", ok: 4, total: 4,
    items: [
      { texto: "RT-75 respondido",  warn: false },
      { texto: "RT-30 respondido",  warn: false },
      { texto: "RT-41 completado",  warn: false },
      { texto: "RT-38 preparado",   warn: false },
    ],
  },
  {
    nombre: "Estándares", ok: 3, total: 3,
    items: [
      { texto: "RG-44 registrado",  warn: false },
      { texto: "Estándar vigente",  warn: false },
      { texto: "RT-27 emitido",     warn: false },
    ],
  },
  {
    nombre: "STR", ok: 3, total: 3,
    items: [
      { texto: "Revisión documental aprobada", warn: false },
      { texto: "Analistas asignados",          warn: false },
      { texto: "RT-40 emitido",                warn: false },
    ],
  },
  {
    nombre: "FFQQ", ok: 3, total: 4,
    items: [
      { texto: "Descripción: Conforme",  warn: false },
      { texto: "HPLC: Conforme",         warn: false },
      { texto: "IR: Conforme",           warn: false },
      { texto: "Disolución: Conforme",   warn: true },
    ],
  },
  {
    nombre: "Microbiología", ok: 4, total: 4,
    items: [
      { texto: "RTBA: Conforme",     warn: false },
      { texto: "Patógenos: Ausentes", warn: false },
      { texto: "RTHL: Conforme",     warn: false },
      { texto: "RT-74 elaborado",    warn: false },
    ],
  },
  {
    nombre: "STCC", ok: 2, total: 2,
    items: [
      { texto: "Revisión técnica aprobada",   warn: false },
      { texto: "Sin observaciones pendientes", warn: false },
    ],
  },
];

const CRITERIOS = [
  { texto: "Todos los análisis FFQQ conformes",       ok: false },
  { texto: "Análisis microbiológico conforme",        ok: true },
  { texto: "Documentación completa",                  ok: true },
  { texto: "Sin observaciones técnicas pendientes",   ok: false },
  { texto: "Estándar válido y vigente",               ok: true },
];

const HISTORIAL = [
  { id: "REC-2024-00143", descripcion: "Reanálisis — Disolución fuera de especificaciones", fecha: "15/01/2024", estado: "Resuelto" },
  { id: "REC-2024-00139", descripcion: "Escalar a Comité — Resultado ambiguo HPLC",          fecha: "12/01/2024", estado: "En Proceso" },
];

function TabDecisionesTecnicas() {
  const INPUT = "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">Registro de Decisiones Técnicas</h3>

        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Recepción <span className="text-danger">*</span></label>
            <input type="text" defaultValue="REC-2024-00147 — AMOXICILINA 500mg" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Tipo de Decisión <span className="text-danger">*</span></label>
            <select defaultValue="aprobar" className={INPUT}>
              <option value="aprobar">Aprobar — Proceder con RT-39</option>
              <option value="reanalisis">Ordenar Reanálisis</option>
              <option value="comite">Escalar a Comité</option>
              <option value="devolver">Devolver a Módulo</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Fecha de Decisión</label>
            <input type="date" className={INPUT} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Director Técnico</label>
            <input type="text" defaultValue="Q.F. Dr. Roberto Paz" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Prueba Afectada (si aplica)</label>
            <input type="text" defaultValue="N/A" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Plazo para Resolución (días)</label>
            <input type="number" defaultValue={5} className={INPUT} />
          </div>
        </div>

        {/* Fundamento */}
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Fundamento Técnico de la Decisión <span className="text-danger">*</span></label>
          <textarea
            rows={4}
            placeholder="Fundamento técnico, normativo o científico de la decisión..."
            className={`${INPUT} resize-none`}
          />
        </div>

        {/* Instrucciones */}
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Instrucciones Específicas</label>
          <textarea
            rows={4}
            placeholder="Instrucciones específicas para el equipo analítico..."
            className={`${INPUT} resize-none`}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-md shadow-sm transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5" /> Registrar Decisión
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-50 transition-colors">
            <Printer className="w-3.5 h-3.5" /> Imprimir
          </button>
        </div>
      </div>

      {/* Historial */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Historial de Decisiones</p>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm divide-y divide-slate-100">
          {HISTORIAL.map((h) => (
            <div key={h.id} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-primary">{h.id}</span>
                <span className="text-xs text-slate-600">{h.descripcion}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400">{h.fecha}</span>
                <span className={`text-xs font-semibold ${h.estado === "Resuelto" ? "text-green-600" : "text-orange-500"}`}>
                  {h.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabReanalisisComite() {
  const INPUT = "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="space-y-5">
      {/* Orden de Reanálisis */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">Orden de Reanálisis / Verificación</h3>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Recepción <span className="text-danger">*</span></label>
            <input type="text" defaultValue="REC-2024-00147 — AMOXICILINA 500mg" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Tipo</label>
            <input type="text" defaultValue="Reanálisis Completo" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Prueba a Repetir</label>
            <input type="text" defaultValue="Valoración HPLC" className={INPUT} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Analista Asignado</label>
            <input type="text" defaultValue="Q.F. Karla Suazo" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Fecha Límite</label>
            <input type="date" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Causa del Reanálisis</label>
            <input type="text" defaultValue="Resultado fuera de especificaciones" className={INPUT} />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Justificación Técnica <span className="text-danger">*</span></label>
          <textarea rows={4} placeholder="Justificación técnica del reanálisis..." className={`${INPUT} resize-none`} />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-md shadow-sm transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> Ordenar Reanálisis
        </button>
      </div>

      {/* Escalamiento a Comité */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">Escalamiento a Comité de Calidad</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Recepción <span className="text-danger">*</span></label>
            <input type="text" defaultValue="REC-2024-00139 — CAPTOPRIL 25mg" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Motivo del Escalamiento <span className="text-danger">*</span></label>
            <input type="text" defaultValue="Resultado ambiguo persistente" className={INPUT} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Miembros del Comité</label>
            <input type="text" defaultValue="DT, DG, STCC, Analista Principal" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Fecha de Reunión Propuesta</label>
            <input type="date" className={INPUT} />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Antecedentes y Contexto</label>
          <textarea rows={4} placeholder="Describa los antecedentes del caso y el contexto del escalamiento..." className={`${INPUT} resize-none`} />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-md shadow-sm transition-colors">
          <Users className="w-3.5 h-3.5" /> Escalar a Comité
        </button>
      </div>
    </div>
  );
}

const SECCIONES_RT39 = [
  {
    num: 1,
    titulo: "Identificación del Producto y Muestra",
    defaultValue: "Producto: AMOXICILINA 500mg Cápsulas de gelatina dura. Fabricante: Laboratorios Vijosa S.A. Lote: AM2401X. Fecha de fabricación: 01/2024. Fecha de expiración: 12/2026. Registro Sanitario: RS-HN-0042-2019.",
    placeholder: "",
  },
  {
    num: 2,
    titulo: "Metodología Analítica Aplicada",
    defaultValue: "Se aplicó la metodología de la Farmacopea de los Estados Unidos (USP 47) para Amoxicillin Capsules. Estándar de referencia: Amoxicilina Trihidrato USP RS, Lote USP-AMX-2024A, Pureza 99.8%.",
    placeholder: "",
  },
  {
    num: 3,
    titulo: "Resultados del Análisis Físico-Químico",
    defaultValue: "",
    placeholder: "Resumen de resultados FFQQ: descripción, identificación, valoración, disolución, uniformidad de contenido, etc.",
  },
  {
    num: 4,
    titulo: "Resultados del Análisis Microbiológico",
    defaultValue: "",
    placeholder: "Resumen de resultados microbiológicos: RTBA, RTHL, ausencia de patógenos...",
  },
  {
    num: 5,
    titulo: "Conclusión Técnica",
    defaultValue: "",
    placeholder: "Conclusión técnica del análisis. El producto cumple/no cumple con las especificaciones establecidas en la metodología de referencia...",
  },
  {
    num: 6,
    titulo: "Observaciones y Recomendaciones",
    defaultValue: "",
    placeholder: "Observaciones adicionales, recomendaciones técnicas, condiciones especiales...",
  },
];

function TabElaboracionRT39() {
  const INPUT = "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center shrink-0">
          <FileText className="w-3.5 h-3.5 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">Elaboración de Informe de Análisis — RT-39</h3>
      </div>

      <div className="p-5 space-y-5">
        {/* Metadata */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Número RT-39</label>
            <input type="text" placeholder="Auto-generado" disabled className={`${INPUT} bg-slate-50 text-slate-400 cursor-not-allowed`} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Recepción</label>
            <input type="text" defaultValue="REC-2024-00147" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Fecha de Elaboración</label>
            <input type="date" className={INPUT} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Director Técnico</label>
            <input type="text" defaultValue="Q.F. Dr. Roberto Paz" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Versión</label>
            <input type="text" defaultValue="1.0" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Estado</label>
            <input type="text" defaultValue="Borrador" className={INPUT} />
          </div>
        </div>

        {/* Secciones */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Secciones del RT-39</p>
          <div className="space-y-4">
            {SECCIONES_RT39.map((s) => (
              <div key={s.num}>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {s.num}. {s.titulo}
                </label>
                <textarea
                  rows={3}
                  defaultValue={s.defaultValue}
                  placeholder={s.placeholder}
                  className={`${INPUT} resize-none`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer fields */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Resultado Final del Análisis</label>
            <input type="text" defaultValue="CONFORME — El producto cumple con todas las especificaciones" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">Firma del Director Técnico</label>
            <input type="text" defaultValue="Q.F. Dr. Roberto Paz — DT-LEF" className={INPUT} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-md shadow-sm transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5" /> Finalizar RT-39
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-50 transition-colors">
            <Send className="w-3.5 h-3.5" /> Enviar a DG para Aprobación
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-50 transition-colors">
            <Eye className="w-3.5 h-3.5" /> Vista Previa RT-39
          </button>
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

function TabRevisionConsolidada() {
  return (
    <div className="flex gap-4 items-start">
      {/* Main card */}
      <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800 text-sm">
            Revisión Consolidada del Expediente — REC-2024-00147
          </h3>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b border-slate-100 bg-slate-50/50">
          {[
            { label: "Producto",      value: "AMOXICILINA 500mg" },
            { label: "Tipo Trámite",  value: "Control de Calidad" },
            { label: "Cliente",       value: "SESAL" },
            { label: "Días Totales",  value: "18 días" },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{m.label}</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="divide-y divide-slate-100">
          {SECCIONES.map((sec) => (
            <div key={sec.nombre} className="px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-800">{sec.nombre}</span>
                <span className={`text-xs font-bold ${sec.ok === sec.total ? "text-green-600" : "text-orange-500"}`}>
                  {sec.ok}/{sec.total} {sec.ok === sec.total ? "✓" : ""}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                {sec.items.map((item) => (
                  <div key={item.texto} className="flex items-center gap-1.5">
                    {item.warn
                      ? <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      : <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    }
                    <span className={`text-xs ${item.warn ? "text-orange-600 font-medium" : "text-slate-600"}`}>
                      {item.texto}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-64 shrink-0 flex flex-col gap-4">
        {/* Criterios Técnicos */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
          <h4 className="text-sm font-semibold text-slate-800 mb-3">Criterios Técnicos DT</h4>
          <div className="flex flex-col gap-2">
            {CRITERIOS.map((c) => (
              <div key={c.texto} className="flex items-start gap-2">
                {c.ok
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                  : <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                }
                <span className={`text-xs ${c.ok ? "text-slate-600" : "text-orange-600"}`}>{c.texto}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones DT */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
          <h4 className="text-sm font-semibold text-slate-800 mb-3">Acciones DT</h4>
          <div className="flex flex-col gap-2">
            {[
              { icon: RotateCcw, label: "Ordenar Reanálisis" },
              { icon: Users,     label: "Escalar a Comité" },
              { icon: FileText,  label: "Elaborar RT-39" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-slate-500" />
                {label}
              </button>
            ))}
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-1 text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-md transition-colors shadow-sm">
              <Send className="w-3.5 h-3.5" />
              Enviar a DG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabBandeja() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: 3, label: "En Revisión DT" },
          { value: 1, label: "Reanálisis Activos" },
          { value: 1, label: "Escalados a Comité" },
          { value: 2, label: "RT-39 en Borrador" },
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
                <th className="px-4 py-3 font-medium">Tipo Trámite</th>
                <th className="px-4 py-3 font-medium text-center">FFQQ</th>
                <th className="px-4 py-3 font-medium text-center">Micro</th>
                <th className="px-4 py-3 font-medium text-center">STCC</th>
                <th className="px-4 py-3 font-medium">Días DT</th>
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
                  <td className="px-4 py-3 text-xs text-slate-600">{c.tipo}</td>
                  <td className="px-4 py-3 text-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{c.dias}d</td>
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
                        <ClipboardEdit className="w-3.5 h-3.5" /> Revisar
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

function DTPageContent() {
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
      router.replace("/dt");
    } else {
      router.replace(`/dt?tab=${key}`);
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
      {activeTab === "revision"   && <TabRevisionConsolidada />}
      {activeTab === "decisiones" && <TabDecisionesTecnicas />}
      {activeTab === "reanalisis" && <TabReanalisisComite />}
      {activeTab === "rt39"       && <TabElaboracionRT39 />}
    </div>
  );
}

export default function DTPage() {
  return (
    <Suspense>
      <DTPageContent />
    </Suspense>
  );
}
