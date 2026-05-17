// leemos si el usuario ya tenia el modo oscuro prendido de antes
export function inicializarTema() {
    const tema = localStorage.getItem('tema');
    if (tema === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// esto cambia los colores de la pantalla y se acuerda la preferencia para la proxima
export function toggleTema() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('tema', 'oscuro');
    } else {
        localStorage.setItem('tema', 'claro');
    }
}
