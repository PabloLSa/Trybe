// src/database/migrations/01-create-books-table.ts

import { Model, QueryInterface, DataTypes } from 'sequelize';
import { InterfaceUsers } from '../../Interfaces/InterfaceUsers';
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<InterfaceUsers>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};
