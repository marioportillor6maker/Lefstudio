"use client";

import { useState } from "react";
import { ArrowLeft, Save, CheckCircle2, ChevronRight, User, Package, Building, Hash, FileText, ClipboardCheck, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { catalogoTramites } from "@/lib/mockData";

// Mock session user — replace with real auth session when backend is integrated
const SESSION_USER = "María Rodríguez";

interface Estandar {
  id: string;
  nombre: string;
  cantidad: string;
  observacion: string;
}

export default function NuevoIngresoRAC() {
  const [step, setStep] = useState(1);
  const [tramiteS, setTramiteS] = useState("");
  const [fechaRecepcion, setFechaRecepcion] = useState(() => new Date().toISOString().split("T")[0]);
  const [horaRecepcion, setHoraRecepcion] = useState(() => new Date().toTimeString().slice(0, 5));
  const [estandares, setEstandares] = useState<Estandar[]>([]);

  const agregarEstandar = () => {
    setEstandares(prev => [
      ...prev,
      { id: crypto.randomUUID(), nombre: "", cantidad: "", observacion: "" },
    ]);
  };

  const quitarEstandar = (id: string) => {
    setEstandares(prev => prev.filter(e => e.id !== id));
  };

  const actualizarEstandar = (id: string, campo: keyof Omit<Estandar, "id">, valor: string) => {
    setEstandares(prev => prev.map(e => e.id === id ? { ...e, [campo]: valor } : e));
  };

  const steps = [
    { id: 1, name: "Datos del Trámite", icon: <User className="w-4 h-4" /> },
    { id: 2, name: "Producto", icon: <Package className="w-4 h-4" /> },
    { id: 3, name: "Cliente / Externo", icon: <Building className="w-4 h-4" /> },
    { id: 4, name: "Cantidades", icon: <Hash className="w-4 h-4" /> },
    { id: 5, name: "Documentos", icon: <FileText className="w-4 h-4" /> },
    { id: 6, name: "Validación", icon: <ClipboardCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 flex flex-col xl:flex-row gap-8 items-start">

      {/* Sidebar Navigation */}
      <div className="w-full xl:w-72 bg-white rounded-lg border border-slate-200 shadow-sm p-4 sticky top-6">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <Link href="/rac" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">Nuevo Ingreso</h1>
            <p className="text-slate-500 text-[11px] uppercase tracking-wider font-bold mt-0.5">Flujo RAC</p>
          </div>
        </div>

        <nav className="space-y-1">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold transition-colors ${
                step === s.id
                  ? "bg-primary text-white shadow-sm"
                  : step > s.id
                    ? "text-slate-700 hover:bg-slate-50"
                    : "text-slate-400 cursor-not-allowed"
              }`}
              disabled={step < s.id && step !== s.id - 1}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                step === s.id ? "border-white/30 bg-white/20" :
                step > s.id ? "border-primary text-primary bg-primary/10" : "border-slate-200 bg-slate-50"
              }`}>
                {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>
              <span className="flex-1 text-left">{s.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Estado de Captura</p>
          <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
            Borrador Activo
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full bg-white rounded-lg border border-slate-200 shadow-sm p-8">

        {/* PASO 1: Datos del Trámite */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <User className="w-5 h-5 text-primary" /> Paso 1: Datos del Trámite
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Tipo de Trámite <span className="text-danger">*</span></label>
                <select
                  value={tramiteS}
                  onChange={(e) => setTramiteS(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Seleccione...</option>
                  {catalogoTramites.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Prioridad <span className="text-danger">*</span></label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Normal</option>
                  <option>Urgente</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="fecha-recepcion" className="text-xs font-bold text-slate-700 uppercase">Fecha de Recepción <span className="text-danger">*</span></label>
                <input
                  id="fecha-recepcion"
                  type="date"
                  value={fechaRecepcion}
                  onChange={(e) => setFechaRecepcion(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="hora-recepcion" className="text-xs font-bold text-slate-700 uppercase">Hora de Recepción <span className="text-danger">*</span></label>
                <input
                  id="hora-recepcion"
                  type="time"
                  value={horaRecepcion}
                  onChange={(e) => setHoraRecepcion(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Responsable RAC</label>
                <div
                  data-testid="responsable-display"
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded text-sm flex items-center text-slate-700 font-medium"
                >
                  {SESSION_USER}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Requiere Pago Previo <span className="text-danger">*</span></label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Sí</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="estado-inicial" className="text-xs font-bold text-slate-700 uppercase">Estado Inicial del Producto <span className="text-danger">*</span></label>
                <textarea id="estado-inicial" rows={3} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
              </div>
            </div>
          </div>
        )}

        {/* PASO 2: Producto */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Package className="w-5 h-5 text-primary" /> Paso 2: Producto
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nombre Comercial <span className="text-danger">*</span></label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nombre Genérico</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Principio Activo (DCI)</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Concentración <span className="text-danger">*</span></label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Forma Farmacéutica</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Seleccione...</option>
                  <option>Tabletas</option>
                  <option>Cápsulas</option>
                  <option>Jarabe</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nº Lote</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Fecha Expiración</label>
                <input type="date" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Registro Sanitario</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">País de Origen</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Seleccione...</option>
                  <option>Honduras</option>
                  <option>El Salvador</option>
                  <option>Guatemala</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Fabricante</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Titular</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Droguería</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Representante Legal</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: Cliente / Ente Externo */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Building className="w-5 h-5 text-primary" /> Paso 3: Cliente / Ente Externo
            </h2>

            <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded px-3 py-2">
              Estos campos aplican para trámites de tipo colaboración o análisis particular. En otros casos, el cliente se deriva del tipo de trámite y el número de recepción.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Tipo de Cliente</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Seleccione...</option>
                  <option>Institucional Público</option>
                  <option>Empresa Privada</option>
                  <option>Persona Natural</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nombre Institución</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nombre Solicitante</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cargo</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Teléfono</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Correo</label>
                <input type="email" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Dirección</label>
                <textarea rows={2} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Persona que Entrega</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Identificación</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>
        )}

        {/* PASO 4: Cantidades */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Hash className="w-5 h-5 text-primary" /> Paso 4: Cantidades
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cantidad-total" className="text-xs font-bold text-slate-700 uppercase">Cantidad Total Muestra Recibida <span className="text-danger">*</span></label>
                <input id="cantidad-total" type="number" step="0.01" min="0" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary font-bold text-lg" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Unidad de Medida <span className="text-danger">*</span></label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Unidades</option>
                  <option>Cajas</option>
                  <option>Blisters</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="cantidad-ffqq" className="text-xs font-bold text-slate-700 uppercase">Cantidad para FFQQ <span className="text-danger">*</span></label>
                <input id="cantidad-ffqq" type="number" step="0.01" min="0" defaultValue="0" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="cantidad-micro" className="text-xs font-bold text-slate-700 uppercase">Cantidad para Microbiología <span className="text-danger">*</span></label>
                <input id="cantidad-micro" type="number" step="0.01" min="0" defaultValue="0" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cantidad Muestroteca</label>
                <input type="number" step="0.01" min="0" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cantidad Devuelta</label>
                <input type="number" step="0.01" min="0" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-2">Condiciones de Almacenamiento</h4>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Condición Almacenamiento</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Temperatura Ambiente</option>
                  <option>Refrigeración (2-8°C)</option>
                  <option>Congelación (-20°C)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Temperatura (°C)</label>
                <input type="number" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Humedad (%)</label>
                <input type="number" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>
        )}

        {/* PASO 5: Referencias Documentales */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <FileText className="w-5 h-5 text-primary" /> Paso 5: Referencias Documentales
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Orden de Compra */}
              <div className="flex flex-col gap-1.5 p-4 border border-slate-200 rounded bg-slate-50">
                <label className="text-xs font-bold text-slate-700 uppercase">Orden de Compra</label>
                <div className="flex gap-2 mt-1">
                  <input type="text" placeholder="Referencia / Número" className="flex-1 h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
                  <button className="bg-white border border-slate-300 hover:bg-slate-100 px-3 rounded text-xs font-bold text-slate-700 transition-colors shadow-sm">
                    Adjuntar
                  </button>
                </div>
              </div>

              {/* Expediente — solo referencia textual, sin adjuntar */}
              <div className="flex flex-col gap-1.5 p-4 border border-slate-200 rounded bg-slate-50" data-testid="expediente-card">
                <label className="text-xs font-bold text-slate-700 uppercase">Nº de Expediente</label>
                <input type="text" placeholder="Número de expediente" className="h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              {/* Licitación */}
              <div className="flex flex-col gap-1.5 p-4 border border-slate-200 rounded bg-slate-50">
                <label className="text-xs font-bold text-slate-700 uppercase">Licitación</label>
                <div className="flex gap-2 mt-1">
                  <input type="text" placeholder="Referencia / Número" className="flex-1 h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
                  <button className="bg-white border border-slate-300 hover:bg-slate-100 px-3 rounded text-xs font-bold text-slate-700 transition-colors shadow-sm">
                    Adjuntar
                  </button>
                </div>
              </div>

              {/* Carta / Oficio con fecha */}
              <div className="flex flex-col gap-2 p-4 border border-slate-200 rounded bg-slate-50">
                <label className="text-xs font-bold text-slate-700 uppercase">Carta / Oficio</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Referencia / Número" className="flex-1 h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
                  <button className="bg-white border border-slate-300 hover:bg-slate-100 px-3 rounded text-xs font-bold text-slate-700 transition-colors shadow-sm">
                    Adjuntar
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="fecha-oficio" className="text-[10px] font-bold text-slate-500 uppercase">Fecha del Oficio/Solicitud</label>
                  <input id="fecha-oficio" type="date" className="h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              {/* Acta Toma de Muestra con fecha */}
              <div className="flex flex-col gap-2 p-4 border border-slate-200 rounded bg-slate-50">
                <label className="text-xs font-bold text-slate-700 uppercase">Acta Toma de Muestra</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Nº Acta" className="flex-1 h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
                  <button className="bg-white border border-slate-300 hover:bg-slate-100 px-3 rounded text-xs font-bold text-slate-700 transition-colors shadow-sm">
                    Adjuntar
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="fecha-acta" className="text-[10px] font-bold text-slate-500 uppercase">Fecha Acta Toma de Muestra</label>
                  <input id="fecha-acta" type="date" className="h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              {/* Contrato */}
              <div className="flex flex-col gap-1.5 p-4 border border-slate-200 rounded bg-slate-50">
                <label className="text-xs font-bold text-slate-700 uppercase">Contrato</label>
                <div className="flex gap-2 mt-1">
                  <input type="text" placeholder="Referencia / Número" className="flex-1 h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
                  <button className="bg-white border border-slate-300 hover:bg-slate-100 px-3 rounded text-xs font-bold text-slate-700 transition-colors shadow-sm">
                    Adjuntar
                  </button>
                </div>
              </div>

              {/* Resolución ARSA */}
              <div className="flex flex-col gap-1.5 p-4 border border-slate-200 rounded bg-slate-50">
                <label className="text-xs font-bold text-slate-700 uppercase">Resolución ARSA</label>
                <div className="flex gap-2 mt-1">
                  <input type="text" placeholder="Referencia / Número" className="flex-1 h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
                  <button className="bg-white border border-slate-300 hover:bg-slate-100 px-3 rounded text-xs font-bold text-slate-700 transition-colors shadow-sm">
                    Adjuntar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PASO 6: Observaciones y Validación */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <ClipboardCheck className="w-5 h-5 text-primary" /> Paso 6: Observaciones y Validación
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Observaciones Generales</label>
                  <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
                </div>

                <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Observaciones Estado Físico Producto</label>
                  <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Requiere Información Adicional</label>
                  <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                    <option>No</option>
                    <option>Sí</option>
                  </select>
                </div>
              </div>

              {/* Tabla dinámica de estándares */}
              <div data-testid="estandares-section" className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-slate-800">Estándares Requeridos</h4>
                  <button
                    type="button"
                    onClick={agregarEstandar}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Agregar Estándar
                  </button>
                </div>

                {estandares.length === 0 ? (
                  <p data-testid="estandares-empty" className="text-xs text-slate-400 italic py-4 text-center bg-slate-50 border border-dashed border-slate-200 rounded">
                    No se han agregado estándares. Haz clic en &quot;Agregar Estándar&quot; si aplica.
                  </p>
                ) : (
                  <div className="border border-slate-200 rounded overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="px-3 py-2 text-left text-xs font-bold text-slate-600 uppercase w-8">#</th>
                          <th className="px-3 py-2 text-left text-xs font-bold text-slate-600 uppercase">Nombre del Estándar</th>
                          <th className="px-3 py-2 text-left text-xs font-bold text-slate-600 uppercase w-28">Cantidad</th>
                          <th className="px-3 py-2 text-left text-xs font-bold text-slate-600 uppercase">Observación</th>
                          <th className="px-3 py-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {estandares.map((e, idx) => (
                          <tr key={e.id} data-testid="estandar-row" className="bg-white hover:bg-slate-50 transition-colors">
                            <td className="px-3 py-2 text-slate-400 text-xs font-bold">{idx + 1}</td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={e.nombre}
                                onChange={(ev) => actualizarEstandar(e.id, "nombre", ev.target.value)}
                                placeholder="Nombre del estándar"
                                data-testid="estandar-nombre"
                                className="w-full h-8 px-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={e.cantidad}
                                onChange={(ev) => actualizarEstandar(e.id, "cantidad", ev.target.value)}
                                placeholder="0"
                                data-testid="estandar-cantidad"
                                className="w-full h-8 px-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={e.observacion}
                                onChange={(ev) => actualizarEstandar(e.id, "observacion", ev.target.value)}
                                placeholder="Observación (opcional)"
                                data-testid="estandar-observacion"
                                className="w-full h-8 px-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <button
                                type="button"
                                onClick={() => quitarEstandar(e.id)}
                                data-testid="estandar-eliminar"
                                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-danger hover:bg-danger/10 rounded transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Checkboxes de confirmación final */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-4">Confirmación Final</h4>
                <div className="space-y-3">
                  {[
                    "Verificación de documentos obligatorios completada.",
                    "Verificación de identidad del solicitante completada.",
                    "Verificación del estado físico de la muestra completada.",
                    "Certifico la veracidad de los datos ingresados en este formulario.",
                  ].map((check, i) => (
                    <label key={i} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded cursor-pointer hover:bg-slate-100 transition-colors">
                      <input type="checkbox" className="mt-0.5 w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary" />
                      <span className="text-sm font-medium text-slate-800">{check}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button className="text-slate-500 hover:text-slate-800 font-bold text-sm flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" /> Guardar Borrador
          </button>
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded font-bold text-sm transition-colors shadow-sm"
              >
                Anterior
              </button>
            )}
            {step < 6 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
              >
                Siguiente <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button className="bg-success hover:bg-green-700 text-white px-8 py-2.5 rounded font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Finalizar y Crear Ingreso
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
