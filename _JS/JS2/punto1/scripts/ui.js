/**
 * Módulo de Interfaz de Usuario para Punto 1
 */

// Elementos del DOM
export const elements = {
    formNumero: document.getElementById('form-numero'),
    inputNumero: document.getElementById('input-numero'),
    btnAgregar: document.getElementById('btn-agregar'),
    btnGuardar: document.getElementById('btn-guardar'),
    btnReiniciar: document.getElementById('btn-reiniciar'),
    btnDescargarServer: document.getElementById('btn-descargar-server'),
    listaNumerosUI: document.getElementById('lista-numeros'),
    listaVaciaUI: document.getElementById('lista-vacia'),
    contadorTexto: document.getElementById('contador-texto'),
    feedbackError: document.getElementById('feedback-error'),
    
    // Modales
    modalEdicionEl: document.getElementById('modalEdicion'),
    inputEditar: document.getElementById('input-editar'),
    feedbackErrorEdit: document.getElementById('feedback-error-edit'),
    btnConfirmarEdicion: document.getElementById('btn-confirmar-edicion'),
    
    modalEliminarEl: document.getElementById('modalEliminar'),
    btnConfirmarEliminar: document.getElementById('btn-confirmar-eliminar'),
    
    // Toast
    toastEl: document.getElementById('liveToast')
};

// Instancias de Bootstrap
export const instances = {
    modalEdicion: new bootstrap.Modal(elements.modalEdicionEl),
    modalEliminar: new bootstrap.Modal(elements.modalEliminarEl),
    toast: bootstrap.Toast.getOrCreateInstance(elements.toastEl)
};

/**
 * Muestra una notificación Toast
 */
export function mostrarNotificacion(mensaje, titulo = 'Notificación', esExito = true) {
    const toastTitulo = document.getElementById('toast-titulo');
    const toastMensaje = document.getElementById('toast-mensaje');
    
    toastTitulo.textContent = titulo;
    toastMensaje.textContent = mensaje;
    elements.toastEl.className = `toast align-items-center text-white ${esExito ? 'bg-success' : 'bg-danger'} border-0`;
    instances.toast.show();
}

/**
 * Actualiza los contadores y estados de botones
 */
export function actualizarContadores(cantidad, min, max, ultimoArchivo) {
    elements.contadorTexto.textContent = `${cantidad} números cargados (mínimo ${min})`;
    elements.btnGuardar.disabled = cantidad < min;
    elements.btnReiniciar.disabled = cantidad === 0;
    
    if (ultimoArchivo) {
        elements.btnDescargarServer.classList.remove('d-none');
    } else {
        elements.btnDescargarServer.classList.add('d-none');
    }

    if (cantidad > 0) {
        elements.listaVaciaUI.classList.add('d-none');
    } else {
        elements.listaVaciaUI.classList.remove('d-none');
    }
}

/**
 * Renderiza la lista de números
 */
export function renderizarLista(numeros, onEditar, onEliminar) {
    elements.listaNumerosUI.innerHTML = '';
    
    numeros.forEach((numero, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center list-group-item-animated';
        li.innerHTML = `
            <div class="d-flex align-items-center">
                <span class="me-3 text-muted">#${index + 1}</span>
                <span class="badge bg-primary rounded-pill fs-6">${numero}</span>
            </div>
            <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-warning btn-editar" data-index="${index}">✏️</button>
                <button class="btn btn-outline-danger btn-eliminar" data-index="${index}">🗑️</button>
            </div>
        `;
        elements.listaNumerosUI.appendChild(li);
    });

    // Eventos
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (e) => onEditar(parseInt(e.currentTarget.dataset.index)));
    });
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => onEliminar(parseInt(e.currentTarget.dataset.index)));
    });
}
