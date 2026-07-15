# Arquitectura

## Estilo

Monolito modular dentro de una aplicacion Next.js.

## Capas

1. Dominio: reglas puras del juego y modelos.
2. Aplicacion: casos de uso y coordinacion.
3. Interfaz: componentes, entradas y presentacion.
4. Infraestructura: Supabase y servicios externos aprobados.

## Direccion de dependencias

La interfaz puede depender de la aplicacion. La aplicacion puede depender del dominio. El dominio no depende de React, Next.js, Supabase ni del navegador.

## Estado

Comenzar con estado local y un controlador pequeno. Una biblioteca global solo se incorpora mediante RFC si el alcance demuestra que React no es suficiente.

## Datos

Los niveles usan un formato versionado y validable. El contenido no mezcla presentacion con reglas del dominio.
