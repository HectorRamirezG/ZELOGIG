# Experiencia móvil

## Principio

Mobile First significa diseñar la interacción primaria para una pantalla pequeña y entrada táctil, no reducir una interfaz de escritorio.

## Diseño del tablero

- Mantener las palabras legibles sin zoom manual.
- Priorizar cuadrículas compactas en los primeros mundos.
- Reservar áreas seguras para barras del sistema y dispositivos con recortes.
- Evitar scroll, selección accidental y gestos del navegador dentro del tablero.
- Permitir orientación vertical y horizontal cuando mejore la lectura.

## Entrada

- Swipe en cuatro direcciones con umbral para evitar movimientos accidentales.
- Teclado como entrada equivalente en escritorio.
- Botones accesibles para deshacer, reiniciar, pausa, sonido y ayuda.
- No colocar acciones críticas únicamente en gestos ocultos.

## Rendimiento

- Mantener el ciclo lógico independiente de la animación.
- Optimizar SVG y audio.
- Evitar imágenes enormes y dependencias visuales pesadas.
- Cargar primero el nivel y después la decoración secundaria.
- Probar en un dispositivo móvil real, no solo en el simulador del navegador.

## Accesibilidad

- Objetivos táctiles cómodos.
- Contraste suficiente.
- Foco visible para teclado y tecnologías de asistencia.
- Descripción espacial disponible.
- Movimiento reducido.
- Sonido y vibración configurables.

## Matriz mínima de pruebas

- Pantalla móvil estrecha.
- Pantalla móvil amplia.
- Orientación vertical.
- Orientación horizontal.
- Teclado de escritorio.
- Movimiento reducido.
- Sonido desactivado.
- Navegación sin depender del color.
