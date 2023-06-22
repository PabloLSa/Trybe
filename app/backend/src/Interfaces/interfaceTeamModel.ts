import { InterfaceTEAM } from './InterfaceTEAM';

export default interface InterfaceTeamModel {
  getAll(): Promise<InterfaceTEAM[]>;
}
