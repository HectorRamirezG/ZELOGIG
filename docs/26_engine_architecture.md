# Arquitectura del motor

## Decisión propuesta

ZelogiG utilizará un núcleo funcional y determinista. El estado del tablero entra a una función junto con una intención del jugador, y la función devuelve un estado nuevo sin mutar el anterior.

## Flujo

```text
GameState + PlayerIntent -> Validate -> Move/Push -> ParseRules -> ApplyEffects -> EvaluateVictory -> GameState
```

## Capas

- **Dominio:** tipos, movimiento, empuje, reglas, efectos, victoria e historial. No conoce React, navegador, Tailwind, Supabase ni archivos.
- **Aplicación:** coordina acciones como iniciar partida, mover, deshacer, reiniciar y completar nivel.
- **Interfaz:** representa el estado, captura teclado, tacto y controles accesibles.
- **Infraestructura:** progreso local, Supabase, audio, vibración y telemetría futura.

## Orientación a objetos y SOLID

No se utilizarán clases por defecto. Los modelos del juego serán datos inmutables y funciones puras. La orientación a objetos se reservará para adaptadores con ciclo de vida real o integración externa.

SOLID se aplicará como criterio de diseño, no como ceremonia:

1. Un módulo tiene una responsabilidad reconocible.
2. Nuevas propiedades del juego se agregan sin reescribir el motor completo.
3. Implementaciones locales y remotas respetan los mismos contratos.
4. Los contratos son pequeños.
5. El dominio depende de abstracciones, nunca de proveedores.

## Límites de tamaño

- Dividir por responsabilidad, no por número arbitrario de líneas.
- Evitar archivos que mezclen cálculo, interfaz y persistencia.
- Antes de extraer una abstracción, deben existir al menos dos usos reales o una frontera arquitectónica clara.
