// inicializamos la vista, eventos y el tema oscuro.
import { letrasReverse, numerosReverse, reverseArray, reverseString } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-141').textContent = JSON.stringify(letrasReverse);
    document.getElementById('estado-142').textContent = JSON.stringify(numerosReverse);
    document.getElementById('estado-143').textContent = '(Esperando texto ingresado...)';


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-invertirletras').addEventListener('click', () => {
        const invertido = reverseArray(letrasReverse);
        document.getElementById('resultado141').textContent = 'Original: ' + JSON.stringify(letrasReverse) + ' | Invertido: ' + JSON.stringify(invertido);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-invertirnumeros').addEventListener('click', () => {
        const invertido = reverseArray(numerosReverse);
        document.getElementById('resultado142').textContent = 'Original: ' + JSON.stringify(numerosReverse) + ' | Invertido: ' + JSON.stringify(invertido);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-invertirtexto').addEventListener('click', () => {
        const entrada = document.getElementById('entradaTexto').value;
        const alertDiv = document.getElementById('alert-invertirtexto');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un texto primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        const invertido = reverseString(entrada);
        document.getElementById('resultado143').textContent = 'Original: ' + entrada + ' | Invertido: ' + invertido;
        document.getElementById('entradaTexto').value = '';
    });
});
