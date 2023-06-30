import Sequelize = require('sequelize');
import MatchesSequelize from '../database/models/MatchesSequelize';

const SQLquery = `SELECT st.team_name AS name,
SUM(
  CASE WHEN sm.home_team_goals > sm.away_team_goals THEN 3
    WHEN sm.home_team_goals = sm.away_team_goals THEN 1
    ELSE 0 END) AS totalPoints, COUNT(*) AS totalGames,
SUM(
  CASE WHEN sm.home_team_goals > sm.away_team_goals THEN 1
    ELSE 0 END) AS totalVictories,
SUM(
  CASE WHEN sm.home_team_goals = sm.away_team_goals THEN 1
    ELSE 0 END) AS totalDraws,
SUM(
  CASE WHEN sm.home_team_goals < sm.away_team_goals THEN 1
    ELSE 0 END) AS totalLosses,
SUM(sm.home_team_goals) AS goalsFavor,
SUM(sm.away_team_goals) AS goalsOwn,
SUM(sm.home_team_goals) - SUM(sm.away_team_goals) as goalsBalance,
ROUND((
  SUM(
    CASE WHEN sm.home_team_goals > sm.away_team_goals THEN 3
    WHEN sm.home_team_goals = sm.away_team_goals THEN 1
    ELSE 0 END
  ) / (COUNT(*) * 3))* 100, 2) AS efficiency
FROM matches as sm INNER JOIN teams as st
ON sm.home_team_id = st.id
WHERE sm.in_progress = false GROUP BY team_name
ORDER BY
  totalPoints DESC,
  totalVictories DESC,
  goalsBalance DESC, 
  goalsFavor DESC;
`;
export default class LeardBoardModel {
  private model = MatchesSequelize;
  private sequelize = Sequelize;

  async getAll() {
    const teams = await this.model.sequelize?.query(SQLquery, {
      type: this.sequelize.QueryTypes.SELECT,
    });
    // console.log(teams);

    return teams;
  }

  async getById(id: number) {
    const team = await this.model.findByPk(id);
    return team;
  }
}
