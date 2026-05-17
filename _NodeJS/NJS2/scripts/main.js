import { formatearFecha, obtenerHoraActual } from '../modules/tiempo.js';

// se encarga de la logica principal de la vista de inicio
document.addEventListener('DOMContentLoaded', () => {
  console.log('cargo el inicio.');
  const dateElement = document.getElementById('current-date');
  
  if (dateElement) {
    // funcion cortita para refrescar la fecha y la hora
    const actualizarReloj = () => {
      dateElement.textContent = `hoy es: ${formatearFecha(new Date())} | ${obtenerHoraActual()} - abierto hasta las 20:00!`;
    };
    
    actualizarReloj();
    // pedimos que lo actualice cada segundo
    setInterval(actualizarReloj, 1000);
  }
});
