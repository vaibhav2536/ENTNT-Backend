import type { communicationMethod } from "../../../types/models";

export interface ICommunicationMethodService {
  addCommunicationMethod(data: any): Promise<[communicationMethod | null, Error | null]>;
  editCommunicationMethod(data: any): Promise<[communicationMethod | null, Error | null]>;
  deleteCommunicationMethod(id: string): Promise<[communicationMethod | null, Error | null]>;
  getCommunicationMethods(): Promise<[communicationMethod[] | null, Error | null]>;
}