import type { LevelDefinition } from "../domain/level.types";

export const level005: LevelDefinition = {
  schemaVersion: 1, id: "level-005", title: "Meaning Changes", difficulty: 4,
  width: 9, height: 7, objective: "Combina las reglas aprendidas para alcanzar WIN.",
  blocks: [
    { id: "player", kind: "object", noun: "PLAYER", position: { row: 5, column: 1 } },
    { id: "goal", kind: "object", noun: "GOAL", position: { row: 1, column: 7 } },
    { id: "player-word", kind: "word", wordKind: "noun", value: "PLAYER", position: { row: 0, column: 1 } },
    { id: "is-player", kind: "word", wordKind: "operator", value: "IS", position: { row: 0, column: 2 } },
    { id: "you", kind: "word", wordKind: "property", value: "YOU", position: { row: 0, column: 3 } },
    { id: "goal-word", kind: "word", wordKind: "noun", value: "GOAL", position: { row: 3, column: 3 } },
    { id: "is-goal", kind: "word", wordKind: "operator", value: "IS", position: { row: 3, column: 4 } },
    { id: "win", kind: "word", wordKind: "property", value: "WIN", position: { row: 4, column: 5 } }
  ]
};
