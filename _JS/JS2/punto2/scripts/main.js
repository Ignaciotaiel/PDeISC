import { initTheme } from '../context/theme.js?v=3';
import { elements, mostrarNotificacion, renderEstadisticas, renderResultados, mostrarResultados, renderArchivosServidor } from './ui.js?v=3';
import * as api from './api.js?v=3';

// --- Estado de la aplicación ---
let archivoServidor = null;
let contenidoResultado = null;
let archivoParaBorrar = null;

/**
 * Carga la lista de archivos del servidor
 */
async function cargarArchivosServidor() {
    try {
        const result = await api.fetchArchivosServidor();
        if (result.ok) {
            renderArchivosServidor(result.archivos, seleccionarArchivoServidor, abrirModalBorrarArchivo);
        }
    } catch (error) {
        console.error("Error al cargar archivos del servidor:", error);
    }
}

/**
 * Abre el modal de confirmación para borrar un archivo
 */
function abrirModalBorrarArchivo(filename) {
    archivoParaBorrar = filename;
    elements.nombreArchivoBorrar.textContent = filename;
    instances.modalBorrarArchivo.show();
}

/**
 * Confirma y ejecuta la eliminación del archivo
 */
async function confirmarBorradoArchivo() {
    if (!archivoParaBorrar) return;

    try {
        const result = await api.eliminarArchivoServidor(archivoParaBorrar);
        if (result.ok) {
            mostrarNotificacion(`Archivo "${archivoParaBorrar}" eliminado`, "Éxito");
            instances.modalBorrarArchivo.hide();
            archivoParaBorrar = null;
            cargarArchivosServidor(); // Refrescar la lista
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        mostrarNotificacion(error.message || "Error al borrar archivo", "Error", false);
    }
}

/**
 * Procesa un archivo seleccionado del servidor
 */
async function seleccionarArchivoServidor(filename) {
    try {
        elements.btnProcesar.disabled = true;
        elements.spinnerLoad.classList.remove('d-none');
        
        const result = await api.procesarArchivoExistente(filename);
        if (!result.ok) throw new Error(result.error);

        archivoServidor = result.archivo;
        contenidoResultado = result.contenido;

        renderEstadisticas(result.estadisticas);
        renderResultados(result.utiles, result.descartados);
        mostrarResultados(true);

        mostrarNotificacion(`Archivo "${filename}" procesado`, "¡Éxito!");
        cargarArchivosServidor(); // Recargar lista para ver el nuevo resultado
    } catch (error) {
        mostrarNotificacion(error.message, "Error", false);
    } finally {
        elements.btnProcesar.disabled = false;
        elements.spinnerLoad.classList.add('d-none');
    }
}

/**
 * Procesa el archivo subido
 */
async function procesarArchivo(event) {
    event.preventDefault();
    const file = elements.inputArchivo.files[0];
    
    if (!file) {
        elements.inputArchivo.classList.add('is-invalid');
        elements.feedbackArchivo.textContent = 'Seleccioná un archivo para continuar';
        return;
    }

    elements.inputArchivo.classList.remove('is-invalid');
    elements.btnProcesar.disabled = true;
    elements.spinnerLoad.classList.remove('d-none');

    try {
        const result = await api.procesarEnServidor(file);

        if (!result.ok) throw new Error(result.error);

        archivoServidor = result.archivo;
        contenidoResultado = result.contenido;

        renderEstadisticas(result.estadisticas);
        renderResultados(result.utiles, result.descartados);
        mostrarResultados(true);

        mostrarNotificacion("Archivo procesado correctamente", "¡Éxito!");
        cargarArchivosServidor(); // Recargar lista para ver el nuevo archivo en el servidor
    } catch (error) {
        mostrarNotificacion(error.message, "Error", false);
    } finally {
        elements.btnProcesar.disabled = false;
        elements.spinnerLoad.classList.add('d-none');
    }
}

/**
 * Guardado Dual
 */
async function guardarResultado() {
    if (!archivoServidor || !contenidoResultado) return;

    try {
        try {
            await api.guardarLocal(archivoServidor, contenidoResultado);
            // También forzamos la descarga del servidor para cumplir con "Dual Save"
            api.descargarDesdeServidor(archivoServidor);
            mostrarNotificacion("Resultado guardado en servidor y equipo", "¡Éxito!");
        } catch (e) {
            mostrarNotificacion("Resultado guardado en el servidor", "Guardado Parcial");
        }
    } catch (error) {
        mostrarNotificacion("Error al guardar el resultado", "Error", false);
    }
}

/**
 * Reinicia la aplicación
 */
function reiniciar() {
    archivoServidor = null;
    contenidoResultado = null;
    elements.inputArchivo.value = '';
    elements.filenamePreview.classList.add('d-none');
    mostrarResultados(false);
    cargarArchivosServidor();
}

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    cargarArchivosServidor();

    elements.formUpload.addEventListener('submit', procesarArchivo);
    elements.btnGuardarDual.addEventListener('click', guardarResultado);
    elements.btnReiniciar.addEventListener('click', reiniciar);
    elements.btnActualizarArchivos.addEventListener('click', cargarArchivosServidor);
    elements.btnConfirmarBorrarArchivo.addEventListener('click', confirmarBorradoArchivo);

    elements.inputArchivo.addEventListener('change', () => {
        const file = elements.inputArchivo.files[0];
        if (file) {
            elements.selectedName.textContent = file.name;
            elements.filenamePreview.classList.remove('d-none');
            elements.inputArchivo.classList.remove('is-invalid');
        } else {
            elements.filenamePreview.classList.add('d-none');
        }
    });
});

