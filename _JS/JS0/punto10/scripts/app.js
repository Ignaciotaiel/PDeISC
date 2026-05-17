// inicializamos la vista, eventos y el tema oscuro.
import { numerosMap, nombresMap, precios, mapMultiplicar, mapMayusculas, mapIva } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-101').textContent = JSON.stringify(numerosMap);
    document.getElementById('estado-102').textContent = JSON.stringify(nombresMap);
    document.getElementById('estado-103').textContent = JSON.stringify(precios);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-multiplicarportres').addEventListener('click', () => {
        const nuevos = mapMultiplicar(numerosMap, 3);
        document.getElementById('resultado101').textContent = 'Original: ' + JSON.stringify(numerosMap) + ' | Multiplicados: ' + JSON.stringify(nuevos);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-convertirmayusculas').addEventListener('click', () => {
        const mayusculas = mapMayusculas(nombresMap);
        document.getElementById('resultado102').textContent = 'Original: ' + JSON.stringify(nombresMap) + ' | Mayúsculas: ' + JSON.stringify(mayusculas);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-agregariva').addEventListener('click', () => {
        const conIVA = mapIva(precios, 0.21);
        document.getElementById('resultado103').textContent = 'Originales: ' + JSON.stringify(precios) + ' | Con IVA: ' + JSON.stringify(conIVA);
    });
});
