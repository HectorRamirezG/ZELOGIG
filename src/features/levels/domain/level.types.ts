import type { Block } from "../../game/domain/game.types";

export interface LevelDefinition {
  readonly schemaVersion: 1;
  readonly id: string;
  readonly title: string;
  readonly difficulty: 1 | 2 | 3 | 4 | 5;
  readonly width: number;
  readonly height: number;
  readonly objective: string;
  readonly blocks: readonly Block[];
}
