// inicializamos la vista, eventos y el tema oscuro.
import { numerosShift, mensajes, cola, shiftElemento } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-41').textContent = JSON.stringify(numerosShift);
    document.getElementById('estado-42').textContent = JSON.stringify(mensajes);
    document.getElementById('estado-43').textContent = JSON.stringify(cola);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-quitarprimernumero').addEventListener('click', () => {
        const eliminado = shiftElemento(numerosShift);
        document.getElementById('resultado41').textContent = 'Eliminado: ' + (eliminado || 'ninguno') + ' | Quedan: ' + JSON.stringify(numerosShift);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-leermensaje').addEventListener('click', () => {
        const leido = shiftElemento(mensajes);
        document.getElementById('resultado42').textContent = 'Mensaje leído: ' + (leido || 'ninguno') + ' | Pendientes: ' + JSON.stringify(mensajes);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-atendersiguiente').addEventListener('click', () => {
        const atendido = shiftElemento(cola);
        document.getElementById('resultado43').textContent = 'Atendido: ' + (atendido || 'nadie') + ' | Esperando: ' + JSON.stringify(cola);
    });
});
