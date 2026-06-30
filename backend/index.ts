import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import aiRoutes from './routes/ai';
import matchRoutes from './routes/matches';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/matches', matchRoutes);

app.listen(PORT, () => {
  console.log(`SoccerAI Backend running on http://localhost:${PORT}`);
});
