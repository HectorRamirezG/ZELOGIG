# Modelo de dominio

## Entidades

- Level: dimensiones, mapa inicial, objetivo y version.
- Tile: posicion estable dentro de la cuadricula.
- Block: pieza colocada en una celda.
- WordBlock: palabra con funcion gramatical.
- WorldObject: objeto afectado por reglas.
- Rule: sujeto, operador, predicado, orientacion y posiciones.
- GameState: mapa actual, historial, reglas activas y estado de finalizacion.
- Progress: niveles disponibles y completados.

## Valores

- Position
- Direction
- GridSize
- BlockId
- LevelId

## Servicios puros

- move
- pushChain
- parseRules
- applyRules
- evaluateWin
- undo
