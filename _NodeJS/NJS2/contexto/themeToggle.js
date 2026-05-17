// prepara el boton de modo claro y oscuro
export function initThemeToggle() {
  const container = document.getElementById('theme-toggle-container');
  if (!container) return;

  const btn = document.createElement('button');
  btn.className = 'btn btn-outline-light ms-2';
  btn.innerText = '🌓 cambiar tema';
  container.appendChild(btn);

  // busca que tema tenia antes o usa el oscuro por defecto
  let currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // cuando lo tocan, cambia el tema y lo guarda
  btn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    console.log(`se puso el tema: ${currentTheme}`);
  });
}

// arranca la funcion ni bien carga este archivo
initThemeToggle();
