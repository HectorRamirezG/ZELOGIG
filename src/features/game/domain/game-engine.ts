import type { Block, Direction, GameState } from "./game.types";
import type { LevelDefinition } from "../../levels/domain/level.types";
import { moveBlocks } from "./move";
import { parseRules } from "./rule-parser";

function hasWon(state: GameState): boolean {
  const youSubjects = state.activeRules.filter((rule) => rule.predicate === "YOU").map((rule) => rule.subject);
  if (youSubjects.length === 0) return false;

  const winSubjects = state.activeRules.filter((rule) => rule.predicate === "WIN").map((rule) => rule.subject);
  if (winSubjects.length === 0) return false;

  const positions = new Map<string, readonly string[]>();
  for (const block of state.blocks) {
    if (block.kind !== "object") continue;
    const cellKey = `${block.position.row}:${block.position.column}`;
    const nouns = [...(positions.get(cellKey) ?? []), block.noun];
    positions.set(cellKey, nouns);
  }

  for (const nouns of positions.values()) {
    const hasYou = nouns.some((noun) => youSubjects.includes(noun));
    const hasWin = nouns.some((noun) => winSubjects.includes(noun));
    if (hasYou && hasWin) return true;
  }

  return false;
}

function hasMeaningfulChange(previousBlocks: readonly Block[], nextBlocks: readonly Block[]): boolean {
  if (previousBlocks.length !== nextBlocks.length) return true;
  return previousBlocks.some((block, index) => {
    const nextBlock = nextBlocks[index];
    return block.position.row !== nextBlock.position.row || block.position.column !== nextBlock.position.column;
  });
}

function evaluateState(state: GameState): GameState {
  const status = hasWon(state) ? "won" : "playing";
  return status === state.status ? state : { ...state, status };
}

export function createGame(level: LevelDefinition): GameState {
  const activeRules = parseRules(level.blocks);
  return evaluateState({ blocks: level.blocks, history: [], activeRules, status: "playing", moves: 0 });
}

export function moveGame(state: GameState, level: LevelDefinition, direction: Direction): GameState {
  if (state.status === "won") return state;

  const blocks = moveBlocks({ blocks: state.blocks, rules: state.activeRules, direction, width: level.width, height: level.height });
  if (!hasMeaningfulChange(state.blocks, blocks)) return state;

  const activeRules = parseRules(blocks);
  return evaluateState({ blocks, activeRules, history: [...state.history, state.blocks], status: state.status, moves: state.moves + 1 });
}

export function undoGame(state: GameState): GameState {
  const previous = state.history.at(-1);
  if (!previous) return state;
  const nextState = { ...state, blocks: previous, activeRules: parseRules(previous), history: state.history.slice(0, -1), moves: Math.max(0, state.moves - 1) };
  return evaluateState(nextState);
}

export function restartGame(level: LevelDefinition): GameState {
  return createGame(level);
}
