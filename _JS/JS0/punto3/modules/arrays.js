// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let colores = [];
export let tareas = ['estudiar', 'hacer ejercicio', 'leer'];
export let usuariosConectados = ['ana', 'carlos'];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function unshiftElemento(array, elemento) {
    // aplicamos el método correspondiente y retornamos
    array.unshift(elemento);
    return array;
}
