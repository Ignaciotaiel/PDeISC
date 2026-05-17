/**
 * @modulo       ui
 * @descripcion  Utilidades para manipulación de la interfaz de usuario.
 */

/**
 * Muestra un message en pantalla usando Bootstrap Toasts.
 */
export const showToast = (message) => {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }

  const toastId = 'toast-' + Date.now();
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  
  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  
  const toastEl = document.getElementById(toastId);
  if (window.bootstrap) {
    const toast = new window.bootstrap.Toast(toastEl);
    toast.show();
    
    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  } else {
    toastEl.style.display = 'block';
    toastEl.style.opacity = '1';
    setTimeout(() => toastEl.remove(), 3000);
  }
};

/**
 * Muestra un modal de confirmación antes de ejecutar una acción.
 * @param {string} message - Mensaje a mostrar en el modal.
 * @param {Function} onConfirm - Callback que se ejecuta si el usuario confirma.
 */
export const confirmAction = (message, onConfirm) => {
  const modalId = 'confirmModal-' + Date.now();
  const modalHtml = `
    <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white border-secondary">
          <div class="modal-header border-secondary">
            <h5 class="modal-title text-warning">Confirmación</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${message}</p>
          </div>
          <div class="modal-footer border-secondary">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="${modalId}-confirm">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  const modalEl = document.getElementById(modalId);
  if (window.bootstrap) {
    const modal = new window.bootstrap.Modal(modalEl);
    modal.show();
    
    document.getElementById(`${modalId}-confirm`).addEventListener('click', () => {
      modal.hide();
      onConfirm();
    });
    
    modalEl.addEventListener('hidden.bs.modal', () => {
      modalEl.remove();
    });
  } else {
    if (confirm(message)) {
      onConfirm();
    }
  }
};
