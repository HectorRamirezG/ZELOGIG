# Plan de instalacion pendiente

## Restriccion actual

No ejecutar npm ni instalar dependencias durante la fase de fundacion.

## Validaciones permitidas ahora

- Confirmar PowerShell 7
- Confirmar Git
- Confirmar Node.js, sin instalar paquetes
- Confirmar acceso futuro a Supabase y Vercel

## Instalacion futura

Cuando se autorice, se elegira un solo administrador de paquetes y se documentaran versiones exactas. El orden previsto sera:

1. Crear la aplicacion Next.js.
2. Configurar TypeScript estricto.
3. Configurar Tailwind CSS.
4. Agregar herramientas de formato y pruebas.
5. Conectar Supabase solo cuando el nucleo local funcione.
6. Configurar Vercel despues de tener una compilacion estable.

Los comandos concretos se definiran en una sesion posterior para evitar versiones obsoletas o instalaciones accidentales.
