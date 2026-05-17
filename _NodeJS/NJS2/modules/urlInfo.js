import { URL } from 'node:url';

// toma una url de ejemplo y muestra como se desarma
export function logUrlInfo() {
  const urlEjemplo = 'https://www.luminacafe.com/blog/metodos?filtro=v60&origen=colombia';
  const miUrl = new URL(urlEjemplo);

  console.log('info de la url de cafe:');
  console.log('completa:', urlEjemplo);
  console.log('protocolo:', miUrl.protocol);
  console.log('host:', miUrl.host);
  console.log('ruta:', miUrl.pathname);
  console.log('parametros:', miUrl.searchParams.toString());
  console.log('origen:', miUrl.origin);
}
