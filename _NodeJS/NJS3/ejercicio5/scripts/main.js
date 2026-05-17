/**
 * @proyecto     DOM Explorer - Ejercicio 5
 * @archivo      scripts/main.js
 * @descripcion  Lógica principal de inserción y gestión del DOM.
 */

import { TEMPLATES } from './templates.js';
import { confirmAction } from '../modules/ui.js';

let totalCount = 0;
const counters = { table: 0, card: 0, form: 0, list: 0, alert: 0 };

/**
 * Actualiza el contador total.
 */
const updateUI = () => {
  const totalDisplay = document.getElementById('total-count');
  if (totalDisplay) totalDisplay.innerText = totalCount;
};

/**
 * Inserta un nuevo elemento HTML.
 */
export const insertElement = (type) => {
  const contentArea = document.getElementById('content-area');
  if (!contentArea || !TEMPLATES[type]) return;

  totalCount++;
  counters[type]++;
  
  const html = TEMPLATES[type](counters[type]);
  contentArea.insertAdjacentHTML('afterbegin', html);
  
  updateUI();
};

/**
 * Elimina el último elemento agregado.
 */
export const undoLast = () => {
  const contentArea = document.getElementById('content-area');
  if (contentArea && contentArea.firstElementChild) {
    contentArea.removeChild(contentArea.firstElementChild);
    totalCount--;
    updateUI();
  }
};

/**
 * Limpia todo el área de contenido.
 */
export const clearAll = () => {
  const contentArea = document.getElementById('content-area');
  if (totalCount === 0 || !contentArea) return;
  
  confirmAction('¿Deseás eliminar todos los elementos insertados?', () => {
    contentArea.innerHTML = '';
    totalCount = 0;
    Object.keys(counters).forEach(k => counters[k] = 0);
    updateUI();
  });
};

/**
 * Configura la delegación de eventos.
 */
export const setupEventDelegation = () => {
  const contentArea = document.getElementById('content-area');
  if (!contentArea) return;

  contentArea.addEventListener('click', (e) => {
    const target = e.target.closest('.action-btn');
    if (!target) return;
    
    const action = target.dataset.action;
    const parent = target.closest('.content-item');
    
    if (action === 'click-card') {
      target.innerText = '¡Explorado!';
      target.classList.replace('btn-custom', 'btn-success');
    }
    
    if (action === 'submit-form' && parent) {
      const inputs = parent.querySelectorAll('input');
      const allFilled = Array.from(inputs).every(i => i.value.trim() !== '');
      
      if (allFilled) {
        target.innerText = '¡Enviado!';
        target.disabled = true;
      } else {
        target.classList.add('btn-danger');
        setTimeout(() => target.classList.remove('btn-danger'), 1000);
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-type]').forEach(btn => {
    btn.addEventListener('click', () => insertElement(btn.dataset.type));
  });
  
  const btnUndo = document.getElementById('btn-undo');
  const btnClear = document.getElementById('btn-clear');

  if (btnUndo) btnUndo.addEventListener('click', undoLast);
  if (btnClear) btnClear.addEventListener('click', () => clearAll());
  
  setupEventDelegation();
  updateUI();
});
