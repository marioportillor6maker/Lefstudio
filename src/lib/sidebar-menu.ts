export interface SubItem {
  label: string;
  href: string;
}

export interface MenuItemData {
  id: string;
  label: string;
  href?: string;
  /** Explicit badge override. Omit to auto-compute from subItems.length. */
  badge?: number;
  subItems?: SubItem[];
}

export interface MenuSectionData {
  title: string;
  items: MenuItemData[];
}

export const MENU_SECTIONS_DATA: MenuSectionData[] = [
  {
    title: "PRINCIPAL",
    items: [
      { id: "inicio", label: "Inicio", href: "/" },
      {
        id: "ingresos", label: "Ingresos",
        badge: 24, // pending queue count — NOT subitem count
        subItems: [
          { label: "Bandeja General", href: "/ingresos" },
          { label: "Vista 360",       href: "/ingresos/vista-360" },
          { label: "Crear Ingreso",   href: "/rac/nuevo" },
        ],
      },
    ],
  },
  {
    title: "MÓDULOS OPERATIVOS",
    items: [
      {
        id: "rac", label: "RAC",
        subItems: [
          { label: "Bandeja RAC",         href: "/rac" },
          { label: "Nuevo Ingreso",       href: "/rac/nuevo" },
          { label: "Proformas y Pago",    href: "/rac/proformas" },
          { label: "Distribución RT-159", href: "/rac/distribucion" },
        ],
      },
      {
        id: "doct", label: "Documentación",
        subItems: [
          { label: "Bandeja DOCT",       href: "/doct" },
          { label: "Solicitudes RT-75",  href: "/doct/rt75" },
          { label: "Contraste RT-41",    href: "/doct/rt41" },
          { label: "Solicitudes RT-30",  href: "/doct/rt30" },
          { label: "Preparación RT-38",  href: "/doct/rt38" },
          { label: "Control Expediente", href: "/doct/control" },
        ],
      },
      {
        id: "est", label: "Estándares",
        subItems: [
          { label: "Bandeja Estándares",    href: "/estandares" },
          { label: "Registro RG-44",        href: "/estandares/nuevo" },
          { label: "Entrega RT-27",         href: "/estandares/entrega" },
          { label: "Rechazo RG-58",         href: "/estandares/rechazo" },
          { label: "Eliminación RT-45",     href: "/estandares/eliminacion" },
          { label: "Vigencia de Estándares", href: "/estandares/vigencia" },
        ],
      },
      {
        id: "str", label: "STR",
        subItems: [
          { label: "Bandeja STR",          href: "/str" },
          { label: "Revisión Documental",  href: "/str/revision" },
          { label: "Asignaciones RT-40",   href: "/str/asignaciones" },
          { label: "Devoluciones",         href: "/str/devoluciones" },
          { label: "Control Pre-Análisis", href: "/str/preanalisis" },
          { label: "Registro de Muestras", href: "/str/muestras" },
        ],
      },
      {
        id: "ffqq", label: "FFQQ",
        subItems: [
          { label: "Bandeja FFQQ",       href: "/ffqq" },
          { label: "Hoja de Trabajo",    href: "/ffqq/hoja" },
          { label: "Resultados RT-88",   href: "/ffqq/resultados" },
          { label: "Validaciones",       href: "/ffqq/validaciones" },
          { label: "Bitácora Reactivos", href: "/ffqq/reactivos" },
          { label: "Control de Equipos", href: "/ffqq/equipos" },
          { label: "Métodos Analíticos", href: "/ffqq/metodos" },
          { label: "Historial Casos",    href: "/ffqq/historial" },
        ],
      },
      {
        id: "micro", label: "Microbiología",
        subItems: [
          { label: "Bandeja Micro",            href: "/micro" },
          { label: "Aceptabilidad",            href: "/micro?tab=aceptabilidad" },
          { label: "Ejecución Microbiológica", href: "/micro?tab=ejecucion" },
          { label: "Captura RT-74",            href: "/micro?tab=captura" },
          { label: "Revisión Pre-STCC",        href: "/micro?tab=revision" },
        ],
      },
      {
        id: "stcc", label: "STCC",
        subItems: [
          { label: "Bandeja STCC",        href: "/stcc" },
          { label: "Revisión FFQQ/Micro", href: "/stcc?tab=revision" },
          { label: "Observaciones",       href: "/stcc?tab=observaciones" },
          { label: "Devoluciones",        href: "/stcc?tab=devoluciones" },
          { label: "Liberación DT",       href: "/stcc?tab=liberacion" },
        ],
      },
    ],
  },
  {
    title: "DIRECCIÓN",
    items: [
      {
        id: "dt", label: "Dirección Técnica",
        subItems: [
          { label: "Bandeja DT",           href: "/dt" },
          { label: "Revisión Consolidada", href: "/dt?tab=revision" },
          { label: "Decisiones Técnicas",  href: "/dt?tab=decisiones" },
          { label: "Reanálisis / Comité",  href: "/dt?tab=reanalisis" },
          { label: "Elaboración RT-39",    href: "/dt?tab=rt39" },
        ],
      },
      {
        id: "dg", label: "Dirección General",
        subItems: [
          { label: "Bandeja DG",               href: "/dg" },
          { label: "Revisión Final",            href: "/dg?tab=revision" },
          { label: "Aprobación / Observaciones", href: "/dg?tab=aprobacion" },
          { label: "Emisión al Cliente",        href: "/dg?tab=emision" },
          { label: "Cierre y Archivo",          href: "/dg?tab=cierre" },
        ],
      },
    ],
  },
  {
    title: "INTELIGENCIA",
    items: [
      {
        id: "reportes", label: "Reportes",
        subItems: [
          { label: "Ingresos",            href: "/reportes?tab=ingresos" },
          { label: "Tiempos por Etapa",   href: "/reportes?tab=tiempos" },
          { label: "Pendientes por Área", href: "/reportes?tab=pendientes" },
          { label: "Reanálisis",          href: "/reportes?tab=reanalisis" },
          { label: "Estándares",          href: "/reportes?tab=estandares" },
          { label: "Devoluciones",        href: "/reportes?tab=devoluciones" },
          { label: "Carga Analista",      href: "/reportes?tab=carga" },
          { label: "Productividad",       href: "/reportes?tab=productividad" },
        ],
      },
      {
        id: "dashboards", label: "Dashboards",
        subItems: [
          { label: "Operación General",  href: "/dashboards?tab=operacion" },
          { label: "RAC y Tiempos",      href: "/dashboards?tab=rac" },
          { label: "DOCT y Pendientes",  href: "/dashboards?tab=doct" },
          { label: "FFQQ / Micro",       href: "/dashboards?tab=laboratorios" },
          { label: "STCC / DT / DG",     href: "/dashboards?tab=stcc" },
          { label: "Estado Consolidado", href: "/dashboards?tab=estado" },
        ],
      },
    ],
  },
  {
    title: "SISTEMA",
    items: [
      {
        id: "admin", label: "Administración",
        subItems: [
          { label: "Usuarios",         href: "/admin?tab=usuarios" },
          { label: "Roles y Permisos", href: "/admin?tab=roles" },
          { label: "Catálogos",        href: "/admin?tab=catalogos" },
          { label: "Técnicas",         href: "/admin?tab=tecnicas" },
          { label: "Configuración",    href: "/admin?tab=configuracion" },
        ],
      },
      { id: "bitacora", label: "Bitácora / Auditoría", href: "/bitacora" },
    ],
  },
];
