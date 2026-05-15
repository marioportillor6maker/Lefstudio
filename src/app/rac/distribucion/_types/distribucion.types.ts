// ─── RT-159 Distribución types ────────────────────────────────────────────────
//
// DECISIONES FUNCIONALES PENDIENTES (validar con el cliente):
//   1. id del RT: se genera en servidor. El frontend no lo asigna.
//   2. fechaDistribucion: viene del servidor al emitir. No editable.
//   3. responsableEmision: viene del usuario autenticado en sesión.
//   4. Un RT-159 puede agrupar varias recepciones RAC.
//   5. No se permite duplicar la misma recepción en un mismo RT.
//   6. fechaRecibido por área: se registra al recibir (servidor). Pendiente en frontend.
//   7. La suma de cantidades distribuidas no debería exceder cantidadIngresadaRAC.
//      Esta validación queda como WARNING funcional pendiente de confirmar con cliente.

export type UnidadMedida =
  | "frascos" | "pastillas" | "viales" | "ampollas" | "cajas"
  | "tabletas" | "cápsulas" | "unidades" | "ml" | "g" | "mg";

export interface AreaRow {
  id: string;
  name: string;
  cantidad: string;
  unidad: UnidadMedida | "";
  responsable: string;
}

export interface DistribucionPorArea {
  area: string;
  areaId: string;
  cantidad: number;
  unidad: UnidadMedida;
  responsable: string;
  // PENDIENTE BACKEND: se registrará cuando el área confirme recepción de la muestra.
  fechaRecibido: string | null;
}

export interface DistribucionRecepcion {
  recepcionId: string;
  producto: string;
  cantidadIngresadaRAC: number;
  unidadRAC: string;
  observaciones: string;
  distribucionPorArea: DistribucionPorArea[];
}

// Payload final del RT-159 (enviado al backend al emitir)
// PENDIENTE BACKEND: el servidor asignará id, fechaDistribucion y responsableEmision.
export interface RT159Payload {
  id: null;
  formato: "RT-159";
  fechaDistribucion: null;
  responsableEmision: string;
  distribuciones: DistribucionRecepcion[];
}

export interface FormErrors {
  recepcion?: string;
  areas?: string;
}
