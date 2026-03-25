# GestorSuscripciones

## Stack
- HTML + CSS + JavaScript vanilla (sin frameworks)
- Persistencia: LocalStorage
- Arquitectura: POO (Usuario, Suscripcion, AppManager, UI)
- Sin backend, sin build tools

## Estado actual
- Auth: login/registro con hash djb2, sesión persistente en LocalStorage
- CRUD completo de suscripciones (crear, editar, eliminar)
- Dashboard: suscripciones activas, gasto mensual, gasto anual proyectado, alertas de cobro pendiente en canceladas
- Filtros: por categoría y estado
- Responsive: tabla se convierte en cards en mobile
- Modal para crear/editar con validación básica
- Escape y click en overlay cierran modal
- XSS prevention con escapeHTML

## Categorías existentes
Entretenimiento, Música, Trabajo/Productividad, Educación, Salud, Gaming, Noticias, Otro

## Mejoras planificadas (priorizadas)
### Quick wins
1. ~~Logos/íconos de servicios populares~~ (HECHO - en feature/logos-servicios)
2. ~~Ciclo de facturación flexible~~ (HECHO - en feature/ciclo-facturacion)
3. ~~Multi-moneda~~ (HECHO - en feature/multi-moneda)
4. Recordatorios con Notification API
5. Vista calendario de cobros
6. Gráfico de gastos por categoría (Chart.js o similar)
7. Export CSV/JSON
8. Dark mode
9. Tracking de trials (días restantes de prueba)
10. Detección de cambios de precio (historial)

### Intermedias
11. PWA (manifest + service worker, offline)
12. Import CSV
13. Gastos one-time (licencias perpetuas, lifetime deals)
14. Presupuesto por categoría
15. Tendencia de gasto mensual (gráfico histórico)
16. Vista compartida familia/hogar

### Avanzadas (cambio de arquitectura)
17. Backend real (Firebase/Supabase)
18. Detección por email (recibos Gmail)
19. Integración bancaria (Plaid / Open Banking)

## Competencia analizada
- **Bobby/Subby**: manual, local, logos, colores, ciclos custom
- **TrackMySubs**: web, carpetas/proyectos, CSV, trials, multi-moneda
- **Subly**: web, 3 recordatorios por sub, webhooks, gastos one-time
- **Rocket Money**: sync bancario, cancelación in-app, negociación tarifas
- **Monarch Money**: calendario + lista, detecta cambios de precio
- **Emma**: Open Banking, multi-cuenta, inversiones + suscripciones

## Decisiones tomadas
- Logos SVG embebidos directamente (no CDN externo) — cero dependencias, funciona offline
- Matching de servicios: exacto + parcial, normalizado (lowercase, sin espacios/especiales)
- Fallback para servicios no reconocidos: círculo con inicial + color generado por hash del nombre
- Servicios con texto SVG (Disney+, Microsoft 365, Google One, iCloud): usan texto sobre rect en lugar de path
- Ciclos de facturación: semanal (×4.33), mensual (×1), trimestral (÷3), semestral (÷6), anual (÷12)
- Factor semanal 4.33 viene de 52 semanas ÷ 12 meses
- Campo renombrado: costoMensual → costo (con backward compat para datos viejos en localStorage)
- Multi-moneda visual (sin conversión): 9 monedas (COP, USD, EUR, ARS, MXN, BRL, CLP, PEN, GBP)
- COP como moneda default (usuario es de Colombia)
- Dashboard agrupa totales por moneda cuando hay mezcla

## Features implementadas
- [x] Logos/íconos de servicios populares — catálogo de 23 servicios con SVG reales
  - Logo visible en tabla de suscripciones y preview en tiempo real en el modal
  - Servicios: Netflix, Spotify, YouTube, Disney+, HBO, Amazon Prime Video, Apple TV, Twitch, Crunchyroll, Steam, PlayStation, Xbox, Adobe CC, Microsoft 365, Google One, Dropbox, iCloud, GitHub, Notion, Slack, Canva, Duolingo, ChatGPT
- [x] Ciclo de facturación flexible — 5 ciclos: semanal, mensual, trimestral, semestral, anual
  - Dashboard normaliza todo a costo mensual para comparar
  - Badge de ciclo visible en la tabla junto al costo
  - Backward compatible con suscripciones guardadas sin ciclo (default: mensual)
- [x] Multi-moneda visual — 9 monedas, sin conversión automática
  - Dashboard agrupa totales por moneda cuando hay mezcla
  - COP default, backward compatible (suscripciones viejas → USD)

## Sesiones de trabajo
- **2026-03-24**: Análisis de competencia, definición de roadmap, implementación de logos SVG, ciclos de facturación y multi-moneda
