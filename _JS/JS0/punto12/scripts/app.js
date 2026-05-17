// inicializamos la vista, eventos y el tema oscuro.
import { numerosReduce, enteros, productos, sumReducer, multReducer, totalPrecios } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-121').textContent = JSON.stringify(numerosReduce);
    document.getElementById('estado-122').textContent = JSON.stringify(enteros);
    document.getElementById('estado-123').textContent = JSON.stringify(productos);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-sumartodo').addEventListener('click', () => {
        const total = sumReducer(numerosReduce);
        document.getElementById('resultado121').textContent = 'Suma total de ' + JSON.stringify(numerosReduce) + ' = ' + total;
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-multiplicartodo').addEventListener('click', () => {
        const total = multReducer(enteros);
        document.getElementById('resultado122').textContent = 'Multiplicación total de ' + JSON.stringify(enteros) + ' = ' + total;
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-calculartotalprecios').addEventListener('click', () => {
        const total = totalPrecios(productos);
        document.getElementById('resultado123').textContent = 'Total de precios: $' + total;
    });
});
