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

  public async findAllAway(): Promise<ServiceResponse<unknown>> {
    const teamsAways = await this.leardBoardModel.getAllAway();
    return { status: 'SUCCESSFUL', data: teamsAways };
  }
}
