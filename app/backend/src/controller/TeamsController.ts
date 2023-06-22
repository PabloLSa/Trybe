import { Request, Response } from 'express';
import TeamService from '../service/team.service';

export default class TeamsController {
  constructor(protected teamService = new TeamService()) {

  }

  async getAll(req: Request, res: Response) {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams.data);
  }
}
