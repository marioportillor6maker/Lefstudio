import { Settings, Users, Database, Shield, Activity, Save, Key, Lock, Globe } from "lucide-react";

export default function AdminPage() {
  const modulos = [
    { titulo: "Gestión de Usuarios y RBAC", icon: Users, desc: "Crear analistas, asignar roles, gestionar permisos de bandejas.", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { titulo: "Catálogos Maestros", icon: Database, desc: "Trámites, clientes, formas farmacéuticas, y tipos de muestras.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    { titulo: "Auxiliares Dinámicos (Plantillas)", icon: Settings, desc: "Constructor de hojas de cálculo de captura (HPLC, UV, Gravimetría).", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
    { titulo: "Auditoría de Sistema y Logs", icon: Shield, desc: "Trazabilidad inmutable de accesos, intentos fallidos y cambios.", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
    { titulo: "Conexión a Equipos (LIMS)", icon: Activity, desc: "Interfaces con Balanzas Analíticas y Cromatógrafos.", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    { titulo: "Configuración Global (Firma)", icon: Key, desc: "Gestión de certificados digitales para Dirección Técnica y General.", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-300" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Administración del Sistema LEF</h1>
          <p className="text-slate-500 text-sm mt-1">Configuración core, catálogos, mantenedores y seguridad (Acceso restringido a IT/SuperAdmin).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {modulos.map((mod, i) => (
            <div key={i} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full">
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 border ${mod.bg} ${mod.color} ${mod.border} group-hover:scale-105 transition-transform`}>
                  <mod.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{mod.titulo}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed flex-grow">{mod.desc}</p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-right">
                 <span className="text-[11px] font-bold text-primary group-hover:underline">Configurar Módulo &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
             <div className="bg-slate-800 px-5 py-3 text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-300" />
                <h3 className="font-bold text-sm">Estado del Entorno</h3>
             </div>
             <div className="p-5 space-y-4 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                   <span className="text-slate-600">Versión del Sistema</span>
                   <span className="font-bold text-slate-900">v2.1.0 (Enterprise)</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                   <span className="text-slate-600">Base de Datos</span>
                   <span className="font-bold text-success flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success"></span> Conectada (14ms)</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                   <span className="text-slate-600">Servicio de Firma (BCH)</span>
                   <span className="font-bold text-orange-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Modo Pruebas</span>
                </div>
                <div className="flex justify-between items-center pb-3">
                   <span className="text-slate-600">Último Backup</span>
                   <span className="font-medium text-slate-900 text-xs">Hoy 03:00 AM (Automático)</span>
                </div>
             </div>
             <div className="px-5 py-3 bg-slate-50 border-t border-slate-200">
                <button className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-md font-medium text-xs transition-colors shadow-sm flex justify-center items-center gap-2">
                  <Save className="w-3.5 h-3.5" /> Forzar Respaldo Manual
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
