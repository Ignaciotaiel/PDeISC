/**
 * @proyecto     DOM Explorer - Ejercicio 2
 * @archivo      scripts/navegacion.js
 * @descripcion  Módulo de navegación y gestión de la SPA.
 */

import { renderCounter } from './contador.js';
import { renderTransformer } from './transformador.js';
import { renderList } from './lista.js';
import { renderClock } from './reloj.js';
import { renderPalette } from './paleta.js';

let activeIntervals = [];
let activeListeners = [];

/**
 * Limpia el estado actual antes de cambiar de componente.
 */
export const cleanup = () => {
  const container = document.getElementById('component-container');
  activeIntervals.forEach(clearInterval);
  activeIntervals = [];
  
  activeListeners.forEach(({ target, type, fn }) => {
    if (target) target.removeEventListener(type, fn);
  });
  activeListeners = [];
  
  if (container) container.innerHTML = '';
};

/**
 * Registra un event listener y lo guarda para limpieza automática.
 */
export const addSafeListener = (target, type, fn) => {
  if (target) {
    target.addEventListener(type, fn);
    activeListeners.push({ target, type, fn });
  }
};

/**
 * Agrega un intervalo y lo guarda para limpieza automática.
 */
export const addSafeInterval = (fn, delay) => {
  const interval = setInterval(fn, delay);
  activeIntervals.push(interval);
  return interval;
};

/**
 * Renderiza el componente solicitado.
 */
export const renderComponent = (name) => {
  const container = document.getElementById('component-container');
  const breadcrumb = document.getElementById('breadcrumb-active');
  
  cleanup();
  
  const components = {
    counter: renderCounter,
    transformer: renderTransformer,
    list: renderList,
    clock: renderClock,
    palette: renderPalette
  };
  
  if (components[name]) {
    components[name]();
    if (breadcrumb) {
      breadcrumb.innerText = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    const card = container.querySelector('.component-card');
    if (card) {
      card.classList.add('fade-in');
    }
  }
};

// Inicialización de la navegación
document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('[data-component]');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderComponent(btn.dataset.component);
    });
  });

  renderComponent('counter');
});
