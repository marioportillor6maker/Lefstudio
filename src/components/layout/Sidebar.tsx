"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox, Files, FlaskConical, Microscope, ShieldCheck, ClipboardCheck,
  Settings, BarChart, FileText, Activity, ChevronDown, ChevronRight,
  LogOut, Menu, Home, FileBox, ListTodo, TrendingUp, FileSignature, Leaf,
} from "lucide-react";
import { MENU_SECTIONS_DATA } from "@/lib/sidebar-menu";

const ICON_MAP: Record<string, React.ElementType> = {
  inicio:     Home,
  ingresos:   Inbox,
  rac:        ClipboardCheck,
  doct:       Files,
  est:        FileBox,
  str:        ListTodo,
  ffqq:       FlaskConical,
  micro:      Microscope,
  stcc:       ShieldCheck,
  dt:         FileText,
  dg:         FileSignature,
  reportes:   BarChart,
  dashboards: TrendingUp,
  admin:      Settings,
  bitacora:   Activity,
};

export function Sidebar() {
  const [expanded, setExpanded] = useState<string | null>("ingresos");
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleExpand = (id: string) => {
    if (collapsed) setCollapsed(false);
    setExpanded(expanded === id ? null : id);
  };

  const activeRoot = pathname?.split("/").filter(Boolean)[0] ?? "";

  return (
    <aside className={`bg-primary text-white flex flex-col h-full shadow-lg z-10 shrink-0 transition-all duration-300 ${collapsed ? "w-[70px]" : "w-[220px]"}`}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-white/5 min-h-[64px]">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-primary-dark" />
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-[13px] leading-tight truncate text-white">SistemaLEF</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">CQFH Honduras</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center mx-auto">
            <Leaf className="w-4 h-4 text-primary-dark" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors ${collapsed ? "mx-auto mt-3" : ""}`}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        <nav className="flex flex-col gap-0.5 px-2">
          {MENU_SECTIONS_DATA.map((section, sIdx) => (
            <div key={sIdx} className="mb-3">
              {!collapsed && (
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-1.5 mt-1">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = ICON_MAP[item.id] ?? Home;
                const isActive = item.id === activeRoot || (item.subItems?.some(s => pathname?.startsWith(s.href)) ?? false);
                const isExpanded = expanded === item.id;
                // badge: explicit override OR auto-count from subItems
                const displayBadge = item.badge ?? item.subItems?.length;

                return (
                  <div key={item.id} className="flex flex-col">
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleExpand(item.id)}
                          title={collapsed ? item.label : ""}
                          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors text-[13px] font-medium w-full ${
                            isActive || isExpanded
                              ? "bg-white/10 text-white"
                              : "hover:bg-white/5 text-slate-300"
                          }`}
                        >
                          <Icon className={`w-[17px] h-[17px] shrink-0 ${isActive || isExpanded ? "text-accent" : "opacity-60"}`} />
                          {!collapsed && (
                            <>
                              <span className="flex-1 text-left truncate">{item.label}</span>
                              {displayBadge != null && (
                                <span className="text-[10px] font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded-full leading-none">
                                  {displayBadge}
                                </span>
                              )}
                              {isExpanded
                                ? <ChevronDown className="w-3.5 h-3.5 opacity-40 shrink-0" />
                                : <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                              }
                            </>
                          )}
                        </button>
                        {!collapsed && isExpanded && (
                          <div className="ml-8 mt-0.5 flex flex-col border-l border-white/8 pl-2">
                            {item.subItems.map((sub, idx) => (
                              <Link
                                key={idx}
                                href={sub.href}
                                className={`text-[12px] py-1.5 px-2 rounded transition-colors ${
                                  pathname === sub.href
                                    ? "text-white bg-white/8 font-medium"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href ?? "/"}
                        title={collapsed ? item.label : ""}
                        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors text-[13px] font-medium ${
                          isActive ? "bg-white/10 text-white" : "hover:bg-white/5 text-slate-300"
                        }`}
                      >
                        <Icon className={`w-[17px] h-[17px] shrink-0 ${isActive ? "text-accent" : "opacity-60"}`} />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* User footer */}
      <div className="p-3 border-t border-white/5 bg-black/20 flex items-center justify-between">
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-accent text-primary-dark font-bold flex items-center justify-center shrink-0 text-[11px]">MR</div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[12px] font-semibold text-white truncate">Q.F. María Rodríguez</span>
                <span className="text-[10px] text-slate-400 truncate">RAC — Recepción</span>
              </div>
            </div>
            <button className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors shrink-0" title="Cerrar sesión">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <div className="mx-auto flex flex-col items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-accent text-primary-dark font-bold flex items-center justify-center text-[11px]" title="Q.F. María Rodríguez">MR</div>
            <button className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors" title="Cerrar sesión">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
