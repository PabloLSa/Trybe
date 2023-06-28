import InterfaceMatches from './InterfaceMatches';

export default interface InterfaceMatcheModel {
  getAll(): Promise<InterfaceMatches[]>;
  getById(id: number): Promise<InterfaceMatches | null>;
}
