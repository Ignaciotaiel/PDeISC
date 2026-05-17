import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { upperCase } from 'upper-case';
import { menuHTML } from './modules/menu.js';
import { logUrlInfo } from './modules/urlInfo.js';
import { startFileServer } from './modules/fileServer.js';

const app = express();

// configuracion para que multer guarde los curriculums
const uploadDir = path.join(process.cwd(), 'cvs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// le decimos a multer donde y como guardar el archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'cvs/');
  },
  filename: function (req, file, cb) {
    // armamos un nombre unico para que no se pisen si se llaman igual
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// mostramos la info de la url apenas arranca
logUrlInfo();

// prendemos el servidor de datos en el puerto 3001
startFileServer();

// aca recibimos el curriculum desde el formulario
app.post('/api/upload-cv', upload.single('cv'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'falto el archivo' });
  }
  console.log('nuevo candidato:', req.body.nombre);
  console.log('guardado en:', req.file.path);
  res.json({ mensaje: 'cv guardado', file: req.file.filename });
});

// atajamos las peticiones html para inyectarle el menu
app.get('/*.html', (req, res, next) => {
  const filePath = path.join(process.cwd(), 'pages', req.path);
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) return next(); 
    
    // metemos el menu en el html antes de enviarlo
    const inyectado = content.replace('<!-- nav_placeholder -->', menuHTML);
    res.send(inyectado);
  });
});

// ruta principal para el inicio
app.get('/', (req, res) => {
  const filePath = path.join(process.cwd(), 'pages', 'inicio.html');
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      return res.status(500).send('hubo un problema al cargar el inicio');
    }
    const inyectado = content.replace('<!-- nav_placeholder -->', menuHTML);
    res.send(inyectado);
  });
});

// endpoint chiquito para pasar textos a mayusculas
app.get('/api/uppercase', (req, res) => {
  const texto = req.query.texto || '';
  res.json({ resultado: upperCase(texto) });
});

// carpetas que dejamos publicas para el navegador
app.use(express.static('pages'));
app.use('/scripts', express.static('scripts'));
app.use('/styles', express.static('styles'));
app.use('/contexto', express.static('contexto'));
app.use('/modules', express.static('modules'));

app.listen(3000, () => {
  console.log('servidor listo en el puerto 3000');
});
