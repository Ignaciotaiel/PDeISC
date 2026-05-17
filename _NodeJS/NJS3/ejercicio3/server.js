/**
 * @proyecto     DOM Explorer - Ejercicio 3
 * @archivo      server.js
 * @descripcion  Servidor Express que sirve los archivos estáticos del Ejercicio 3.
 *               Este ejercicio extiende la SPA del Ejercicio 2 agregando la
 *               funcionalidad de inspección de nodos hijos del DOM en cada
 *               componente renderizado.
 * @autor        Taiel
 * @version      1.0
 * @fecha        2026-04-20
 *
 * @dependencias express, path, url (módulos nativos de Node.js y npm)
 * @notas        El servidor escucha en el puerto 3003 para no colisionar
 *               con los otros ejercicios.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

/* ──────────────────────────────────────────
   SECCIÓN: Configuración de rutas del sistema
   ────────────────────────────────────────── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ──────────────────────────────────────────
   SECCIÓN: Inicialización del servidor
   ────────────────────────────────────────── */
const app = express();
const PORT = 3003; // Puerto exclusivo del Ejercicio 3

/* ──────────────────────────────────────────
   SECCIÓN: Archivos estáticos
   ────────────────────────────────────────── */
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'pages')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/modules', express.static(path.join(__dirname, 'modules')));
app.use('/contexto', express.static(path.join(__dirname, '../contexto')));

/* ──────────────────────────────────────────
   SECCIÓN: Inicio del servidor
   ────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `[Ejercicio 3] Servidor corriendo en: http://localhost:${PORT}`);
});


