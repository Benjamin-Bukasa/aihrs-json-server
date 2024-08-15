import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const fileUploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Erreur lors de l\'upload du fichier:', err);
      return res.status(500).json({ error: 'Erreur lors de l\'upload du fichier.' });
    }
    console.log('Fichier uploadé:', req.file);
    next();
  });
};

export default fileUploadMiddleware;
