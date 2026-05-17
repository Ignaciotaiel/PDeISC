// inicializamos la vista, eventos y el tema oscuro.
import { numerosFilter, palabras, usuariosFilter, filterMayores, filterPorLongitud, filterActivos } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-111').textContent = JSON.stringify(numerosFilter);
    document.getElementById('estado-112').textContent = JSON.stringify(palabras);
    document.getElementById('estado-113').textContent = JSON.stringify(usuariosFilter);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-filtrarmayores').addEventListener('click', () => {
        const entrada = document.getElementById('entradaLimite').value;
        const alertDiv = document.getElementById('alert-filtrarmayores');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un número límite primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        const limite = Number(entrada);
        const resultado = filterMayores(numerosFilter, limite);
        document.getElementById('resultado111').textContent = 'Mayores a ' + limite + ': ' + JSON.stringify(resultado);
        document.getElementById('entradaLimite').value = '';
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-filtrarporlongitud').addEventListener('click', () => {
        const entrada = document.getElementById('entradaLongitud').value;
        const alertDiv = document.getElementById('alert-filtrarporlongitud');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí una longitud mínima primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        const minimo = Number(entrada);
        const resultado = filterPorLongitud(palabras, minimo);
        document.getElementById('resultado112').textContent = 'Palabras con más de ' + minimo + ' letras: ' + JSON.stringify(resultado);
        document.getElementById('entradaLongitud').value = '';
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-filtraractivos').addEventListener('click', () => {
        const activos = filterActivos(usuariosFilter);
        const nombres = activos.map(u => u.nombre);
        document.getElementById('resultado113').textContent = 'Usuarios activos: ' + JSON.stringify(nombres);
    });
});
