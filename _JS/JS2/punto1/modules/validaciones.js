export function validarNumero(valor, cantidadActual = 0) {
    if (cantidadActual >= 20) return { valido: false, error: "Máximo 20 números" };
    if (valor === "" || valor === null) return { valido: false, error: "Campo vacío" };
    const num = Number(valor);
    if (isNaN(num)) return { valido: false, error: "Debe ser numérico" };
    if (!Number.isInteger(num)) return { valido: false, error: "Solo enteros" };
    if (num < 1 || num > 999) return { valido: false, error: "Rango 1-999" };
    return { valido: true, error: "" };
}

export function numeroAString(n, index) {
    return `Número ${(index + 1)}: ${n}`;
}

export function generarContenidoTxt(lista) {
    const fecha = new Date().toLocaleString('es-AR');
    let c = `REGISTRO - ${fecha}\n\n`;
    lista.forEach((n, i) => c += numeroAString(n, i) + `\n`);
    c += `\nTotal: ${lista.length}\n`;
    return c;
}
