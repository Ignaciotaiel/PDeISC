// configuramos el servidor para que lea los módulos y estilos.
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(__dirname)); // servimos la carpeta principal
app.use('/contexto', express.static(path.join(__dirname, '../contexto'))); // servimos la carpeta del tema oscuro para que todos lo compartan

app.use((_, res) => res.sendFile(path.join(__dirname, 'pages', 'index.html')));

app.listen(3003, () => console.log('Server running at http://localhost:3003'));
