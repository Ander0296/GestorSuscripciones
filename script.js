"use strict";

/* ============================================================
 *  GESTOR DE SUSCRIPCIONES DIGITALES
 *  Arquitectura: POO pura — sin frameworks ni librerías externas.
 *
 *  Clases:
 *    - Usuario          → modelo de datos del usuario autenticado
 *    - Suscripcion      → modelo de datos + cálculos de una suscripción
 *    - AppManager       → lógica de negocio: auth, CRUD, cálculos, filtros
 *    - UI               → manipulación del DOM y enlace de eventos
 * ============================================================ */

/* ============================================================
 *  CLASE: Usuario
 *  Representa a un usuario registrado en el sistema.
 * ============================================================ */
class Usuario {
  /**
   * @param {string} username - Nombre de usuario único (case-insensitive al buscar)
   * @param {string} password - Contraseña ya transformada por _hashPassword
   */
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.creadoEn = new Date().toISOString();
  }

  /** Serializa la instancia a objeto plano para JSON.stringify */
  toJSON() {
    return {
      username: this.username,
      password: this.password,
      creadoEn: this.creadoEn,
    };
  }

  /**
   * Reconstruye un Usuario desde un objeto plano (reversión de toJSON).
   * @param   {object}  obj
   * @returns {Usuario}
   */
  static fromJSON(obj) {
    const u = new Usuario(obj.username, obj.password);
    u.creadoEn = obj.creadoEn;
    return u;
  }
}

/* ============================================================
 *  CLASE: Suscripcion
 *  Encapsula los datos de un servicio digital y los cálculos
 *  de gasto asociados.
 * ============================================================ */
class Suscripcion {
  /**
   * @param {object} datos
   * @param {string} [datos.id]           - UUID interno; se auto-genera si no se provee
   * @param {string}  datos.nombre        - Nombre del servicio (ej. "Netflix")
   * @param {string}  datos.categoria     - Categoría (ej. "Entretenimiento")
   * @param {number}  datos.costoMensual  - Importe mensual en $
   * @param {string}  datos.fechaCobro    - Fecha completa de cobro en formato YYYY-MM-DD
   * @param {string} [datos.estado]       - "activa" | "cancelada"  (default: "activa")
   * @param {string} [datos.creadaEn]     - ISO timestamp de creación
   */
  constructor({
    id,
    nombre,
    categoria,
    costoMensual,
    fechaCobro,
    estado,
    creadaEn,
  } = {}) {
    // Genera un ID único combinando timestamp + sufijo aleatorio
    this.id =
      id || `s_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.nombre = nombre;
    this.categoria = categoria;
    this.costoMensual = parseFloat(costoMensual) || 0;
    this.fechaCobro = fechaCobro; // YYYY-MM-DD
    this.estado = estado || "activa";
    this.creadaEn = creadaEn || new Date().toISOString();
  }

  /* -------- Cálculos -------- */

  /**
   * Retorna el costo anual proyectado (costoMensual × 12).
   * Solo tiene sentido económico para suscripciones activas;
   * el dashboard filtra por estado antes de llamarlo.
   * @returns {number}
   */
  getCostoAnual() {
    return this.costoMensual * 12;
  }

  /**
   * Indica si la suscripción está en estado activo.
   * @returns {boolean}
   */
  estaActiva() {
    return this.estado === "activa";
  }

  /**
   * Detecta un posible cobro no deseado: la suscripción fue marcada
   * como "cancelada" en el sistema, pero la fecha de cobro registrada
   * es hoy o posterior (el cargo aún no ha pasado).
   * Esto sirve de alerta en el dashboard para que el usuario verifique
   * si la cancelación fue efectiva con el proveedor.
   * @returns {boolean}
   */
  tieneCobroPendiente() {
    if (this.estaActiva()) return false;
    // Comparar fechas ignorando la hora para evitar falsos negativos
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    // Forzar hora 00:00 local sumando 'T00:00:00' para que no haya
    // desfase por zona horaria al parsear la cadena YYYY-MM-DD
    const fechaCobro = new Date(this.fechaCobro + "T00:00:00");
    return fechaCobro >= hoy;
  }

  /* -------- Serialización -------- */

  /** Serializa la instancia a objeto plano para JSON.stringify */
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      categoria: this.categoria,
      costoMensual: this.costoMensual,
      fechaCobro: this.fechaCobro,
      estado: this.estado,
      creadaEn: this.creadaEn,
    };
  }

  /**
   * Reconstruye una Suscripcion desde un objeto plano (reversión de toJSON).
   * @param   {object}      obj
   * @returns {Suscripcion}
   */
  static fromJSON(obj) {
    return new Suscripcion(obj);
  }
}

/* ============================================================
 *  CLASE: AppManager
 *  Contiene toda la lógica de negocio: autenticación, CRUD de
 *  suscripciones, cálculos del dashboard, filtros y persistencia
 *  exclusiva en LocalStorage.
 *
 *  Estructura de claves en LocalStorage:
 *    "gsub_users"         → Array<{username, password, creadoEn}>
 *    "gsub_session"       → string (username del usuario logueado)
 *    "gsub_data_<user>"   → Array<Suscripcion.toJSON()>
 * ============================================================ */
class AppManager {
  constructor() {
    /** Clave del directorio global de usuarios */
    this.STORAGE_KEY_USERS = "gsub_users";
    /** Clave de la sesión activa */
    this.STORAGE_KEY_SESSION = "gsub_session";
    /** Prefijo para las listas de suscripciones (aisladas por usuario) */
    this.STORAGE_KEY_PREFIX = "gsub_data_";

    /** @type {Usuario|null} */
    this.usuarioActual = null;
    /** @type {Suscripcion[]} */
    this.suscripciones = [];
  }

  /* ============================================================
   *  SECCIÓN: Utilidades internas
   * ============================================================ */

  /**
   * Hash determinista simple (djb2 modificado).
   * Convierte la contraseña en texto a un número hexadecimal de 32 bits.
   * ⚠ No es seguro para producción — adecuado para datos locales sin backend.
   * @param   {string} password
   * @returns {string} Hash en hexadecimal
   */
  _hashPassword(password) {
    let hash = 5381;
    for (let i = 0; i < password.length; i++) {
      // hash * 33 + charCode  (operación estándar djb2)
      hash = (hash << 5) + hash + password.charCodeAt(i);
      hash = hash & hash; // Truncar a entero de 32 bits con signo
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Clave de LocalStorage para el usuario actualmente autenticado.
   * Cada usuario tiene su propio espacio aislado de datos.
   * @returns {string}  "gsub_data_<username>"
   */
  _getStorageKey() {
    return `${this.STORAGE_KEY_PREFIX}${this.usuarioActual.username}`;
  }

  /**
   * Persiste el array de suscripciones del usuario actual en LocalStorage.
   * Llamado automáticamente tras cada operación de escritura (CRUD).
   */
  _guardarEnStorage() {
    const datos = this.suscripciones.map((s) => s.toJSON());
    localStorage.setItem(this._getStorageKey(), JSON.stringify(datos));
  }

  /**
   * Lee y reconstruye las suscripciones del usuario actual desde LocalStorage.
   * Si no existe la clave, inicializa con un array vacío.
   */
  _cargarDesdeStorage() {
    const raw = localStorage.getItem(this._getStorageKey());
    if (raw) {
      this.suscripciones = JSON.parse(raw).map((obj) =>
        Suscripcion.fromJSON(obj),
      );
    } else {
      this.suscripciones = [];
    }
  }

  /**
   * Lee el array de usuarios del directorio global de LocalStorage.
   * @returns {object[]}
   */
  _getUsuarios() {
    const raw = localStorage.getItem(this.STORAGE_KEY_USERS);
    return raw ? JSON.parse(raw) : [];
  }

  /* ============================================================
   *  SECCIÓN: Autenticación
   * ============================================================ */

  /**
   * Registra un nuevo usuario si el username no está en uso.
   * Valida longitud mínima de usuario (3) y contraseña (4).
   *
   * @param   {string} username
   * @param   {string} password
   * @returns {{ ok: boolean, mensaje: string }}
   */
  registrar(username, password) {
    const user = username.trim();
    const pass = password.trim();

    if (!user || !pass) {
      return { ok: false, mensaje: "Usuario y contraseña son obligatorios." };
    }
    if (user.length < 3) {
      return {
        ok: false,
        mensaje: "El usuario debe tener al menos 3 caracteres.",
      };
    }
    if (pass.length < 4) {
      return {
        ok: false,
        mensaje: "La contraseña debe tener al menos 4 caracteres.",
      };
    }

    const usuarios = this._getUsuarios();
    const existe = usuarios.some(
      (u) => u.username.toLowerCase() === user.toLowerCase(),
    );

    if (existe) {
      return { ok: false, mensaje: "Ese nombre de usuario ya existe." };
    }

    const nuevoUsuario = new Usuario(user, this._hashPassword(pass));
    usuarios.push(nuevoUsuario.toJSON());
    localStorage.setItem(this.STORAGE_KEY_USERS, JSON.stringify(usuarios));

    return { ok: true, mensaje: "Registro exitoso." };
  }

  /**
   * Verifica credenciales e inicia sesión si son correctas.
   * Persiste el username en LocalStorage para restauración de sesión.
   *
   * @param   {string} username
   * @param   {string} password
   * @returns {{ ok: boolean, mensaje: string }}
   */
  login(username, password) {
    if (!username.trim() || !password.trim()) {
      return { ok: false, mensaje: "Completa todos los campos." };
    }

    const usuarios = this._getUsuarios();
    const hashIngresado = this._hashPassword(password);
    const encontrado = usuarios.find(
      (u) =>
        u.username.toLowerCase() === username.trim().toLowerCase() &&
        u.password === hashIngresado,
    );

    if (!encontrado) {
      return { ok: false, mensaje: "Usuario o contraseña incorrectos." };
    }

    this.usuarioActual = Usuario.fromJSON(encontrado);
    localStorage.setItem(this.STORAGE_KEY_SESSION, this.usuarioActual.username);
    this._cargarDesdeStorage();

    return { ok: true, mensaje: "Bienvenido." };
  }

  /**
   * Cierra la sesión del usuario actual.
   * Limpia el estado en memoria y elimina la clave de sesión.
   * Los datos de suscripciones permanecen en LocalStorage para el próximo login.
   */
  logout() {
    this.usuarioActual = null;
    this.suscripciones = [];
    localStorage.removeItem(this.STORAGE_KEY_SESSION);
  }

  /**
   * Intenta restaurar una sesión previa guardada en LocalStorage.
   * Llamado durante la inicialización de la app (UI.init).
   *
   * @returns {boolean}  true si la sesión fue restaurada exitosamente
   */
  restaurarSesion() {
    const username = localStorage.getItem(this.STORAGE_KEY_SESSION);
    if (!username) return false;

    const usuarios = this._getUsuarios();
    const encontrado = usuarios.find((u) => u.username === username);
    if (!encontrado) return false;

    this.usuarioActual = Usuario.fromJSON(encontrado);
    this._cargarDesdeStorage();
    return true;
  }

  /* ============================================================
   *  SECCIÓN: CRUD de Suscripciones
   * ============================================================ */

  /**
   * Crea y agrega una nueva Suscripcion a la lista del usuario.
   * @param   {object}      datos  - Campos del formulario
   * @returns {Suscripcion}        - La instancia creada
   */
  agregarSuscripcion(datos) {
    const nueva = new Suscripcion(datos);
    this.suscripciones.push(nueva);
    this._guardarEnStorage();
    return nueva;
  }

  /**
   * Actualiza los campos de una Suscripcion existente por ID.
   * Preserva el ID original y la fecha de creación.
   *
   * @param   {string}  id
   * @param   {object}  datos  - Nuevos valores del formulario
   * @returns {boolean}        - false si el ID no existe
   */
  editarSuscripcion(id, datos) {
    const idx = this.suscripciones.findIndex((s) => s.id === id);
    if (idx === -1) return false;

    const original = this.suscripciones[idx];
    this.suscripciones[idx] = new Suscripcion({
      ...original.toJSON(), // base: datos previos
      ...datos, // sobreescribe con los nuevos
      id: original.id, // el ID nunca cambia
      creadaEn: original.creadaEn, // la fecha de creación tampoco
    });

    this._guardarEnStorage();
    return true;
  }

  /**
   * Elimina una Suscripcion por ID.
   * @param   {string}  id
   * @returns {boolean}  false si el ID no existe
   */
  eliminarSuscripcion(id) {
    const idx = this.suscripciones.findIndex((s) => s.id === id);
    if (idx === -1) return false;

    this.suscripciones.splice(idx, 1);
    this._guardarEnStorage();
    return true;
  }

  /**
   * Busca y retorna una Suscripcion por ID.
   * @param   {string}          id
   * @returns {Suscripcion|null}
   */
  getSuscripcion(id) {
    return this.suscripciones.find((s) => s.id === id) || null;
  }

  /* ============================================================
   *  SECCIÓN: Cálculos del Dashboard
   * ============================================================ */

  /**
   * Cuenta las suscripciones en estado "activa".
   * @returns {number}
   */
  getTotalActivas() {
    return this.suscripciones.filter((s) => s.estaActiva()).length;
  }

  /**
   * Suma el costoMensual de todas las suscripciones activas.
   * @returns {number}
   */
  getGastoMensualTotal() {
    return this.suscripciones
      .filter((s) => s.estaActiva())
      .reduce((acc, s) => acc + s.costoMensual, 0);
  }

  /**
   * Proyecta el gasto anual: gasto mensual × 12.
   * Asume que la cartera de suscripciones activas se mantiene constante.
   * @returns {number}
   */
  getGastoAnualProyectado() {
    return this.getGastoMensualTotal() * 12;
  }

  /**
   * Retorna las suscripciones "canceladas" que aún tienen
   * una fecha de cobro futura o igual a hoy.
   * Son una alerta: el usuario las marcó como canceladas en la app
   * pero el proveedor podría cobrarlas de todas formas.
   * @returns {Suscripcion[]}
   */
  getServiciosInactivos() {
    return this.suscripciones.filter((s) => s.tieneCobroPendiente());
  }

  /* ============================================================
   *  SECCIÓN: Filtros
   * ============================================================ */

  /**
   * Filtra la lista completa combinando categoría y estado.
   * Si alguno de los parámetros viene vacío (''), no filtra por ese eje.
   *
   * @param   {string}        categoria  - '' = todas
   * @param   {string}        estado     - '' = todos
   * @returns {Suscripcion[]}
   */
  filtrarCombinado(categoria, estado) {
    return this.suscripciones.filter((s) => {
      const matchCat = !categoria || s.categoria === categoria;
      const matchEst = !estado || s.estado === estado;
      return matchCat && matchEst;
    });
  }
}

/* ============================================================
 *  CLASE: UI
 *  Responsable de toda la interacción con el DOM:
 *    - Controla qué vista se muestra (auth vs. app)
 *    - Renderiza el dashboard, la tabla y el modal
 *    - Enlaza los event listeners de formularios, botones y filtros
 *    - Se comunica con AppManager para ejecutar la lógica de negocio
 * ============================================================ */
class UI {
  /**
   * @param {AppManager} appManager
   */
  constructor(appManager) {
    this.app = appManager;
    /** ID de la suscripción en edición; null en modo "crear" */
    this.editandoId = null;

    // Cachear referencias al DOM usadas frecuentemente
    this.vistaAuth = document.getElementById("vista-auth");
    this.vistaApp = document.getElementById("vista-app");
    this.modalOverlay = document.getElementById("modal-overlay");
    this.formAuth = document.getElementById("form-auth");
    this.formSub = document.getElementById("form-suscripcion");
    this.tablaWrapper = document.getElementById("tabla-wrapper");
  }

  /* ============================================================
   *  Punto de entrada
   * ============================================================ */

  /**
   * Inicializa la aplicación:
   *  1. Enlaza todos los event listeners.
   *  2. Si hay sesión guardada, muestra la app directamente.
   *     Si no, muestra el formulario de autenticación.
   */
  init() {
    this._bindEventos();

    if (this.app.restaurarSesion()) {
      this._mostrarVistaApp();
    } else {
      this._mostrarVistaAuth();
    }
  }

  /* ============================================================
   *  Control de vistas
   * ============================================================ */

  /** Activa la vista de autenticación y resetea el formulario */
  _mostrarVistaAuth() {
    this.vistaAuth.classList.remove("hidden");
    this.vistaApp.classList.add("hidden");
    this.formAuth.reset();
    this._limpiarError();
  }

  /** Activa la vista principal de la app y renderiza los datos */
  _mostrarVistaApp() {
    this.vistaAuth.classList.add("hidden");
    this.vistaApp.classList.remove("hidden");
    document.getElementById("header-username").textContent =
      `Bienvenido, ${this.app.usuarioActual.username}`;
    this._actualizarVista();
  }

  /* ============================================================
   *  Renderizado del Dashboard
   * ============================================================ */

  /**
   * Actualiza los 4 indicadores de la sección Dashboard.
   * Se llama después de cualquier cambio en las suscripciones.
   */
  renderDashboard() {
    document.getElementById("stat-activas").textContent =
      this.app.getTotalActivas();

    document.getElementById("stat-mensual").textContent = this._formatCurrency(
      this.app.getGastoMensualTotal(),
    );

    document.getElementById("stat-anual").textContent = this._formatCurrency(
      this.app.getGastoAnualProyectado(),
    );

    const inactivos = this.app.getServiciosInactivos();
    document.getElementById("stat-inactivos").textContent = inactivos.length;

    // Resaltar la tarjeta de alerta en amarillo si hay servicios problemáticos
    const cardAlerta = document.querySelector(".card-alerta");
    cardAlerta.classList.toggle("card-alerta--activa", inactivos.length > 0);
  }

  /* ============================================================
   *  Renderizado de la Tabla
   * ============================================================ */

  /**
   * Renderiza la lista de suscripciones en el DOM.
   * Si la lista está vacía, muestra el estado vacío con mensaje de ayuda.
   * @param {Suscripcion[]} lista
   */
  renderTabla(lista) {
    if (lista.length === 0) {
      this.tablaWrapper.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">📭</span>
                    <p>No hay suscripciones para mostrar.</p>
                    <small>Haz clic en "+ Nueva Suscripción" para comenzar.</small>
                </div>`;
      return;
    }

    // Construir filas con data-label para la tabla responsive en móvil
    const filas = lista
      .map(
        (s) => `
            <tr>
                <td data-label="Nombre">
                    <strong>${this._escapeHTML(s.nombre)}</strong>
                </td>
                <td data-label="Categoría">
                    <span class="badge badge-categoria">${this._escapeHTML(s.categoria)}</span>
                </td>
                <td data-label="Costo/Mes" class="text-right">
                    ${this._formatCurrency(s.costoMensual)}
                </td>
                <td data-label="Costo/Año" class="text-right">
                    ${this._formatCurrency(s.getCostoAnual())}
                </td>
                <td data-label="Próximo Cobro">
                    ${this._formatDate(s.fechaCobro)}
                    ${
                      s.tieneCobroPendiente()
                        ? `<span class="badge-alerta" title="Cancelada con cobro pendiente">⚠️</span>`
                        : ""
                    }
                </td>
                <td data-label="Estado">
                    <span class="badge badge-estado badge-estado--${s.estado}">
                        ${s.estado === "activa" ? "● Activa" : "○ Cancelada"}
                    </span>
                </td>
                <td data-label="Acciones" class="acciones">
                    <button class="btn-accion btn-editar"   data-id="${s.id}" title="Editar">✏</button>
                    <button class="btn-accion btn-eliminar" data-id="${s.id}" title="Eliminar">🗑</button>
                </td>
            </tr>
        `,
      )
      .join("");

    this.tablaWrapper.innerHTML = `
            <div class="table-responsive">
                <table class="tabla-suscripciones" aria-label="Lista de suscripciones">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th class="text-right">Costo/Mes</th>
                            <th class="text-right">Costo/Año</th>
                            <th>Próximo Cobro</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>`;

    // Enlazar botones de acción generados dinámicamente
    this.tablaWrapper
      .querySelectorAll(".btn-editar")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          this._abrirModalEditar(btn.dataset.id),
        ),
      );
    this.tablaWrapper
      .querySelectorAll(".btn-eliminar")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          this._confirmarEliminar(btn.dataset.id),
        ),
      );
  }

  /* ============================================================
   *  Modal CRUD
   * ============================================================ */

  /** Abre el modal en modo "Crear nueva suscripción" */
  _abrirModalCrear() {
    this.editandoId = null;
    document.getElementById("modal-title").textContent = "Nueva Suscripción";
    this.formSub.reset();
    // Asegurar estado por defecto = activa
    document.querySelector('input[name="sub-estado"][value="activa"]').checked =
      true;
    this.modalOverlay.classList.remove("hidden");
    // Llevar el foco al primer campo para accesibilidad
    document.getElementById("sub-nombre").focus();
  }

  /**
   * Abre el modal en modo "Editar" precargando los datos de la suscripción.
   * @param {string} id - ID de la suscripción a editar
   */
  _abrirModalEditar(id) {
    const sub = this.app.getSuscripcion(id);
    if (!sub) return;

    this.editandoId = id;
    document.getElementById("modal-title").textContent = "Editar Suscripción";

    document.getElementById("sub-nombre").value = sub.nombre;
    document.getElementById("sub-categoria").value = sub.categoria;
    document.getElementById("sub-costo").value = sub.costoMensual;
    document.getElementById("sub-fecha").value = sub.fechaCobro;

    document.querySelector(
      `input[name="sub-estado"][value="${sub.estado}"]`,
    ).checked = true;

    this.modalOverlay.classList.remove("hidden");
    document.getElementById("sub-nombre").focus();
  }

  /** Cierra el modal y limpia el estado de edición */
  _cerrarModal() {
    this.modalOverlay.classList.add("hidden");
    this.editandoId = null;
    this.formSub.reset();
  }

  /* ============================================================
   *  Flujo de actualización centralizado
   * ============================================================ */

  /**
   * Lee los filtros activos, obtiene la lista filtrada de AppManager
   * y re-renderiza tanto el dashboard como la tabla.
   * Se invoca tras cualquier cambio de datos o de filtros.
   */
  _actualizarVista() {
    const cat = document.getElementById("filtro-categoria").value;
    const est = document.getElementById("filtro-estado").value;
    const lista = this.app.filtrarCombinado(cat, est);

    this.renderDashboard(); // siempre sobre el total, no sobre la lista filtrada
    this.renderTabla(lista);
  }

  /* ============================================================
   *  Confirmación de eliminación
   * ============================================================ */

  /**
   * Solicita confirmación nativa antes de eliminar la suscripción.
   * Si el usuario acepta, delega en AppManager y refresca la vista.
   * @param {string} id
   */
  _confirmarEliminar(id) {
    const sub = this.app.getSuscripcion(id);
    if (!sub) return;

    if (
      confirm(`¿Eliminar "${sub.nombre}"?\nEsta acción no se puede deshacer.`)
    ) {
      this.app.eliminarSuscripcion(id);
      this._actualizarVista();
    }
  }

  /* ============================================================
   *  Utilidades de formato y seguridad
   * ============================================================ */

  /**
   * Formatea un número como cadena de moneda con 2 decimales.
   * @param   {number} valor
   * @returns {string}  Ej: "$15.99"
   */
  _formatCurrency(valor) {
    return `$${valor.toFixed(2)}`;
  }

  /**
   * Convierte una fecha en formato YYYY-MM-DD a DD/MM/YYYY (más legible).
   * @param   {string} isoDate  - Formato YYYY-MM-DD
   * @returns {string}
   */
  _formatDate(isoDate) {
    if (!isoDate) return "—";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  }

  /**
   * Escapa caracteres HTML especiales para prevenir inyección de HTML/XSS
   * al insertar contenido de usuario en el DOM vía innerHTML.
   * @param   {string} str
   * @returns {string}
   */
  _escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }

  /* -------- Mensajes de error en auth -------- */

  _mostrarError(mensaje) {
    const el = document.getElementById("auth-error");
    el.textContent = mensaje;
    el.classList.remove("hidden");
  }

  _limpiarError() {
    const el = document.getElementById("auth-error");
    el.textContent = "";
    el.classList.add("hidden");
  }

  /* ============================================================
   *  Enlace de eventos
   * ============================================================ */

  /**
   * Registra todos los event listeners de la aplicación en un solo lugar.
   * Se llama una única vez desde init().
   */
  _bindEventos() {
    /* ---- TABS: Login / Registro ---- */
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        // Actualizar estado visual y ARIA de las pestañas
        document.querySelectorAll(".tab-btn").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        // Cambiar el texto del botón de envío según la pestaña activa
        const esLogin = btn.dataset.tab === "login";
        document.getElementById("auth-submit-btn").textContent = esLogin
          ? "Entrar"
          : "Registrarse";

        this._limpiarError();
      });
    });

    /* ---- FORMULARIO de Auth (Login / Registro) ---- */
    this.formAuth.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("auth-username").value.trim();
      const password = document.getElementById("auth-password").value;
      const esLogin =
        document.querySelector(".tab-btn.active").dataset.tab === "login";

      if (esLogin) {
        const resultado = this.app.login(username, password);
        if (resultado.ok) {
          this._mostrarVistaApp();
        } else {
          this._mostrarError(resultado.mensaje);
        }
      } else {
        const resultado = this.app.registrar(username, password);
        if (resultado.ok) {
          // Login automático tras registro exitoso
          this.app.login(username, password);
          this._mostrarVistaApp();
        } else {
          this._mostrarError(resultado.mensaje);
        }
      }
    });

    /* ---- BOTÓN Cerrar Sesión ---- */
    document.getElementById("btn-logout").addEventListener("click", () => {
      this.app.logout();
      this._mostrarVistaAuth();
    });

    /* ---- BOTÓN Nueva Suscripción ---- */
    document.getElementById("btn-nueva").addEventListener("click", () => {
      this._abrirModalCrear();
    });

    /* ---- FORMULARIO de Suscripción (Crear / Editar) ---- */
    this.formSub.addEventListener("submit", (e) => {
      e.preventDefault();

      const datos = {
        nombre: document.getElementById("sub-nombre").value.trim(),
        categoria: document.getElementById("sub-categoria").value,
        costoMensual: document.getElementById("sub-costo").value,
        fechaCobro: document.getElementById("sub-fecha").value,
        estado: document.querySelector('input[name="sub-estado"]:checked')
          .value,
      };

      if (this.editandoId) {
        this.app.editarSuscripcion(this.editandoId, datos);
      } else {
        this.app.agregarSuscripcion(datos);
      }

      this._cerrarModal();
      this._actualizarVista();
    });

    /* ---- CERRAR MODAL — botones y clic en el fondo ---- */
    document
      .getElementById("modal-cerrar")
      .addEventListener("click", () => this._cerrarModal());
    document
      .getElementById("btn-cancelar-modal")
      .addEventListener("click", () => this._cerrarModal());
    this.modalOverlay.addEventListener("click", (e) => {
      // Solo cerrar si el clic fue directamente en el overlay (fondo oscuro),
      // no en el contenido del modal
      if (e.target === this.modalOverlay) this._cerrarModal();
    });

    /* ---- TECLA Escape para cerrar modal ---- */
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !this.modalOverlay.classList.contains("hidden")
      ) {
        this._cerrarModal();
      }
    });

    /* ---- FILTROS (categoría y estado) ---- */
    document
      .getElementById("filtro-categoria")
      .addEventListener("change", () => this._actualizarVista());
    document
      .getElementById("filtro-estado")
      .addEventListener("change", () => this._actualizarVista());
  }
}

/* ============================================================
 *  INICIALIZACIÓN DE LA APLICACIÓN
 *
 *  1. Se crea la instancia de AppManager (lógica de negocio).
 *  2. Se crea la instancia de UI, inyectando el AppManager.
 *  3. UI.init() determina la vista inicial según la sesión
 *     y registra todos los event listeners.
 * ============================================================ */
const app = new AppManager();
const ui = new UI(app);
ui.init();
