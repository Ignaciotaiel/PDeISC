// inicializamos la vista, eventos y el tema oscuro.
import { letras, nombres, coloresSplice, spliceEliminar, spliceInsertar } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-51').textContent = JSON.stringify(letras);
    document.getElementById('estado-52').textContent = JSON.stringify(nombres);
    document.getElementById('estado-53').textContent = JSON.stringify(coloresSplice);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-eliminardesdepos1').addEventListener('click', () => {
        const eliminados = spliceEliminar(letras, 1, 2);
        document.getElementById('resultado51').textContent = 'Eliminados: ' + JSON.stringify(eliminados) + ' | Array resultante: ' + JSON.stringify(letras);
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-insertarenpos2').addEventListener('click', () => {
        const entrada = document.getElementById('entradaNombre').value;
        const alertDiv = document.getElementById('alert-insertarenpos2');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un nombre primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        spliceInsertar(nombres, 2, 0, entrada);
        document.getElementById('resultado52').textContent = 'Array actualizado: ' + JSON.stringify(nombres);
        document.getElementById('entradaNombre').value = '';
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-reemplazarcolores').addEventListener('click', () => {
        spliceInsertar(coloresSplice, 1, 2, 'naranja', 'violeta');
        document.getElementById('resultado53').textContent = 'Array resultante: ' + JSON.stringify(coloresSplice);
    });
});
