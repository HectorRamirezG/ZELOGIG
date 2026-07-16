# Sistema de animación

## Decisión

El MVP usará CSS nativo para animaciones de interfaz y movimiento visual. No se agregará una biblioteca de animación hasta que exista una secuencia que CSS no pueda expresar con claridad.

## Objetivos

- Comunicar intención y resultado.
- Mantener respuesta inmediata en móvil.
- Evitar que la animación cambie el estado lógico del motor.
- Respetar `prefers-reduced-motion`.
- Mantener una velocidad visual coherente.

## Eventos visuales iniciales

- `BLOCK_MOVED`: desplazamiento corto entre celdas.
- `PUSH_SUCCEEDED`: compresión y rebote discreto.
- `MOVEMENT_BLOCKED`: retroceso breve, sin vibración visual excesiva.
- `RULE_ACTIVATED`: brillo que recorre las tres palabras.
- `RULE_DEACTIVATED`: reducción suave de énfasis.
- `LEVEL_COMPLETED`: celebración breve y no bloqueante.
- `UNDO_COMPLETED`: restauración rápida con dirección inversa.

## Presupuesto de movimiento

- La respuesta visual comienza inmediatamente después de la entrada.
- Las animaciones ordinarias deben sentirse breves.
- Ninguna animación impide el siguiente movimiento salvo que la integridad del estado lo exija.
- Las partículas, si se aprueban, serán decorativas, limitadas y desactivables.

## Accesibilidad

Con movimiento reducido:

- Sustituir desplazamientos amplios por cambios de opacidad o estado.
- Eliminar rebotes y celebraciones prolongadas.
- Mantener intacta la información comunicada.

## Frontera arquitectónica

El motor emite eventos neutrales. La capa visual decide la animación. Las reglas nunca dependen de tiempos CSS, cuadros por segundo ni finalización de una transición.

## Criterio para evaluar una biblioteca

Solo abrir una decisión si aparecen coreografías coordinadas, interrupciones complejas o problemas demostrables de mantenimiento. Se compararán peso, accesibilidad, soporte móvil, costo y reversibilidad.
