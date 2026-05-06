"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Inbox, Files, FlaskConical, Microscope, ShieldCheck, ClipboardCheck,
  Settings, BarChart, FileText, Activity, ChevronDown, ChevronRight,
  LogOut, Menu, Home, FileBox, ListTodo, TrendingUp, FileSignature
} from "lucide-react";

export function Sidebar() {
  const [expanded, setExpanded] = useState<string | null>("ingresos");
  const [collapsed, setCollapsed] = useState(false);

  const toggleExpand = (id: string) => {
    if (collapsed) setCollapsed(false);
    setExpanded(expanded === id ? null : id);
  };

  const menuSections = [
    {
      title: "PRINCIPAL",
      items: [
        { id: "inicio", icon: Home, label: "Inicio", href: "/" },
        {
          id: "ingresos", icon: Inbox, label: "Ingresos",
          subItems: [
            { label: "Bandeja General", href: "/ingresos" },
            { label: "Vista 360",       href: "/ingresos/vista-360" },
            { label: "Crear Ingreso",   href: "/rac/nuevo" }
          ]
        }
      ]
    },
    {
      title: "MODULOS OPERATIVOS",
      items: [
        {
          id: "rac", icon: ClipboardCheck, label: "RAC",
          subItems: [
            { label: "Bandeja RAC",       href: "/rac" },
            { label: "Nuevo Ingreso",     href: "/rac/nuevo" },
            { label: "Proformas y Pago",  href: "/rac/proformas" },
            { label: "Distribucion RT-159", href: "/rac/distribucion" }
          ]
        },
        {
          id: "doct", icon: Files, label: "Documentacion",
          subItems: [
            { label: "Bandeja DOCT",      href: "/doct" },
            { label: "Solicitudes RT-75", href: "/doct/rt75" },
            { label: "Contraste RT-41",   href: "/doct/rt41" },
            { label: "Solicitudes RT-30", href: "/doct/rt30" },
            { label: "Preparación RT-38", href: "/doct/rt38" },
            { label: "Control Expediente",href: "/doct/control" }
          ]
        },
        {
          id: "est", icon: FileBox, label: "Estandares",
          subItems: [
            { label: "Bandeja Estandares",  href: "/estandares" },
            { label: "Registro RG-44",      href: "/estandares/nuevo" },
            { label: "Entrega RT-27",       href: "/estandares/entrega" },
            { label: "Rechazo RG-58",       href: "/estandares/rechazo" },
            { label: "Eliminacion RT-45",   href: "/estandares/eliminacion" }
          ]
        },
        {
          id: "str", icon: ListTodo, label: "STR",
          subItems: [
            { label: "Bandeja STR",          href: "/str" },
            { label: "Revision Documental",  href: "/str/revision" },
            { label: "Asignaciones RT-40",   href: "/str/asignaciones" },
            { label: "Devoluciones",         href: "/str/devoluciones" },
            { label: "Control Pre-Analisis", href: "/str/preanalisis" }
          ]
        },
        {
          id: "ffqq", icon: FlaskConical, label: "FFQQ",
          subItems: [
            { label: "Bandeja FFQQ",       href: "/ffqq" },
            { label: "Hoja de Trabajo",    href: "/ffqq/hoja" },
            { label: "Resultados RT-88",   href: "/ffqq/resultados" },
            { label: "Validaciones",       href: "/ffqq/validaciones" },
            { label: "Bitacora Reactivos", href: "/ffqq/reactivos" },
            { label: "Control de Equipos", href: "/ffqq/equipos" },
            { label: "Metodos Analiticos", href: "/ffqq/metodos" },
            { label: "Historial Casos",    href: "/ffqq/historial" }
          ]
        },
        {
          id: "micro", icon: Microscope, label: "Microbiologia",
          subItems: [
            { label: "Bandeja MICRO",    href: "/micro" },
            { label: "Siembra y Lectura",href: "/micro/siembra" },
            { label: "Resultados RT-92", href: "/micro/resultados" }
          ]
        },
        {
          id: "stcc", icon: ShieldCheck, label: "STCC",
          subItems: [
            { label: "Bandeja STCC",        href: "/stcc" },
            { label: "Comite de Calidad",   href: "/stcc/comite" }
          ]
        }
      ]
    },
    {
      title: "DIRECCION",
      items: [
        {
          id: "dt", icon: FileText, label: "Direccion Tecnica",
          subItems: [
            { label: "Bandeja DT",          href: "/dt" },
            { label: "Resoluciones RT-200", href: "/dt/resoluciones" }
          ]
        },
        {
          id: "dg", icon: FileSignature, label: "Direccion General",
          subItems: [
            { label: "Firma Digital", href: "/dg/firma" }
          ]
        }
      ]
    },
    {
      title: "INTELIGENCIA",
      items: [
        {
          id: "reportes", icon: BarChart, label: "Reportes",
          subItems: [
            { label: "Ingresos",            href: "/reportes?tab=ingresos"      },
            { label: "Tiempos por Etapa",   href: "/reportes?tab=tiempos"       },
            { label: "Pendientes por Area", href: "/reportes?tab=pendientes"    },
            { label: "Reanalisis",          href: "/reportes?tab=reanalisis"    },
            { label: "Estandares",          href: "/reportes?tab=estandares"    },
            { label: "Devoluciones",        href: "/reportes?tab=devoluciones"  },
            { label: "Carga Analista",      href: "/reportes?tab=carga"         },
            { label: "Productividad",       href: "/reportes?tab=productividad" }
          ]
        },
        {
          id: "dashboards", icon: TrendingUp, label: "Dashboards",
          subItems: [
            { label: "Operacion General",  href: "/dashboards?tab=operacion"    },
            { label: "RAC y Tiempos",      href: "/dashboards?tab=rac"          },
            { label: "DOCT y Pendientes",  href: "/dashboards?tab=doct"         },
            { label: "FFQQ / Micro",       href: "/dashboards?tab=laboratorios" },
            { label: "STCC / DT / DG",     href: "/dashboards?tab=stcc"         },
            { label: "Estado Consolidado", href: "/dashboards?tab=estado"       }
          ]
        }
      ]
    },
    {
      title: "SISTEMA",
      items: [
        {
          id: "admin", icon: Settings, label: "Administracion",
          subItems: [
            { label: "Usuarios",         href: "/admin?tab=usuarios"      },
            { label: "Roles y Permisos", href: "/admin?tab=roles"         },
            { label: "Catalogos",        href: "/admin?tab=catalogos"     },
            { label: "Tecnicas",         href: "/admin?tab=tecnicas"      },
            { label: "Configuracion",    href: "/admin?tab=configuracion" }
          ]
        },
        { id: "bitacora", icon: Activity, label: "Bitacora / Auditoria", href: "/bitacora" }
      ]
    }
  ];

  return (
    <aside className={`bg-primary text-white flex flex-col h-full shadow-lg z-10 shrink-0 transition-all duration-300 ${collapsed ? "w-[70px]" : "w-[260px]"}`}>
      <div className="p-4 flex items-center justify-between border-b border-primary-dark/50 min-h-[70px]">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent rounded-md flex items-center justify-center font-black text-primary text-lg shadow-sm shrink-0">CQ</div>
            <div className="overflow-hidden">
              <h1 className="font-bold text-[14px] leading-tight truncate">SistemaLEF CQFH Honduras</h1>
              <p className="text-[10px] text-primary-light font-medium tracking-wide truncate">EDICION ENTERPRISE</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-9 h-9 bg-accent rounded-md flex items-center justify-center font-black text-primary text-lg shadow-sm shrink-0 mx-auto">CQ</div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className={`p-1.5 hover:bg-white/10 rounded text-primary-light ${collapsed ? "mx-auto mt-4" : ""}`}>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="flex flex-col gap-1 px-2">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="mb-4">
              {!collapsed && (
                <div className="text-[10px] font-bold text-primary-light/70 uppercase tracking-wider px-3 mb-2 mt-2">{section.title}</div>
              )}
              {section.items.map((item) => (
                <div key={item.id} className="flex flex-col mb-0.5">
                  {"subItems" in item ? (
                    <>
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium w-full ${expanded === item.id ? "bg-white/10 text-white" : "hover:bg-white/5 text-slate-100"}`}
                        title={collapsed ? item.label : ""}
                      >
                        <item.icon className={`w-[18px] h-[18px] shrink-0 ${expanded === item.id ? "text-accent" : "opacity-80"}`} />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            {expanded === item.id
                              ? <ChevronDown className="w-4 h-4 opacity-50" />
                              : <ChevronRight className="w-4 h-4 opacity-50" />
                            }
                          </>
                        )}
                      </button>
                      {!collapsed && expanded === item.id && (
                        <div className="ml-9 mt-1 flex flex-col gap-1 border-l border-white/10 pl-2">
                          {item.subItems?.map((sub, idx) => (
                            <Link key={idx} href={sub.href} className="text-xs text-slate-300 hover:text-white py-1.5 px-2 rounded hover:bg-white/5 transition-colors">
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={(item as { id: string; icon: React.ElementType; label: string; href: string }).href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-white/5 transition-colors text-sm font-medium text-slate-100"
                      title={collapsed ? item.label : ""}
                    >
                      <item.icon className="w-[18px] h-[18px] shrink-0 opacity-80" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-primary-dark/50 bg-primary-dark/30 flex items-center justify-between">
        {!collapsed ? (
          <>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center shrink-0">MR</div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-white truncate">Q.F. Maria Rodriguez</span>
                <span className="text-[10px] text-primary-light truncate">RAC - Recepcion</span>
              </div>
            </div>
            <button className="p-1.5 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors" title="Cerrar sesion">
              <LogOut className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="mx-auto flex flex-col gap-4">
            <div className="w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center shrink-0" title="Q.F. Maria Rodriguez">MR</div>
            <button className="p-1.5 hover:bg-white/10 rounded-md text-slate-300 hover:text-white transition-colors mx-auto" title="Cerrar sesion">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
