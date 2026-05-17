// FIXES: Added correct wildcard route to serve index.html, added route for shared contexto module.

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, 'pages')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/modules', express.static(path.join(__dirname, 'modules')));
app.use('/contexto', express.static(path.join(__dirname, '../contexto')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'index.html')));

app.listen(3001, () => console.log('Server running at http://localhost:3001'));
