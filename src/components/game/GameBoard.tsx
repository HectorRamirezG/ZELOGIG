"use client";

import type { Block, Direction } from "../../features/game/domain/game.types";

interface Props {
  readonly blocks: readonly Block[];
  readonly width: number;
  readonly height: number;
  readonly onMove: (direction: Direction) => void;
}

export function GameBoard({ blocks, width, height, onMove }: Props) {
  const cells = Array.from({ length: width * height }, (_, index) => ({ row: Math.floor(index / width), column: index % width }));
  return (
    <section aria-label="Tablero de juego" className="game-board" style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))` }}
      tabIndex={0} onKeyDown={(event) => {
        const directions: Record<string, Direction> = { ArrowUp: "up", w: "up", ArrowDown: "down", s: "down", ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right" };
        const direction = directions[event.key]; if (direction) { event.preventDefault(); onMove(direction); }
      }}>
      {cells.map((cell) => {
        const inside = blocks.filter((block) => block.position.row === cell.row && block.position.column === cell.column);
        return <div className="game-cell" key={`${cell.row}:${cell.column}`}>{inside.map((block) =>
          <span className={`game-block game-block--${block.kind}`} key={block.id}>{block.kind === "word" ? block.value : block.noun}</span>
        )}</div>;
      })}
    </section>
  );
}
