// inicializamos la vista, eventos y el tema oscuro.
import { nombresForEach, numerosForEach, personas, generarSaludos, calcularDobles, mostrarPersonas } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-91').textContent = JSON.stringify(nombresForEach);
    document.getElementById('estado-92').textContent = JSON.stringify(numerosForEach);
    document.getElementById('estado-93').textContent = JSON.stringify(personas);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-generarsaludos').addEventListener('click', () => {
        const resultado = generarSaludos(nombresForEach);
        document.getElementById('resultado91').innerText = resultado;
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-calculardobles').addEventListener('click', () => {
        const dobles = calcularDobles(numerosForEach);
        document.getElementById('resultado92').textContent = 'Dobles: ' + JSON.stringify(dobles);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-mostrarpersonas').addEventListener('click', () => {
        const resultado = mostrarPersonas(personas);
        document.getElementById('resultado93').innerText = resultado;
    });
});
