export function extraerNumeros(c) {
    const lineas = c.split(/\r?\n/);
    const result = [];
    lineas.forEach(l => {
        if (l.toLowerCase().includes('número')) {
            const match = l.match(/:\s*(\d+)/);
            if (match) result.push(parseInt(match[1]));
        } else {
            const limpia = l.trim();
            if (/^\d{1,3}$/.test(limpia)) result.push(parseInt(limpia));
        }
    });
    return result;
}

export function cumpleCondicion(n) {
    const s = n.toString();
    return s.length === 1 || s[0] === s[s.length - 1];
}

export function filtrarNumeros(lista) {
    const utiles = lista.filter(cumpleCondicion).sort((a, b) => a - b);
    const descartados = lista.filter(n => !cumpleCondicion(n)).sort((a, b) => a - b);
    return { utiles, descartados };
}

export function calcularEstadisticas(u, d) {
    const total = u.length + d.length;
    return {
        total, totalUtiles: u.length, totalDescartados: d.length,
        porcentajeUtiles: total > 0 ? (u.length / total * 100).toFixed(2) + "%" : "0.00%",
        porcentajeDescartados: total > 0 ? (d.length / total * 100).toFixed(2) + "%" : "0.00%"
    };
}

export function generarContenidoTxt(u, s) {
    const f = new Date().toLocaleString('es-AR');
    let c = `REPORTE FILTRADO - ${f}\n\nÚTILES:\n`;
    u.forEach((n, i) => c += `${i + 1}. ${n}\n`);
    c += `\nESTADÍSTICAS:\nTotal: ${s.total}\nÚtiles: ${s.totalUtiles} (${s.porcentajeUtiles})\nDescartados: ${s.totalDescartados}\n`;
    return c;
}
