import * as bcrypt from 'bcryptjs';
import UserModel from '../models/User.model';
import { InterfaceLogin } from '../Interfaces/InterfaceLogin';
import { InterfaceUsers } from '../Interfaces/InterfaceUsers';
import { ServiceMessage, ServiceResponse } from '../utils/serviceResponse';
import TokenJWT from '../utils/tokenJWT';
import { InterfaceToken } from '../Interfaces/IntefaceToken';
import InterfaceUserModel from '../Interfaces/interfaceUserModel';

export default class UserService {
  constructor(
    private userModel: InterfaceUserModel = new UserModel(),
    private tokenJWT = TokenJWT,
  ) {}

  public async login(data: InterfaceLogin):
  Promise<ServiceResponse<ServiceMessage | InterfaceToken>> {
    const user = await this.userModel.findUserByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }

      const { username, role, email, id } = user as InterfaceUsers;
      const token = this.tokenJWT.sign({ username, role, email, id });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'Invalid email or password' } };
  }
}
