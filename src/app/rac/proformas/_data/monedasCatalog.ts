import type { Moneda, MonedaCatalog } from "../_types/proforma.types";

// Catálogo de monedas aceptadas por el LEF.
// PENDIENTE ADMIN: mover a configuración global cuando exista el backend de administración.
// Para agregar una nueva moneda: añadir entrada aquí; la UI la renderiza automáticamente.
export const MONEDAS_CATALOG: ReadonlyArray<MonedaCatalog> = [
  { code: "L",  label: "Lempiras", symbol: "L.",   nombreLetras: "LEMPIRAS", slug: "lempiras" },
  { code: "$",  label: "Dólares",  symbol: "US$",  nombreLetras: "DÓLARES",  slug: "dolares"  },
] as const;

export function getMoneda(code: Moneda): MonedaCatalog {
  const m = MONEDAS_CATALOG.find(m => m.code === code);
  if (!m) throw new Error(`Moneda no registrada en catálogo: ${code}`);
  return m;
}
