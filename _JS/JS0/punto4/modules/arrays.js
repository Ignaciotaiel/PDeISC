// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let numerosShift = [10, 20, 30, 40];
export let mensajes = ['Hola!', 'Como estas?', 'Todo bien?', 'Hasta luego'];
export let cola = ['Pedro', 'Maria', 'Juan', 'Sofia'];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function shiftElemento(array) {
    // aplicamos el método correspondiente y retornamos
    return array.shift();
}
