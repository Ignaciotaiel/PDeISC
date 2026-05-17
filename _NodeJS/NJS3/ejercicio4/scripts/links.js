/**
 * @proyecto     DOM Explorer - Ejercicio 4
 * @archivo      scripts/links.js
 * @descripcion  Módulo de gestión de enlaces (<a>).
 */

import { addLog } from './log.js';

const LINK_DATA = [
  { id: 'google', name: 'Google', url: 'https://google.com', altName: 'Bing', altUrl: 'https://bing.com', icon: '🔍' },
  { id: 'youtube', name: 'YouTube', url: 'https://youtube.com', altName: 'Vimeo', altUrl: 'https://vimeo.com', icon: '🎬' },
  { id: 'github', name: 'GitHub', url: 'https://github.com', altName: 'GitLab', altUrl: 'https://gitlab.com', icon: '🐙' },
  { id: 'wikipedia', name: 'Wikipedia', url: 'https://wikipedia.org', altName: 'Britannica', altUrl: 'https://britannica.com', icon: '📖' },
  { id: 'mdn', name: 'MDN', url: 'https://developer.mozilla.org', altName: 'W3Schools', altUrl: 'https://w3schools.com', icon: '🦊' }
];

let creationCount = 0;

/**
 * Modifica los atributos de un enlace.
 */
export const modifyLink = (id) => {
  const data = LINK_DATA.find(l => l.id === id);
  const anchor = document.getElementById(`anchor-${id}`);
  const title = document.getElementById(`title-${id}`);
  const card = document.getElementById(`link-card-${id}`);

  if (!anchor || !title || !card) return;

  const isOriginal = anchor.href === data.url || anchor.href === data.url + '/';
  const oldUrl = anchor.href;
  const oldText = title.innerText;
  
  const nextUrl = isOriginal ? data.altUrl : data.url;
  const nextName = isOriginal ? data.altName : data.name;

  anchor.href = nextUrl;
  anchor.innerText = nextUrl;
  title.innerText = nextName;

  card.classList.remove('highlight');
  void card.offsetWidth;
  card.classList.add('highlight');

  addLog(oldText, 'href/texto', oldUrl, nextUrl);
};

/**
 * Crea un nodo <a> y su card visual.
 */
export const createLinkNode = (data, delay = 0) => {
  const linksContainer = document.getElementById('links-container');
  const emptyMsg = document.getElementById('empty-msg');
  
  if (document.getElementById(`link-card-${data.id}`)) return;

  setTimeout(() => {
    creationCount++;
    if (emptyMsg) emptyMsg.style.display = 'none';

    const card = document.createElement('div');
    card.id = `link-card-${data.id}`;
    card.className = 'link-card slide-in';
    card.innerHTML = `
      <div class="badge-order code-font">${creationCount}</div>
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <span class="fs-4 me-3">${data.icon}</span>
          <div>
            <h6 class="mb-0 text-white" id="title-${data.id}">${data.name}</h6>
            <a href="${data.url}" id="anchor-${data.id}" target="_blank" rel="noopener" class="small code-font">
              ${data.url}
            </a>
          </div>
        </div>
        <button class="btn btn-sm btn-custom py-1 btn-modify" data-id="${data.id}">Modificar</button>
      </div>
    `;

    linksContainer.appendChild(card);
    
    // Asignar evento al botón de modificar sin usar onclick inline
    const btnModify = card.querySelector('.btn-modify');
    btnModify.addEventListener('click', () => modifyLink(data.id));

    const btnCreate = document.getElementById(`btn-create-${data.id}`);
    if (btnCreate) btnCreate.disabled = true;

    addLog(data.name, 'creación', 'null', data.url);
  }, delay);
};

/**
 * Restaura todos los enlaces.
 */
export const restoreAll = () => {
  LINK_DATA.forEach(data => {
    const anchor = document.getElementById(`anchor-${data.id}`);
    if (anchor && (anchor.href !== data.url && anchor.href !== data.url + '/')) {
      modifyLink(data.id);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const btnContainer = document.getElementById('create-buttons');
  const btnCreateAll = document.getElementById('btn-create-all');
  const btnRestoreAll = document.getElementById('btn-restore-all');

  LINK_DATA.forEach(data => {
    const btn = document.createElement('button');
    btn.id = `btn-create-${data.id}`;
    btn.className = 'btn btn-custom btn-sm text-start';
    btn.innerHTML = `${data.icon} Crear ${data.name}`;
    btn.addEventListener('click', () => createLinkNode(data));
    btnContainer.appendChild(btn);
  });

  if (btnCreateAll) {
    btnCreateAll.addEventListener('click', () => {
      LINK_DATA.forEach((data, index) => {
        createLinkNode(data, index * 200);
      });
    });
  }

  if (btnRestoreAll) {
    btnRestoreAll.addEventListener('click', restoreAll);
  }
});
