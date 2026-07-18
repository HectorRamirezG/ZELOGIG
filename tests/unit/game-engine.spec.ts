import { expect, it, describe } from "vitest";
import { createGame, moveGame, undoGame, restartGame } from "../../src/features/game/domain/game-engine";
import { level001 } from "../../src/features/levels/data/level-001";

describe("Game Engine", () => {
  it("initializes level 1 in playing state with parsed rules", () => {
    const state = createGame(level001);
    expect(state.status).toBe("playing");
    expect(state.activeRules.some((rule) => rule.subject === "PLAYER" && rule.predicate === "YOU")).toBe(true);
    expect(state.activeRules.some((rule) => rule.subject === "DOOR" && rule.predicate === "OPEN")).toBe(true);
  });

  it("moves the player and updates the move count", () => {
    const state = createGame(level001);
    const next = moveGame(state, level001, "up");
    expect(next.moves).toBe(1);
    expect(next.blocks.some((block) => block.kind === "object" && block.noun === "PLAYER" && block.position.row === 2)).toBe(true);
  });

  it("recognizes win when the player reaches a WIN object", () => {
    const winningLevel = {
      schemaVersion: 1,
      id: "win-level",
      title: "Win Test",
      difficulty: 1,
      objective: "Alcanza el objeto WIN.",
      width: 5,
      height: 2,
      blocks: [
        { id: "player", kind: "object", noun: "PLAYER", position: { row: 1, column: 0 } },
        { id: "flag", kind: "object", noun: "FLAG", position: { row: 0, column: 0 } },
        { id: "w-player", kind: "word", wordKind: "noun", value: "PLAYER", position: { row: 1, column: 1 } },
        { id: "w-is-1", kind: "word", wordKind: "operator", value: "IS", position: { row: 1, column: 2 } },
        { id: "w-you", kind: "word", wordKind: "property", value: "YOU", position: { row: 1, column: 3 } },
        { id: "w-flag", kind: "word", wordKind: "noun", value: "FLAG", position: { row: 0, column: 2 } },
        { id: "w-is-2", kind: "word", wordKind: "operator", value: "IS", position: { row: 0, column: 3 } },
        { id: "w-win", kind: "word", wordKind: "property", value: "WIN", position: { row: 0, column: 4 } },
      ],
    };

    const state = createGame(winningLevel);
    const next = moveGame(state, winningLevel, "up");
    expect(next.status).toBe("won");
  });

  it("undoes a move and restores the previous state", () => {
    const state = createGame(level001);
    const moved = moveGame(state, level001, "up");
    const undone = undoGame(moved);
    expect(undone.moves).toBe(0);
    expect(undone.blocks).toEqual(state.blocks);
  });

  it("prevents undo when history is empty", () => {
    const state = createGame(level001);
    const undone = undoGame(state);
    expect(undone).toEqual(state);
  });

  it("handles PUSH rule: pushes movable blocks in chain", () => {
    const pushLevel = {
      schemaVersion: 1,
      id: "push-level",
      title: "Push Test",
      difficulty: 1,
      objective: "Empuja el bloque.",
      width: 5,
      height: 3,
      blocks: [
        { id: "player", kind: "object", noun: "PLAYER", position: { row: 1, column: 0 } },
        { id: "box", kind: "object", noun: "BOX", position: { row: 1, column: 1 } },
        { id: "w-player", kind: "word", wordKind: "noun", value: "PLAYER", position: { row: 0, column: 0 } },
        { id: "w-is-1", kind: "word", wordKind: "operator", value: "IS", position: { row: 0, column: 1 } },
        { id: "w-you", kind: "word", wordKind: "property", value: "YOU", position: { row: 0, column: 2 } },
        { id: "w-box", kind: "word", wordKind: "noun", value: "BOX", position: { row: 2, column: 0 } },
        { id: "w-is-2", kind: "word", wordKind: "operator", value: "IS", position: { row: 2, column: 1 } },
        { id: "w-push", kind: "word", wordKind: "property", value: "PUSH", position: { row: 2, column: 2 } },
      ],
    };

    const state = createGame(pushLevel);
    const next = moveGame(state, pushLevel, "right");

    const playerAfter = next.blocks.find((b) => b.kind === "object" && b.noun === "PLAYER");
    const boxAfter = next.blocks.find((b) => b.kind === "object" && b.noun === "BOX");

    expect(playerAfter?.position.column).toBe(1);
    expect(boxAfter?.position.column).toBe(2);
  });

  it("prevents movement into STOP blocks", () => {
    const stopLevel = {
      schemaVersion: 1,
      id: "stop-level",
      title: "Stop Test",
      difficulty: 1,
      objective: "No puedes atravesar el muro.",
      width: 5,
      height: 3,
      blocks: [
        { id: "player", kind: "object", noun: "PLAYER", position: { row: 1, column: 0 } },
        { id: "wall", kind: "object", noun: "WALL", position: { row: 1, column: 1 } },
        { id: "w-player", kind: "word", wordKind: "noun", value: "PLAYER", position: { row: 0, column: 0 } },
        { id: "w-is-1", kind: "word", wordKind: "operator", value: "IS", position: { row: 0, column: 1 } },
        { id: "w-you", kind: "word", wordKind: "property", value: "YOU", position: { row: 0, column: 2 } },
        { id: "w-wall", kind: "word", wordKind: "noun", value: "WALL", position: { row: 2, column: 0 } },
        { id: "w-is-2", kind: "word", wordKind: "operator", value: "IS", position: { row: 2, column: 1 } },
        { id: "w-stop", kind: "word", wordKind: "property", value: "STOP", position: { row: 2, column: 2 } },
      ],
    };

    const state = createGame(stopLevel);
    const next = moveGame(state, stopLevel, "right");

    const playerAfter = next.blocks.find((b) => b.kind === "object" && b.noun === "PLAYER");
    expect(playerAfter?.position.column).toBe(0);
    expect(next.moves).toBe(0);
  });

  it("allows passage through OPEN blocks", () => {
    const openLevel = {
      schemaVersion: 1,
      id: "open-level",
      title: "Open Test",
      difficulty: 1,
      objective: "Atraviesa la puerta abierta.",
      width: 5,
      height: 3,
      blocks: [
        { id: "player", kind: "object", noun: "PLAYER", position: { row: 1, column: 0 } },
        { id: "door", kind: "object", noun: "DOOR", position: { row: 1, column: 1 } },
        { id: "w-player", kind: "word", wordKind: "noun", value: "PLAYER", position: { row: 0, column: 0 } },
        { id: "w-is-1", kind: "word", wordKind: "operator", value: "IS", position: { row: 0, column: 1 } },
        { id: "w-you", kind: "word", wordKind: "property", value: "YOU", position: { row: 0, column: 2 } },
        { id: "w-door", kind: "word", wordKind: "noun", value: "DOOR", position: { row: 2, column: 0 } },
        { id: "w-is-2", kind: "word", wordKind: "operator", value: "IS", position: { row: 2, column: 1 } },
        { id: "w-open", kind: "word", wordKind: "property", value: "OPEN", position: { row: 2, column: 2 } },
      ],
    };

    const state = createGame(openLevel);
    const next = moveGame(state, openLevel, "right");

    const playerAfter = next.blocks.find((b) => b.kind === "object" && b.noun === "PLAYER");
    expect(playerAfter?.position.column).toBe(1);
    expect(next.moves).toBe(1);
  });

  it("does not move if hitting boundary", () => {
    const state = createGame(level001);
    const playerStart = state.blocks.find((b) => b.kind === "object" && b.noun === "PLAYER");

    const leftNext = moveGame(state, level001, "left");
    const playerAfterLeft = leftNext.blocks.find((b) => b.kind === "object" && b.noun === "PLAYER");

    expect(playerAfterLeft?.position).toEqual(playerStart?.position);
    expect(leftNext.moves).toBe(0);
  });

  it("restarts the game to initial state", () => {
    const state = createGame(level001);
    const moved = moveGame(state, level001, "up");
    const restarted = restartGame(level001);

    expect(restarted.moves).toBe(0);
    expect(restarted.blocks).toEqual(state.blocks);
    expect(restarted.history).toEqual([]);
  });

  it("does not save move to history if nothing changed", () => {
    const state = createGame(level001);
    const invalidMove = moveGame(state, level001, "left");

    expect(invalidMove.history.length).toBe(0);
  });
});
