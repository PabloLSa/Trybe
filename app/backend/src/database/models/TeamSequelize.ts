import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import MatchesSequelize from './MatchesSequelize';
// import OtherModel from './OtherModel';

class TeamSequelize extends Model<InferAttributes<TeamSequelize>,
InferCreationAttributes<TeamSequelize>> {
  declare id: CreationOptional<number>;
  declare teamName: CreationOptional<string>;
}

TeamSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
MatchesSequelize.belongsTo(TeamSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesSequelize.belongsTo(TeamSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamSequelize.hasMany(MatchesSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });
TeamSequelize.hasMany(MatchesSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });
/**
  * `Workaround` para aplicar as associations em TS:
  * start project ***Plsa
  * Associations 1:N devem ficar em uma das instâncias de modelo start
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default TeamSequelize;
