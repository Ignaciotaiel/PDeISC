import { validators } from '../modules/validators.js';
import { initTheme, renderThemeButton } from '../../contexto/theme.js';

// iniciamos el tema
initTheme();
renderThemeButton('theme-btn-container');

const form = document.getElementById('userForm');
const submitBtn = document.getElementById('submitBtn');
const alertContainer = document.getElementById('alert-container');
const historyList = document.getElementById('history-list');

const fields = ['nombre', 'apellido', 'email', 'telefono', 'ciudad'];
const validationState = {
    nombre: false,
    apellido: false,
    email: false,
    telefono: false,
    ciudad: false
};

// guardamos los usuarios aca
const usersHistory = [];

// le da vida al form y escucha los cambios
function init() {
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('input', () => validateField(field));
            input.addEventListener('blur', () => validateField(field));
        }
    });
    checkFormValidity();
}

// nos fijamos que el campo este bien escrito
function validateField(fieldName) {
    const input = document.getElementById(fieldName);
    const feedback = input.nextElementSibling;
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'nombre':
        case 'apellido':
            isValid = validators.nombre(input.value);
            errorMessage = isValid ? '' : 'Solo letras y espacios, 2-50 caracteres';
            break;
        case 'email':
            isValid = validators.email(input.value);
            errorMessage = isValid ? '' : 'Email inválido';
            break;
        case 'telefono':
            isValid = validators.telefono(input.value);
            errorMessage = isValid ? '' : 'Teléfono debe tener 8-15 dígitos';
            break;
        case 'ciudad':
            isValid = validators.ciudad(input.value);
            errorMessage = isValid ? '' : 'Ciudad debe tener al menos 3 caracteres';
            break;
    }
    
    validationState[fieldName] = isValid;
    
    if (isValid) {
        input.classList.remove('is-invalid');
        if (input.value.trim() !== '') {
            input.classList.add('is-valid');
        }
        if (feedback) feedback.textContent = '';
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (feedback) feedback.textContent = errorMessage;
    }
    
    checkFormValidity();
}

// revisamos si ya se puede enviar
function checkFormValidity() {
    const allValid = Object.values(validationState).every(v => v === true);
    submitBtn.disabled = !allValid;
}

// tiramos una alerta linda en pantalla
function showAlert(message, type = 'success') {
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 4000);
}

// cuando le dan click a enviar
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!submitBtn.disabled) {
        processFormData();
        showAlert('Usuario guardado exitosamente', 'success');
        resetForm();
    }
});

// agarramos todos los datos del formulario
function processFormData() {
    // por id
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    
    // por los elementos del form
    const telefono = document.querySelector('form').elements['telefono'].value;
    
    // usando formdata
    const formData = new FormData(form);
    const ciudad = formData.get('ciudad');
    
    // mostramos los datos en pantalla
    document.getElementById('res-method-1').innerHTML = `<strong>Nombre:</strong> ${nombre} <br><strong>Apellido:</strong> ${apellido} <br><strong>Email:</strong> ${email}`;
    document.getElementById('res-method-2').innerHTML = `<strong>Teléfono:</strong> ${telefono}`;
    document.getElementById('res-method-3').innerHTML = `<strong>Ciudad:</strong> ${ciudad}`;

    // guardamos en el historial
    const newUser = { nombre, apellido, email, telefono, ciudad };
    usersHistory.push(newUser);
    
    updateHistoryUI();
}

// actualizamos la tablita de abajo
function updateHistoryUI() {
    if (usersHistory.length === 0) {
        historyList.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">No hay usuarios registrados</td></tr>`;
        return;
    }

    historyList.innerHTML = usersHistory.map(user => `
        <tr>
            <td>${user.nombre} ${user.apellido}</td>
            <td>${user.email}</td>
            <td>${user.telefono}</td>
            <td>${user.ciudad}</td>
        </tr>
    `).join('');
}

// dejamos todo limpio para cargar otro
function resetForm() {
    form.reset();
    fields.forEach(field => {
        const input = document.getElementById(field);
        validationState[field] = false;
        if (input) {
            input.classList.remove('is-valid', 'is-invalid');
        }
    });
    checkFormValidity();
}

init();
