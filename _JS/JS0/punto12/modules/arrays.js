// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let numerosReduce = [10, 20, 30, 40];
export let enteros = [1, 2, 3, 4, 5];
export let productos = [
    { producto: 'Camisa', precio: 1500 },
    { producto: 'Pantalon', precio: 3200 },
    { producto: 'Zapatos', precio: 5000 },
    { producto: 'Cinturon', precio: 800 }
];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function sumReducer(array) {
    // aplicamos el método correspondiente y retornamos
    return array.reduce((acumulador, numero) => acumulador + numero, 0);
}

export function multReducer(array) {
    // aplicamos el método correspondiente y retornamos
    return array.reduce((acumulador, numero) => acumulador * numero, 1);
}

export function totalPrecios(array) {
    // aplicamos el método correspondiente y retornamos
    return array.reduce((acumulador, item) => acumulador + item.precio, 0);
}
