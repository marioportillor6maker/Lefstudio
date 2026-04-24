"use client";

import { Bell, Search, HelpCircle, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  
  // Lógica simple para breadcrumbs y título
  const pathSegments = pathname?.split('/').filter(Boolean) || [];
  const currentSection = pathSegments.length > 0 
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1) 
    : "Inicio";
  
  const screenTitle = currentSection === "Inicio" 
    ? "Panel Principal — Q.F. María Rodríguez" 
    : `Bandeja ${currentSection}`;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-6 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center text-[10px] text-slate-500 font-medium mb-0.5">
            <span>SistemaLEF</span>
            <ChevronRight className="w-3 h-3 mx-1 opacity-70" />
            <span className="text-primary">{currentSection}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 leading-tight">{screenTitle}</h2>
        </div>

        <div className="relative w-96 hidden lg:block ml-8">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex items-center gap-1 bg-slate-100 border border-slate-200 rounded px-1.5 text-[10px] font-medium text-slate-500">
              Ctrl+K
            </kbd>
          </div>
          <input 
            type="text" 
            placeholder="Buscar ingreso, producto, lote..." 
            className="w-full pl-9 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
          title="Ayuda"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        
        <button 
          className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
          title="Notificaciones"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-danger border border-white text-[8px] font-bold text-white">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
