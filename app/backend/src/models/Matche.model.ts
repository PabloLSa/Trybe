import MatchesSequelize from '../database/models/MatchesSequelize';
import InterfaceMatchesModel from '../Interfaces/InterfaceMatcheModel';
import TeamSequelize from '../database/models/TeamSequelize';
import InterfaceMatches from '../Interfaces/InterfaceMatches';

export default class MatchesModel implements InterfaceMatchesModel {
  model = MatchesSequelize;
  modelTeam = TeamSequelize;

  async getAll() {
    const matches = await this.model.findAll(
      {
        include: [
          { model: this.modelTeam,
            as: 'homeTeam',
            attributes: { exclude: ['id'] },
          },
          { model: this.modelTeam,
            as: 'awayTeam',
            attributes: { exclude: ['id'] },
          },
        ],
      },
    );

    return matches.map((match) => match.dataValues);
  }

  async updateInProgress(matchId: number): Promise<string> {
    const [affectedRows] = await this.model.update(
      { inProgress: false },
      { where: { id: matchId } },
    );

    if (affectedRows === 1) { return 'Finished'; }
    return 'Not Finished';
  }

  async updateMatchGoals(
    id: number,
    updateMatch: {
      homeTeamGoals: number,
      awayTeamGoals: number,
    },
  ): Promise<string> {
    const { homeTeamGoals, awayTeamGoals } = updateMatch;
    const [affectedRows] = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    if (affectedRows === 1) { return 'successful'; }
    return 'Error';
  }

  async createNewMatch(newMatch: { homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
    inProgress: boolean,
  }): Promise<InterfaceMatches> {
    const matchCreated = await this.model.create({
      homeTeamId: newMatch.homeTeamId,
      homeTeamGoals: newMatch.homeTeamGoals,
      awayTeamId: newMatch.awayTeamId,
      awayTeamGoals: newMatch.awayTeamGoals,
      inProgress: true,
    });

    return matchCreated.dataValues;
  }

  async getById(id: number) {
    const match = await this.model.findByPk(id);
    return match;
  }
}
