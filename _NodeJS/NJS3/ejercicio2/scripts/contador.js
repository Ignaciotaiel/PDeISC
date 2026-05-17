/**
 * @proyecto     DOM Explorer - Ejercicio 2
 * @archivo      scripts/contador.js
 * @descripcion  Componente Contador Interactivo.
 */

import { addSafeListener } from './navegacion.js';
import { confirmAction } from '../modules/ui.js';

/**
 * Renderiza el componente Contador Interactivo.
 */
export const renderCounter = () => {
  const container = document.getElementById('component-container');
  container.innerHTML = `
    <div class="component-card text-center">
      <h2 class="card-title mb-4">Contador Interactivo</h2>
      <div class="counter-value code-font mb-4" id="count-val">0</div>
      <div class="progress mb-4">
        <div id="counter-progress" class="progress-bar" role="progressbar" style="width: 0%"></div>
      </div>
      <div class="d-flex justify-content-center gap-3">
        <button id="btn-dec" class="btn btn-custom px-4">-</button>
        <button id="btn-reset" class="btn btn-outline-secondary">Reset</button>
        <button id="btn-inc" class="btn btn-custom px-4">+</button>
      </div>
    </div>
  `;
  
  let count = 0;

  const updateUI = () => {
    const val = document.getElementById('count-val');
    const prog = document.getElementById('counter-progress');
    if (val) val.innerText = count;
    if (prog) prog.style.width = `${Math.min(Math.max(count, 0), 100)}%`;
  };
  
  addSafeListener(document.getElementById('btn-inc'), 'click', () => { count++; updateUI(); });
  addSafeListener(document.getElementById('btn-dec'), 'click', () => { count--; updateUI(); });
  addSafeListener(document.getElementById('btn-reset'), 'click', () => {
    confirmAction('¿Deseás reiniciar el contador?', () => {
      count = 0;
      updateUI();
    });
  });
};
