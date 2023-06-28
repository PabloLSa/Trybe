import MatchesSequelize from '../database/models/MatchesSequelize';
import InterfaceMatchesModel from '../Interfaces/InterfaceMatcheModel';

export default class MatchesModel implements InterfaceMatchesModel {
  model = MatchesSequelize;

  async getAll() {
    const matches = await this.model.findAll();

    const AllMacthes = matches.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      hometeamGoals: match.hometeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
    }));
    return AllMacthes;
  }

  async getById(id: number) {
    const match = await this.model.findByPk(id);
    return match;
  }
}
