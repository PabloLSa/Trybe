import { Request, Router, Response } from 'express';

import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();

const matchesRoutes = Router();

// teamsRoutes.get('/pablo', (_req, res) => res.json({ ok: true }));

matchesRoutes.get('/matches', (req: Request, res: Response) =>
  matchesController.getAll(req, res));

matchesRoutes.get('/matches/:id', (req: Request, res: Response) =>
  matchesController.getById(req, res));

export default matchesRoutes;
