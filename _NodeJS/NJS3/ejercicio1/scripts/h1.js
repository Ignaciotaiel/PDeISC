/**
 * @proyecto     DOM Explorer - Ejercicio 1
 * @archivo      scripts/h1.js
 * @descripcion  Módulo que gestiona la creación y modificación de un elemento H1.
 */


import { showToast, updateButtonStates } from '../modules/ui.js';

const H1_CONFIG = {
  colors: ['#7c3aed', '#06b6d4', '#f59e0b'],
};

let h1State = {
  h1ColorIndex: 0,
};

/**
 * Crea y agrega un elemento H1 al área de previsualización.
 */
export const handleAddH1 = () => {
  const previewArea = document.getElementById('preview-area');
  if (document.querySelector('#preview-area h1')) {
    showToast('El H1 ya fue creado');
    return;
  }
  
  const h1 = document.createElement('h1');
  h1.innerText = 'Hola DOM';
  h1.className = 'fade-in fw-bold';
  h1.style.color = H1_CONFIG.colors[h1State.h1ColorIndex];
  
  previewArea.appendChild(h1);

  updateButtonStates();
};

/**
 * Alterna el texto del H1.
 */
export const handleChangeH1Text = () => {
  const h1 = document.querySelector('#preview-area h1');
  if (!h1) {
    showToast('No existe un H1 para modificar');
    return;
  }
  
  const oldText = h1.innerText;
  h1.innerText = (oldText === 'Hola DOM') ? 'Chau DOM' : 'Hola DOM';

};

/**
 * Cambia el color del H1 rotando la paleta.
 */
export const handleChangeH1Color = () => {
  const h1 = document.querySelector('#preview-area h1');
  const h1ColorStatus = document.getElementById('h1ColorStatus');
  if (!h1) return;
  
  h1State.h1ColorIndex = (h1State.h1ColorIndex + 1) % H1_CONFIG.colors.length;
  const newColor = H1_CONFIG.colors[h1State.h1ColorIndex];
  
  h1.style.color = newColor;
  h1.style.transition = 'color 0.5s ease';
  
  if (h1ColorStatus) {
    h1ColorStatus.innerText = `Color: ${newColor}`;
    h1ColorStatus.style.color = newColor;
  }
  

};

// Inicialización de eventos para H1
document.addEventListener('DOMContentLoaded', () => {
  const btnAddH1 = document.getElementById('btnAddH1');
  const btnChangeH1Text = document.getElementById('btnChangeH1Text');
  const btnChangeH1Color = document.getElementById('btnChangeH1Color');

  if (btnAddH1) btnAddH1.addEventListener('click', handleAddH1);
  if (btnChangeH1Text) btnChangeH1Text.addEventListener('click', handleChangeH1Text);
  if (btnChangeH1Color) btnChangeH1Color.addEventListener('click', handleChangeH1Color);
  
  updateButtonStates();
});
