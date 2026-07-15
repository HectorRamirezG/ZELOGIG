# Diseno de backend

## Alcance inicial

- Lectura de niveles publicados.
- Guardado de progreso autenticado.
- Registro resumido de sesiones, sin bloquear la experiencia.

## Fuera del nucleo

El movimiento, las colisiones y el parser se ejecutan localmente. El servidor no participa en cada paso del jugador.

## Limites

No se crean microservicios, colas, Redis, GraphQL ni integraciones empresariales durante el MVP.
