import type { ActiveRule, Block } from "../../features/game/domain/game.types";

interface Props { readonly blocks: readonly Block[]; readonly rules: readonly ActiveRule[]; }

export function SpatialAnnouncer({ blocks, rules }: Props) {
  const player = blocks.find((block) => block.kind === "object" && block.noun === "PLAYER");
  const message = player
    ? `Jugador en fila ${player.position.row + 1}, columna ${player.position.column + 1}. Reglas activas: ${rules.map((rule) => `${rule.subject} ${rule.operator} ${rule.predicate}`).join(", ") || "ninguna"}.`
    : "No se encontro al jugador.";
  return <p className="sr-only" aria-live="polite">{message}</p>;
}
