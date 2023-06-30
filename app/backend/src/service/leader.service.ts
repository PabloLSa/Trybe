// import InterfaceMatcheModel from '../Interfaces/InterfaceMatcheModel
import LearderBoardModel from '../models/LeaderBoardModel';
import { ServiceResponse } from '../utils/serviceResponse';

export default class LeaderService {
  constructor(
    private leardBoardModel = new LearderBoardModel(),
  ) {}

  public async findAllHome(): Promise<ServiceResponse<unknown>> {
    const teamsOfHouse = await this.leardBoardModel.getAll();
    return { status: 'SUCCESSFUL', data: teamsOfHouse };
  }
}
