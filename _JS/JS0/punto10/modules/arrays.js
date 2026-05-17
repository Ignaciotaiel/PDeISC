// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let numerosMap = [1, 2, 3, 4, 5];
export let nombresMap = ['ana', 'luis', 'maria', 'carlos'];
export let precios = [100, 250, 80, 430, 60];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function mapMultiplicar(array, factor) {
    // aplicamos el método correspondiente y retornamos
    return array.map(num => num * factor);
}

export function mapMayusculas(array) {
    // aplicamos el método correspondiente y retornamos
    return array.map(nombre => nombre.toUpperCase());
}

export function mapIva(array, iva) {
    // aplicamos el método correspondiente y retornamos
    return array.map(precio => (precio * (1 + iva)).toFixed(2));
}
