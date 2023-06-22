import InterfaceTeamModel from '../Interfaces/interfaceTeamModel';
import TeamModel from '../models/Team.model';

export default class TeamService {
  constructor(private teamModel: InterfaceTeamModel = new TeamModel()) {
  }

  async getAll() {
    const teams = await this.teamModel.getAll();
    return { status: 'SUCCESSFUL', data: teams };
  }
}
