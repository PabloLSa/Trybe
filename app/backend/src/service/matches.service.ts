// import InterfaceMatcheModel from '../Interfaces/InterfaceMatcheModel';
import MatchesModel from '../models/Matche.model';

import InterfaceMatches from '../Interfaces/InterfaceMatches';
import { ServiceResponse } from '../utils/serviceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<InterfaceMatches[]>> {
    const matches = await this.matchesModel.getAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  async getById(id: number) {
    const matches = await this.matchesModel.getById(id);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
