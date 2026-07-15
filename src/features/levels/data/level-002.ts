import type { LevelDefinition } from "../domain/level.types";

export const level002: LevelDefinition = {
  schemaVersion: 1, id: "level-002", title: "Open the Way", difficulty: 1,
  width: 7, height: 5, objective: "Completa DOOR IS OPEN.",
  blocks: [
    { id: "player", kind: "object", noun: "PLAYER", position: { row: 3, column: 1 } },
    { id: "door", kind: "object", noun: "DOOR", position: { row: 2, column: 5 } },
    { id: "player-word", kind: "word", wordKind: "noun", value: "PLAYER", position: { row: 0, column: 1 } },
    { id: "is-player", kind: "word", wordKind: "operator", value: "IS", position: { row: 0, column: 2 } },
    { id: "you", kind: "word", wordKind: "property", value: "YOU", position: { row: 0, column: 3 } },
    { id: "door-word", kind: "word", wordKind: "noun", value: "DOOR", position: { row: 3, column: 3 } },
    { id: "is-door", kind: "word", wordKind: "operator", value: "IS", position: { row: 3, column: 4 } },
    { id: "open", kind: "word", wordKind: "property", value: "OPEN", position: { row: 2, column: 4 } }
  ]
};
