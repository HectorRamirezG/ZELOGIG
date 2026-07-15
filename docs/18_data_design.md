# Diseno de datos

## Estrategia

El MVP funciona localmente. Supabase se incorpora para autenticacion, catalogo de niveles y progreso una vez validado el nucleo.

## Tablas

- profiles: identidad publica minima.
- levels: metadatos y documento JSON versionado.
- level_progress: estado de avance por usuario.
- gameplay_sessions: resumen minimo de una sesion.

## Privacidad

No se guardan frases de correo, audio, contenido personal ni repeticiones de sesion. La telemetria futura sera agregada, opcional y documentada.

## Seguridad

Todas las tablas de usuario usan seguridad por fila. La clave de servicio nunca llega al navegador.
