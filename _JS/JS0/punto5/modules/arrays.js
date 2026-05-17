// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let letras = ['a', 'b', 'c', 'd', 'e'];
export let nombres = ['Ana', 'Carlos', 'Luis', 'Maria'];
export let coloresSplice = ['rojo', 'azul', 'verde', 'amarillo'];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function spliceEliminar(array, index, count) {
    // aplicamos el método correspondiente y retornamos
    return array.splice(index, count);
}

export function spliceInsertar(array, index, count, ...items) {
    // aplicamos el método correspondiente y retornamos
    array.splice(index, count, ...items);
    return array;
}
