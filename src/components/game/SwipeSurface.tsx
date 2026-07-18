"use client";

import { useRef, type ReactNode, type TouchEvent } from "react";
import type { Direction } from "../../features/game/domain/game.types";

export function SwipeSurface({ children, onMove }: { readonly children: ReactNode; readonly onMove: (direction: Direction) => void }) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const onStart = (event: TouchEvent) => {
    const touch = event.changedTouches[0];
    start.current = { x: touch.clientX, y: touch.clientY };
  };

  const onEnd = (event: TouchEvent) => {
    if (!start.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.current.x;
    const dy = touch.clientY - start.current.y;
    start.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    onMove(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
  };

  return (
    <div className="swipe-surface" onTouchStart={onStart} onTouchMove={(event) => event.preventDefault()} onTouchEnd={onEnd} style={{ touchAction: "none" }}>
      {children}
    </div>
  );
}
