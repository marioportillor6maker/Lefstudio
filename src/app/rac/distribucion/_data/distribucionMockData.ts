// PENDIENTE BACKEND: reemplazar con llamada a API REST.
// cantidadIngresadaRAC y unidadRAC deben venir del servidor al seleccionar recepción.

export interface RecepcionRAC {
  id: string;
  producto: string;
  formaFarmaceutica: string;
  lote: string;
  cliente: string;
  cantidadIngresadaRAC: number;
  unidadRAC: string;
}

// IDs alineados con incomeMockData.ts y Bandeja DOCT (LEF-2024-00XXX)
export const MOCK_RECEPCIONES_RAC: RecepcionRAC[] = [
  {
    id: "LEF-2024-00143",
    producto: "Metformina 850mg Tabletas",
    formaFarmaceutica: "Tableta",
    lote: "L-993021",
    cliente: "MedFarma S.R.L.",
    cantidadIngresadaRAC: 120,
    unidadRAC: "tabletas",
  },
  {
    id: "LEF-2024-00150",
    producto: "Losartán 50mg Tabletas",
    formaFarmaceutica: "Tableta",
    lote: "L-887412",
    cliente: "Importadora MedSalud",
    cantidadIngresadaRAC: 80,
    unidadRAC: "tabletas",
  },
  {
    id: "LEF-2024-00141",
    producto: "Dexametasona 4mg/2ml Inyectable",
    formaFarmaceutica: "Inyectable",
    lote: "L-552083",
    cliente: "AgroPharma S.A.",
    cantidadIngresadaRAC: 48,
    unidadRAC: "frascos",
  },
  {
    id: "LEF-2024-00148",
    producto: "Ibuprofeno 400mg Tabletas",
    formaFarmaceutica: "Tableta",
    lote: "L-443110",
    cliente: "BioTech Honduras",
    cantidadIngresadaRAC: 200,
    unidadRAC: "tabletas",
  },
];

// Catálogo de unidades de medida.
// PENDIENTE: mover a catálogo global de administración cuando exista el backend.
export const UNIDADES_MEDIDA = [
  "frascos",
  "pastillas",
  "viales",
  "ampollas",
  "cajas",
  "tabletas",
  "cápsulas",
  "unidades",
  "ml",
  "g",
  "mg",
] as const;

export const AREAS_DESTINO = [
  {
    id: "doct",
    name: "Documentación (DOCT)",
    responsables: ["Carlos Ruiz (DOCT)", "María López (DOCT)"],
  },
  {
    id: "micro",
    name: "Microbiología",
    responsables: ["Dra. Ana Torres (Micro)", "Lic. Juan Pérez (Micro)"],
  },
  {
    id: "biblioteca",
    name: "Muestra Biblioteca",
    responsables: ["Custodio STR", "Almacén Central"],
  },
];

// PENDIENTE BACKEND: el responsable debe provenir del usuario autenticado en sesión.
// Mientras no haya integración de autenticación, se usa este mock temporal.
export const MOCK_RESPONSABLE_SESION = "Q.F. María Rodríguez (RAC)";
