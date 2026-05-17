/**
 * @proyecto     DOM Explorer - Ejercicio 3
 * @archivo      scripts/reloj.js
 * @descripcion  Componente Reloj en Tiempo Real de la SPA. Idéntico al del
 *               Ejercicio 2: muestra la hora con actualización cada segundo,
 *               permite pausar y alternar entre formato 12h/24h.
 * @autor        Taiel
 * @version      1.0
 * @fecha        2026-04-20
 *
 * @dependencias navegacion.js (función addSafeListener y array activeIntervals)
 * @notas        El intervalo se registra en activeIntervals para que cleanup()
 *               lo detenga automáticamente al cambiar de componente.
 */

import { addSafeListener, addSafeInterval } from './navegacion.js';

/* ──────────────────────────────────────────
   SECCIÓN: Funciones principales
   ────────────────────────────────────────── */

/**
 * Renderiza el componente Reloj en Tiempo Real.
 *
 * @function renderClock
 * @returns  {void}
 */
export const renderClock = () => {
  const container = document.getElementById('component-container');
  container.innerHTML = `
    <div class="component-card text-center">
      <h2 class="card-title mb-4">Reloj en Tiempo Real</h2>
      <div id="clock-display" class="code-font mb-4" style="font-size: 5rem; color: var(--accent-cyan);">00:00:00</div>
      <div class="d-flex justify-content-center gap-3">
        <button id="btn-toggle-clock" class="btn btn-custom">Pausar</button>
        <button id="btn-format" class="btn btn-outline-secondary">Formato 12h/24h</button>
      </div>
    </div>
  `;
  
  /* ──────────────────────────────────────────
     SECCIÓN: Variables de estado
     ────────────────────────────────────────── */
  let isPaused = false;
  let is24h = true;
  const display = document.getElementById('clock-display');
  
  /**
   * Actualiza el display del reloj con la hora actual.
   *
   * @function updateClock
   * @returns  {void}
   */
  const updateClock = () => {
    if (isPaused) return;
    const now = new Date();
    display.innerText = now.toLocaleTimeString('es-AR', { hour12: !is24h });
  };
  
  addSafeInterval(updateClock, 1000);
  updateClock();
  
  /* ──────────────────────────────────────────
     SECCIÓN: Eventos
     ────────────────────────────────────────── */
  addSafeListener(document.getElementById('btn-toggle-clock'), 'click', (e) => {
    isPaused = !isPaused;
    e.target.innerText = isPaused ? 'Reanudar' : 'Pausar';
    e.target.classList.toggle('btn-success', isPaused);
  });
  
  addSafeListener(document.getElementById('btn-format'), 'click', () => {
    is24h = !is24h;
    updateClock();
  });
};
