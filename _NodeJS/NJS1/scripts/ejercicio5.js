import { inicializarTema, toggleTema } from '../contexto/tema.js';

// ponemos el tema que el usuario habia elegido la ultima vez
inicializarTema();

document.addEventListener('DOMContentLoaded', () => {
    // le avisamos al boton que cambie el tema cuando lo toquen
    const btnToggle = document.getElementById('btnToggleTema');
    if (btnToggle) {
        btnToggle.addEventListener('click', toggleTema);
    }

    // pedimos los datos de los ejercicios para mostrarlos en pantalla
    cargarResultados();
});

async function cargarResultados() {
    const contenedor = document.getElementById('contenido');

    try {
        // nos traemos los resultados desde nuestra api
        const respuesta = await fetch('/api/resultados');
        if (!respuesta.ok) {
            throw new Error(`error al conectar: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // borramos el cartel de cargando
        contenedor.innerHTML = '';

        // empezamos a construir la tabla vacia
        const tabla = document.createElement('table');
        tabla.className = 'table table-bordered table-hover mb-0 shadow-sm rounded overflow-hidden';

        // preparamos la barra superior con los titulos de las columnas
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');

        const th1 = document.createElement('th');
        th1.textContent = 'ejercicio';
        th1.className = 'bg-primary text-white w-25';

        const th2 = document.createElement('th');
        th2.textContent = 'resultados';
        th2.className = 'bg-primary text-white';

        trHead.appendChild(th1);
        trHead.appendChild(th2);
        thead.appendChild(trHead);
        tabla.appendChild(thead);

        // preparamos la parte principal donde van los datos
        const tbody = document.createElement('tbody');

        // pasamos por cada ejercicio y le armamos su fila
        for (const [ejercicio, resultado] of Object.entries(datos)) {
            const tr = document.createElement('tr');

            const tdEj = document.createElement('td');
            tdEj.textContent = ejercicio.toUpperCase();
            tdEj.className = 'align-middle fw-bold';

            const tdRes = document.createElement('td');
            const pre = document.createElement('pre');
            pre.className = 'm-0 p-3 rounded text-wrap text-break json-container shadow-sm';

            // convertimos los resultados a un texto que se lea prolijo
            pre.textContent = JSON.stringify(resultado, null, 4);

            tdRes.appendChild(pre);
            tr.appendChild(tdEj);
            tr.appendChild(tdRes);
            tbody.appendChild(tr);
        }

        // metemos el cuerpo con datos adentro de la tabla
        tabla.appendChild(tbody);

        // guardamos la tabla en una caja para que ande bien en pantallas chicas
        const tableResponsive = document.createElement('div');
        tableResponsive.className = 'table-responsive rounded';
        tableResponsive.appendChild(tabla);

        // finalmente agregamos todo a la pagina web
        contenedor.appendChild(tableResponsive);

    } catch (error) {
        console.error('hubo un problema:', error);
        contenedor.innerHTML = `<div class="alert alert-danger shadow-sm">no pudimos cargar los resultados: ${error.message}</div>`;
    }
}
