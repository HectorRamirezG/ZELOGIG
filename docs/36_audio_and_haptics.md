# Audio y respuesta táctil

## Decisión

El sistema será opcional, desacoplado y controlado por eventos del juego. El MVP comenzará con efectos breves. Música y ambiente requieren una decisión posterior.

## Eventos sonoros

- Movimiento.
- Empuje.
- Colisión.
- Regla activada.
- Regla desactivada.
- Victoria.
- Interacción de interfaz.

## Reglas

- No reproducir audio antes de una interacción del usuario.
- Ofrecer silencio y volumen independientes cuando exista música.
- No usar sonido como único canal de información.
- Pausar o reducir audio al perder visibilidad.
- Evitar sonidos agresivos o repetitivos.
- Registrar licencia y procedencia de cada recurso.

## Respuesta táctil

Cuando el dispositivo lo permita:

- Pulso corto para movimiento o empuje válido.
- Patrón diferente y breve para colisión.
- Confirmación especial para regla activada y victoria.

La vibración será opcional, nunca obligatoria y no se asumirá disponible en todos los navegadores.

## Producción de recursos

Orden preferido:

1. Síntesis sencilla o recursos originales.
2. Bibliotecas con licencia comercial clara.
3. Generación asistida por IA, siempre con condiciones de uso registradas.
4. Diseño sonoro personalizado cuando el juego esté validado.

## Frontera arquitectónica

`AudioPort` y `HapticPort` reciben eventos neutrales. El dominio no conoce archivos, formatos, volumen ni APIs del navegador.
