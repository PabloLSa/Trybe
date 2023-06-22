import { Request, Response } from 'express';
import TeamService from '../service/team.service';

export default class TeamsController {
  constructor(protected teamService = new TeamService()) {

  }

  async getAll(req: Request, res: Response) {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams.data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));
    return res.status(200).json(team.data);
  }
}
