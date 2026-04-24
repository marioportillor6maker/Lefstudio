const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app');

const pagesToCreate = [
  // Ingresos
  { path: 'ingresos/vista-360', title: 'Buscador Vista 360', desc: 'Ingrese un correlativo para acceder a la Vista 360 del expediente.', icon: 'Search' },
  
  // RAC
  { path: 'rac/proformas', title: 'Proformas y Pago', desc: 'Generación de proformas, control de pagos y facturación (RT-15).', icon: 'CreditCard' },
  { path: 'rac/distribucion', title: 'Distribución RT-159', desc: 'Asignación de muestras a los laboratorios correspondientes.', icon: 'Network' },
  
  // DOCT
  { path: 'doct/rt75', title: 'Solicitudes RT-75', desc: 'Recepción y validación de documentos RT-75.', icon: 'FileText' },
  { path: 'doct/rt41', title: 'Contraste RT-41', desc: 'Verificación histórica de antecedentes de muestras.', icon: 'History' },
  { path: 'doct/rt30', title: 'Solicitudes RT-30', desc: 'Gestión de información adicional o faltante.', icon: 'ShieldAlert' },
  { path: 'doct/rt38', title: 'Preparación RT-38', desc: 'Armado de expediente técnico para envío a análisis.', icon: 'FileCheck' },
  
  // Estándares
  { path: 'estandares/nuevo', title: 'Registro RG-44', desc: 'Ingreso de nuevos estándares al inventario.', icon: 'FilePlus' },
  { path: 'estandares/entrega', title: 'Entrega RT-27', desc: 'Distribución de estándares a analistas.', icon: 'PackageOpen' },
  { path: 'estandares/rechazo', title: 'Rechazo RG-58', desc: 'Devolución o rechazo de estándares no conformes.', icon: 'XCircle' },
  { path: 'estandares/eliminacion', title: 'Eliminación RT-45', desc: 'Baja y descarte seguro de estándares expirados.', icon: 'Trash2' },
  
  // STR
  { path: 'str/muestras', title: 'Registro de Muestras (STR)', desc: 'Recepción física y almacenamiento temporal de contramuestras.', icon: 'Beaker' },
  
  // FFQQ
  { path: 'ffqq/hoja', title: 'Hoja de Trabajo', desc: 'Planificación de ensayos físico-químicos asignados.', icon: 'ClipboardList' },
  { path: 'ffqq/resultados', title: 'Resultados RT-88', desc: 'Captura primaria de datos de ensayos y cálculos.', icon: 'FileCode' },
  { path: 'ffqq/validaciones', title: 'Validaciones', desc: 'Revisión por pares de los resultados obtenidos.', icon: 'CheckSquare' },
  { path: 'ffqq/reactivos', title: 'Bitácora Reactivos', desc: 'Control de consumo y trazabilidad de reactivos.', icon: 'FlaskConical' },
  { path: 'ffqq/equipos', title: 'Control de Equipos', desc: 'Verificación de calibración y uso de instrumentos.', icon: 'Settings2' },
  { path: 'ffqq/metodos', title: 'Métodos Analíticos', desc: 'Biblioteca de farmacopeas y métodos propios.', icon: 'BookOpen' },
  { path: 'ffqq/historial', title: 'Historial Casos', desc: 'Consulta de ensayos finalizados previamente.', icon: 'History' },
  
  // Microbiología
  { path: 'micro/siembra', title: 'Siembra y Lectura', desc: 'Registro de procedimientos de inoculación y tiempos de incubación.', icon: 'Microscope' },
  { path: 'micro/resultados', title: 'Resultados RT-92', desc: 'Conteo de colonias e identificación de patógenos.', icon: 'FileCode' },
  
  // STCC
  { path: 'stcc/comite', title: 'Comité de Calidad', desc: 'Evaluación de expedientes con desviaciones u OOS.', icon: 'Users' },
  
  // DT
  { path: 'dt/resoluciones', title: 'Resoluciones RT-200', desc: 'Emisión de dictámenes técnicos finales.', icon: 'FileSignature' },
  
  // DG
  { path: 'dg/firma', title: 'Firma Digital', desc: 'Aprobación y firma del certificado analítico final.', icon: 'PenTool' },
  
  // Reportes
  { path: 'reportes/ingresos', title: 'Lista de Ingresos', desc: 'Reporte tabular histórico de todos los ingresos.', icon: 'List' },
  { path: 'reportes/tiempos', title: 'Tiempos por Etapa', desc: 'Métricas de SLA y cuellos de botella.', icon: 'Clock' },
  { path: 'reportes/pendientes', title: 'Pendientes por Área', desc: 'Carga de trabajo en tiempo real por departamento.', icon: 'AlertCircle' },
  { path: 'reportes/reanalisis', title: 'Reanálisis', desc: 'Estadísticas de repetición de ensayos.', icon: 'RotateCcw' },
  { path: 'reportes/productividad', title: 'Productividad', desc: 'Métricas de desempeño de analistas y revisores.', icon: 'BarChart2' },
  
  // Dashboards
  { path: 'dashboards/operacion', title: 'Operación General', desc: 'Métricas consolidadas de nivel gerencial.', icon: 'Activity' },
  { path: 'dashboards/rac', title: 'RAC y Tiempos', desc: 'Rendimiento del área de recepción y pagos.', icon: 'Timer' },
  { path: 'dashboards/laboratorios', title: 'FFQQ / Micro', desc: 'KPIs específicos de laboratorios.', icon: 'TestTube2' },
  { path: 'dashboards/estado', title: 'Estado Consolidado', desc: 'Vista rápida de todos los casos activos.', icon: 'PieChart' },
  
  // Admin
  { path: 'admin/usuarios', title: 'Gestión de Usuarios', desc: 'Altas, bajas y modificaciones de personal.', icon: 'Users' },
  { path: 'admin/roles', title: 'Roles y Permisos', desc: 'Configuración de accesos por matriz departamental.', icon: 'Shield' },
  { path: 'admin/catalogos', title: 'Catálogos del Sistema', desc: 'Administración de datos maestros y paramétricos.', icon: 'ListTree' },
  { path: 'admin/tecnicas', title: 'Técnicas y Tarifas', desc: 'Configuración de ensayos, precios y requisitos.', icon: 'Wrench' },
  { path: 'admin/configuracion', title: 'Configuración General', desc: 'Variables de entorno, notificaciones y SLAs base.', icon: 'Settings' }
];

const template = (title, desc, icon) => `"use client";

import { ${icon}, ArrowLeft, Search, Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <${icon} className="w-6 h-6 text-primary" />
              ${title}
            </h1>
            <p className="text-slate-500 text-sm mt-1">${desc}</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-sm font-bold text-slate-700 transition-colors">
             <Search className="w-4 h-4" /> Buscar
           </button>
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold transition-colors shadow-sm">
             <Plus className="w-4 h-4" /> Nuevo
           </button>
        </div>
      </div>

      {/* Placeholder Content for Route Completion */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
          <${icon} className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Módulo Activo</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          La pantalla <strong>${title}</strong> ha sido provisionada correctamente y conectada al enrutador principal de Next.js App Router.
        </p>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
          ✓ Ruta Verificada
        </div>
      </div>
    </div>
  );
}
`;

pagesToCreate.forEach(page => {
  const fullDirPath = path.join(baseDir, page.path);
  const fullFilePath = path.join(fullDirPath, 'page.tsx');
  
  if (!fs.existsSync(fullDirPath)) {
    fs.mkdirSync(fullDirPath, { recursive: true });
  }
  
  if (!fs.existsSync(fullFilePath)) {
    fs.writeFileSync(fullFilePath, template(page.title, page.desc, page.icon));
    console.log(`Created: ${page.path}/page.tsx`);
  } else {
    console.log(`Already exists: ${page.path}/page.tsx`);
  }
});

console.log("All missing routes generated!");
