// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let numerosFilter = [3, 15, 7, 22, 1, 18, 9, 30];
export let palabras = ['sol', 'murcielago', 'casa', 'elefante', 'rio', 'computadora'];
export let usuariosFilter = [
    { nombre: 'Ana', activo: true },
    { nombre: 'Luis', activo: false },
    { nombre: 'Maria', activo: true },
    { nombre: 'Carlos', activo: false },
    { nombre: 'Sofia', activo: true }
];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function filterMayores(array, limite) {
    // aplicamos el método correspondiente y retornamos
    return array.filter(num => num > limite);
}

export function filterPorLongitud(array, minimo) {
    // aplicamos el método correspondiente y retornamos
    return array.filter(palabra => palabra.length > minimo);
}

export function filterActivos(array) {
    // aplicamos el método correspondiente y retornamos
    return array.filter(usuario => usuario.activo);
}
