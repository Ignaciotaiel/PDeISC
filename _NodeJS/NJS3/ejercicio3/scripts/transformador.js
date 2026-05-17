/**
 * @proyecto     DOM Explorer - Ejercicio 3
 * @archivo      scripts/transformador.js
 * @descripcion  Componente Transformador de Texto.
 */

import { addSafeListener } from './navegacion.js';

/**
 * Renderiza el componente Transformador de Texto.
 */
export const renderTransformer = () => {
  const container = document.getElementById('component-container');
  container.innerHTML = `
    <div class="component-card">
      <h2 class="card-title mb-4">Transformador de Texto</h2>
      <input type="text" id="text-input" class="form-control bg-dark text-white border-secondary mb-4 p-3" placeholder="Escribe algo aquí...">
      <div class="row g-2 mb-4">
        <div class="col-6 col-md-3"><button id="btn-upper" class="btn btn-custom w-100 btn-sm">MAYÚS</button></div>
        <div class="col-6 col-md-3"><button id="btn-lower" class="btn btn-custom w-100 btn-sm">minús</button></div>
        <div class="col-6 col-md-3"><button id="btn-reverse" class="btn btn-custom w-100 btn-sm">Invertir</button></div>
        <div class="col-6 col-md-3"><button id="btn-count" class="btn btn-custom w-100 btn-sm">Contar</button></div>
      </div>
      <div id="transform-result" class="p-3 border border-secondary rounded code-font text-cyan text-center" style="min-height: 60px;">
        Resultado...
      </div>
    </div>
  `;
  
  const input = document.getElementById('text-input');
  const result = document.getElementById('transform-result');
  
  const showResult = (text) => {
    if (result) {
      result.innerText = text;
      result.classList.remove('fade-in');
      void result.offsetWidth;
      result.classList.add('fade-in');
    }
  };
  
  addSafeListener(document.getElementById('btn-upper'), 'click', () => showResult(input.value.toUpperCase()));
  addSafeListener(document.getElementById('btn-lower'), 'click', () => showResult(input.value.toLowerCase()));
  addSafeListener(document.getElementById('btn-reverse'), 'click', () => showResult(input.value.split('').reverse().join('')));
  addSafeListener(document.getElementById('btn-count'), 'click', () => showResult(`Caracteres: ${input.value.length}`));
  addSafeListener(input, 'input', (e) => showResult(e.target.value));
};
