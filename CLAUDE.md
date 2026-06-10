@AGENTS.md

# lef-frontend — Convenciones del Proyecto

## Stack

- Next.js 16.2.4 + React 19 + TypeScript 5 + Tailwind CSS v4
- App Router — Screaming Architecture (`_components/`, `_data/`, `_types/` por feature)
- Test runner: Vitest (`vitest run`) — unit tests únicamente
- Linter: ESLint via `eslint-config-next`
- Sin formatter (no Prettier)

## Estructura del Proyecto

```
src/
├── app/
│   ├── admin/          # Usuarios, roles, técnicas, config
│   ├── ingresos/       # Bandejas: RAC, DOCT, STCC, FFQQ, Micro, Estándar
│   ├── dashboards/     # Estado, laboratorios, operación, RAC
│   ├── reportes/       # Ingresos, pendientes, productividad, reanalisis, tiempos
│   ├── ffqq/           # Equipos, resultados, métodos
│   ├── micro/          # Siembra, resultados
│   ├── stcc/
│   ├── str/            # Preanalisis, revisión
│   ├── estandares/
│   ├── doct/
│   ├── dt/
│   └── dg/
├── components/layout/  # AppShell, Sidebar, Header
└── lib/utils.ts
```

## Convenciones de Código

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `perf:`
- Sin atribución AI en commits — nunca Co-Authored-By ni "AI-generated"
- Path alias `@/` para imports — prohibidos imports relativos `../`
- Props y tipos definidos con interfaces TypeScript, no inline objects
- Sin `console.log` en código productivo

## Dev Task Board — ACTUALIZAR SIEMPRE

Archivo: `docs/dev-task-board.md`
Regla: actualizar estado de tasks en CADA commit que toque un módulo.
Estados: `[ ]` pendiente · `[-]` en progreso · `[x]` done · `[!]` deuda técnica

## Self-Improving Skills

### Cómo funciona
1. Cada skill tiene `learnings.md` (memoria) + `eval.json` (criterios de auto-evaluación)
2. Al ejecutarse: lee learnings → trabaja → se auto-evalúa → actualiza learnings
3. Con cada uso, el skill aprende de errores y refuerza patrones exitosos

### Skills del proyecto
| Skill | Trigger | Self-Improving |
|-------|---------|----------------|
| Ver `.atl/skill-registry.md` para lista completa | | |

### Protocolo compartido
`.claude/skills/_shared/self-improving-protocol.md`

## Engram Bootstrap

En la primera sesión trabajando con lef-frontend, Claude debe:
1. Leer este CLAUDE.md completo
2. Recuperar contexto: `mem_search("sdd-init/lef-frontend")`
3. Solo entonces comenzar a trabajar
