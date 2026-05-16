
/**
 * Guarda los números en el servidor
 */
export async function guardarEnServidor(numeros, contenido) {
    const response = await fetch('/api/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numeros, contenido })
    });
    return await response.json();
}

/**
 * Inicia la descarga desde el servidor
 */
export function descargarDesdeServidor(filename) {
    window.location.href = `/api/descargar/${filename}`;
}

/**
 * Maneja el guardado local (File System Access API o Fallback)
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
