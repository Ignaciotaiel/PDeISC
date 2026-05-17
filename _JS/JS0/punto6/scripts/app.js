// inicializamos la vista, eventos y el tema oscuro.
import { numerosSlice, peliculas, elementos, sliceArray } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-61').textContent = JSON.stringify(numerosSlice);
    document.getElementById('estado-62').textContent = JSON.stringify(peliculas);
    document.getElementById('estado-63').textContent = JSON.stringify(elementos);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-copiarprimerostres').addEventListener('click', () => {
        const copia = sliceArray(numerosSlice, 0, 3);
        document.getElementById('resultado61').textContent = 'Copia: ' + JSON.stringify(copia) + ' | Original: ' + JSON.stringify(numerosSlice);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-copiarpeliculas').addEventListener('click', () => {
        const copia = sliceArray(peliculas, 2, 5);
        document.getElementById('resultado62').textContent = 'Copia: ' + JSON.stringify(copia) + ' | Original: ' + JSON.stringify(peliculas);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-copiarultimostres').addEventListener('click', () => {
        const copia = sliceArray(elementos, -3);
        document.getElementById('resultado63').textContent = 'Copia: ' + JSON.stringify(copia) + ' | Original: ' + JSON.stringify(elementos);
    });
});
