/**
 * @proyecto     DOM Explorer - Ejercicio 6
 * @archivo      scripts/validacion.js
 * @descripcion  Módulo de validación de campos.
 */

/**
 * Valida un campo individual.
 */
export const validateField = (field) => {
  const { id, type } = field;
  let isValid = false;

  if (id === 'email') {
    isValid = validateEmail(field);
  } else if (id === 'name' || id === 'lastname') {
    isValid = validateNameOrLastname(field);
  } else if (type === 'radio') {
    isValid = document.querySelector(`input[name="${field.name}"]:checked`) !== null;
  } else {
    isValid = field.checkValidity();
  }

  if (id && type !== 'radio' && type !== 'checkbox') {
    field.classList.toggle('is-valid', isValid);
    field.classList.toggle('is-invalid', !isValid);
  }

  return isValid;
};

/**
 * Valida el email (.com requerido).
 */
export const validateEmail = (field, showUI = true) => {
  const value = field.value.trim();
  const isValid = field.checkValidity() && value.toLowerCase().endsWith('.com');
  
  if (showUI) {
    field.classList.toggle('is-valid', isValid);
    field.classList.toggle('is-invalid', !isValid);
    const errorDiv = document.getElementById('error-email');
    if (errorDiv) {
      errorDiv.innerText = value.length === 0 ? "Requerido" : 
                           !field.checkValidity() ? "Email inválido" : 
                           "Debe terminar en .com";
    }
  }
  return isValid;
};

/**
 * Valida nombre o apellido (mínimo 3 caracteres, sin números).
 */
export const validateNameOrLastname = (field, showUI = true) => {
  const value = field.value.trim();
  const isValid = value.length >= 3 && !/\d/.test(value);

  if (showUI) {
    field.classList.toggle('is-valid', isValid);
    field.classList.toggle('is-invalid', !isValid);
  }
  return isValid;
};

/**
 * Actualiza el progreso del formulario.
 */
export const updateProgress = (formData) => {
  const name = document.getElementById('name');
  const lastname = document.getElementById('lastname');
  const age = document.getElementById('age');
  const email = document.getElementById('email');
  const country = document.getElementById('country');
  const btnSubmit = document.getElementById('btn-submit');
  const progress = document.getElementById('form-progress');
  const progressText = document.getElementById('progress-text');

  if (!name || !lastname || !age || !email || !country || !btnSubmit || !progress || !progressText) return;

  const fields = [
    validateNameOrLastname(name, false),
    validateNameOrLastname(lastname, false),
    age.checkValidity() && age.value !== '',
    validateEmail(email, false),
    country.checkValidity() && country.value !== '',
    document.querySelector('input[name="gender"]:checked') !== null
  ];
  
  const completed = fields.filter(f => f).length;
  const percentage = Math.round((completed / fields.length) * 100);
  
  progress.style.width = `${percentage}%`;
  progressText.innerText = `${percentage}% completado`;
  btnSubmit.disabled = percentage < 100;
};
