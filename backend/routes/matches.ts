import { Router } from 'express';
import { getMatches, getMatchById } from '../services/matchService';

const router = Router();

router.get('/', (req, res) => {
  res.json(getMatches());
});

router.get('/:id', (req, res) => {
  const match = getMatchById(req.params.id);
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }
  res.json(match);
});

export default router;
