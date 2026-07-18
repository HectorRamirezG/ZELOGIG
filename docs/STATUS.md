# Estado

## Fase actual

**Fase 1: MVP Jugable** – Prototipo funcional con 5 niveles de prueba, motor determinista, UI accesible, persistencia local.

## Completado (2026-07-17)

- ✓ Arquitectura de dominio puro (motor independiente de React/navegador)
- ✓ Sistema de reglas: YOU, PUSH, STOP, WIN, OPEN
- ✓ Movimiento 2D con límites, empuje y bloqueos
- ✓ Interfaz con selector de nivel, reinicio, deshacer
- ✓ Controles: flechas, WASD, botones direccionales, gestos táctiles
- ✓ Tema visual Soft-Tech: colores, paneles, transiciones
- ✓ Accesibilidad básica: `aria-live`, `aria-label`, foco visible, salto a contenido
- ✓ Persistencia local: progreso guardado en localStorage
- ✓ 14 pruebas unitarias que validan movimiento, reglas, undo, victoria, movimientos inválidos
- ✓ Documentación: bitácora, diagramas, decisiones

## En Fase de Prueba

- ⏳ Ejecución real de tests en Node.js 20+
- ⏳ Servidor de desarrollo (`npm run dev`)
- ⏳ Compilación a producción (`npm run build`)
- ⏳ Validación visual y funcional en navegador

## Bloqueado: Requisitos externos

- 🔒 Node.js 20+ no disponible en el equipo corporativo
- 🔒 npm 10+ no disponible
- 🔒 Autenticación GitHub para publicar repositorio

## Próximo paso (cuando Node.js esté disponible)

```powershell
cd C:\Dev\ZelogiG
npm ci
npm test -- --run          # Ejecutar tests
npm run typecheck          # Verificar tipos
npm run dev                # Servidor local → http://localhost:3000
```

Luego, validar en navegador según `scripts/VALIDATION-CHECKLIST.ps1`.

## Criterios MVP (en espera de validación real)

- [ ] Los cinco niveles son jugables sin errores
- [ ] Movimiento, empuje, bloqueo, OPEN funcionan
- [ ] Undo y reinicio funcionan
- [ ] Accesibilidad: contraste, foco, navegación por teclado
- [ ] Progreso persiste entre sesiones
- [ ] Sin dependencias externas en dominio (React, Supabase, UI lib)

## Decisiones congeladas (no revertir)

- Motor 2D determinista local
- CSS + SVG para MVP (sin canvas ni WebGL)
- Reglas gramaticales simples (NOUN IS property|NOUN)
- Cinco niveles manuales antes de editor automático
- Persistencia local antes de Supabase
