import type {
  Usuario, Rol, CatalogItem, CatalogKey,
  Tecnica, EstadoFlujo, MotivoDev, CausaReanalisis,
  ConfigGeneral, ConfigSLA, ConfigNotificaciones,
} from '../_types/admin.types';

// ─── Usuarios ─────────────────────────────────────────────────────────────────
export const USUARIOS_MOCK: Usuario[] = [
  { id: 'USR-001', nombre: 'Maria Rodriguez',     correo: 'mrodriguez@cqfh.hn',  rol: 'Analista RAC',         area: 'RAC',          ultimoAcceso: '25/01/2024', estado: 'Activo' },
  { id: 'USR-002', nombre: 'Ana Patricia Flores',  correo: 'aflores@cqfh.hn',     rol: 'Analista DOCT',        area: 'DOCT',         ultimoAcceso: '25/01/2024', estado: 'Activo' },
  { id: 'USR-003', nombre: 'Luis Hernandez',       correo: 'lhernandez@cqfh.hn',  rol: 'Analista Estandares',  area: 'Estandares',   ultimoAcceso: '24/01/2024', estado: 'Activo' },
  { id: 'USR-004', nombre: 'Roberto Paz',          correo: 'rpaz@cqfh.hn',        rol: 'Supervisor STR',       area: 'STR',          ultimoAcceso: '25/01/2024', estado: 'Activo' },
  { id: 'USR-005', nombre: 'Karla Suazo',          correo: 'ksuazo@cqfh.hn',      rol: 'Analista FFQQ',        area: 'FFQQ',         ultimoAcceso: '25/01/2024', estado: 'Activo' },
  { id: 'USR-006', nombre: 'Jorge Matute',         correo: 'jmatute@cqfh.hn',     rol: 'Analista FFQQ',        area: 'FFQQ',         ultimoAcceso: '25/01/2024', estado: 'Activo' },
  { id: 'USR-007', nombre: 'Teresa Montoya',       correo: 'tmontoya@cqfh.hn',    rol: 'Analista Micro',       area: 'Microbiologia', ultimoAcceso: '25/01/2024', estado: 'Activo' },
  { id: 'USR-008', nombre: 'Dr. Roberto Paz',      correo: 'dt@cqfh.hn',          rol: 'Director Tecnico',     area: 'DT',           ultimoAcceso: '25/01/2024', estado: 'Activo' },
  { id: 'USR-009', nombre: 'Dra. Carmen Alvarado', correo: 'dg@cqfh.hn',          rol: 'Director General',     area: 'DG',           ultimoAcceso: '24/01/2024', estado: 'Activo' },
  { id: 'USR-010', nombre: 'Carlos Mejia',         correo: 'cmejia@cqfh.hn',      rol: 'Administrador',        area: 'TI',           ultimoAcceso: '23/01/2024', estado: 'Activo' },
];

export const ROLES_LIST = ['Analista RAC','Analista DOCT','Analista Estandares','Supervisor STR','Analista FFQQ','Analista Micro','Director Tecnico','Director General','Supervisor STCC','Administrador'];
export const AREAS_LIST = ['RAC','DOCT','Estandares','STR','FFQQ','Microbiologia','STCC','DT','DG','TI'];

// ─── Roles ────────────────────────────────────────────────────────────────────
export const ROLES_MOCK: Rol[] = [
  { id: 'ROL-001', nombre: 'Director General',     descripcion: 'Acceso total con aprobacion final', permisos: ['Ver todo','Aprobar informes','Emitir al cliente','Gestion usuarios'], usuarios: 1, estado: 'Activo' },
  { id: 'ROL-002', nombre: 'Director Tecnico',     descripcion: 'Supervision tecnica y resoluciones', permisos: ['Ver todo','Decisiones tecnicas','Reanalisis','Comite','RT-39'], usuarios: 1, estado: 'Activo' },
  { id: 'ROL-003', nombre: 'Supervisor STCC',      descripcion: 'Control de calidad laboratorios',  permisos: ['Revisar FFQQ/Micro','Observaciones','Devoluciones','Liberar DT'], usuarios: 1, estado: 'Activo' },
  { id: 'ROL-004', nombre: 'Supervisor STR',       descripcion: 'Supervision recepcion tecnica',    permisos: ['Revisar paquete','RT-40','Asignaciones','Devoluciones DOCT'], usuarios: 1, estado: 'Activo' },
  { id: 'ROL-005', nombre: 'Analista FFQQ',        descripcion: 'Analista fisicoquimica',           permisos: ['Ver asignados','Captura RT-38','Auxiliares','Resultados'], usuarios: 2, estado: 'Activo' },
  { id: 'ROL-006', nombre: 'Analista Microbiologia',descripcion: 'Analista microbiologia',          permisos: ['Ver asignados','Aceptabilidad','RT-74','Resultados Micro'], usuarios: 1, estado: 'Activo' },
  { id: 'ROL-007', nombre: 'Analista DOCT',        descripcion: 'Documentacion tecnica',            permisos: ['Bandeja DOCT','RT-75','RT-41','RT-30','RT-38'], usuarios: 1, estado: 'Activo' },
  { id: 'ROL-008', nombre: 'Analista RAC',         descripcion: 'Recepcion y admision de casos',   permisos: ['Crear ingresos','Validacion','Proformas','RT-159'], usuarios: 1, estado: 'Activo' },
  { id: 'ROL-009', nombre: 'Administrador',        descripcion: 'Acceso total al sistema',          permisos: ['Acceso total','Gestion usuarios','Catalogos','Configuracion'], usuarios: 1, estado: 'Activo' },
];

// ─── Catálogos ────────────────────────────────────────────────────────────────
export const CATALOGOS_MOCK: Record<CatalogKey, CatalogItem[]> = {
  tramites: [
    { id: 1, nombre: 'Control de Calidad',    estado: 'Activo' },
    { id: 2, nombre: 'Registro Sanitario',    estado: 'Activo' },
    { id: 3, nombre: 'Licitacion Publica',    estado: 'Activo' },
    { id: 4, nombre: 'Colaboracion Tecnica',  estado: 'Activo' },
    { id: 5, nombre: 'Vigilancia Sanitaria',  estado: 'Activo' },
    { id: 6, nombre: 'Reanalisis Solicitado', estado: 'Activo' },
  ],
  formasFarm: [
    { id: 1, nombre: 'Tableta',     estado: 'Activo' },
    { id: 2, nombre: 'Capsula',     estado: 'Activo' },
    { id: 3, nombre: 'Jarabe',      estado: 'Activo' },
    { id: 4, nombre: 'Suspension',  estado: 'Activo' },
    { id: 5, nombre: 'Inyectable',  estado: 'Activo' },
    { id: 6, nombre: 'Crema',       estado: 'Activo' },
  ],
  tiposCliente: [
    { id: 1, nombre: 'Publico',       estado: 'Activo' },
    { id: 2, nombre: 'Privado',       estado: 'Activo' },
    { id: 3, nombre: 'Hospital',      estado: 'Activo' },
    { id: 4, nombre: 'Distribuidor',  estado: 'Activo' },
    { id: 5, nombre: 'Farmacia',      estado: 'Activo' },
    { id: 6, nombre: 'Cooperacion',   estado: 'Activo' },
  ],
  paises: [
    { id: 1, nombre: 'Honduras',        estado: 'Activo' },
    { id: 2, nombre: 'Guatemala',       estado: 'Activo' },
    { id: 3, nombre: 'El Salvador',     estado: 'Activo' },
    { id: 4, nombre: 'Mexico',          estado: 'Activo' },
    { id: 5, nombre: 'Colombia',        estado: 'Activo' },
    { id: 6, nombre: 'India',           estado: 'Activo' },
    { id: 7, nombre: 'Estados Unidos',  estado: 'Activo' },
  ],
  metodologias: [
    { id: 1, nombre: 'HPLC',         estado: 'Activo' },
    { id: 2, nombre: 'IR',           estado: 'Activo' },
    { id: 3, nombre: 'UV-Vis',       estado: 'Activo' },
    { id: 4, nombre: 'Disolucion',   estado: 'Activo' },
    { id: 5, nombre: 'Uniformidad',  estado: 'Activo' },
    { id: 6, nombre: 'Microbiologia',estado: 'Activo' },
  ],
};

export const CATALOG_LABELS: Record<CatalogKey, string> = {
  tramites:     'Tipos de Tramite',
  formasFarm:   'Formas Farmaceuticas',
  tiposCliente: 'Tipos de Cliente',
  paises:       'Paises de Origen',
  metodologias: 'Metodologias Analiticas',
};

// ─── Técnicas ─────────────────────────────────────────────────────────────────
export const TECNICAS_MOCK: Tecnica[] = [
  { id: 'T-001', codigo: 'HPLC',   nombre: 'Cromatografia Liquida de Alta Resolucion',      auxiliar: 'RT-84', area: 'FFQQ',  estado: 'Activa' },
  { id: 'T-002', codigo: 'IR',     nombre: 'Espectrofotometria Infrarroja',                  auxiliar: 'RT-86', area: 'FFQQ',  estado: 'Activa' },
  { id: 'T-003', codigo: 'DISOL',  nombre: 'Prueba de Disolucion',                          auxiliar: 'RT-85', area: 'FFQQ',  estado: 'Activa' },
  { id: 'T-004', codigo: 'UNIF',   nombre: 'Uniformidad de Contenido',                      auxiliar: 'RT-87', area: 'FFQQ',  estado: 'Activa' },
  { id: 'T-005', codigo: 'VIS',    nombre: 'Descripcion Visual / Caracteres Organolepticos', auxiliar: 'RT-71', area: 'FFQQ',  estado: 'Activa' },
  { id: 'T-006', codigo: 'DESINT', nombre: 'Prueba de Desintegracion',                      auxiliar: 'RT-55', area: 'FFQQ',  estado: 'Activa' },
  { id: 'T-007', codigo: 'MICRO',  nombre: 'Recuento Microbiano Total',                     auxiliar: 'RT-74', area: 'Micro', estado: 'Activa' },
  { id: 'T-008', codigo: 'PATOG',  nombre: 'Ausencia de Patogenos',                         auxiliar: 'RT-74', area: 'Micro', estado: 'Activa' },
  { id: 'T-009', codigo: 'UV',     nombre: 'Espectrofotometria UV-Vis',                     auxiliar: 'RT-16', area: 'FFQQ',  estado: 'Activa' },
  { id: 'T-010', codigo: 'GRAV',   nombre: 'Gravimetria / Variacion de Peso',               auxiliar: 'RT-17', area: 'FFQQ',  estado: 'Activa' },
];

// ─── Estados de Flujo ─────────────────────────────────────────────────────────
export const ESTADOS_MOCK: EstadoFlujo[] = [
  { id: 'E-01', codigo: 'borrador',                  etiqueta: 'Borrador',           area: 'RAC',  color: 'slate',   orden: 1,  activo: true },
  { id: 'E-02', codigo: 'pendiente_validacion',      etiqueta: 'Pdte. Validacion',   area: 'RAC',  color: 'amber',   orden: 2,  activo: true },
  { id: 'E-03', codigo: 'pendiente_pago',            etiqueta: 'Pdte. Pago',         area: 'RAC',  color: 'orange',  orden: 3,  activo: true },
  { id: 'E-04', codigo: 'distribuido_doct_micro',    etiqueta: 'Distribuido RT-159', area: 'RAC',  color: 'blue',    orden: 4,  activo: true },
  { id: 'E-05', codigo: 'en_elaboracion_rt38',       etiqueta: 'Elab. RT-38',        area: 'DOCT', color: 'purple',  orden: 5,  activo: true },
  { id: 'E-06', codigo: 'en_revision_str',           etiqueta: 'En Revision STR',    area: 'STR',  color: 'indigo',  orden: 6,  activo: true },
  { id: 'E-07', codigo: 'en_analisis_ffqq',          etiqueta: 'En Analisis FFQQ',   area: 'FFQQ', color: 'teal',    orden: 7,  activo: true },
  { id: 'E-08', codigo: 'en_analisis_micro',         etiqueta: 'En Analisis Micro',  area: 'Micro',color: 'teal',    orden: 8,  activo: true },
  { id: 'E-09', codigo: 'en_revision_stcc',          etiqueta: 'En Revision STCC',   area: 'STCC', color: 'yellow',  orden: 9,  activo: true },
  { id: 'E-10', codigo: 'en_revision_dt',            etiqueta: 'En Revision DT',     area: 'DT',   color: 'blue',    orden: 10, activo: true },
  { id: 'E-11', codigo: 'en_revision_dg',            etiqueta: 'En Revision DG',     area: 'DG',   color: 'blue',    orden: 11, activo: true },
  { id: 'E-12', codigo: 'emitido_cliente',           etiqueta: 'Emitido al Cliente', area: 'DG',   color: 'green',   orden: 12, activo: true },
  { id: 'E-13', codigo: 'archivado',                 etiqueta: 'Archivado',          area: 'DG',   color: 'slate',   orden: 13, activo: true },
];

// ─── Motivos Devolución ───────────────────────────────────────────────────────
export const MOTIVOS_MOCK: MotivoDev[] = [
  { id: 'MOT-001', motivo: 'Documentacion incompleta',            areaOrigen: 'STR',  estado: 'Activo' },
  { id: 'MOT-002', motivo: 'RT-38 con errores de configuracion', areaOrigen: 'STR',  estado: 'Activo' },
  { id: 'MOT-003', motivo: 'Estandar no valido',                  areaOrigen: 'STR',  estado: 'Activo' },
  { id: 'MOT-004', motivo: 'Auxiliares incompletos',              areaOrigen: 'STCC', estado: 'Activo' },
  { id: 'MOT-005', motivo: 'Resultados fuera de especificaciones',areaOrigen: 'STCC', estado: 'Activo' },
  { id: 'MOT-006', motivo: 'Calculos incorrectos',                areaOrigen: 'STCC', estado: 'Activo' },
  { id: 'MOT-007', motivo: 'Conclusion tecnica incorrecta',       areaOrigen: 'DT',   estado: 'Activo' },
  { id: 'MOT-008', motivo: 'Redaccion del RT-39 incorrecta',      areaOrigen: 'DG',   estado: 'Activo' },
];

// ─── Causas Reanálisis ────────────────────────────────────────────────────────
export const CAUSAS_MOCK: CausaReanalisis[] = [
  { id: 'CAU-001', causa: 'Resultado fuera de especificaciones en primera corrida', tipo: 'Tecnica',       estado: 'Activo' },
  { id: 'CAU-002', causa: 'Error de procedimiento analitico',                       tipo: 'Procedimiento', estado: 'Activo' },
  { id: 'CAU-003', causa: 'Resultado ambiguo o dudoso',                             tipo: 'Tecnica',       estado: 'Activo' },
  { id: 'CAU-004', causa: 'Discrepancia entre analistas',                           tipo: 'Tecnica',       estado: 'Activo' },
  { id: 'CAU-005', causa: 'Solicitud del cliente',                                  tipo: 'Administrativa',estado: 'Activo' },
  { id: 'CAU-006', causa: 'Decision del Comite de Calidad',                         tipo: 'Comite',        estado: 'Activo' },
  { id: 'CAU-007', causa: 'Falla del equipo durante el analisis',                   tipo: 'Equipo',        estado: 'Activo' },
];

// ─── Configuración ────────────────────────────────────────────────────────────
export const CONFIG_GENERAL_MOCK: ConfigGeneral = {
  nombreLaboratorio: 'Laboratorio de Especialidades Farmaceuticas (LEF)',
  institucion: 'Colegio de Quimico-Farmaceuticos de Honduras (CQFH)',
  prefijo: 'LEF',
  anio: '2024',
};

export const CONFIG_SLA_MOCK: ConfigSLA = {
  rac: 2, doct: 4, str: 2, ffqq: 5, micro: 7, stcc: 2, dt: 2, dg: 1,
};

export const CONFIG_NOTIF_MOCK: ConfigNotificaciones = {
  alertarSLA: true,
  notificarEstandares: true,
  alertarRT30: true,
  notificarAsignaciones: true,
  alertarCasosBloqueados: false,
};
