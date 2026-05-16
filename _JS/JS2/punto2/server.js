import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import multer from 'multer';
import { extraerNumeros, filtrarNumeros, calcularEstadisticas, generarContenidoTxt } from './modules/filtrado.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.static(__dirname));

const upload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        path.extname(file.originalname).toLowerCase() === '.txt' ? cb(null, true) : cb(new Error('Solo .txt'));
    }
});

const txtPath = path.join(__dirname, 'txt');
const punto1TxtPath = path.join(__dirname, '..', 'punto1', 'txt');

await fs.mkdir(txtPath, { recursive: true }).catch(() => {});

app.post('/api/procesar', upload.single('archivo'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ ok: false, error: 'Falta archivo' });
        const data = req.file.buffer.toString('utf-8');
        const nums = extraerNumeros(data);
        if (nums.length === 0) return res.status(422).json({ ok: false, error: 'Sin números' });

        const { utiles, descartados } = filtrarNumeros(nums);
        const stats = calcularEstadisticas(utiles, descartados);
        const content = generarContenidoTxt(utiles, stats);

        const now = new Date();
        const name = `resultado_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}_${now.getHours().toString().padStart(2,'0')}${now.getMinutes().toString().padStart(2,'0')}.txt`;
        
        await fs.writeFile(path.join(txtPath, name), content);
        res.json({ ok: true, archivo: name, utiles, descartados, estadisticas: stats, contenido: content });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

app.get('/api/archivos', async (req, res) => {
    try {
        let allFiles = [];
        
        // Leer archivos de punto2/txt
        const files2 = await fs.readdir(txtPath).catch(() => []);
        allFiles = [...files2.filter(f => f.endsWith('.txt'))];

        // Leer archivos de punto1/txt
        const files1 = await fs.readdir(punto1TxtPath).catch(() => []);
        allFiles = [...allFiles, ...files1.filter(f => f.endsWith('.txt'))];

        console.log(`Archivos encontrados:`, allFiles);
        res.json({ ok: true, archivos: allFiles });
    } catch (error) {
        console.error('Error al listar archivos:', error);
        res.status(500).json({ ok: false, error: 'Error al listar archivos' });
    }
});

app.post('/api/procesar-servidor', async (req, res) => {
    try {
        const { filename } = req.body;
        if (!filename) return res.status(400).json({ ok: false, error: 'Falta nombre' });
        
        // Intentar leer de punto2/txt primero, luego punto1/txt
        let data;
        try {
            data = await fs.readFile(path.join(txtPath, filename), 'utf-8');
        } catch (e) {
            data = await fs.readFile(path.join(punto1TxtPath, filename), 'utf-8');
        }

        const nums = extraerNumeros(data);
        if (nums.length === 0) return res.status(422).json({ ok: false, error: 'Sin números' });

        const { utiles, descartados } = filtrarNumeros(nums);
        const stats = calcularEstadisticas(utiles, descartados);
        const content = generarContenidoTxt(utiles, stats);

        const now = new Date();
        const name = `resultado_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}_${now.getHours().toString().padStart(2,'0')}${now.getMinutes().toString().padStart(2,'0')}.txt`;
        
        await fs.writeFile(path.join(txtPath, name), content);
        res.json({ ok: true, archivo: name, utiles, descartados, estadisticas: stats, contenido: content });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

app.get('/api/descargar/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        // Intentar descargar de punto2/txt primero, luego punto1/txt
        let filePath = path.join(txtPath, filename);
        try {
            await fs.access(filePath);
        } catch (e) {
            filePath = path.join(punto1TxtPath, filename);
        }
        res.download(filePath);
    } catch (error) {
        res.status(404).json({ ok: false, error: 'Archivo no encontrado' });
    }
});

app.delete('/api/borrar/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath2 = path.join(txtPath, filename);
        const filePath1 = path.join(punto1TxtPath, filename);
        
        let borrado = false;

        // Intentar borrar de punto2/txt
        try {
            await fs.unlink(filePath2);
            borrado = true;
        } catch (e) {
            // Ignorar si no existe en punto2
        }

        // Intentar borrar de punto1/txt
        try {
            await fs.unlink(filePath1);
            borrado = true;
        } catch (e) {
            // Ignorar si no existe en punto1
        }
        
        if (borrado) {
            res.json({ ok: true, message: 'Archivo eliminado' });
        } else {
            res.status(404).json({ ok: false, error: 'Archivo no encontrado' });
        }
    } catch (error) {
        console.error('Error al borrar:', error);
        res.status(500).json({ ok: false, error: 'No se pudo eliminar el archivo' });
    }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'pages', 'index.html')));

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
