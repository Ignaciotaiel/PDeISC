// exportamos las funciones matematicas basicas para usarlas en otros lados
export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;
export const multiplicar = (a, b) => a * b;
export const dividir = (a, b) => b === 0 ? "Error: Div por 0" : a / b;

// preparamos las respuestas para el primer ejercicio
export function obtenerResultadoEj1() {
    return { saludo: "Hola mundo desde Node.js", fin: "Fin" };
}

// preparamos las respuestas para el segundo ejercicio
export function obtenerResultadoEj2() {
    return { suma: 4 + 5, resta: 3 - 6, multiplicacion: 2 * 7, division: 20 / 4 };
}

// preparamos las respuestas para el tercer ejercicio definiendo funciones internas
export function obtenerResultadoEj3() {
    const s = (a, b) => a + b;
    const r = (a, b) => a - b;
    const m = (a, b) => a * b;
    const d = (a, b) => b === 0 ? "Error" : a / b;
    
    return { 
        suma: s(4, 5), 
        resta: r(3, 6), 
        multiplicacion: m(2, 7), 
        division: d(20, 4) 
    };
}

// armamos un objeto con todos los resultados del cuarto ejercicio
export function obtenerResultadoEj4() {
    return {
        suma: { operacion: "5+3", resultado: sumar(5, 3) },
        resta: { operacion: "8-6", resultado: restar(8, 6) },
        multiplicacion: { operacion: "3*11", resultado: multiplicar(3, 11) },
        division: { operacion: "30/5", resultado: dividir(30, 5) }
    };
}
