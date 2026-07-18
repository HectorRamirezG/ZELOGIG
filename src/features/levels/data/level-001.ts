import type { LevelDefinition } from "../domain/level.types";

export const level001: LevelDefinition = {
  schemaVersion: 1, id: "level-001", title: "You Are Here", difficulty: 1,
  width: 7, height: 5, objective: "Forma DOOR IS OPEN y llega a la salida.",
  blocks: [
    { id: "player", kind: "object", noun: "PLAYER", position: { row: 3, column: 1 } },
    { id: "door", kind: "object", noun: "DOOR", position: { row: 2, column: 5 } },
    { id: "w-player", kind: "word", wordKind: "noun", value: "PLAYER", position: { row: 1, column: 1 } },
    { id: "w-is-1", kind: "word", wordKind: "operator", value: "IS", position: { row: 1, column: 2 } },
    { id: "w-you", kind: "word", wordKind: "property", value: "YOU", position: { row: 1, column: 3 } },
    { id: "w-door", kind: "word", wordKind: "noun", value: "DOOR", position: { row: 3, column: 3 } },
    { id: "w-is-2", kind: "word", wordKind: "operator", value: "IS", position: { row: 3, column: 4 } },
    { id: "w-open", kind: "word", wordKind: "property", value: "OPEN", position: { row: 3, column: 5 } }
  ]
};
