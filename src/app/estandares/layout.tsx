import { EstandaresNav } from './_components/EstandaresNav';

export default function EstandaresLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white px-6 pt-5 pb-0 shrink-0">
        <p className="text-xs text-slate-400 mb-1">SistemaLEF › Gestión de Estándares</p>
        <h1 className="text-xl font-bold text-slate-800 mb-3">Gestión de Estándares de Referencia</h1>
        <EstandaresNav />
      </div>
      <div className="flex-1 p-6 bg-slate-50 overflow-auto">
        {children}
      </div>
    </div>
  );
}
