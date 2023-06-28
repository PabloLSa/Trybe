import MatchesSequelize from '../database/models/MatchesSequelize';
import InterfaceMatchesModel from '../Interfaces/InterfaceMatcheModel';
import TeamSequelize from '../database/models/TeamSequelize';

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

  async getById(id: number) {
    const match = await this.model.findByPk(id);
    return match;
  }
}
