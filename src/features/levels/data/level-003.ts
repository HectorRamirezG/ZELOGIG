import type { LevelDefinition } from "../domain/level.types";

export const level003: LevelDefinition = {
  schemaVersion: 1, id: "level-003", title: "Push the Key", difficulty: 2,
  width: 8, height: 6, objective: "Usa KEY IS PUSH para mover la llave.",
  blocks: [
    { id: "player", kind: "object", noun: "PLAYER", position: { row: 4, column: 1 } },
    { id: "key", kind: "object", noun: "KEY", position: { row: 3, column: 4 } },
    { id: "player-word", kind: "word", wordKind: "noun", value: "PLAYER", position: { row: 0, column: 1 } },
    { id: "is-player", kind: "word", wordKind: "operator", value: "IS", position: { row: 0, column: 2 } },
    { id: "you", kind: "word", wordKind: "property", value: "YOU", position: { row: 0, column: 3 } },
    { id: "key-word", kind: "word", wordKind: "noun", value: "KEY", position: { row: 1, column: 1 } },
    { id: "is-key", kind: "word", wordKind: "operator", value: "IS", position: { row: 1, column: 2 } },
    { id: "push", kind: "word", wordKind: "property", value: "PUSH", position: { row: 2, column: 3 } }
  ]
};
