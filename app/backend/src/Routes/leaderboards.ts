import { Request, Router, Response } from 'express';

import LeaderBoardController from '../controller/LeaderBoardController';

const leaderboardController = new LeaderBoardController();

const leaderboardRouter = Router();

// teamsRoutes.get('/pablo', (_req, res) => res.json({ ok: true }));

leaderboardRouter.get('/leaderboard/home', (req: Request, res: Response) =>
  leaderboardController.getAllLeaderBoard(req, res));

leaderboardRouter.get('/leaderboard/away', (req: Request, res: Response) =>
  leaderboardController.getAllLeaderAway(req, res));

export default leaderboardRouter;
