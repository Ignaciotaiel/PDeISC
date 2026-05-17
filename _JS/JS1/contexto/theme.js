// manejamos los colores claros y oscuros aca

// inicia el tema guardado
export function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
}

// cambia entre claro y oscuro
export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButtonIcon(newTheme);
}

// dibuja el boton en la pantalla
export function renderThemeButton(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-secondary';
    btn.id = 'themeToggleBtn';
    btn.addEventListener('click', toggleTheme);
    container.appendChild(btn);

    const currentTheme = localStorage.getItem('theme') || 'light';
    updateThemeButtonIcon(currentTheme);
}

// le cambia el dibujito al boton
function updateThemeButtonIcon(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
        btn.innerHTML = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    }
}
