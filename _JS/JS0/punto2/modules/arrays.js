// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let animales = ['perro', 'gato', 'loro', 'tortuga'];
export let compras = ['leche', 'pan', 'arroz', 'azucar', 'aceite'];
export let pila = ['a', 'b', 'c', 'd'];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function eliminarUltimo(array) {
    // aplicamos el método correspondiente y retornamos
    return array.pop();
}

export function vaciarLista(array) {
    // aplicamos el método correspondiente y retornamos
    const orden = [];
    while (array.length > 0) {
        orden.push(array.pop());
    }
    return orden;
}
