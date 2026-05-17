import { calcularAguaNecesaria } from '../modules/calculo.js';

// esperamos a que cargue la vista para empezar
document.addEventListener('DOMContentLoaded', () => {
  const btnCalculoAgua = document.getElementById('btn-calcular-agua');
  const inputCafe = document.getElementById('input-cafe');
  const resultadoAgua = document.getElementById('resultado-agua');

  // si estan los elementos, atajamos el clic del boton
  if (btnCalculoAgua && inputCafe && resultadoAgua) {
    btnCalculoAgua.addEventListener('click', () => {
      const gramos = parseFloat(inputCafe.value);
      
      // verificamos que sea un numero real y mayor a cero
      if (!isNaN(gramos) && gramos > 0) {
        const ml = calcularAguaNecesaria(gramos);
        resultadoAgua.textContent = `${ml} ml`;
        resultadoAgua.classList.add('active');
      } else {
        resultadoAgua.textContent = 'error';
        resultadoAgua.classList.remove('active');
      }
    });
  }
});
