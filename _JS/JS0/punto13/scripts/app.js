// inicializamos la vista, eventos y el tema oscuro.
import { numerosSort, palabrasSort, personasSort, sortNumeros, sortPalabras, sortPersonas } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-131').textContent = JSON.stringify(numerosSort);
    document.getElementById('estado-132').textContent = JSON.stringify(palabrasSort);
    document.getElementById('estado-133').textContent = JSON.stringify(personasSort);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-ordenarnumeros').addEventListener('click', () => {
        const ordenado = sortNumeros(numerosSort);
        document.getElementById('resultado131').textContent = 'Original: ' + JSON.stringify(numerosSort) + ' | Ordenado: ' + JSON.stringify(ordenado);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-ordenarpalabras').addEventListener('click', () => {
        const ordenado = sortPalabras(palabrasSort);
        document.getElementById('resultado132').textContent = 'Original: ' + JSON.stringify(palabrasSort) + ' | Ordenado: ' + JSON.stringify(ordenado);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-ordenarporedad').addEventListener('click', () => {
        const ordenado = sortPersonas(personasSort);
        let resultado = '';
        ordenado.forEach(persona => {
            resultado += `${persona.nombre} (${persona.edad} años), `;
        });
        document.getElementById('resultado133').textContent = 'Ordenados por edad: ' + resultado;
    });
});
