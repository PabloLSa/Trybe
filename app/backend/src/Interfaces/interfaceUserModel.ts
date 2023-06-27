import { InterfaceUsers } from './InterfaceUsers';

export default interface InterfaceUserModel {
  findUserByEmail(email: InterfaceUsers['email']): Promise<InterfaceUsers | null>;
}
