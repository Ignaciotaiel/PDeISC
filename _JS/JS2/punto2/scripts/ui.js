/**
 * Módulo de Interfaz de Usuario para Punto 2
 */

export const elements = {
    formUpload: document.getElementById('form-upload'),
    inputArchivo: document.getElementById('input-archivo'),
    btnProcesar: document.getElementById('btn-procesar'),
    spinnerLoad: document.getElementById('spinner-load'),
    feedbackArchivo: document.getElementById('feedback-archivo'),
    filenamePreview: document.getElementById('filename-preview'),
    selectedName: document.getElementById('selected-name'),
    
    // Tarjetas
    cardCarga: document.getElementById('card-carga'),
    cardEstadisticas: document.getElementById('card-estadisticas'),
    cardResultados: document.getElementById('card-resultados'),
    cardAcciones: document.getElementById('card-acciones'),
    
    // Estadísticas
    statTotal: document.getElementById('stat-total'),
    statUtiles: document.getElementById('stat-utiles'),
    statDescartados: document.getElementById('stat-descartados'),
    barUtiles: document.getElementById('bar-utiles'),
    barDescartados: document.getElementById('bar-descartados'),
    labelUtiles: document.getElementById('label-utiles'),
    labelDescartados: document.getElementById('label-descartados'),
    
    // Listas
    listaUtilesUI: document.getElementById('lista-utiles'),
    listaDescartadosUI: document.getElementById('lista-descartados'),
    
    // Botones
    btnGuardarDual: document.getElementById('btn-guardar-dual'),
    btnReiniciar: document.getElementById('btn-reiniciar'),
    
    // Contenedores
    containerResultados: document.getElementById('container-resultados'),
    
    // Badges de contador
    badgeUtiles: document.getElementById('badge-utiles'),
    badgeDescartados: document.getElementById('badge-descartados'),

    // Archivos Servidor
    listaArchivosServidor: document.getElementById('lista-archivos-servidor'),
    mensajeSinArchivos: document.getElementById('mensaje-sin-archivos'),
    btnActualizarArchivos: document.getElementById('btn-actualizar-archivos'),
    sectionArchivosServidor: document.getElementById('section-archivos-servidor'),
    
    // Modal Borrado Archivo
    modalBorrarArchivoEl: document.getElementById('modalBorrarArchivo'),
    nombreArchivoBorrar: document.getElementById('nombre-archivo-borrar'),
    btnConfirmarBorrarArchivo: document.getElementById('btn-confirmar-borrar-archivo'),
    
    // Toast
    toastEl: document.getElementById('liveToast')
};

export const instances = {
    toast: bootstrap.Toast.getOrCreateInstance(elements.toastEl),
    modalBorrarArchivo: new bootstrap.Modal(elements.modalBorrarArchivoEl)
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
 * Renderiza las estadísticas en la UI
 */
export function renderEstadisticas(stats) {
    elements.statTotal.textContent = stats.total;
    elements.statUtiles.textContent = stats.totalUtiles;
    elements.statDescartados.textContent = stats.totalDescartados;
    
    elements.barUtiles.style.width = stats.porcentajeUtiles;
    elements.barDescartados.style.width = stats.porcentajeDescartados;
    
    elements.labelUtiles.textContent = `Útiles: ${stats.porcentajeUtiles}`;
    elements.labelDescartados.textContent = `Descartados: ${stats.porcentajeDescartados}`;
}

/**
 * Renderiza los resultados en las listas
 */
export function renderResultados(utiles, descartados) {
    elements.listaUtilesUI.innerHTML = '';
    elements.listaDescartadosUI.innerHTML = '';
    
    // Actualizar badges
    elements.badgeUtiles.textContent = utiles.length;
    elements.badgeDescartados.textContent = descartados.length;

    utiles.forEach((num, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center list-group-item-animated';
        li.style.animationDelay = `${index * 0.05}s`;
        li.innerHTML = `
            <span class="text-muted small">#${index + 1}</span>
            <span class="badge bg-success rounded-pill">${num}</span>
        `;
        elements.listaUtilesUI.appendChild(li);
    });

    descartados.forEach((num, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center list-group-item-animated';
        li.style.animationDelay = `${index * 0.05}s`;
        li.innerHTML = `
            <span class="text-muted small">#${index + 1}</span>
            <span class="badge bg-danger rounded-pill">${num}</span>
        `;
        elements.listaDescartadosUI.appendChild(li);
    });
}

/**
 * Alterna la visibilidad de las tarjetas de resultados
 */
export function mostrarResultados(visible) {
    if (visible) {
        elements.cardCarga.classList.add('d-none');
        elements.containerResultados.classList.remove('d-none');
    } else {
        elements.cardCarga.classList.remove('d-none');
        elements.containerResultados.classList.add('d-none');
    }
}

/**
 * Renderiza la lista de archivos disponibles en el servidor
 */
export function renderArchivosServidor(archivos, onSelect, onBorrar) {
    elements.listaArchivosServidor.innerHTML = '';
    
    if (archivos.length === 0) {
        elements.mensajeSinArchivos.classList.remove('d-none');
        return;
    }

    elements.mensajeSinArchivos.classList.add('d-none');

    archivos.forEach(archivo => {
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100 border-primary border-opacity-25 hover-shadow position-relative">
                <div class="card-body p-2 d-flex align-items-center">
                    <div class="flex-grow-1 d-flex align-items-center btn-seleccionar" style="cursor: pointer;">
                        <span class="fs-4 me-2">📄</span>
                        <div class="overflow-hidden">
                            <div class="text-truncate small fw-bold">${archivo}</div>
                            <small class="text-primary" style="font-size: 0.7rem;">Procesar</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        col.querySelector('.btn-seleccionar').addEventListener('click', () => onSelect(archivo));
        elements.listaArchivosServidor.appendChild(col);
    });
}
