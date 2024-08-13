import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fileUploadMiddleware from './fileUploadMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(fileUploadMiddleware);

app.use('/uploads', express.static('uploads'));


app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
