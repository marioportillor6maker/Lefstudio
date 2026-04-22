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
  FileText
} from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Inbox, label: "Bandeja Global", href: "/ingresos" },
    { icon: ClipboardCheck, label: "Recepción (RAC)", href: "/rac" },
    { icon: Files, label: "Documentación", href: "/doct" },
    { icon: ShieldCheck, label: "Supervisión STR", href: "/str" },
    { icon: FlaskConical, label: "Físico-Químico", href: "/ffqq" },
    { icon: Microscope, label: "Microbiología", href: "/micro" },
    { icon: ShieldCheck, label: "Calidad STCC", href: "/stcc" },
    { icon: FileText, label: "Dirección Técnica", href: "/dt" },
    { icon: BarChart, label: "Reportes", href: "/reportes" },
    { icon: Settings, label: "Administración", href: "/admin" },
  ];

  return (
    <aside className="w-[240px] bg-primary text-white flex flex-col h-full shadow-lg z-10 shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-primary-dark/50">
        <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center font-bold text-primary">
          CQ
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">LEF System</h1>
          <p className="text-xs text-primary-light">CQFH Oficial</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-1 px-3">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-primary-dark/80 transition-colors text-sm font-medium"
            >
              <item.icon className="w-4 h-4 opacity-80" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-primary-dark/50 text-xs text-primary-light/60">
        Versión 2.0.0 (Enterprise)
      </div>
    </aside>
  );
}
