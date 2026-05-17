import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 3001;

// levantamos un mini servidor solo para la vista de datos
export function startFileServer() {
  const server = http.createServer((req, res) => {
    // solo respondemos si piden la ruta raiz o datos.html
    if (req.url === '/' || req.url === '/datos.html') {
      const filePath = path.join(process.cwd(), 'pages', 'datos.html');
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('hubo un problema al leer la pagina');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('no hay nada en este puerto');
    }
  });

  server.listen(PORT, () => {
    console.log(`servidor de datos corriendo en el puerto ${PORT}`);
  });
}
