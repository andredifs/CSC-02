import express from 'express';
import cors from 'cors';
import server from './api/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
const PORT =  process.env.PORT || 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend')))
    .get('/', (req, res) => res.render('frontend/index.html'));

app.get('/api/data', server);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
