import { Request, Router, Response } from 'express';

import TeamsController from '../controller/TeamsController';

const teamController = new TeamsController();

const teamsRoutes = Router();

teamsRoutes.get('/teams', (req: Request, res: Response) =>
  teamController.getAll(req, res));

export default teamsRoutes;
