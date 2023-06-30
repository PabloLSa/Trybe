import { Request, Router, Response } from 'express';

import LeaderBoardController from '../controller/LeaderBoardController';
// import validJwt from '../middlewares/validTokens';

const leaderboardController = new LeaderBoardController();

const leaderboardRouter = Router();

// teamsRoutes.get('/pablo', (_req, res) => res.json({ ok: true }));

leaderboardRouter.get('/leaderboard/home', (req: Request, res: Response) =>
  leaderboardController.getAllLeaderBoard(req, res));

// leaderboardRouter.post('leaderboard/away', validJwt.validTokens, (req: Request, res: Response) =>
//   leaderboardController.createNewMatch(req, res));

export default leaderboardRouter;
