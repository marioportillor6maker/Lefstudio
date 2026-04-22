export const mockIngreso360 = {
  id: "REC-2024-1020",
  estado: "Pendiente Estándar",
  tramite: "Registro Sanitario (ARSA)",
  urgencia: "Normal",
  cliente: "Laboratorios Industriales S.A.",
  producto: {
    nombreComercial: "Paracetamol 500mg",
    formaFarmaceutica: "Tableta",
    lote: "L-847291",
    vencimiento: "2026-12",
    registroSanitario: "HN-M-10293",
    fabricante: "PharmaCorp",
    titular: "Laboratorios Industriales S.A.",
  },
  muestras: {
    cantidadRecibida: "120 Tabletas",
    distribucion: [
      { area: "FFQQ", cantidad: "60 Tabletas", estado: "Entregado" },
      { area: "Microbiología", cantidad: "40 Tabletas", estado: "Entregado" },
      { area: "Retención", cantidad: "20 Tabletas", estado: "Almacenado" }
    ]
  },
  timeline: [
    { fecha: "12/04/2024 09:00", actor: "Aracely Sevilla (RAC)", accion: "Ingreso Registrado" },
    { fecha: "12/04/2024 10:30", actor: "Aracely Sevilla (RAC)", accion: "Pago Confirmado" },
    { fecha: "13/04/2024 08:15", actor: "Edil Ballesteros (DOCT)", accion: "Distribuido a DOCT y Micro" },
    { fecha: "13/04/2024 11:00", actor: "Edil Ballesteros (DOCT)", accion: "Estado cambiado a Pendiente Estándar" },
    { fecha: "13/04/2024 11:05", actor: "Edil Ballesteros (DOCT)", accion: "Generó RT-30" },
  ],
  documentos: [
    { nombre: "RG-13_REC-1020.pdf", tipo: "Orden Recepción", fecha: "12/04/2024", estado: "Emitido" },
    { nombre: "RT-159_REC-1020.pdf", tipo: "Distribución", fecha: "13/04/2024", estado: "Firmado" },
    { nombre: "RT-30_REC-1020.pdf", tipo: "Sol. Estándar", fecha: "13/04/2024", estado: "Emitido" },
  ],
  ensayosAsignados: [
    { ensayo: "Identificación por HPLC", estado: "Pendiente", analista: "-" },
    { ensayo: "Valoración de Principio Activo", estado: "Pendiente", analista: "-" },
    { ensayo: "Disolución", estado: "Pendiente", analista: "-" },
    { ensayo: "Uniformidad de Peso", estado: "Completado", analista: "J. Pérez", resultado: "Cumple" }
  ],
  observaciones: [
    { autor: "Edil Ballesteros", area: "DOCT", texto: "Falta estándar de referencia primario USP. Se solicitó mediante RT-30 al cliente." }
  ]
};
