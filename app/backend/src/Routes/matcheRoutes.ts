import { Request, Router, Response } from 'express';

import MatchesController from '../controller/MatchesController';
import validJwt from '../middlewares/validTokens';

const matchesController = new MatchesController();

const matchesRoutes = Router();

// teamsRoutes.get('/pablo', (_req, res) => res.json({ ok: true }));

matchesRoutes.get('/matches', (req: Request, res: Response) =>
  matchesController.getAll(req, res));

matchesRoutes.patch('/matches/:id', validJwt.validTokens, (req: Request, res: Response) =>
  matchesController.updateMatchGoals(req, res));

matchesRoutes.patch('/matches/:id/finish', validJwt.validTokens, (req: Request, res: Response) =>
  matchesController.updateInProgress(req, res));

export default matchesRoutes;
