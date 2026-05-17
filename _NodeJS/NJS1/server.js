import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    obtenerResultadoEj1,
    obtenerResultadoEj2,
    obtenerResultadoEj3,
    obtenerResultadoEj4
} from './modules/calculos.js';

// configuracion de rutas absolutas para poder usar modulos es6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// aca servimos las carpetas para que la pagina html pueda leer los estilos y scripts
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/contexto', express.static(path.join(__dirname, 'contexto')));

// cuando alguien entre a la raiz, le mandamos la pagina del ejercicio 5
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'ejercicio5.html'));
});

// armamos la ruta de la api que devuelve los resultados de los cuatro ejercicios
app.get('/api/resultados', (req, res) => {
    const resultados = {
        ejercicio1: obtenerResultadoEj1(),
        ejercicio2: obtenerResultadoEj2(),
        ejercicio3: obtenerResultadoEj3(),
        ejercicio4: obtenerResultadoEj4()
    };
    res.json(resultados);
});

// prendemos el servidor para que empiece a escuchar
app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});
