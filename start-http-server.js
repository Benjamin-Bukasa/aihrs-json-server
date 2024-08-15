import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app = express();

// Récupérer le chemin du répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors()); // Pour permettre les requêtes depuis d'autres domaines
app.use(bodyParser.json()); // Pour analyser les requêtes au format JSON

// Servir les fichiers statiques du dossier "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Répertoire où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier uploadé
  }
});

const upload = multer({ storage: storage });

// Route pour le téléchargement des fichiers
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    // En cas de succès, renvoyer le chemin du fichier uploadé
    res.status(200).json({ filepath: `/uploads/${req.file.filename}` });
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
    res.status(500).send('Erreur lors du téléchargement du fichier');
  }
});

// Exemple de route pour récupérer tous les agents
app.get('/entries', (req, res) => {
  fs.readFile('db.json', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier:', err);
      return res.status(500).send('Erreur lors de la récupération des données');
    }
    const entries = JSON.parse(data).entries;
    res.status(200).json(entries);
  });
});

// Exemple de route pour mettre à jour un agent
app.put('/entries/:id', (req, res) => {
  const { id } = req.params;
  const updatedAgent = req.body;

  fs.readFile('db.json', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier:', err);
      return res.status(500).send('Erreur lors de la mise à jour des données');
    }
    const db = JSON.parse(data);
    const index = db.entries.findIndex(agent => agent.id === id);

    if (index !== -1) {
      db.entries[index] = updatedAgent;
      fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
        if (err) {
          console.error('Erreur lors de l\'écriture du fichier:', err);
          return res.status(500).send('Erreur lors de la mise à jour des données');
        }
        res.status(200).json(updatedAgent);
      });
    } else {
      res.status(404).send('Agent non trouvé');
    }
  });
});

// Exemple de route pour archiver un agent
app.post('/archive', (req, res) => {
  const agentToArchive = req.body;

  fs.readFile('db.json', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier:', err);
      return res.status(500).send('Erreur lors de l\'archivage des données');
    }
    const db = JSON.parse(data);
    db.archive.push(agentToArchive); // Ajouter l'agent à la section "archive"
    db.entries = db.entries.filter(agent => agent.id !== agentToArchive.id); // Supprimer l'agent de la section "entries"

    fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier:', err);
        return res.status(500).send('Erreur lors de l\'archivage des données');
      }
      res.status(200).json({ message: 'Agent archivé avec succès' });
    });
  });
});

// Exemple de route pour supprimer un agent
app.delete('/entries/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('db.json', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier:', err);
      return res.status(500).send('Erreur lors de la suppression des données');
    }
    const db = JSON.parse(data);
    const newEntries = db.entries.filter(agent => agent.id !== id);

    if (newEntries.length === db.entries.length) {
      return res.status(404).send('Agent non trouvé');
    }

    db.entries = newEntries;

    fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier:', err);
        return res.status(500).send('Erreur lors de la suppression des données');
      }
      res.status(200).json({ message: 'Agent supprimé avec succès' });
    });
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est en marche sur le port ${PORT}`);
});
