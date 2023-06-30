import { Request, Response } from 'express';
import LeaderService from '../service/leader.service';

export default class LeaderBoardController {
  constructor(private leaderService = new LeaderService()) {

  }

  async getAllLeaderBoard(req: Request, res: Response) {
    const teamsOfHouse = await this.leaderService.findAllHome();
    return res.status(200).json(teamsOfHouse.data);
  }
}
