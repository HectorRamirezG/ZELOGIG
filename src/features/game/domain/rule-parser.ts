import type { ActiveRule, Block, WordBlock } from "./game.types";

const isWord = (block: Block): block is WordBlock => block.kind === "word";

export function parseRules(blocks: readonly Block[]): readonly ActiveRule[] {
  const words = blocks.filter(isWord);
  const byPosition = new Map(words.map((word) => [`${word.position.row}:${word.position.column}`, word]));
  const rules: ActiveRule[] = [];

  for (const subject of words.filter((word) => word.wordKind === "noun")) {
    for (const orientation of ["horizontal", "vertical"] as const) {
      const rowStep = orientation === "vertical" ? 1 : 0;
      const columnStep = orientation === "horizontal" ? 1 : 0;
      const operator = byPosition.get(`${subject.position.row + rowStep}:${subject.position.column + columnStep}`);
      const predicate = byPosition.get(`${subject.position.row + rowStep * 2}:${subject.position.column + columnStep * 2}`);

      if (operator?.wordKind !== "operator" || operator.value !== "IS" || !predicate) continue;
      if (predicate.wordKind !== "property" && predicate.wordKind !== "noun") continue;

      rules.push({ subject: subject.value, operator: "IS", predicate: predicate.value, orientation });
    }
  }

  return rules;
}
