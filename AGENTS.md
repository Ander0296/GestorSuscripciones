# GestorSuscripciones

## Stack
- HTML + CSS + JavaScript vanilla (sin frameworks)
- Persistencia: Supabase (PostgreSQL) — migrado desde LocalStorage
- Auth: Supabase Auth (email + password, confirmación por email)
- Arquitectura: POO (Suscripcion, AppManager, UI) — clase Usuario eliminada (Supabase la maneja)
- SDK: @supabase/supabase-js@2 (CDN)
- Supabase URL: https://eubfyyhgslcgxarbwsop.supabase.co

## Estado actual
- Auth: email/password con Supabase Auth, confirmación por correo, sesión persistente
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
17. ~~Backend real (Firebase/Supabase)~~ (HECHO - en feature/base-datos)
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
- Supabase elegido sobre Firebase/MySQL — PostgreSQL por debajo, SDK simple, sin servidor propio
- Variable del cliente: `sbClient` (no `supabase`, colisiona con el SDK global)
- Mapping snake_case (DB) ↔ camelCase (JS): fecha_cobro ↔ fechaCobro, created_at ↔ creadaEn
- Registro detecta email duplicado via `identities.length === 0`

## Supabase
- Tabla: `suscripciones` (id uuid, user_id uuid, nombre, categoria, costo float8, moneda default COP, ciclo default mensual, fecha_cobro date, estado, created_at timestamptz)
- RLS: 4 policies (SELECT, INSERT, UPDATE, DELETE) con `auth.uid() = user_id`
- Auth: email + password con confirmación por correo
- Métodos async/await en AppManager y UI

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
- [x] Migración a Supabase — auth por email + base de datos PostgreSQL
  - Clase Usuario eliminada (Supabase maneja auth)
  - AppManager reescrito: todos los métodos async/await
  - RLS para seguridad por usuario
  - Detección de email duplicado en registro
  - Mensaje de confirmación por correo al registrarse

## Sesiones de trabajo
- **2026-03-24**: Análisis de competencia, definición de roadmap, implementación de logos SVG, ciclos de facturación, multi-moneda y migración a Supabase
