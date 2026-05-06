// ─── Tab IDs ─────────────────────────────────────────────────────────────────
export type AdminTabId =
  | 'usuarios'
  | 'roles'
  | 'catalogos'
  | 'tecnicas'
  | 'estados'
  | 'motivos'
  | 'causas'
  | 'configuracion';

export interface AdminTab { id: AdminTabId; label: string }

// ─── Usuarios ─────────────────────────────────────────────────────────────────
export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  area: string;
  ultimoAcceso: string;
  estado: 'Activo' | 'Inactivo';
}

export type UsuarioForm = Omit<Usuario, 'id' | 'ultimoAcceso'> & {
  password?: string;
  confirmPassword?: string;
  enviarCredenciales: boolean;
};

// ─── Roles ────────────────────────────────────────────────────────────────────
export interface Rol {
  id: string;
  nombre: string;
  descripcion: string;
  permisos: string[];
  usuarios: number;
  estado: 'Activo' | 'Inactivo';
}

export type RolForm = Omit<Rol, 'id' | 'usuarios'>;

export const PERMISSION_GROUPS: { group: string; perms: string[] }[] = [
  { group: 'Usuarios',          perms: ['Ver usuarios', 'Crear usuarios', 'Editar usuarios', 'Eliminar usuarios'] },
  { group: 'Ingresos',          perms: ['Ver ingresos', 'Crear ingresos', 'Editar ingresos'] },
  { group: 'RAC',               perms: ['Bandeja RAC', 'Validacion', 'Proformas', 'RT-159'] },
  { group: 'DOCT',              perms: ['Bandeja DOCT', 'RT-75', 'RT-41', 'RT-30', 'RT-38'] },
  { group: 'STR',               perms: ['Revisar paquete', 'RT-40', 'Asignaciones', 'Devoluciones DOCT'] },
  { group: 'FFQQ',              perms: ['Ver asignados', 'Captura RT-38', 'Auxiliares', 'Resultados'] },
  { group: 'Microbiologia',     perms: ['Ver asignados', 'Aceptabilidad', 'RT-74', 'Resultados Micro'] },
  { group: 'STCC',              perms: ['Revisar FFQQ/Micro', 'Observaciones', 'Devoluciones', 'Liberar DT'] },
  { group: 'Direccion Tecnica', perms: ['Decisiones tecnicas', 'Reanalisis', 'Comite', 'RT-39'] },
  { group: 'Direccion General', perms: ['Aprobar informes', 'Emitir al cliente'] },
  { group: 'Reportes',          perms: ['Ver reportes', 'Exportar reportes'] },
  { group: 'Dashboards',        perms: ['Ver dashboards'] },
  { group: 'Administracion',    perms: ['Acceso total', 'Gestion usuarios', 'Catalogos', 'Configuracion'] },
];

// ─── Catálogos ────────────────────────────────────────────────────────────────
export type CatalogKey = 'tramites' | 'formasFarm' | 'tiposCliente' | 'paises' | 'metodologias';

export interface CatalogItem {
  id: number;
  nombre: string;
  codigo?: string;
  descripcion?: string;
  estado: 'Activo' | 'Inactivo';
}

export type CatalogItemForm = Omit<CatalogItem, 'id'>;

// ─── Técnicas ─────────────────────────────────────────────────────────────────
export interface Tecnica {
  id: string;
  codigo: string;
  nombre: string;
  auxiliar: string;
  area: string;
  estado: 'Activa' | 'Inactiva';
  descripcion?: string;
}

export type TecnicaForm = Omit<Tecnica, 'id'>;

// ─── Estados de Flujo ────────────────────────────────────────────────────────
export interface EstadoFlujo {
  id: string;
  codigo: string;
  etiqueta: string;
  area: string;
  color: string;
  orden: number;
  activo: boolean;
}

export type EstadoFlujoForm = Omit<EstadoFlujo, 'id'>;

// ─── Motivos Devolución ───────────────────────────────────────────────────────
export interface MotivoDev {
  id: string;
  motivo: string;
  areaOrigen: string;
  estado: 'Activo' | 'Inactivo';
  descripcion?: string;
}

export type MotivoDevForm = Omit<MotivoDev, 'id'>;

// ─── Causas Reanálisis ────────────────────────────────────────────────────────
export type CausaTipo = 'Tecnica' | 'Procedimiento' | 'Administrativa' | 'Comite' | 'Equipo';

export interface CausaReanalisis {
  id: string;
  causa: string;
  tipo: CausaTipo;
  estado: 'Activo' | 'Inactivo';
  descripcion?: string;
}

export type CausaReanalisisForm = Omit<CausaReanalisis, 'id'>;

// ─── Configuración ────────────────────────────────────────────────────────────
export interface ConfigGeneral {
  nombreLaboratorio: string;
  institucion: string;
  prefijo: string;
  anio: string;
}

export interface ConfigSLA {
  rac: number;
  doct: number;
  str: number;
  ffqq: number;
  micro: number;
  stcc: number;
  dt: number;
  dg: number;
}

export interface ConfigNotificaciones {
  alertarSLA: boolean;
  notificarEstandares: boolean;
  alertarRT30: boolean;
  notificarAsignaciones: boolean;
  alertarCasosBloqueados: boolean;
}
