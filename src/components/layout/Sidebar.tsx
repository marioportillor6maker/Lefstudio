import Link from "next/link";
import { 
  LayoutDashboard, 
  Inbox, 
  Files, 
  FlaskConical, 
  Microscope, 
  ShieldCheck, 
  ClipboardCheck, 
  Settings, 
  BarChart, 
  FileText,
  Activity,
  Award,
  Briefcase
} from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Inbox, label: "Bandeja Global", href: "/ingresos" },
    { icon: Activity, label: "Bitácora Global", href: "/bitacora" },
    { icon: ClipboardCheck, label: "Recepción (RAC)", href: "/rac" },
    { icon: Files, label: "Documentación (DOCT)", href: "/doct" },
    { icon: ShieldCheck, label: "Supervisión STR", href: "/str" },
    { icon: FlaskConical, label: "Físico-Químico", href: "/ffqq" },
    { icon: Microscope, label: "Microbiología", href: "/micro" },
    { icon: ShieldCheck, label: "Calidad STCC", href: "/stcc" },
    { icon: FileText, label: "Dirección Técnica", href: "/dt" },
    { icon: Award, label: "Estándares (RG-44)", href: "/estandares" },
    { icon: Briefcase, label: "Dirección General", href: "/dg" },
    { icon: BarChart, label: "Reportes SLA", href: "/reportes" },
    { icon: Settings, label: "Administración", href: "/admin" },
  ];

  return (
    <aside className="w-[250px] bg-primary text-white flex flex-col h-full shadow-lg z-10 shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-primary-dark/50">
        <div className="w-9 h-9 bg-accent rounded-md flex items-center justify-center font-black text-primary text-lg shadow-sm">
          CQ
        </div>
        <div>
          <h1 className="font-bold text-[15px] leading-tight">LEF System</h1>
          <p className="text-[11px] text-primary-light font-medium tracking-wide">EDICIÓN ENTERPRISE</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="flex flex-col gap-0.5 px-3">
          <div className="text-[10px] font-bold text-primary-light/70 uppercase tracking-wider px-3 mb-2 mt-2">Core Operativo</div>
          {menuItems.slice(0, 3).map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <item.icon className="w-[18px] h-[18px] opacity-80" />
              {item.label}
            </Link>
          ))}
          
          <div className="text-[10px] font-bold text-primary-light/70 uppercase tracking-wider px-3 mb-2 mt-4">Laboratorios y Áreas</div>
          {menuItems.slice(3, 10).map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <item.icon className="w-[18px] h-[18px] opacity-80" />
              {item.label}
            </Link>
          ))}

          <div className="text-[10px] font-bold text-primary-light/70 uppercase tracking-wider px-3 mb-2 mt-4">Gestión y Dirección</div>
          {menuItems.slice(10).map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <item.icon className="w-[18px] h-[18px] opacity-80" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-primary-dark/50 bg-primary-dark/30 flex items-center justify-between">
         <div className="flex flex-col">
            <span className="text-xs font-bold text-white">v2.1.0</span>
            <span className="text-[10px] text-primary-light">Build 8492</span>
         </div>
         <div className="w-2 h-2 rounded-full bg-accent animate-pulse" title="Sistema en línea"></div>
      </div>
    </aside>
  );
}
