/**
 * @proyecto     DOM Explorer - Ejercicio 5
 * @archivo      scripts/templates.js
 * @descripcion  Plantillas HTML para la inserción dinámica de elementos.
 *               Cada plantilla es una función que recibe un número de instancia
 *               y retorna el string HTML listo para insertar con innerHTML.
 *               Incluye: Tabla de productos, Card con imagen, Formulario de
 *               suscripción, Lista con badges y Alerta dismissible.
 * @autor        Taiel
 * @version      1.0
 * @fecha        2026-04-20
 *
 * @dependencias Bootstrap 5 (para clases de tabla, card, form, list y alert)
 * @notas        Se carga antes de main.js porque este último referencia al
 *               objeto TEMPLATES. Las plantillas usan template literals para
 *               interpolar el número de instancia.
 */

/* ──────────────────────────────────────────
   SECCIÓN: Definición de plantillas
   Objeto con una función por cada tipo de
   elemento que se puede insertar en el DOM
   ────────────────────────────────────────── */

/**
 * Objeto que contiene las plantillas HTML como funciones.
 * Cada función recibe el número de instancia y retorna un string HTML.
 *
 * @type {Object.<string, function(number): string>}
 */
export const TEMPLATES = {
  /**
   * Genera una tabla de productos con 4 filas de datos estáticos.
   *
   * @param    {number} count - Número de instancia de esta tabla
   * @returns  {string} HTML de la tabla
   */
  table: (count) => `
    <div class="content-item" id="item-${count}">
      <span class="item-badge">Tabla #${count}</span>
      <div class="card bg-dark border-secondary overflow-hidden">
        <table class="table table-dark table-hover mb-0">
          <thead class="table-violet">
            <tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Categoría</th></tr>
          </thead>
          <tbody>
            <tr><td>Laptop Pro</td><td>$1200</td><td>15</td><td>Electrónica</td></tr>
            <tr><td>Teclado RGB</td><td>$85</td><td>42</td><td>Periféricos</td></tr>
            <tr><td>Monitor 4K</td><td>$350</td><td>8</td><td>Imagen</td></tr>
            <tr><td>Mouse Gamer</td><td>$45</td><td>25</td><td>Periféricos</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `,

  /**
   * Genera una card con imagen aleatoria de Picsum y botón interactivo.
   *
   * @param    {number} count - Número de instancia de esta card
   * @returns  {string} HTML de la card
   */
  card: (count) => `
    <div class="content-item" id="item-${count}">
      <span class="item-badge">Card #${count}</span>
      <div class="card bg-dark border-secondary" style="max-width: 350px;">
        <img src="https://picsum.photos/seed/${count}/350/150" class="card-img-top" alt="Random">
        <div class="card-body">
          <h5 class="card-title text-cyan">Exploración DOM #${count}</h5>
          <p class="card-text text-muted small">Inserción dinámica de componentes usando innerHTML con binding de eventos mediante delegación.</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="badge bg-violet">Node.js</span>
            <button class="btn btn-sm btn-custom action-btn" data-action="click-card">Ver más</button>
          </div>
        </div>
      </div>
    </div>
  `,

  /**
   * Genera un formulario de suscripción con campos de Nombre y Email.
   *
   * @param    {number} count - Número de instancia de este formulario
   * @returns  {string} HTML del formulario
   */
  form: (count) => `
    <div class="content-item" id="item-${count}">
      <span class="item-badge">Formulario #${count}</span>
      <div class="card bg-dark border-secondary p-4" style="max-width: 500px;">
        <h6 class="text-cyan mb-3">Suscripción Express</h6>
        <div class="mb-3">
          <label class="form-label small text-muted">Nombre</label>
          <input type="text" class="form-control form-control-sm bg-dark text-white border-secondary">
        </div>
        <div class="mb-3">
          <label class="form-label small text-muted">Email</label>
          <input type="email" class="form-control form-control-sm bg-dark text-white border-secondary">
        </div>
        <button class="btn btn-sm btn-custom w-100 action-btn" data-action="submit-form">Enviar</button>
      </div>
    </div>
  `,

  /**
   * Genera una lista con 3 ítems y badges decorativos.
   *
   * @param    {number} count - Número de instancia de esta lista
   * @returns  {string} HTML de la lista
   */
  list: (count) => `
    <div class="content-item" id="item-${count}">
      <span class="item-badge">Lista #${count}</span>
      <ul class="list-group list-group-flush border border-secondary rounded overflow-hidden" style="max-width: 400px;">
        <li class="list-group-item bg-dark text-white d-flex align-items-center">
          <span class="me-3">🔥</span> Item Principal 1 <span class="badge bg-cyan ms-auto">New</span>
        </li>
        <li class="list-group-item bg-dark text-white d-flex align-items-center">
          <span class="me-3">⚡</span> Item Secundario 2 <span class="badge bg-violet ms-auto">Hot</span>
        </li>
        <li class="list-group-item bg-dark text-white d-flex align-items-center">
          <span class="me-3">💎</span> Item Especial 3 <span class="badge bg-warning ms-auto">Pro</span>
        </li>
      </ul>
    </div>
  `,

  /**
   * Genera una alerta Bootstrap con tipo aleatorio (success, warning, danger, info).
   * El tipo se elige al azar cada vez que se invoca la función.
   *
   * @param    {number} count - Número de instancia de esta alerta
   * @returns  {string} HTML de la alerta
   */
  alert: (count) => {
    const types = ['success', 'warning', 'danger', 'info'];
    const type = types[Math.floor(Math.random() * types.length)];
    return `
      <div class="content-item" id="item-${count}">
        <div class="alert alert-${type} alert-dismissible fade show bg-dark border-${type} text-${type}" role="alert">
          <strong class="code-font">NOTIFICACIÓN #${count}:</strong> ¡Elemento insertado exitosamente mediante innerHTML!
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    `;
  }
};
