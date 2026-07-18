"use client";

import type { Block, Direction } from "../../features/game/domain/game.types";

interface Props {
  readonly blocks: readonly Block[];
  readonly width: number;
  readonly height: number;
  readonly onMove: (direction: Direction) => void;
  readonly descriptionId?: string;
}

export function GameBoard({ blocks, width, height, onMove, descriptionId }: Props) {
  const cells = Array.from({ length: width * height }, (_, index) => ({ row: Math.floor(index / width), column: index % width }));

  return (
    <section
      role="grid"
      aria-label="Tablero de juego"
      aria-describedby={descriptionId}
      className="game-board"
      style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))` }}
      tabIndex={0}
      onKeyDown={(event) => {
        const directions: Record<string, Direction> = {
          ArrowUp: "up", w: "up", W: "up",
          ArrowDown: "down", s: "down", S: "down",
          ArrowLeft: "left", a: "left", A: "left",
          ArrowRight: "right", d: "right", D: "right",
        };
        const direction = directions[event.key];
        if (direction) {
          event.preventDefault();
          onMove(direction);
        }
      }}
    >
      {cells.map((cell) => {
        const inside = blocks.filter((block) => block.position.row === cell.row && block.position.column === cell.column);
        return (
          <div className="game-cell" role="gridcell" key={`${cell.row}:${cell.column}`}>
            {inside.map((block) => {
              const isWord = block.kind === "word";
              const label = isWord ? `Palabra ${block.value}` : `Objeto ${block.noun}`;
              let blockClass = isWord ? "game-block game-block--word" : "game-block game-block--object";

              if (isWord) {
                blockClass += ` game-block--${block.wordKind}`;
                if (block.wordKind === "property") {
                  const propertyClass = block.value.toLowerCase();
                  blockClass += ` game-block--property-${propertyClass}`;
                }
              }

              return (
                <span className={blockClass} key={block.id} aria-label={label}>
                  {isWord ? block.value : block.noun}
                </span>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
