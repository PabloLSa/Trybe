import TeamSequelize from '../database/models/TeamSequelize';
import InterfaceTeamModel from '../Interfaces/interfaceTeamModel';

export default class TeamModel implements InterfaceTeamModel {
  model = TeamSequelize;

  async getAll() {
    const teams = await this.model.findAll();
    // console.log(teams);

    const allTEAMS = teams.map((team) => ({
      id: team.id,
      teamName: team.teamName,
    }));
    return allTEAMS;
  }
}
