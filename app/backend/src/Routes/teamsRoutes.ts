import { Request, Router, Response } from 'express';

import TeamsController from '../controller/TeamsController';

const teamController = new TeamsController();

const teamsRoutes = Router();

// teamsRoutes.get('/pablo', (_req, res) => res.json({ ok: true }));

teamsRoutes.get('/teams', (req: Request, res: Response) =>
  teamController.getAll(req, res));

teamsRoutes.get('/teams/:id', (req: Request, res: Response) =>
  teamController.getById(req, res));

export default teamsRoutes;
