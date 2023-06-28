import { Request, Response } from 'express';
import Matches from '../service/matches.service';

export default class MatchesController {
  constructor(protected matchesService = new Matches()) {

  }

  async getAll(req: Request, res: Response) {
    const matches = await this.matchesService.findAll();
    return res.status(200).json(matches.data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const matche = await this.matchesService.getById(Number(id));
    return res.status(200).json(matche.data);
  }
}
