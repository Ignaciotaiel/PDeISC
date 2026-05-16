
/**
 * Procesa el archivo en el servidor
 */
export async function procesarEnServidor(file) {
    const formData = new FormData();
    formData.append('archivo', file);
    
    const response = await fetch('/api/procesar', {
        method: 'POST',
        body: formData
    });
    return await response.json();
}

/**
 * Obtiene la lista de archivos del servidor
 */
export async function fetchArchivosServidor() {
    const response = await fetch('/api/archivos');
    return await response.json();
}

/**
 * Procesa un archivo que ya está en el servidor
 */
export async function procesarArchivoExistente(filename) {
    const response = await fetch('/api/procesar-servidor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
    });
    return await response.json();
}

/**
 * Elimina un archivo del servidor
 */
export async function eliminarArchivoServidor(filename) {
    const response = await fetch(`/api/borrar/${filename}`, {
        method: 'DELETE'
    });
    return await response.json();
}

/**
 * Descarga desde el servidor
 */
export function descargarDesdeServidor(filename) {
    window.location.href = `/api/descargar/${filename}`;
}

/**
 * Guarda localmente
 */
export async function guardarLocal(filename, contenido) {
    if ('showSaveFilePicker' in window) {
        const handle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: [{
                description: 'Archivo de texto',
                accept: { 'text/plain': ['.txt'] }
            }]
        });
        const writable = await handle.createWritable();
        await writable.write(contenido);
        await writable.close();
        return true;
    } else {
        const blob = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        return true;
    }
}
