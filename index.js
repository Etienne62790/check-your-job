import express from 'express';
import cors from 'cors';
import candidatsRoutes from './routes/candidats.js';
import employeursRoutes from './routes/employeurs.js';
import offresRoutes from './routes/offres.js';
import matchingRoutes from './routes/matching.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/candidats', candidatsRoutes);
app.use('/api/employeurs', employeursRoutes);
app.use('/api/offres', offresRoutes);
app.use('/api/matching', matchingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
