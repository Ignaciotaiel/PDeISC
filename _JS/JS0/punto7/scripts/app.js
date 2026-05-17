// inicializamos la vista, eventos y el tema oscuro.
import { animalesIndex, numerosIndex, ciudades, indexOfElement } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-71').textContent = JSON.stringify(animalesIndex);
    document.getElementById('estado-72').textContent = JSON.stringify(numerosIndex);
    document.getElementById('estado-73').textContent = JSON.stringify(ciudades);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-buscarperro').addEventListener('click', () => {
        const posicion = indexOfElement(animalesIndex, 'perro');
        document.getElementById('resultado71').textContent = 'La posición de "perro" es: ' + posicion;
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-buscarnumero').addEventListener('click', () => {
        const entrada = document.getElementById('entradaNumero').value;
        const alertDiv = document.getElementById('alert-buscarnumero');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un número primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        const numero = Number(entrada);
        const posicion = indexOfElement(numerosIndex, numero);
        if (posicion === -1) {
            document.getElementById('resultado72').textContent = 'El número ' + numero + ' NO está en el array ' + JSON.stringify(numerosIndex);
        } else {
            document.getElementById('resultado72').textContent = 'El número ' + numero + ' está en la posición: ' + posicion;
        }
        document.getElementById('entradaNumero').value = '';
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-buscarciudad').addEventListener('click', () => {
        const entrada = document.getElementById('entradaCiudad').value;
        const alertDiv = document.getElementById('alert-buscarciudad');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí una ciudad primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        const posicion = indexOfElement(ciudades, entrada);
        if (posicion === -1) {
            document.getElementById('resultado73').textContent = '"' + entrada + '" no se encontró en el array ' + JSON.stringify(ciudades);
        } else {
            document.getElementById('resultado73').textContent = '"' + entrada + '" está en la posición: ' + posicion;
        }
        document.getElementById('entradaCiudad').value = '';
    });
});
