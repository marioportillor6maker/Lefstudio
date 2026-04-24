# REPLICATION PLAN LEF

## 1. Objetivo General de Replicación
Replicar fielmente en el sistema actual (Antigravity) todas las pantallas, módulos, flujos y componentes documentados en `documentacion_funcional_lef`, utilizando como referencia visual directa el sistema base (Rocket) y manteniendo la estructura y lineamientos técnicos de los documentos previos.

## 2. Reglas de Trabajo
- NO se avanzará de forma improvisada ni confiando en memoria.
- Se seguirá un proceso controlado, documentado, verificable y repetible.
- Se actualizará este plan, el `REPLICATION_STATUS.md` y `REPLICATION_AUDIT_LOG.md` de forma continua.
- Al replicar cada componente, se marcará su estado en `documentacion_funcional_lef_REPLICACION.md`.

## 3. Jerarquía de Fuentes
1. **Guía Principal:** `documentacion_funcional_lef`
2. **Referencia Visual Directa:** Sistema Rocket (`https://sistemalef-cm22486.public.builtwithrocket.new/dashboard-personal`)
3. **Base a Modificar:** Sistema actual Antigravity (`/lef-frontend`)
4. **Respaldo:** Documentos funcionales previos en la carpeta `Docs Importa`.

## 4. Proceso de Mega Componentes
Se han identificado **21 Mega Componentes** globales, descritos en `MEGA_COMPONENTS_INDEX.md`.

## 5. Ciclo Obligatorio por Mega Componente
1. Seleccionar un mega componente.
2. Leer en `documentacion_funcional_lef` todo lo relacionado.
3. Ir al sistema Rocket y revisar visualmente.
4. Revisar el sistema actual de Antigravity.
5. Comparar contra documento + Rocket.
6. Completar lo faltante o construirlo si no existe.
7. Replicar cada elemento, marcándolo en `documentacion_funcional_lef_REPLICACION.md`.
8. Auditar el mega componente control por control.
9. Corregir faltantes detectados en la auditoría.
10. Marcar el mega componente como **VALIDADO 100%** en `REPLICATION_STATUS.md`.
11. Pasar al siguiente mega componente.

## 6. Criterios de Completitud
- Todos los campos de formularios (inputs, selects, textareas, datepickers) existen y tienen lógica asociada.
- Todas las tablas contienen las columnas correctas, badges, acciones y estilos.
- Todos los botones/modales documentados han sido replicados.
- Las vistas coinciden con la estética enterprise establecida.

## 7. Criterios de Rechazo
- Componentes genéricos sin adaptación funcional.
- Uso de placeholders sin valor.
- Omisión de controles presentes en la documentación.
- Diferencias groseras de UI comparado con el sistema Rocket.

## 8. Cómo se marcará avance
Se actualizará la tabla principal en `REPLICATION_STATUS.md` y los detalles en `documentacion_funcional_lef_REPLICACION.md` utilizando etiquetas PENDIENTE, EN PROCESO, REPLICADO, VALIDADO 100%.

## 9. Cómo se auditará cada componente
Se ejecutará una revisión línea por línea contra el documento funcional y visualmente contra Rocket, registrando hallazgos en `REPLICATION_AUDIT_LOG.md`.

## 10. Cómo se verificará el plan al final
Al culminar los 21 componentes, se realizará la auditoría final detallada (12 puntos) para validar que el sistema completo corre sin errores y que no se rompió la navegación.

## 11. Lista Inicial de Tareas
(Ver listado en `MEGA_COMPONENTS_INDEX.md`)

## 12. Instrucción Explícita
**NO se debe avanzar al siguiente mega componente hasta validar 100% el anterior.**
