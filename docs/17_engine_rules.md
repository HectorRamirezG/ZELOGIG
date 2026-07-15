# Reglas del motor 2D

## Ciclo de movimiento

1. Recibir una direccion.
2. Localizar todas las entidades con propiedad YOU.
3. Calcular el siguiente espacio.
4. Detener ante limites o bloques STOP.
5. Empujar cadenas PUSH solo si existe espacio legal al final.
6. Crear un nuevo estado inmutable.
7. Interpretar reglas horizontales y verticales.
8. Aplicar propiedades.
9. Evaluar victoria.
10. Guardar el estado anterior en el historial solo si hubo cambio.

## Reglas gramaticales v1

Patron valido: `NOUN + IS + PROPERTY` o `NOUN + IS + NOUN`.

El parser es determinista. No consulta inteligencia artificial ni servicios externos durante un movimiento.

## Propiedades iniciales

- YOU: controlable por el jugador.
- PUSH: puede empujarse.
- STOP: bloquea el paso.
- WIN: completa el nivel al compartir celda con YOU.
- OPEN: permite atravesar el objeto correspondiente en niveles que lo declaren.

## Invariantes

- Ningun bloque desaparece sin una transformacion explicita.
- Un intento invalido no altera el historial.
- Deshacer restaura el estado completo.
- El dominio no depende de React, navegador, Supabase ni Tailwind.
