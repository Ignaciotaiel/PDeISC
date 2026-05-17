/**
 * @proyecto     DOM Explorer - Ejercicio 1
 * @archivo      server.js
 * @descripcion  Servidor Express que sirve los archivos estáticos del Ejercicio 1.
 *               Configura las rutas para servir el HTML, CSS y los scripts del
 *               proyecto de manipulación DHTML (creación de H1 e imágenes).
 * @autor        Taiel
 * @version      1.0
 * @fecha        2026-04-20
 *
 * @dependencias express, path, url (módulos nativos de Node.js y npm)
 * @notas        El servidor escucha en el puerto 3001. Cada ejercicio usa
 *               un puerto diferente para poder correr en paralelo.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

/* ──────────────────────────────────────────
   SECCIÓN: Configuración de rutas del sistema
   Se obtienen __filename y __dirname porque en
   módulos ES no existen como variables globales
   ────────────────────────────────────────── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ──────────────────────────────────────────
   SECCIÓN: Inicialización del servidor Express
   Se crea la aplicación y se define el puerto
   ────────────────────────────────────────── */
const app = express();
const PORT = 3001; // Puerto exclusivo del Ejercicio 1

/* ──────────────────────────────────────────
   SECCIÓN: Archivos estáticos
   Se configuran las carpetas que Express va a
   servir directamente al navegador
   ────────────────────────────────────────── */
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'pages')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/modules', express.static(path.join(__dirname, 'modules')));
app.use('/contexto', express.static(path.join(__dirname, '../contexto')));

/* ──────────────────────────────────────────
   SECCIÓN: Inicio del servidor
   Se pone a escuchar en el puerto definido
   ────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `[Ejercicio 1] Servidor corriendo en: http://localhost:${PORT}`);
});


