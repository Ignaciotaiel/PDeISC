/**
 * Gestiona el tema oscuro/claro de la aplicación
 */
export function initTheme() {
    const themeStorageKey = 'app-theme-preference-p2';
    const htmlElement = document.documentElement;
    
    // Crear el botón flotante
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle-btn';
    themeBtn.className = 'btn btn-primary rounded-circle shadow-lg';
    themeBtn.style.position = 'fixed';
    themeBtn.style.bottom = '20px';
    themeBtn.style.right = '20px';
    themeBtn.style.width = '50px';
    themeBtn.style.height = '50px';
    themeBtn.style.zIndex = '1050';
    themeBtn.style.fontSize = '1.5rem';
    themeBtn.style.display = 'flex';
    themeBtn.style.alignItems = 'center';
    themeBtn.style.justifyContent = 'center';
    themeBtn.setAttribute('aria-label', 'Cambiar tema');
    
    document.body.appendChild(themeBtn);

    /**
     * Aplica el tema y actualiza el botón
     */
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem(themeStorageKey, theme);
        themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    };

    // Cargar preferencia guardada o usar la del sistema
    const savedTheme = localStorage.getItem(themeStorageKey);
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(initialTheme);

    // Evento de clic para alternar
    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}
