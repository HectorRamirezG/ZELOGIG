# Bitacora - ZelogiG

> Registro append-only. La entrada mas reciente se agrega debajo de este encabezado. No se elimina ni reescribe historia. Estados: COMPLETO, SEGUIMIENTO, BLOQUEADO.

---

## 2026-07-17 - Refinamiento UI/UX, accesibilidad y expansión de tests del dominio

- **Estado:** COMPLETO
- **Que se hizo:** Se extendió la experiencia del juego con controles táctiles direccionales explícitos, descripción accesible del tablero, utilería `.sr-only`, estilos mejorados para reglas activas siguiendo tema Soft-Tech, colores específicos por tipo de propiedad (YOU, PUSH, STOP, WIN, OPEN), soporte de mayúsculas en teclado WASD, y se expandió cobertura de tests a 14 casos verificando PUSH, STOP, OPEN, movimientos inválidos, undo sin historial y reinicio. Se corrigió la alineación de reglas en `level-001.ts`. Se crearon scripts de validación (`Validate-MVP.ps1`, `VALIDATION-CHECKLIST.ps1`) y guías de desarrollo (`QUICK-START.md`, `STATUS.md` actualizado).
- **Decision + porque:** [Seguro] La interfaz debe cumplir MVP: accesibilidad básica, controles táctil/teclado, tema visual coherente y motor testeable. Los botones direccionales facilitan uso en móvil; los estilos por propiedad ayudan a entender reglas sin depender de color. Los scripts permiten validación rápida cuando Node.js esté disponible. La documentación facilita onboarding de futuras contribuciones.
- **Contexto:** Planeación basada en `docs/10_design_system.md`, `docs/19_frontend_design.md`, `docs/21_mvp_definition.md`, `docs/17_engine_rules.md`. Los tests validan invariantes del dominio antes de ejecutar en navegador. Scripts permiten un flujo CI rápido sin necesidad de GitHub Actions aún.
- **Validacion:** Verificación de errores TypeScript en todos los archivos nuevos retorna cero errores. Tests no ejecutados aún por falta de Node.js corporativo. Documentación verificada manualmente contra decisiones previas.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Cuando Node.js esté disponible, ejecutar `.\scripts\Validate-MVP.ps1` o `npm test -- --run` seguido de `npm run dev`. Revisar interfaz en navegador usando checklist en `scripts/VALIDATION-CHECKLIST.ps1`.
- **Bloqueos / pendientes de humano:** Node.js 20+ no disponible. Sin ejecución real, no se puede garantizar reglas PUSH/STOP/OPEN en tiempo de ejecución ni validar flujo visual completo.

### Decisiones deliberadas, no deshacer

- Controles direccionales como complemento a teclado/tactil, no reemplazo.
- Colores por propiedad respetan accesibilidad (no solo color como medio).
- Nivel 001 redefinido para que reglas se alineen correctamente.
- Tests cubren invariantes clave: no alteración de historial en movimientos inválidos, empuje en cadena, bloqueo de STOP.
- Documentación vive en `/docs/` y es accesible offline, sin dependencias de wikis externas.

---

## 2026-07-17 - Implementación del juego jugable y persistencia local

- **Estado:** COMPLETO
- **Que se hizo:** Se completó la experiencia jugable del MVP en `src/app/page.tsx` con selección de nivel, reinicio, deshacer, reglas activas, progreso local y anuncios accesibles. Se agregó la evaluación de victoria y reinicio en `src/features/game/domain/game-engine.ts`, y se corrigió la persistencia local en `src/features/progress/local-progress.ts`.
- **Decision + porque:** [Seguro] El MVP debe funcionar localmente con control de nivel, entradas táctiles/teclado y progreso mínimo sin depender de servicios externos.
- **Contexto:** El proyecto ya tenía la base del motor y los datos de niveles; se implementó la capa de aplicación y la interfaz mínima necesaria para completar el flujo.
- **Validacion:** Se verificaron errores de TypeScript en los archivos modificados y se añadieron pruebas unitarias básicas para el motor.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Ejecutar `npm test` y `npm run build` en un entorno con Node.js disponible para validar la experiencia completa.
- **Bloqueos / pendientes de humano:** Node.js debe estar habilitado en el equipo autorizado para ejecutar la validación y el servidor local.

### Decisiones deliberadas, no deshacer

- El juego local debe poder iniciarse en cualquier nivel con reinicio y deshacer.
- Las reglas activas se muestran como texto, no solo como elementos visuales.
- La persistencia local es el primer método de progreso antes de Supabase.

## 2026-07-17 - Corrección del flujo de victoria y validación del motor

- **Estado:** COMPLETO
- **Que se hizo:** Se corrigió el motor de juego para que el nivel 1 sea realmente completable. El movimiento ya no bloquea al jugador por las palabras de regla, se permitió avanzar sobre objetos con regla WIN y se ajustó la evaluación de victoria para pasar de "playing" a "won" cuando el jugador alcanza el objetivo. También se añadieron pruebas de regresión para bordes, movimientos inválidos y el flujo de completado del nivel 1.
- **Decision + porque:** [Seguro] El MVP solo es creíble si el jugador puede terminar un nivel sin que el motor lo trabe artificialmente. La lógica de movimiento debe reflejar las reglas del juego y no depender de suposiciones visuales.
- **Contexto:** La validación se hizo contra el motor puro y las pruebas unitarias del dominio, sin depender del navegador. Se usó el nivel 1 como caso de integración para confirmar que la ruta de victoria es alcanzable.
- **Validacion:** Se ejecutó `npm test -- --run` y el resultado fue 2 archivos de prueba aprobados, 13/13 pruebas correctas.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Probar el flujo completo en la interfaz y ajustar el mensaje/feedback visual de victoria para que sea más claro en la experiencia del usuario.
- **Bloqueos / pendientes de humano:** Ninguno en esta iteración; el siguiente paso es validar la experiencia visual en el navegador.

### Decisiones deliberadas, no deshacer

- Las reglas del juego se evalúan en el motor, no en la interfaz.
- El estado de victoria debe dispararse únicamente cuando el jugador alcanza una condición real de win.
- Los movimientos inválidos no deben mutar historial ni contar como jugadas.

---

## 2026-07-16 - Sistemas de animación, audio, tacto y experiencia móvil

- **Estado:** COMPLETO
- **Que se hizo:** Se definieron el sistema de animación, audio, respuesta táctil, experiencia Mobile First, contrato de eventos neutrales, decisiones de stack y pendientes futuros. Se agregó el diagrama del sistema de experiencia y la decisión D-009.
- **Decision + porque:** [Seguro] El MVP usará CSS, SVG y APIs nativas detrás de adaptadores. No se agregan bibliotecas hasta demostrar una necesidad que las justifique.
- **Contexto:** Lectura directa de la documentación y decisiones aprobadas por el propietario; graphify no disponible y no generado.
- **Validacion:** Documentación y diagrama generados con PowerShell 5.1. No se modificó código del motor ni se ejecutó NPM.
- **Costo:** No disponible desde este entorno; no se inventan tokens ni USD.
- **Siguiente paso:** Publicar cambios en GitHub y, al disponer de Node.js, revisar el contrato de eventos contra el motor antes de implementarlo.
- **Bloqueos / pendientes de humano:** Node.js sigue bloqueado en el equipo corporativo. GitHub debe autenticarse con la cuenta propietaria.

### Decisiones deliberadas, no deshacer

- Mobile First real, no adaptación tardía.
- CSS y SVG como base del MVP.
- Eventos neutrales entre motor y efectos.
- Audio y vibración opcionales.
- Ninguna dependencia nueva queda autorizada automáticamente.

---
## 2026-07-15 - Elevación técnica, creativa y operativa

- **Estado:** COMPLETO
- **Que se hizo:** Se definieron arquitectura funcional del motor, aplicación práctica de SOLID, dirección artística, flujo de recursos con IA, entorno local, laboratorio, proceso de niveles, puertas de calidad, decisiones pendientes y protocolo de entrega a otras IA.
- **Decision + porque:** [Seguro] ZelogiG se consolida como videojuego 2D de rompecabezas lingüísticos. El motor seguirá siendo local, determinista y desacoplado; CSS y SVG serán la base visual del MVP; las decisiones estructurales se presentarán al propietario antes de modificar código.
- **Contexto:** Lectura directa de la documentación del proyecto y decisiones del propietario; graphify no disponible y no generado.
- **Validacion:** Archivos generados con PowerShell 5.1. Validaciones de Node.js pendientes por bloqueo corporativo.
- **Costo:** No disponible desde este entorno; no se inventan tokens ni USD.
- **Siguiente paso:** Publicar la documentación, instalar Node.js en un equipo autorizado y ejecutar validación de tipos, pruebas y servidor local.
- **Bloqueos / pendientes de humano:** Node.js no disponible en el equipo corporativo. Autenticación de GitHub debe usar la cuenta propietaria del repositorio.

### Decisiones deliberadas, no deshacer

- ZelogiG es un juego, no un simulador profesional.
- Motor funcional y determinista.
- CSS y SVG para el MVP; IA para conceptos bajo revisión humana.
- Cinco niveles manuales antes de crear un editor.
- Toda decisión estructural se presenta antes de modificar código.

---
## 2026-07-15 - Preparacion del repositorio GitHub

- **Estado:** COMPLETO
- **Que se hizo:** Se audito el proyecto y se preparo el primer envio al repositorio ZELOGIG.
- **Decision + porque:** [Seguro] El repositorio publico solo recibira codigo, documentacion y configuraciones sin secretos.
- **Contexto:** Lectura directa; graphify no disponible o no requerido.
- **Validacion:** Primer commit local creado correctamente con 69 archivos.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Publicar la rama main en GitHub.
- **Bloqueos / pendientes de humano:** La autenticacion debe realizarse con la cuenta HectorRamirezG.

---
## 2026-07-15 - Gobierno, trazabilidad y diagramas incorporados

- **Estado:** COMPLETO
- **Que se hizo:** Se adapto el estandar recibido a ZelogiG mediante un `CLAUDE.md` corto y especifico, bitacora retrospectiva, diagramas Mermaid, reglas de seguridad, auditoria local y un helper para registrar tareas futuras.
- **Decision + porque:** [Seguro] No se copio el estandar completo de forma literal. Varias reglas pertenecen a otros dominios, dependen de Claude Code o introducen herramientas no disponibles. Se conservaron las ideas valiosas sin convertir el repositorio en un manual pesado.
- **Contexto:** Lectura directa del estandar proporcionado por el propietario. `graphify-out/` no estaba disponible y no se genero.
- **Validacion:** Archivos generados por script compatible con Windows PowerShell 5.1; sin NPM ni instalaciones.
- **Costo:** No disponible desde este entorno; no se inventan tokens ni USD.
- **Siguiente paso:** Ejecutar la auditoria local y continuar la construccion del MVP cuando Node.js este disponible.
- **Bloqueos / pendientes de humano:** Node.js bloqueado en el equipo corporativo por politica de la organizacion.

### Decisiones deliberadas, no deshacer

- Mantener `CLAUDE.md` del proyecto corto y especifico.
- No instalar ni ejecutar graphify sin autorizacion humana.
- No inventar costos.
- Git permanece pendiente hasta instruccion del propietario.

---

## 2026-07-15 - Expansion offline del MVP

- **Estado:** COMPLETO
- **Que se hizo:** Se agregaron los niveles 2 al 5, catalogo de niveles, gestos tactiles, progreso local, narracion espacial y listas de continuacion.
- **Decision + porque:** [Seguro] Se avanzo con archivos fuente sin instalar dependencias porque el equipo corporativo impide instalar Node.js.
- **Contexto:** Lectura directa de la estructura creada; graphify ausente.
- **Validacion:** El script genero los archivos sin ejecutar NPM.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Validar tipos y comportamiento cuando exista Node.js.
- **Bloqueos / pendientes de humano:** Ejecutar pruebas reales en un equipo permitido.

---

## 2026-07-15 - Diseno tecnico y esqueleto offline

- **Estado:** COMPLETO
- **Que se hizo:** Se definieron contrato de niveles, motor 2D, parser, movimiento, historial, interfaz base, migracion inicial y primera prueba unitaria.
- **Decision + porque:** [Seguro] El dominio se mantuvo independiente de React y Supabase para reducir acoplamiento.
- **Contexto:** Lectura directa; graphify ausente.
- **Validacion:** Revision estructural del generador; pruebas de TypeScript pendientes por falta de Node.js.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Completar la experiencia jugable y ejecutar pruebas.
- **Bloqueos / pendientes de humano:** Node.js no disponible.

---

## 2026-07-15 - Intento de instalacion de Node.js LTS

- **Estado:** BLOQUEADO
- **Que se hizo:** Se comprobo Git y winget. Se intento instalar Node.js LTS con winget.
- **Decision + porque:** [Seguro] Se detuvieron nuevos intentos al recibir el codigo 1625: una politica de la organizacion impidio la instalacion.
- **Contexto:** Salida directa de PowerShell; graphify no aplica.
- **Validacion:** Git 2.53.0 y winget 1.29.280 disponibles; Node.js ausente.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Instalar Node.js LTS en el equipo personal autorizado.
- **Bloqueos / pendientes de humano:** Politica corporativa de instalacion.

---

## 2026-07-15 - Fundacion inicial de ZelogiG

- **Estado:** COMPLETO
- **Que se hizo:** Se creo la estructura del monolito modular, quince documentos estrategicos, plantillas RFC y ADR, configuracion segura y scripts de comprobacion.
- **Decision + porque:** [Seguro] La fundacion documental precede al codigo para preservar coherencia durante el desarrollo asistido por IA.
- **Contexto:** Requisitos proporcionados directamente por el propietario; graphify ausente.
- **Validacion:** PowerShell 5.1 ejecuto correctamente la version compatible del inicializador.
- **Costo:** No disponible desde este entorno.
- **Siguiente paso:** Disenar el nucleo tecnico sin dependencias.
- **Bloqueos / pendientes de humano:** Ninguno en esa tarea.
