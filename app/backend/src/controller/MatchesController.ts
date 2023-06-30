import { Request, Response } from 'express';
import Matches from '../service/matches.service';

export default class MatchesController {
  constructor(protected matchesService = new Matches()) {

  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const bol = inProgress === 'true';
    if (inProgress) {
      const matches = await this.matchesService.findAllInProgress(bol);
      return res.status(200).json(matches.data);
    }
    const matches = await this.matchesService.findAll();
    return res.status(200).json(matches.data);
  }

  async updateInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const matche = await this.matchesService.updateInProgress(Number(id));
    return res.status(200).json(matche.data);
  }

  async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const matche = await this.matchesService.updateMatchGoals(Number(id), body);
    return res.status(200).json(matche.data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const matche = await this.matchesService.getById(Number(id));
    return res.status(200).json(matche.data);
  }

  async createNewMatch(req: Request, res: Response) {
    const { body } = req;
    const matche = await this.matchesService.createNewMatch(body);
    if (matche.status === 'UNAUTHORIZED') {
      return res.status(422).json(matche.data);
    }
    if (matche.status === 'NOT_FOUND') {
      return res.status(404).json(matche.data);
    }
    if (matche.status === 'SUCCESSFUL') {
      return res.status(201).json(matche.data);
    }
  }
}
