// armamos funciones chiquitas para cada cuenta y despues las usamos

const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => b === 0 ? "Error" : a / b;

console.log(`Suma (4, 5): ${sumar(4, 5)}`);
console.log(`Resta (3, 6): ${restar(3, 6)}`);
console.log(`Multiplicación (2, 7): ${multiplicar(2, 7)}`);
console.log(`División (20, 4): ${dividir(20, 4)}`);
