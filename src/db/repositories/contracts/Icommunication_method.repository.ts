import type { communicationMethod } from "../../../types/models";

export interface ICommunicationMethodRepository {
  addCommunicationMethod(data: any): Promise<[communicationMethod | null, Error | null]>;
  editCommunicationMethod(data: any): Promise<[communicationMethod | null, Error | null]>;
  deleteCommunicationMethod(id: string): Promise<[communicationMethod | null, Error | null]>;
  getCommunicationMethods(id: string): Promise<[communicationMethod[] | null, Error | null]>;
  getCommunicationMethodByName(name: string): Promise<[communicationMethod | null, Error | null]>;
}