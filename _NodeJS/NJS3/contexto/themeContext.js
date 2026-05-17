/**
 * @modulo       themeContext
 * @descripcion  Maneja el estado del tema (dark/light mode) de la aplicación.
 */
const THEME_KEY = 'app_theme';

export const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    updateToggleButton(savedTheme);
  }
};

export const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
  updateToggleButton(newTheme);
};

const updateToggleButton = (theme) => {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.innerText = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
  }
};

// Iniciar al cargar el documento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
