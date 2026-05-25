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
  cantidadDocto: number;
  cantidadMicro: number;
  cantidadMuestroteca: number;
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
    cantidadDocto: 50,
    cantidadMicro: 40,
    cantidadMuestroteca: 30,
  },
  {
    id: "LEF-2024-00150",
    producto: "Losartán 50mg Tabletas",
    formaFarmaceutica: "Tableta",
    lote: "L-887412",
    cliente: "Importadora MedSalud",
    cantidadIngresadaRAC: 80,
    unidadRAC: "tabletas",
    cantidadDocto: 30,
    cantidadMicro: 30,
    cantidadMuestroteca: 20,
  },
  {
    id: "LEF-2024-00141",
    producto: "Dexametasona 4mg/2ml Inyectable",
    formaFarmaceutica: "Inyectable",
    lote: "L-552083",
    cliente: "AgroPharma S.A.",
    cantidadIngresadaRAC: 48,
    unidadRAC: "frascos",
    cantidadDocto: 20,
    cantidadMicro: 18,
    cantidadMuestroteca: 10,
  },
  {
    id: "LEF-2024-00148",
    producto: "Ibuprofeno 400mg Tabletas",
    formaFarmaceutica: "Tableta",
    lote: "L-443110",
    cliente: "BioTech Honduras",
    cantidadIngresadaRAC: 200,
    unidadRAC: "tabletas",
    cantidadDocto: 80,
    cantidadMicro: 80,
    cantidadMuestroteca: 40,
  },
  {
    id: "LEF-2024-00147",
    producto: "Amoxicilina 500mg Cápsulas",
    formaFarmaceutica: "Cápsula",
    lote: "L-220847",
    cliente: "Laboratorios Farma S.A.",
    cantidadIngresadaRAC: 150,
    unidadRAC: "cápsulas",
    cantidadDocto: 60,
    cantidadMicro: 60,
    cantidadMuestroteca: 30,
  },
  {
    id: "LEF-2024-00139",
    producto: "Atorvastatina 20mg Tabletas",
    formaFarmaceutica: "Tableta",
    lote: "L-334501",
    cliente: "PharmaCentral",
    cantidadIngresadaRAC: 100,
    unidadRAC: "tabletas",
    cantidadDocto: 40,
    cantidadMicro: 40,
    cantidadMuestroteca: 20,
  },
  {
    id: "LEF-2024-00135",
    producto: "Ciprofloxacino 500mg Tabletas",
    formaFarmaceutica: "Tableta",
    lote: "L-119203",
    cliente: "Laboratorio El Sol",
    cantidadIngresadaRAC: 90,
    unidadRAC: "tabletas",
    cantidadDocto: 36,
    cantidadMicro: 36,
    cantidadMuestroteca: 18,
  },
  {
    id: "LEF-2024-00153",
    producto: "Paracetamol 500mg Tabletas",
    formaFarmaceutica: "Tableta",
    lote: "L-667890",
    cliente: "NovaMed Honduras",
    cantidadIngresadaRAC: 180,
    unidadRAC: "tabletas",
    cantidadDocto: 70,
    cantidadMicro: 70,
    cantidadMuestroteca: 40,
  },
  {
    id: "LEF-2024-00144",
    producto: "Furosemida 40mg Tabletas",
    formaFarmaceutica: "Tableta",
    lote: "L-778234",
    cliente: "Distribuidora Salud Total",
    cantidadIngresadaRAC: 60,
    unidadRAC: "tabletas",
    cantidadDocto: 24,
    cantidadMicro: 24,
    cantidadMuestroteca: 12,
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
    id: "muestroteca",
    name: "Muestroteca",
    responsables: ["Custodio STR", "Almacén Central"],
  },
];

// PENDIENTE BACKEND: el responsable debe provenir del usuario autenticado en sesión.
// Mientras no haya integración de autenticación, se usa este mock temporal.
export const MOCK_RESPONSABLE_SESION = "Q.F. María Rodríguez (RAC)";
