import type { Direction, GameState } from "./game.types";
import type { LevelDefinition } from "../../levels/domain/level.types";
import { moveBlocks } from "./move";
import { parseRules } from "./rule-parser";

export function createGame(level: LevelDefinition): GameState {
  const activeRules = parseRules(level.blocks);
  return { blocks: level.blocks, history: [], activeRules, status: "playing", moves: 0 };
}

export function moveGame(state: GameState, level: LevelDefinition, direction: Direction): GameState {
  const blocks = moveBlocks({ blocks: state.blocks, rules: state.activeRules, direction, width: level.width, height: level.height });
  if (blocks === state.blocks) return state;
  const activeRules = parseRules(blocks);
  return { blocks, activeRules, history: [...state.history, state.blocks], status: state.status, moves: state.moves + 1 };
}

export function undoGame(state: GameState): GameState {
  const previous = state.history.at(-1);
  if (!previous) return state;
  return { ...state, blocks: previous, activeRules: parseRules(previous), history: state.history.slice(0, -1), moves: Math.max(0, state.moves - 1) };
}
