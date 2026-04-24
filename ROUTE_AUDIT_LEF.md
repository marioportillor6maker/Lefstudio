# Auditoría de Rutas y Navegación - Sistema LEF

## 1. Módulo: Inicio e Ingresos
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/` | Inicio | Existente | OK |
| `/ingresos` | Ingresos > Bandeja General | Existente | OK |
| `/ingresos/vista-360` | Ingresos > Vista 360 | 404 (Falta ruta) | Creada |
| `/rac/nuevo` | Ingresos > Crear Ingreso | Existente | OK |

## 2. Módulo: RAC
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/rac` | RAC > Bandeja RAC | Existente | OK |
| `/rac/proformas` | RAC > Proformas y Pago | 404 (Falta ruta) | Creada |
| `/rac/distribucion` | RAC > Distribución RT-159 | 404 (Falta ruta) | Creada |

## 3. Módulo: DOCT
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/doct` | DOCT > Bandeja DOCT | Existente | OK |
| `/doct/rt75` | DOCT > Solicitudes RT-75 | 404 (Falta ruta) | Creada |
| `/doct/rt41` | DOCT > Contraste RT-41 | 404 (Falta ruta) | Creada |
| `/doct/rt30` | DOCT > Solicitudes RT-30 | 404 (Falta ruta) | Creada |
| `/doct/rt38` | DOCT > Preparación RT-38 | 404 (Falta ruta) | Creada |

## 4. Módulo: Estándares
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/estandares` | Estándares > Bandeja Estándares | Existente | OK |
| `/estandares/nuevo` | Estándares > Registro RG-44 | 404 (Falta ruta) | Creada |
| `/estandares/entrega` | Estándares > Entrega RT-27 | 404 (Falta ruta) | Creada |
| `/estandares/rechazo` | Estándares > Rechazo RG-58 | 404 (Falta ruta) | Creada |
| `/estandares/eliminacion`| Estándares > Eliminación RT-45 | 404 (Falta ruta) | Creada |

## 5. Módulo: STR
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/str` | STR > Bandeja STR | Existente | OK |
| `/str/muestras` | STR > Registro de Muestras | 404 (Falta ruta) | Creada |

## 6. Módulo: FFQQ
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/ffqq` | FFQQ > Bandeja FFQQ | Existente | OK |
| `/ffqq/hoja` | FFQQ > Hoja de Trabajo | 404 (Falta ruta) | Creada |
| `/ffqq/resultados` | FFQQ > Resultados RT-88 | 404 (Falta ruta) | Creada |
| `/ffqq/validaciones` | FFQQ > Validaciones | 404 (Falta ruta) | Creada |
| `/ffqq/reactivos` | FFQQ > Bitácora Reactivos | 404 (Falta ruta) | Creada |
| `/ffqq/equipos` | FFQQ > Control de Equipos | 404 (Falta ruta) | Creada |
| `/ffqq/metodos` | FFQQ > Métodos Analíticos | 404 (Falta ruta) | Creada |
| `/ffqq/historial` | FFQQ > Historial Casos | 404 (Falta ruta) | Creada |

## 7. Módulo: Microbiología
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/micro` | Micro > Bandeja MICRO | Existente | OK |
| `/micro/siembra` | Micro > Siembra y Lectura | 404 (Falta ruta) | Creada |
| `/micro/resultados` | Micro > Resultados RT-92 | 404 (Falta ruta) | Creada |

## 8. Módulo: STCC
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/stcc` | STCC > Bandeja STCC | Existente | OK |
| `/stcc/comite` | STCC > Comité de Calidad | 404 (Falta ruta) | Creada |

## 9. Módulo: Dirección Técnica
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/dt` | DT > Bandeja DT | Existente | OK |
| `/dt/resoluciones` | DT > Resoluciones RT-200 | 404 (Falta ruta) | Creada |

## 10. Módulo: Dirección General
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/dg/firma` | DG > Firma Digital | 404 (Falta ruta) | Creada |
| `/dg` | DG > Bandeja General | Existente | OK |

## 11. Módulo: Inteligencia
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/reportes/ingresos` | Reportes > Lista de Ingresos | 404 (Falta ruta) | Creada |
| `/reportes/tiempos` | Reportes > Tiempos por Etapa | 404 (Falta ruta) | Creada |
| `/reportes/pendientes` | Reportes > Pendientes por Área | 404 (Falta ruta) | Creada |
| `/reportes/reanalisis` | Reportes > Reanálisis | 404 (Falta ruta) | Creada |
| `/reportes/productividad` | Reportes > Productividad | 404 (Falta ruta) | Creada |
| `/reportes` | Reportes (General) | Existente | OK |
| `/dashboards/operacion` | Dashboards > Operación General | 404 (Falta ruta) | Creada |
| `/dashboards/rac` | Dashboards > RAC y Tiempos | 404 (Falta ruta) | Creada |
| `/dashboards/laboratorios` | Dashboards > FFQQ / Micro | 404 (Falta ruta) | Creada |
| `/dashboards/estado` | Dashboards > Estado Consolidado | 404 (Falta ruta) | Creada |

## 12. Módulo: Sistema
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/admin/usuarios` | Administración > Usuarios | 404 (Falta ruta) | Creada |
| `/admin/roles` | Administración > Roles y Permisos | 404 (Falta ruta) | Creada |
| `/admin/catalogos` | Administración > Catálogos | 404 (Falta ruta) | Creada |
| `/admin/tecnicas` | Administración > Técnicas | 404 (Falta ruta) | Creada |
| `/admin/configuracion` | Administración > Configuración | 404 (Falta ruta) | Creada |
| `/admin` | Administración (General) | Existente | OK |
| `/bitacora` | Bitácora / Auditoría | Existente | OK |

## 13. Rutas Dinámicas
| Ruta Esperada | Módulo / Enlace | Estado Inicial | Acción / Estado Final |
|---|---|---|---|
| `/ingresos/[id]` | Vista 360 (Detalle) | Existente | OK |
| `/documentos/visor/[tipo]/[id]` | Visor de Documentos | Existente | OK |
| `/ffqq/ensayo/[id]` | FFQQ Ensayo Detalle | Existente | OK |
