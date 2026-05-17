// separamos la lógica pura de los datos en este archivo.
// definimos los datos iniciales que vamos a usar
export let nombresForEach = ['Ana', 'Luis', 'Maria', 'Carlos'];
export let numerosForEach = [2, 5, 8, 10];
export let personas = [
    { nombre: 'Ana', edad: 25 },
    { nombre: 'Luis', edad: 30 },
    { nombre: 'Maria', edad: 22 }
];

// creamos funciones puras que modifican los datos y devuelven el resultado
export function generarSaludos(array) {
    // aplicamos el método correspondiente y retornamos
    let resultado = '';
    array.forEach(nombre => {
        resultado += `Hola, ${nombre}!\n`;
    });
    return resultado;
}

export function calcularDobles(array) {
    // aplicamos el método correspondiente y retornamos
    let dobles = [];
    array.forEach(numero => {
        dobles.push(numero * 2);
    });
    return dobles;
}

export function mostrarPersonas(array) {
    // aplicamos el método correspondiente y retornamos
    let resultado = '';
    array.forEach(persona => {
        resultado += `${persona.nombre} tiene ${persona.edad} años\n`;
    });
    return resultado;
}
