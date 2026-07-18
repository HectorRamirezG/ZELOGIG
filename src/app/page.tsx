"use client";

import { useEffect, useState } from "react";
import { GameBoard } from "../components/game/GameBoard";
import { SwipeSurface } from "../components/game/SwipeSurface";
import { createGame, moveGame, restartGame, undoGame } from "../features/game/domain/game-engine";
import { levels } from "../features/levels/data";
import { completeLevel, readProgress } from "../features/progress/local-progress";
import type { Direction } from "../features/game/domain/game.types";

const defaultLevel = levels[0];

export default function HomePage() {
  const [selectedLevelId, setSelectedLevelId] = useState(defaultLevel.id);
  const [gameState, setGameState] = useState(() => createGame(defaultLevel));
  const [progress, setProgress] = useState({ completedLevelIds: [] as string[] });
  const [announcement, setAnnouncement] = useState("Usa flechas, WASD o desliza para mover.");

  const activeLevel = levels.find((level) => level.id === selectedLevelId) ?? defaultLevel;
  const completed = progress.completedLevelIds.includes(activeLevel.id);
  const activeIndex = levels.findIndex((level) => level.id === activeLevel.id);
  const nextLevel = activeIndex >= 0 && activeIndex < levels.length - 1 ? levels[activeIndex + 1] : null;

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  useEffect(() => {
    setGameState(createGame(activeLevel));
    setAnnouncement(`Nivel ${activeLevel.title}. ${activeLevel.objective}`);
  }, [activeLevel.id]);

  useEffect(() => {
    if (gameState.status === "won" && !completed) {
      setProgress(completeLevel(activeLevel.id));
      setAnnouncement(`¡Nivel completado! Ahora puedes volver a jugarlo o elegir otro.`);
    }
  }, [activeLevel.id, completed, gameState.status]);

  const onMove = (direction: Direction) => {
    if (gameState.status === "won") {
      setAnnouncement("Nivel completado. Reinicia o selecciona otro nivel.");
      return;
    }

    setGameState((currentState) => {
      const nextState = moveGame(currentState, activeLevel, direction);
      if (nextState === currentState) {
        setAnnouncement("Movimiento inválido.");
        return currentState;
      }
      setAnnouncement(`Moviste ${direction}.`);
      return nextState;
    });
  };

  const onUndo = () => {
    setGameState((currentState) => {
      const previousState = undoGame(currentState);
      if (previousState === currentState) {
        setAnnouncement("Nada que deshacer.");
        return currentState;
      }
      setAnnouncement("Deshacer.");
      return previousState;
    });
  };

  const onRestart = () => {
    setGameState(restartGame(activeLevel));
    setAnnouncement("Nivel reiniciado.");
  };

  const onNextLevel = () => {
    if (nextLevel) {
      setSelectedLevelId(nextLevel.id);
    }
  };

  const statusVariant = gameState.status === "won"
    ? "success"
    : announcement.toLowerCase().includes("inválido")
      ? "warning"
      : "info";

  const statusClassName = [
    "game-status",
    statusVariant === "success" ? "game-status--success" : "",
    statusVariant === "warning" ? "game-status--warning" : "",
    statusVariant === "info" ? "game-status--info" : "",
  ].join(" ");

  const boardDescription = `Tablero de ${activeLevel.width} por ${activeLevel.height}. ${gameState.activeRules.length} reglas activas. ${gameState.moves} movimientos.`;

  return (
    <main className="home-shell">
      <section className="hero" aria-label="Bienvenida a ZelogiG">
        <div className="hero-intro">
          <div>
            <p className="eyebrow">ZelogiG</p>
            <h1>Move words. Change meaning.</h1>
          </div>
          <div className="hero-tag">Puzzle Soft-Tech · Mobile-first · Retro táctil</div>
        </div>
        <p className="hero-copy">Aprende inglés resolviendo mundos donde cada palabra es una regla viva. Mueve tu avatar, reordena frases y desbloquea la siguiente puerta.</p>
      </section>

      <div className="top-grid">
        <aside className="side-panel" aria-label="Panel de niveles y progreso">
          <div className="panel-title">
            <span className="eyebrow">Progreso</span>
            <h2>{progress.completedLevelIds.length} / {levels.length}</h2>
          </div>

          <div className="progress-strip" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${(progress.completedLevelIds.length / levels.length) * 100}%` }} />
          </div>

          <div className="level-group">
            {levels.map((level) => (
              <button
                key={level.id}
                type="button"
                className={`level-card ${level.id === activeLevel.id ? "level-card--active" : ""}`}
                aria-pressed={level.id === activeLevel.id}
                onClick={() => setSelectedLevelId(level.id)}
              >
                <span>{level.title}</span>
                {progress.completedLevelIds.includes(level.id) ? <span className="level-badge">✓</span> : null}
              </button>
            ))}
          </div>

          <div className="panel-footer">
            <p className="panel-note">Selecciona un nivel para cargar su tablero. Los niveles completados se muestran con un distintivo.</p>
          </div>
        </aside>

        <section className="game-panel">
          <div className="game-summary">
            <div className="summary-card">
              <p className="summary-label">Nivel</p>
              <p className="summary-value">{activeLevel.title}</p>
            </div>
            <div className="summary-card">
              <p className="summary-label">Movimientos</p>
              <p className="summary-value">{gameState.moves}</p>
            </div>
            <div className="summary-card summary-card--goal">
              <p className="summary-label">Objetivo</p>
              <p className="summary-value">{activeLevel.objective}</p>
            </div>
          </div>

          <div className="game-canvas-card">
            <div className="game-toolbar">
              <button type="button" onClick={onUndo}>Deshacer</button>
              <button type="button" onClick={onRestart}>Reiniciar</button>
            </div>

            <div className={statusClassName} aria-live="polite" role="status">
              {gameState.status === "won" ? (
                <div className="victory-panel">
                  <p className="victory-message">¡Nivel completado! La puerta se abre y el tablero queda listo para la siguiente prueba.</p>
                  <div className="victory-actions">
                    {nextLevel ? <button type="button" onClick={onNextLevel}>Siguiente nivel</button> : null}
                    <button type="button" onClick={onRestart}>Jugar de nuevo</button>
                  </div>
                </div>
              ) : announcement}
            </div>

            <div className="game-controls" aria-label="Controles de movimiento">
              <div className="direction-controls">
                <button type="button" className="direction-button" onClick={() => onMove("up")} aria-label="Mover arriba">↑</button>
                <button type="button" className="direction-button" onClick={() => onMove("left")} aria-label="Mover izquierda">←</button>
                <button type="button" className="direction-button" onClick={() => onMove("down")} aria-label="Mover abajo">↓</button>
                <button type="button" className="direction-button" onClick={() => onMove("right")} aria-label="Mover derecha">→</button>
              </div>
              <p className="controls-hint">Usa las flechas, WASD o desliza para mover. Toca los botones para jugar desde dispositivos táctiles.</p>
            </div>

            <p id="board-description" className="sr-only">{boardDescription}</p>
            <SwipeSurface onMove={onMove}>
              <GameBoard blocks={gameState.blocks} width={activeLevel.width} height={activeLevel.height} onMove={onMove} descriptionId="board-description" />
            </SwipeSurface>
          </div>

          <section className="rules-panel" aria-label="Reglas activas">
            <div className="rules-header">
              <h2>Reglas activas</h2>
              <span className="rules-chip">{gameState.activeRules.length}</span>
            </div>
            {gameState.activeRules.length > 0 ? (
              <ul className="rules-list">
                {gameState.activeRules.map((rule) => (
                  <li key={`${rule.subject}-${rule.orientation}-${rule.predicate}`} className="rule-item">
                    <span className="rule-chip-text">{rule.subject}</span>
                    <span className="rule-operator">{rule.operator}</span>
                    <span className="rule-chip-text">{rule.predicate}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rules-empty">No hay reglas activas. Crea una regla válida para activar la lógica.</p>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}


