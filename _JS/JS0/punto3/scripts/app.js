// inicializamos la vista, eventos y el tema oscuro.
import { colores, tareas, usuariosConectados, unshiftElemento } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-31').textContent = JSON.stringify(colores);
    document.getElementById('estado-32').textContent = JSON.stringify(tareas);
    document.getElementById('estado-33').textContent = JSON.stringify(usuariosConectados);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-agregarcolor').addEventListener('click', () => {
        const entrada = document.getElementById('entradaColor').value;
        const alertDiv = document.getElementById('alert-agregarcolor');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un color primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        unshiftElemento(colores, entrada);
        document.getElementById('resultado31').textContent = 'Array actualizado: ' + JSON.stringify(colores);
        document.getElementById('entradaColor').value = '';
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-agregartareaurgente').addEventListener('click', () => {
        const entrada = document.getElementById('entradaTarea').value;
        const alertDiv = document.getElementById('alert-agregartareaurgente');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí una tarea primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        unshiftElemento(tareas, entrada);
        document.getElementById('resultado32').textContent = 'Array actualizado: ' + JSON.stringify(tareas);
        document.getElementById('entradaTarea').value = '';
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-conectarusuario').addEventListener('click', () => {
        const entrada = document.getElementById('entradaUsuario').value;
        const alertDiv = document.getElementById('alert-conectarusuario');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un nombre de usuario primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        unshiftElemento(usuariosConectados, entrada);
        document.getElementById('resultado33').textContent = 'Array actualizado: ' + JSON.stringify(usuariosConectados);
        document.getElementById('entradaUsuario').value = '';
    });
});
