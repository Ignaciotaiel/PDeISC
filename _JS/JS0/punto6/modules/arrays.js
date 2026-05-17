// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let numerosSlice = [10, 20, 30, 40, 50, 60];
export let peliculas = ['Toy Story', 'Matrix', 'Titanic', 'Avatar', 'Inception', 'Interstellar'];
export let elementos = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function sliceArray(array, inicio, fin) {
    // aplicamos el método correspondiente y retornamos
    if (fin !== undefined) {
        return array.slice(inicio, fin);
    }
    return array.slice(inicio);
}
