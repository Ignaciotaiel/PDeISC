/**
 * @proyecto     DOM Explorer - Ejercicio 4
 * @archivo      scripts/log.js
 * @descripcion  Módulo de registro de historial de cambios.
 */

import { confirmAction } from '../modules/ui.js';

/**
 * Agrega una entrada al historial de cambios.
 */
export const addLog = (nodeName, attr, oldVal, newVal) => {
  const logContainer = document.getElementById('log-container');
  if (!logContainer) return;

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour12: false });
  
  const logItem = document.createElement('div');
  logItem.className = 'log-item fade-in';
  logItem.innerHTML = `
    <span class="text-cyan">[${time}]</span> 
    <span class="text-violet fw-bold">${nodeName}</span>: 
    <span class="text-muted">${attr}</span> modificado 
    <div class="ps-3 mt-1">
      <span class="log-old">${oldVal}</span> → 
      <span class="log-new">${newVal}</span>
    </div>
  `;
  logContainer.prepend(logItem);
};

document.addEventListener('DOMContentLoaded', () => {
  const btnClearLog = document.getElementById('btn-clear-log');
  if (btnClearLog) {
    btnClearLog.addEventListener('click', () => {
      confirmAction('¿Deseás limpiar todo el historial de cambios?', () => {
        const logContainer = document.getElementById('log-container');
        if (logContainer) logContainer.innerHTML = '';
      });
    });
  }
});
