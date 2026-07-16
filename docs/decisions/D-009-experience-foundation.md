# D-009: Fundación de experiencia móvil

- Estado: Aprobada
- Fecha: 2026-07-15
- Responsable: Héctor Ramírez

## Decisión

CSS y SVG serán la base visual del MVP. Las animaciones comenzarán con CSS. Audio y vibración vivirán detrás de adaptadores y consumirán eventos neutrales del motor. ZelogiG será Mobile First.

## Por qué ahora

La estructura visual, sonora y táctil debe definirse antes de introducir dependencias o acoplar efectos al motor.

## Alternativas

- Implementar todo con bibliotecas desde el inicio.
- Crear sistemas completamente personalizados.
- Comenzar con APIs nativas y agregar bibliotecas solo ante necesidades comprobadas.

## Recomendación aprobada

Comenzar con APIs nativas y fronteras pequeñas.

## Costo

Más disciplina inicial, menor costo de dependencias y mantenimiento.

## Riesgos

CSS puede resultar insuficiente para coreografías complejas. Las APIs de audio y vibración varían entre navegadores.

## Impacto

- Motor: emite eventos neutrales.
- Interfaz: representa estado y efectos.
- Datos: sin cambios.
- Pruebas: requerirá pruebas por evento y recorridos móviles.
- Experiencia: coherente, rápida y configurable.

## Reversibilidad

Alta. Los adaptadores permiten sustituir la implementación sin cambiar reglas.
