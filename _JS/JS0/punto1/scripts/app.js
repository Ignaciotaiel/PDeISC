// inicializamos la vista, eventos y el tema oscuro.
import { frutas, amigos, numeros, agregarElemento, agregarSiEsMayor } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme();
    renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-11').textContent = JSON.stringify(frutas);
    document.getElementById('estado-12').textContent = JSON.stringify(amigos);
    document.getElementById('estado-13').textContent = JSON.stringify(numeros);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-fruta').addEventListener('click', () => {
        const entrada = document.getElementById('entradaFruta').value;
        const alertDiv = document.getElementById('alert11');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí una fruta primero.</div>';
            return;
        }
        agregarElemento(frutas, entrada);
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        document.getElementById('resultado11').textContent = 'Array actualizado: ' + JSON.stringify(frutas);
        document.getElementById('entradaFruta').value = '';
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-amigo').addEventListener('click', () => {
        const entrada = document.getElementById('entradaAmigo').value;
        const alertDiv = document.getElementById('alert12');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un nombre primero.</div>';
            return;
        }
        agregarElemento(amigos, entrada);
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        document.getElementById('resultado12').textContent = 'Array actualizado: ' + JSON.stringify(amigos);
        document.getElementById('entradaAmigo').value = '';
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-numero').addEventListener('click', () => {
        const entrada = document.getElementById('entradaNumero').value;
        const alertDiv = document.getElementById('alert13');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un número primero.</div>';
            return;
        }
        const valor = Number(entrada);
        const result = agregarSiEsMayor(numeros, valor);
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        
        if (result.success) {
            document.getElementById('resultado13').textContent = valor + ' es mayor que ' + result.ultimo + '. Agregado. Array: ' + JSON.stringify(numeros);
        } else {
            document.getElementById('resultado13').textContent = valor + ' NO es mayor que ' + result.ultimo + '. No se agregó. Array: ' + JSON.stringify(numeros);
        }
        document.getElementById('entradaNumero').value = '';
    });
});
