# Self-Improving Skill Protocol

Skills que siguen este protocolo aprenden de cada ejecución. Mantienen learnings persistentes,
se auto-evalúan contra criterios definidos, y evolucionan su comportamiento con el tiempo.

## Required Files

Cada skill DEBE tener junto a su SKILL.md:

| File | Purpose |
|------|---------|
| `learnings.md` | Memoria persistente — qué funciona, qué no, patrones encontrados |
| `eval.json` | Criterios binarios de auto-evaluación |

## Execution Loop

### Phase 1 — Load (antes de hacer cualquier trabajo)

1. Leer `learnings.md` del directorio del skill
2. Parsear secciones relevantes a la tarea actual
3. Aplicar learnings como constraints de ejecución — entradas `[CRITICAL]` son blockers duros, el resto son guidelines

### Phase 2 — Execute

4. Ejecutar la tarea principal definida en SKILL.md
5. Usar learnings como contexto activo durante toda la ejecución
6. Si un learning contradice el request explícito del usuario, seguir al usuario — pero flagear el conflicto

### Phase 3 — Self-Evaluate

7. Después de la ejecución, evaluar output contra CADA criterio en `eval.json`
8. Por cada criterio: **PASS** o **FAIL**
9. Reportar resumen de evaluación en tabla compacta:

```
## Self-Evaluation
| Eval | Result |
|------|--------|
| uses_typescript | ✅ |
| uses_tailwind   | ✅ |
| props_typed     | ❌ — props pasadas como inline object |
```

### Phase 4 — Learn

10. **Si CUALQUIER eval falla:**
    - Identificar causa raíz (no solo el síntoma)
    - Agregar entrada a `learnings.md` bajo la sección apropiada
    - Formato: `- [YYYY-MM-DD] Qué pasó y POR QUÉ → qué hacer en su lugar`
    - Si el mismo learning ya existe, incrementar su hit count en vez de duplicar

11. **Si TODOS los evals pasan Y el approach fue no-obvio:**
    - Agregar a sección "What works" para reforzar el patrón

12. **Pedir feedback** (UNA línea, no bloqueante):
    - `"Feedback? 👍/👎/skip"`
    - 👎 → preguntar qué estuvo mal, agregar a "What to avoid" con razón del usuario
    - 👍 → si el approach fue nuevo, reforzar en "What works"
    - skip o sin respuesta → continuar sin actualizar

## learnings.md Format

```markdown
# Learnings — {Nombre del Skill}

Last updated: YYYY-MM-DD
Total runs: N | Pass rate: N%

## What works
- [YYYY-MM-DD] Descripción del approach validado y POR QUÉ funciona (hits: N)

## What to avoid
- [YYYY-MM-DD] Descripción de qué falló y causa raíz (hits: N)
- [YYYY-MM-DD] [CRITICAL] Hard blocker — nunca hacer esto. Reason: ...

## Patterns
- [YYYY-MM-DD] Nombre del patrón recurrente: cuándo aplicarlo, cómo se ve

## Open questions
- [YYYY-MM-DD] Pregunta sin resolver — necesita más datos para decidir
```

### Reglas de higiene de learnings

- **Máximo 30 entradas** en total entre secciones. Cuando está lleno: mergear similares o eliminar de menor hit count.
- **Promover** entradas con 3+ hits de "What works/avoid" a "Patterns"
- **Archivar** entradas > 90 días con 0 hits después de la creación inicial
- **Nunca eliminar** entradas `[CRITICAL]` automáticamente — solo el usuario puede hacerlo

## eval.json Format

```json
{
  "evals": [
    {
      "name": "snake_case_identifier",
      "description": "Assertion clara y medible que el LLM puede auto-verificar",
      "type": "binary",
      "severity": "critical | warning",
      "auto_learn": true
    }
  ]
}
```

| Field | Values | Significado |
|-------|--------|-------------|
| `severity` | `critical` | Fail bloquea output — DEBE corregirse antes de entregar |
| `severity` | `warning` | Se loguea como learning, output igual se entrega |
| `auto_learn` | `true` | Auto-append a learnings.md en fail (default) |
| `auto_learn` | `false` | Solo loguear, no actualizar learnings |

### Cómo escribir buenos evals

- Cada eval DEBE ser **verificable leyendo el output** — sin checks externos
- Ser ESPECÍFICO: "Usa TypeScript interfaces para props" no "El código está bien tipado"
- Incluir criterios positivos (debe tener) y negativos (no debe tener)
- Empezar con 5-8 evals, agregar más a medida que emergen patrones de failures
- Evals `critical` deben ser raros (2-3 máx)

## Integration Template

Agregar este bloque a cualquier SKILL.md para hacerlo auto-mejorante:

```markdown
## Self-Improving

Este skill sigue el [Self-Improving Protocol](.claude/skills/_shared/self-improving-protocol.md).

Antes de empezar: leer `learnings.md` en el directorio de este skill.
Al terminar: auto-evaluar contra `eval.json`, actualizar learnings, pedir feedback.
```

## Engram Integration (Opcional pero recomendado)

Si engram está disponible, TAMBIÉN persistir learnings significativos:

```
mem_save(
  title: "skill-learning/{nombre-skill}",
  topic_key: "skill-learning/{nombre-skill}",
  type: "pattern",
  content: "Nuevo learning de {nombre-skill}: ..."
)
```

## Métricas (en el header de learnings.md)

- **Total runs**: incrementar en cada ejecución
- **Pass rate**: (runs donde TODOS los evals pasaron) / total runs × 100
- Actualizar en cada run, aunque no cambien los learnings

Un skill con < 70% pass rate después de 10+ runs necesita revisar sus evals o su approach.

## Cómo hacer cualquier skill auto-mejorante

1. Agregar `learnings.md` al directorio del skill (copiar template de arriba)
2. Agregar `eval.json` con 5-10 criterios binarios específicos al output de ESE skill
3. Agregar el bloque `## Self-Improving` al SKILL.md del skill
4. Seedear `learnings.md` con convenciones conocidas del proyecto
5. Ejecutar el skill — aprende desde el primer run
