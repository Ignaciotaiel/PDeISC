/**
 * @proyecto     DOM Explorer - Ejercicio 6
 * @archivo      scripts/preview.js
 * @descripcion  Módulo de previsualización dinámica.
 */

/**
 * Genera el avatar circular con las iniciales.
 */
export const updateAvatar = () => {
  const name = document.getElementById('name');
  const lastname = document.getElementById('lastname');
  const avatar = document.getElementById('p-avatar');
  
  if (!name || !lastname || !avatar) return;

  const n = name.value.trim().charAt(0).toUpperCase();
  const l = lastname.value.trim().charAt(0).toUpperCase();
  avatar.innerText = (n + l) || '?';
};

/**
 * Actualiza la tarjeta de previsualización.
 */
export const updatePreview = (data) => {
  const preview = {
    fullname: document.getElementById('p-fullname'),
    email: document.getElementById('p-email'),
    age: document.getElementById('p-age'),
    country: document.getElementById('p-country'),
    gender: document.getElementById('p-gender'),
    interests: document.getElementById('p-interests'),
    bio: document.getElementById('p-bio')
  };

  if (preview.fullname) preview.fullname.innerText = `${data.name || 'Nombre'} ${data.lastname || 'Apellido'}`;
  if (preview.email) preview.email.innerText = data.email || 'usuario@correo.com';
  if (preview.age) preview.age.innerText = data.age || '-';
  if (preview.country) preview.country.innerText = data.country || '-';
  if (preview.gender) preview.gender.innerText = data.gender || '-';
  if (preview.bio) preview.bio.innerText = data.bio || 'No se ha proporcionado una biografía todavía.';
  
  const bioCount = document.getElementById('bio-count');
  if (bioCount) bioCount.innerText = `${(data.bio || '').length} / 200`;
  
  if (preview.interests) {
    preview.interests.innerHTML = data.interests && data.interests.length > 0 
      ? data.interests.map(i => `<span class="badge bg-violet fade-in">${i}</span>`).join('')
      : '<span class="badge bg-secondary">Ninguno</span>';
  }

  updateAvatar();
};
