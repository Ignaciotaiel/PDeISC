/**
 * @proyecto     DOM Explorer - Ejercicio 2
 * @archivo      scripts/reloj.js
 * @descripcion  Componente Reloj en Tiempo Real.
 */

import { addSafeListener, addSafeInterval } from './navegacion.js';

/**
 * Renderiza el componente Reloj en Tiempo Real.
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
  
  let isPaused = false;
  let is24h = true;
  const display = document.getElementById('clock-display');
  
  const updateClock = () => {
    if (isPaused || !display) return;
    const now = new Date();
    display.innerText = now.toLocaleTimeString('es-AR', { hour12: !is24h });
  };
  
  addSafeInterval(updateClock, 1000);
  updateClock();
  
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
