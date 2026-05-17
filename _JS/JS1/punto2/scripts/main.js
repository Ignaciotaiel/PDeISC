
import { validators } from '../modules/validators.js';
import { initTheme, renderThemeButton } from '../../contexto/theme.js';

initTheme();
renderThemeButton('theme-btn-container');

const form = document.getElementById('productForm');
const submitBtn = document.getElementById('submitBtn');
const alertContainer = document.getElementById('alert-container');
const tableBody = document.getElementById('product-table-body');

// contadores de la vista
const countArray = document.getElementById('count-array');
const countSession = document.getElementById('count-session');
const countLocal = document.getElementById('count-local');

// aca guardamos todo en memoria
let productsArray = [];

const fields = ['producto', 'categoria', 'precio', 'stock', 'marca', 'color', 'origen'];
const validationState = {
    producto: false,
    categoria: false,
    precio: false,
    stock: false,
    marca: false,
    color: true, // el color siempre viene bien
    origen: false
};

// arranca el formulario y carga cosas guardadas
function init() {
    loadData();
    updateUI();

    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('input', () => validateField(field));
            input.addEventListener('change', () => validateField(field));
            input.addEventListener('blur', () => validateField(field));
        }
    });
    
    // nos fijamos de entrada si todo esta bien
    checkFormValidity();
}

// trae los datos de la compu del usuario
function loadData() {
    const localData = localStorage.getItem('products');
    const sessionData = sessionStorage.getItem('products');
    
    // si hay algo guardado lo pasamos a la memoria
    if (localData) {
        productsArray = JSON.parse(localData);
        // sincronizamos todo
        sessionStorage.setItem('products', JSON.stringify(productsArray));
    } else if (sessionData) {
        productsArray = JSON.parse(sessionData);
        localStorage.setItem('products', JSON.stringify(productsArray));
    }
}

// revisa un campo en particular
function validateField(fieldName) {
    const input = document.getElementById(fieldName);
    const feedback = input.nextElementSibling;
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'producto':
        case 'marca':
            isValid = validators.text(input.value);
            errorMessage = 'Debe tener al menos 3 caracteres';
            break;
        case 'precio':
            isValid = validators.number(input.value) && parseFloat(input.value) > 0;
            errorMessage = 'Debe ser mayor a 0';
            break;
        case 'stock':
            isValid = validators.number(input.value) && parseInt(input.value) >= 0;
            errorMessage = 'Debe ser 0 o mayor';
            break;
        case 'categoria':
        case 'origen':
            isValid = input.value !== '';
            errorMessage = 'Debe seleccionar una opción';
            break;
        case 'color':
            isValid = true;
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

// vemos si ya se puede guardar
function checkFormValidity() {
    const allValid = Object.values(validationState).every(v => v === true);
    submitBtn.disabled = !allValid;
}

// muestra un aviso lindo
function showAlert(message, type = 'success') {
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    setTimeout(() => { alertContainer.innerHTML = ''; }, 3000);
}

// cuando mandan el nuevo producto
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    const newProduct = {
        id: Date.now().toString(),
        producto: document.getElementById('producto').value,
        categoria: document.getElementById('categoria').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value),
        marca: document.getElementById('marca').value,
        color: document.getElementById('color').value,
        origen: document.getElementById('origen').value,
        garantia: document.getElementById('garantia').checked
    };

    saveProduct(newProduct);
    showAlert('Producto agregado exitosamente');
    resetForm();
});

// guarda el producto en todos lados
function saveProduct(product) {
    // lo metemos en memoria
    productsArray.push(product);
    
    // lo guardamos en la sesion
    sessionStorage.setItem('products', JSON.stringify(productsArray));
    
    // lo guardamos en el disco
    localStorage.setItem('products', JSON.stringify(productsArray));

    updateUI();
}

let productToDeleteId = null;
let deleteModal = null;

// pide confirmacion para borrar
window.requestDeleteProduct = function(id) {
    productToDeleteId = id;
    if (!deleteModal) {
        deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    }
    deleteModal.show();
};

// si confirman, lo borramos de verdad
document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (productToDeleteId) {
        executeDeleteProduct(productToDeleteId);
        productToDeleteId = null;
        if (deleteModal) deleteModal.hide();
    }
});

// borra el producto por id
function executeDeleteProduct(id) {
    // lo sacamos de la memoria
    productsArray = productsArray.filter(p => p.id !== id);
    
    // actualizamos lo guardado
    sessionStorage.setItem('products', JSON.stringify(productsArray));
    localStorage.setItem('products', JSON.stringify(productsArray));
    
    showAlert('Producto eliminado', 'danger');
    updateUI();
}

// actualiza toda la pantalla con los datos nuevos
function updateUI() {
    // dibujamos la tabla
    if (productsArray.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No hay productos almacenados</td></tr>`;
    } else {
        tableBody.innerHTML = productsArray.map(p => `
            <tr>
                <td><strong>${p.producto}</strong><br><small class="text-muted">${p.marca}</small></td>
                <td><span class="badge bg-secondary">${p.categoria}</span></td>
                <td>$${p.precio.toFixed(2)}</td>
                <td>${p.stock} u.</td>
                <td>${p.garantia ? '<i class="bi bi-check-circle-fill text-success"></i> Sí' : '<i class="bi bi-x-circle-fill text-danger"></i> No'}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-danger" onclick="requestDeleteProduct('${p.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // actualizamos los numeritos de arriba
    const length = productsArray.length;
    countArray.textContent = length;
    
    const sessionData = JSON.parse(sessionStorage.getItem('products') || '[]');
    countSession.textContent = sessionData.length;
    
    const localData = JSON.parse(localStorage.getItem('products') || '[]');
    countLocal.textContent = localData.length;
}

// dejamos el formulario como nuevo
function resetForm() {
    form.reset();
    document.getElementById('color').value = '#563d7c';
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (field !== 'color') {
            validationState[field] = false;
        }
        if (input) {
            input.classList.remove('is-valid', 'is-invalid');
        }
    });
    checkFormValidity();
}

init();
