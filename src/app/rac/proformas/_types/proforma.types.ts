// ─── Proforma types — RAC module ─────────────────────────────────────────────
//
// DECISIONES FUNCIONALES PENDIENTES (validar con el cliente):
//   1. nroOficio: se deja opcional. Confirmar si debe ser obligatorio.
//   2. nroOrdenARSA: se deja opcional. Confirmar si aplica solo para trámites ARSA.
//   3. ISV: se usa 15% (Ley del ISV Honduras). Confirmar si análisis de laboratorio
//      están gravados o exentos según clasificación fiscal del LEF.
//   4. fechaEmision: DEBE venir del servidor (no editable). Actualmente se genera
//      en el cliente como mock. Reemplazar con respuesta del endpoint de creación.
//   5. Selector de recepción: implementado como autocomplete (búsqueda por ID,
//      producto, cliente). PREGUNTAR AL CLIENTE si la búsqueda es suficiente o
//      requiere un modal de búsqueda avanzada con más filtros (fecha, estado, área).

export type TipoAnalisis = "completo" | "parcial" | "micro";
export type Moneda = "L" | "$";
export type MetodoPago = "transferencia" | "deposito" | "tgr";
export type EstadoProforma = "Pendiente" | "Pagado" | "Vencido";

export interface ProformaGenerada {
  id: string;
  recepcionId: string;
  producto: string;
  cliente: string;
  tipoAnalisis: TipoAnalisis;
  moneda: Moneda;
  precioBase: number;
  isv: number;
  total: number;
  totalLetras: string;
  // Fecha de emisión asignada por el servidor — NO editable por el usuario.
  // PENDIENTE BACKEND: reemplazar con valor que devuelva el endpoint de creación.
  fechaEmision: string;
  plazoDias: number;
  fechaLimite: string;
  metodoPago: MetodoPago;
  nroOficio?: string;      // opcional — confirmar obligatoriedad con el cliente
  nroOrdenARSA?: string;   // opcional — solo para trámites ARSA, confirmar con cliente
  observaciones?: string;
  estado: EstadoProforma;
}

export interface FormErrors {
  recepcion?: string;
  tipoAnalisis?: string;
  precio?: string;
}
