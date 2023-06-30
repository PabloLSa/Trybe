// import InterfaceMatcheModel from '../Interfaces/InterfaceMatcheModel
import MatchesModel from '../models/Matche.model';
import TeamModel from '../models/Team.model';

import InterfaceMatches from '../Interfaces/InterfaceMatches';
import { ServiceResponse } from '../utils/serviceResponse';

export default class MatchesService {
  private teamModel: TeamModel = new TeamModel();
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<InterfaceMatches[]>> {
    const matches = await this.matchesModel.getAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findAllInProgress(pbool: boolean): Promise<ServiceResponse<InterfaceMatches[]>> {
    const matches = await this.matchesModel.getAll();

    const matchesInProgress = matches.filter((match) => match.inProgress === pbool);
    return { status: 'SUCCESSFUL', data: matchesInProgress };
  }

  async updateInProgress(id: number) {
    const matches = await this.matchesModel.updateInProgress(id);
    return { status: 'SUCCESSFUL', data: matches };
  }

  async updateMatchGoals(id: number, updateMatch: {
    homeTeamGoals: number,
    awayTeamGoals: number,
  }) {
    const matches = await this.matchesModel.updateMatchGoals(id, updateMatch);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async createNewMatch(newMatch: { homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
    inProgress: boolean,
  }): Promise<ServiceResponse<InterfaceMatches>> {
    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return { status: 'UNAUTHORIZED',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const teams = await this.teamModel.getAll();
    const isValidTeam = !teams.find((team) => team.id === newMatch.homeTeamId);
    const isValidTeamAway = !teams.find((team) => team.id === newMatch.awayTeamId);
    if (isValidTeam || isValidTeamAway) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }
    const createdMatch = await this.matchesModel.createNewMatch(newMatch);
    return { status: 'SUCCESSFUL', data: createdMatch };
  }

  async getById(id: number) {
    const matches = await this.matchesModel.getById(id);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
