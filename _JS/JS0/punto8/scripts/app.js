// inicializamos la vista, eventos y el tema oscuro.
import { roles, coloresIncludes, numerosUnicos, checkIncludes, pushIfUnique } from '../modules/arrays.js';
import { initTheme, renderThemeButton } from '../contexto/theme.js';

// esperamos a que cargue la página para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // iniciamos el tema oscuro y dibujamos el botón en pantalla
    initTheme(); renderThemeButton('themeContainer');

    // mostramos los datos iniciales en la pantalla antes de hacer nada

    document.getElementById('estado-81').textContent = JSON.stringify(roles);
    document.getElementById('estado-82').textContent = JSON.stringify(coloresIncludes);
    document.getElementById('estado-83').textContent = JSON.stringify(numerosUnicos);


    // detectamos cuando el usuario hace clic en el botón


    document.getElementById('btn-verificaradmin').addEventListener('click', () => {
        const existe = checkIncludes(roles, 'admin');
        if (existe) {
            document.getElementById('resultado81').textContent = 'Sí, existe admin en ' + JSON.stringify(roles);
        } else {
            document.getElementById('resultado81').textContent = 'No hay admin en ' + JSON.stringify(roles);
        }
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-verificarcolor').addEventListener('click', () => {
        const entrada = document.getElementById('entradaColor').value;
        const alertDiv = document.getElementById('alert-verificarcolor');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un color primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        const existe = checkIncludes(coloresIncludes, entrada);
        if (existe) {
            document.getElementById('resultado82').textContent = '"' + entrada + '" SÍ existe en ' + JSON.stringify(coloresIncludes);
        } else {
            document.getElementById('resultado82').textContent = '"' + entrada + '" NO existe en ' + JSON.stringify(coloresIncludes);
        }
        document.getElementById('entradaColor').value = '';
    });

    // detectamos cuando el usuario hace clic en el botón

    document.getElementById('btn-agregarsinoexiste').addEventListener('click', () => {
        const entrada = document.getElementById('entradaNumero').value;
        const alertDiv = document.getElementById('alert-agregarsinoexiste');
        // si el campo está vacío, mostramos un aviso y cortamos la ejecución
        if (entrada === '') {
            alertDiv.innerHTML = '<div class="alert alert-warning py-2 mb-0">Escribí un número primero.</div>'; return;
        }
        // limpiamos cualquier aviso anterior de la pantalla
        alertDiv.innerHTML = '';
        const numero = Number(entrada);
        const agregado = pushIfUnique(numerosUnicos, numero);
        if (!agregado) {
            document.getElementById('resultado83').textContent = 'El ' + numero + ' ya existe. No se agregó. Array: ' + JSON.stringify(numerosUnicos);
        } else {
            document.getElementById('resultado83').textContent = 'El ' + numero + ' se agregó. Array: ' + JSON.stringify(numerosUnicos);
        }
        document.getElementById('entradaNumero').value = '';
    });
});
