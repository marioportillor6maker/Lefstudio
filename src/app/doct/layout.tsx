import { DoctNav } from './_components/DoctNav';

export default function DoctLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0">
        <p className="text-xs text-slate-400 mb-0.5">SistemaLEF › Documentación (DOCT)</p>
        <h1 className="text-xl font-bold text-slate-800">Módulo de Documentación — DOCT</h1>
      </div>
      {/* Tab nav */}
      <DoctNav />
      {/* Content */}
      <div className="flex-1 p-6 bg-slate-50 overflow-auto">
        {children}
      </div>
    </div>
  );
}
