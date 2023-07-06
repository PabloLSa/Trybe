import { Request, Router, Response, NextFunction } from 'express';

import MatchesController from '../controller/MatchesController';
import validJwt from '../middlewares/validTokens';

const matchesController = new MatchesController();

const matchesRoutes = Router();

// teamsRoutes.get('/pablo', (_req, res) => res.json({ ok: true }));

matchesRoutes.get('/matches', (req: Request, res: Response) =>
  matchesController.getAll(req, res));

matchesRoutes.post(
  '/matches',
  validJwt.validTokens,
  (req: Request, res: Response) => matchesController.createNewMatch(req, res),
);
matchesRoutes.patch(
  '/matches/:id',
  validJwt.validTokens,
  (req: Request, res: Response) => matchesController.updateMatchGoals(req, res),
);

matchesRoutes.patch(
  '/matches/:id/finish',
  (req: Request, res: Response, next: NextFunction) =>
    validJwt.validTokens(req, res, next),
  (req: Request, res: Response) => matchesController.updateInProgress(req, res),
);

export default matchesRoutes;
