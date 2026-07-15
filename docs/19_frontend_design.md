# Diseno de frontend

## Composicion

- App Router para rutas y estructura.
- Componentes visuales pequenos.
- `GameBoard` solo representa el estado y envia intenciones.
- El controlador de juego coordina el dominio.
- Los estilos usan tokens Soft-Tech en CSS.

## Entradas

- Flechas y WASD.
- Gestos tactiles con umbral minimo.
- Botones accesibles para deshacer y reiniciar.

## Accesibilidad

El tablero expone una descripcion textual, foco visible y anuncios de cambios relevantes. La informacion nunca depende solo del color.
