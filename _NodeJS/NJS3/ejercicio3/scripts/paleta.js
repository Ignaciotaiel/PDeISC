/**
 * @proyecto     DOM Explorer - Ejercicio 3
 * @archivo      scripts/paleta.js
 * @descripcion  Componente Paleta de Colores de la SPA. Idéntico al del
 *               Ejercicio 2: muestra swatches de colores que al hacer clic
 *               cambian el fondo del área y muestran el código HEX.
 * @autor        Taiel
 * @version      1.0
 * @fecha        2026-04-20
 *
 * @dependencias navegacion.js (función addSafeListener para registro seguro de eventos)
 * @notas        El fondo se aplica con opacidad baja para mantener legibilidad.
 */

import { addSafeListener } from './navegacion.js';

/* ──────────────────────────────────────────
   SECCIÓN: Funciones principales
   ────────────────────────────────────────── */

/**
 * Renderiza el componente Paleta de Colores.
 *
 * @function renderPalette
 * @returns  {void}
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
  
  /* ──────────────────────────────────────────
     SECCIÓN: Eventos
     ────────────────────────────────────────── */
  swatches.forEach(swatch => {
    const color = swatch.dataset.color;
    
    addSafeListener(swatch, 'click', () => {
      area.style.backgroundColor = `${color}22`; // Sufijo 22 = opacidad ~13%
      info.innerHTML = `<span style="color: ${color}">HEX: ${color}</span>`;
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
    
    addSafeListener(swatch, 'mouseover', () => {
      if (!swatch.classList.contains('active')) {
        info.innerText = `Preview: ${color}`;
      }
    });
  });
};
