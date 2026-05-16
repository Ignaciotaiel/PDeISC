import { initTheme } from '../context/theme.js';
import { validarNumero, generarContenidoTxt } from '../modules/validaciones.js';
import { elements, instances, mostrarNotificacion, actualizarContadores, renderizarLista } from './ui.js';
import * as api from './api.js';

// --- Estado de la aplicación ---
let numeros = [];
const MIN_NUMEROS = 10;
const MAX_NUMEROS = 20;
let ultimoArchivoGuardado = null;
let indiceEdicion = -1;
let indiceEliminacion = -1;

/**
 * Actualiza toda la interfaz
 */
function refrescarTodo() {
    actualizarContadores(numeros.length, MIN_NUMEROS, MAX_NUMEROS, ultimoArchivoGuardado);
    renderizarLista(numeros, abrirModalEdicion, abrirModalEliminacion);
}

/**
 * Agrega un número
 */
function agregarNumero(event) {
    event.preventDefault();
    const valor = elements.inputNumero.value.trim();
    const validacion = validarNumero(valor, numeros.length);
    
    if (!validacion.valido) {
        elements.inputNumero.classList.add('is-invalid');
        elements.feedbackError.textContent = validacion.error;
        elements.inputNumero.setCustomValidity(validacion.error);
        elements.formNumero.reportValidity();
        return;
    }

    elements.inputNumero.classList.remove('is-invalid');
    numeros.push(parseInt(valor));
    elements.inputNumero.value = '';
    elements.inputNumero.focus();
    refrescarTodo();
}

/**
 * Edición
 */
function abrirModalEdicion(index) {
    indiceEdicion = index;
    elements.inputEditar.value = numeros[index];
    elements.inputEditar.classList.remove('is-invalid');
    instances.modalEdicion.show();
}

function confirmarEdicion() {
    const valor = elements.inputEditar.value.trim();
    const validacion = validarNumero(valor, 0); // 0 para omitir límite de 20
    
    if (!validacion.valido) {
        elements.inputEditar.classList.add('is-invalid');
        elements.feedbackErrorEdit.textContent = validacion.error;
        return;
    }

    numeros[indiceEdicion] = parseInt(valor);
    instances.modalEdicion.hide();
    refrescarTodo();
    mostrarNotificacion("Número editado correctamente", "Éxito");
}

/**
 * Eliminación
 */
function abrirModalEliminacion(index) {
    indiceEliminacion = index;
    instances.modalEliminar.show();
}

function confirmarEliminacion() {
    if (indiceEliminacion > -1) {
        numeros.splice(indiceEliminacion, 1);
        indiceEliminacion = -1;
        instances.modalEliminar.hide();
        refrescarTodo();
        mostrarNotificacion("Número eliminado correctamente", "Éxito");
    }
}

/**
 * Guardado Dual
 */
async function guardarArchivo() {
    try {
        const contenido = generarContenidoTxt(numeros);
        const result = await api.guardarEnServidor(numeros, contenido);

        if (!result.ok) throw new Error(result.message);

        ultimoArchivoGuardado = result.archivo;
        refrescarTodo();

        try {
            await api.guardarLocal(result.archivo, contenido);
            mostrarNotificacion("Guardado en servidor y equipo", "¡Éxito!");
        } catch (e) {
            mostrarNotificacion("Guardado solo en servidor", "Guardado Parcial");
        }
    } catch (error) {
        mostrarNotificacion(error.message || "Error al guardar", "Error", false);
    }
}

/**
 * Reinicio
 */
function reiniciar() {
    numeros = [];
    ultimoArchivoGuardado = null;
    elements.inputNumero.value = '';
    elements.inputNumero.classList.remove('is-invalid', 'is-valid');
    refrescarTodo();
    mostrarNotificacion("Formulario reiniciado", "Reinicio");
}

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    refrescarTodo();

    elements.formNumero.addEventListener('submit', agregarNumero);
    elements.btnGuardar.addEventListener('click', guardarArchivo);
    elements.btnReiniciar.addEventListener('click', reiniciar);
    elements.btnDescargarServer.addEventListener('click', () => api.descargarDesdeServidor(ultimoArchivoGuardado));
    elements.btnConfirmarEdicion.addEventListener('click', confirmarEdicion);
    elements.btnConfirmarEliminar.addEventListener('click', confirmarEliminacion);

    elements.inputNumero.addEventListener('input', () => {
        elements.inputNumero.classList.remove('is-invalid');
        elements.inputNumero.setCustomValidity('');
    });
    elements.inputEditar.addEventListener('input', () => elements.inputEditar.classList.remove('is-invalid'));
});
