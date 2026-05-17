// inicializamos la vista, eventos y el tema oscuro.
import { animales, compras, pila, eliminarUltimo, vaciarLista } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme();
    renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-21').textContent = JSON.stringify(animales);
    document.getElementById('estado-22').textContent = JSON.stringify(compras);
    document.getElementById('estado-23').textContent = JSON.stringify(pila);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-21').addEventListener('click', () => {
        const eliminado = eliminarUltimo(animales);
        document.getElementById('resultado21').textContent = 'Eliminado: ' + (eliminado || 'ninguno') + ' | Quedan: ' + JSON.stringify(animales);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-22').addEventListener('click', () => {
        const eliminado = eliminarUltimo(compras);
        document.getElementById('resultado22').textContent = 'Quitado: ' + (eliminado || 'ninguno') + ' | Lista actual: ' + JSON.stringify(compras);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-23').addEventListener('click', () => {
        const orden = vaciarLista(pila);
        document.getElementById('resultado23').textContent = 'Orden de salida: ' + JSON.stringify(orden) + ' | Pila actual: ' + JSON.stringify(pila);
    });
});
