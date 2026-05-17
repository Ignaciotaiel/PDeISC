/**
 * @proyecto     DOM Explorer - Ejercicio 3
 * @archivo      scripts/hijos.js
 * @descripcion  Módulo de inspección de nodos hijos del DOM.
 */

/**
 * Configura el botón de conteo de hijos dentro del contenedor dado.
 */
export const setupChildCounter = (container) => {
  if (!container) return;

  const counterWrapper = document.createElement('div');
  counterWrapper.className = 'mt-4 pt-3 border-top border-secondary text-center';
  
  counterWrapper.innerHTML = `
    <button class="btn btn-custom btn-sm" id="btn-ver-hijos">
      Ver hijos
    </button>
    <div id="hijos-info" class="mt-3 code-font text-cyan fade-in" style="display: none;">
      Total de hijos: <span class="badge bg-violet" id="hijos-count">0</span>
    </div>
  `;

  container.appendChild(counterWrapper);

  const btn = counterWrapper.querySelector('#btn-ver-hijos');
  const info = counterWrapper.querySelector('#hijos-info');
  const countSpan = counterWrapper.querySelector('#hijos-count');

  btn.addEventListener('click', () => {
    // Se cuentan solo los elementos HTML (no nodos de texto ni comentarios)
    const childrenCount = container.children.length;
    
    countSpan.innerText = childrenCount;
    info.style.display = 'block';
    
    // Micro-animación de escala
    countSpan.style.transform = 'scale(1.2)';
    setTimeout(() => countSpan.style.transform = 'scale(1)', 200);
  });
};
