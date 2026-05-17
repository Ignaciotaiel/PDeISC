// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let animalesIndex = ['gato', 'perro', 'pajaro', 'pez', 'conejo'];
export let numerosIndex = [5, 20, 50, 80, 100];
export let ciudades = ['Buenos Aires', 'Madrid', 'Barcelona', 'Lima', 'Bogota'];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function indexOfElement(array, element) {
    // aplicamos el método correspondiente y retornamos
    return array.indexOf(element);
}
