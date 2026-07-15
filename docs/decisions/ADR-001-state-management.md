# ADR-001: Estado del juego sin biblioteca adicional

- Estado: Aprobado
- Fecha: 2026-07-15

## Contexto

El MVP requiere un estado pequeno y una sola experiencia activa. Agregar Zustand antes de validarlo crea una dependencia que el dominio no necesita.

## Decision

Usar un reducer/controlador de React para la sesion y funciones puras para el dominio. Revisar Zustand mediante RFC solo si aparecen varios consumidores independientes o sincronizacion compleja.

## Consecuencias

Menor instalacion y acoplamiento. Si el producto crece, el adaptador de estado podra cambiar sin reescribir el motor.
