# Contrato de eventos del juego

## Objetivo

Separar las reglas del juego de sus representaciones visuales, sonoras, táctiles y analíticas.

## Eventos del dominio

```text
GAME_STARTED
BLOCK_MOVED
PUSH_SUCCEEDED
MOVEMENT_BLOCKED
RULE_ACTIVATED
RULE_DEACTIVATED
UNDO_COMPLETED
LEVEL_RESTARTED
LEVEL_COMPLETED
```

## Forma conceptual

```text
GameEvent
- type
- sequence
- occurredAt
- levelId
- payload mínimo específico
```

## Reglas

- Los eventos describen hechos que ya ocurrieron.
- No contienen clases CSS, nombres de archivos de audio ni instrucciones de interfaz.
- El orden usa una secuencia local monotónica.
- `occurredAt` sirve para observación, no para calcular reglas.
- El contenido del evento debe ser mínimo y no incluir datos personales.
- La telemetría futura consume una versión filtrada, nunca el estado completo por defecto.

## Consumidores posibles

- Animación.
- Audio.
- Respuesta táctil.
- Narración accesible.
- Registro de depuración local.
- Telemetría futura aprobada.

## Garantías

- Un movimiento inválido puede emitir `MOVEMENT_BLOCKED`, pero no crea historial.
- Un movimiento válido emite eventos después de producir el nuevo estado.
- `LEVEL_COMPLETED` se emite una sola vez por transición de jugando a completado.
- Deshacer y reiniciar son acciones explícitas con eventos propios.

## Pendiente de implementación

El contrato se documenta ahora. Los tipos y el despachador solo se programarán después de revisar el motor existente y aprobar el cambio.
