import { InterfaceTEAM } from './InterfaceTEAM';

export default interface InterfaceTeamModel {
  getAll(): Promise<InterfaceTEAM[]>;
  getById(id: number): Promise<InterfaceTEAM | null>;
}
