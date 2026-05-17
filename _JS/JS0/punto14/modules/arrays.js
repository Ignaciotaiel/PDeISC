// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let letrasReverse = ['a', 'b', 'c', 'd', 'e'];
export let numerosReverse = [1, 2, 3, 4, 5];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function reverseArray(array) {
    // aplicamos el método correspondiente y retornamos
    const copia = array.slice();
    return copia.reverse();
}

export function reverseString(string) {
    // aplicamos el método correspondiente y retornamos
    return string.split('').reverse().join('');
}
