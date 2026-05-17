// guardamos el html de la barra para meterlo en todas las paginas
export const menuHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">☕ Lumina Café</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-toggle="target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link" href="/">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="/productos.html">Nuestros Cafés</a></li>
        <li class="nav-item"><a class="nav-link" href="/historia.html">Nuestra Historia</a></li>
        <li class="nav-item"><a class="nav-link" href="/galeria.html">Galería</a></li>
        <li class="nav-item"><a class="nav-link" href="/datos.html">Calculadora Brew</a></li>
        <li class="nav-item"><a class="nav-link" href="/contacto.html">Únete al Equipo</a></li>
      </ul>
      <div id="theme-toggle-container"></div>
    </div>
  </div>
</nav>
`;
