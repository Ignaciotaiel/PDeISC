// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let numerosSort = [34, 7, 2, 89, 15, 43];
export let palabrasSort = ['banana', 'manzana', 'cereza', 'durazno', 'anana'];
export let personasSort = [
    { nombre: 'Ana', edad: 30 },
    { nombre: 'Luis', edad: 22 },
    { nombre: 'Maria', edad: 45 },
    { nombre: 'Carlos', edad: 18 }
];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function sortNumeros(array) {
    // aplicamos el método correspondiente y retornamos
    const copia = array.slice();
    return copia.sort((a, b) => a - b);
}

export function sortPalabras(array) {
    // aplicamos el método correspondiente y retornamos
    const copia = array.slice();
    return copia.sort();
}

export function sortPersonas(array) {
    // aplicamos el método correspondiente y retornamos
    const copia = array.slice();
    return copia.sort((a, b) => a.edad - b.edad);
}
