"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Eye, ClipboardCheck, Clock, XCircle, RotateCcw, MessageSquare, Plus, ArrowUpRight } from "lucide-react";

type TabKey = "bandeja" | "revision" | "observaciones" | "devoluciones" | "liberacion";

const TABS: { key: TabKey; label: string }[] = [
  { key: "bandeja",       label: "Bandeja STCC" },
  { key: "revision",      label: "Revisión FFQQ/Micro" },
  { key: "observaciones", label: "Observaciones" },
  { key: "devoluciones",  label: "Devoluciones" },
  { key: "liberacion",    label: "Liberación DT" },
];

const casos = [
  { id: "REC-2024-00147", producto: "AMOXICILINA 500mg Cápsulas",   dias: "3d",  estado: "En Análisis FFQQ", color: "blue"   },
  { id: "REC-2024-00148", producto: "METFORMINA 850mg Tabletas",     dias: "10d", estado: "Pdte. Pago",        color: "orange" },
  { id: "REC-2024-00149", producto: "CIPROFLOXACINA 500mg Tabletas", dias: "2d",  estado: "En Revisión STCC",  color: "purple" },
  { id: "REC-2024-00150", producto: "IBUPROFENO 400mg Tabletas",     dias: "4d",  estado: "Reanálisis",        color: "red"    },
  { id: "REC-2024-00151", producto: "ENALAPRIL 10mg Tabletas",       dias: "1d",  estado: "En Revisión DG",    color: "indigo" },
];

const statusText: Record<string, string> = {
  blue:   "text-blue-700",
  orange: "text-orange-600",
  purple: "text-purple-700",
  red:    "text-red-600",
  indigo: "text-indigo-700",
  amber:  "text-amber-600",
};
const statusDot: Record<string, string> = {
  blue:   "bg-blue-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  red:    "bg-red-500",
  indigo: "bg-indigo-500",
  amber:  "bg-amber-500",
};

function TabBandeja() {
  return (
    <>
      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { n: 4, label: "En Revisión STCC" },
          { n: 2, label: "Observaciones Activas" },
          { n: 1, label: "Devoluciones" },
          { n: 2, label: "Listos para DT" },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-md border border-slate-200 shadow-sm p-5">
            <p className="text-[28px] font-bold text-slate-900 leading-none">{m.n}</p>
            <p className="text-sm text-slate-500 mt-1.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {["Recepción","Producto","RT-38 FFQQ","RT-74 Micro","Auxiliares","Días STCC","Estado","Acciones"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 ${i >= 7 ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {casos.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 text-xs font-semibold text-primary">{c.id}</td>
                  <td className="px-4 py-3 text-xs font-medium text-slate-800">{c.producto}</td>
                  <td className="px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </td>
                  <td className="px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 font-medium">6/6</td>
                  <td className="px-4 py-3 text-xs text-slate-700 font-medium">{c.dias}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${statusText[c.color]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[c.color]}`} />
                      {c.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-3">
                      <Link
                        href={`/ingresos/${c.id}`}
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Ver
                      </Link>
                      <Link
                        href={`/ingresos/${c.id}`}
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-medium transition-colors"
                      >
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        Revisar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── Revisión FFQQ/Micro ─────────────────────────────────────────────────────

const REVISION_DATA = {
  recepcion: "REC-2024-00147",
  secciones: [
    {
      titulo: "RT-38 — Expediente Analítico FFQQ",
      items: [
        { label: "Pruebas configuradas correctamente",      ok: true  },
        { label: "Auxiliares completos y firmados",         ok: true  },
        { label: "Resultados dentro de especificaciones",   ok: true  },
        { label: "Cálculos verificados",                    ok: true  },
      ],
    },
    {
      titulo: "RT-74 — Informe Microbiológico",
      items: [
        { label: "Pruebas microbiológicas completas",  ok: true },
        { label: "Resultados dentro de límites",       ok: true },
        { label: "Conclusión microbiológica emitida",  ok: true },
      ],
    },
    {
      titulo: "Auxiliares Dinámicos",
      items: [
        { label: "RT-84 HPLC completo",        ok: true  },
        { label: "RT-85 Disolución completo",  ok: false },
        { label: "RT-86 IR completo",          ok: true  },
        { label: "RT-87 Uniformidad completo", ok: false },
      ],
    },
  ],
};

function TabRevisionFFQQMicro() {
  return (
    <div className="flex gap-4 items-start">
      {/* ── Main card ── */}
      <div className="flex-1 min-w-0 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">
            Revisión Técnica STCC — {REVISION_DATA.recepcion}
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {REVISION_DATA.secciones.map((seccion) => (
            <div key={seccion.titulo} className="px-5 py-4">
              <p className="text-xs font-semibold text-slate-800 mb-3">{seccion.titulo}</p>
              <div className="flex flex-col gap-2">
                {seccion.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.ok ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                      <span className={`text-xs ${item.ok ? "text-slate-700" : "text-red-500"}`}>
                        {item.label}
                      </span>
                    </div>
                    {!item.ok && (
                      <span className="text-xs font-medium text-orange-500 shrink-0 ml-4">
                        Pendiente
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Decision card ── */}
      <div className="w-56 shrink-0 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-sm font-semibold text-slate-800">Decisión STCC</p>
        </div>
        <div className="p-4 flex flex-col gap-2.5">
          <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-50 transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Liberar DT
          </button>
          <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-50 transition-colors">
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Devolver
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Observaciones ───────────────────────────────────────────────────────────

interface Observacion {
  id: string;
  recepcion: string;
  fecha: string;
  tipo: string;
  texto: string;
  resuelta: boolean;
}

const OBSERVACIONES_INIT: Observacion[] = [
  {
    id: "obs-1",
    recepcion: "REC-2024-00147",
    fecha: "20/01/2024",
    tipo: "Pendiente",
    texto: "RT-87 Uniformidad de Contenido pendiente de completar. Analista: Jorge Matute.",
    resuelta: false,
  },
  {
    id: "obs-2",
    recepcion: "REC-2024-00145",
    fecha: "19/01/2024",
    tipo: "Técnica",
    texto: "Resultados de disolución en el límite inferior. Requiere revisión adicional.",
    resuelta: false,
  },
];

const tipoBadge: Record<string, string> = {
  Pendiente: "text-orange-500 bg-orange-50 border-orange-200",
  Técnica:   "text-primary  bg-primary/5  border-primary/20",
};

function TabObservaciones() {
  const [obs, setObs] = useState<Observacion[]>(OBSERVACIONES_INIT);
  const [recepcion, setRecepcion]   = useState("REC-2024-00147");
  const [tipo, setTipo]             = useState("Técnica");
  const [texto, setTexto]           = useState("");

  const resolver = (id: string) =>
    setObs((prev) => prev.map((o) => (o.id === id ? { ...o, resuelta: true } : o)));

  const registrar = () => {
    if (!texto.trim()) return;
    setObs((prev) => [
      ...prev,
      {
        id: `obs-${Date.now()}`,
        recepcion,
        fecha: new Date().toLocaleDateString("es-HN"),
        tipo,
        texto,
        resuelta: false,
      },
    ]);
    setTexto("");
  };

  const inputCls =
    "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Observaciones Técnicas STCC</h3>
      </div>

      {/* ── List ── */}
      <div className="divide-y divide-slate-100">
        {obs.map((o) => (
          <div key={o.id} className={`px-5 py-4 ${o.resuelta ? "opacity-50" : ""}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-primary">{o.recepcion}</span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">{o.fecha}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tipoBadge[o.tipo] ?? "text-slate-500 bg-slate-50 border-slate-200"}`}>
                  {o.tipo}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-700 mb-2.5">{o.texto}</p>
            {!o.resuelta && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => resolver(o.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-emerald-600 font-medium transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Resolver
                </button>
                <button className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-primary font-medium transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> Responder
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Nueva observación ── */}
      <div className="px-5 py-4 border-t border-slate-200 bg-slate-50/50">
        <p className="text-xs font-semibold text-slate-700 mb-3">Nueva Observación</p>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-[10px] font-medium text-slate-500 mb-1">Recepción</label>
            <input
              type="text"
              value={recepcion}
              onChange={(e) => setRecepcion(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-slate-500 mb-1">Tipo de Observación</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={inputCls}>
              <option>Técnica</option>
              <option>Pendiente</option>
              <option>Administrativa</option>
              <option>OOS</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[10px] font-medium text-slate-500 mb-1">Observación</label>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Describa la observación..."
            rows={3}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none transition-colors"
          />
        </div>
        <button
          onClick={registrar}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Registrar Observación
        </button>
      </div>
    </div>
  );
}

// ─── Devoluciones ────────────────────────────────────────────────────────────

function TabDevoluciones() {
  const [recepcion,    setRecepcion]    = useState("REC-2024-00147 — AMOXICILINA 500mg");
  const [devolverA,    setDevolverA]    = useState("FFQQ — Analistas");
  const [motivo,       setMotivo]       = useState("Auxiliares incompletos");
  const [plazo,        setPlazo]        = useState("2");
  const [descripcion,  setDescripcion]  = useState("");

  const inputCls =
    "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Devoluciones Técnicas STCC</h3>
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Recepción <span className="text-red-400">*</span>
            </label>
            <input type="text" value={recepcion} onChange={(e) => setRecepcion(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Devolver a</label>
            <select value={devolverA} onChange={(e) => setDevolverA(e.target.value)} className={inputCls}>
              <option>FFQQ — Analistas</option>
              <option>Micro — Analistas</option>
              <option>STR — Revisión Documental</option>
              <option>RAC — Recepción</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Motivo Principal <span className="text-red-400">*</span>
            </label>
            <input type="text" value={motivo} onChange={(e) => setMotivo(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Plazo para Corrección (días)</label>
            <input type="number" value={plazo} onChange={(e) => setPlazo(e.target.value)} min="1" className={inputCls} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Descripción Detallada <span className="text-red-400">*</span>
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describa detalladamente los motivos de la devolución..."
            rows={4}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none"
          />
        </div>

        <div className="pt-1">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-danger text-white text-xs font-semibold rounded-md hover:bg-red-700 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
            Registrar Devolución
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Liberación DT ───────────────────────────────────────────────────────────

const CASOS_LIBERACION = [
  { id: "REC-2024-00147", producto: "AMOXICILINA 500mg Cápsulas" },
  { id: "REC-2024-00148", producto: "METFORMINA 850mg Tabletas" },
  { id: "REC-2024-00149", producto: "CIPROFLOXACINA 500mg Tabletas" },
];

function TabLiberacionDT() {
  const [liberados, setLiberados] = useState<Set<string>>(new Set());

  const liberar = (id: string) => setLiberados((prev) => new Set([...prev, id]));

  const pendientes = CASOS_LIBERACION.filter((c) => !liberados.has(c.id));

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Casos Listos para Liberación a DT</h3>
      </div>

      <div className="divide-y divide-slate-100">
        {pendientes.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-slate-400">
            No hay casos pendientes de liberación.
          </div>
        )}
        {pendientes.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50/60 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-primary">{c.id}</span>
                  <span className="text-xs font-medium text-slate-800">{c.producto}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  FFQQ ✓ · Micro ✓ · Auxiliares ✓ · Sin observaciones pendientes
                </p>
              </div>
            </div>
            <button
              onClick={() => liberar(c.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary-dark transition-colors shrink-0 ml-6"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              Liberar a DT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm px-6 py-10 flex flex-col items-center gap-2 text-center">
      <Clock className="w-8 h-8 text-slate-300" />
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-xs text-slate-400">Módulo en construcción</p>
    </div>
  );
}

function STCCPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab") as TabKey | null;
  const [activeTab, setActiveTab] = useState<TabKey>(tabParam ?? "bandeja");

  useEffect(() => {
    setActiveTab(tabParam ?? "bandeja");
  }, [tabParam]);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    const url = tab === "bandeja" ? "/stcc" : `/stcc?tab=${tab}`;
    router.replace(url, { scroll: false });
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 -mt-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "bandeja"       && <TabBandeja />}
      {activeTab === "revision"      && <TabRevisionFFQQMicro />}
      {activeTab === "observaciones" && <TabObservaciones />}
      {activeTab === "devoluciones"  && <TabDevoluciones />}
      {activeTab === "liberacion"    && <TabLiberacionDT />}
    </div>
  );
}

export default function STCCPage() {
  return (
    <Suspense>
      <STCCPageContent />
    </Suspense>
  );
}
