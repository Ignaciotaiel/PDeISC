// FIXES: Created shared theme module
const THEME_KEY = 'app_theme';

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
}

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(getTheme());
}

export function renderThemeButton(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const btn = document.createElement('button');
  btn.className = 'btn btn-outline-secondary btn-sm ms-2';
  const update = (theme) => {
    btn.innerHTML = theme === 'dark'
      ? '☀️ Light Mode'
      : '🌙 Dark Mode';
  };
  update(getTheme());
  btn.addEventListener('click', () => update(toggleTheme()));
  container.appendChild(btn);
}
