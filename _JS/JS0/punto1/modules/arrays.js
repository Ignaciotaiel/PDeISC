// separamos la lógica pura de los datos en este archivo. and removed DOM dependencies
// definimos los datos iniciales que vamos a usar
export let frutas = [];
export let amigos = ["Carlos"];
export let numeros = [10];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function agregarElemento(array, elemento) {
    // aplicamos el método correspondiente y retornamos
    array.push(elemento);
    return array;
}

export function agregarSiEsMayor(array, valor) {
    // aplicamos el método correspondiente y retornamos
    const ultimo = array[array.length - 1];
    if (valor > ultimo) {
        array.push(valor);
        return { success: true, ultimo };
    }
    return { success: false, ultimo };
}
