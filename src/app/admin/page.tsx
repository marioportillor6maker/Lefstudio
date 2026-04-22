import { Settings, Users, Database, Shield } from "lucide-react";

export default function AdminPage() {
  const modulos = [
    { titulo: "Gestión de Usuarios", icon: Users, desc: "Crear analistas, directores y asignar roles RBAC." },
    { titulo: "Catálogos Maestros", icon: Database, desc: "Formas farmacéuticas, clientes, trámites y técnicas." },
    { titulo: "Auxiliares Dinámicos", icon: Settings, desc: "Constructor de plantillas de captura para ensayos (HPLC, UV)." },
    { titulo: "Auditoría de Sistema", icon: Shield, desc: "Log de seguridad e intentos de acceso." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Administración del Sistema</h1>
        <p className="text-slate-500 text-sm mt-1">Configuración global, mantenedores y seguridad (Solo acceso IT/SuperAdmin).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modulos.map((mod, i) => (
          <div key={i} className="bg-white p-6 rounded-md border border-slate-200 shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <mod.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800">{mod.titulo}</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{mod.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
