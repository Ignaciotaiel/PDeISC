// formatea la fecha para que se lea normal
export function formatearFecha(fecha) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

// nos devuelve la hora actual en numeros simples
export function obtenerHoraActual() {
  const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date().toLocaleTimeString('es-ES', opciones);
}
