/**
 * @proyecto     DOM Explorer - Ejercicio 3
 * @archivo      scripts/lista.js
 * @descripcion  Componente Lista Dinámica.
 */

import { addSafeListener } from './navegacion.js';
import { confirmAction } from '../modules/ui.js';

/**
 * Renderiza el componente Lista Dinámica.
 */
export const renderList = () => {
  const container = document.getElementById('component-container');
  container.innerHTML = `
    <div class="component-card">
      <h2 class="card-title mb-4">Lista Dinámica</h2>
      <div class="input-group mb-4">
        <input type="text" id="list-input" class="form-control bg-dark text-white border-secondary" placeholder="Nuevo ítem...">
        <button id="btn-add-item" class="btn btn-custom">Agregar</button>
      </div>
      <div class="d-flex gap-2 mb-4">
        <button id="btn-remove-last" class="btn btn-outline-danger btn-sm">Eliminar Último</button>
        <button id="btn-clear-list" class="btn btn-danger btn-sm">Vaciar</button>
      </div>
      <ul id="dynamic-list" class="list-group list-group-flush"></ul>
    </div>
  `;
  
  const input = document.getElementById('list-input');
  const list = document.getElementById('dynamic-list');
  
  const addItem = () => {
    if (!input || !input.value.trim()) return;
    const li = document.createElement('li');
    li.className = 'list-group-item bg-transparent text-white border-secondary d-flex justify-content-between align-items-center fade-in';
    li.innerHTML = `
      <span>${input.value}</span>
      <button class="btn btn-sm btn-outline-danger border-0">✕</button>
    `;
    li.querySelector('button').onclick = () => li.remove();
    if (list) list.appendChild(li);
    input.value = '';
    input.focus();
  };
  
  addSafeListener(document.getElementById('btn-add-item'), 'click', addItem);
  addSafeListener(input, 'keypress', (e) => { if(e.key === 'Enter') addItem(); });
  addSafeListener(document.getElementById('btn-remove-last'), 'click', () => list?.lastElementChild?.remove());
  addSafeListener(document.getElementById('btn-clear-list'), 'click', () => {
    confirmAction('¿Deseás vaciar la lista por completo?', () => {
      if (list) list.innerHTML = '';
    });
  });
};
