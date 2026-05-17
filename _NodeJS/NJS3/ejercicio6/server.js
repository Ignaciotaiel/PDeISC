/**
 * @proyecto     DOM Explorer - Ejercicio 6
 * @archivo      server.js
 * @descripcion  Servidor Express que sirve los archivos estáticos del Ejercicio 6.
 *               Este ejercicio implementa un formulario de registro de usuario
 *               con validación en tiempo real y previsualización dinámica de los
 *               datos ingresados en una tarjeta de perfil.
 * @autor        Taiel
 * @version      1.0
 * @fecha        2026-04-20
 *
 * @dependencias express, path, url (módulos nativos de Node.js y npm)
 * @notas        El servidor escucha en el puerto 3006 para no colisionar
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
const PORT = 3006; // Puerto exclusivo del Ejercicio 6

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
  console.log(`\x1b[36m%s\x1b[0m`, `[Ejercicio 6] Servidor corriendo en: http://localhost:${PORT}`);
});


