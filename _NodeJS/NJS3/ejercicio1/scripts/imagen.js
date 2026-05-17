/**
 * @proyecto     DOM Explorer - Ejercicio 1
 * @archivo      scripts/imagen.js
 * @descripcion  Módulo que gestiona la creación y modificación de imágenes.
 */


import { showToast, updateButtonStates } from '../modules/ui.js';

const IMG_CONFIG = {
  sizes: [
    { label: 'Pequeño', value: '200px' },
    { label: 'Mediano', value: '400px' },
    { label: 'Grande', value: '100%' }
  ],
  images: [
    'https://picsum.photos/id/237/400/200',
    'https://picsum.photos/id/10/400/200',
    'https://picsum.photos/id/20/400/200',
    'https://picsum.photos/id/30/400/200'
  ]
};

let imgState = {
  imgSizeIndex: 1,
  imgUrlIndex: 0
};

/**
 * Agrega una imagen al área de previsualización.
 */
export const handleAddImg = () => {
  const previewArea = document.getElementById('preview-area');
  const imgSizeBadge = document.getElementById('imgSizeBadge');
  
  if (document.querySelector('#preview-area img')) {
    showToast('La imagen ya fue agregada');
    return;
  }
  
  const img = document.createElement('img');
  img.src = IMG_CONFIG.images[imgState.imgUrlIndex];
  img.className = 'img-fluid rounded shadow fade-in mt-3';
  img.style.width = IMG_CONFIG.sizes[imgState.imgSizeIndex].value;
  img.style.transition = 'all 0.5s ease';
  
  previewArea.appendChild(img);
  if (imgSizeBadge) {
    imgSizeBadge.innerText = `Tamaño: ${IMG_CONFIG.sizes[imgState.imgSizeIndex].label}`;
  }
  

  updateButtonStates();
};

/**
 * Cambia la imagen actual.
 */
export const handleChangeImg = () => {
  const img = document.querySelector('#preview-area img');
  if (!img) return;
  
  imgState.imgUrlIndex = (imgState.imgUrlIndex + 1) % IMG_CONFIG.images.length;
  img.style.opacity = '0';
  
  setTimeout(() => {
    img.src = IMG_CONFIG.images[imgState.imgUrlIndex];
    img.style.opacity = '1';

  }, 300);
};

/**
 * Cambia el tamaño de la imagen.
 */
export const handleChangeImgSize = () => {
  const img = document.querySelector('#preview-area img');
  const imgSizeBadge = document.getElementById('imgSizeBadge');
  if (!img) return;
  
  imgState.imgSizeIndex = (imgState.imgSizeIndex + 1) % IMG_CONFIG.sizes.length;
  const newSize = IMG_CONFIG.sizes[imgState.imgSizeIndex];
  
  img.style.width = newSize.value;
  if (imgSizeBadge) {
    imgSizeBadge.innerText = `Tamaño: ${newSize.label}`;
  }
  

};

// Inicialización de eventos para Imagen
document.addEventListener('DOMContentLoaded', () => {
  const btnAddImg = document.getElementById('btnAddImg');
  const btnChangeImg = document.getElementById('btnChangeImg');
  const btnChangeImgSize = document.getElementById('btnChangeImgSize');

  if (btnAddImg) btnAddImg.addEventListener('click', handleAddImg);
  if (btnChangeImg) btnChangeImg.addEventListener('click', handleChangeImg);
  if (btnChangeImgSize) btnChangeImgSize.addEventListener('click', handleChangeImgSize);
  
  updateButtonStates();
});
