import express from 'express';
import app from './api/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
const PORT =  process.env.PORT || 3000;

app.listen(5000, () => console.log('Server running on port 5000'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

express()
    .use(express.static(path.join(__dirname, 'frontend')))
    .get('/', (req, res) => res.render('frontend/index.html'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
