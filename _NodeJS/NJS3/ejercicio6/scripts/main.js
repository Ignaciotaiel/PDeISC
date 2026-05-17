/**
 * @proyecto     DOM Explorer - Ejercicio 6
 * @archivo      scripts/main.js
 * @descripcion  Lógica principal del formulario de registro.
 */

import { updatePreview } from './preview.js';
import { validateField, updateProgress } from './validacion.js';
import { confirmAction } from '../modules/ui.js';

export const formData = {
  name: '', lastname: '', age: '', email: '',
  gender: '', country: '', interests: [], bio: ''
};

/**
 * Filtra la entrada para eliminar números.
 */
const filterNumericInput = (e) => {
  const { id, value } = e.target;
  if (id === 'name' || id === 'lastname') {
    if (/\d/.test(value)) {
      e.target.value = value.replace(/\d/g, '');
      validateField(e.target);
    }
  }
};

/**
 * Maneja cualquier cambio en los campos del formulario.
 */
const handleInput = (e) => {
  const { id, value, name, type } = e.target;
  
  filterNumericInput(e);
  const cleanValue = e.target.value;

  if (type === 'checkbox') {
    const checked = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(i => i.value);
    formData.interests = checked;
  } else if (name === 'gender') {
    formData.gender = value;
  } else if (id && id !== 'reset') {
    formData[id] = cleanValue;
  }

  updatePreview(formData);
  updateProgress(formData);
};

/**
 * Maneja el envío del formulario.
 */
const handleSubmit = () => {
  const btnSubmit = document.getElementById('btn-submit');
  if (btnSubmit.disabled) return;

  const overlay = document.getElementById('success-overlay');
  if (overlay) overlay.classList.add('active');
  
  const toastEl = document.getElementById('successToast');
  if (toastEl && window.bootstrap) {
    const toast = new window.bootstrap.Toast(toastEl);
    toast.show();
  }
};

/**
 * Reinicia el formulario y el estado global.
 */
const resetForm = () => {
  confirmAction('¿Deseás reiniciar el formulario? Se perderán todos los datos ingresados.', () => {
    Object.keys(formData).forEach(key => {
      formData[key] = Array.isArray(formData[key]) ? [] : '';
    });

    document.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
      else el.value = '';
      el.classList.remove('is-valid', 'is-invalid');
    });

    const overlay = document.getElementById('success-overlay');
    if (overlay) overlay.classList.remove('active');

    updatePreview(formData);
    updateProgress(formData);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', handleInput);
    input.addEventListener('change', handleInput);
  });

  const btnSubmit = document.getElementById('btn-submit');
  if (btnSubmit) btnSubmit.addEventListener('click', handleSubmit);

  const btnReset = document.getElementById('btn-reset');
  if (btnReset) btnReset.addEventListener('click', resetForm);

  updatePreview(formData);
  updateProgress(formData);
});
