import { ArrowLeft, Printer, Download } from "lucide-react";
import Link from "next/link";

export default function VisorDocumentoPage({ params }: { params: { tipo: string, id: string } }) {
  const isRG41 = params.tipo.toUpperCase() === "RG-41";
  const titulo = isRG41 ? "RG-41: Solicitud de Análisis" : `${params.tipo.toUpperCase()}: Vista Previa`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/ingresos/${params.id}`} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{titulo}</h1>
            <p className="text-slate-500 text-sm mt-1">Generado automáticamente desde la entidad Ingreso {params.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> PDF
          </button>
          <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
            <Printer className="w-4 h-4" /> Imprimir Oficial
          </button>
        </div>
      </div>

      {/* Renderizado simulado de hoja A4 */}
      <div className="bg-white w-full max-w-[800px] mx-auto min-h-[1131px] shadow-lg border border-slate-200 p-12 text-slate-800">
        <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4 mb-8">
          <div>
            <h2 className="text-xl font-bold font-serif uppercase">Colegio de Químico-Farmacéuticos de Honduras</h2>
            <p className="text-sm">Laboratorio de Especialidades Farmacéuticas (LEF)</p>
          </div>
          <div className="text-right border border-slate-400 p-2">
            <p className="font-bold">{params.tipo.toUpperCase()}</p>
            <p className="text-xs">Revisión: 04</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-center font-bold text-lg underline uppercase">{titulo}</h3>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm mt-8">
            <div className="border-b border-slate-300 pb-1">
              <span className="font-bold">N° Recepción:</span> {params.id}
            </div>
            <div className="border-b border-slate-300 pb-1">
              <span className="font-bold">Fecha:</span> {new Date().toLocaleDateString('es-HN')}
            </div>
            <div className="col-span-2 border-b border-slate-300 pb-1">
              <span className="font-bold">Cliente/Institución:</span> Laboratorios Industriales S.A.
            </div>
            <div className="col-span-2 border-b border-slate-300 pb-1">
              <span className="font-bold">Producto:</span> Paracetamol 500mg (Tableta)
            </div>
            <div className="border-b border-slate-300 pb-1">
              <span className="font-bold">Lote:</span> L-847291
            </div>
            <div className="border-b border-slate-300 pb-1">
              <span className="font-bold">Vencimiento:</span> 2026-12
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-slate-300">
            <p className="text-xs italic text-center text-slate-500">
              Este documento fue autogenerado por el Sistema Integrado LEF. Firmas electrónicas adjuntas en la bitácora de auditoría.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
