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
1. Logos/íconos de servicios populares (catálogo precargado)
2. Ciclo de facturación flexible (semanal, mensual, trimestral, anual) — hoy solo mensual
3. Multi-moneda (USD, ARS, EUR)
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
- (ninguna aún — se irán registrando acá)

## Sesiones de trabajo
- **2026-03-24**: Análisis de competencia y definición de roadmap de mejoras
