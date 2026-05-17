/**
 * @modulo       ui
 * @descripcion  Utilidades para manipulación de la interfaz de usuario.
 */

/**
 * Muestra un mensaje en pantalla usando Bootstrap Toasts.
 * @param {string} message - El mensaje a mostrar.
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

/**
 * Actualiza el estado habilitado/deshabilitado de todos los botones del panel
 * de control (específico para Ejercicio 1).
 */
export const updateButtonStates = () => {
  const h1 = document.querySelector('#preview-area h1');
  const img = document.querySelector('#preview-area img');
  const emptyMsg = document.getElementById('empty-msg');
  
  const btnAddH1 = document.getElementById('btnAddH1');
  const btnChangeH1Text = document.getElementById('btnChangeH1Text');
  const btnChangeH1Color = document.getElementById('btnChangeH1Color');
  
  const btnAddImg = document.getElementById('btnAddImg');
  const btnChangeImg = document.getElementById('btnChangeImg');
  const btnChangeImgSize = document.getElementById('btnChangeImgSize');
  
  if (btnChangeH1Text) btnChangeH1Text.disabled = !h1;
  if (btnChangeH1Color) btnChangeH1Color.disabled = !h1;
  if (btnAddH1) btnAddH1.disabled = !!h1;
  
  if (btnChangeImg) btnChangeImg.disabled = !img;
  if (btnChangeImgSize) btnChangeImgSize.disabled = !img;
  if (btnAddImg) btnAddImg.disabled = !!img;
  
  if (emptyMsg) emptyMsg.style.display = (h1 || img) ? 'none' : 'block';
};
