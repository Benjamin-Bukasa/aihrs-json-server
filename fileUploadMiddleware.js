import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// Résoudre __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Fonction pour générer un identifiant court
function generateShortId(length = 8) {
  return Math.random().toString(36).substr(2, length);
}

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers seront sauvegardés
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const shortFileName = `${generateShortId()}${fileExtension}`;
    cb(null, shortFileName);
  },
});

const upload = multer({ storage: storage });

// Route pour gérer l'upload de fichiers
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const filePath = `/uploads/${req.file.filename}`;
  console.log('File uploaded successfully:', filePath);

  res.json({ filepath: filePath });
});

// Middleware pour servir les fichiers téléchargés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route pour servir l'application frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Démarrage du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
