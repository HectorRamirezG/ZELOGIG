import type { LevelDefinition } from "../domain/level.types";

export const level004: LevelDefinition = {
  schemaVersion: 1, id: "level-004", title: "Wall Is Stop", difficulty: 3,
  width: 8, height: 6, objective: "Cambia la regla para atravesar el camino.",
  blocks: [
    { id: "player", kind: "object", noun: "PLAYER", position: { row: 4, column: 1 } },
    { id: "wall-1", kind: "object", noun: "WALL", position: { row: 3, column: 4 } },
    { id: "wall-2", kind: "object", noun: "WALL", position: { row: 4, column: 4 } },
    { id: "player-word", kind: "word", wordKind: "noun", value: "PLAYER", position: { row: 0, column: 1 } },
    { id: "is-player", kind: "word", wordKind: "operator", value: "IS", position: { row: 0, column: 2 } },
    { id: "you", kind: "word", wordKind: "property", value: "YOU", position: { row: 0, column: 3 } },
    { id: "wall-word", kind: "word", wordKind: "noun", value: "WALL", position: { row: 1, column: 1 } },
    { id: "is-wall", kind: "word", wordKind: "operator", value: "IS", position: { row: 1, column: 2 } },
    { id: "stop", kind: "word", wordKind: "property", value: "STOP", position: { row: 1, column: 3 } }
  ]
};
