// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let roles = ['editor', 'admin', 'viewer', 'moderator'];
export let coloresIncludes = ['rojo', 'azul', 'verde', 'amarillo'];
export let numerosUnicos = [1, 3, 5, 7, 9];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function checkIncludes(array, element) {
    // aplicamos el método correspondiente y retornamos
    return array.includes(element);
}

export function pushIfUnique(array, element) {
    // aplicamos el método correspondiente y retornamos
    if (!array.includes(element)) {
        array.push(element);
        return true;
    }
    return false;
}
