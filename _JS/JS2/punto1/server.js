import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const txtPath = path.join(__dirname, 'txt');
try {
    await fs.mkdir(txtPath, { recursive: true });
} catch (error) {
    console.error('Error carpeta txt:', error);
}

app.post('/api/guardar', async (req, res) => {
    try {
        const { numeros, contenido } = req.body;
        if (!numeros || !Array.isArray(numeros) || !contenido) {
            return res.status(400).json({ ok: false, message: 'Datos inválidos' });
        }

        const now = new Date();
        const datePart = now.getFullYear().toString() + 
                         (now.getMonth() + 1).toString().padStart(2, '0') + 
                         now.getDate().toString().padStart(2, '0');
        const timePart = now.getHours().toString().padStart(2, '0') + 
                         now.getMinutes().toString().padStart(2, '0') + 
                         now.getSeconds().toString().padStart(2, '0');
        
        const filename = `numeros_${datePart}_${timePart}.txt`;
        const filePath = path.join(txtPath, filename);

        await fs.writeFile(filePath, contenido, 'utf-8');
        res.json({ ok: true, archivo: filename });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error al guardar' });
    }
});

app.get('/api/descargar/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(txtPath, filename);
    res.download(filePath, filename, (err) => {
        if (err && !res.headersSent) {
            res.status(404).json({ ok: false, message: 'No encontrado' });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.use(express.static(__dirname));

app.use('/api', (req, res) => {
    res.status(404).json({ ok: false, message: 'API no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
