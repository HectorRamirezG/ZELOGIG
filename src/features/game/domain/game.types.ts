export type Direction = "up" | "down" | "left" | "right";
export type Property = "YOU" | "PUSH" | "STOP" | "WIN" | "OPEN";
export type WordKind = "noun" | "operator" | "property";

export interface Position { readonly row: number; readonly column: number; }
export interface BaseBlock { readonly id: string; readonly position: Position; }
export interface ObjectBlock extends BaseBlock { readonly kind: "object"; readonly noun: string; }
export interface WordBlock extends BaseBlock { readonly kind: "word"; readonly wordKind: WordKind; readonly value: string; }
export type Block = ObjectBlock | WordBlock;

export interface ActiveRule {
  readonly subject: string;
  readonly operator: "IS";
  readonly predicate: string;
  readonly orientation: "horizontal" | "vertical";
}

export interface GameState {
  readonly blocks: readonly Block[];
  readonly history: readonly (readonly Block[])[];
  readonly activeRules: readonly ActiveRule[];
  readonly status: "playing" | "won";
  readonly moves: number;
}
