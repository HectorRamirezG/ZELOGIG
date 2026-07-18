import type { ActiveRule, Block, Direction, Position } from "./game.types";

const delta: Record<Direction, Position> = {
  up: { row: -1, column: 0 }, down: { row: 1, column: 0 },
  left: { row: 0, column: -1 }, right: { row: 0, column: 1 },
};

const key = (position: Position) => `${position.row}:${position.column}`;
const hasRule = (rules: readonly ActiveRule[], subject: string, predicate: string) =>
  rules.some((rule) => rule.subject === subject && rule.predicate === predicate);

export interface MoveInput {
  readonly blocks: readonly Block[];
  readonly rules: readonly ActiveRule[];
  readonly direction: Direction;
  readonly width: number;
  readonly height: number;
}

export function moveBlocks(input: MoveInput): readonly Block[] {
  const step = delta[input.direction];
  const byCell = new Map<string, Block[]>();
  for (const block of input.blocks) byCell.set(key(block.position), [...(byCell.get(key(block.position)) ?? []), block]);

  const movable = input.blocks.filter((block) => block.kind === "object" && hasRule(input.rules, block.noun, "YOU"));
  if (movable.length === 0) return input.blocks;

  const updates = new Map<string, Position>();
  const canMove = (block: Block, visiting = new Set<string>()): boolean => {
    if (visiting.has(block.id)) return false;
    visiting.add(block.id);

    const target = { row: block.position.row + step.row, column: block.position.column + step.column };
    if (target.row < 0 || target.column < 0 || target.row >= input.height || target.column >= input.width) return false;

    const occupants = byCell.get(key(target)) ?? [];
    for (const occupant of occupants) {
      const pushable = occupant.kind === "word" || (occupant.kind === "object" && hasRule(input.rules, occupant.noun, "PUSH"));
      const stopping = occupant.kind === "object" && hasRule(input.rules, occupant.noun, "STOP");
      const openPassable = occupant.kind === "object" && hasRule(input.rules, occupant.noun, "OPEN") && hasRule(input.rules, block.noun, "YOU");

      if (openPassable) continue;
      if (stopping && !pushable) return false;
      if (pushable && !canMove(occupant, new Set(visiting))) return false;
    }

    updates.set(block.id, target);
    return true;
  };

  let changed = false;
  for (const block of movable) changed = canMove(block) || changed;
  if (!changed) return input.blocks;

  return input.blocks.map((block) => updates.has(block.id) ? { ...block, position: updates.get(block.id)! } : block);
}
