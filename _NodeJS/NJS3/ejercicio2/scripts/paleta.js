/**
 * @proyecto     DOM Explorer - Ejercicio 2
 * @archivo      scripts/paleta.js
 * @descripcion  Componente Paleta de Colores.
 */

import { addSafeListener } from './navegacion.js';

/**
 * Renderiza el componente Paleta de Colores.
 */
export const renderPalette = () => {
  const container = document.getElementById('component-container');
  const colors = ['#7c3aed', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#f472b6'];
  container.innerHTML = `
    <div class="component-card text-center" id="palette-area">
      <h2 class="card-title mb-4">Paleta de Colores</h2>
      <div class="d-flex justify-content-center gap-4 mb-4">
        ${colors.map(c => `<div class="swatch" style="background-color: ${c}" data-color="${c}"></div>`).join('')}
      </div>
      <div id="color-info" class="code-font text-muted p-3 bg-dark rounded">
        Haz clic en un color para cambiar el fondo
      </div>
    </div>
  `;
  
  const area = document.getElementById('palette-area');
  const info = document.getElementById('color-info');
  const swatches = document.querySelectorAll('.swatch');
  
  swatches.forEach(swatch => {
    const color = swatch.dataset.color;
    
    addSafeListener(swatch, 'click', () => {
      if (area) area.style.backgroundColor = `${color}22`;
      if (info) info.innerHTML = `<span style="color: ${color}">HEX: ${color}</span>`;
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
    
    addSafeListener(swatch, 'mouseover', () => {
      if (info && !swatch.classList.contains('active')) {
        info.innerText = `Preview: ${color}`;
      }
    });
  });
};
