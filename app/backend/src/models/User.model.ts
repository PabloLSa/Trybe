import UserSequelize from '../database/models/UserSequelize';
import { InterfaceUsers } from '../Interfaces/InterfaceUsers';

import InterfaceUserModel from '../Interfaces/interfaceUserModel';

export default class UserModel implements InterfaceUserModel {
  model = UserSequelize;

  async findUserByEmail(email: InterfaceUsers['email']): Promise<InterfaceUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  }
}
