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

// Extiende mockIngresosList con campo cantidadIngresadaRAC y unidadRAC
// que el modelo de bandeja actual no expone (pendiente de integración).
export const MOCK_RECEPCIONES_RAC: RecepcionRAC[] = [
  {
    id: "REC-2024-1030",
    producto: "Metformina 850mg",
    formaFarmaceutica: "Tableta",
    lote: "L-993021",
    cliente: "FarmaSalud S.A.",
    cantidadIngresadaRAC: 120,
    unidadRAC: "tabletas",
  },
  {
    id: "REC-2024-1029",
    producto: "Losartán 50mg",
    formaFarmaceutica: "Tableta",
    lote: "L-887412",
    cliente: "Droguería Central",
    cantidadIngresadaRAC: 80,
    unidadRAC: "tabletas",
  },
  {
    id: "REC-2024-1028",
    producto: "Amoxicilina Susp. 250mg/5ml",
    formaFarmaceutica: "Suspensión",
    lote: "L-552083",
    cliente: "IHSS",
    cantidadIngresadaRAC: 48,
    unidadRAC: "frascos",
  },
  {
    id: "REC-2024-1024",
    producto: "Ibuprofeno 400mg",
    formaFarmaceutica: "Tableta",
    lote: "L-443110",
    cliente: "FarmaSalud S.A.",
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
