
import { validators } from '../modules/validators.js';
import { initTheme, renderThemeButton } from '../../contexto/theme.js';

initTheme();
renderThemeButton('theme-btn-container');

const form = document.getElementById('personForm');
const submitBtn = document.getElementById('submitBtn');
const alertContainer = document.getElementById('alert-container');
const peopleList = document.getElementById('people-list');
const peopleCount = document.getElementById('people-count');

// campos que necesitan revisar texto o numeros
const textFields = ['nombre', 'apellido', 'nacionalidad'];
const selectFields = ['estadoCivil'];
const otherFields = ['fechaNacimiento', 'dni', 'telefono', 'email'];
let validationState = {
    nombre: false,
    apellido: false,
    fechaNacimiento: false,
    edad: false,
    sexo: false,
    dni: false,
    estadoCivil: false,
    nacionalidad: false,
    telefono: false,
    email: false,
    hijos: true // los hijos estan bien por defecto
};

// estado de la aplicacion
let peopleArray = [];

// inicia todo y carga los datos
function init() {
    loadData();
    setupEventListeners();
    checkFormValidity();
}

// trae la informacion guardada en la compu
function loadData() {
    const data = localStorage.getItem('peopleData');
    if (data) {
        peopleArray = JSON.parse(data);
    }
    updateUI();
}

// le pone vida a los botones e inputs
function setupEventListeners() {
    // calcula la edad sola
    const dobInput = document.getElementById('fechaNacimiento');
    dobInput.addEventListener('change', () => {
        calculateAge(dobInput.value);
        validateField('fechaNacimiento');
    });

    // los botoncitos de sexo
    const sexRadios = document.querySelectorAll('input[name="sexo"]');
    sexRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            validationState.sexo = true;
            document.getElementById('sexo-feedback').textContent = '';
            checkFormValidity();
        });
    });

    // el campo de hijos que aparece y desaparece
    const tieneHijos = document.getElementById('tieneHijos');
    const cantidadContainer = document.getElementById('cantidadHijosContainer');
    const cantidadInput = document.getElementById('cantidadHijos');

    tieneHijos.addEventListener('change', (e) => {
        if (e.target.checked) {
            cantidadContainer.classList.remove('d-none');
            validateField('cantidadHijos', true); // revisamos si pusieron bien la cantidad
        } else {
            cantidadContainer.classList.add('d-none');
            validationState.hijos = true;
            cantidadInput.classList.remove('is-invalid');
            checkFormValidity();
        }
    });

    cantidadInput.addEventListener('input', () => {
        if (tieneHijos.checked) validateField('cantidadHijos', true);
    });

    // los campos comunes
    [...textFields, ...selectFields, 'dni', 'telefono', 'email', 'edad'].forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('input', () => validateField(field));
            input.addEventListener('change', () => validateField(field));
            input.addEventListener('blur', () => validateField(field));
        }
    });
}

// saca la cuenta de la edad
function calculateAge(dobStr) {
    const ageInput = document.getElementById('edad');
    if (!dobStr) {
        ageInput.value = '';
        validationState.edad = false;
        return;
    }
    const dob = new Date(dobStr);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    ageInput.value = age >= 0 ? age : 0;
    validationState.edad = age >= 0;
}

// revisa si escribieron bien las cosas
function validateField(fieldName, isChildField = false) {
    if (isChildField) {
        const input = document.getElementById('cantidadHijos');
        const isValid = validators.number(input.value) && parseInt(input.value) > 0;
        validationState.hijos = isValid;
        input.classList.toggle('is-invalid', !isValid);
        input.classList.toggle('is-valid', isValid);
        checkFormValidity();
        return;
    }

    const input = document.getElementById(fieldName);
    const feedback = input.nextElementSibling;
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'nombre':
        case 'apellido':
        case 'nacionalidad':
            isValid = validators.text(input.value);
            errorMessage = 'Debe tener al menos 2 caracteres';
            break;
        case 'dni':
            isValid = validators.dni(input.value);
            errorMessage = 'DNI debe tener al menos 7 dígitos';
            break;
        case 'telefono':
            isValid = validators.text(input.value);
            errorMessage = 'Teléfono requerido';
            break;
        case 'email':
            isValid = validators.email(input.value);
            errorMessage = 'Email inválido';
            break;
        case 'edad':
            isValid = validators.number(input.value) && parseInt(input.value) >= 0;
            errorMessage = 'Edad inválida';
            break;
        case 'estadoCivil':
            isValid = input.value !== '';
            errorMessage = 'Seleccione una opción';
            break;
        case 'fechaNacimiento':
            isValid = input.value !== '';
            errorMessage = 'Fecha requerida';
            break;
    }

    validationState[fieldName] = isValid;

    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (feedback) feedback.textContent = '';
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (feedback) feedback.textContent = errorMessage;
    }

    checkFormValidity();
}

// vemos si ya podemos guardar
function checkFormValidity() {
    const allValid = Object.values(validationState).every(v => v === true);
    submitBtn.disabled = !allValid;
}

// tiramos una alerta copada
function showAlert(message, type = 'success') {
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    setTimeout(() => { alertContainer.innerHTML = ''; }, 3000);
}

// cuando mandan el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    const tieneHijos = document.getElementById('tieneHijos').checked;
    
    const person = {
        id: Date.now().toString(),
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        sexo: document.querySelector('input[name="sexo"]:checked').value,
        dni: document.getElementById('dni').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        nacionalidad: document.getElementById('nacionalidad').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        hijos: tieneHijos ? document.getElementById('cantidadHijos').value : 0
    };

    savePerson(person);
    showAlert('Persona registrada correctamente', 'success');
    resetForm();
});

// guarda a la persona nueva
function savePerson(person) {
    peopleArray.push(person);
    localStorage.setItem('peopleData', JSON.stringify(peopleArray));
    updateUI();
}

let personToDeleteId = null;
let deleteModal = null;

// pregunta si de verdad lo quieren borrar
window.requestDeletePerson = function(id) {
    personToDeleteId = id;
    if (!deleteModal) {
        deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    }
    deleteModal.show();
};

// si confirman lo borramos
document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (personToDeleteId) {
        executeDeletePerson(personToDeleteId);
        personToDeleteId = null;
        if (deleteModal) deleteModal.hide();
    }
});

// borra a la persona del sistema
function executeDeletePerson(id) {
    peopleArray = peopleArray.filter(p => p.id !== id);
    localStorage.setItem('peopleData', JSON.stringify(peopleArray));
    showAlert('Persona eliminada', 'danger');
    updateUI();
}

// dibuja todo de nuevo con los datos actualizados
function updateUI() {
    peopleCount.textContent = peopleArray.length;

    if (peopleArray.length === 0) {
        peopleList.innerHTML = `<li class="list-group-item text-center text-muted py-4">No hay personas registradas</li>`;
        return;
    }

    peopleList.innerHTML = peopleArray.map(p => `
        <li class="list-group-item d-flex justify-content-between align-items-center py-3">
            <div>
                <h6 class="mb-1 fw-bold">${p.nombre} ${p.apellido}</h6>
                <small class="text-muted d-block"><i class="bi bi-person-vcard me-1"></i> DNI: ${p.dni} | <i class="bi bi-calendar me-1"></i> Edad: ${p.edad} años</small>
                <small class="text-muted d-block"><i class="bi bi-diagram-2 me-1"></i> Hijos: ${p.hijos}</small>
            </div>
            <button class="btn btn-sm btn-outline-danger rounded-circle" onclick="requestDeletePerson('${p.id}')" title="Eliminar">
                <i class="bi bi-trash"></i>
            </button>
        </li>
    `).join('');
}

// deja el formulario vacio
function resetForm() {
    form.reset();
    document.getElementById('cantidadHijosContainer').classList.add('d-none');
    
    // reinicia el estado de validacion
    Object.keys(validationState).forEach(key => {
        validationState[key] = key === 'hijos'; // hijos empieza bien
    });
    
    // saca los colorcitos
    const allInputs = form.querySelectorAll('.form-control, .form-select');
    allInputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
    
    checkFormValidity();
}

init();
