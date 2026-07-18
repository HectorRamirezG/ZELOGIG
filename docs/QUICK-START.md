# Guía Rápida: Estructura del Código

## Capas (arquitectura limpia)

```
src/
├── app/                     # Next.js App Router
│   └── page.tsx            # Única página (home) - componente cliente que coordina juego
│
├── components/              # Componentes visuales de React
│   ├── a11y/               # Accesibilidad
│   │   └── SpatialAnnouncer.tsx
│   └── game/
│       ├── GameBoard.tsx    # Grid 2D, renderiza bloques (puro, solo recibe props)
│       └── SwipeSurface.tsx # Detector de gestos táctiles
│
├── features/
│   ├── game/
│   │   ├── domain/          # ⭐ Motor puro (sin React, sin navegador)
│   │   │   ├── game-engine.ts       # createGame, moveGame, undoGame, restartGame
│   │   │   ├── move.ts              # moveBlocks: lógica de movimiento 2D
│   │   │   ├── rule-parser.ts       # parseRules: detecta reglas de palabras
│   │   │   └── game.types.ts        # Tipos TS (Block, GameState, Direction, etc.)
│   │   └── presentation/   # (futuro) Convertidores entre dominio y UI
│   │
│   ├── levels/
│   │   ├── data/
│   │   │   ├── level-001.ts         # Nivel 1: "You Are Here" - DOOR IS OPEN
│   │   │   ├── level-002.ts
│   │   │   ├── level-003.ts
│   │   │   ├── level-004.ts
│   │   │   ├── level-005.ts
│   │   │   └── index.ts             # Exporta todos los niveles
│   │   └── domain/
│   │       └── level.types.ts       # Definición de LevelDefinition
│   │
│   └── progress/
│       └── local-progress.ts        # readProgress, completeLevel (localStorage)
│
├── styles/
│   └── globals.css          # Tailwind + tokens Soft-Tech personalizados
│
└── [no usar]                # Supabase solo en /infraestructura, no en /src

tests/
├── unit/
│   ├── game-engine.spec.ts  # 14 tests: movimiento, reglas, PUSH, STOP, OPEN, undo
│   └── rule-parser.spec.ts  # Tests del parser de reglas
├── integration/             # (futuro)
└── e2e/                     # (futuro)

supabase/
├── migrations/              # SQL migrations (futuro)
└── ...
```

## Flujos principales

### Flujo de un movimiento
```
onClick o onKeyDown (input)
  → onMove(direction) en page.tsx
    → moveGame(state, level, direction) [puro, dominio]
      → moveBlocks(...) [calcula nueva posición]
      → parseRules(blocks) [detecta reglas activas]
      → evaluateState() [verifica victoria]
      → return GameState
    → setGameState(newState)
    → setAnnouncement(text)
  → GameBoard re-renderiza
```

### Flujo de un nivel nuevol
```
setSelectedLevelId(id)
  → useEffect([activeLevel.id])
    → setGameState(createGame(activeLevel))
    → setAnnouncement("Nivel X...")
```

### Flujo de progreso
```
Nivel completado (status === "won")
  → useEffect([gameState.status])
    → completeLevel(levelId)
      → localStorage update
    → readProgress() [nuevo estado]
```

## Qué cambia durante un movimiento

```typescript
// Input
const direction = "up"

// Dominio: calcula todo sin efectos
const newBlocks = moveBlocks({ blocks, rules, direction, width, height })
const newRules = parseRules(newBlocks)
const won = hasWon(newState)

// Resultado inmutable
const newState = {
  blocks: newBlocks,
  activeRules: newRules,
  status: won ? "won" : "playing",
  moves: (no cambio? currentMoves : currentMoves + 1),
  history: (no cambio? [...] : [...history, oldBlocks])
}

// UI re-renderiza (ReactDOM update)
setGameState(newState)

// A11y anouncement
setAnnouncement(`Moviste ${direction}` o `Movimiento inválido`)
```

## Reglas (dominio solamente)

```typescript
type Property = "YOU" | "PUSH" | "STOP" | "WIN" | "OPEN"

// Una regla válida se forma así:
// NOUN IS PROPERTY   o   NOUN IS NOUN
// ejemplo: PLAYER IS YOU, DOOR IS OPEN, WALL IS STOP

// Durante moveGame:
// 1. Busca objetos con YOU → son movibles
// 2. Intenta mover en dirección
// 3. Si hay ocurrencia con PUSH → empuja (recursivo)
// 4. Si hay ocurrencia con STOP → detiene
// 5. Si hay ocurrencia con OPEN y el jugador es YOU → atraviesa
// 6. Si hay WIN en misma celda que YOU → victoria
```

## Cómo agregar un nuevo nivel

```typescript
// src/features/levels/data/level-006.ts
export const level006: LevelDefinition = {
  schemaVersion: 1,
  id: "level-006",
  title: "Nuevo Nivel",
  difficulty: 2,
  objective: "Completa el desafío.",
  width: 7,
  height: 5,
  blocks: [
    { id: "player", kind: "object", noun: "PLAYER", position: { row: 2, column: 1 } },
    // ... más bloques
  ]
};

// Luego: src/features/levels/data/index.ts
// export const levels = [..., level006] as const;
```

## Cómo agregar una nueva regla (no hacer sin RFC)

1. Agregar a `type Property` en `game.types.ts`
2. Lógica en `move.ts` (función `canMove`)
3. Tests en `game-engine.spec.ts`
4. Styling en `globals.css` (`.game-block--property-NEWNAME`)
5. RFC aprobada antes de publicar

## Debugging

### Para ver reglas activas
```typescript
// En navegador: F12 → Console
gameState.activeRules.forEach(r => console.log(`${r.subject} IS ${r.predicate}`))
```

### Para ver bloques en una posición
```typescript
const cellKey = "2:3"
gameState.blocks.filter(b => `${b.position.row}:${b.position.column}` === cellKey)
```

### Para simular un movimiento
```typescript
const state = createGame(level001)
const moved = moveGame(state, level001, "up")
console.log(moved)
```

## Antes de publicar cambios

```powershell
# Validación local
npm test -- --run       # Todos los tests verde
npm run typecheck       # Sin errores TS
npm run build           # Compila sin warnings

# Luego: git commit y push
```

## Notas importantes

- ⚠️ Nunca importes React en `src/features/game/domain/`
- ⚠️ Las reglas del dominio son deterministas: mismo input = mismo output
- ⚠️ Los bloques son inmutables: siempre creas nuevos arrays/objetos
- ⚠️ El historial solo crece si hubo cambio real (movimiento válido)
- ✅ Prueba cada regla con un test antes de considerarla completa
